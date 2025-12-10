#!/usr/bin/env python3
"""
@file convert_sheet_to_json.py
@description Converte CSV Google Sheets in JSON database BILINGUE (IT/EN)
@author Medical Utility Pro
@version 2.0.0
@created 2025-12-01
@updated 2025-12-XX (v2.0: Support for new columns NECESSITÀ DI CVC, NOTES/CONCENTRAZIONI, NOTO RISCHIO FLEBITE)

USAGE:
    python scripts/convert_sheet_to_json.py --input drugs.csv --output public/data/drugs/

INPUT FORMAT (CSV - v2.0 with new columns):
    PRINCIPIO ATTIVO,FOTOSENSIBILE,NECESSITÀ DI CVC,NOTES/CONCENTRAZIONI,NOTO RISCHIO FLEBITE,DRUG1,DRUG2,...
    DRUG1,,SÌ/NO,,,null,Y,C,I,...
    DRUG2,,SÌ/NO,,,Y,null,I,...

OUTPUT:
    - public/data/drugs/index.json (DrugDatabaseEntry[])
    - public/data/drugs/compatibility.json (CompatibilityEntry[])

FEATURES:
    - ✅ BilingualText wrapping automatico
    - ✅ Simmetria drug1↔drug2 validation
    - ✅ SOVRASCRIVE completamente JSON esistenti (ricrea da zero)
    - ✅ Campo description vuoto per future info dettagliate
    - ✅ NON tocca file info/{drugId}.json (mantiene vancomycin.json esistente)
    - ✅ Metadata versioning automatico
    - ✅ JSON pretty-print (indent 2)
    - ✅ Logging dettagliato
"""

import argparse
import json
import logging
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Set

try:
    import pandas as pd
except ImportError:
    print("❌ ERROR: pandas non installato")
    print("📦 Installa con: pip install pandas")
    sys.exit(1)

# ============================================================
# CONFIGURAZIONE LOGGING
# ============================================================
logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s: %(message)s'
)
logger = logging.getLogger(__name__)

# ============================================================
# COSTANTI
# ============================================================
# Compatibilità valori standard
COMPATIBILITY_VALUES = {'Y', 'C', 'I', 'null', '!'}

# Mapping descrizioni (IT/EN)
COMPATIBILITY_DESCRIPTIONS = {
    'Y': {
        'it': 'Compatibile - Somministrazione simultanea sicura',
        'en': 'Compatible - Safe simultaneous administration'
    },
    'C': {
        'it': 'Compatibile con cautela - Monitorare reazioni avverse',
        'en': 'Compatible with caution - Monitor adverse reactions'
    },
    'I': {
        'it': 'Incompatibile - NON somministrare insieme',
        'en': 'Incompatible - DO NOT administer together'
    },
    '!': {
        'it': 'Incompatibilità grave - Rischio clinico elevato',
        'en': 'Severe incompatibility - High clinical risk'
    },
    'null': {
        'it': 'Dati non disponibili - Richiedere consulto farmacologico',
        'en': 'Data not available - Request pharmacological consultation'
    }
}

# Categorie farmaci comuni (mapping automatico)
DRUG_CATEGORIES = {
    'ANTIBIOTICI': ['vancomycin', 'amikacin', 'gentamicin', 'ceftriaxone', 'piperacillin', 'meropenem'],
    'DIURETICI': ['furosemide', 'bumetanide'],
    'VASOPRESSORI': ['norepinephrine', 'epinephrine', 'dopamine', 'dobutamine'],
    'SEDATIVI': ['midazolam', 'propofol', 'fentanyl', 'remifentanil'],
    'ANTICOAGULANTI': ['heparin', 'enoxaparin'],
}

# ============================================================
# FUNZIONI UTILITÀ
# ============================================================
def create_bilingual_text(italian: str, english: Optional[str] = None) -> Dict[str, str]:
    """
    Crea oggetto BilingualText
    
    Args:
        italian: Testo in italiano
        english: Testo in inglese (opzionale, usa italiano se mancante)
    
    Returns:
        Dict con chiavi 'it' e 'en'
    """
    return {
        'it': italian.strip(),
        'en': english.strip() if english else italian.strip()
    }


def normalize_drug_name(name: str) -> str:
    """
    Normalizza nome farmaco per ID
    
    Args:
        name: Nome farmaco originale
    
    Returns:
        ID normalizzato (lowercase, no spazi/caratteri speciali)
    
    Examples:
        "VANCOMICINA CLORIDRATO" -> "vancomycin"
        "AMIKACINA SOLFATO" -> "amikacin"
    """
    # Rimuovi suffissi comuni
    name = name.upper()
    suffixes = ['CLORIDRATO', 'SOLFATO', 'SODICO', 'SODICA', 'DICLORIDRATO', 
                'FOSFATO', 'DISODICO', 'ANIDRO', 'BESILATO', 'TARTRATO']
    
    for suffix in suffixes:
        name = name.replace(suffix, '')
    
    # Rimuovi caratteri speciali e converti
    name = name.strip().lower()
    name = name.replace(' ', '_')
    name = name.replace('/', '_')
    
    # Mapping nomi italiani -> inglesi comuni
    mappings = {
        'vancomicina': 'vancomycin',
        'amikacina': 'amikacin',
        'furosemide': 'furosemide',
        'gentamicina': 'gentamicin',
        'noradrenalina': 'norepinephrine',
        'adrenalina': 'epinephrine',
    }
    
    return mappings.get(name, name)


def get_drug_category(drug_id: str) -> Dict[str, str]:
    """
    Determina categoria farmaco
    
    Args:
        drug_id: ID farmaco normalizzato
    
    Returns:
        BilingualText con categoria
    """
    for category, drugs in DRUG_CATEGORIES.items():
        if any(d in drug_id for d in drugs):
            category_map = {
                'ANTIBIOTICI': ('Antibiotici', 'Antibiotics'),
                'DIURETICI': ('Diuretici', 'Diuretics'),
                'VASOPRESSORI': ('Vasopressori', 'Vasopressors'),
                'SEDATIVI': ('Sedativi/Analgesici', 'Sedatives/Analgesics'),
                'ANTICOAGULANTI': ('Anticoagulanti', 'Anticoagulants'),
            }
            it, en = category_map.get(category, (category, category))
            return create_bilingual_text(it, en)
    
    return create_bilingual_text('Altro', 'Other')


def parse_csv_to_dataframe(csv_path: Path) -> pd.DataFrame:
    """
    Legge CSV e converte in DataFrame
    
    Args:
        csv_path: Path al file CSV
    
    Returns:
        DataFrame pandas con dati compatibilità
    
    Raises:
        FileNotFoundError: Se CSV non esiste
        ValueError: Se formato CSV invalido
    """
    if not csv_path.exists():
        raise FileNotFoundError(f"CSV non trovato: {csv_path}")
    
    logger.info(f"📖 Lettura CSV: {csv_path}")
    
    # Leggi CSV (prima riga = header farmaci)
    df = pd.read_csv(csv_path, encoding='utf-8')
    
    # Validazione struttura
    if len(df.columns) < 4:
        raise ValueError("CSV deve avere almeno 4 colonne (PRINCIPIO ATTIVO + metadata + drugs)")
    
    logger.info(f"✅ CSV caricato: {len(df)} righe, {len(df.columns)} colonne")
    return df


def extract_drugs_from_header(df: pd.DataFrame) -> List[Dict]:
    """
    Estrae lista farmaci da header CSV
    
    Args:
        df: DataFrame pandas
    
    Returns:
        Lista DrugDatabaseEntry objects
    
    NOTE v2.0: Gestisce nuove colonne metadata:
        - PRINCIPIO ATTIVO (col 0)
        - FOTOSENSIBILE (col 1)
        - NECESSITÀ DI CVC (col 2) ← NEW
        - NOTES/CONCENTRAZIONI (col 3) ← NEW
        - NOTO RISCHIO FLEBITE (col 4) ← NEW
        - Drugs start from col 5+
    """
    drugs = []
    
    # Determina dinamicamente quante colonne metadata abbiamo
    # Cerca la prima colonna che NON è metadata
    special_column_names = [
        'PRINCIPIO ATTIVO',
        'FOTOSENSIBILE',
        'NECESSITÀ DI CVC',
        'NECESSITA DI CVC',  # Variante senza accento
        'VIA CENTRALE',      # Legacy
        'PERIFERICA',        # Legacy
        'NOTES/CONCENTRAZIONI',
        'NOTO RISCHIO FLEBITE',
        'RISCHIO FLEBITE',
    ]
    
    first_drug_col = 0
    for idx, col_name in enumerate(df.columns):
        col_normalized = str(col_name).strip().upper()
        
        # Check se è colonna speciale
        is_special = any(
            special_name in col_normalized 
            for special_name in special_column_names
        )
        
        if not is_special:
            first_drug_col = idx
            break
    
    if first_drug_col == 0:
        # Fallback: assume prime 5 colonne (v2.0 format)
        logger.warning("⚠️ Non trovate colonne metadata, assumo offset 5")
        first_drug_col = 5
    
    logger.info(f"📍 Prima colonna farmaci: {first_drug_col} ({df.columns[first_drug_col]})")
    
    # Skip colonne metadata
    drug_columns = df.columns[first_drug_col:]
    
    logger.info(f"🔍 Trovati {len(drug_columns)} farmaci nel CSV")
    
    for idx, drug_name in enumerate(drug_columns, 1):
        # Normalizza nome
        drug_id = normalize_drug_name(drug_name)
        
        # Estrai metadata da riga corrente (drug_name è nella colonna PRINCIPIO ATTIVO)
        # Cerca riga con questo drug_name
        drug_row = df[df.iloc[:, 0] == drug_name]
        
        # Metadata defaults
        is_photosensitive = False
        requires_cvc = False
        known_concentrations = ''
        phlebitis_risk = ''
        
        if not drug_row.empty:
            row_data = drug_row.iloc[0]
            
            # FOTOSENSIBILE (col 1)
            if len(row_data) > 1:
                photo_value = str(row_data.iloc[1]).strip().upper()
                is_photosensitive = photo_value in ['SÌ', 'SI', 'YES', 'Y', 'TRUE', '1']
            
            # NECESSITÀ DI CVC (col 2)
            if len(row_data) > 2:
                cvc_value = str(row_data.iloc[2]).strip().upper()
                requires_cvc = cvc_value in ['SÌ', 'SI', 'YES', 'Y']
            
            # NOTES/CONCENTRAZIONI (col 3)
            if len(row_data) > 3:
                known_concentrations = str(row_data.iloc[3]).strip()
                if known_concentrations in ['nan', 'NaN', '']:
                    known_concentrations = ''
            
            # NOTO RISCHIO FLEBITE (col 4)
            if len(row_data) > 4:
                phlebitis_risk = str(row_data.iloc[4]).strip()
                if phlebitis_risk in ['nan', 'NaN', '']:
                    phlebitis_risk = ''
        
        # Costruisci special notes
        notes_parts = []
        if is_photosensitive:
            notes_parts.append('Fotosensibile')
        if requires_cvc:
            notes_parts.append('Richiede CVC')
        if known_concentrations:
            notes_parts.append(f'Concentrazioni note: {known_concentrations}')
        if phlebitis_risk:
            notes_parts.append(f'Rischio flebite: {phlebitis_risk}')
        
        special_notes_it = ' | '.join(notes_parts) if notes_parts else ''
        
        drug_entry = {
            'id': drug_id,
            'name': create_bilingual_text(drug_name.title(), drug_name.title()),
            'category': get_drug_category(drug_id),
            'description': create_bilingual_text('', ''),  # VUOTO - per future info dettagliate in info/{drugId}.json
            'administrationRoute': create_bilingual_text(
                'CVC' if requires_cvc else 'Periferica/CVC',
                'CVC' if requires_cvc else 'Peripheral/CVC'
            ),
            'concentration': create_bilingual_text(
                known_concentrations if known_concentrations else 'Vedi scheda tecnica',
                known_concentrations if known_concentrations else 'See technical sheet'
            ),
            'isPhotosensitive': is_photosensitive,
            'specialNotes': create_bilingual_text(
                special_notes_it if special_notes_it else f'Farmaco #{idx}',
                special_notes_it if special_notes_it else f'Drug #{idx}'
            )
        }
        
        drugs.append(drug_entry)
        logger.debug(f"  ✓ {drug_id} ({drug_name}) - CVC:{requires_cvc}, Foto:{is_photosensitive}")
    
    logger.info(f"✅ {len(drugs)} farmaci estratti")
    return drugs


def extract_compatibility_entries(df: pd.DataFrame) -> List[Dict]:
    """
    Estrae entries compatibilità da DataFrame
    
    Args:
        df: DataFrame pandas
    
    Returns:
        Lista CompatibilityEntry objects (solo 1 direzione, simmetria garantita)
    
    NOTE v2.0: Usa offset dinamico per trovare prima colonna farmaci
    """
    compatibility_entries = []
    seen_pairs: Set[tuple] = set()
    
    # Determina dinamicamente offset colonne metadata (stesso algoritmo di extract_drugs_from_header)
    special_column_names = [
        'PRINCIPIO ATTIVO',
        'FOTOSENSIBILE',
        'NECESSITÀ DI CVC',
        'NECESSITA DI CVC',
        'VIA CENTRALE',
        'PERIFERICA',
        'NOTES/CONCENTRAZIONI',
        'NOTO RISCHIO FLEBITE',
        'RISCHIO FLEBITE',
    ]
    
    first_drug_col = 0
    for idx, col_name in enumerate(df.columns):
        col_normalized = str(col_name).strip().upper()
        is_special = any(special_name in col_normalized for special_name in special_column_names)
        if not is_special:
            first_drug_col = idx
            break
    
    if first_drug_col == 0:
        logger.warning("⚠️ Non trovate colonne metadata per compatibilità, assumo offset 5")
        first_drug_col = 5
    
    # Drug columns (skip metadata)
    drug_columns = list(df.columns[first_drug_col:])
    drug_ids = [normalize_drug_name(name) for name in drug_columns]
    
    logger.info(f"🔗 Estrazione compatibilità tra {len(drug_ids)} farmaci (offset col {first_drug_col})")
    
    # Itera righe (ogni riga = 1 farmaco)
    for row_idx, row in df.iterrows():
        drug1_name = row.iloc[0]  # Prima colonna = PRINCIPIO ATTIVO
        drug1_id = normalize_drug_name(drug1_name)
        
        # Itera compatibilità per ogni altro farmaco
        for col_idx, drug2_id in enumerate(drug_ids):
            # Skip self-compatibility
            if drug1_id == drug2_id:
                continue
            
            # Simmetria: salva solo 1 direzione (A→B, skip B→A)
            pair_key = tuple(sorted([drug1_id, drug2_id]))
            if pair_key in seen_pairs:
                continue
            
            # Estrai valore compatibilità (colonna drug2, offset dinamico per metadata)
            compat_value = str(row.iloc[col_idx + first_drug_col]).strip()
            
            # Validazione valore
            if compat_value not in COMPATIBILITY_VALUES:
                logger.warning(f"⚠️ Valore compatibilità invalido '{compat_value}' per {drug1_id}↔{drug2_id}, skip")
                continue
            
            # Crea entry
            compat_entry = {
                'drug1Id': drug1_id,
                'drug2Id': drug2_id,
                'compatibility': compat_value,
                'description': COMPATIBILITY_DESCRIPTIONS.get(
                    compat_value,
                    create_bilingual_text('Sconosciuto', 'Unknown')
                ),
                'notes': create_bilingual_text(
                    f'Compatibilità {drug1_id} + {drug2_id}',
                    f'Compatibility {drug1_id} + {drug2_id}'
                )
            }
            
            compatibility_entries.append(compat_entry)
            seen_pairs.add(pair_key)
            logger.debug(f"  ✓ {drug1_id} ↔ {drug2_id}: {compat_value}")
    
    logger.info(f"✅ {len(compatibility_entries)} coppie compatibilità estratte")
    return compatibility_entries


def save_json_file(data: Dict, output_path: Path, description: str):
    """
    Salva JSON con pretty-print
    
    Args:
        data: Dati da salvare
        output_path: Path file output
        description: Descrizione per log
    """
    logger.info(f"💾 Salvataggio {description}: {output_path}")
    
    # Crea directory se non esiste
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Salva con indent 2 (JSON leggibile)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    logger.info(f"✅ {description} salvato ({output_path.stat().st_size} bytes)")


# ============================================================
# FUNZIONE PRINCIPALE
# ============================================================
def main():
    """Main script execution"""
    parser = argparse.ArgumentParser(
        description='Converte CSV Google Sheets in JSON database BILINGUE'
    )
    parser.add_argument(
        '--input',
        type=str,
        required=True,
        help='Path CSV input (es: drugs.csv)'
    )
    parser.add_argument(
        '--output',
        type=str,
        default='public/data/drugs/',
        help='Directory output JSON (default: public/data/drugs/)'
    )
    parser.add_argument(
        '--verbose',
        action='store_true',
        help='Logging verboso (DEBUG level)'
    )
    
    args = parser.parse_args()
    
    # Configura logging
    if args.verbose:
        logger.setLevel(logging.DEBUG)
    
    logger.info("=" * 60)
    logger.info("🐍 GOOGLE SHEETS → JSON CONVERTER")
    logger.info("=" * 60)
    
    try:
        # Paths
        csv_path = Path(args.input)
        output_dir = Path(args.output)
        
        # 1. Parse CSV
        df = parse_csv_to_dataframe(csv_path)
        
        # 2. Estrai farmaci
        drugs = extract_drugs_from_header(df)
        
        # 3. Estrai compatibilità
        compatibility_entries = extract_compatibility_entries(df)
        
        # 4. Crea metadata
        metadata = {
            'version': '1.0.0',
            'lastUpdate': datetime.now().isoformat(),
            'totalDrugs': len(drugs),
            'source': 'Google Sheets CSV Export',
            'generatedBy': 'convert_sheet_to_json.py'
        }
        
        # 5. Salva index.json
        index_data = {
            'metadata': metadata,
            'drugs': drugs
        }
        save_json_file(
            index_data,
            output_dir / 'index.json',
            'Drug Index'
        )
        
        # 6. Salva compatibility.json
        compatibility_data = {
            'metadata': metadata,
            'compatibility': compatibility_entries
        }
        save_json_file(
            compatibility_data,
            output_dir / 'compatibility.json',
            'Compatibility Matrix'
        )
        
        # 7. Summary
        logger.info("=" * 60)
        logger.info("✅ CONVERSIONE COMPLETATA CON SUCCESSO")
        logger.info("=" * 60)
        logger.info(f"📊 Statistiche:")
        logger.info(f"   - Farmaci: {len(drugs)}")
        logger.info(f"   - Compatibilità: {len(compatibility_entries)}")
        logger.info(f"   - Output: {output_dir}")
        logger.info("=" * 60)
        
        return 0
        
    except FileNotFoundError as e:
        logger.error(f"❌ File non trovato: {e}")
        return 1
    except ValueError as e:
        logger.error(f"❌ Errore validazione: {e}")
        return 1
    except Exception as e:
        logger.error(f"❌ Errore imprevisto: {e}")
        logger.exception("Stack trace:")
        return 1


if __name__ == '__main__':
    sys.exit(main())

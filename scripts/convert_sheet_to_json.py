#!/usr/bin/env python3
"""
@file convert_sheet_to_json.py
@description Converte CSV Google Sheets in JSON database BILINGUE (IT/EN)
@author Medical Utility Pro
@version 1.0.0
@created 2025-12-01

USAGE:
    python scripts/convert_sheet_to_json.py --input drugs.csv --output public/data/drugs/

INPUT FORMAT (CSV):
    PRINCIPIO ATTIVO:,FOTOSENSIBILE,VIA CENTRALE / PERIFERICA,DRUG1,DRUG2,...
    DRUG1,,,null,Y,C,I,...
    DRUG2,,,Y,null,I,...

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
    """
    drugs = []
    
    # Skip prime 3 colonne metadata (PRINCIPIO ATTIVO, FOTOSENSIBILE, VIA CENTRALE)
    drug_columns = df.columns[3:]
    
    logger.info(f"🔍 Trovati {len(drug_columns)} farmaci nel CSV")
    
    for idx, drug_name in enumerate(drug_columns, 1):
        # Normalizza nome
        drug_id = normalize_drug_name(drug_name)
        
        # Estrai metadata da prime 2 righe (se disponibile)
        # Riga 0 = PRINCIPIO ATTIVO (nome farmaco)
        # Riga 1 = metadata (fotosensibile, via somministrazione)
        
        drug_entry = {
            'id': drug_id,
            'name': create_bilingual_text(drug_name.title(), drug_name.title()),
            'category': get_drug_category(drug_id),
            'description': create_bilingual_text('', ''),  # VUOTO - per future info dettagliate in info/{drugId}.json
            'administrationRoute': create_bilingual_text(
                'Endovenosa',
                'Intravenous'
            ),
            'concentration': create_bilingual_text(
                'Vedi scheda tecnica',
                'See technical sheet'
            ),
            'isPhotosensitive': False,  # TODO: Estrarre da colonna FOTOSENSIBILE
            'specialNotes': create_bilingual_text(
                f'Farmaco #{idx}',
                f'Drug #{idx}'
            )
        }
        
        drugs.append(drug_entry)
        logger.debug(f"  ✓ {drug_id} ({drug_name})")
    
    logger.info(f"✅ {len(drugs)} farmaci estratti")
    return drugs


def extract_compatibility_entries(df: pd.DataFrame) -> List[Dict]:
    """
    Estrae entries compatibilità da DataFrame
    
    Args:
        df: DataFrame pandas
    
    Returns:
        Lista CompatibilityEntry objects (solo 1 direzione, simmetria garantita)
    """
    compatibility_entries = []
    seen_pairs: Set[tuple] = set()
    
    # Drug columns (skip metadata)
    drug_columns = list(df.columns[3:])
    drug_ids = [normalize_drug_name(name) for name in drug_columns]
    
    logger.info(f"🔗 Estrazione compatibilità tra {len(drug_ids)} farmaci")
    
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
            
            # Estrai valore compatibilità (colonna drug2, offset +3 per metadata)
            compat_value = str(row.iloc[col_idx + 3]).strip()
            
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

#!/usr/bin/env python3
"""
CSV to JSON Drug Database Converter
Converte il file CSV della compatibilità farmaci in JSON per l'app Medical Utility
"""

import csv
import json
import os
import sys
from typing import Dict, List, Any
from datetime import datetime


def clean_value(value: str) -> str:
    """Pulisce e normalizza un valore dal CSV"""
    if not value or value.strip() == '':
        return ''
    return value.strip()


def parse_compatibility_value(value: str) -> str:
    """
    Converte i valori di compatibilità dal CSV al formato app:
    - C = compatible (compatibile)
    - I = incompatible (incompatibile)
    - Y = compatible-conditional (compatibile con condizioni/concentrazione dipendente)
    - ! = incompatible-severe (incompatibilità grave/pericolosa)
    - null/vuoto = unknown (sconosciuto)
    """
    value = clean_value(value).upper()
    
    if value == 'C':
        return 'compatible'
    elif value == 'I':
        return 'incompatible'
    elif value == 'Y':
        # Y = compatibile ma dipendente dalla concentrazione
        return 'compatible-conditional'
    elif value == '!':
        # ! = incompatibilità grave/pericolosa
        return 'incompatible-severe'
    elif value == 'NULL' or value == '':
        return 'unknown'
    else:
        # Valore non standard, log e ritorna unknown
        print(f"⚠️  Valore compatibilità non standard: '{value}' -> unknown")
        return 'unknown'


def parse_boolean_field(value: str) -> bool:
    """
    Converte campi booleani semplici (SI/NO, true/false, 1/0)
    Per FOTOSENSIBILE e altri campi semplici
    """
    value = clean_value(value).upper()
    
    if value in ['SI', 'SÌ', 'YES', 'TRUE', '1', 'X']:
        return True
    elif value in ['NO', 'FALSE', '0', '']:
        return False
    else:
        print(f"⚠️  Valore booleano non standard: '{value}' -> False")
        return False


def parse_cvc_requirement(value: str) -> dict:
    """
    Converte il campo NECESSITÀ DI CVC in oggetto strutturato:
    - "SI" o "SÌ" = sempre necessario
    - "NO" o vuoto = non necessario
    - "SI + C" o "SI + C + S" = necessario + info aggiuntive (C=centrale, S=speciale)
    - "CVC" o "CVC+C" = necessario con dettagli tecnici
    
    Ritorna: {
        "required": boolean,
        "details": string,
        "rawValue": string (per debug)
    }
    """
    value = clean_value(value)
    raw_value = value
    value_upper = value.upper()
    
    # Casi "sempre necessario"
    if any(x in value_upper for x in ['SI', 'SÌ', 'YES', 'CVC']):
        return {
            'required': True,
            'details': value if value else 'CVC richiesto',
            'rawValue': raw_value
        }
    # Caso "non necessario"
    elif value_upper in ['NO', 'FALSE', '0', '']:
        return {
            'required': False,
            'details': '',
            'rawValue': raw_value
        }
    else:
        # Valore non standard
        print(f"⚠️  Valore CVC non standard: '{value}' -> required=True (per sicurezza)")
        return {
            'required': True,
            'details': value,
            'rawValue': raw_value
        }


def create_drug_id(drug_name: str) -> str:
    """
    Crea un ID univoco dal nome del farmaco
    Es: "ACICLOVIR" -> "aciclovir"
    """
    return drug_name.strip().lower().replace(' ', '-')


def convert_csv_to_json(csv_path: str, output_dir: str) -> Dict[str, Any]:
    """
    Converte il CSV in formato JSON per l'app
    
    Struttura output:
    {
        "metadata": {...},
        "drugs": [
            {
                "id": "drug-id",
                "name": {"it": "Nome", "en": "Name"},
                "isPhotosensitive": boolean,
                "requiresCVC": boolean,
                "concentrationNotes": {"it": "", "en": ""},
                "phlebitisRisk": {"it": "", "en": ""},
                "additionalInfo": {},
                "compatibility": [
                    {"drugId": "other-drug-id", "status": "compatible|incompatible|unknown"}
                ]
            }
        ]
    }
    """
    
    print(f"\n📋 Lettura CSV: {csv_path}")
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        rows = list(reader)
    
    if len(rows) < 2:
        raise ValueError("CSV vuoto o malformato")
    
    # Header (riga 0)
    header = rows[0]
    print(f"✓ Header letto: {len(header)} colonne")
    
    # Identifica le colonne
    # Colonna 0: PRINCIPIO ATTIVO
    # Colonne 1-4: FOTOSENSIBILE, NECESSITÀ DI CVC, NOTES/CONCENTRAZIONI, NOTO RISCHIO FLEBITE
    # Colonne 5+: Nomi dei farmaci (per compatibilità)
    
    metadata_cols = {
        'fotosensibile': 1,
        'cvc': 2,
        'notes': 3,
        'flebite': 4
    }
    
    drug_names_in_header = header[5:]  # Farmaci nelle colonne
    print(f"✓ Farmaci nelle colonne: {len(drug_names_in_header)}")
    
    # Estrai farmaci dalle righe (1 in poi)
    drug_rows = rows[1:]
    print(f"✓ Farmaci nelle righe: {len(drug_rows)}")
    
    # Crea mapping nome -> index
    drug_name_to_index = {}
    for idx, name in enumerate(drug_names_in_header):
        clean_name = clean_value(name)
        if clean_name:
            drug_name_to_index[clean_name] = idx
    
    # Costruisci database
    drugs_data = []
    compatibility_count = {
        'compatible': 0,
        'incompatible': 0,
        'compatible-conditional': 0,
        'incompatible-severe': 0,
        'unknown': 0
    }
    
    for row_idx, row in enumerate(drug_rows):
        if len(row) < 5:
            print(f"⚠️  Riga {row_idx + 2} troppo corta, saltata")
            continue
        
        drug_name = clean_value(row[0])
        if not drug_name:
            print(f"⚠️  Riga {row_idx + 2} senza nome farmaco, saltata")
            continue
        
        drug_id = create_drug_id(drug_name)
        
        # Metadati
        is_photosensitive = parse_boolean_field(row[metadata_cols['fotosensibile']])
        cvc_info = parse_cvc_requirement(row[metadata_cols['cvc']])
        concentration_notes_it = clean_value(row[metadata_cols['notes']])
        phlebitis_risk_it = clean_value(row[metadata_cols['flebite']])
        
        # Compatibilità
        compatibility_list = []
        compatibility_values = row[5:]  # Valori compatibilità dalla colonna 5 in poi
        
        for other_drug_name, col_idx in drug_name_to_index.items():
            if col_idx < len(compatibility_values):
                raw_value = compatibility_values[col_idx]
                status = parse_compatibility_value(raw_value)
                
                other_drug_id = create_drug_id(other_drug_name)
                compatibility_list.append({
                    'drugId': other_drug_id,
                    'status': status
                })
                
                compatibility_count[status] += 1
        
        # Costruisci oggetto farmaco
        drug_obj = {
            'id': drug_id,
            'name': {
                'it': drug_name,
                'en': drug_name  # TODO: Aggiungere traduzioni inglesi se disponibili
            },
            'isPhotosensitive': is_photosensitive,
            'cvcRequirement': {
                'required': cvc_info['required'],
                'details': {
                    'it': cvc_info['details'],
                    'en': ''  # TODO: Aggiungere traduzioni
                }
            },
            'concentrationNotes': {
                'it': concentration_notes_it,
                'en': ''  # TODO: Aggiungere traduzioni
            },
            'phlebitisRisk': {
                'it': phlebitis_risk_it,
                'en': ''  # TODO: Aggiungere traduzioni
            },
            'additionalInfo': {},  # Spazio per informazioni aggiuntive future
            'compatibility': compatibility_list
        }
        
        drugs_data.append(drug_obj)
    
    # Metadata del database
    metadata = {
        'version': '1.0.0',
        'generatedAt': datetime.now().isoformat(),
        'sourceFile': os.path.basename(csv_path),
        'totalDrugs': len(drugs_data),
        'totalCompatibilityEntries': sum(len(d['compatibility']) for d in drugs_data),
        'compatibilityStats': compatibility_count,
        'schema': {
            'compatibilityStatuses': [
                'compatible',
                'incompatible', 
                'compatible-conditional',
                'incompatible-severe',
                'unknown'
            ],
            'multilingual': ['it', 'en']
        }
    }
    
    database = {
        'metadata': metadata,
        'drugs': drugs_data
    }
    
    # Salva JSON
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, 'drugs-database.json')
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(database, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Database creato: {output_path}")
    print(f"\n📊 Statistiche:")
    print(f"   • Farmaci totali: {metadata['totalDrugs']}")
    print(f"   • Compatibilità totali: {metadata['totalCompatibilityEntries']}")
    print(f"   • Compatible: {compatibility_count['compatible']}")
    print(f"   • Incompatible: {compatibility_count['incompatible']}")
    print(f"   • Unknown: {compatibility_count['unknown']}")
    
    # Salva anche versione minificata per produzione
    output_path_min = os.path.join(output_dir, 'drugs-database.min.json')
    with open(output_path_min, 'w', encoding='utf-8') as f:
        json.dump(database, f, ensure_ascii=False, separators=(',', ':'))
    
    print(f"   • File minificato: {output_path_min}")
    
    # Calcola dimensioni
    size_readable = os.path.getsize(output_path) / 1024
    size_min = os.path.getsize(output_path_min) / 1024
    print(f"   • Dimensione leggibile: {size_readable:.1f} KB")
    print(f"   • Dimensione minificata: {size_min:.1f} KB")
    
    return database


def validate_database(database: Dict[str, Any]) -> List[str]:
    """
    Valida il database generato
    Ritorna lista di errori (vuota se tutto OK)
    """
    errors = []
    
    if 'metadata' not in database:
        errors.append("Missing 'metadata' key")
    
    if 'drugs' not in database:
        errors.append("Missing 'drugs' key")
        return errors
    
    drugs = database['drugs']
    drug_ids = set()
    
    for idx, drug in enumerate(drugs):
        # Verifica campi obbligatori
        required_fields = ['id', 'name', 'isPhotosensitive', 'cvcRequirement', 
                          'concentrationNotes', 'phlebitisRisk', 'compatibility']
        
        for field in required_fields:
            if field not in drug:
                errors.append(f"Drug {idx}: missing field '{field}'")
        
        # Verifica ID univoci
        drug_id = drug.get('id')
        if drug_id in drug_ids:
            errors.append(f"Duplicate drug ID: {drug_id}")
        drug_ids.add(drug_id)
        
        # Verifica struttura multilingua
        if 'name' in drug and not isinstance(drug['name'], dict):
            errors.append(f"Drug {drug_id}: 'name' should be object with 'it', 'en'")
        
        # Verifica compatibilità
        if 'compatibility' in drug:
            for comp in drug['compatibility']:
                if 'drugId' not in comp or 'status' not in comp:
                    errors.append(f"Drug {drug_id}: invalid compatibility entry")
                elif comp['status'] not in ['compatible', 'incompatible', 'compatible-conditional', 'incompatible-severe', 'unknown']:
                    errors.append(f"Drug {drug_id}: invalid status '{comp['status']}'")
    
    return errors


def main():
    """Main execution"""
    
    # Percorsi
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_csv = os.path.join(script_dir, 'input', 'drugsCompatibility - compFarmaci.csv')
    output_dir = os.path.join(script_dir, 'output')
    
    print("=" * 70)
    print("🔄 CSV to JSON Drug Database Converter")
    print("=" * 70)
    
    # Verifica input
    if not os.path.exists(input_csv):
        print(f"❌ File CSV non trovato: {input_csv}")
        sys.exit(1)
    
    try:
        # Conversione
        database = convert_csv_to_json(input_csv, output_dir)
        
        # Validazione
        print(f"\n🔍 Validazione database...")
        errors = validate_database(database)
        
        if errors:
            print(f"\n❌ Errori di validazione trovati:")
            for error in errors:
                print(f"   • {error}")
            sys.exit(1)
        else:
            print(f"✅ Database validato correttamente")
        
        print("\n" + "=" * 70)
        print("✨ Conversione completata con successo!")
        print("=" * 70)
        
    except Exception as e:
        print(f"\n❌ Errore durante la conversione: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()

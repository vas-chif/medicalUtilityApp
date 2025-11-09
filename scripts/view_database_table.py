#!/usr/bin/env python3
"""
Visualizzatore Database Farmaci - Mostra il database in formato tabella
Legge src/data/drugs.ts e mostra i dati in formato tabellare leggibile
"""

import json
import re
from typing import List, Dict, Any

def extract_drugs_from_ts(file_path: str) -> List[Dict[str, Any]]:
    """Estrae i dati dei farmaci dal file TypeScript"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Trova l'array drugs
    drugs_match = re.search(r'drugs:\s*\[(.*?)\],\s*compatibilityMatrix', content, re.DOTALL)
    if not drugs_match:
        return []
    
    drugs_text = drugs_match.group(1)
    
    # Estrai ogni oggetto farmaco
    drug_objects = re.findall(r'\{([^}]+)\}', drugs_text)
    
    drugs = []
    for obj in drug_objects:
        drug = {}
        
        # ID
        id_match = re.search(r"id:\s*'([^']+)'", obj)
        if id_match:
            drug['id'] = id_match.group(1)
        
        # Name
        name_match = re.search(r"name:\s*'([^']+)'", obj)
        if name_match:
            drug['name'] = name_match.group(1)
        
        # Active Ingredient
        ingredient_match = re.search(r"activeIngredient:\s*'([^']+)'", obj)
        if ingredient_match:
            drug['activeIngredient'] = ingredient_match.group(1)
        
        # Category
        category_match = re.search(r"category:\s*DrugCategory\.(\w+)", obj)
        if category_match:
            drug['category'] = category_match.group(1)
        
        # Concentration
        conc_match = re.search(r"concentration:\s*'([^']+)'", obj)
        if conc_match:
            drug['concentration'] = conc_match.group(1)
        
        # Route
        route_match = re.search(r"route:\s*AdministrationRoute\.(\w+)", obj)
        if route_match:
            drug['route'] = route_match.group(1)
        
        # Clinical Notes
        notes_match = re.search(r"clinicalNotes:\s*'([^']+)'", obj)
        if notes_match:
            drug['clinicalNotes'] = notes_match.group(1)
        
        # Requires CVC (opzionale)
        cvc_match = re.search(r"requiresCVC:\s*(true|false)", obj)
        if cvc_match:
            drug['requiresCVC'] = cvc_match.group(1) == 'true'
        else:
            drug['requiresCVC'] = False
        
        # Light Sensitive (opzionale)
        light_match = re.search(r"lightSensitive:\s*(true|false)", obj)
        if light_match:
            drug['lightSensitive'] = light_match.group(1) == 'true'
        else:
            drug['lightSensitive'] = False
        
        if drug:
            drugs.append(drug)
    
    return drugs


def print_table_header():
    """Stampa l'intestazione della tabella"""
    print("\n" + "="*160)
    print(f"{'#':<4} {'Nome Farmaco':<20} {'Principio Attivo':<25} {'Categoria':<15} {'Concentrazione':<20} {'CVC':<5} {'Light':<6} {'Note Cliniche':<40}")
    print("="*160)


def print_drug_row(index: int, drug: Dict[str, Any]):
    """Stampa una riga della tabella per un farmaco"""
    
    name = drug.get('name', 'N/A')[:19]
    ingredient = drug.get('activeIngredient', 'N/A')[:24]
    category = drug.get('category', 'N/A')[:14]
    concentration = drug.get('concentration', 'N/A')[:19]
    cvc = '✅ SI' if drug.get('requiresCVC', False) else '❌ NO'
    light = '🔒 SI' if drug.get('lightSensitive', False) else '⚪ NO'
    notes = drug.get('clinicalNotes', '')[:39]
    
    print(f"{index:<4} {name:<20} {ingredient:<25} {category:<15} {concentration:<20} {cvc:<5} {light:<6} {notes:<40}")


def print_compatibility_matrix_sample(file_path: str):
    """Stampa un esempio della matrice di compatibilità"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Trova la matrice di compatibilità
    matrix_match = re.search(r'compatibilityMatrix:\s*\{(.*?)\n  \}', content, re.DOTALL)
    if not matrix_match:
        print("\n⚠️ Matrice di compatibilità non trovata")
        return
    
    print("\n" + "="*120)
    print("📊 MATRICE DI COMPATIBILITÀ (Primi 5 farmaci)")
    print("="*120)
    
    # Estrai le prime 5 entry
    matrix_text = matrix_match.group(1)
    drug_entries = re.findall(r"(\w+):\s*\{([^}]+)\}", matrix_text)[:5]
    
    for drug_name, compatibilities in drug_entries:
        print(f"\n🔹 {drug_name}:")
        
        # Estrai compatibilità
        compat_pairs = re.findall(r"(\w+(?:\s+\w+)?):\s*DrugCompatibility\.(\w+)", compatibilities)
        
        for other_drug, compat_level in compat_pairs[:5]:  # Primi 5 per brevità
            # Emoji per tipo compatibilità
            emoji = {
                'COMPATIBLE': '🟢',
                'COMPATIBLE_ON_TAP': '🟡',
                'INCOMPATIBLE': '🔴',
                'CONFLICTING_DATA': '🟠',
                'NO_DATA': '⚪'
            }.get(compat_level, '❓')
            
            print(f"   {emoji} {other_drug:<20} → {compat_level}")


def print_summary(drugs: List[Dict[str, Any]]):
    """Stampa statistiche riassuntive"""
    
    total = len(drugs)
    with_cvc = sum(1 for d in drugs if d.get('requiresCVC', False))
    light_sensitive = sum(1 for d in drugs if d.get('lightSensitive', False))
    
    # Conta per categoria
    categories = {}
    for drug in drugs:
        cat = drug.get('category', 'UNKNOWN')
        categories[cat] = categories.get(cat, 0) + 1
    
    print("\n" + "="*80)
    print("📈 STATISTICHE DATABASE")
    print("="*80)
    print(f"Totale Farmaci:              {total}")
    print(f"Richiedono CVC:              {with_cvc} ({with_cvc/total*100:.1f}%)")
    print(f"Fotosensibili:               {light_sensitive} ({light_sensitive/total*100:.1f}%)")
    
    print(f"\n📊 Distribuzione per Categoria:")
    for cat, count in sorted(categories.items(), key=lambda x: x[1], reverse=True):
        print(f"   • {cat:<20} → {count:>3} farmaci")


def main():
    """Funzione principale"""
    
    print("="*160)
    print("🏥 VISUALIZZATORE DATABASE FARMACI - San Gerardo Hospital")
    print("="*160)
    
    file_path = '../src/data/drugs.ts'
    
    try:
        # Estrai dati
        drugs = extract_drugs_from_ts(file_path)
        
        if not drugs:
            print("\n⚠️ Nessun farmaco trovato nel database!")
            return
        
        # Stampa tabella
        print_table_header()
        for i, drug in enumerate(drugs, 1):
            print_drug_row(i, drug)
        print("="*160)
        
        # Stampa statistiche
        print_summary(drugs)
        
        # Stampa campione matrice compatibilità
        print_compatibility_matrix_sample(file_path)
        
        print("\n" + "="*160)
        print("✅ Visualizzazione completata!")
        print("="*160)
        
        # Info aggiuntive
        print("\n💡 LEGENDA:")
        print("   CVC:   ✅ SI = Richiede Catetere Venoso Centrale | ❌ NO = Via periferica OK")
        print("   Light: 🔒 SI = Fotosensibile (proteggere dalla luce) | ⚪ NO = Non fotosensibile")
        print("\n   Compatibilità: 🟢 Compatible | 🟡 Y-site only | 🔴 Incompatible | 🟠 Conflicting data | ⚪ No data")
        
        print(f"\n📁 File analizzato: {file_path}")
        print(f"📊 Totale farmaci: {len(drugs)}")
        
    except FileNotFoundError:
        print(f"\n❌ ERRORE: File {file_path} non trovato!")
        print("Assicurati di essere nella directory scripts/")
    except Exception as e:
        print(f"\n❌ ERRORE: {e}")


if __name__ == '__main__':
    main()

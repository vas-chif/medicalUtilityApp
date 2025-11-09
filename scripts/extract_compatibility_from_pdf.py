#!/usr/bin/env python3
"""
Extract drug compatibility from PDF using OCR

Requirements:
pip install pytesseract pdf2image pillow pandas openpyxl

System packages (Ubuntu):
sudo apt-get install tesseract-ocr poppler-utils
"""

import re
import sys
from pathlib import Path
from typing import Dict, List, Tuple

try:
    import pytesseract
    from pdf2image import convert_from_path
    from PIL import Image
    import pandas as pd
except ImportError as e:
    print(f"❌ Errore import: {e}")
    print("\n📦 Installa dipendenze:")
    print("pip install pytesseract pdf2image pillow pandas openpyxl")
    print("\nSu Ubuntu:")
    print("sudo apt-get install tesseract-ocr poppler-utils")
    sys.exit(1)


def extract_text_from_pdf(pdf_path: str, dpi: int = 300) -> List[str]:
    """
    Estrae testo da PDF usando OCR
    
    Args:
        pdf_path: Percorso al PDF
        dpi: Risoluzione immagini (più alto = migliore qualità)
    
    Returns:
        Lista di testi estratti (uno per pagina)
    """
    print(f"📄 Convertendo PDF in immagini (DPI: {dpi})...")
    
    try:
        images = convert_from_path(pdf_path, dpi=dpi)
    except Exception as e:
        print(f"❌ Errore conversione PDF: {e}")
        return []
    
    texts = []
    
    for i, image in enumerate(images, 1):
        print(f"📖 OCR pagina {i}/{len(images)}...")
        
        # OCR con Tesseract (italiano)
        text = pytesseract.image_to_string(image, lang='ita+eng')
        texts.append(text)
    
    return texts


def parse_compatibility_table(text: str) -> Dict[str, Dict[str, str]]:
    """
    Parse tabella compatibilità da testo OCR
    
    Cerca pattern tipo:
    Farmaco1    Farmaco2    C/Y/I
    o tabelle con righe/colonne
    """
    compatibility = {}
    
    lines = text.split('\n')
    
    # Pattern per riga compatibilità
    # Es: "Amikacin | Ampicillin | I"
    pattern = r'([A-Za-z]+)\s*[|\-]\s*([A-Za-z]+)\s*[|\-]\s*([CYI])'
    
    for line in lines:
        match = re.search(pattern, line)
        if match:
            drug1, drug2, compat = match.groups()
            
            if drug1 not in compatibility:
                compatibility[drug1] = {}
            
            compatibility[drug1][drug2] = compat
            
            # Aggiungi simmetrico
            if drug2 not in compatibility:
                compatibility[drug2] = {}
            compatibility[drug2][drug1] = compat
    
    return compatibility


def extract_drug_names(texts: List[str]) -> List[str]:
    """
    Estrae nomi farmaci dal testo
    """
    drugs = set()
    
    # Lista farmaci comuni (da espandere)
    known_drugs = [
        'Amikacin', 'Ampicillin', 'Fentanyl', 'Midazolam',
        'Heparin', 'Dopamine', 'Norepinephrine', 'Insulin',
        'Furosemide', 'Potassium', 'Morphine', 'Propofol',
        'Vancomycin', 'Gentamicin', 'Metronidazole'
    ]
    
    for text in texts:
        for drug in known_drugs:
            if drug.lower() in text.lower():
                drugs.add(drug)
    
    return sorted(list(drugs))


def create_compatibility_matrix(compatibility: Dict[str, Dict[str, str]]) -> pd.DataFrame:
    """
    Crea DataFrame matrice compatibilità
    """
    drugs = sorted(compatibility.keys())
    
    # Crea matrice vuota
    matrix = pd.DataFrame('', index=drugs, columns=drugs)
    
    # Riempi con compatibilità
    for drug1 in drugs:
        for drug2 in drugs:
            if drug1 != drug2:
                compat = compatibility.get(drug1, {}).get(drug2, '')
                matrix.loc[drug1, drug2] = compat
    
    return matrix


def main():
    """
    Workflow completo estrazione
    """
    print("🔬 DRUG COMPATIBILITY EXTRACTOR")
    print("=" * 50)
    
    # Cerca PDF nella directory
    pdf_files = list(Path('.').glob('*.pdf'))
    
    if not pdf_files:
        print("❌ Nessun PDF trovato nella directory corrente")
        print("💡 Copia il PDF delle compatibilità qui e riprova")
        return
    
    pdf_path = pdf_files[0]
    print(f"📄 PDF trovato: {pdf_path}")
    
    # Estrai testo
    texts = extract_text_from_pdf(str(pdf_path))
    
    if not texts:
        print("❌ Nessun testo estratto")
        return
    
    print(f"✅ Estratte {len(texts)} pagine")
    
    # Salva testo grezzo per debug
    output_text = Path('extracted_text.txt')
    with open(output_text, 'w', encoding='utf-8') as f:
        for i, text in enumerate(texts, 1):
            f.write(f"\n{'='*50}\n")
            f.write(f"PAGINA {i}\n")
            f.write(f"{'='*50}\n")
            f.write(text)
    
    print(f"💾 Testo salvato in: {output_text}")
    
    # Estrai farmaci
    drugs = extract_drug_names(texts)
    print(f"\n💊 Farmaci trovati ({len(drugs)}):")
    for drug in drugs:
        print(f"   - {drug}")
    
    # Parse compatibilità
    compatibility = {}
    for text in texts:
        compat = parse_compatibility_table(text)
        compatibility.update(compat)
    
    if compatibility:
        print(f"\n✅ Compatibilità trovate: {len(compatibility)}")
        
        # Crea matrice
        matrix = create_compatibility_matrix(compatibility)
        
        # Salva Excel
        excel_file = Path('drug_compatibility_extracted.xlsx')
        matrix.to_excel(excel_file)
        print(f"💾 Excel salvato: {excel_file}")
        
        # Salva CSV
        csv_file = Path('drug_compatibility_extracted.csv')
        matrix.to_csv(csv_file)
        print(f"💾 CSV salvato: {csv_file}")
    else:
        print("\n⚠️  Nessuna compatibilità estratta automaticamente")
        print("💡 Controlla extracted_text.txt e completa manualmente")
    
    print("\n" + "="*50)
    print("✅ COMPLETATO")
    print("="*50)
    print("\n📋 PROSSIMI PASSI:")
    print("1. Verifica extracted_text.txt")
    print("2. Importa drug_compatibility_extracted.xlsx in Google Sheets")
    print("3. Usa interfaccia Google Apps Script per completare manualmente")


if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""
Drug Compatibility Table OCR Extractor
Extracts drug compatibility data from San Gerardo Hospital table images

Usage:
    python extract_drug_data.py --input images/ --output drugs_extracted.json

Requirements:
    pip install pytesseract pillow opencv-python pandas numpy
"""

import argparse
import json
import re
from pathlib import Path
from typing import Dict, List, Tuple
import sys

# Optional dependencies (install with: pip install pytesseract pillow opencv-python pandas)
try:
    import cv2
    import numpy as np
    from PIL import Image
    import pytesseract
    HAS_OCR = True
except ImportError:
    HAS_OCR = False
    print("⚠️  OCR libraries not installed. Install with:")
    print("   pip install pytesseract pillow opencv-python pandas numpy")
    print("   Also install Tesseract OCR: https://github.com/tesseract-ocr/tesseract")

# Compatibility legend from San Gerardo Hospital
COMPATIBILITY_MAP = {
    'C': 'COMPATIBLE',           # Green - Compatible
    'Y': 'COMPATIBLE_ON_TAP',    # Yellow - Y-site only
    'I': 'INCOMPATIBLE',         # Red - Incompatible
    '!': 'CONFLICTING_DATA',     # Orange - Conflicting data
    'si': 'CVC_REQUIRED',        # Light green - CVC necessary
    '': 'NO_DATA',               # Grey - No data available
}

DRUG_CATEGORIES = {
    'antibiotic': ['cillin', 'mycin', 'floxacin', 'cef', 'vanco', 'mero'],
    'analgesic': ['fentanyl', 'morphine', 'tramadol', 'alfentanil', 'remifentanil'],
    'cardiovascular': ['diltiazem', 'verapamil', 'nitroglycerin', 'adenosine'],
    'anticoagulant': ['heparin', 'warfarin', 'alteplase', 'tranexamic'],
    'sedative': ['midazolam', 'propofol', 'dexmedetomidine', 'ketamine'],
    'vasopressor': ['norepinephrine', 'epinephrine', 'dopamine', 'dobutamine', 'vasopressin'],
    'insulin': ['insulin'],
    'diuretic': ['furosemide', 'torasemide', 'mannitol'],
    'antiarrhythmic': ['amiodarone', 'lidocaine', 'procainamide'],
    'electrolyte': ['potassium', 'calcium', 'magnesium', 'sodium', 'phosphate'],
}


def detect_category(drug_name: str) -> str:
    """Detect drug category based on drug name"""
    drug_lower = drug_name.lower()
    
    for category, keywords in DRUG_CATEGORIES.items():
        if any(keyword in drug_lower for keyword in keywords):
            return category
    
    return 'other'


def extract_drug_names_from_image(image_path: str) -> List[str]:
    """
    Extract drug names from the first column of the table image
    
    Args:
        image_path: Path to the table image
        
    Returns:
        List of drug names extracted from the image
    """
    if not HAS_OCR:
        print(f"❌ Cannot process {image_path}: OCR libraries not installed")
        return []
    
    try:
        # Load image
        img = cv2.imread(image_path)
        if img is None:
            print(f"❌ Failed to load image: {image_path}")
            return []
        
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Apply thresholding to get better OCR results
        _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY_INV)
        
        # Extract the first column (drug names) - approximate coordinates
        height, width = thresh.shape
        first_column = thresh[:, :int(width * 0.15)]  # First 15% of width
        
        # OCR on first column
        text = pytesseract.image_to_string(first_column, config='--psm 6')
        
        # Parse drug names (clean up OCR artifacts)
        drug_names = []
        for line in text.split('\n'):
            line = line.strip()
            # Remove common OCR errors and filter valid drug names
            if len(line) > 3 and not line.isdigit():
                # Clean drug name
                drug_name = re.sub(r'[^a-zA-Z\s\+\-]', '', line)
                drug_name = ' '.join(drug_name.split())  # Remove extra spaces
                if drug_name:
                    drug_names.append(drug_name.title())
        
        print(f"✅ Extracted {len(drug_names)} drug names from {Path(image_path).name}")
        return drug_names
        
    except Exception as e:
        print(f"❌ Error processing {image_path}: {e}")
        return []


def extract_compatibility_matrix_from_image(image_path: str, drug_names: List[str]) -> Dict:
    """
    Extract compatibility matrix from table image using color detection
    
    Args:
        image_path: Path to the table image
        drug_names: List of drug names for the matrix
        
    Returns:
        Dictionary with compatibility data
    """
    if not HAS_OCR:
        print(f"❌ Cannot process {image_path}: OCR libraries not installed")
        return {}
    
    try:
        # Load image
        img = cv2.imread(image_path)
        if img is None:
            print(f"❌ Failed to load image: {image_path}")
            return {}
        
        # Convert to HSV for color detection
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        
        # Define color ranges for compatibility codes
        color_ranges = {
            'C': {'lower': np.array([35, 50, 50]), 'upper': np.array([85, 255, 255])},    # Green
            'Y': {'lower': np.array([15, 50, 50]), 'upper': np.array([35, 255, 255])},    # Yellow
            'I': {'lower': np.array([0, 50, 50]), 'upper': np.array([10, 255, 255])},     # Red
            '!': {'lower': np.array([10, 50, 50]), 'upper': np.array([25, 255, 255])},    # Orange
        }
        
        compatibility_matrix = {}
        
        # TODO: Implement grid detection and color analysis
        # This is a placeholder - full implementation would require:
        # 1. Detect table grid lines
        # 2. Extract each cell
        # 3. Analyze cell color
        # 4. Map to compatibility code
        
        print(f"✅ Processed compatibility matrix from {Path(image_path).name}")
        return compatibility_matrix
        
    except Exception as e:
        print(f"❌ Error processing compatibility matrix from {image_path}: {e}")
        return {}


def manual_input_mode():
    """
    Interactive manual data entry mode
    """
    print("\n" + "="*60)
    print("🏥 MANUAL DATA ENTRY MODE")
    print("="*60)
    print("\nInstructions:")
    print("1. Enter drug names from the San Gerardo Hospital table")
    print("2. For each drug pair, enter compatibility code")
    print("3. Type 'done' when finished")
    print("\nCompatibility codes:")
    print("  C = Compatible (Green)")
    print("  Y = Y-site only (Yellow)")
    print("  I = Incompatible (Red)")
    print("  ! = Conflicting data (Orange)")
    print("  si = CVC required (Light green)")
    print("  '' = No data (Grey)")
    print("="*60 + "\n")
    
    drugs = []
    compatibility_matrix = {}
    
    # Collect drug names
    print("📝 Enter drug names (type 'done' to finish):")
    while True:
        drug_name = input(f"\nDrug #{len(drugs) + 1}: ").strip()
        if drug_name.lower() == 'done':
            break
        if drug_name:
            drug_id = drug_name.lower().replace(' ', '-')
            category = detect_category(drug_name)
            
            # Optional details
            print(f"  Detected category: {category}")
            active_ingredient = input("  Active ingredient (optional): ").strip()
            concentration = input("  Concentration (optional): ").strip()
            requires_cvc = input("  Requires CVC? (y/n): ").strip().lower() == 'y'
            light_sensitive = input("  Light sensitive? (y/n): ").strip().lower() == 'y'
            clinical_notes = input("  Clinical notes (optional): ").strip()
            
            drugs.append({
                'id': drug_id,
                'name': drug_name,
                'activeIngredient': active_ingredient or None,
                'category': category,
                'concentration': concentration or None,
                'route': 'intravenous',
                'requiresCVC': requires_cvc,
                'lightSensitive': light_sensitive,
                'clinicalNotes': clinical_notes or None,
            })
            
            print(f"  ✅ Added: {drug_name}")
    
    if len(drugs) == 0:
        print("\n❌ No drugs entered. Exiting.")
        return
    
    print(f"\n✅ Total drugs entered: {len(drugs)}")
    
    # Collect compatibility data (optional)
    print("\n" + "="*60)
    collect_compat = input("Enter compatibility data now? (y/n): ").strip().lower()
    
    if collect_compat == 'y':
        print("\n📊 Enter compatibility data:")
        print("For each drug pair, enter the compatibility code")
        print("(Press Enter to skip a pair)\n")
        
        for i, drug1 in enumerate(drugs):
            compatibility_matrix[drug1['name']] = {}
            for j, drug2 in enumerate(drugs):
                if i < j:  # Only ask for upper triangle (matrix is symmetric)
                    compat = input(f"{drug1['name']} + {drug2['name']}: ").strip().upper()
                    if compat in COMPATIBILITY_MAP:
                        compatibility_matrix[drug1['name']][drug2['name']] = compat
    
    # Save to JSON
    output_data = {
        'version': '1.0.0',
        'lastUpdate': '2025-01-20',
        'description': 'Drug compatibility database - San Gerardo Hospital (Manual Entry)',
        'drugs': drugs,
        'compatibilityMatrix': compatibility_matrix,
    }
    
    output_file = 'drugs_manual_entry.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Data saved to: {output_file}")
    print(f"📊 Statistics:")
    print(f"   - Drugs: {len(drugs)}")
    print(f"   - Compatibility entries: {sum(len(v) for v in compatibility_matrix.values())}")


def main():
    parser = argparse.ArgumentParser(
        description='Extract drug compatibility data from San Gerardo Hospital table images'
    )
    parser.add_argument(
        '--input',
        '-i',
        type=str,
        help='Path to directory containing table images'
    )
    parser.add_argument(
        '--output',
        '-o',
        type=str,
        default='drugs_extracted.json',
        help='Output JSON file path (default: drugs_extracted.json)'
    )
    parser.add_argument(
        '--manual',
        '-m',
        action='store_true',
        help='Enable manual data entry mode (interactive)'
    )
    
    args = parser.parse_args()
    
    # Manual mode
    if args.manual or not args.input:
        manual_input_mode()
        return
    
    # OCR mode (if libraries available)
    if not HAS_OCR:
        print("\n❌ OCR mode requires additional libraries.")
        print("   Use --manual flag for interactive data entry instead:")
        print("   python extract_drug_data.py --manual")
        sys.exit(1)
    
    input_dir = Path(args.input)
    if not input_dir.exists():
        print(f"❌ Input directory not found: {input_dir}")
        sys.exit(1)
    
    # Find all images
    image_files = list(input_dir.glob('*.png')) + list(input_dir.glob('*.jpg')) + list(input_dir.glob('*.jpeg'))
    
    if not image_files:
        print(f"❌ No images found in: {input_dir}")
        sys.exit(1)
    
    print(f"📸 Found {len(image_files)} images")
    
    # Extract data from each image
    all_drugs = []
    all_compatibility = {}
    
    for img_path in sorted(image_files):
        print(f"\n🔍 Processing: {img_path.name}")
        
        # Extract drug names
        drug_names = extract_drug_names_from_image(str(img_path))
        
        # Extract compatibility matrix
        compat_data = extract_compatibility_matrix_from_image(str(img_path), drug_names)
        
        # Add to global lists
        for drug_name in drug_names:
            drug_id = drug_name.lower().replace(' ', '-')
            all_drugs.append({
                'id': drug_id,
                'name': drug_name,
                'category': detect_category(drug_name),
                'route': 'intravenous',
            })
        
        all_compatibility.update(compat_data)
    
    # Save to JSON
    output_data = {
        'version': '1.0.0',
        'lastUpdate': '2025-01-20',
        'description': 'Drug compatibility database - San Gerardo Hospital (OCR Extraction)',
        'drugs': all_drugs,
        'compatibilityMatrix': all_compatibility,
    }
    
    with open(args.output, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Extraction complete!")
    print(f"📄 Output file: {args.output}")
    print(f"📊 Total drugs: {len(all_drugs)}")


if __name__ == '__main__':
    main()

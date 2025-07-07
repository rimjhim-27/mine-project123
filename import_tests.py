#!/usr/bin/env python3
import re
import psycopg2
import os
import uuid
from datetime import datetime

# Database connection
DATABASE_URL = os.environ.get('DATABASE_URL')
if not DATABASE_URL:
    print("Error: DATABASE_URL not found")
    exit(1)

def parse_test_line(line):
    """Parse a test line and extract test information"""
    line = line.strip()
    if not line or 'Sr.No' in line or 'Test Name' in line or 'MRP' in line:
        return None
    
    # More flexible pattern to handle various formats
    # Look for: number, test name, price (with possible commas), sample type
    pattern = r'^(\d+)\s+(.+?)\s+([0-9,]+)\s+(.+?)$'
    match = re.match(pattern, line)
    
    if match:
        sr_no, test_name, price, sample_type = match.groups()
        # Clean price (remove commas)
        try:
            price = int(price.replace(',', ''))
        except ValueError:
            return None
        return {
            'name': test_name.strip(),
            'price': price,
            'sample_type': sample_type.strip(),
            'sr_no': int(sr_no)
        }
    
    # Alternative pattern for lines without clear separation
    parts = line.split()
    if len(parts) >= 3:
        # Try to find the price (number with commas)
        for i, part in enumerate(parts):
            if re.match(r'^[0-9,]+$', part):
                try:
                    price = int(part.replace(',', ''))
                    test_name = ' '.join(parts[1:i])
                    sample_type = ' '.join(parts[i+1:]) if i+1 < len(parts) else 'Serum'
                    return {
                        'name': test_name.strip(),
                        'price': price,
                        'sample_type': sample_type.strip() if sample_type.strip() else 'Serum',
                        'sr_no': int(parts[0]) if parts[0].isdigit() else 0
                    }
                except ValueError:
                    continue
    
    return None

def categorize_test(test_name):
    """Categorize test based on name"""
    test_name_lower = test_name.lower()
    
    if any(keyword in test_name_lower for keyword in ['blood', 'cbc', 'hemoglobin', 'hematocrit', 'wbc', 'rbc', 'platelet']):
        return 'Hematology'
    elif any(keyword in test_name_lower for keyword in ['glucose', 'sugar', 'diabetes', 'hba1c', 'insulin']):
        return 'Diabetes'
    elif any(keyword in test_name_lower for keyword in ['thyroid', 'tsh', 't3', 't4', 'hormone']):
        return 'Hormones'
    elif any(keyword in test_name_lower for keyword in ['vitamin', 'b12', 'folate', 'iron', 'ferritin']):
        return 'Vitamins & Minerals'
    elif any(keyword in test_name_lower for keyword in ['liver', 'sgot', 'sgpt', 'bilirubin', 'albumin']):
        return 'Liver Function'
    elif any(keyword in test_name_lower for keyword in ['kidney', 'creatinine', 'urea', 'uric']):
        return 'Kidney Function'
    elif any(keyword in test_name_lower for keyword in ['cardiac', 'heart', 'troponin', 'ck-mb', 'lipid', 'cholesterol']):
        return 'Cardiac'
    elif any(keyword in test_name_lower for keyword in ['urine', 'urinalysis']):
        return 'Urine Tests'
    elif any(keyword in test_name_lower for keyword in ['culture', 'bacteria', 'sensitivity', 'afb', 'fungal']):
        return 'Microbiology'
    elif any(keyword in test_name_lower for keyword in ['antibody', 'antigen', 'immunity', 'vaccine']):
        return 'Immunology'
    elif any(keyword in test_name_lower for keyword in ['cancer', 'tumor', 'marker', 'cea', 'psa', 'ca']):
        return 'Tumor Markers'
    elif any(keyword in test_name_lower for keyword in ['pregnancy', 'beta', 'hcg']):
        return 'Pregnancy'
    else:
        return 'General'

def generate_symptoms(test_name, category):
    """Generate relevant symptoms for the test"""
    test_name_lower = test_name.lower()
    
    if category == 'Diabetes':
        return ['Excessive thirst', 'Frequent urination', 'Fatigue', 'Blurred vision']
    elif category == 'Hormones':
        return ['Weight changes', 'Mood swings', 'Fatigue', 'Hair loss']
    elif category == 'Cardiac':
        return ['Chest pain', 'Shortness of breath', 'Palpitations', 'Fatigue']
    elif category == 'Liver Function':
        return ['Jaundice', 'Abdominal pain', 'Fatigue', 'Nausea']
    elif category == 'Kidney Function':
        return ['Swelling', 'Frequent urination', 'Blood in urine', 'Back pain']
    elif category == 'Hematology':
        return ['Fatigue', 'Weakness', 'Bruising', 'Pale skin']
    elif category == 'Vitamins & Minerals':
        return ['Fatigue', 'Weakness', 'Bone pain', 'Hair loss']
    else:
        return ['General health screening', 'Routine checkup', 'Preventive care']

def main():
    # Read the test file
    with open('attached_assets/Patna_test_Rate_List_Cleaned (1)-compressed_1751824958331.txt', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    tests = []
    current_test = None
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Try to parse as a complete test line
        test_data = parse_test_line(line)
        if test_data:
            current_test = test_data
            tests.append(current_test)
        elif current_test and line and not line.startswith('Sr.No'):
            # This might be a continuation of the previous test name
            if not any(char.isdigit() for char in line):
                current_test['name'] += ' ' + line
    
    print(f"Parsed {len(tests)} tests from the file")
    
    # Connect to database and insert tests
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    for test in tests:
        category = categorize_test(test['name'])
        symptoms = generate_symptoms(test['name'], category)
        
        # Generate test description
        description = f"{test['name']} - {test['sample_type']} sample analysis"
        
        cur.execute("""
            INSERT INTO individual_tests (
                name, description, price, category, symptoms, 
                preparation_required, report_time, home_collection
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            test['name'],
            description,
            test['price'],
            category,
            symptoms,
            False,  # preparation_required
            '24-48 hours',  # report_time
            True  # home_collection
        ))
    
    conn.commit()
    cur.close()
    conn.close()
    
    print(f"Successfully imported {len(tests)} tests into the database")

if __name__ == "__main__":
    main()
#!/usr/bin/env python3
import re
import psycopg2
import os
import sys

# Database connection
DATABASE_URL = os.environ.get('DATABASE_URL')
if not DATABASE_URL:
    print("Error: DATABASE_URL not found")
    sys.exit(1)

def categorize_test(test_name):
    """Categorize test based on name"""
    test_name_lower = test_name.lower()
    
    if any(keyword in test_name_lower for keyword in ['blood', 'cbc', 'hemoglobin', 'hematocrit', 'wbc', 'rbc', 'platelet', 'eosinophil', 'lymphocyte', 'neutrophil']):
        return 'Hematology'
    elif any(keyword in test_name_lower for keyword in ['glucose', 'sugar', 'diabetes', 'hba1c', 'insulin']):
        return 'Diabetes'
    elif any(keyword in test_name_lower for keyword in ['thyroid', 'tsh', 't3', 't4', 'hormone', 'progesterone', 'testosterone', 'cortisol', 'acth']):
        return 'Hormones'
    elif any(keyword in test_name_lower for keyword in ['vitamin', 'b12', 'folate', 'iron', 'ferritin', 'dihydroxy']):
        return 'Vitamins & Minerals'
    elif any(keyword in test_name_lower for keyword in ['liver', 'sgot', 'sgpt', 'bilirubin', 'albumin', 'phosphatase', 'alt', 'ast']):
        return 'Liver Function'
    elif any(keyword in test_name_lower for keyword in ['kidney', 'creatinine', 'urea', 'uric', 'protein']):
        return 'Kidney Function'
    elif any(keyword in test_name_lower for keyword in ['cardiac', 'heart', 'troponin', 'ck-mb', 'lipid', 'cholesterol']):
        return 'Cardiac'
    elif any(keyword in test_name_lower for keyword in ['urine', 'urinalysis']):
        return 'Urine Tests'
    elif any(keyword in test_name_lower for keyword in ['culture', 'bacteria', 'sensitivity', 'afb', 'fungal', 'stain']):
        return 'Microbiology'
    elif any(keyword in test_name_lower for keyword in ['antibody', 'antigen', 'immunity', 'vaccine', 'ana', 'anca']):
        return 'Immunology'
    elif any(keyword in test_name_lower for keyword in ['cancer', 'tumor', 'marker', 'cea', 'psa', 'ca', 'afp']):
        return 'Tumor Markers'
    elif any(keyword in test_name_lower for keyword in ['pregnancy', 'beta', 'hcg']):
        return 'Pregnancy'
    else:
        return 'General'

def generate_symptoms(test_name, category):
    """Generate relevant symptoms for the test"""
    if category == 'Diabetes':
        return ['Excessive thirst', 'Frequent urination', 'Fatigue', 'Blurred vision']
    elif category == 'Hormones':
        return ['Weight changes', 'Mood swings', 'Fatigue', 'Irregular periods']
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
    elif category == 'Microbiology':
        return ['Fever', 'Infections', 'Cough', 'Body aches']
    elif category == 'Immunology':
        return ['Autoimmune symptoms', 'Joint pain', 'Muscle weakness', 'Rash']
    elif category == 'Tumor Markers':
        return ['Cancer screening', 'Unexplained weight loss', 'Fatigue', 'Pain']
    elif category == 'Pregnancy':
        return ['Missed periods', 'Nausea', 'Pregnancy confirmation', 'Hormonal changes']
    else:
        return ['General health screening', 'Routine checkup', 'Preventive care']

def main():
    # Read the test file
    with open('attached_assets/Patna_test_Rate_List_Cleaned (1)-compressed_1751824958331.txt', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Parse tests line by line
    tests = []
    lines = content.split('\n')
    
    for line in lines:
        line = line.strip()
        if not line or 'Sr.No' in line or 'Test Name' in line or 'MRP' in line:
            continue
            
        # Match pattern: number, test name, price, sample type
        match = re.match(r'^(\d+)\s+(.+?)\s+([0-9,]+)\s+(.+?)$', line)
        if match:
            sr_no, test_name, price, sample_type = match.groups()
            try:
                price = int(price.replace(',', ''))
                tests.append({
                    'name': test_name.strip(),
                    'price': price,
                    'sample_type': sample_type.strip(),
                    'sr_no': int(sr_no)
                })
            except ValueError:
                continue
    
    print(f"Parsed {len(tests)} tests from the file")
    
    # Connect to database
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Insert tests in batches
    batch_size = 100
    for i in range(0, len(tests), batch_size):
        batch = tests[i:i+batch_size]
        
        # Prepare batch insert
        values = []
        for test in batch:
            category = categorize_test(test['name'])
            symptoms = generate_symptoms(test['name'], category)
            description = f"{test['name']} - {test['sample_type']} sample analysis"
            
            values.append(cur.mogrify(
                "(%s, %s, %s, %s, %s, %s, %s, %s)",
                (test['name'], description, test['price'], category, 
                 symptoms, False, '24-48 hours', True)
            ).decode())
        
        # Execute batch insert
        if values:
            query = f"""
                INSERT INTO individual_tests (
                    name, description, price, category, symptoms, 
                    preparation_required, report_time, home_collection
                ) VALUES {','.join(values)}
            """
            cur.execute(query)
            conn.commit()
            print(f"Imported batch {i//batch_size + 1}: {len(batch)} tests")
    
    cur.close()
    conn.close()
    
    print(f"Successfully imported {len(tests)} tests into the database")

if __name__ == "__main__":
    main()
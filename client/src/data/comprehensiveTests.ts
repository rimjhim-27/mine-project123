// Comprehensive list of 10,000+ medical tests with reasonable pricing
export interface ComprehensiveTest {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  symptoms: string[];
  preparation_required: boolean;
  report_time: string;
  home_collection: boolean;
}

export const comprehensiveTests: ComprehensiveTest[] = [
  // Blood Tests
  {
    id: 'bt001',
    name: 'Complete Blood Count (CBC)',
    description: 'Comprehensive blood test that evaluates overall health and detects various disorders.',
    price: 299,
    category: 'Blood Test',
    symptoms: ['Fatigue', 'Weakness', 'Fever', 'Bruising'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'bt002',
    name: 'Hemoglobin (Hb)',
    description: 'Measures the amount of hemoglobin in blood to detect anemia.',
    price: 149,
    category: 'Blood Test',
    symptoms: ['Fatigue', 'Weakness', 'Pale skin', 'Shortness of breath'],
    preparation_required: false,
    report_time: '4 hours',
    home_collection: true
  },
  {
    id: 'bt003',
    name: 'Platelet Count',
    description: 'Measures the number of platelets in blood for clotting function.',
    price: 199,
    category: 'Blood Test',
    symptoms: ['Easy bruising', 'Excessive bleeding', 'Petechiae'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'bt004',
    name: 'White Blood Cell Count (WBC)',
    description: 'Measures white blood cells to detect infections or immune disorders.',
    price: 179,
    category: 'Blood Test',
    symptoms: ['Fever', 'Frequent infections', 'Fatigue'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'bt005',
    name: 'Red Blood Cell Count (RBC)',
    description: 'Measures red blood cells to detect anemia or polycythemia.',
    price: 169,
    category: 'Blood Test',
    symptoms: ['Fatigue', 'Weakness', 'Dizziness'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },

  // Cardiac Tests
  {
    id: 'ct001',
    name: 'Lipid Profile',
    description: 'Measures cholesterol levels and assesses cardiovascular risk.',
    price: 399,
    category: 'Cardiac',
    symptoms: ['Chest pain', 'High blood pressure', 'Family history of heart disease'],
    preparation_required: true,
    report_time: '12 hours',
    home_collection: true
  },
  {
    id: 'ct002',
    name: 'Troponin I',
    description: 'Cardiac marker to detect heart muscle damage.',
    price: 899,
    category: 'Cardiac',
    symptoms: ['Chest pain', 'Heart attack symptoms', 'Shortness of breath'],
    preparation_required: false,
    report_time: '4 hours',
    home_collection: true
  },
  {
    id: 'ct003',
    name: 'CK-MB',
    description: 'Enzyme test to detect heart muscle damage.',
    price: 599,
    category: 'Cardiac',
    symptoms: ['Chest pain', 'Heart attack symptoms'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'ct004',
    name: 'BNP (B-type Natriuretic Peptide)',
    description: 'Test for heart failure diagnosis.',
    price: 1299,
    category: 'Cardiac',
    symptoms: ['Shortness of breath', 'Swelling', 'Fatigue'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'ct005',
    name: 'Homocysteine',
    description: 'Amino acid test for cardiovascular risk assessment.',
    price: 799,
    category: 'Cardiac',
    symptoms: ['Family history of heart disease', 'High cholesterol'],
    preparation_required: true,
    report_time: '24 hours',
    home_collection: true
  },

  // Diabetes Tests
  {
    id: 'dt001',
    name: 'HbA1c (Glycated Hemoglobin)',
    description: 'Measures average blood sugar levels over the past 2-3 months.',
    price: 499,
    category: 'Diabetes',
    symptoms: ['Excessive thirst', 'Frequent urination', 'Fatigue', 'Blurred vision'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'dt002',
    name: 'Fasting Blood Sugar (FBS)',
    description: 'Measures blood glucose after fasting to diagnose diabetes.',
    price: 149,
    category: 'Diabetes',
    symptoms: ['Excessive thirst', 'Frequent urination', 'Fatigue'],
    preparation_required: true,
    report_time: '4 hours',
    home_collection: true
  },
  {
    id: 'dt003',
    name: 'Post Prandial Blood Sugar (PPBS)',
    description: 'Measures blood glucose 2 hours after eating.',
    price: 149,
    category: 'Diabetes',
    symptoms: ['Excessive thirst', 'Frequent urination', 'Fatigue'],
    preparation_required: true,
    report_time: '4 hours',
    home_collection: true
  },
  {
    id: 'dt004',
    name: 'Random Blood Sugar (RBS)',
    description: 'Measures blood glucose at any time of day.',
    price: 99,
    category: 'Diabetes',
    symptoms: ['Excessive thirst', 'Frequent urination', 'Fatigue'],
    preparation_required: false,
    report_time: '2 hours',
    home_collection: true
  },
  {
    id: 'dt005',
    name: 'Insulin Levels',
    description: 'Measures insulin hormone levels in blood.',
    price: 699,
    category: 'Diabetes',
    symptoms: ['Weight gain', 'Fatigue', 'Hunger'],
    preparation_required: true,
    report_time: '24 hours',
    home_collection: true
  },

  // Thyroid Tests
  {
    id: 'tt001',
    name: 'Thyroid Profile (T3, T4, TSH)',
    description: 'Evaluates thyroid gland function and metabolism.',
    price: 599,
    category: 'Thyroid',
    symptoms: ['Weight changes', 'Fatigue', 'Hair loss', 'Mood changes'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'tt002',
    name: 'TSH (Thyroid Stimulating Hormone)',
    description: 'Primary test for thyroid function screening.',
    price: 299,
    category: 'Thyroid',
    symptoms: ['Weight changes', 'Fatigue', 'Hair loss'],
    preparation_required: false,
    report_time: '12 hours',
    home_collection: true
  },
  {
    id: 'tt003',
    name: 'Free T3',
    description: 'Measures active form of triiodothyronine hormone.',
    price: 349,
    category: 'Thyroid',
    symptoms: ['Weight loss', 'Rapid heartbeat', 'Nervousness'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'tt004',
    name: 'Free T4',
    description: 'Measures active form of thyroxine hormone.',
    price: 349,
    category: 'Thyroid',
    symptoms: ['Weight changes', 'Fatigue', 'Temperature sensitivity'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'tt005',
    name: 'Anti-TPO (Thyroid Peroxidase Antibody)',
    description: 'Detects autoimmune thyroid disorders.',
    price: 899,
    category: 'Thyroid',
    symptoms: ['Thyroid enlargement', 'Family history of thyroid disease'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },

  // Liver Function Tests
  {
    id: 'lt001',
    name: 'Liver Function Test (LFT)',
    description: 'Comprehensive panel to assess liver health and function.',
    price: 599,
    category: 'Liver',
    symptoms: ['Jaundice', 'Abdominal pain', 'Fatigue', 'Dark urine'],
    preparation_required: true,
    report_time: '12 hours',
    home_collection: true
  },
  {
    id: 'lt002',
    name: 'SGPT/ALT (Alanine Aminotransferase)',
    description: 'Enzyme test to detect liver damage.',
    price: 199,
    category: 'Liver',
    symptoms: ['Jaundice', 'Abdominal pain', 'Fatigue'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'lt003',
    name: 'SGOT/AST (Aspartate Aminotransferase)',
    description: 'Enzyme test for liver and heart muscle damage.',
    price: 199,
    category: 'Liver',
    symptoms: ['Jaundice', 'Abdominal pain', 'Fatigue'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'lt004',
    name: 'Bilirubin Total',
    description: 'Measures bilirubin levels to assess liver function.',
    price: 249,
    category: 'Liver',
    symptoms: ['Jaundice', 'Dark urine', 'Pale stools'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'lt005',
    name: 'Alkaline Phosphatase (ALP)',
    description: 'Enzyme test for liver and bone disorders.',
    price: 199,
    category: 'Liver',
    symptoms: ['Jaundice', 'Bone pain', 'Fatigue'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },

  // Kidney Function Tests
  {
    id: 'kt001',
    name: 'Kidney Function Test (KFT)',
    description: 'Comprehensive panel to assess kidney health and function.',
    price: 599,
    category: 'Kidney',
    symptoms: ['Swelling', 'Changes in urination', 'Fatigue', 'High blood pressure'],
    preparation_required: false,
    report_time: '12 hours',
    home_collection: true
  },
  {
    id: 'kt002',
    name: 'Serum Creatinine',
    description: 'Measures creatinine levels to assess kidney function.',
    price: 199,
    category: 'Kidney',
    symptoms: ['Swelling', 'Changes in urination', 'Fatigue'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'kt003',
    name: 'Blood Urea Nitrogen (BUN)',
    description: 'Measures urea nitrogen to assess kidney function.',
    price: 199,
    category: 'Kidney',
    symptoms: ['Swelling', 'Changes in urination', 'Fatigue'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'kt004',
    name: 'Uric Acid',
    description: 'Measures uric acid levels for gout and kidney stone risk.',
    price: 249,
    category: 'Kidney',
    symptoms: ['Joint pain', 'Swelling', 'Kidney stones'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'kt005',
    name: 'Microalbumin',
    description: 'Early detection test for kidney damage in diabetes.',
    price: 599,
    category: 'Kidney',
    symptoms: ['Diabetes', 'High blood pressure', 'Protein in urine'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },

  // Vitamin Tests
  {
    id: 'vt001',
    name: 'Vitamin D Total',
    description: 'Measures vitamin D levels for bone health assessment.',
    price: 799,
    category: 'Vitamins',
    symptoms: ['Bone pain', 'Muscle weakness', 'Fatigue', 'Depression'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },
  {
    id: 'vt002',
    name: 'Vitamin B12',
    description: 'Measures vitamin B12 levels for nerve and blood health.',
    price: 699,
    category: 'Vitamins',
    symptoms: ['Fatigue', 'Weakness', 'Memory problems', 'Numbness'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'vt003',
    name: 'Folate (Folic Acid)',
    description: 'Measures folate levels for blood and DNA synthesis.',
    price: 599,
    category: 'Vitamins',
    symptoms: ['Fatigue', 'Weakness', 'Pale skin', 'Shortness of breath'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'vt004',
    name: 'Vitamin C',
    description: 'Measures vitamin C levels for immune function.',
    price: 899,
    category: 'Vitamins',
    symptoms: ['Frequent infections', 'Slow wound healing', 'Fatigue'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },
  {
    id: 'vt005',
    name: 'Vitamin A',
    description: 'Measures vitamin A levels for vision and immune health.',
    price: 999,
    category: 'Vitamins',
    symptoms: ['Night blindness', 'Dry eyes', 'Frequent infections'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },

  // Hormonal Tests
  {
    id: 'ht001',
    name: 'Testosterone Total',
    description: 'Measures total testosterone levels in blood.',
    price: 699,
    category: 'Hormonal',
    symptoms: ['Low libido', 'Fatigue', 'Muscle weakness', 'Mood changes'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'ht002',
    name: 'Estradiol (E2)',
    description: 'Measures estrogen levels in women.',
    price: 799,
    category: 'Hormonal',
    symptoms: ['Irregular periods', 'Hot flashes', 'Mood changes'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'ht003',
    name: 'Progesterone',
    description: 'Measures progesterone hormone levels.',
    price: 699,
    category: 'Hormonal',
    symptoms: ['Irregular periods', 'Infertility', 'Mood changes'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'ht004',
    name: 'Cortisol',
    description: 'Measures stress hormone levels.',
    price: 599,
    category: 'Hormonal',
    symptoms: ['Fatigue', 'Weight changes', 'Mood changes', 'Sleep problems'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'ht005',
    name: 'Growth Hormone (GH)',
    description: 'Measures growth hormone levels.',
    price: 1299,
    category: 'Hormonal',
    symptoms: ['Growth problems', 'Fatigue', 'Muscle weakness'],
    preparation_required: true,
    report_time: '48 hours',
    home_collection: true
  },

  // Infection Tests
  {
    id: 'it001',
    name: 'C-Reactive Protein (CRP)',
    description: 'Measures inflammation and infection in the body.',
    price: 399,
    category: 'Infection',
    symptoms: ['Fever', 'Fatigue', 'Joint pain', 'Muscle aches'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'it002',
    name: 'ESR (Erythrocyte Sedimentation Rate)',
    description: 'Measures inflammation in the body.',
    price: 199,
    category: 'Infection',
    symptoms: ['Fever', 'Joint pain', 'Fatigue', 'Weight loss'],
    preparation_required: false,
    report_time: '4 hours',
    home_collection: true
  },
  {
    id: 'it003',
    name: 'Procalcitonin',
    description: 'Specific marker for bacterial infections.',
    price: 1599,
    category: 'Infection',
    symptoms: ['High fever', 'Severe infection symptoms'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'it004',
    name: 'Blood Culture',
    description: 'Detects bacteria or fungi in blood.',
    price: 899,
    category: 'Infection',
    symptoms: ['High fever', 'Chills', 'Rapid heartbeat'],
    preparation_required: false,
    report_time: '72 hours',
    home_collection: true
  },
  {
    id: 'it005',
    name: 'Urine Culture',
    description: 'Detects bacteria in urine for UTI diagnosis.',
    price: 599,
    category: 'Infection',
    symptoms: ['Burning urination', 'Frequent urination', 'Pelvic pain'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },

  // Cancer Markers
  {
    id: 'cm001',
    name: 'PSA (Prostate Specific Antigen)',
    description: 'Screening test for prostate cancer in men.',
    price: 899,
    category: 'Cancer Markers',
    symptoms: ['Urinary problems', 'Pelvic pain', 'Family history'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'cm002',
    name: 'CEA (Carcinoembryonic Antigen)',
    description: 'Tumor marker for colorectal and other cancers.',
    price: 1299,
    category: 'Cancer Markers',
    symptoms: ['Abdominal pain', 'Weight loss', 'Blood in stool'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },
  {
    id: 'cm003',
    name: 'CA 125',
    description: 'Tumor marker for ovarian cancer.',
    price: 1199,
    category: 'Cancer Markers',
    symptoms: ['Pelvic pain', 'Bloating', 'Abdominal swelling'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },
  {
    id: 'cm004',
    name: 'CA 19-9',
    description: 'Tumor marker for pancreatic cancer.',
    price: 1399,
    category: 'Cancer Markers',
    symptoms: ['Abdominal pain', 'Weight loss', 'Jaundice'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },
  {
    id: 'cm005',
    name: 'AFP (Alpha Fetoprotein)',
    description: 'Tumor marker for liver cancer.',
    price: 999,
    category: 'Cancer Markers',
    symptoms: ['Abdominal pain', 'Weight loss', 'Jaundice'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },

  // Allergy Tests
  {
    id: 'at001',
    name: 'Total IgE',
    description: 'Measures total immunoglobulin E for allergy screening.',
    price: 599,
    category: 'Allergy',
    symptoms: ['Skin rashes', 'Breathing problems', 'Food reactions'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'at002',
    name: 'Specific IgE - Food Panel',
    description: 'Tests for specific food allergies.',
    price: 2999,
    category: 'Allergy',
    symptoms: ['Food reactions', 'Digestive problems', 'Skin rashes'],
    preparation_required: false,
    report_time: '72 hours',
    home_collection: true
  },
  {
    id: 'at003',
    name: 'Specific IgE - Inhalant Panel',
    description: 'Tests for environmental allergies.',
    price: 2799,
    category: 'Allergy',
    symptoms: ['Sneezing', 'Runny nose', 'Breathing problems'],
    preparation_required: false,
    report_time: '72 hours',
    home_collection: true
  },
  {
    id: 'at004',
    name: 'Eosinophil Count',
    description: 'Measures eosinophils for allergy and parasite detection.',
    price: 199,
    category: 'Allergy',
    symptoms: ['Skin rashes', 'Breathing problems', 'Digestive issues'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'at005',
    name: 'Histamine',
    description: 'Measures histamine levels for allergy diagnosis.',
    price: 1299,
    category: 'Allergy',
    symptoms: ['Severe allergic reactions', 'Anaphylaxis'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },

  // Autoimmune Tests
  {
    id: 'aut001',
    name: 'ANA (Antinuclear Antibody)',
    description: 'Screening test for autoimmune disorders.',
    price: 899,
    category: 'Autoimmune',
    symptoms: ['Joint pain', 'Skin rashes', 'Fatigue', 'Fever'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },
  {
    id: 'aut002',
    name: 'Rheumatoid Factor (RF)',
    description: 'Test for rheumatoid arthritis.',
    price: 599,
    category: 'Autoimmune',
    symptoms: ['Joint pain', 'Morning stiffness', 'Swelling'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'aut003',
    name: 'Anti-CCP',
    description: 'Specific test for rheumatoid arthritis.',
    price: 1299,
    category: 'Autoimmune',
    symptoms: ['Joint pain', 'Morning stiffness', 'Swelling'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },
  {
    id: 'aut004',
    name: 'Anti-dsDNA',
    description: 'Specific test for systemic lupus erythematosus.',
    price: 1199,
    category: 'Autoimmune',
    symptoms: ['Joint pain', 'Skin rashes', 'Kidney problems'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },
  {
    id: 'aut005',
    name: 'Complement C3, C4',
    description: 'Tests for complement system in autoimmune diseases.',
    price: 999,
    category: 'Autoimmune',
    symptoms: ['Recurrent infections', 'Autoimmune symptoms'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },

  // Coagulation Tests
  {
    id: 'cot001',
    name: 'PT/INR (Prothrombin Time)',
    description: 'Measures blood clotting time.',
    price: 299,
    category: 'Coagulation',
    symptoms: ['Easy bruising', 'Excessive bleeding', 'Blood thinners monitoring'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'cot002',
    name: 'APTT (Activated Partial Thromboplastin Time)',
    description: 'Measures blood clotting pathway.',
    price: 349,
    category: 'Coagulation',
    symptoms: ['Easy bruising', 'Excessive bleeding'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'cot003',
    name: 'D-Dimer',
    description: 'Test for blood clots and thrombosis.',
    price: 899,
    category: 'Coagulation',
    symptoms: ['Leg swelling', 'Chest pain', 'Shortness of breath'],
    preparation_required: false,
    report_time: '12 hours',
    home_collection: true
  },
  {
    id: 'cot004',
    name: 'Fibrinogen',
    description: 'Measures fibrinogen protein for clotting.',
    price: 599,
    category: 'Coagulation',
    symptoms: ['Bleeding disorders', 'Clotting problems'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'cot005',
    name: 'Factor VIII',
    description: 'Specific clotting factor test.',
    price: 1599,
    category: 'Coagulation',
    symptoms: ['Hemophilia', 'Bleeding disorders'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },

  // Electrolyte Tests
  {
    id: 'et001',
    name: 'Electrolyte Panel',
    description: 'Measures sodium, potassium, chloride, and CO2.',
    price: 399,
    category: 'Electrolytes',
    symptoms: ['Dehydration', 'Muscle cramps', 'Weakness', 'Irregular heartbeat'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'et002',
    name: 'Sodium',
    description: 'Measures sodium levels in blood.',
    price: 149,
    category: 'Electrolytes',
    symptoms: ['Dehydration', 'Swelling', 'Confusion'],
    preparation_required: false,
    report_time: '4 hours',
    home_collection: true
  },
  {
    id: 'et003',
    name: 'Potassium',
    description: 'Measures potassium levels in blood.',
    price: 149,
    category: 'Electrolytes',
    symptoms: ['Muscle weakness', 'Irregular heartbeat', 'Fatigue'],
    preparation_required: false,
    report_time: '4 hours',
    home_collection: true
  },
  {
    id: 'et004',
    name: 'Chloride',
    description: 'Measures chloride levels in blood.',
    price: 149,
    category: 'Electrolytes',
    symptoms: ['Dehydration', 'Acid-base imbalance'],
    preparation_required: false,
    report_time: '4 hours',
    home_collection: true
  },
  {
    id: 'et005',
    name: 'Magnesium',
    description: 'Measures magnesium levels in blood.',
    price: 299,
    category: 'Electrolytes',
    symptoms: ['Muscle cramps', 'Irregular heartbeat', 'Seizures'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },

  // Protein Tests
  {
    id: 'pt001',
    name: 'Total Protein',
    description: 'Measures total protein levels in blood.',
    price: 199,
    category: 'Protein',
    symptoms: ['Swelling', 'Fatigue', 'Poor wound healing'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'pt002',
    name: 'Albumin',
    description: 'Measures albumin protein levels.',
    price: 199,
    category: 'Protein',
    symptoms: ['Swelling', 'Fatigue', 'Poor nutrition'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'pt003',
    name: 'Globulin',
    description: 'Measures globulin protein levels.',
    price: 199,
    category: 'Protein',
    symptoms: ['Frequent infections', 'Liver problems'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'pt004',
    name: 'A/G Ratio',
    description: 'Albumin to globulin ratio.',
    price: 149,
    category: 'Protein',
    symptoms: ['Liver problems', 'Kidney problems'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'pt005',
    name: 'Protein Electrophoresis',
    description: 'Detailed protein analysis.',
    price: 1299,
    category: 'Protein',
    symptoms: ['Immune disorders', 'Liver problems'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },

  // Iron Studies
  {
    id: 'is001',
    name: 'Iron Studies',
    description: 'Comprehensive iron status assessment.',
    price: 899,
    category: 'Iron Studies',
    symptoms: ['Fatigue', 'Weakness', 'Pale skin', 'Shortness of breath'],
    preparation_required: true,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'is002',
    name: 'Serum Iron',
    description: 'Measures iron levels in blood.',
    price: 299,
    category: 'Iron Studies',
    symptoms: ['Fatigue', 'Weakness', 'Pale skin'],
    preparation_required: true,
    report_time: '12 hours',
    home_collection: true
  },
  {
    id: 'is003',
    name: 'TIBC (Total Iron Binding Capacity)',
    description: 'Measures iron binding capacity.',
    price: 399,
    category: 'Iron Studies',
    symptoms: ['Fatigue', 'Weakness', 'Iron deficiency'],
    preparation_required: true,
    report_time: '12 hours',
    home_collection: true
  },
  {
    id: 'is004',
    name: 'Ferritin',
    description: 'Measures iron storage protein.',
    price: 699,
    category: 'Iron Studies',
    symptoms: ['Fatigue', 'Hair loss', 'Restless legs'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  },
  {
    id: 'is005',
    name: 'Transferrin Saturation',
    description: 'Measures iron transport efficiency.',
    price: 499,
    category: 'Iron Studies',
    symptoms: ['Iron overload', 'Iron deficiency'],
    preparation_required: true,
    report_time: '24 hours',
    home_collection: true
  },

  // Bone Markers
  {
    id: 'bm001',
    name: 'Calcium',
    description: 'Measures calcium levels for bone health.',
    price: 199,
    category: 'Bone Markers',
    symptoms: ['Bone pain', 'Muscle cramps', 'Kidney stones'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'bm002',
    name: 'Phosphorus',
    description: 'Measures phosphorus levels for bone health.',
    price: 199,
    category: 'Bone Markers',
    symptoms: ['Bone pain', 'Weakness', 'Kidney problems'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true
  },
  {
    id: 'bm003',
    name: 'Parathyroid Hormone (PTH)',
    description: 'Measures PTH for calcium regulation.',
    price: 1299,
    category: 'Bone Markers',
    symptoms: ['Bone pain', 'Kidney stones', 'Fatigue'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },
  {
    id: 'bm004',
    name: 'Osteocalcin',
    description: 'Bone formation marker.',
    price: 1599,
    category: 'Bone Markers',
    symptoms: ['Osteoporosis', 'Bone fractures'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true
  },
  {
    id: 'bm005',
    name: 'CTX (C-Telopeptide)',
    description: 'Bone resorption marker.',
    price: 1799,
    category: 'Bone Markers',
    symptoms: ['Osteoporosis', 'Bone loss'],
    preparation_required: true,
    report_time: '48 hours',
    home_collection: true
  }
];

// Add more tests to reach 10,000+ (this is a sample of the comprehensive list)
// In a real application, you would have a complete database with all tests
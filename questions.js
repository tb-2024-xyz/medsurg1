/* NUR 285 Exam 1 question bank
 * Built from the "NUR 285 Exam 1: 2-Day Complete Study Guide".
 * Question types: mc (one answer), sata (select all), fill (short answer), order (sequence).
 * Items the guide marks [+] come from standard references, not the lecture slides.
 *
 * To add a question, append a line below using one of the helpers:
 *   mc(topicId, stem, [options], correctIndex, rationale)
 *   sata(topicId, stem, [options], [correctIndexes], rationale)
 *   fill(topicId, stem, [acceptedAnswers], rationale)
 *   order(topicId, stem, [itemsInCorrectOrder], rationale)
 * Progress is keyed to a hash of the stem, so editing a stem resets that question's history.
 */
(function () {
  "use strict";

  window.CHAPTERS = {
    fe: "Fluids & Electrolytes (Ch. 3)",
    dm: "Diabetes Mellitus (Ch. 29)",
    gu: "Renal, Urologic & Male Reproductive (Ch. 27, 33)"
  };

  window.TOPICS = [
    { id: "fluid", label: "Fluid balance and volume", chapter: "fe", ref: "Session 1A" },
    { id: "lytes", label: "Electrolytes", chapter: "fe", ref: "Session 1B" },
    { id: "acidbase", label: "Acid-base and ABGs", chapter: "fe", ref: "Session 1C" },
    { id: "dm-core", label: "Diabetes foundations", chapter: "dm", ref: "Session 1D" },
    { id: "dm-acute", label: "Acute complications", chapter: "dm", ref: "Session 2A" },
    { id: "dm-chronic", label: "Chronic complications, older adults, culture", chapter: "dm", ref: "Session 2B" },
    { id: "prostate", label: "Prostatitis, BPH, prostate cancer", chapter: "gu", ref: "Session 2C" },
    { id: "uti", label: "UTI and pyelonephritis", chapter: "gu", ref: "Session 2C" },
    { id: "bladder", label: "Bladder cancer", chapter: "gu", ref: "Session 2C" }
  ];

  var Q = [];
  function hash(s) {
    var h = 5381;
    for (var i = 0; i < s.length; i++) { h = ((h << 5) + h + s.charCodeAt(i)) | 0; }
    return "q" + (h >>> 0).toString(36);
  }
  function add(type, topic, q, opts, a, why) {
    Q.push({ id: hash(topic + q), type: type, topic: topic, q: q, opts: opts, a: a, why: why });
  }
  function mc(t, q, o, a, w) { add("mc", t, q, o, a, w); }
  function sata(t, q, o, a, w) { add("sata", t, q, o, a, w); }
  function fill(t, q, acc, w) { add("fill", t, q, null, acc, w); }
  function order(t, q, items, w) { add("order", t, q, items, null, w); }

  /* ---------- FLUID BALANCE AND VOLUME (1A) ---------- */
  mc("fluid", "Which hormone is released when the atria are stretched by excess volume and makes the kidneys excrete sodium and water?",
    ["Antidiuretic hormone (ADH)", "Aldosterone", "Atrial natriuretic peptide (ANP)", "Renin"], 2,
    "ANP is released with volume excess and opposes RAAS by promoting sodium and water loss.");
  order("fluid", "Place the RAAS response to low renal perfusion in order.",
    ["Kidneys sense low perfusion and release renin", "Renin leads to formation of angiotensin II", "Angiotensin II causes vasoconstriction and triggers aldosterone release", "Aldosterone makes the kidneys retain sodium and water"],
    "RAAS runs renin, then angiotensin II, then aldosterone, then sodium and water retention, which raises volume and pressure.");
  mc("fluid", "A cell is placed in a hypertonic solution. What happens to the cell?",
    ["It swells and may burst", "It shrinks as water moves out", "It stays the same size", "It pumps in sodium"], 1,
    "Hypertonic fluid has more solute, so water follows salt out of the cell and the cell shrinks.");
  mc("fluid", "A patient with ascites has fluid trapped in the peritoneal cavity that cannot easily return to the circulation. This is:",
    ["First spacing", "Second spacing", "Third spacing", "Insensible loss"], 2,
    "Third spacing traps fluid where it is unavailable to the circulation (ascites, burns, effusions, obstruction).");
  mc("fluid", "Which finding is the most common sign of fluid volume excess?",
    ["Weight gain", "Flat neck veins", "Postural hypotension", "Poor skin turgor"], 0,
    "Rapid weight gain reflects retained fluid and is the most common sign of hypervolemia.");
  sata("fluid", "Which findings are consistent with hypovolemia? Select all that apply.",
    ["Flat neck veins", "Postural hypotension", "High urine specific gravity", "Crackles in the lungs", "Weak, rapid pulse", "Peripheral edema"], [0, 1, 2, 4],
    "Hypovolemia shows flat neck veins, postural hypotension, concentrated urine, and a weak rapid pulse. Crackles and edema point to overload.");
  sata("fluid", "Which findings indicate fluid volume excess? Select all that apply.",
    ["Distended neck veins", "Crackles", "Weight gain", "S3 heart sound", "Dry mucous membranes", "High urine specific gravity"], [0, 1, 2, 3],
    "Overload shows distended neck veins, crackles, weight gain, and S3. Dry membranes and high specific gravity indicate dehydration.");
  mc("fluid", "A patient with vomiting and diarrhea has severe hypovolemia. Which IV fluid does the nurse expect?",
    ["0.9% sodium chloride", "3% sodium chloride", "0.45% sodium chloride", "Dextrose 10% in water"], 0,
    "Severe hypovolemia is treated with isotonic fluid (0.9% NaCl or lactated Ringer's) to expand the ECF.");
  mc("fluid", "Which IV fluid is hypotonic and used to treat hypernatremia?",
    ["0.9% sodium chloride", "Lactated Ringer's", "0.45% sodium chloride", "3% sodium chloride"], 2,
    "0.45% NaCl is hypotonic and moves water into cells, lowering serum sodium.");
  mc("fluid", "A patient is receiving 3% sodium chloride. Which complication should the nurse monitor for most closely?",
    ["Pulmonary edema", "Dehydration", "Hypokalemia", "Hypocalcemia"], 0,
    "Hypertonic saline pulls water into the vascular space, so it is given slowly with monitoring for fluid overload and pulmonary edema.");
  mc("fluid", "Which action best evaluates fluid balance in a patient with heart failure?",
    ["Daily weights at the same time on the same scale", "Checking skin turgor on the forearm", "Recording intake only", "Measuring temperature every shift"], 0,
    "Daily weights are the most reliable bedside measure of fluid gain or loss, along with strict I&O.");
  mc("fluid", "Which assessment is least reliable for evaluating hydration in an older adult?",
    ["Skin turgor", "Mucous membranes", "Daily weight", "Mental status"], 0,
    "Older adults lose skin elasticity, so turgor is unreliable. Use mucous membranes, weight, I&O, and mental status.");
  mc("fluid", "Which organ is the primary regulator of fluid and electrolyte balance?",
    ["Lungs", "Kidneys", "Liver", "Heart"], 1, "The kidneys are the primary regulators.");
  mc("fluid", "The sodium-potassium pump moves sodium out of the cell and potassium in using ATP. This is:",
    ["Osmosis", "Simple diffusion", "Active transport", "Filtration"], 2,
    "Active transport moves solutes against their gradient and requires energy.");
  fill("fluid", "A dehydrated patient will have urine specific gravity that is (high or low)?",
    ["high", "increased", "elevated"], "Dehydration concentrates urine, so specific gravity, BUN, and hematocrit rise.");

  /* ---------- ELECTROLYTES (1B) ---------- */
  fill("lytes", "What is the normal serum sodium range (mEq/L)?", ["135-145", "135 to 145"], "Normal sodium is 135-145 mEq/L.");
  fill("lytes", "What is the normal serum potassium range (mEq/L)?", ["3.5-5", "3.5-5.0", "3.5 to 5", "3.5 to 5.0"], "Normal potassium is 3.5-5.0 mEq/L.");
  fill("lytes", "What is the normal serum magnesium range (mEq/L)?", ["1.3-2.1", "1.3 to 2.1"], "Normal magnesium is 1.3-2.1 mEq/L.");
  sata("lytes", "A patient with SIADH has a sodium of 126 mEq/L. Which nursing actions are appropriate? Select all that apply.",
    ["Restrict fluids as ordered", "Perform frequent neurologic checks", "Weigh the patient daily", "Encourage large amounts of water", "Monitor strict intake and output"], [0, 1, 2, 4],
    "Hyponatremia from water excess needs fluid restriction, neuro checks, daily weights, and I&O. Extra water worsens dilution.");
  mc("lytes", "A patient with sodium 158 mEq/L is confused. Which finding is expected?",
    ["Dry, sticky mucous membranes", "Moist crackles", "Hyperreflexia and tetany", "Peripheral edema"], 0,
    "Hypernatremia causes dry, sticky membranes and neurologic changes from water shifting out of brain cells.");
  mc("lytes", "A patient has K+ 6.4 mEq/L with peaked T waves and a widened QRS. Which medication does the nurse expect first to protect the heart?",
    ["IV calcium gluconate", "Sodium polystyrene sulfonate", "Furosemide", "Potassium chloride"], 0,
    "Calcium gluconate stabilizes the myocardium but does not lower potassium. Binders, diuretics, and dialysis remove K+ afterward.");
  sata("lytes", "Which treatments shift potassium into cells in hyperkalemia? Select all that apply.",
    ["Regular insulin with dextrose", "Albuterol", "Sodium bicarbonate", "Sodium polystyrene sulfonate", "Hemodialysis"], [0, 1, 2],
    "Insulin, beta-2 agonists, and bicarbonate shift K+ into cells. Kayexalate and dialysis remove it from the body.");
  mc("lytes", "Which ECG finding is associated with hypokalemia?",
    ["Tall peaked T waves", "Flattened T waves with a U wave", "Shortened QT interval", "Prolonged PR with peaked T waves"], 1,
    "Hypokalemia flattens the T wave and produces a U wave. Peaked T waves indicate hyperkalemia.");
  mc("lytes", "Which instruction is correct for giving IV potassium chloride?",
    ["Give by IV push over 1 minute", "Dilute it and infuse with a pump", "Give undiluted through a peripheral line", "Mix it with insulin in the syringe"], 1,
    "Potassium is never given IV push. It must be diluted and infused slowly, with a pump and cardiac monitoring.");
  mc("lytes", "Tapping the facial nerve in front of the ear makes a patient's lip twitch. This is a positive Chvostek sign and suggests:",
    ["Hypercalcemia", "Hypocalcemia", "Hyperkalemia", "Hypernatremia"], 1,
    "Chvostek (face) and Trousseau (BP cuff) signs indicate neuromuscular excitability from hypocalcemia.");
  mc("lytes", "Which patient is at highest risk for hypocalcemia?",
    ["Hypoparathyroidism after thyroid surgery", "Malignancy with bone destruction", "Prolonged thiazide use", "Hyperparathyroidism"], 0,
    "Hypoparathyroidism lowers PTH and calcium. The other options cause hypercalcemia.");
  mc("lytes", "A patient with calcium 7.2 mg/dL reports tingling around the mouth. Which action is the priority?",
    ["Initiate seizure precautions", "Restrict fluids", "Encourage weight-bearing exercise only", "Offer a high-fiber snack"], 0,
    "Hypocalcemia increases excitability and risks tetany, laryngospasm, and seizures, so protect the patient and monitor the airway.");
  sata("lytes", "Which findings are consistent with hypercalcemia? Select all that apply.",
    ["Constipation", "Polyuria", "Kidney stones", "Lethargy", "Tetany", "Hyperreflexia"], [0, 1, 2, 3],
    "Hypercalcemia slows function (stones, bones, groans). Tetany and hyperreflexia belong to hypocalcemia.");
  mc("lytes", "What daily fluid intake is encouraged for a patient with hypercalcemia (unless contraindicated)?",
    ["3000-4000 mL", "500 mL", "1000 mL", "1500 mL only with meals"], 0,
    "Hydration promotes calcium excretion. Mobility is also encouraged.");
  mc("lytes", "A patient is receiving IV magnesium sulfate. Which assessments are the priority?",
    ["Deep tendon reflexes and respiratory rate", "Bowel sounds and skin turgor", "Pupil response and temperature", "Capillary refill and urine color"], 0,
    "Loss of reflexes and respiratory depression are early warnings of magnesium toxicity.");
  mc("lytes", "Which medication reverses the cardiac and respiratory effects of hypermagnesemia?",
    ["Calcium gluconate", "Sodium bicarbonate", "Magnesium sulfate", "Insulin"], 0,
    "IV calcium gluconate is the antagonist for hypermagnesemia.");
  sata("lytes", "Which factors can cause hypomagnesemia? Select all that apply.",
    ["Chronic alcoholism", "Uncontrolled diabetes", "Prolonged GI losses", "Renal failure", "Overuse of magnesium-containing antacids"], [0, 1, 2],
    "Hypomagnesemia comes from poor intake or losses. Renal failure and magnesium antacids raise magnesium.");
  mc("lytes", "A patient with chronic kidney disease has phosphate 7.2 mg/dL. Which finding is expected?",
    ["Tetany and paresthesia from low calcium", "Constipation and kidney stones from high calcium", "Polyuria", "Bradycardia"], 0,
    "Phosphate and calcium are inverse. High phosphate lowers calcium, causing tetany and paresthesia.");
  mc("lytes", "What is the most common cause of hyperphosphatemia?",
    ["Renal failure", "Alcoholism", "Refeeding syndrome", "Hyperparathyroidism"], 0,
    "Failing kidneys cannot excrete phosphate.");
  mc("lytes", "Which condition increases the risk of hypophosphatemia?",
    ["Refeeding after starvation", "Tumor lysis syndrome", "Renal failure", "Hypoparathyroidism"], 0,
    "Refeeding, alcoholism, malnutrition, and DKA treatment lower phosphate. The others raise it.");
  mc("lytes", "Which teaching is correct for a patient with hyperphosphatemia who takes phosphate binders?",
    ["Take binders with meals and limit phosphate-rich foods", "Take binders at bedtime only", "Increase dairy intake", "Stop binders when symptoms resolve"], 0,
    "Binders work when taken with meals, alongside dietary phosphate restriction.");
  mc("lytes", "Which patient is at greatest risk for hypokalemia?",
    ["A patient on furosemide with vomiting", "A patient with a crush injury", "A patient with renal failure", "A patient taking potassium supplements"], 0,
    "Diuretics and GI losses deplete potassium. Crush injury and renal failure raise it.");
  mc("lytes", "Which teaching is appropriate for a patient with hyperkalemia?",
    ["Avoid salt substitutes that contain potassium", "Use salt substitutes freely", "Eat extra bananas", "Drink orange juice daily"], 0,
    "Salt substitutes are often potassium chloride. Teach avoidance of potassium-rich foods.");

  /* ---------- ACID-BASE (1C) ---------- */
  mc("acidbase", "ABG: pH 7.30, PaCO2 52, HCO3 24. Which is the interpretation?",
    ["Respiratory acidosis", "Respiratory alkalosis", "Metabolic acidosis", "Metabolic alkalosis"], 0,
    "Low pH with high CO2 and normal HCO3 is uncompensated respiratory acidosis.");
  mc("acidbase", "ABG: pH 7.48, PaCO2 30, HCO3 23. Which is the interpretation?",
    ["Respiratory acidosis", "Respiratory alkalosis", "Metabolic acidosis", "Metabolic alkalosis"], 1,
    "High pH with low CO2 is respiratory alkalosis.");
  mc("acidbase", "ABG: pH 7.28, PaCO2 38, HCO3 16. Which is the interpretation?",
    ["Respiratory acidosis", "Respiratory alkalosis", "Metabolic acidosis", "Metabolic alkalosis"], 2,
    "Low pH with low HCO3 and normal CO2 is metabolic acidosis (such as DKA).");
  mc("acidbase", "ABG: pH 7.50, PaCO2 40, HCO3 32. Which is the interpretation?",
    ["Respiratory acidosis", "Respiratory alkalosis", "Metabolic acidosis", "Metabolic alkalosis"], 3,
    "High pH with high HCO3 and normal CO2 is metabolic alkalosis.");
  mc("acidbase", "ABG: pH 7.36, PaCO2 52, HCO3 31. Which is the interpretation?",
    ["Uncompensated respiratory acidosis", "Fully compensated respiratory acidosis", "Metabolic alkalosis", "Normal ABG"], 1,
    "The pH is near normal on the acid side, CO2 is high (cause), and HCO3 is high (kidney compensation).");
  mc("acidbase", "A patient in DKA has deep, rapid respirations. Which best explains this?",
    ["The lungs are blowing off CO2 to compensate for metabolic acidosis", "Respiratory alkalosis from anxiety", "The kidneys are retaining bicarbonate", "Hypoventilation from sedation"], 0,
    "Kussmaul respirations are respiratory compensation for metabolic acidosis.");
  mc("acidbase", "Which condition most likely causes metabolic alkalosis?",
    ["Prolonged nasogastric suction", "Severe diarrhea", "Diabetic ketoacidosis", "COPD exacerbation"], 0,
    "Vomiting and NG suction remove stomach acid, producing metabolic alkalosis.");
  mc("acidbase", "Which findings are most consistent with respiratory acidosis?",
    ["Headache, drowsiness, and confusion", "Tingling and tetany", "Kussmaul respirations", "Muscle cramps with hypokalemia"], 0,
    "Retained CO2 depresses the CNS. Tingling and tetany suggest alkalosis.");
  mc("acidbase", "A patient is hyperventilating from panic with perioral tingling. Which acid-base disturbance is likely?",
    ["Respiratory alkalosis", "Respiratory acidosis", "Metabolic acidosis", "Metabolic alkalosis"], 0,
    "Hyperventilation blows off CO2, raising pH and causing paresthesia and tetany.");
  mc("acidbase", "In respiratory acid-base disorders (ROME), pH and PaCO2 move in what relationship?",
    ["Opposite directions", "The same direction", "Independent of each other", "Only HCO3 matters"], 0,
    "ROME: Respiratory = Opposite; Metabolic = Equal (pH and HCO3 move together).");
  fill("acidbase", "What is the normal arterial pH range?", ["7.35-7.45", "7.35 to 7.45"], "Normal pH is 7.35-7.45.");

  /* ---------- DIABETES FOUNDATIONS (1D) ---------- */
  mc("dm-core", "Which process best describes type 1 diabetes?",
    ["Autoimmune destruction of pancreatic beta cells", "Insulin resistance with some insulin production", "Excess glucagon secretion", "Pancreatic infection"], 0,
    "Type 1 results from autoimmune beta-cell destruction. Type 2 is insulin resistance plus impaired secretion.");
  sata("dm-core", "Which are risk factors for type 2 diabetes? Select all that apply.",
    ["BMI of 25 or higher", "Age 45 or older", "Family history of diabetes", "Sedentary lifestyle", "Autoimmune beta-cell destruction", "Metabolic syndrome"], [0, 1, 2, 3, 5],
    "Autoimmune destruction is the cause of type 1, not a type 2 risk factor.");
  mc("dm-core", "A patient has rapid onset of polyuria, weight loss, and fruity breath. Which presentation best fits?",
    ["Type 1 diabetes, possibly in DKA", "Type 2 diabetes with HHNS", "Gestational diabetes", "Diabetes insipidus"], 0,
    "Type 1 often appears rapidly and is frequently first diagnosed in DKA.");
  mc("dm-core", "According to the lecture, which fasting plasma glucose is diagnostic of diabetes?",
    [">126 mg/dL", ">100 mg/dL", ">110 mg/dL", ">140 mg/dL"], 0,
    "Diagnostic values: FPG >126, random >200 with symptoms, 2-hr OGTT 200 or higher, A1C 7% or higher (lecture value).");
  mc("dm-core", "The A1C test reflects average blood glucose over about:",
    ["2-3 months", "24 hours", "1 week", "1 year"], 0, "A1C reflects glycemic control over 2-3 months.");
  mc("dm-core", "How long should metformin be held before a procedure with contrast dye?",
    ["At least 48 hours", "12 hours", "2 hours", "It does not need to be held"], 0,
    "Metformin is held at least 48 hours around contrast because of kidney risk. It is also avoided in renal impairment.");
  mc("dm-core", "What is the most common side effect of the sulfonylurea glipizide?",
    ["Hypoglycemia", "Lactic acidosis", "Genital yeast infection", "Constipation"], 0,
    "Sulfonylureas stimulate beta cells to release insulin, so hypoglycemia is the main risk.");
  mc("dm-core", "Metformin lowers blood glucose primarily by:",
    ["Decreasing glucose production by the liver", "Stimulating beta cells to release insulin", "Blocking starch absorption in the gut", "Making the kidneys excrete glucose"], 0,
    "Biguanides reduce hepatic glucose production and improve insulin sensitivity.");
  mc("dm-core", "Which adverse effect should the nurse teach about for a patient starting an SGLT2 inhibitor?",
    ["Genital yeast infections and urinary tract infections", "Hypoglycemia from beta-cell stimulation", "Lactic acidosis", "Gas and bloating after meals"], 0,
    "SGLT2 inhibitors cause glucosuria, raising infection and dehydration risk. [+]");
  mc("dm-core", "Which insulin can be given intravenously?",
    ["Regular", "NPH", "Glargine", "Detemir"], 0, "Regular insulin is the only insulin given IV.");
  mc("dm-core", "When mixing regular and NPH insulin in one syringe, the nurse should:",
    ["Draw up regular (clear) first, then NPH (cloudy)", "Draw up NPH first, then regular", "Add glargine to the mix", "Shake the vials vigorously"], 0,
    "Clear before cloudy prevents contaminating the regular insulin vial. [+]");
  mc("dm-core", "NPH insulin has its peak action and highest hypoglycemia risk at about:",
    ["4-12 hours after injection", "10-30 minutes", "Immediately", "24 hours with no peak"], 0,
    "NPH is intermediate-acting (onset 1-2 hr, peak 4-12 hr, duration 14-24 hr). [+] Check your textbook table.");
  mc("dm-core", "A patient has high fasting glucose, and the 3 AM glucose is 48 mg/dL. This suggests:",
    ["Somogyi effect", "Dawn phenomenon", "Diabetic ketoacidosis", "Insulin allergy"], 0,
    "Nighttime hypoglycemia triggers counterregulatory hormones and rebound morning hyperglycemia (Somogyi).");
  mc("dm-core", "The dawn phenomenon is caused by:",
    ["A nighttime surge of growth hormone", "A counterregulatory response to hypoglycemia", "A missed evening dose", "Alcohol intake"], 0,
    "Dawn phenomenon: glucose is normal at 3 AM and rises toward morning due to growth hormone.");
  mc("dm-core", "Which nutrient has the greatest and fastest effect on blood glucose?",
    ["Carbohydrates", "Protein", "Fat", "Water"], 0, "Carbohydrates are digested quickly and have the greatest effect.");
  sata("dm-core", "Which are goals of nutritional therapy in diabetes? Select all that apply.",
    ["Maintain healthy blood glucose", "Achieve normal lipids and blood pressure", "Prevent or slow complications", "Maintain the pleasure of eating", "Eliminate all carbohydrates"], [0, 1, 2, 3],
    "Plans are individualized and balanced. Eliminating all carbohydrates is not a goal.");
  mc("dm-core", "A patient develops hard lumps at insulin injection sites. What is the priority teaching?",
    ["Rotate injection sites", "Inject directly into the lumps for better absorption", "Stop insulin", "Use a smaller dose"], 0,
    "Lipodystrophy results from repeated injections at the same site.");
  mc("dm-core", "Inhaled insulin (Afrezza) is contraindicated in patients with:",
    ["Chronic lung disease such as asthma or COPD", "Type 2 diabetes", "Hypertension", "Obesity"], 0,
    "Afrezza is not for DKA or chronic lung disease and is used with longer-acting insulin.");
  fill("dm-core", "Hypoglycemia is defined as a blood glucose below what value (mg/dL)?", ["70", "<70"], "Hypoglycemia is glucose below 70 mg/dL.");

  /* ---------- ACUTE COMPLICATIONS (2A) ---------- */
  mc("dm-acute", "An alert patient has a glucose of 58 mg/dL and is shaky and sweaty. What is the first action?",
    ["Give 15 g of fast-acting carbohydrate and recheck in 15 minutes", "Give 50 mL of D50 IV push", "Give regular insulin", "Recheck in 1 hour"], 0,
    "Rule of 15: 15 g of carbohydrate, recheck in 15 minutes, repeat if below 70.");
  sata("dm-acute", "Which findings suggest hypoglycemia? Select all that apply.",
    ["Diaphoresis", "Tremor", "Tachycardia", "Hunger", "Kussmaul respirations", "Fruity breath"], [0, 1, 2, 3],
    "Sympathetic signs plus hunger point to hypoglycemia. Kussmaul respirations and fruity breath indicate DKA.");
  mc("dm-acute", "A patient with hypoglycemia is unresponsive and has no IV access. What does the nurse give?",
    ["Glucagon 1 mg IM or subcutaneously", "Orange juice by mouth", "Regular insulin", "Nothing; wait for recovery"], 0,
    "Never place anything in the mouth of an unresponsive patient.");
  mc("dm-acute", "Before giving 50% dextrose IV push, the nurse verifies:",
    ["A large-bore, patent IV site", "A recent A1C", "Urine ketones", "Oral intake"], 0,
    "D50 is a vesicant that causes tissue damage if it extravasates.");
  mc("dm-acute", "Which laboratory results confirm DKA?",
    ["Glucose 480, pH 7.18, HCO3 10, positive ketones", "Glucose 700, pH 7.38, no ketones", "Glucose 60, pH 7.45, no ketones", "Glucose 250, pH 7.40, no ketones"], 0,
    "DKA: glucose 250 or higher, pH below 7.30, HCO3 below 18, and ketones present.");
  mc("dm-acute", "A 74-year-old with pneumonia has glucose 780, pH 7.38, high serum osmolality, and no ketones. Which condition is most likely?",
    ["HHNS", "DKA", "Hypoglycemia", "Somogyi effect"], 0,
    "HHNS: glucose above 600, normal pH, high osmolality, no ketosis, often older type 2 with an infection.");
  mc("dm-acute", "What is the first treatment priority for a patient in DKA?",
    ["IV 0.9% sodium chloride", "Subcutaneous insulin bolus", "Sodium bicarbonate", "Potassium restriction"], 0,
    "Fluids correct dehydration first, then a continuous regular insulin infusion, with potassium replacement as needed.");
  mc("dm-acute", "Why is serum potassium monitored closely during insulin therapy for DKA?",
    ["Insulin moves potassium into cells, lowering serum potassium", "Insulin raises serum potassium", "Ketones raise potassium", "Fluids contain potassium"], 0,
    "Total body potassium is already low, so serum K+ can fall sharply once insulin starts. [+]");
  sata("dm-acute", "Which findings are expected in DKA? Select all that apply.",
    ["Fruity breath", "Kussmaul respirations", "Ketones in the urine", "Dehydration", "Abdominal pain", "Normal arterial pH"], [0, 1, 2, 3, 4],
    "DKA causes metabolic acidosis, so pH is low.");
  mc("dm-acute", "Which patient is at highest risk for HHNS?",
    ["A 72-year-old with type 2 diabetes and a urinary tract infection", "A teen with type 1 diabetes who skipped insulin", "A pregnant woman at 28 weeks", "A runner after a marathon"], 0,
    "HHNS typically affects older type 2 patients with an infection or illness.");
  order("dm-acute", "Place the Rule of 15 for an alert patient with hypoglycemia in order.",
    ["Confirm glucose is below 70 mg/dL", "Give 15 g of fast-acting carbohydrate", "Wait 15 minutes", "Recheck blood glucose", "Give a snack or meal once glucose is back in range"],
    "Recheck after 15 minutes and repeat the carbohydrate if glucose is still below 70.");
  mc("dm-acute", "A patient with the flu and no appetite asks whether to stop insulin. What is the best response?",
    ["Continue insulin, check glucose and ketones, and drink fluids", "Stop insulin until eating normally", "Double the insulin dose", "Take insulin only if glucose is above 300"], 0,
    "Sick-day rules: keep taking diabetes medication, monitor glucose and ketones, hydrate, and call the provider.");
  mc("dm-acute", "Hypoglycemia unawareness is most associated with:",
    ["Autonomic neuropathy", "Retinopathy", "Nephropathy", "Gastroparesis"], 0,
    "Autonomic neuropathy blunts the warning signs, so patients need frequent glucose checks.");

  /* ---------- CHRONIC COMPLICATIONS (2B) ---------- */
  mc("dm-chronic", "Which diabetic complication is the leading cause of end-stage renal disease?",
    ["Nephropathy", "Retinopathy", "Neuropathy", "Peripheral vascular disease"], 0, "Diabetic nephropathy is the leading cause of ESRD.");
  mc("dm-chronic", "Which finding is the earliest sign of diabetic nephropathy?",
    ["Albuminuria", "Elevated BUN", "Oliguria", "Hematuria"], 0, "Microalbuminuria appears first, so urine albumin and creatinine are screened annually.");
  mc("dm-chronic", "Why are ACE inhibitors or ARBs prescribed for many patients with diabetic nephropathy?",
    ["They control blood pressure and protect the kidneys", "They lower blood glucose directly", "They treat neuropathic pain", "They prevent hypoglycemia"], 0,
    "ACE inhibitors (-pril) and ARBs (-sartan) protect the kidneys and lower BP.");
  sata("dm-chronic", "Which teaching points apply to diabetic foot care? Select all that apply.",
    ["Inspect feet daily", "Wear properly fitting footwear", "Never walk barefoot", "Report cuts or blisters within 24 hours", "Soak feet in hot water to improve circulation"], [0, 1, 2, 3],
    "Neuropathy hides injury and heat burns, so avoid hot soaks and check feet daily.");
  sata("dm-chronic", "Which findings are consistent with autonomic neuropathy? Select all that apply.",
    ["Orthostatic hypotension", "Gastroparesis", "Resting tachycardia", "Neurogenic bladder", "Painless myocardial infarction", "Bradycardia at rest"], [0, 1, 2, 3, 4],
    "Autonomic neuropathy causes resting tachycardia, not bradycardia.");
  mc("dm-chronic", "Which screening is recommended annually for diabetic retinopathy?",
    ["Dilated eye examination", "Visual acuity at home", "Tonometry only", "Fundus photography every 5 years"], 0,
    "Retinopathy is the most common cause of new adult blindness, and annual dilated exams detect it. [+]");
  mc("dm-chronic", "The monofilament test is used to assess:",
    ["Loss of protective sensation in the feet", "Peripheral circulation", "Kidney function", "Retinal damage"], 0,
    "Annual monofilament testing screens for peripheral neuropathy.");
  mc("dm-chronic", "A patient with diabetes and neurogenic bladder has recurrent UTIs. Which teaching is best?",
    ["Void on a schedule every 2-3 hours", "Restrict fluids", "Delay voiding until the bladder is full", "Use a heating pad on the abdomen"], 0,
    "Scheduled voiding limits retention and infection.");
  mc("dm-chronic", "An older adult with diabetes becomes newly confused. What should the nurse consider?",
    ["Hypoglycemia, HHNS, or infection may be the cause", "Normal aging", "Insulin overdose only", "Vitamin deficiency only"], 0,
    "Confusion can be the main sign of hypoglycemia, hyperglycemic crisis, UTI, or dehydration in older adults.");
  mc("dm-chronic", "What is the first step toward culturally competent diabetes education?",
    ["Cultural awareness and sensitivity", "A standard handout for everyone", "Strict calorie counting", "Avoiding food discussions"], 0,
    "Culture shapes food preferences and meal preparation, so awareness comes first. The MyPlate method helps personalize teaching.");
  mc("dm-chronic", "Which are macrovascular complications of diabetes?",
    ["Stroke, coronary artery disease, and peripheral vascular disease", "Retinopathy, nephropathy, and neuropathy", "DKA and HHNS", "Hypoglycemia and hyperglycemia"], 0,
    "Macrovascular disease affects medium and large vessels; retinopathy, nephropathy, and neuropathy are microvascular.");

  /* ---------- PROSTATE: PROSTATITIS, BPH, PROSTATE CANCER (2C) ---------- */
  mc("prostate", "Which is often the first symptom of BPH?",
    ["Nocturia", "Hematuria", "Flank pain", "Dribbling"], 0, "Nocturia is often the first symptom, and it develops gradually.");
  sata("prostate", "Which are obstructive symptoms of BPH? Select all that apply.",
    ["Weak urinary stream", "Hesitancy", "Dribbling at the end of urination", "Sensation of incomplete emptying", "Nocturia", "Urgency"], [0, 1, 2, 3],
    "Nocturia, frequency, and urgency are irritative symptoms.");
  mc("prostate", "Finasteride helps BPH by:",
    ["Lowering DHT levels and shrinking the prostate", "Relaxing smooth muscle in the prostate", "Killing bacteria", "Increasing testosterone"], 0,
    "5-alpha-reductase inhibitors lower DHT. Alpha-blockers relax smooth muscle.");
  mc("prostate", "A patient starts tamsulosin for BPH. Which side effect should the nurse teach about?",
    ["Orthostatic hypotension", "Hyperkalemia", "Bradycardia", "Hypoglycemia"], 0, "Alpha-blockers can cause dizziness and orthostatic hypotension. [+]");
  mc("prostate", "A patient is 12 hours post-TURP with continuous bladder irrigation, and the drainage turns bright red. What does the nurse do?",
    ["Increase irrigation rate and notify the provider", "Stop irrigation and clamp the catheter", "Continue at the same rate", "Remove the catheter"], 0,
    "Bright red drainage suggests arterial bleeding. Burgundy suggests venous bleeding. Pink in the first 24 hours is expected.");
  fill("prostate", "True urine output during CBI equals total drainage minus the volume of ___ instilled.",
    ["irrigant", "irrigation", "irrigation fluid", "irrigant volume"], "Subtract the irrigant volume to determine actual urine output. [+]");
  mc("prostate", "Which complication is associated with absorption of irrigating fluid after TURP?",
    ["Dilutional hyponatremia and fluid overload (TURP syndrome)", "Hypercalcemia", "Hyperkalemia", "Metabolic alkalosis"], 0,
    "Absorbed irrigant dilutes sodium and expands volume. [+]");
  sata("prostate", "Which are potential complications after TURP? Select all that apply.",
    ["Hemorrhage", "Catheter obstruction", "Infection", "Deep vein thrombosis", "Fluid volume overload", "Hypercalcemia"], [0, 1, 2, 3, 4],
    "Hypercalcemia is not a TURP complication.");
  mc("prostate", "Which discharge teaching is correct after TURP?",
    ["Avoid straining and heavy lifting and prevent constipation", "Restrict fluids to prevent leakage", "Resume heavy exercise in 1 week", "Avoid all fluids at night"], 0,
    "Straining and lifting can restart bleeding. Maintain fluids and use stool softeners.");
  mc("prostate", "Which test is done first and which is done last in prostate cancer evaluation?",
    ["PSA first, DRE last", "DRE first, PSA last", "Biopsy first, PSA last", "CT first, DRE last"], 0, "The lecture lists PSA first and DRE last.");
  mc("prostate", "At what age does the American Cancer Society recommend prostate screening for asymptomatic, average-risk patients?",
    ["50", "30", "40", "65"], 0, "Screening starts at 50, or 40-45 for high-risk patients.");
  sata("prostate", "Which are risk factors for prostate cancer? Select all that apply.",
    ["Advancing age", "Family history including BRCA1 mutations", "Smoking history", "Abdominal obesity", "Regular exercise"], [0, 1, 2, 3],
    "Exercise is protective, not a risk factor.");
  mc("prostate", "A patient with prostate cancer reports low back pain radiating to the hips and leg weakness. This most likely suggests:",
    ["Metastasis", "A urinary tract infection", "Benign prostatic hyperplasia", "Constipation"], 0,
    "Lumbosacral pain and leg weakness in advanced disease suggest metastasis and possible spinal cord involvement.");
  mc("prostate", "Which findings are expected on a digital rectal exam of acute prostatitis?",
    ["Boggy, swollen, tender gland", "Smooth, rubbery, non-tender gland", "Hard, fixed, painless nodule", "Normal exam"], 0,
    "A normal prostate is smooth, rubbery, and non-tender.");
  mc("prostate", "A patient with prostatitis is prescribed ciprofloxacin. Which adverse effect should the nurse teach about?",
    ["Tendon or ligament injury", "Hyperkalemia", "Orange urine", "Hypoglycemia"], 0, "Fluoroquinolones carry a risk of tendon or ligament injury.");
  mc("prostate", "Which test best identifies urinary retention from BPH?",
    ["Post-void residual (bladder scan)", "Serum sodium", "A1C", "Urine culture only"], 0, "A post-void residual measures leftover urine after voiding.");
  mc("prostate", "A patient with BPH asks about cold medicines. Which teaching is correct?",
    ["Avoid decongestants and antihistamines that can worsen urinary retention", "Use any cold remedy freely", "Take double doses at night", "Avoid all fluids"], 0,
    "Common cough and cold remedies can cause urinary retention in BPH.");
  mc("prostate", "A radical prostatectomy removes which structures?",
    ["Prostate, seminal vesicles, surrounding fat, nerves, and lymph nodes", "Only the lateral lobes", "The bladder and urethra", "The testes"], 0,
    "Radical prostatectomy is an extensive surgical resection for prostate cancer.");

  /* ---------- UTI AND PYELONEPHRITIS (2C) ---------- */
  mc("uti", "Which organism most commonly causes urinary tract infections?",
    ["Escherichia coli", "Staphylococcus aureus", "Candida albicans", "Pseudomonas aeruginosa"], 0, "Most UTIs result from fecal organisms, most often E. coli.");
  mc("uti", "Which diagnostic test is a high nursing priority for a suspected UTI?",
    ["Urine culture and sensitivity", "Serum creatinine", "Abdominal x-ray", "CBC"], 0, "Culture identifies the organism and guides antibiotics, so collect it before starting them. [+]");
  mc("uti", "An older adult has a UTI. Which presentation is most likely?",
    ["New confusion and low-grade fever", "Severe dysuria with high fever only", "No symptoms ever", "Flank pain only"], 0,
    "Older adults often present with confusion rather than classic urinary symptoms.");
  sata("uti", "Which are risk factors for UTI? Select all that apply.",
    ["Female sex", "Pregnancy", "Urinary catheterization", "Diabetes mellitus", "Urinary retention", "High fluid intake"], [0, 1, 2, 3, 4],
    "High fluid intake is protective.");
  mc("uti", "A patient takes phenazopyridine (Pyridium). Which teaching is correct?",
    ["Urine may turn orange or red", "It cures the infection", "It must be taken with antacids", "It causes hyperkalemia"], 0,
    "Pyridium is a urinary analgesic, not an antibiotic. It colors urine. [+]");
  mc("uti", "Which instruction is correct for a patient with an indwelling urinary catheter?",
    ["Keep the closed drainage system and never disconnect the catheter from the bag", "Disconnect the catheter to empty the bag", "Keep the bag above the bladder", "Irrigate daily without an order"], 0,
    "Breaking the closed system raises infection risk.");
  mc("uti", "Which finding best suggests pyelonephritis rather than cystitis?",
    ["Flank (costovertebral angle) pain with fever and chills", "Dysuria only", "Suprapubic discomfort only", "Nocturia only"], 0,
    "Upper tract infection causes flank pain, fever, chills, and leukocytosis.");
  mc("uti", "What is the daily fluid recommendation for chronic pyelonephritis, unless contraindicated?",
    ["3-4 L", "500 mL", "1 L", "No change"], 0, "Higher fluid intake helps flush the urinary tract.");
  mc("uti", "A complicated UTI is most likely:",
    ["Hospital-acquired or catheter-related", "Community-acquired in a healthy adult", "Caused by viral infection", "Present only in children"], 0,
    "Complicated UTIs are typically nosocomial and catheter-related.");
  mc("uti", "Which is a serious complication of untreated pyelonephritis?",
    ["Urosepsis and chronic kidney disease", "Hypoglycemia", "Hypercalcemia", "Metabolic alkalosis"], 0,
    "Upper UTIs can lead to sepsis, bacteremia, and kidney damage.");

  /* ---------- BLADDER CANCER (2C) ---------- */
  mc("bladder", "Which is the classic presenting sign of bladder cancer?",
    ["Painless gross hematuria", "Dysuria with fever", "Flank pain with chills", "Nocturia only"], 0, "Painless gross hematuria is classic.");
  mc("bladder", "Which test confirms bladder cancer?",
    ["Cystoscopy with biopsy", "Urinalysis only", "PSA", "Serum creatinine"], 0, "Cystoscopy with biopsy, along with urine cytology and imaging, establishes the diagnosis.");
  mc("bladder", "Bacillus Calmette-Guerin (BCG) for bladder cancer is a form of:",
    ["Intravesical immunotherapy", "Oral chemotherapy", "External radiation", "Hormonal therapy"], 0, "BCG is instilled into the bladder to stimulate an immune response.");
  mc("bladder", "Which is the greatest modifiable risk factor for bladder cancer?",
    ["Tobacco smoking", "High-fiber diet", "Regular exercise", "Low sodium intake"], 0, "Smoking is the major risk factor; occupational exposures and chronic irritation also contribute.");
  sata("bladder", "Which factors increase the risk of bladder cancer? Select all that apply.",
    ["Tobacco smoking", "Occupational chemical exposure", "Long-term indwelling catheter", "Bladder stones", "Pelvic radiation therapy", "High-fiber diet"], [0, 1, 2, 3, 4],
    "Chronic irritation and exposures raise risk. Fiber does not.");
  mc("bladder", "In TNM staging of bladder cancer, what does N represent?",
    ["Lymph node involvement", "Depth of tumor", "Distant metastasis", "Tumor grade"], 0, "T is depth, N is nodes, M is distant metastasis.");
  mc("bladder", "A bladder tumor that has grown into connective tissue beneath the lining but not into muscle is stage:",
    ["I (T1)", "0a (Ta)", "II (T2)", "IV"], 0, "Stage I extends into connective tissue but not muscle. Stage II involves muscle.");
  mc("bladder", "A patient with bladder cancer reports new back pain and leg weakness. What does the nurse suspect?",
    ["Metastasis with possible spinal cord compression", "A urinary tract infection", "Muscle strain", "Bladder spasm"], 0,
    "Pelvic or back pain signals metastasis, and spinal cord compression needs urgent evaluation.");
  mc("bladder", "TURBT stands for:",
    ["Transurethral resection of bladder tumor", "Total urinary bladder transplant", "Transurethral removal of benign tissue", "Total ureter and bladder tumor"], 0,
    "TURBT, or fulguration, is a surgical treatment for bladder tumors.");

  window.QUESTIONS = Q;
})();

# BudgetBite AI: Full-Stack AI Budget Meal Curator

**BudgetBite AI** is a production-grade full-stack SaaS web application designed for students, gym-goers, and professionals to dynamically optimize their daily macro-nutrient profiles while adhering strictly to tight daily/weekly budgets.

---

## ⚡ Key Architectural Features & Innovation

1. **RAG-based Nutrition Knowledge Base**: Implements a localized TF-IDF cosine-similarity vector search over scientific dietary research papers (BMR deficits, plant-based leucine synthetic thresholds, electrolyte balances). BiteCoach chatbot dynamically extracts and cites matching scientific guidelines!
2. **AI Pantry Scanner Image Recognition**: Processes base64 camera image uploads using OpenAI GPT-4o Vision API to automatically list pantry contents and recommend budget-appropriate meals utilizing active inventory.
3. **Swiggy & Zomato Receipt Order Analyzer**: Extracts dishes and costs from copy-pasted delivery receipts, audits protein efficiency ratios per rupee, critiques pricing metrics against local Bangalore CSV indices, and suggests healthier alternatives nearby.
4. **Predictive Cost Engine (Local CSV Mapping)**: Integrates and parses Bengaluru's `Zomato-data-.csv` and `swiggy_cleaned.csv` locally to calculate actual standard cost indexes for items, feeding highly accurate localized cost predictions.
5. **Dynamic SQLite/PostgreSQL Fallback**: SQLite auto-initializes local files and executes database sessions instantly if PostgreSQL strings are absent, ensuring flawless out-of-the-box local testing.
6. **High-Fidelity Mock Fallback Modes**: Fully functional even if OpenAI API keys are not provided, using complex local math models for macronutrients and costs to enable complete feature demonstrations.

---

## 🛠️ Folder Structure

```
/
├── prisma/
│   └── schema.prisma       # Database schema mapping for PostgreSQL/SQLite
├── backend/
│   ├── app/
│   │   ├── core/           # Config setups, Auth middlewares, DB engines
│   │   ├── models/         # SQLAlchemy model classes
│   │   ├── schemas/        # Pydantic schemas validating input/outputs
│   │   ├── services/       # RAG vectors, CSV Cost Predictors, OpenAI calls
│   │   ├── routers/        # Router endpoints (auth, meal, pantry, coach, analyzer)
│   │   └── main.py         # Main entry point initializing FastAPI
│   └── requirements.txt    # Python dependencies (Pandas, Scikit-learn, OpenAI)
├── frontend/
│   ├── app/
│   │   ├── page.tsx        # Funded startup landing page
│   │   ├── onboarding/     # Biometric intake wizards
│   │   ├── dashboard/      # Cockpit widgets showing budget circular trackers
│   │   ├── generator/      # AI Curation plan studio with CSV exports
│   │   ├── coach/          # BiteCoach chatbot interface
│   │   └── analyzer/       # Swiggy/Zomato receipt analyzers
│   └── package.json
├── docs/
│   └── deployment.md       # Railway & Vercel production hosting guidelines
└── README.md               # Master instructions
```

---

## 🚀 Quick Local Run Instructions

### 1. Run Backend Server (FastAPI)
Navigate to `/backend`:
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run server (automatically initializes SQLite database file)
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```
FastAPI runs on `http://localhost:8000`. You can inspect the fully structured interactive API docs at `http://localhost:8000/docs`.

### 2. Run Frontend Client (Next.js)
Navigate to `/frontend`:
```bash
# Install NPM packages
npm install

# Run hot-reloading development server
npm run dev
```
Next.js client runs on `http://localhost:3000`.

---

## 🎓 Verified Biological Algorithms Implemented

* **BMR (Harris-Benedict Equation)**:
  - *Male*: `BMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)`
  - *Female*: `BMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)`
* **Total Daily Energy Expenditure (TDEE)**: BMR * Activity multiplier.
* **Fitness Target Deficits/Surpluses**:
  - *Weight Loss*: `TDEE - 450 kcal` (Calorie target) | `2.0g / kg` (Protein target)
  - *Muscle Gain*: `TDEE + 300 kcal` (Calorie target) | `2.2g / kg` (Protein target)

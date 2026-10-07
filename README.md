# DATA VERACE

**Evidence-Driven Dataset Analysis Platform**

Data Verace is a scientific dataset analysis system for identifying integrity issues, statistical anomalies, synthetic-data indicators, and potential manipulation signals. It is built on the principle that no single metric proves a dataset is synthetic or fraudulent — all findings include a full evidence chain: **Observation → Evidence → Interpretation → Confidence → Limitations**.

---

## Repository Structure

```
data-verace/
│
├── frontend/          # Next.js application (TypeScript + Tailwind CSS)
│   ├── app/           # App Router pages and layouts
│   ├── components/    # Reusable UI component library
│   ├── data/          # Static demo data (ready to swap for API)
│   ├── lib/           # Shared utility functions
│   ├── types/         # TypeScript domain interfaces
│   └── public/        # Static assets
│
├── backend/           # (Reserved) FastAPI analysis engine
├── evaluation/        # (Reserved) Scientific benchmarking and detector evaluation
├── docs/              # (Reserved) Architecture and methodology documentation
│
├── .github/
│   └── workflows/     # CI/CD automation
│
├── docker-compose.yml # Multi-service orchestration (placeholder)
├── .gitignore
└── README.md
```

---

## Frontend — Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm run start` | Start production server |

---

## Application Routes

| Route | Screen |
|---|---|
| `/` | Dashboard |
| `/analyze` | Dataset Upload |
| `/analyze/preview` | Dataset Preview |
| `/analyze/progress` | Analysis Pipeline Progress |
| `/workspace` | Evidence Workspace (3-pane, core screen) |
| `/explorer` | Evidence Explorer |
| `/columns` | Column Analysis |
| `/reports` | Analytical Report View |
| `/datasets` | Datasets Library |
| `/docs` | Methodology Documentation |
| `/settings` | Settings & Thresholds |

---

## Development Status

| Component | Status |
|---|---|
| Frontend foundation | ✅ Complete |
| Design system & components | ✅ Complete |
| Evidence Workspace | ✅ Complete |
| Demo data layer | ✅ Complete |
| Backend analysis engine | 🔲 Not yet implemented |
| ML detection pipeline | 🔲 Not yet implemented |
| Authentication | 🔲 Not yet implemented |

---

## Design Philosophy

Data Verace avoids binary "Real vs Fake" labels. Every detection presents:

1. **Observation** — the measured statistical divergence
2. **Evidence** — formal test statistics and confidence bounds
3. **Interpretation** — plausible generative or processing mechanisms
4. **Confidence** — calibrated score with uncertainty interval
5. **Limitations** — explicit analytical boundaries

---

## Tech Stack

**Frontend:** Next.js 14 · TypeScript · Tailwind CSS · Lucide Icons
**Backend (planned):** FastAPI · Python
**Analysis (planned):** NumPy / SciPy / scikit-learn

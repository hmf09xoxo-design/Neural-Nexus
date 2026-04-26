<div align="center">

# ⚡ Neural Nexus Shield

### *An AI-powered threat intelligence platform that thinks like an attacker to defend like a fortress.*

![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.135-009688?style=flat-square&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-2.10-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

</div>

---

## What Is This?

Neural Nexus Shield is a **multi-vector fraud detection platform** that analyzes threats across five attack surfaces simultaneously — SMS, Email, URLs, Voice calls, and File attachments. Every channel runs its own specialized AI pipeline with multiple reasoning layers, and they all share a common fraud memory so a scam pattern detected in one channel helps block it in all the others.

It was built with one obsession: **no single model should ever be the last line of defense.**

---

## The Five Threat Engines

### 📱 01 — SMS Intelligence
*"Your KYC expired. Click now." — Blocked.*

Every incoming SMS is processed through a 7-stage pipeline that doesn't stop at a single prediction:

| Stage | What Happens |
|---|---|
| **Preprocessing** | Normalization, URL extraction, phone/entity tagging |
| **NLP Classifier** | Transformer-based semantic intent classification |
| **Stylometry** | Writing pattern and social-engineering tone scoring |
| **URL Risk** | Embedded link threat analysis and urgency heuristics |
| **Vector Memory** | Similarity search against thousands of known scam patterns |
| **Multi-signal Fusion** | Weighted scoring across all signals → `fraud_type` + `risk_score` |
| **LLM Reasoner** | Optional Ollama-powered narrative analysis for ambiguous edge cases |

The architecture intentionally mixes ML, retrieval, and rule-based signals because each layer **catches what the others miss**.

---

### 📧 02 — Email Forensics
*Deep packet inspection for your inbox.*

Email analysis goes beyond keyword matching. The engine dissects the full anatomy of a suspicious email:

- **Header & Sender Forensics** — spoofed addresses, domain mismatch detection
- **Stylometry Model** — trained on phishing vs. legitimate writing patterns, catches social engineering tone even in well-written scams
- **Semantic Classifier** — transformer model trained on merged real-world phishing datasets
- **LLM Reasoning Layer** — produces a narrative explanation of *why* the email is suspicious, not just a score
- **Feedback Loop** — analyst verdicts retrain the classifier automatically over time

---

### 🔗 03 — URL Deep Inspection
*What the link hides, we find.*

The URL pipeline runs a full investigation on every submitted link through seven parallel intelligence modules:

```
URL Input
  ├── Static Feature Extraction  (length, entropy, suspicious keywords, TLD)
  ├── WHOIS & DNS Intelligence   (registrar, TTL, fast-flux detection)
  ├── TLS Certificate Analysis   (issuer, validity, HSTS, TLS version)
  ├── Homoglyph Detector         (Unicode lookalike attack detection)
  ├── Playwright Sandbox         (headless browser — redirects, JS behavior, cookies)
  ├── Cookie Security Analyzer   (insecure flags, session fixation risk)
  └── ML Risk Engine + LLM       (feature fusion → phishing probability + explanation)
```

The sandbox catches redirect chains and JavaScript-based evasion that static analysis can't see. The homoglyph detector catches `rnicrosoft.com` disguised as `microsoft.com`.

---

### 🎙️ 04 — Voice Deepfake Detection
*Is that really a human on the line?*

The voice engine runs **two parallel analysis tracks** simultaneously to minimize latency:

**Track A — Acoustic Analysis (Deepfake Detection)**
- Audio is resampled to exactly 16kHz and chunked into 4-second windows
- A **WavLM-based classifier** (fine-tuned on ASVspoof 2025) analyzes raw waveform features
- Majority voting across chunks produces a `Real / Spoof` verdict with confidence score

**Track B — Linguistic Analysis (Intent Detection)**
- **Faster-Whisper** transcribes the audio with beam search decoding
- The transcript is passed to an LLM fraud reasoner
- The reasoner follows a strict zero-hallucination policy: it only flags red flags that are **literally present in the transcript**

Both tracks complete asynchronously and merge into a single verdict with `risk_score`, `is_fraud`, and `red_flags`.

---

### 📎 05 — File & Attachment Sandbox
*Static analysis. No detonation required.*

Every uploaded file is scanned through three independent engines before a verdict is returned:

1. **YARA Engine** — matches against a custom ruleset for malware signatures and behavioral patterns
2. **ClamAV** — industry-standard antivirus signature scanning
3. **ML Classifier** — trained on the EMBER 2024 dataset, scores PE binaries on structural features and import patterns

Supports: PE executables, PDFs, Office documents, archives, and more.

---

## The AI Firewall — Shadow Guard

Before **any** user input reaches the main LLMs, it passes through **Shadow Guard** — a dedicated prompt injection defense system running as FastAPI middleware.

Shadow Guard uses a separate local LLM with a precisely engineered system prompt that distinguishes between:

- **Human-targeted scams** (phishing, KYC fraud) → *let through for analysis*
- **AI-targeted attacks** (prompt injection, jailbreaks, DAN mode, instruction overrides) → *blocked immediately*

This prevents attackers from using the analysis platform itself as a vector to hijack the underlying models.

---

## Fraud Memory — The Cross-Channel Brain

All five engines share a **vector memory layer** built on FAISS (local) or Pinecone (cloud). When a new scam pattern is confirmed, its embedding is stored in memory. Future submissions across *any channel* are checked against this memory — a phishing SMS pattern can help catch a phishing email with similar wording.

This is how the platform gets smarter with every threat it sees.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Next.js Frontend                   │
│         (React 19 · Framer Motion · GSAP)            │
└───────────────────────┬─────────────────────────────┘
                        │ HTTPS + HttpOnly Cookies
┌───────────────────────▼─────────────────────────────┐
│              FastAPI Backend (Python 3.12)            │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │Shadow    │  │Auth      │  │Rate Limiter      │   │
│  │Guard     │  │Middleware│  │(Redis Token      │   │
│  │(AI FW)   │  │(JWT)     │  │Bucket)           │   │
│  └────┬─────┘  └──────────┘  └──────────────────┘   │
│       │                                              │
│  ┌────▼──────────────────────────────────────────┐   │
│  │              Analysis Routers                  │   │
│  │  /text/sms  /text/email  /url  /voice  /file  │   │
│  └────┬──────────────────────────────────────────┘   │
│       │                                              │
│  ┌────▼──────────────────────────────────────────┐   │
│  │           Intelligence Pipelines               │   │
│  │  NLP · Stylometry · ML · YARA · WavLM ·       │   │
│  │  Whisper · Homoglyph · TLS · Sandbox           │   │
│  └────┬──────────────────────────────────────────┘   │
│       │                                              │
│  ┌────▼──────────┐  ┌───────────┐  ┌─────────────┐  │
│  │ Ollama (LLM)  │  │  FAISS    │  │  SQLite /   │  │
│  │ llama3.2:1b   │  │  Vector   │  │  Supabase   │  │
│  │ qwen2.5:1.5b  │  │  Memory   │  │  PostgreSQL │  │
│  └───────────────┘  └───────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16, React 19, TypeScript, TailwindCSS v4, Framer Motion, GSAP |
| **Backend** | FastAPI, Python 3.12, SQLAlchemy, Pydantic v2 |
| **ML / AI** | PyTorch 2.10, scikit-learn, transformers, spaCy, NLTK |
| **Voice** | WavLM (ASVspoof 2025 fine-tune), faster-whisper, librosa |
| **File Analysis** | YARA, ClamAV, LIEF, pefile, EMBER 2024 |
| **Local LLMs** | Ollama (llama3.2:1b, qwen2.5:1.5b, phi3:mini) |
| **Vector DB** | FAISS (local), Pinecone (cloud) |
| **Database** | SQLite (dev), Supabase PostgreSQL (prod) |
| **Auth** | JWT + HttpOnly cookies, bcrypt, refresh token rotation |
| **Rate Limiting** | Redis token bucket (fail-open when unavailable) |
| **Deployment** | Render (backend), Netlify (frontend) |

---

## Running Locally

**Prerequisites:** Python 3.12+, Node.js 20+, [Ollama](https://ollama.com) installed

```bash
# 1. Clone
git clone https://github.com/hmf09xoxo-design/Neural-Nexus.git
cd Neural-Nexus

# 2. Backend
cd Backend
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# 3. Pull LLM models (in a separate terminal)
ollama pull llama3.2:1b
ollama pull qwen2.5:1.5b

# 4. Frontend (in another terminal)
cd ../Frontend
npm install
npm run dev
```

Open `http://localhost:3000` — the backend runs at `http://localhost:8000`.

**Environment:** Copy `Backend/.env` and fill in:
- `DATABASE_URL` — SQLite (default) or Supabase PostgreSQL
- `JWT_SECRET` — generate with `python -c "import secrets; print(secrets.token_urlsafe(32))"`

---

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/signup` | Create account |
| `POST` | `/auth/login` | Login → sets HttpOnly JWT cookie |
| `POST` | `/text/sms/analyze` | Analyze SMS for fraud |
| `POST` | `/text/email/analyze` | Analyze email for phishing |
| `POST` | `/url/analyze` | Full URL threat inspection |
| `POST` | `/voice/analyse` | Voice deepfake + fraud analysis |
| `POST` | `/attachment/analyze` | File malware scanning |
| `GET` | `/docs` | Interactive API docs (Swagger) |

All analysis endpoints require authentication. Responses include `risk_score`, `fraud_type`, confidence metrics, and a human-readable explanation.

---

## Project Structure

```
Neural-Nexus/
├── Backend/
│   ├── app/
│   │   ├── ai_security/        # Shadow Guard prompt injection defense
│   │   ├── auth/               # JWT auth, bcrypt, token rotation
│   │   ├── text_analysis/      # SMS + Email pipelines
│   │   │   ├── sms_analyzer/   # NLP · Stylometry · Vector memory
│   │   │   └── email_analyzer/ # Classifier · LLM · Feedback loop
│   │   ├── url_analysis/       # 7-layer URL inspection
│   │   ├── voice_analysis/     # WavLM deepfake · Whisper transcription
│   │   ├── attachment_sandbox/ # YARA · ClamAV · ML classifier
│   │   ├── fraud_memory/       # FAISS vector store
│   │   └── middleware/         # Rate limiter · Auth logging
│   └── requirements.txt
├── Frontend/
│   ├── app/                    # Next.js app router
│   ├── components/             # UI components
│   └── lib/api/                # Typed API clients
├── render.yaml                 # Render deployment config
└── Frontend/netlify.toml       # Netlify deployment config
```

---

<div align="center">

Built to make AI-powered fraud analysis accessible, explainable, and production-ready.

**[Live Demo](https://neural-nexus.netlify.app)** · **[API Docs](https://hmf-backend.onrender.com/docs)**

</div>

# crispy-tribble2
# 🏎️ F1 Analytics – AI-Powered Formula 1 Predictions & Insights

**F1 Analytics** is a cinematic, data-driven web application that delivers intelligent Formula 1 race predictions and performance analysis using cutting-edge AI models and real-time motorsport data. Designed for racing enthusiasts, analysts, and professionals, the platform combines sleek visual storytelling with robust backend architecture to offer a premium analytics experience.

---

## 🚀 Features

- **AI Race Predictions** using Google Gemini and Groq (Mixtral) models
- **Live F1 Data** integration via Ergast Developer API
- **Interactive Visualizations** with Chart.js and GSAP animations
- **Responsive UI** styled with Bootstrap 5 and glassmorphism effects
- **Secure API Key Management** and session handling
- **Modular Flask Backend** with SQLAlchemy ORM

---

## 🧠 Tech Stack

### 🔹 Frontend
- Flask + Jinja2 (server-side rendering)
- Bootstrap 5 + custom CSS
- AOS (Animate On Scroll) + GSAP for transitions
- Chart.js for racing analytics
- Font Awesome 6 for icons
- Google Fonts (Inter)

### 🔹 Backend
- Flask with modular route structure
- SQLAlchemy + Flask-SQLAlchemy
- Ergast API client for F1 data
- Google GenAI & Groq API integration
- SQLite (dev) with PostgreSQL compatibility
- JSON columns for flexible data storage
- ProxyFix middleware for secure header handling

---

## 🗃️ Data Models

- `APISettings`: Stores encrypted API keys and configuration
- `F1Data`: Holds race data and standings
- `Prediction`: Stores AI-generated race predictions

---

## 🔐 Security

- Flask session management with secret key configuration
- Encrypted API key storage in database
- Proxy-aware middleware for secure deployments

---

## 📦 Dependencies

```txt
flask>=3.1.2
flask-sqlalchemy>=3.1.1
sqlalchemy>=2.0.43
requests>=2.32.5
pandas>=2.3.2
google-genai>=1.32.0
gunicorn>=23.0.0
psycopg2-binary>=2.9.10
sift-stack-py>=0.8.4
werkzeug>=3.1.3
email-validator>=2.3.0

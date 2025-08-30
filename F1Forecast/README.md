# F1 Analytics - AI-Powered Formula 1 Predictions

## Overview

F1 Analytics is a comprehensive web application that provides AI-powered Formula 1 race predictions and data analysis. The system combines real-time F1 data from the Ergast API with advanced AI models (Google Gemini and Groq) to generate intelligent race predictions, driver performance analysis, and comprehensive motorsport analytics. The application features a cinematic user interface with modern data visualizations, designed to deliver professional-grade F1 analytics for racing enthusiasts and professionals.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Flask with Jinja2 templating engine for server-side rendering
- **UI Design**: Bootstrap 5 with custom CSS for responsive, cinematic styling
- **Animations**: AOS (Animate On Scroll) library with custom GSAP animations for smooth transitions
- **Visualizations**: Chart.js for interactive data charts and racing analytics
- **Styling**: Modern CSS with F1-themed color scheme (red, black, white) and glassmorphism effects

### Backend Architecture
- **Web Framework**: Flask application with modular route structure
- **Database ORM**: SQLAlchemy with Flask-SQLAlchemy integration
- **Data Models**: Three primary models - APISettings (configuration), F1Data (race data), Prediction (AI predictions)
- **API Integration**: Ergast API client for live F1 data fetching
- **AI Integration**: Dual AI provider support (Google Gemini and Groq) for race predictions

### Data Storage Solutions
- **Primary Database**: SQLite for development with PostgreSQL compatibility
- **Data Structure**: Relational database with JSON columns for flexible data storage
- **Connection Pooling**: SQLAlchemy engine with pool recycling and pre-ping for reliability
- **Migration Support**: Flask-SQLAlchemy automatic table creation

### Authentication and Authorization
- **Session Management**: Flask session handling with configurable secret keys
- **API Key Storage**: Encrypted storage of AI service API keys in database
- **Security**: ProxyFix middleware for proper header handling behind proxies

## External Dependencies

### Third-Party APIs
- **Ergast Developer API**: Primary source for F1 race data, standings, and historical information
- **Google Gemini API**: AI model for generating race predictions and driver analysis
- **Groq API**: Alternative AI service using Mixtral model for prediction generation

### Frontend Libraries
- **Bootstrap 5**: CSS framework for responsive design
- **Font Awesome 6**: Icon library for UI elements
- **AOS Library**: Animate on scroll effects
- **Chart.js**: Data visualization and charting
- **GSAP**: Advanced animation library
- **Google Fonts**: Inter font family for typography

### Python Dependencies
- **Flask**: Web application framework
- **SQLAlchemy**: Database ORM and management
- **Requests**: HTTP client for API communications
- **Pandas**: Data manipulation and analysis
- **Google GenAI**: Official Google Gemini API client
- **Werkzeug**: WSGI utilities and middleware

### Development Tools
- **Logging**: Python logging module for debugging and monitoring
- **Environment Variables**: Configuration management for API keys and database URLs
- **JSON**: Data serialization for API responses and database storage
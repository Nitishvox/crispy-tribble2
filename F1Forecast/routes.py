from flask import render_template, request, jsonify, flash, redirect, url_for
from app import app, db
from models import APISettings, F1Data, Prediction
import json
import logging
from f1_data import get_current_season_data, get_driver_standings, get_race_results
from ai_predictions import generate_race_predictions, analyze_driver_performance

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analytics')
def analytics():
    try:
        # Get current season data
        current_data = get_current_season_data()
        driver_standings = get_driver_standings()
        
        return render_template('analytics.html', 
                             current_data=current_data,
                             driver_standings=driver_standings)
    except Exception as e:
        logging.error(f"Error loading analytics: {e}")
        return render_template('analytics.html', 
                             current_data=None,
                             driver_standings=None,
                             error="Failed to load F1 data")

@app.route('/settings', methods=['GET', 'POST'])
def settings():
    if request.method == 'POST':
        try:
            gemini_key = request.form.get('gemini_api_key', '').strip()
            groq_key = request.form.get('groq_api_key', '').strip()
            
            # Get or create settings
            settings = APISettings.query.first()
            if not settings:
                settings = APISettings()
                db.session.add(settings)
            
            settings.gemini_api_key = gemini_key
            settings.groq_api_key = groq_key
            db.session.commit()
            
            flash('API keys saved successfully!', 'success')
            return redirect(url_for('settings'))
            
        except Exception as e:
            logging.error(f"Error saving settings: {e}")
            flash('Failed to save settings. Please try again.', 'error')
    
    # Get current settings
    settings = APISettings.query.first()
    return render_template('settings.html', settings=settings)

@app.route('/api/race-data/<int:season>/<int:round_num>')
def get_race_data(season, round_num):
    try:
        race_data = get_race_results(season, round_num)
        return jsonify(race_data)
    except Exception as e:
        logging.error(f"Error fetching race data: {e}")
        return jsonify({'error': 'Failed to fetch race data'}), 500

@app.route('/api/predictions/<int:race_id>')
def get_predictions(race_id):
    try:
        settings = APISettings.query.first()
        if not settings or not settings.gemini_api_key:
            return jsonify({'error': 'API keys not configured'}), 400
        
        # Try to get race data, or create sample data if none exists
        race = F1Data.query.get(race_id)
        if not race:
            # Create sample race data for demonstration
            sample_race_data = {
                "raceName": "Sample Grand Prix",
                "Circuit": {
                    "circuitName": "Sample Circuit",
                    "Location": {
                        "locality": "Sample City",
                        "country": "Sample Country"
                    }
                },
                "date": "2025-01-01",
                "drivers": [
                    {"driverId": "verstappen", "code": "VER", "givenName": "Max", "familyName": "Verstappen"},
                    {"driverId": "hamilton", "code": "HAM", "givenName": "Lewis", "familyName": "Hamilton"},
                    {"driverId": "leclerc", "code": "LEC", "givenName": "Charles", "familyName": "Leclerc"},
                    {"driverId": "russell", "code": "RUS", "givenName": "George", "familyName": "Russell"},
                    {"driverId": "sainz", "code": "SAI", "givenName": "Carlos", "familyName": "Sainz"}
                ]
            }
            race_data = sample_race_data
        else:
            race_data = json.loads(race.data_json)
        
        # Generate predictions using AI
        predictions = generate_race_predictions(
            race_data=race_data,
            gemini_api_key=settings.gemini_api_key,
            groq_api_key=settings.groq_api_key
        )
        
        return jsonify(predictions)
        
    except Exception as e:
        logging.error(f"Error generating predictions: {e}")
        return jsonify({'error': f'Failed to generate predictions: {str(e)}'}), 500

@app.route('/api/driver-analysis/<driver_name>')
def driver_analysis(driver_name):
    try:
        settings = APISettings.query.first()
        if not settings or not settings.gemini_api_key:
            return jsonify({'error': 'API keys not configured'}), 400
        
        analysis = analyze_driver_performance(
            driver_name=driver_name,
            gemini_api_key=settings.gemini_api_key
        )
        
        return jsonify(analysis)
        
    except Exception as e:
        logging.error(f"Error analyzing driver: {e}")
        return jsonify({'error': 'Failed to analyze driver performance'}), 500

@app.route('/api/telemetry-data')
def get_telemetry_data():
    """Return simulated telemetry data for dashboard gauges"""
    try:
        # This would typically come from real F1 telemetry APIs
        # For now, return structured data that matches the dashboard design
        telemetry_data = {
            'engine_rpm': {
                'current': 6646.51,
                'min': 0,
                'max': 12000,
                'unit': 'RPM'
            },
            'gear': {
                'current': 5,
                'min': 0,
                'max': 8
            },
            'speed': {
                'current': 130.45,
                'min': 0,
                'max': 350,
                'unit': 'km/h'
            },
            'track_data': {
                'lap': 2,
                'sector_times': [23.456, 28.789, 31.234],
                'position_data': [
                    {'x': 100, 'y': 200},
                    {'x': 150, 'y': 180},
                    {'x': 200, 'y': 160},
                    {'x': 250, 'y': 140},
                    {'x': 300, 'y': 130}
                ]
            }
        }
        
        return jsonify(telemetry_data)
        
    except Exception as e:
        logging.error(f"Error fetching telemetry data: {e}")
        return jsonify({'error': 'Failed to fetch telemetry data'}), 500

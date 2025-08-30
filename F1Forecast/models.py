from app import db
from datetime import datetime
import json

class APISettings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    gemini_api_key = db.Column(db.String(500))
    groq_api_key = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class F1Data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    season = db.Column(db.Integer, nullable=False)
    round_number = db.Column(db.Integer, nullable=False)
    race_name = db.Column(db.String(200), nullable=False)
    circuit_name = db.Column(db.String(200), nullable=False)
    race_date = db.Column(db.DateTime)
    data_json = db.Column(db.Text)  # Store race data as JSON
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Prediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    race_id = db.Column(db.Integer, db.ForeignKey('f1_data.id'), nullable=False)
    driver_name = db.Column(db.String(100), nullable=False)
    predicted_position = db.Column(db.Integer)
    confidence_score = db.Column(db.Float)
    prediction_data = db.Column(db.Text)  # Store prediction details as JSON
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

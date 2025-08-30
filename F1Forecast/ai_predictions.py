import os
import json
import logging
from google import genai
from google.genai import types
import requests

def get_gemini_client(api_key):
    """Initialize Gemini client with API key"""
    return genai.Client(api_key=api_key)

def get_groq_response(prompt, api_key):
    """Get response from Groq API"""
    try:
        headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
        
        data = {
            'model': 'mixtral-8x7b-32768',
            'messages': [
                {'role': 'user', 'content': prompt}
            ],
            'temperature': 0.7,
            'max_tokens': 1000
        }
        
        response = requests.post(
            'https://api.groq.com/openai/v1/chat/completions',
            headers=headers,
            json=data,
            timeout=30
        )
        
        if response.status_code == 200:
            return response.json()['choices'][0]['message']['content']
        else:
            logging.error(f"Groq API error: {response.status_code}")
            return None
            
    except Exception as e:
        logging.error(f"Error calling Groq API: {e}")
        return None

def generate_race_predictions(race_data, gemini_api_key, groq_api_key=None):
    """Generate AI-powered race predictions"""
    try:
        client = get_gemini_client(gemini_api_key)
        
        # Prepare prompt with race data
        prompt = f"""
        Analyze the following Formula 1 race data and provide predictions for the upcoming race:
        
        Race Data: {json.dumps(race_data, indent=2)}
        
        Please provide:
        1. Top 5 predicted finishing positions with confidence scores
        2. Key factors affecting the race outcome
        3. Weather impact analysis
        4. Tire strategy recommendations
        5. Potential safety car scenarios
        
        Format the response as JSON with the following structure:
        {{
            "predictions": [
                {{"driver": "Max Verstappen", "position": 1, "confidence": 0.85, "reasoning": "Strong qualifying pace and consistent performance"}},
                {{"driver": "Lewis Hamilton", "position": 2, "confidence": 0.75, "reasoning": "Experienced racecraft and good tire management"}},
                {{"driver": "Charles Leclerc", "position": 3, "confidence": 0.70, "reasoning": "Competitive car pace and strategic flexibility"}},
                {{"driver": "George Russell", "position": 4, "confidence": 0.65, "reasoning": "Solid consistency and team support"}},
                {{"driver": "Carlos Sainz", "position": 5, "confidence": 0.60, "reasoning": "Good race pace and strategic options"}}
            ],
            "key_factors": ["Track temperature", "Tire degradation", "DRS effectiveness", "Pit stop windows"],
            "weather_impact": "Clear conditions expected, favoring aggressive strategies",
            "tire_strategy": "Medium-Hard compound strategy recommended for optimal performance",
            "safety_car_probability": 0.65
        }}
        """
        
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.7
            )
        )
        
        if response.text:
            try:
                predictions = json.loads(response.text)
                
                # Enhance with Groq analysis if available
                if groq_api_key:
                    groq_prompt = f"Provide additional strategic insights for this F1 race prediction: {response.text}"
                    groq_analysis = get_groq_response(groq_prompt, groq_api_key)
                    if groq_analysis:
                        predictions['groq_insights'] = groq_analysis
                
                return predictions
            except json.JSONDecodeError as e:
                logging.error(f"Error parsing Gemini response: {e}")
                # Return fallback predictions
                return get_fallback_predictions()
        else:
            return get_fallback_predictions()
            
    except Exception as e:
        logging.error(f"Error generating predictions: {e}")
        return get_fallback_predictions()

def get_fallback_predictions():
    """Return fallback predictions when AI fails"""
    return {
        "predictions": [
            {"driver": "Max Verstappen", "position": 1, "confidence": 0.85, "reasoning": "Championship leader with consistent performance"},
            {"driver": "Lewis Hamilton", "position": 2, "confidence": 0.75, "reasoning": "Experienced racecraft and strategic excellence"},
            {"driver": "Charles Leclerc", "position": 3, "confidence": 0.70, "reasoning": "Strong qualifying pace and competitive machinery"},
            {"driver": "George Russell", "position": 4, "confidence": 0.65, "reasoning": "Solid consistency and team coordination"},
            {"driver": "Carlos Sainz", "position": 5, "confidence": 0.60, "reasoning": "Good race management and strategic flexibility"}
        ],
        "key_factors": ["Track temperature", "Tire degradation", "Weather conditions", "Pit stop timing"],
        "weather_impact": "Clear conditions expected, favoring optimal race strategies",
        "tire_strategy": "Medium-Hard compound strategy recommended for race distance",
        "safety_car_probability": 0.6,
        "note": "Fallback predictions - AI service temporarily unavailable"
    }

def analyze_driver_performance(driver_name, gemini_api_key):
    """Analyze individual driver performance using AI"""
    try:
        client = get_gemini_client(gemini_api_key)
        
        prompt = f"""
        Analyze the performance of Formula 1 driver {driver_name} based on:
        1. Recent race results and qualifying performances
        2. Historical data and career statistics
        3. Current season performance trends
        4. Strengths and weaknesses
        5. Comparison with teammates and competitors
        
        Provide a comprehensive analysis in JSON format:
        {{
            "driver_name": "{driver_name}",
            "overall_rating": 8.5,
            "strengths": ["strength1", "strength2"],
            "weaknesses": ["weakness1", "weakness2"],
            "recent_form": "analysis",
            "career_highlights": ["highlight1", "highlight2"],
            "comparison_to_peers": "analysis",
            "season_prediction": "prediction"
        }}
        """
        
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        
        if response.text:
            return json.loads(response.text)
        else:
            return {'error': 'No analysis generated'}
            
    except Exception as e:
        logging.error(f"Error analyzing driver performance: {e}")
        return {'error': f'Driver analysis failed: {str(e)}'}

def generate_strategy_recommendations(race_conditions, gemini_api_key):
    """Generate race strategy recommendations"""
    try:
        client = get_gemini_client(gemini_api_key)
        
        prompt = f"""
        Based on these race conditions: {json.dumps(race_conditions, indent=2)}
        
        Generate optimal race strategy recommendations including:
        1. Pit stop timing and tire choices
        2. Fuel load strategies
        3. Weather contingency plans
        4. Risk vs reward analysis
        5. Alternative strategies for different scenarios
        
        Format as JSON with detailed recommendations.
        """
        
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        
        if response.text:
            return json.loads(response.text)
        else:
            return {'error': 'No strategy generated'}
            
    except Exception as e:
        logging.error(f"Error generating strategy: {e}")
        return {'error': f'Strategy generation failed: {str(e)}'}

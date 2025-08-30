import requests
import json
import logging
from datetime import datetime, timedelta

def get_current_season_data():
    """Fetch current F1 season data from Ergast API"""
    try:
        current_year = datetime.now().year
        url = f"http://ergast.com/api/f1/{current_year}.json"
        
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            return data['MRData']['RaceTable']['Races']
        else:
            logging.error(f"Failed to fetch season data: {response.status_code}")
            return []
            
    except Exception as e:
        logging.error(f"Error fetching current season data: {e}")
        return []

def get_driver_standings(year=None):
    """Fetch current driver standings"""
    try:
        if not year:
            year = datetime.now().year
            
        url = f"http://ergast.com/api/f1/{year}/driverStandings.json"
        
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            standings_list = data['MRData']['StandingsTable']['StandingsLists']
            if standings_list:
                return standings_list[0]['DriverStandings']
        
        return []
        
    except Exception as e:
        logging.error(f"Error fetching driver standings: {e}")
        return []

def get_constructor_standings(year=None):
    """Fetch current constructor standings"""
    try:
        if not year:
            year = datetime.now().year
            
        url = f"http://ergast.com/api/f1/{year}/constructorStandings.json"
        
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            standings_list = data['MRData']['StandingsTable']['StandingsLists']
            if standings_list:
                return standings_list[0]['ConstructorStandings']
        
        return []
        
    except Exception as e:
        logging.error(f"Error fetching constructor standings: {e}")
        return []

def get_race_results(year, round_number):
    """Fetch race results for a specific race"""
    try:
        url = f"http://ergast.com/api/f1/{year}/{round_number}/results.json"
        
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            races = data['MRData']['RaceTable']['Races']
            if races:
                return races[0]
        
        return None
        
    except Exception as e:
        logging.error(f"Error fetching race results: {e}")
        return None

def get_qualifying_results(year, round_number):
    """Fetch qualifying results for a specific race"""
    try:
        url = f"http://ergast.com/api/f1/{year}/{round_number}/qualifying.json"
        
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            races = data['MRData']['RaceTable']['Races']
            if races:
                return races[0]
        
        return None
        
    except Exception as e:
        logging.error(f"Error fetching qualifying results: {e}")
        return None

def get_circuit_info(circuit_id):
    """Fetch circuit information"""
    try:
        url = f"http://ergast.com/api/f1/circuits/{circuit_id}.json"
        
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            circuits = data['MRData']['CircuitTable']['Circuits']
            if circuits:
                return circuits[0]
        
        return None
        
    except Exception as e:
        logging.error(f"Error fetching circuit info: {e}")
        return None

def get_driver_career_stats(driver_id):
    """Fetch career statistics for a driver"""
    try:
        # Get all races for the driver
        url = f"http://ergast.com/api/f1/drivers/{driver_id}/results.json?limit=1000"
        
        response = requests.get(url, timeout=15)
        if response.status_code == 200:
            data = response.json()
            races = data['MRData']['RaceTable']['Races']
            
            if not races:
                return None
            
            # Calculate statistics
            total_races = len(races)
            wins = sum(1 for race in races for result in race['Results'] if result['position'] == '1')
            podiums = sum(1 for race in races for result in race['Results'] if result['position'] in ['1', '2', '3'])
            points = sum(float(result['points']) for race in races for result in race['Results'])
            
            return {
                'total_races': total_races,
                'wins': wins,
                'podiums': podiums,
                'total_points': points,
                'win_percentage': (wins / total_races * 100) if total_races > 0 else 0,
                'podium_percentage': (podiums / total_races * 100) if total_races > 0 else 0
            }
        
        return None
        
    except Exception as e:
        logging.error(f"Error fetching driver career stats: {e}")
        return None

def get_lap_times(year, round_number, lap_number=None):
    """Fetch lap times for a specific race"""
    try:
        if lap_number:
            url = f"http://ergast.com/api/f1/{year}/{round_number}/laps/{lap_number}.json"
        else:
            url = f"http://ergast.com/api/f1/{year}/{round_number}/laps.json?limit=2000"
        
        response = requests.get(url, timeout=15)
        if response.status_code == 200:
            data = response.json()
            races = data['MRData']['RaceTable']['Races']
            if races:
                return races[0]['Laps'] if 'Laps' in races[0] else []
        
        return []
        
    except Exception as e:
        logging.error(f"Error fetching lap times: {e}")
        return []

def generate_sample_telemetry():
    """Generate sample telemetry data for dashboard visualization"""
    import random
    import math
    
    # Simulate realistic F1 telemetry data
    telemetry = {
        'timestamp': datetime.now().isoformat(),
        'speed': random.uniform(100, 320),  # km/h
        'rpm': random.uniform(8000, 15000),  # RPM
        'gear': random.randint(1, 8),
        'throttle': random.uniform(0, 100),  # percentage
        'brake': random.uniform(0, 100),  # percentage
        'drs_open': random.choice([True, False]),
        'tire_temp': {
            'front_left': random.uniform(80, 120),
            'front_right': random.uniform(80, 120),
            'rear_left': random.uniform(80, 120),
            'rear_right': random.uniform(80, 120)
        },
        'g_force': {
            'lateral': random.uniform(-5, 5),
            'longitudinal': random.uniform(-5, 5)
        }
    }
    
    return telemetry

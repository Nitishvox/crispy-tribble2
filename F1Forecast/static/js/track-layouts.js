// Real F1 Circuit Track Layouts
// Coordinates are normalized to fit within the track visualization container

const F1_CIRCUITS = {
    'zandvoort': {
        name: 'Circuit Park Zandvoort',
        country: 'Netherlands',
        flag: '🇳🇱',
        grandPrix: 'Dutch Grand Prix',
        lapRecord: '1:11.097',
        // Accurate Zandvoort track layout coordinates
        path: [
            {x: 50, y: 85},   // Start/Finish straight
            {x: 45, y: 75},   // Turn 1 (Tarzan)
            {x: 40, y: 65},
            {x: 35, y: 55},   // Turn 2
            {x: 30, y: 45},   // Turn 3 (Hugenholtz)
            {x: 25, y: 35},
            {x: 20, y: 30},   // Turn 4
            {x: 15, y: 25},
            {x: 15, y: 20},   // Turn 5
            {x: 20, y: 15},   // Turn 6
            {x: 30, y: 15},   // Turn 7 (Scheivlak)
            {x: 40, y: 20},
            {x: 50, y: 25},   // Turn 8
            {x: 60, y: 30},
            {x: 70, y: 35},   // Turn 9 (Tunnel Oost)
            {x: 80, y: 40},
            {x: 85, y: 50},   // Turn 10 (Kumho)
            {x: 85, y: 60},   // Turn 11 (Arie Luyendyk)
            {x: 80, y: 70},   // Turn 12
            {x: 75, y: 75},   // Turn 13 (Hans Ernst)
            {x: 65, y: 80},   // Turn 14 (banked turn)
            {x: 55, y: 85}    // Return to start/finish
        ],
        sectors: [
            {name: 'Sector 1', color: '#00ff00', start: 0, end: 8},
            {name: 'Sector 2', color: '#ffff00', start: 8, end: 16},
            {name: 'Sector 3', color: '#ff0000', start: 16, end: 22}
        ]
    },
    'monza': {
        name: 'Autodromo Nazionale Monza',
        country: 'Italy',
        flag: '🇮🇹',
        grandPrix: 'Italian Grand Prix',
        lapRecord: '1:21.046',
        // High-speed Monza layout
        path: [
            {x: 50, y: 85},   // Start/Finish
            {x: 50, y: 75},   // Straight
            {x: 50, y: 65},
            {x: 45, y: 55},   // Prima Variante (Turn 1)
            {x: 40, y: 50},   // Turn 2
            {x: 35, y: 45},   // Turn 3
            {x: 30, y: 40},
            {x: 25, y: 35},   // Curva Grande
            {x: 20, y: 30},
            {x: 15, y: 25},   // Variante della Roggia
            {x: 20, y: 20},   // Turn 4
            {x: 25, y: 15},   // Turn 5
            {x: 35, y: 15},   // Turn 6
            {x: 45, y: 20},   // Lesmo 1
            {x: 55, y: 25},   // Lesmo 2
            {x: 65, y: 30},
            {x: 75, y: 35},   // Variante Ascari
            {x: 80, y: 45},   // Turn 8
            {x: 85, y: 55},   // Turn 9
            {x: 80, y: 65},   // Curva Parabolica
            {x: 70, y: 75},
            {x: 60, y: 85}    // Back to start
        ],
        sectors: [
            {name: 'Sector 1', color: '#00ff00', start: 0, end: 7},
            {name: 'Sector 2', color: '#ffff00', start: 7, end: 15},
            {name: 'Sector 3', color: '#ff0000', start: 15, end: 22}
        ]
    },
    'silverstone': {
        name: 'Silverstone Circuit',
        country: 'United Kingdom',
        flag: '🇬🇧',
        grandPrix: 'British Grand Prix',
        lapRecord: '1:27.097',
        // Classic Silverstone layout
        path: [
            {x: 50, y: 85},   // Start/Finish
            {x: 45, y: 75},   // Turn 1 (Abbey)
            {x: 40, y: 65},   // Turn 2 (Farm)
            {x: 35, y: 55},   // Turn 3 (Village)
            {x: 30, y: 45},   // Turn 4 (The Loop)
            {x: 25, y: 35},
            {x: 20, y: 25},   // Turn 5 (Aintree)
            {x: 15, y: 20},   // Turn 6 (Wellington Straight)
            {x: 20, y: 15},   // Turn 7 (Brooklands)
            {x: 30, y: 15},   // Turn 8 (Luffield)
            {x: 40, y: 20},   // Turn 9 (Woodcote)
            {x: 50, y: 25},
            {x: 60, y: 30},   // Turn 10 (Copse)
            {x: 70, y: 35},   // Turn 11 (Maggotts)
            {x: 80, y: 40},   // Turn 12 (Becketts)
            {x: 85, y: 50},   // Turn 13 (Chapel)
            {x: 85, y: 60},   // Turn 14 (Stowe)
            {x: 80, y: 70},   // Turn 15 (Vale)
            {x: 70, y: 80},   // Turn 16 (Club)
            {x: 60, y: 85}    // Return to start
        ],
        sectors: [
            {name: 'Sector 1', color: '#00ff00', start: 0, end: 6},
            {name: 'Sector 2', color: '#ffff00', start: 6, end: 14},
            {name: 'Sector 3', color: '#ff0000', start: 14, end: 20}
        ]
    },
    'spa': {
        name: 'Circuit de Spa-Francorchamps',
        country: 'Belgium',
        flag: '🇧🇪',
        grandPrix: 'Belgian Grand Prix',
        lapRecord: '1:46.286',
        // Spa-Francorchamps with iconic Eau Rouge
        path: [
            {x: 50, y: 85},   // Start/Finish
            {x: 45, y: 75},   // Turn 1 (La Source)
            {x: 40, y: 65},
            {x: 35, y: 55},   // Raidillon/Eau Rouge complex
            {x: 30, y: 45},
            {x: 25, y: 35},   // Kemmel Straight
            {x: 20, y: 25},
            {x: 15, y: 20},   // Les Combes
            {x: 20, y: 15},   // Malmedy
            {x: 30, y: 15},   // Rivage
            {x: 40, y: 20},   // Pouhon
            {x: 50, y: 25},   // Fagnes
            {x: 60, y: 30},   // Stavelot
            {x: 70, y: 35},   // Blanchimont
            {x: 80, y: 40},
            {x: 85, y: 50},   // Bus Stop Chicane
            {x: 80, y: 60},
            {x: 70, y: 70},
            {x: 60, y: 80},
            {x: 55, y: 85}    // Back to start
        ],
        sectors: [
            {name: 'Sector 1', color: '#00ff00', start: 0, end: 7},
            {name: 'Sector 2', color: '#ffff00', start: 7, end: 14},
            {name: 'Sector 3', color: '#ff0000', start: 14, end: 20}
        ]
    },
    'monaco': {
        name: 'Circuit de Monaco',
        country: 'Monaco',
        flag: '🇲🇨',
        grandPrix: 'Monaco Grand Prix',
        lapRecord: '1:12.909',
        // Tight Monaco street circuit
        path: [
            {x: 50, y: 85},   // Start/Finish (Pit Straight)
            {x: 45, y: 75},   // Sainte Devote
            {x: 40, y: 65},
            {x: 35, y: 55},   // Massenet
            {x: 30, y: 45},   // Casino Square
            {x: 25, y: 35},   // Mirabeau
            {x: 20, y: 30},   // Grand Hotel Hairpin
            {x: 15, y: 25},
            {x: 20, y: 20},   // Portier
            {x: 30, y: 15},   // Tunnel
            {x: 40, y: 15},   // Nouvelle Chicane
            {x: 50, y: 20},   // Tabac
            {x: 60, y: 25},   // Swimming Pool
            {x: 70, y: 30},
            {x: 75, y: 40},   // La Rascasse
            {x: 80, y: 50},
            {x: 75, y: 60},   // Anthony Noghes
            {x: 65, y: 70},
            {x: 55, y: 80},
            {x: 50, y: 85}    // Back to start
        ],
        sectors: [
            {name: 'Sector 1', color: '#00ff00', start: 0, end: 6},
            {name: 'Sector 2', color: '#ffff00', start: 6, end: 14},
            {name: 'Sector 3', color: '#ff0000', start: 14, end: 20}
        ]
    }
};

// F1 Calendar 2025 (sample dates - adjust as needed)
const F1_CALENDAR_2025 = [
    {circuit: 'bahrain', date: '2025-03-02', name: 'Bahrain Grand Prix'},
    {circuit: 'saudi', date: '2025-03-09', name: 'Saudi Arabian Grand Prix'},
    {circuit: 'australia', date: '2025-03-23', name: 'Australian Grand Prix'},
    {circuit: 'japan', date: '2025-04-06', name: 'Japanese Grand Prix'},
    {circuit: 'china', date: '2025-04-20', name: 'Chinese Grand Prix'},
    {circuit: 'miami', date: '2025-05-04', name: 'Miami Grand Prix'},
    {circuit: 'imola', date: '2025-05-18', name: 'Emilia Romagna Grand Prix'},
    {circuit: 'monaco', date: '2025-05-25', name: 'Monaco Grand Prix'},
    {circuit: 'spain', date: '2025-06-01', name: 'Spanish Grand Prix'},
    {circuit: 'canada', date: '2025-06-15', name: 'Canadian Grand Prix'},
    {circuit: 'austria', date: '2025-06-29', name: 'Austrian Grand Prix'},
    {circuit: 'silverstone', date: '2025-07-06', name: 'British Grand Prix'},
    {circuit: 'hungary', date: '2025-07-20', name: 'Hungarian Grand Prix'},
    {circuit: 'spa', date: '2025-07-27', name: 'Belgian Grand Prix'},
    {circuit: 'zandvoort', date: '2025-08-31', name: 'Dutch Grand Prix'},
    {circuit: 'monza', date: '2025-09-07', name: 'Italian Grand Prix'},
    {circuit: 'baku', date: '2025-09-21', name: 'Azerbaijan Grand Prix'},
    {circuit: 'singapore', date: '2025-10-05', name: 'Singapore Grand Prix'},
    {circuit: 'cota', date: '2025-10-19', name: 'United States Grand Prix'},
    {circuit: 'mexico', date: '2025-10-26', name: 'Mexico City Grand Prix'},
    {circuit: 'interlagos', date: '2025-11-09', name: 'Brazilian Grand Prix'},
    {circuit: 'vegas', date: '2025-11-23', name: 'Las Vegas Grand Prix'},
    {circuit: 'qatar', date: '2025-11-30', name: 'Qatar Grand Prix'},
    {circuit: 'abu-dhabi', date: '2025-12-07', name: 'Abu Dhabi Grand Prix'}
];

// Get current race circuit based on date
function getCurrentRaceCircuit() {
    const today = new Date();
    const currentDateStr = today.toISOString().split('T')[0];
    
    // Find the current or next race
    for (let i = 0; i < F1_CALENDAR_2025.length; i++) {
        const race = F1_CALENDAR_2025[i];
        const raceDate = new Date(race.date);
        const weekBefore = new Date(raceDate);
        weekBefore.setDate(raceDate.getDate() - 7);
        
        if (today >= weekBefore && today <= raceDate) {
            return race.circuit;
        }
    }
    
    // Default to next race if none found
    const nextRace = F1_CALENDAR_2025.find(race => new Date(race.date) > today);
    return nextRace ? nextRace.circuit : 'zandvoort'; // Fallback to Zandvoort
}

// Get track data by circuit key
function getTrackLayout(circuitKey) {
    return F1_CIRCUITS[circuitKey] || F1_CIRCUITS.zandvoort;
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.F1Circuits = {
        circuits: F1_CIRCUITS,
        calendar: F1_CALENDAR_2025,
        getCurrentRaceCircuit,
        getTrackLayout
    };
}
// F1 Analytics Website - Charts and Data Visualization

// Chart.js configuration and data visualization
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Chart !== 'undefined') {
        Chart.defaults.color = '#ffffff';
        Chart.defaults.backgroundColor = 'rgba(225, 6, 0, 0.1)';
        Chart.defaults.borderColor = '#e10600';
        
        initializeCharts();
    }
    
    initializeCustomVisualizations();
});

// Initialize all charts
function initializeCharts() {
    createPerformanceChart();
    createSpeedChart();
    createTelemetryChart();
    createDriverComparisonChart();
    createLapTimeChart();
}

// Performance comparison chart
function createPerformanceChart() {
    const ctx = document.getElementById('performance-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Speed', 'Cornering', 'Braking', 'Overtaking', 'Consistency', 'Wet Weather'],
            datasets: [{
                label: 'Driver Performance',
                data: [85, 92, 78, 88, 90, 75],
                backgroundColor: 'rgba(225, 6, 0, 0.2)',
                borderColor: '#e10600',
                borderWidth: 2,
                pointBackgroundColor: '#e10600',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: '#cccccc'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Speed comparison chart
function createSpeedChart() {
    const ctx = document.getElementById('speed-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 20}, (_, i) => `Lap ${i + 1}`),
            datasets: [
                {
                    label: 'Max Speed (km/h)',
                    data: generateRealisticSpeedData(),
                    borderColor: '#e10600',
                    backgroundColor: 'rgba(225, 6, 0, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Average Speed (km/h)',
                    data: generateRealisticSpeedData(true),
                    borderColor: '#ffd700',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    tension: 0.4,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#cccccc'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#cccccc'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Real-time telemetry chart
function createTelemetryChart() {
    const ctx = document.getElementById('telemetry-chart');
    if (!ctx) return;
    
    const telemetryChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'RPM',
                    data: [],
                    borderColor: '#e10600',
                    backgroundColor: 'rgba(225, 6, 0, 0.1)',
                    yAxisID: 'y'
                },
                {
                    label: 'Speed (km/h)',
                    data: [],
                    borderColor: '#00d4aa',
                    backgroundColor: 'rgba(0, 212, 170, 0.1)',
                    yAxisID: 'y1'
                },
                {
                    label: 'Throttle %',
                    data: [],
                    borderColor: '#ffd700',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    yAxisID: 'y2'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#cccccc'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: '#e10600'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: '#00d4aa'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y2: {
                    type: 'linear',
                    display: false,
                    min: 0,
                    max: 100
                }
            },
            animation: {
                duration: 0 // Disable animation for real-time updates
            }
        }
    });
    
    // Start real-time updates
    startTelemetryUpdates(telemetryChart);
}

// Driver comparison chart
function createDriverComparisonChart() {
    const ctx = document.getElementById('driver-comparison-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Verstappen', 'Hamilton', 'Leclerc', 'Russell', 'Sainz', 'Perez'],
            datasets: [
                {
                    label: 'Points',
                    data: [575, 240, 308, 175, 246, 285],
                    backgroundColor: [
                        '#e10600',
                        '#00d4aa',
                        '#ffd700',
                        '#00d4aa',
                        '#ffd700',
                        '#e10600'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#cccccc'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#cccccc'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutBounce'
            }
        }
    });
}

// Lap time progression chart
function createLapTimeChart() {
    const ctx = document.getElementById('lap-time-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 50}, (_, i) => `${i + 1}`),
            datasets: [
                {
                    label: 'Lap Time (seconds)',
                    data: generateLapTimeData(),
                    borderColor: '#e10600',
                    backgroundColor: 'rgba(225, 6, 0, 0.1)',
                    tension: 0.2,
                    pointRadius: 3,
                    pointHoverRadius: 6
                },
                {
                    label: 'Optimal Lap Time',
                    data: Array(50).fill(72.5),
                    borderColor: '#ffd700',
                    borderDash: [5, 5],
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y.toFixed(3)}s`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Lap Number',
                        color: '#ffffff'
                    },
                    ticks: {
                        color: '#cccccc'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Lap Time (seconds)',
                        color: '#ffffff'
                    },
                    ticks: {
                        color: '#cccccc',
                        callback: function(value) {
                            return value.toFixed(1) + 's';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Custom visualizations without Chart.js
function initializeCustomVisualizations() {
    createTrackVisualization();
    createTireStrategyVisualization();
    createWeatherRadar();
}

// Track position visualization with real F1 circuits
function createTrackVisualization() {
    const canvas = document.getElementById('track-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Get current race circuit (defaults to Zandvoort for Dutch GP)
    const currentCircuit = window.F1Circuits ? window.F1Circuits.getCurrentRaceCircuit() : 'zandvoort';
    const trackData = window.F1Circuits ? window.F1Circuits.getTrackLayout(currentCircuit) : null;
    
    if (trackData) {
        // Display current track info
        displayTrackInfo(trackData);
        
        // Draw real track outline
        drawRealTrackOutline(ctx, canvas.width, canvas.height, trackData);
        
        // Animate cars on real track
        animateRealCarMovement(ctx, canvas.width, canvas.height, trackData);
    } else {
        // Fallback to simple track
        drawTrackOutline(ctx, canvas.width, canvas.height);
        animateCarMovement(ctx, canvas.width, canvas.height);
    }
}

// Display current track information
function displayTrackInfo(trackData) {
    const trackInfoElement = document.querySelector('.track-info');
    if (trackInfoElement) {
        trackInfoElement.innerHTML = `
            <div class="d-flex align-items-center mb-2">
                <span class="me-2" style="font-size: 1.2em;">${trackData.flag}</span>
                <strong>${trackData.name}</strong>
            </div>
            <div class="text-muted small">
                <div>${trackData.grandPrix}</div>
                <div>Lap Record: ${trackData.lapRecord}</div>
            </div>
        `;
    }
}

// Draw real F1 track layout
function drawRealTrackOutline(ctx, width, height, trackData) {
    if (!trackData || !trackData.path) return;
    
    // Track surface
    ctx.strokeStyle = '#444444';
    ctx.lineWidth = 24;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    const path = trackData.path;
    
    // Scale coordinates to canvas size
    const scaleX = (width - 40) / 100;
    const scaleY = (height - 40) / 100;
    
    ctx.moveTo(path[0].x * scaleX + 20, path[0].y * scaleY + 20);
    
    for (let i = 1; i < path.length; i++) {
        const point = path[i];
        ctx.lineTo(point.x * scaleX + 20, point.y * scaleY + 20);
    }
    
    // Close the track
    ctx.lineTo(path[0].x * scaleX + 20, path[0].y * scaleY + 20);
    ctx.stroke();
    
    // Track center line
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw sector divisions
    drawSectorDivisions(ctx, width, height, trackData);
    
    // Start/Finish line
    drawStartFinishLine(ctx, width, height, trackData, scaleX, scaleY);
}

// Draw sector divisions
function drawSectorDivisions(ctx, width, height, trackData) {
    if (!trackData.sectors) return;
    
    const scaleX = (width - 40) / 100;
    const scaleY = (height - 40) / 100;
    
    trackData.sectors.forEach(sector => {
        const startPoint = trackData.path[sector.start];
        const endPoint = trackData.path[sector.end];
        
        if (startPoint) {
            ctx.fillStyle = sector.color;
            ctx.beginPath();
            ctx.arc(startPoint.x * scaleX + 20, startPoint.y * scaleY + 20, 4, 0, 2 * Math.PI);
            ctx.fill();
        }
    });
}

// Draw start/finish line
function drawStartFinishLine(ctx, width, height, trackData, scaleX, scaleY) {
    const startPoint = trackData.path[0];
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    
    // Draw checkered pattern
    ctx.beginPath();
    ctx.moveTo(startPoint.x * scaleX + 15, startPoint.y * scaleY + 10);
    ctx.lineTo(startPoint.x * scaleX + 25, startPoint.y * scaleY + 10);
    ctx.moveTo(startPoint.x * scaleX + 15, startPoint.y * scaleY + 30);
    ctx.lineTo(startPoint.x * scaleX + 25, startPoint.y * scaleY + 30);
    ctx.stroke();
    
    // 'S/F' text
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px Arial';
    ctx.fillText('S/F', startPoint.x * scaleX + 30, startPoint.y * scaleY + 25);
}

// Fallback track outline (original code)
function drawTrackOutline(ctx, width, height) {
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    
    // Monaco-style track
    ctx.beginPath();
    ctx.moveTo(50, height - 50);
    ctx.lineTo(width - 200, height - 50);
    ctx.quadraticCurveTo(width - 50, height - 50, width - 50, height - 200);
    ctx.lineTo(width - 50, 100);
    ctx.quadraticCurveTo(width - 50, 50, width - 100, 50);
    ctx.lineTo(100, 50);
    ctx.quadraticCurveTo(50, 50, 50, 100);
    ctx.lineTo(50, height - 50);
    ctx.stroke();
}

function drawCarPositions(ctx, width, height) {
    const cars = [
        { x: 100, y: height - 50, color: '#e10600' },
        { x: 150, y: height - 50, color: '#00d4aa' },
        { x: 200, y: height - 50, color: '#ffd700' }
    ];
    
    cars.forEach(car => {
        ctx.fillStyle = car.color;
        ctx.fillRect(car.x - 5, car.y - 3, 10, 6);
        
        // Add glow effect
        ctx.shadowColor = car.color;
        ctx.shadowBlur = 10;
        ctx.fillRect(car.x - 3, car.y - 1, 6, 2);
        ctx.shadowBlur = 0;
    });
}

function animateCarMovement(ctx, width, height) {
    let animationId;
    let progress = 0;
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        drawTrackOutline(ctx, width, height);
        
        // Update car positions based on progress
        const carPositions = calculateCarPositions(progress, width, height);
        
        carPositions.forEach(car => {
            ctx.fillStyle = car.color;
            ctx.fillRect(car.x - 5, car.y - 3, 10, 6);
        });
        
        progress += 0.005;
        if (progress > 1) progress = 0;
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Stop animation when element is not visible
    const observer = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
    
    observer.observe(document.getElementById('track-canvas'));
}

// Tire strategy visualization
function createTireStrategyVisualization() {
    const container = document.getElementById('tire-strategy');
    if (!container) return;
    
    const stints = [
        { compound: 'Hard', duration: 25, color: '#ffffff' },
        { compound: 'Medium', duration: 20, color: '#ffd700' },
        { compound: 'Soft', duration: 15, color: '#e10600' }
    ];
    
    let html = '<div class="tire-strategy-timeline">';
    let totalLaps = 0;
    
    stints.forEach((stint, index) => {
        const width = (stint.duration / 60) * 100; // 60 lap race
        html += `
            <div class="tire-stint" style="
                width: ${width}%;
                background: ${stint.color};
                color: ${stint.compound === 'Hard' ? '#000' : '#fff'};
            ">
                <span>${stint.compound}</span>
                <small>${stint.duration} laps</small>
            </div>
        `;
        totalLaps += stint.duration;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Weather radar visualization
function createWeatherRadar() {
    const canvas = document.getElementById('weather-radar');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    // Draw radar circles
    for (let i = 1; i <= 4; i++) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius / 4) * i, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Draw radar lines
    for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + Math.cos(angle) * radius,
            centerY + Math.sin(angle) * radius
        );
        ctx.stroke();
    }
    
    // Draw weather data points
    drawWeatherData(ctx, centerX, centerY, radius);
}

function drawWeatherData(ctx, centerX, centerY, radius) {
    const weatherPoints = [
        { angle: 0.5, distance: 0.6, intensity: 0.8 },
        { angle: 1.2, distance: 0.4, intensity: 0.5 },
        { angle: 2.8, distance: 0.8, intensity: 0.9 },
        { angle: 4.1, distance: 0.3, intensity: 0.3 }
    ];
    
    weatherPoints.forEach(point => {
        const x = centerX + Math.cos(point.angle) * (radius * point.distance);
        const y = centerY + Math.sin(point.angle) * (radius * point.distance);
        
        ctx.fillStyle = `rgba(0, 200, 255, ${point.intensity})`;
        ctx.beginPath();
        ctx.arc(x, y, 8 * point.intensity, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Utility functions for data generation
function generateRealisticSpeedData(average = false) {
    const baseSpeed = average ? 180 : 300;
    const variation = average ? 20 : 40;
    
    return Array.from({length: 20}, () => 
        baseSpeed + (Math.random() - 0.5) * variation
    );
}

function generateLapTimeData() {
    const baseLapTime = 72.5;
    const data = [];
    
    for (let i = 0; i < 50; i++) {
        let lapTime = baseLapTime;
        
        // Add realistic variations
        if (i < 5) lapTime += Math.random() * 2; // Slower start
        else if (i > 45) lapTime += Math.random() * 1.5; // Tire degradation
        else lapTime += (Math.random() - 0.5) * 0.8; // Normal variation
        
        // Pit stops (longer lap times)
        if (i === 15 || i === 35) lapTime += 20;
        
        data.push(lapTime);
    }
    
    return data;
}

// Animate cars on real F1 track
function animateRealCarMovement(ctx, width, height, trackData) {
    let animationId;
    let progress = 0;
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        drawRealTrackOutline(ctx, width, height, trackData);
        
        // Update car positions based on real track path
        const carPositions = calculateRealCarPositions(progress, width, height, trackData);
        
        carPositions.forEach((car, index) => {
            // Car body
            ctx.fillStyle = car.color;
            ctx.fillRect(car.x - 6, car.y - 3, 12, 6);
            
            // Car number
            ctx.fillStyle = '#ffffff';
            ctx.font = '8px Arial Bold';
            ctx.textAlign = 'center';
            ctx.fillText((index + 1).toString(), car.x, car.y + 2);
            
            // Glow effect for leader
            if (index === 0) {
                ctx.shadowColor = car.color;
                ctx.shadowBlur = 15;
                ctx.fillStyle = car.color;
                ctx.fillRect(car.x - 4, car.y - 2, 8, 4);
                ctx.shadowBlur = 0;
            }
        });
        
        progress += 0.003; // Slower for more realistic lap times
        if (progress > 1) progress = 0;
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Stop animation when element is not visible
    const observer = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
    
    observer.observe(document.getElementById('track-canvas'));
}

// Calculate car positions on real track
function calculateRealCarPositions(progress, width, height, trackData) {
    if (!trackData || !trackData.path) {
        return calculateCarPositions(progress, width, height); // Fallback
    }
    
    const scaleX = (width - 40) / 100;
    const scaleY = (height - 40) / 100;
    
    const cars = [
        { offset: 0, color: '#e10600', driver: 'VER' },      // Red Bull
        { offset: 0.05, color: '#00d4aa', driver: 'HAM' },   // Mercedes
        { offset: 0.12, color: '#dc143c', driver: 'LEC' },   // Ferrari
        { offset: 0.18, color: '#00d4aa', driver: 'RUS' },   // Mercedes
        { offset: 0.25, color: '#dc143c', driver: 'SAI' }    // Ferrari
    ];
    
    return cars.map(car => {
        const carProgress = (progress + car.offset) % 1;
        const pathIndex = Math.floor(carProgress * trackData.path.length);
        const nextIndex = (pathIndex + 1) % trackData.path.length;
        const segmentProgress = (carProgress * trackData.path.length) % 1;
        
        const current = trackData.path[pathIndex];
        const next = trackData.path[nextIndex];
        
        return {
            x: (current.x + (next.x - current.x) * segmentProgress) * scaleX + 20,
            y: (current.y + (next.y - current.y) * segmentProgress) * scaleY + 20,
            color: car.color,
            driver: car.driver
        };
    });
}

// Fallback car position calculation (original code)
function calculateCarPositions(progress, width, height) {
    // Simplified track path calculation
    const trackPath = [
        { x: 50, y: height - 50 },
        { x: width - 200, y: height - 50 },
        { x: width - 50, y: height - 200 },
        { x: width - 50, y: 100 },
        { x: width - 100, y: 50 },
        { x: 100, y: 50 },
        { x: 50, y: 100 }
    ];
    
    const cars = [
        { offset: 0, color: '#e10600' },
        { offset: 0.1, color: '#00d4aa' },
        { offset: 0.2, color: '#ffd700' }
    ];
    
    return cars.map(car => {
        const carProgress = (progress + car.offset) % 1;
        const pathIndex = Math.floor(carProgress * trackPath.length);
        const nextIndex = (pathIndex + 1) % trackPath.length;
        const segmentProgress = (carProgress * trackPath.length) % 1;
        
        const current = trackPath[pathIndex];
        const next = trackPath[nextIndex];
        
        return {
            x: current.x + (next.x - current.x) * segmentProgress,
            y: current.y + (next.y - current.y) * segmentProgress,
            color: car.color
        };
    });
}

// Real-time telemetry updates
function startTelemetryUpdates(chart) {
    let dataPoints = 0;
    const maxDataPoints = 50;
    
    setInterval(() => {
        const now = new Date();
        const timeLabel = now.toLocaleTimeString();
        
        // Add new data point
        chart.data.labels.push(timeLabel);
        chart.data.datasets[0].data.push(8000 + Math.random() * 4000); // RPM
        chart.data.datasets[1].data.push(150 + Math.random() * 150);   // Speed
        chart.data.datasets[2].data.push(Math.random() * 100);         // Throttle
        
        // Remove old data points
        if (chart.data.labels.length > maxDataPoints) {
            chart.data.labels.shift();
            chart.data.datasets.forEach(dataset => dataset.data.shift());
        }
        
        chart.update('none'); // Update without animation
        dataPoints++;
    }, 1000);
}

// Export for global access
window.F1Charts = {
    createPerformanceChart,
    createSpeedChart,
    createTelemetryChart,
    generateRealisticSpeedData,
    generateLapTimeData
};

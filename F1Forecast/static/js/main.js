// F1 Analytics Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeAnimations();
    initializeScrollEffects();
    initializeFormHandlers();
    loadDashboardData();
    
    console.log('F1 Analytics Website Initialized');
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation initialization
function initializeAnimations() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
    
    // Timeline animation on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Floating animations for hero elements
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Scroll effects and parallax
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero background
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Update progress indicators
        updateScrollProgress();
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);
}

// Update scroll progress
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Update any progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        bar.style.width = scrolled + '%';
    });
}

// Form handlers
function initializeFormHandlers() {
    // Settings form
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Saving...';
            submitBtn.disabled = true;
            
            // Re-enable after form submission
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // API key validation
    const apiKeyInputs = document.querySelectorAll('input[name*="api_key"]');
    apiKeyInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateApiKey(this);
        });
    });
}

// API key validation
function validateApiKey(input) {
    const value = input.value.trim();
    const feedback = input.parentNode.querySelector('.key-feedback') || 
                    createFeedbackElement(input);
    
    if (value.length === 0) {
        feedback.textContent = '';
        feedback.className = 'key-feedback';
        return;
    }
    
    if (value.length < 20) {
        feedback.textContent = 'API key seems too short';
        feedback.className = 'key-feedback invalid';
    } else {
        feedback.textContent = 'API key format looks valid';
        feedback.className = 'key-feedback valid';
    }
}

function createFeedbackElement(input) {
    const feedback = document.createElement('div');
    feedback.className = 'key-feedback';
    input.parentNode.appendChild(feedback);
    return feedback;
}

// Dashboard data loading
function loadDashboardData() {
    if (document.querySelector('.analytics-dashboard')) {
        loadTelemetryData();
        loadRaceData();
        startDataRefresh();
    }
}

// Load telemetry data for gauges
async function loadTelemetryData() {
    try {
        const response = await fetch('/api/telemetry-data');
        if (response.ok) {
            const data = await response.json();
            updateTelemetryGauges(data);
        } else {
            console.error('Failed to load telemetry data');
            showErrorState('telemetry');
        }
    } catch (error) {
        console.error('Error loading telemetry:', error);
        showErrorState('telemetry');
    }
}

// Update telemetry gauges
function updateTelemetryGauges(data) {
    // Update RPM gauge
    updateGauge('rpm-gauge', data.engine_rpm.current, data.engine_rpm.max);
    
    // Update speed gauge
    updateGauge('speed-gauge', data.speed.current, data.speed.max);
    
    // Update gear indicator
    updateGearIndicator(data.gear.current);
    
    // Update track visualization
    updateTrackVisualization(data.track_data);
}

// Update individual gauge
function updateGauge(gaugeId, value, maxValue) {
    const gauge = document.getElementById(gaugeId);
    if (!gauge) return;
    
    const percentage = (value / maxValue) * 100;
    const angle = (percentage * 270) - 135; // 270 degrees total, starting from -135
    
    const needle = gauge.querySelector('.gauge-needle');
    const valueDisplay = gauge.querySelector('.gauge-value');
    
    if (needle) {
        needle.style.transform = `rotate(${angle}deg)`;
    }
    
    if (valueDisplay) {
        valueDisplay.textContent = Math.round(value);
    }
    
    // Add smooth animation
    gauge.style.transition = 'all 0.3s ease-out';
}

// Update gear indicator
function updateGearIndicator(gear) {
    const gearDisplay = document.getElementById('gear-display');
    if (gearDisplay) {
        gearDisplay.textContent = gear;
        
        // Add flash effect for gear changes
        gearDisplay.classList.add('gear-change');
        setTimeout(() => {
            gearDisplay.classList.remove('gear-change');
        }, 300);
    }
}

// Update track visualization
function updateTrackVisualization(trackData) {
    const trackCanvas = document.getElementById('track-canvas');
    if (!trackCanvas || !trackData.position_data) return;
    
    const ctx = trackCanvas.getContext('2d');
    const { width, height } = trackCanvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw track line
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 20;
    ctx.beginPath();
    
    trackData.position_data.forEach((point, index) => {
        const x = (point.x / 600) * width;
        const y = (point.y / 400) * height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw car position (last point)
    const lastPoint = trackData.position_data[trackData.position_data.length - 1];
    const carX = (lastPoint.x / 600) * width;
    const carY = (lastPoint.y / 400) * height;
    
    ctx.fillStyle = '#e10600';
    ctx.beginPath();
    ctx.arc(carX, carY, 8, 0, 2 * Math.PI);
    ctx.fill();
}

// Load race data
async function loadRaceData() {
    try {
        const currentYear = new Date().getFullYear();
        const response = await fetch(`/api/race-data/${currentYear}/1`);
        
        if (response.ok) {
            const data = await response.json();
            updateRaceDisplay(data);
        }
    } catch (error) {
        console.error('Error loading race data:', error);
        showErrorState('race-data');
    }
}

// Update race display
function updateRaceDisplay(raceData) {
    const raceInfo = document.getElementById('race-info');
    if (raceInfo && raceData) {
        raceInfo.innerHTML = `
            <h3>${raceData.raceName}</h3>
            <p><strong>Circuit:</strong> ${raceData.Circuit.circuitName}</p>
            <p><strong>Location:</strong> ${raceData.Circuit.Location.locality}, ${raceData.Circuit.Location.country}</p>
            <p><strong>Date:</strong> ${new Date(raceData.date).toLocaleDateString()}</p>
        `;
    }
}

// Start automatic data refresh
function startDataRefresh() {
    // Refresh telemetry data every 2 seconds
    setInterval(loadTelemetryData, 2000);
    
    // Refresh race data every 30 seconds
    setInterval(loadRaceData, 30000);
}

// Show error state
function showErrorState(component) {
    const errorContainer = document.getElementById(`${component}-error`);
    if (errorContainer) {
        errorContainer.innerHTML = `
            <div class="alert alert-error">
                <i class="fas fa-exclamation-triangle"></i>
                Failed to load ${component.replace('-', ' ')} data. 
                <a href="#" onclick="location.reload()">Refresh page</a> to try again.
            </div>
        `;
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            }, 0);
        });
    }
}

// Initialize performance tracking
trackPerformance();

// Export functions for global access
window.F1Analytics = {
    updateGauge,
    updateGearIndicator,
    loadTelemetryData,
    loadRaceData,
    validateApiKey
};

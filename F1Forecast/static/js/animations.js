// F1 Analytics Website - Advanced Animations

// GSAP-based animations for enhanced user experience
document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap !== 'undefined') {
        initializeGSAPAnimations();
    }
    
    initializeCustomAnimations();
    initializeCinematicEffects();
});

// GSAP Animations
function initializeGSAPAnimations() {
    // Hero section entrance animation
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .from('.hero-title', {
            duration: 1.2,
            y: 100,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.6')
        .from('.hero .btn-f1', {
            duration: 0.8,
            scale: 0,
            opacity: 0,
            ease: 'back.out(1.7)'
        }, '-=0.4')
        .from('.hero .btn-outline-f1', {
            duration: 0.8,
            scale: 0,
            opacity: 0,
            ease: 'back.out(1.7)'
        }, '-=0.6');
    
    // Staggered animation for cards
    gsap.from('.step-card', {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.how-it-works',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Dashboard gauges animation
    gsap.from('.gauge-container', {
        duration: 1.5,
        scale: 0,
        rotation: 180,
        opacity: 0,
        stagger: 0.3,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
            trigger: '.analytics-dashboard',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Parallax scrolling effects
    gsap.utils.toArray('.parallax-element').forEach(element => {
        gsap.to(element, {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
    
    // Text reveal animations
    gsap.utils.toArray('.text-reveal').forEach(text => {
        gsap.from(text, {
            duration: 1,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: text,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Custom animations without external libraries
function initializeCustomAnimations() {
    // Number counter animation
    animateCounters();
    
    // Gauge needle animations
    animateGaugeNeedles();
    
    // Loading animations
    initializeLoadingAnimations();
    
    // Hover effects
    initializeHoverEffects();
}

// Animate number counters
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = parseInt(counter.dataset.duration) || 2000;
                
                animateCounter(counter, 0, target, duration);
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOutCubic);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Animate gauge needles
function animateGaugeNeedles() {
    const gauges = document.querySelectorAll('.gauge');
    
    gauges.forEach(gauge => {
        const needle = gauge.querySelector('.gauge-needle');
        if (needle) {
            // Random animation for demo purposes
            setInterval(() => {
                const randomAngle = Math.random() * 270 - 135;
                needle.style.transform = `rotate(${randomAngle}deg)`;
                needle.style.transition = 'transform 1s ease-out';
            }, 3000);
        }
    });
}

// Loading animations
function initializeLoadingAnimations() {
    // Skeleton loading effect
    const skeletonElements = document.querySelectorAll('.skeleton');
    
    skeletonElements.forEach(element => {
        element.style.background = `
            linear-gradient(90deg, 
                rgba(255,255,255,0.1) 25%, 
                rgba(255,255,255,0.2) 50%, 
                rgba(255,255,255,0.1) 75%
            )
        `;
        element.style.backgroundSize = '200% 100%';
        element.style.animation = 'skeleton-loading 1.5s infinite';
    });
    
    // Add keyframe animation via CSS
    if (!document.querySelector('#skeleton-styles')) {
        const style = document.createElement('style');
        style.id = 'skeleton-styles';
        style.textContent = `
            @keyframes skeleton-loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Hover effects
function initializeHoverEffects() {
    // Card tilt effect
    const cards = document.querySelectorAll('.step-card, .dashboard-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `
                translateY(-10px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
            `;
        });
    });
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn-f1, .btn-outline-f1');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple keyframes
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Cinematic effects
function initializeCinematicEffects() {
    // Screen flash effect for important actions
    window.screenFlash = function(color = '#e10600') {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: ${color};
            opacity: 0.8;
            z-index: 9999;
            pointer-events: none;
            animation: screenFlash 0.3s ease-out;
        `;
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.remove();
        }, 300);
    };
    
    // Add screen flash keyframes
    if (!document.querySelector('#flash-styles')) {
        const style = document.createElement('style');
        style.id = 'flash-styles';
        style.textContent = `
            @keyframes screenFlash {
                0% { opacity: 0; }
                50% { opacity: 0.8; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Glitch effect for error states
    window.glitchEffect = function(element, duration = 1000) {
        element.classList.add('glitch');
        
        setTimeout(() => {
            element.classList.remove('glitch');
        }, duration);
    };
    
    // Add glitch styles
    if (!document.querySelector('#glitch-styles')) {
        const style = document.createElement('style');
        style.id = 'glitch-styles';
        style.textContent = `
            .glitch {
                animation: glitch 0.5s infinite;
            }
            
            @keyframes glitch {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Particle system for background effects
class ParticleSystem {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.options = {
            particleCount: options.particleCount || 50,
            particleColor: options.particleColor || '#e10600',
            particleSize: options.particleSize || 2,
            speed: options.speed || 1,
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.options.speed,
                vy: (Math.random() - 0.5) * this.options.speed,
                size: Math.random() * this.options.particleSize + 1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.fillStyle = this.options.particleColor;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system if canvas exists
document.addEventListener('DOMContentLoaded', function() {
    const particleCanvas = document.getElementById('particle-canvas');
    if (particleCanvas) {
        new ParticleSystem(particleCanvas, {
            particleCount: 30,
            particleColor: 'rgba(225, 6, 0, 0.3)',
            speed: 0.5
        });
    }
});

// Export for global access
window.F1Animations = {
    screenFlash: window.screenFlash,
    glitchEffect: window.glitchEffect,
    ParticleSystem,
    animateCounter
};

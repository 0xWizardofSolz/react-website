import React, { memo, useRef, useContext, useEffect, useCallback } from 'react';
import { ThemeContext } from '../context/ThemeContext';

// --- Performance Constants ---
const MAX_PARTICLES = 60; // Further reduced for better performance
const CONNECT_DISTANCE_SQUARED = 100 * 100; // Reduced connection distance for fewer calculations
const PARTICLE_DENSITY = 12000; // Reduced density for fewer particles
const ANIMATION_INTERVAL = 1000 / 60; // Target 60 FPS
const RESIZE_DEBOUNCE_DELAY = 300; // Longer debounce for resize

// --- Optimized Debounce Utility Function ---
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

// --- Visibility Observer Hook ---
const useVisibilityObserver = (ref, callback) => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => callback(entry.isIntersecting),
            { threshold: 0 }
        );
        
        if (ref.current) {
            observer.observe(ref.current);
        }
        
        return () => observer.disconnect();
    }, [ref, callback]);
};

// --- Network Node Background Component ---
const NetworkBackground = memo(() => {
    const canvasRef = useRef(null);
    const { theme } = useContext(ThemeContext);
    const isVisibleRef = useRef(true);
    const lastAnimationTime = useRef(0);

    // Visibility observer callback
    const handleVisibilityChange = useCallback((isVisible) => {
        isVisibleRef.current = isVisible;
    }, []);

    useVisibilityObserver(canvasRef, handleVisibilityChange);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let particlesArray = [];

        // --- COLOR THEME ---
        const colors = {
            light: { background: 'hsl(0 0% 100%)', particle: 'hsl(0, 100%, 65%)', line: '248, 113, 113' },
            dark: { background: 'hsl(0 0% 0%)', particle: 'hsl(0, 100%, 65%)', line: '248, 113, 113' }
        };

        const currentColors = colors[theme] || colors.dark;
        const lineRgb = currentColors.line;

        // Optimized resize handler
        const resizeCanvas = () => {
            const { devicePixelRatio = 1 } = window;
            const rect = canvas.getBoundingClientRect();
            
            canvas.width = rect.width * devicePixelRatio;
            canvas.height = rect.height * devicePixelRatio;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            
            ctx.scale(devicePixelRatio, devicePixelRatio);
            init();
        };

        // Optimized Particle class with object pooling concepts
        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x; 
                this.y = y; 
                this.directionX = directionX; 
                this.directionY = directionY; 
                this.size = size; 
                this.color = color;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            
            update() {
                const { width, height } = canvas;
                
                // Boundary collision detection with bounce
                if (this.x > width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        const init = () => {
            particlesArray = [];
            const numberOfParticles = Math.min(MAX_PARTICLES, (canvas.height * canvas.width) / PARTICLE_DENSITY);
            for (let i = 0; i < numberOfParticles; i++) {
                const size = (Math.random() * 1.2) + 0.5;
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const directionX = (Math.random() * 0.3) - 0.15;
                const directionY = (Math.random() * 0.3) - 0.15;
                particlesArray.push(new Particle(x, y, directionX, directionY, size, currentColors.particle));
            }
        };

        // Optimized connection drawing with early exit
        const connect = () => {
            ctx.lineWidth = 0.5;
            const particles = particlesArray;
            const length = particles.length;
            
            for (let a = 0; a < length; a++) {
                const particleA = particles[a];
                
                for (let b = a + 1; b < length; b++) {
                    const particleB = particles[b];
                    const dx = particleA.x - particleB.x;
                    const dy = particleA.y - particleB.y;
                    const distanceSquared = dx * dx + dy * dy;
                    
                    if (distanceSquared < CONNECT_DISTANCE_SQUARED) {
                        const opacityValue = 1 - (distanceSquared / CONNECT_DISTANCE_SQUARED);
                        ctx.strokeStyle = `rgba(${lineRgb}, ${opacityValue * 0.6})`; // Slightly reduced opacity for performance
                        ctx.beginPath();
                        ctx.moveTo(particleA.x, particleA.y);
                        ctx.lineTo(particleB.x, particleB.y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Frame rate controlled animation with visibility check
        const animate = (currentTime) => {
            if (!isVisibleRef.current) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }
            
            if (currentTime - lastAnimationTime.current >= ANIMATION_INTERVAL) {
                ctx.fillStyle = currentColors.background;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Update particles
                for (let i = 0; i < particlesArray.length; i++) {
                    particlesArray[i].update();
                }
                
                connect();
                lastAnimationTime.current = currentTime;
            }
            
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            cancelAnimationFrame(animationFrameId);
            resizeCanvas();
            animationFrameId = requestAnimationFrame(animate);
        };
        
        const debouncedResize = debounce(handleResize, RESIZE_DEBOUNCE_DELAY);

        resizeCanvas();
        animationFrameId = requestAnimationFrame(animate);
        
        window.addEventListener('resize', debouncedResize, { passive: true });

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', debouncedResize);
        };
    }, [theme]);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
});

export default NetworkBackground;

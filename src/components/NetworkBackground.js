import React, { memo, useRef, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';

// --- Performance Constants ---
const MAX_PARTICLES = 100; // Reduced for better performance
const CONNECT_DISTANCE_SQUARED = 120 * 120; // Slightly reduced connection distance
const PARTICLE_DENSITY = 10000; // Controls how many particles are created relative to screen size

// --- Debounce Utility Function ---
// Moved outside the component to prevent re-creation on every render
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

// --- Network Node Background Component ---
const NetworkBackground = memo(() => {
    const canvasRef = useRef(null);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let particlesArray = [];

        // --- COLOR FIX ---
        // The line color is pre-formatted as an RGB string for performance.
        const colors = {
            light: { background: 'hsl(0 0% 100%)', particle: 'hsl(0 100% 50%)', line: '255, 0, 0' },
            dark: { background: 'hsl(0 0% 0%)', particle: 'hsl(0 100% 50%)', line: '255, 0, 0' }
        };

        const currentColors = colors[theme] || colors.dark;
        const lineRgb = currentColors.line; // Store the RGB part of the line color

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
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

        const connect = () => {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a + 1; b < particlesArray.length; b++) {
                    const distanceSquared = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
                    if (distanceSquared < CONNECT_DISTANCE_SQUARED) {
                        const opacityValue = 1 - (distanceSquared / CONNECT_DISTANCE_SQUARED);
                        // Restored dynamic color for lines using the performant pre-formatted RGB string.
                        ctx.strokeStyle = `rgba(${lineRgb}, ${opacityValue})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            ctx.fillStyle = currentColors.background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            for (const particle of particlesArray) {
                particle.update();
            }
            connect();
        };

        const handleResize = () => {
            cancelAnimationFrame(animationFrameId);
            resizeCanvas();
            animate();
        };
        
        const debouncedResize = debounce(handleResize, 250);

        resizeCanvas();
        animate();
        
        window.addEventListener('resize', debouncedResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', debouncedResize);
        };
    }, [theme]);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
});

export default NetworkBackground;

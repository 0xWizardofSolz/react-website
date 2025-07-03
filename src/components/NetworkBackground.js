// src/components/NetworkBackground.js
import React, { memo, useRef, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';

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

        const colors = {
            light: { background: 'hsl(210 40% 98%)', particle: 'hsl(210 4% 45%)', line: 'hsl(210 4% 65%)' },
            dark: { background: 'hsl(222.2 84% 4.9%)', particle: 'hsl(215 25% 27%)', line: 'hsl(215 25% 35%)' }
        };

        const currentColors = colors[theme] || colors.dark;

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
                ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = this.color; ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                this.x += this.directionX; this.y += this.directionY; this.draw();
            }
        }

        const init = () => {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 12000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 1.2) + 0.5;
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                let directionX = (Math.random() * 0.3) - 0.15;
                let directionY = (Math.random() * 0.3) - 0.15;
                particlesArray.push(new Particle(x, y, directionX, directionY, size, currentColors.particle));
            }
        };

        const connect = () => {
            let opacityValue = 1;
            const connectDistance = (Math.min(canvas.width, canvas.height) / 7) ** 2;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
                    if (distance < connectDistance) {
                        opacityValue = 1 - (distance / 20000);
                        const rgbLine = currentColors.line.match(/\d+/g);
                        if (rgbLine && rgbLine.length >= 3) {
                            ctx.strokeStyle = `rgba(${rgbLine[0]}, ${rgbLine[1]}, ${rgbLine[2]}, ${opacityValue})`;
                        } else {
                            ctx.strokeStyle = `rgba(100, 116, 139, ${opacityValue})`;
                        }
                        ctx.lineWidth = 0.5;
                        ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            ctx.fillStyle = currentColors.background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(p => p.update());
            connect();
        };

        const debounce = (func, delay) => {
            let timeout;
            return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, args), delay); };
        };

        const debouncedResize = debounce(resizeCanvas, 250);
        resizeCanvas();
        window.addEventListener('resize', debouncedResize);
        animate();

        return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('resize', debouncedResize); };
    }, [theme]);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
});

export default NetworkBackground;

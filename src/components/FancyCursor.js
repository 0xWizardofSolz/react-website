import React, { memo, useEffect, useRef, useState } from 'react';

// This is the new, more performant implementation for the custom cursor.
// It uses requestAnimationFrame for smooth movement and direct DOM manipulation for speed.
const FancyCursor = memo(() => {
    const cursorRef = useRef(null);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        // Check for touch devices once at the beginning. If it's a touch device,
        // the custom cursor will not be rendered.
        if (typeof window !== 'undefined' && 'ontouchstart' in window) {
            setIsTouch(true);
            return;
        }

        const cursor = cursorRef.current;
        if (!cursor) return;

        let animationFrameId;

        // The mouse move handler is throttled with requestAnimationFrame to ensure
        // the animation is smooth and doesn't cause performance issues.
        const handleMouseMove = (e) => {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(() => {
                // The offset issue was caused by positioning the cursor's top-left corner
                // at the mouse coordinates. To fix this, `translate(-50%, -50%)` is added.
                // This shifts the cursor element by half its own width and height,
                // which effectively centers it on the pointer without affecting the visuals.
                cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;

                const el = document.elementFromPoint(e.clientX, e.clientY);
                const classList = cursor.classList;
                
                // Coercing to boolean with `!!` is a micro-optimization.
                const isResize = !!el?.closest('#custom-resize-handle');
                const isText = !!el?.closest('input[type="text"], input[type="email"], textarea');
                const isLink = !!el?.closest('a, button');

                // These classes are toggled based on the hovered element.
                // The actual visual styles are defined in your CSS files.
                classList.toggle('resize-hover', isResize);
                classList.toggle('text-hover', isText && !isResize);
                classList.toggle('link-hover', isLink && !isText && !isResize);
            });
        };

        // Using a passive event listener can improve scrolling performance.
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // The cleanup function removes the event listener when the component unmounts
        // to prevent memory leaks.
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []); // The empty dependency array ensures this effect runs only once.

    if (isTouch) {
        return null;
    }

    return (
        // `will-change` is a hint to the browser to optimize for transform changes.
        <div ref={cursorRef} id="fancy-cursor" style={{ willChange: 'transform' }}>
            <div className="fancy-cursor-dot" />
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 19L19 5M5 19L9 19M5 19L5 15M19 5L15 5M19 5L19 9" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    );
});

export default FancyCursor;

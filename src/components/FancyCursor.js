import React, { memo, useEffect, useRef, useState } from 'react';

const FancyCursor = memo(() => {
    const cursorRef = useRef(null);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        // Check for touch device once at the beginning
        if (typeof window !== 'undefined' && 'ontouchstart' in window) {
            setIsTouch(true);
            return; // Exit early if it's a touch device
        }

        const cursor = cursorRef.current;
        if (!cursor) return;

        let animationFrameId;

        // Throttled mouse move handler using requestAnimationFrame
        const handleMouseMove = (e) => {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(() => {
                // Use translate3d for hardware acceleration
                cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

                const el = document.elementFromPoint(e.clientX, e.clientY);
                const classList = cursor.classList;
                
                // Use !! to coerce values to boolean, which is slightly more performant
                const isResize = !!el?.closest('#custom-resize-handle');
                const isText = !!el?.closest('input[type="text"], input[type="email"], textarea');
                const isLink = !!el?.closest('a, button');

                classList.toggle('resize-hover', isResize);
                classList.toggle('text-hover', isText && !isResize);
                classList.toggle('link-hover', isLink && !isText && !isResize);
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Cleanup function
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []); // Empty dependency array because we only need to set this up once

    // Don't render the cursor on touch devices
    if (isTouch) {
        return null;
    }

    return (
        // Add will-change to hint the browser about upcoming transform changes
        <div ref={cursorRef} id="fancy-cursor" style={{ willChange: 'transform' }}>
            <div className="fancy-cursor-dot" />
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 19L19 5M5 19L9 19M5 19L5 15M19 5L15 5M19 5L19 9" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    );
});

export default FancyCursor;

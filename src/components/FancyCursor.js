// src/components/FancyCursor.js
import React, { memo, useEffect, useRef, useState } from 'react';

const FancyCursor = memo(() => {
  const cursorRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    const handleTouch = () => {
      setIsTouch(true);
      window.removeEventListener('mousemove', handleMouseMove);
    };

    const handleMouseMove = (e) => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const classList = cursor.classList;
      const isResize = el?.closest('#custom-resize-handle');
      const isText = el?.closest('input[type="text"], input[type="email"], textarea');
      const isLink = el?.closest('a, button');

      classList.toggle('resize-hover', isResize);
      classList.toggle('text-hover', isText && !isResize);
      classList.toggle('link-hover', isLink && !isText && !isResize);
    };
    
    window.addEventListener('touchstart', handleTouch, { once: true, passive: true });
    if (!isTouch) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    
    return () => {
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
      <div ref={cursorRef} id="fancy-cursor">
        <div className="fancy-cursor-dot" />
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 19L19 5M5 19L9 19M5 19L5 15M19 5L15 5M19 5L19 9" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
  );
});

export default FancyCursor;

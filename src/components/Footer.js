// src/components/Footer.js
import React, { memo } from 'react';

const Footer = memo(({ onImpressumClick }) => (
  <footer className="bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-green-900/30 relative z-10">
    <div className="container mx-auto py-6 px-6 text-center text-slate-600 dark:text-slate-500">
        <p>&copy; {new Date().getFullYear()} Melvin Ragusa | Ragusa IT-Consulting. Alle Rechte vorbehalten.</p>
        <button onClick={onImpressumClick} className="mt-2 text-sm hover:text-green-600 dark:hover:text-green-400 underline transition-colors duration-300 cursor-none">
            Impressum
        </button>
    </div>
  </footer>
));

export default Footer;

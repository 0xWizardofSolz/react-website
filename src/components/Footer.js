// src/components/Footer.js
import React, { memo } from 'react';
// Make sure to install react-icons: npm install react-icons --legacy-peer-deps
import { FaGithub } from 'react-icons/fa';

const Footer = memo(({ onImpressumClick }) => {
    // Replace with your actual GitHub profile URL
    const githubUrl = 'https://github.com/ragusa-it';

    return (
        <footer className="bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-green-900/30 relative z-10">
            <div className="container mx-auto py-6 px-6 text-center text-slate-600 dark:text-slate-500">
                <p>&copy; {new Date().getFullYear()} Melvin Ragusa | Ragusa IT-Consulting. Alle Rechte vorbehalten.</p>
                <div className="flex justify-center items-center space-x-6 mt-4">
                    {/* Impressum Button */}
                    <button onClick={onImpressumClick} className="text-sm hover:text-green-600 dark:hover:text-green-400 underline transition-colors duration-300 cursor-none">
                        Impressum
                    </button>

                    {/* GitHub Link */}
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                        className="text-slate-600 dark:text-slate-500 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                    >
                        <FaGithub size={24} />
                    </a>
                </div>
            </div>
        </footer>
    );
});

export default Footer;

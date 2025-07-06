import React, { useState, useEffect } from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const debounce = (func, delay) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), delay);
            };
        };
        
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        const debouncedHandleScroll = debounce(handleScroll, 50);

        window.addEventListener('scroll', debouncedHandleScroll);
        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
        };
    }, []);

    const headerClass = isScrolled
        ? 'shadow-md bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm'
        : 'bg-transparent';
        
    const navLinkClass = "text-slate-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors font-medium";

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${headerClass}`}>
            <div className="container mx-auto flex justify-between items-center p-4 max-w-7xl">
                <a href="#home" className="overflow-hidden">
                    <img
                        src="/logo.svg"
                        alt="Ragusa IT-Consulting Logo"
                        className="h-10 w-auto transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-3"
                        onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/160x40/1e293b/FFFFFF?text=RagusaIT';
                            e.currentTarget.onerror = null;
                        }}
                    />
                </a>

                <nav className="hidden md:flex items-center space-x-6">
                    <a href="#about" className={navLinkClass}>Über Mich</a>
                    <a href="#services" className={navLinkClass}>Leistungen</a>
                    <a href="#portfolio" className={navLinkClass}>Portfolio</a>
                    <a href="#testimonials" className={navLinkClass}>Referenzen</a>
                    <a href="#contact" className={navLinkClass}>Kontakt</a>
                </nav>

                <div className="flex items-center">
                    <ThemeToggleButton />
                    <div className="md:hidden ml-4">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-full text-slate-400 dark:text-slate-500 hover:text-green-500 dark:hover:text-green-400"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className="bg-slate-100/95 dark:bg-slate-800/95">
                    <nav className="flex flex-col items-center space-y-4 py-4">
                        <a href="#about" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>Über Mich</a>
                        <a href="#services" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>Leistungen</a>
                        <a href="#portfolio" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>Portfolio</a>
                        <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>Referenzen</a>
                        <a href="#contact" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>Kontakt</a>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
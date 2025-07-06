import React, { useState, useEffect } from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const headerClass = isScrolled
        ? 'sticky top-0 z-50 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
        : 'bg-white dark:bg-gray-900';

    return (
        <header className={`transition-all duration-300 ${headerClass}`}>
            <div className="container mx-auto flex justify-between items-center p-4 max-w-7xl">
                {/* Logo */}
                <a href="#home" className="overflow-hidden">
                    <img
                        src="/logo.svg"
                        alt="Ragusa IT-Consulting Logo"
                        className="h-10 w-auto transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-3"
                        onError={(e) => {
                            // Fallback, falls das Logo nicht geladen werden kann
                            e.currentTarget.src = 'https://placehold.co/160x40/111827/FFFFFF?text=RagusaIT-Consulting';
                            e.currentTarget.onerror = null;
                        }}
                    />
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Über Mich</a>
                    <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Leistungen</a>
                    <a href="#portfolio" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Portfolio</a>
                    <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Referenzen</a>
                    <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Kontakt</a>
                </nav>

                <div className="flex items-center">
                    <ThemeToggleButton />
                    {/* Hamburger Menu Button */}
                    <div className="md:hidden ml-4">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <nav className="flex flex-col items-center space-y-4 py-4">
                    <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Über Mich</a>
                    <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Leistungen</a>
                    <a href="#portfolio" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Portfolio</a>
                    <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Referenzen</a>
                    <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Kontakt</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
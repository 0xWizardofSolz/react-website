// src/components/Header.js
import React, { memo } from 'react';
import ThemeToggleButton from './ThemeToggleButton';

const Header = memo(() => (
  <header className="bg-slate-50/80 dark:bg-slate-950/70 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-200 dark:border-green-900/30">
    <div className="container mx-auto flex items-center justify-between p-4 text-slate-900 dark:text-white">
      <a href="#home" className="text-2xl font-bold tracking-wider cursor-none">
        ragusa-it<span className="text-green-500 dark:text-green-400">.dev</span>
      </a>
      <nav className="hidden md:flex items-center space-x-6">
        <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300 cursor-none">Über mich</a>
        <a href="#services" className="text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300 cursor-none">Leistungen</a>
        <a href="#portfolio" className="text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300 cursor-none">Portfolio</a>
        <a href="#contact" className="bg-green-500 hover:bg-green-600 text-slate-900 font-bold py-2 px-4 rounded-md text-sm transition-all duration-300 cursor-none">Kontakt</a>
        <ThemeToggleButton />
      </nav>
    </div>
  </header>
));

export default Header;

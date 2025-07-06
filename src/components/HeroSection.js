// src/components/HeroSection.js
import React, { memo } from 'react';
import { Section } from './Reusable';

const HeroSection = memo(() => (
  <Section id="home" className="py-12 md:py-24">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-xl md:text-2xl text-green-500 dark:text-green-400 font-mono mb-2">Melvin Ragusa | Inhaber & Webentwickler</h2>
      <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 dark:text-slate-100 mb-4 leading-tight" style={{textShadow: '0 0 15px rgba(74, 222, 128, 0.4), 0 0 5px rgba(255, 255, 255, 0.3)'}}>
        React & Shopify Entwicklung, Automatisierung
      </h1>
      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
       Ihr Experte für Maßgeschneiderte Web-Applikationen und performante Online-Shops
      </p>
      <div className="text-center">
        <a href="#services" className="bg-green-500 hover:bg-green-600 text-slate-900 font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 duration-300 inline-block shadow-lg shadow-green-500/20 cursor-none">
          Meine Leistungen entdecken
        </a>
      </div>
    </div>
  </Section>
));

export default HeroSection;

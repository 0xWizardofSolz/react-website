// src/components/AboutSection.js
import React, { memo } from 'react';
import { Section, SectionCard } from './Reusable';
import profilePicture from '../images/profile-picture.webp';

const AboutSection = memo(() => (
    <Section id="about">
        <SectionCard className="max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/3 text-center md:text-left">
                    <div className="w-48 h-48 mx-auto md:mx-0 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-green-500 p-2 mb-4">
                        <img src={profilePicture} alt="Melvin Ragusa" className="rounded-full w-full h-full object-cover" loading="lazy" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Melvin Ragusa</h3>
                    <p className="text-green-600 dark:text-green-400 font-mono">Webentwickler</p>
                </div>
                <div className="md:w-2/3">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Ihr Webentwickler in Dortmund: Experte für React & Shopify</h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Mein Name ist Melvin Ragusa. Als freiberuflicher Entwickler aus Dortmund realisiere ich performante Web-Applikationen mit React und umsatzstarke Shopify Stores. Mein Ziel ist es, Ihre Marke perfekt zu präsentieren, Prozesse zu optimieren und Ihren digitalen Erfolg nachhaltig zu steigern.
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                    
                    </p>
                </div>
            </div>
        </SectionCard>
    </Section>
));

export default AboutSection;

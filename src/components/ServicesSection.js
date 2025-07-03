// src/components/ServicesSection.js
import React, { memo } from "react";
import { Briefcase, Code, Zap } from "lucide-react";
import { Section, SectionCard } from './Reusable';

const servicesData = [
    { icon: Code, title: "Webentwicklung", description: "Maßgeschneiderte, performante Websites und Applikationen, die auf Ihre Bedürfnisse zugeschnitten sind – von Landingpages bis zu komplexen Systemen." },
    { icon: Briefcase, title: "IT-Beratung", description: "Fachkundige Beratung für Shopify-Store-Setups, Systemintegrationen und digitale Strategien zur Optimierung Ihrer Online-Präsenz." },
    { icon: Zap, title: "Automatisierung", description: "Leistungsstarke Automatisierung von Workflows und Geschäftsprozessen zur Steigerung der Produktivität und Reduzierung des manuellen Aufwands." }
];

const ServicesSection = memo(() => (
    <Section id="services">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">Meine Leistungen</h2>
        <div className="grid md:grid-cols-3 gap-8">
            {servicesData.map((service) => {
                const Icon = service.icon;
                return (
                    <SectionCard key={service.title} className="max-w-5xl !p-8 flex flex-col items-center text-center hover:shadow-green-500/10 hover:-translate-y-2 transition-all duration-300">
                        <Icon size={40} className="text-green-500 dark:text-green-400 mb-4" />
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400">{service.description}</p>
                    </SectionCard>
                );
            })}
        </div>
    </Section>
));

export default ServicesSection;

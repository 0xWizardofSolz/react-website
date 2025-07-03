// src/components/TestimonialsSection.js
import React, { memo } from 'react';
import { Section, SectionCard } from './Reusable';

const testimonialsData = [
    { quote: "Melvin hat unsere kreative Vision perfekt in eine moderne, reaktive Website übersetzt. Die Zusammenarbeit war unkompliziert und das Ergebnis spricht für sich.", name: "Tarek B.", company: "Studio 31 Media" },
    { quote: "Melvin hat unsere Vision für einen Shop mit Produkt-Personalisierer dank herausragendem UI/UX und technischer Expertise perfekt umgesetzt.", name: "Gideon G.", company: "Kistenblende" }
];

const TestimonialsSection = memo(() => (
    <Section id="testimonials">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">Was meine Kunden sagen</h2>
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
            {testimonialsData.map(t => (
                <SectionCard key={t.name} className="max-w-3xl !p-6 hover:shadow-green-500/10 hover:-translate-y-2 transition-all duration-300">
                    <p className="text-slate-600 dark:text-slate-300 italic">"{t.quote}"</p>
                    <p className="text-right mt-4 font-bold text-green-600 dark:text-green-400">- {t.name}, <span className="text-slate-500 dark:text-slate-500 font-normal">{t.company}</span></p>
                </SectionCard>
            ))}
        </div>
    </Section>
));

export default TestimonialsSection;

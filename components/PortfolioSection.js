// --- Portfolio Section ---
import kistenblendeImg from "../src/images/Kistenblende.png";
import studio31Img from "../src/images/Studio31.png";
import automationImg from "../src/images/Automation.png";
import React, {memo} from "react";

const projectsData = [
    { title: "Kistenblende Onlineshop", description: "Entwicklung eines Shopify-Stores mit Fokus auf klares Design, Produkt-Individualisierung und eine optimale User Experience.", imgSrc: kistenblendeImg, tags: ["Shopify", "Webentwicklung"], link: "https://www.kistenblende.de/" },
    { title: "Digitale Präsenz für ein Kreativstudio", description: "Entwicklung der Website für ein multidisziplinäres Kreativstudio, um die Kernbereiche Sound, Visuals, Web3 und Marketing überzeugend darzustellen.", imgSrc: studio31Img, tags: ["React", "Webentwicklung"], link: "https://studio31.xyz/" },
    { title: "Smart Automation für personalisierte Produkte", description: "Für Kistenblende habe ich eine automatisierte Lösung integriert, die personalisierte Vorschaubilder direkt aus dem Customizer generiert, in Mails und Bestellungen einbindet und die Produktionsdaten im Backend bereitstellt.", imgSrc: automationImg, tags: ["Automatisierung", "API"] }
];

const PortfolioSection = memo(() => (
    <Section id="portfolio">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">Meine Arbeiten</h2>
        <div className="grid md:grid-cols-3 gap-8">
            {projectsData.map(p => (
                <div key={p.title} className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-green-900/30 rounded-lg overflow-hidden group shadow-lg hover:shadow-green-500/10 hover:-translate-y-2 transition-all duration-300">
                    <div className="overflow-hidden">
                        <a href={p.link} target="_blank" rel="noopener noreferrer" aria-label={`Link zu ${p.title}`} className="cursor-none">
                            <img src={p.imgSrc} alt={p.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-none" loading="lazy" />
                        </a>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{p.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{p.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {p.tags.map(tag => <span key={tag} className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-xs font-mono px-2 py-1 rounded">{tag}</span>)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </Section>
));

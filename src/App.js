import React, { useState, useEffect, useRef, memo, useCallback, createContext, useContext } from 'react';
import { Briefcase, Zap, Code, X, LoaderCircle, Sun, Moon } from 'lucide-react';

// Import images from the src directory for Webpack optimization
import profilePicture from './images/profile-picture.png';
import kistenblendeImg from './images/Kistenblende.png';
import studio31Img from './images/Studio31.png';
import automationImg from './images/Automation.png';

// Create separate files for major components
import { lazy, Suspense } from 'react';

const NetworkBackground = lazy(() => import('./components/NetworkBackground'));
const AboutSection = lazy(() => import('./components/ContactSection'));
const PortfolioSection = lazy(() => import('./components/ContactSection'));
const ServicesSection = lazy(() => import('./components/ContactSection'));
const TestimonialsSection = lazy(() => import('./components/ContactSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));

// --- Theme Context ---
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// --- Reusable Section Component ---
const Section = ({ children, id, className = '' }) => (
  <section id={id} className={`py-20 scroll-mt-20 ${className}`}>
    {children}
  </section>
);

const SectionCard = ({ children, className = '' }) => (
    <div className={`bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-green-900/30 rounded-lg shadow-2xl shadow-slate-300/20 dark:shadow-green-900/10 p-8 mx-auto ${className}`}>
        {children}
    </div>
);

// --- Fancy Cursor Component ---
const FancyCursor = memo(() => {
  const cursorRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    const handleTouch = () => { setIsTouch(true); window.removeEventListener('mousemove', handleMouseMove); };
    const handleMouseMove = (e) => {
      const cursor = cursorRef.current;
      if (!cursor) return;
      requestAnimationFrame(() => { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; });
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const classList = cursor.classList;
      const isResize = el?.closest('#custom-resize-handle');
      const isText = el?.closest('input[type="text"], input[type="email"], textarea');
      const isLink = el?.closest('a, button');
      classList.toggle('resize-hover', isResize);
      classList.toggle('text-hover', isText && !isResize);
      classList.toggle('link-hover', isLink && !isText && !isResize);
    };
    
    window.addEventListener('touchstart', handleTouch, { once: true, passive: true });
    if (!isTouch) window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => { window.removeEventListener('touchstart', handleTouch); window.removeEventListener('mousemove', handleMouseMove); };
  }, [isTouch]);

  if (isTouch) return null;

  return (
      <div ref={cursorRef} id="fancy-cursor">
        <div className="fancy-cursor-dot" />
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 19L19 5M5 19L9 19M5 19L5 15M19 5L15 5M19 5L19 9" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
  );
});

// --- Theme Toggle Button ---
const ThemeToggleButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  return (
    <button onClick={toggleTheme} className="p-2 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle theme">
      <Sun className="h-5 w-5 hidden dark:block" />
      <Moon className="h-5 w-5 block dark:hidden" />
    </button>
  );
};


// --- Main App Component ---
export default function App() {
  const [impressumVisible, setImpressumVisible] = useState(false);
  const openImpressum = useCallback(() => setImpressumVisible(true), []);
  const closeImpressum = useCallback(() => setImpressumVisible(false), []);

  useEffect(() => {
    if (window.location.hash === '') document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <ThemeProvider>
        <div className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed tracking-wide bg-slate-50 dark:bg-slate-950">
            <FancyCursor />
            <NetworkBackground />
            <div className="relative z-10">
                <Header />
                <main className="container mx-auto px-6">
                    <HeroSection />
                    <AboutSection />
                    <ServicesSection />
                    <PortfolioSection />
                    <TestimonialsSection />
                    <ContactSection />
                </main>
                <Footer onImpressumClick={openImpressum} />
            </div>
            {impressumVisible && <ImpressumModal onClose={closeImpressum} />}
        </div>
    </ThemeProvider>
  );
}

// --- Header Component ---
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

// --- Hero Section Component ---
const HeroSection = memo(() => (
  <Section id="home" className="py-12 md:py-24">
    <SectionCard className="max-w-3xl">
      <h2 className="text-xl md:text-2xl text-green-600 dark:text-green-300 font-mono mb-2 text-center">Melvin Ragusa | Inhaber & IT-Consultant</h2>
      <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 dark:text-slate-100 mb-4 leading-tight text-center" style={{textShadow: '0 0 15px rgba(74, 222, 128, 0.4), 0 0 5px rgba(255, 255, 255, 0.3)'}}>
        Webentwicklung • IT-Beratung • Automatisierung
      </h1>
      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8 text-center">
        Ich entwickle leistungsstarke Websites, biete fachkundige IT-Beratung und erstelle wirkungsvolle Automatisierungen, um Ihre Geschäftsprozesse zu optimieren.
      </p>
      <div className="text-center">
        <a href="#portfolio" className="bg-green-500 hover:bg-green-600 text-slate-900 font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 duration-300 inline-block shadow-lg shadow-green-500/20 cursor-none">
          Meine Arbeiten
        </a>
      </div>
    </SectionCard>
  </Section>
));

// --- Footer Component ---
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

// --- Impressum Modal Component ---
const ImpressumModal = memo(({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onClose}>
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-full overflow-y-auto p-8 relative border border-slate-300 dark:border-green-700" onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} className="absolute top-4 right-4 text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-none" aria-label="Impressum schließen">
        <X size={24} />
      </button>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Impressum</h3>
      <div className="text-slate-700 dark:text-slate-300 space-y-4 font-mono text-sm">
        <p><strong>Ragusa IT-Consulting</strong><br />
        Melvin Ragusa<br />
        Provinzialstraße 177 <br />
        44388 Dortmund<br />
        Deutschland</p>
        <p><strong>Inhaber:</strong><br />Melvin Ragusa</p>
        <p><strong>Kontakt:</strong><br />Telefon: +49 172 7879117<br />E-Mail: kontakt@ragusa-it.dev</p>
        <p><strong>Verantwortlich für den Inhalt (gemäß § 55 Abs. 2 RStV):</strong><br />Melvin Ragusa<br />(Anschrift wie oben)</p>
      </div>
    </div>
  </div>
));
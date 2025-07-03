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


// --- Network Node Background Component ---
const NetworkBackground = memo(() => {
    const canvasRef = useRef(null);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let particlesArray = [];

        const colors = {
            light: { background: 'hsl(210 40% 98%)', particle: 'hsl(210 4% 45%)', line: 'hsl(210 4% 65%)' },
            dark: { background: 'hsl(222.2 84% 4.9%)', particle: 'hsl(215 25% 27%)', line: 'hsl(215 25% 35%)' }
        };

        const currentColors = colors[theme] || colors.dark;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color;
            }
            draw() {
                ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = this.color; ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                this.x += this.directionX; this.y += this.directionY; this.draw();
            }
        }

        const init = () => {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 12000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 1.2) + 0.5;
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                let directionX = (Math.random() * 0.3) - 0.15;
                let directionY = (Math.random() * 0.3) - 0.15;
                particlesArray.push(new Particle(x, y, directionX, directionY, size, currentColors.particle));
            }
        };

        const connect = () => {
            let opacityValue = 1;
            const connectDistance = (Math.min(canvas.width, canvas.height) / 7) ** 2;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
                    if (distance < connectDistance) {
                        opacityValue = 1 - (distance / 20000);
                        const rgbLine = currentColors.line.match(/\d+/g);
                        if (rgbLine && rgbLine.length >= 3) {
                           ctx.strokeStyle = `rgba(${rgbLine[0]}, ${rgbLine[1]}, ${rgbLine[2]}, ${opacityValue})`;
                        } else {
                           ctx.strokeStyle = `rgba(100, 116, 139, ${opacityValue})`;
                        }
                        ctx.lineWidth = 0.5;
                        ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke();
                    }
                }
            }
        };
        
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            ctx.fillStyle = currentColors.background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(p => p.update());
            connect();
        };
        
        const debounce = (func, delay) => {
            let timeout;
            return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, args), delay); };
        };

        const debouncedResize = debounce(resizeCanvas, 250);
        resizeCanvas();
        window.addEventListener('resize', debouncedResize);
        animate();

        return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('resize', debouncedResize); };
    }, [theme]);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
});


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

// --- About Section ---
const AboutSection = memo(() => (
  <Section id="about">
    <SectionCard className="max-w-5xl">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/3 text-center md:text-left">
          <div className="w-48 h-48 mx-auto md:mx-0 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-green-500 p-2 mb-4">
            <img src={profilePicture} alt="Melvin Ragusa" className="rounded-full w-full h-full object-cover" loading="lazy" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Melvin Ragusa</h3>
          <p className="text-green-600 dark:text-green-400 font-mono">IT-Consultant</p>
        </div>
        <div className="md:w-2/3">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Über mich</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Als IT-Berater und Webentwickler mit Schwerpunkt auf Shopify- & React-Entwicklung sowie Automatisierung, helfe ich Unternehmen, sich in der digitalen Landschaft zu behaupten.
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            Mein Ansatz ist kollaborativ und klientorientiert. Ich nehme mir die Zeit, Ihre individuellen Herausforderungen und Ziele zu verstehen, um Lösungen zu entwickeln, die nicht nur technisch fundiert, sondern auch perfekt mit Ihrer Geschäftsstrategie übereinstimmen.
          </p>
        </div>
      </div>
    </SectionCard>
  </Section>
));

// --- Services Section ---
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

// --- Portfolio Section ---
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

// --- Testimonials Section ---
const testimonialsData = [
    { quote: "Für mein Projektstudio brauchte ich unbedingt eine Website mit einem einfachen, aber reaktiven Design und einem soliden Backend mit Zukunftspotenzial. Absolut empfehlenswert!", name: "Tarek B.", company: "Studio 31 Media" },
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

// --- Contact Section Component ---
const ContactSection = memo(() => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: '' });
  const textareaRef = useRef(null);
  const isResizing = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (errors[name]) {
        setErrors(prev => ({...prev, [name]: null}));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name ist erforderlich.";
    if (!formData.email.trim()) {
        newErrors.email = "E-Mail ist erforderlich.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }
    if (!formData.message.trim()) newErrors.message = "Nachricht ist erforderlich.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleResizeMouseMove = useCallback((e) => { if (isResizing.current) { const newHeight = startHeight.current + e.clientY - startY.current; textareaRef.current.style.height = `${Math.max(120, newHeight)}px`; } }, []);
  const handleResizeMouseUp = useCallback(() => { isResizing.current = false; window.removeEventListener('mousemove', handleResizeMouseMove); window.removeEventListener('mouseup', handleResizeMouseUp); }, [handleResizeMouseMove]);
  const handleResizeMouseDown = useCallback((e) => { isResizing.current = true; startY.current = e.clientY; startHeight.current = textareaRef.current.clientHeight; window.addEventListener('mousemove', handleResizeMouseMove); window.addEventListener('mouseup', handleResizeMouseUp); }, [handleResizeMouseMove, handleResizeMouseUp]);

  const encode = (data) => Object.keys(data).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setFormStatus({ submitting: true, success: false, error: '' });

    try {
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode({ 'form-name': 'contact', ...formData }) });
      if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
      setFormStatus({ submitting: false, success: true, error: '' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFormStatus({ submitting: false, success: false, error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' });
      console.error('Form submission error:', error);
    }
  }, [formData, validateForm]);

  return (
    <Section id="contact">
      <SectionCard className="max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-8">Kontakt</h2>
        {formStatus.success ? (
          <div className="text-center p-8 bg-green-100 dark:bg-green-900/50 rounded-lg">
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-300">Vielen Dank!</h3>
            <p className="text-green-700 dark:text-green-200 mt-2">Ihre Nachricht wurde erfolgreich gesendet. Ich werde mich in Kürze bei Ihnen melden.</p>
          </div>
        ) : (
          <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden"><label>Don't fill this out if you're human: <input name="bot-field" /></label></p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <label htmlFor="name" className="block text-slate-500 dark:text-slate-400 mb-2 font-mono text-sm">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={`w-full bg-slate-100 dark:bg-slate-900 border ${errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-md py-2 px-4 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500`} required autoComplete="name" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-slate-500 dark:text-slate-400 mb-2 font-mono text-sm">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full bg-slate-100 dark:bg-slate-900 border ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-md py-2 px-4 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500`} required autoComplete="email" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            
            <div className="mb-4 relative">
              <label htmlFor="message" className="block text-slate-500 dark:text-slate-400 mb-2 font-mono text-sm">Nachricht</label>
              <textarea ref={textareaRef} id="message" name="message" value={formData.message} onChange={handleInputChange} className={`w-full bg-slate-100 dark:bg-slate-900 border ${errors.message ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-md py-2 px-4 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none`} style={{height: '120px'}} required></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              <div id="custom-resize-handle" onMouseDown={handleResizeMouseDown} className="absolute cursor-none p-1" style={{ bottom: '2px', right: '-1px' }}><svg width="10" height="10" viewBox="0 0 10 10" className="stroke-current text-green-500/60 dark:text-green-400/60" style={{ filter: 'drop-shadow(0 0 2px #4ade80)' }}><line x1="1" y1="9" x2="9" y2="1" strokeWidth="1.5" /><line x1="5" y1="9" x2="9" y2="5" strokeWidth="1.5" /></svg></div>
            </div>

            <div className="text-center mt-6">
              <button type="submit" disabled={formStatus.submitting} className="bg-green-500 hover:bg-green-600 text-slate-900 font-bold py-3 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/20 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full md:w-auto mx-auto cursor-none">
                {formStatus.submitting && <LoaderCircle className="animate-spin" size={20} />}
                {formStatus.submitting ? 'Wird gesendet...' : 'Nachricht senden'}
              </button>
            </div>
            {formStatus.error && <p className="text-red-500 dark:text-red-400 text-center mt-4">{formStatus.error}</p>}
          </form>
        )}
      </SectionCard>
    </Section>
  );
});

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
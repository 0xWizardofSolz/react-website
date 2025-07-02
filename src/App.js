import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Zap, Code, X, LoaderCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false,
});

// --- Partikel-Hintergrund Komponente (Korrigiert) ---
const ParticleBackground = () => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let particlesArray = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init(); // Partikel neu initialisieren bei Größenänderung
        };

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        const init = () => {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * .4) - .2;
                let directionY = (Math.random() * .4) - .2;
                let color = '#4ade80'; // tailwind green-400

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        };

        const connect = () => {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                        ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(74, 222, 128, ${opacityValue})`; // green-400 with opacity
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        };
        
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            
            // KORREKTUR: Hintergrund direkt auf die Canvas zeichnen
            ctx.fillStyle = '#0f172a'; // Hex-Code für slate-900
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        };

        resizeCanvas(); // Einmal initial aufrufen
        window.addEventListener('resize', resizeCanvas);
        
        animate();

        // Cleanup
        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };

    }, []);

    // KORREKTUR: bg-slate-900 entfernt, da es jetzt in JS gezeichnet wird
    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
};


// --- Main App Component ---
export default function App() {
  const [impressumVisible, setImpressumVisible] = useState(false);

  return (
    // Der Haupt-Wrapper hat keinen Hintergrund mehr, da die Canvas das übernimmt
    <div className="text-slate-300 font-sans leading-relaxed tracking-wide bg-slate-900">
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={1.7}
        outerAlpha={0}
        outerStyle={{
          border: '3px solid #fff'
        }}
        clickables={[
            'a',
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            'label[for]',
            'select',
            'textarea',
            'button',
            '.link'
          ]}
      />
      <ParticleBackground />
      {/* z-10 sorgt dafür, dass der Inhalt über der Animation liegt */}
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-6 py-12 md:py-20">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <PortfolioSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer onImpressumClick={() => setImpressumVisible(true)} />
      </div>
      {impressumVisible && <ImpressumModal onClose={() => setImpressumVisible(false)} />}
    </div>
  );
}

// --- Header Component (Updated with Logo) ---
const Header = () => (
  <header className="bg-slate-900/70 backdrop-blur-sm sticky top-0 z-40 border-b border-green-900/30">
    <div className="container mx-auto flex items-center justify-between p-4 text-white">
      <a href="#home" className="text-2xl font-bold tracking-wider">
        ragusa-it<span className="text-green-400">.dev</span>
      </a>
      <nav className="hidden md:flex items-center space-x-6">
        <a href="#about" className="hover:text-green-400 transition-colors duration-300">Über mich</a>
        <a href="#services" className="hover:text-green-400 transition-colors duration-300">Leistungen</a>
        <a href="#portfolio" className="hover:text-green-400 transition-colors duration-300">Portfolio</a>
        <a href="#contact" className="bg-green-500 hover:bg-green-600 text-slate-900 font-bold py-2 px-4 rounded-md text-sm transition-all duration-300">Kontakt</a>
      </nav>
    </div>
  </header>
);

// --- Hero Section Component ---
const HeroSection = () => (
  <section id="home" className="text-center py-20 md:py-32">
     <h2 className="text-xl md:text-2xl text-green-300 font-mono mb-2">Melvin Ragusa | Inhaber & IT-Consultant</h2>
    <h1 className="text-4xl md:text-7xl font-extrabold text-slate-100 mb-4 leading-tight" style={{textShadow: '0 0 15px rgba(74, 222, 128, 0.4), 0 0 5px rgba(255, 255, 255, 0.3)'}}>
      Webentwicklung • IT-Beratung • Automatisierung
    </h1>
    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
      Ich entwickle leistungsstarke Websites, biete fachkundige IT-Beratung und erstelle wirkungsvolle Automatisierungen, um Ihre Geschäftsprozesse zu optimieren.
    </p>
    <a
      href="#portfolio"
      className="bg-green-500 hover:bg-green-600 text-slate-900 font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 duration-300 inline-block shadow-lg shadow-green-500/20"
    >
      Meine Arbeiten
    </a>
  </section>
);

// --- Über mich ---
const AboutSection = () => (
    <section id="about" className="py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/3 text-center md:text-left">
             <div className="w-48 h-48 mx-auto md:mx-0 rounded-full bg-slate-800 border-2 border-green-500 p-2 mb-4">
                 <img src="/images/profile-picture.png" alt="Melvin Ragusa" className="rounded-full w-full h-full object-cover" />
             </div>
             <h3 className="text-2xl font-bold text-white">Melvin Ragusa</h3>
             <p className="text-green-400 font-mono">IT-Consultant</p>
        </div>
        <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Über mich</h2>
            <p className="text-slate-300 mb-4">
                Als IT-Berater und Webentwickler mit Schwerpunkt auf Shopify- & React-Entwicklung sowie Automatisierung, helfe ich Unternehmen, sich in der digitalen Landschaft zu behaupten.
            </p>
            <p className="text-slate-300">
                Mein Ansatz ist kollaborativ und klientorientiert. Ich nehme mir die Zeit, Ihre individuellen Herausforderungen und Ziele zu verstehen, um Lösungen zu entwickeln, die nicht nur technisch fundiert, sondern auch perfekt mit Ihrer Geschäftsstrategie übereinstimmen.
            </p>
        </div>
    </section>
);


// --- Meine Leistungen ---
const ServicesSection = () => {
    const services = [
        { icon: <Code size={40} className="text-green-400 mb-4" />, title: "Webentwicklung", description: "Maßgeschneiderte, performante Websites und Applikationen, die auf Ihre Bedürfnisse zugeschnitten sind – von Landingpages bis zu komplexen Systemen." },
        { icon: <Briefcase size={40} className="text-green-400 mb-4" />, title: "IT-Beratung", description: "Fachkundige Beratung für Shopify-Store-Setups, Systemintegrationen und digitale Strategien zur Optimierung Ihrer Online-Präsenz." },
        { icon: <Zap size={40} className="text-green-400 mb-4" />, title: "Automatisierung", description: "Leistungsstarke Automatisierung von Workflows und Geschäftsprozessen zur Steigerung der Produktivität und Reduzierung des manuellen Aufwands." }
    ];

    return (
        <section id="services" className="py-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Meine Leistungen</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-green-900/30 p-8 rounded-lg shadow-lg hover:shadow-green-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                        {service.icon}
                        <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                        <p className="text-slate-400">{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// --- Portfolio Section (Updated with links) ---
const PortfolioSection = () => {
  const projects = [
      {
          title: "Kistenblende Onlineshop",
          description: "Entwicklung eines Shopify-Stores mit Fokus auf klares Design, Produkt-Individualisierung und eine optimale User Experience.",
          imgSrc: "/images/Kistenblende.png",
          tags: ["Shopify", "Webentwicklung"],
          link: "https://www.kistenblende.de/" 
      },
      {
          title: "Digitale Präsenz für ein Kreativstudio",
          description: "Entwicklung der Website für ein multidisziplinäres Kreativstudio, um die Kernbereiche Sound, Visuals, Web3 und Marketing überzeugend darzustellen.",
          imgSrc: "/images/Studio31.png",
          tags: ["React", "Webentwicklung"],
          link: "https://studio31.xyz/"
      },
      {
          title: "Smart Automation für personalisierte Produkte",
          description: "Für Kistenblende habe ich eine automatisierte Lösung integriert, die personalisierte Vorschaubilder direkt aus dem Customizer generiert, in Mails und Bestellungen einbindet und die Produktionsdaten im Backend bereitstellt.",
          imgSrc: "/images/Automation.png",
          tags: ["Automatisierung", "API"]
      }
  ];

  return (
      <section id="portfolio" className="py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Meine Arbeiten</h2>
          <div className="grid md:grid-cols-3 gap-8">
              {projects.map(p => (
                  <div key={p.title} className="bg-slate-800/50 backdrop-blur-sm border border-green-900/30 rounded-lg overflow-hidden group">
                      
                      <div className="overflow-hidden">
                          {p.link ? (
                              <a href={p.link} target="_blank" rel="noopener noreferrer" aria-label={`Link zu ${p.title}`}>
                                  <img 
                                      src={p.imgSrc} 
                                      alt={p.title} 
                                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer" 
                                  />
                              </a>
                          ) : (
                              <img 
                                  src={p.imgSrc} 
                                  alt={p.title} 
                                  className="w-full h-48 object-cover" 
                              />
                          )}
                      </div>

                      <div className="p-6">
                          <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                          <p className="text-slate-400 text-sm mb-4">{p.description}</p>
                          <div className="flex flex-wrap gap-2">
                              {p.tags.map(tag => <span key={tag} className="bg-green-900/50 text-green-300 text-xs font-mono px-2 py-1 rounded">{tag}</span>)}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </section>
  );
};

// --- Testimonials Section (New) ---
const TestimonialsSection = () => {
    const testimonials = [
        { quote: "Für mein Projektstudio brauchte ich unbedingt eine Website mit einem einfachen, aber reaktiven Design und einem soliden Backend mit Zukunftspotenzial. Absolut empfehlenswert!", name: "Tarek B.", company: "Studio 31 Media" },
        { quote: "Melvin hat unsere Vision für einen Shop mit Produkt-Personalisierer dank herausragendem UI/UX und technischer Expertise perfekt umgesetzt.", name: "Gideon G.", company: "Kistenblende" }
    ];

    return (
        <section id="testimonials" className="py-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Was meine Kunden sagen</h2>
            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
                {testimonials.map(t => (
                     <div key={t.name} className="bg-slate-800/50 backdrop-blur-sm border border-green-900/30 p-6 rounded-lg">
                        <p className="text-slate-300 italic">"{t.quote}"</p>
                        <p className="text-right mt-4 font-bold text-green-400">- {t.name}, <span className="text-slate-500 font-normal">{t.company}</span></p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// --- Contact Section Component (Corrected for Netlify) ---
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: false });

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...formData }),
    })
      .then(() => {
        setFormStatus({ submitting: false, success: true, error: false });
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        setFormStatus({ submitting: false, success: false, error: true });
      });
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">Kontakt</h2>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-green-900/30 p-8 rounded-lg shadow-2xl shadow-green-900/10">
          {formStatus.success ? (
            <div className="text-center p-8 bg-green-900/50 rounded-lg">
              <h3 className="text-2xl font-bold text-green-300">Vielen Dank!</h3>
              <p className="text-green-200 mt-2">Ihre Nachricht wurde erfolgreich gesendet. Ich werde mich in Kürze bei Ihnen melden.</p>
            </div>
          ) : (
            <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don’t fill this out if you’re human: <input name="bot-field" />
                </label>
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-slate-400 mb-2 font-mono text-sm">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-slate-400 mb-2 font-mono text-sm">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500" required />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-slate-400 mb-2 font-mono text-sm">Nachricht</label>
                <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500" required></textarea>
              </div>
              <div className="text-center">
                <button type="submit" disabled={formStatus.submitting} className="bg-green-500 hover:bg-green-600 text-slate-900 font-bold py-3 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/20 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full md:w-auto mx-auto">
                  {formStatus.submitting && <LoaderCircle className="animate-spin" size={20} />}
                  {formStatus.submitting ? 'Wird gesendet...' : 'Nachricht senden'}
                </button>
              </div>
              {formStatus.error && <p className="text-red-400 text-center mt-4">Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// --- Footer Component ---
const Footer = ({ onImpressumClick }) => (
  <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-green-900/30 relative z-10">
    <div className="container mx-auto py-6 px-6 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} Melvin Ragusa | Ragusa IT-Consulting. Alle Rechte vorbehalten.</p>
        <button onClick={onImpressumClick} className="mt-2 text-sm hover:text-green-400 underline transition-colors duration-300">
            Impressum
        </button>
    </div>
  </footer>
);

// --- Impressum Modal Component ---
const ImpressumModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
    <div className="bg-slate-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-full overflow-y-auto p-8 relative border border-green-700">
      <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
        <X size={24} />
      </button>
      <h3 className="text-2xl font-bold text-white mb-6">Impressum</h3>
      <div className="text-slate-300 space-y-4 font-mono text-sm">
        <p><strong>Ragusa IT-Consulting</strong><br />
        Melvin Ragusa<br />
        Provinzialstraße 177 <br />
        44388 Dortmund<br />
        Deutschland</p>
        
        <p><strong>Inhaber:</strong><br />
        Melvin Ragusa</p>

        <p><strong>Kontakt:</strong><br />
        Telefon: +49 172 7879117<br />
        E-Mail: kontakt@ragusa-it.dev</p>
        <p><strong>Verantwortlich für den Inhalt (gemäß § 55 Abs. 2 RStV):</strong><br />
        Melvin Ragusa<br />
        (Anschrift wie oben)</p>
      </div>
    </div>
  </div>
);
// src/App.js
import React, { useState, useCallback, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import FancyCursor from './components/FancyCursor';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import ImpressumModal from './components/ImpressumModal';
import { LoaderCircle } from 'lucide-react';

// Correctly lazy-load components from their own files
const NetworkBackground = React.lazy(() => import('./components/NetworkBackground'));
const AboutSection = React.lazy(() => import('./components/AboutSection'));
const ServicesSection = React.lazy(() => import('./components/ServicesSection'));
const PortfolioSection = React.lazy(() => import('./components/PortfolioSection'));
const TestimonialsSection = React.lazy(() => import('./components/TestimonialsSection'));
const ContactSection = React.lazy(() => import('./components/ContactSection'));

// Fallback component for Suspense
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <LoaderCircle className="animate-spin text-green-500" size={48} />
  </div>
);

export default function App() {
  const [impressumVisible, setImpressumVisible] = useState(false);
  const openImpressum = useCallback(() => setImpressumVisible(true), []);
  const closeImpressum = useCallback(() => setImpressumVisible(false), []);

  return (
    <ThemeProvider>
      <div className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed tracking-wide bg-slate-50 dark:bg-slate-950">
        <FancyCursor />
        <Suspense fallback={<LoadingFallback />}>
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
        </Suspense>
        {impressumVisible && <ImpressumModal onClose={closeImpressum} />}
      </div>
    </ThemeProvider>
  );
}
import React, { useState, useEffect } from 'react';
import ScrollCanvasBackground from './components/ScrollCanvasBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ArsenalSection from './components/ArsenalSection';
import TerminalSection from './components/TerminalSection';
import ContactSection from './components/ContactSection';
import ProjectsPage from './components/ProjectsPage';
import Footer from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' ou 'projects'
  const [currentSection, setCurrentSection] = useState('hero');
  const [rotation, setRotation] = useState({ degrees: 0, frame: 1, progress: 0 });

  const navigateTo = (page, sectionId = null) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'home' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const scrollTo = (id) => {
    if (id === 'projects') {
      navigateTo('projects');
      return;
    }

    if (currentPage !== 'home') {
      navigateTo('home', id);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentPage !== 'home') return;

    const sections = ['hero', 'arsenal', 'terminal', 'contact'];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setCurrentSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* 1. Fundo Dinâmico em Canvas com Rotação 3D Controlada por Scroll (Apenas na Home) */}
      {currentPage === 'home' && (
        <ScrollCanvasBackground onRotationUpdate={setRotation} />
      )}

      {/* 2. Barra de Navegação Executiva (Apenas na Home) */}
      {currentPage === 'home' && (
        <Navbar 
          currentPage={currentPage}
          currentSection={currentSection} 
          scrollTo={scrollTo}
          onNavigate={navigateTo}
        />
      )}

      {/* 3. Alternância entre Home Page (Scroll) e Galeria Imersiva de Projetos */}
      <main className="relative z-10">
        {currentPage === 'home' ? (
          <div className="space-y-12 sm:space-y-20">
            <HeroSection scrollTo={scrollTo} />
            <ArsenalSection />
            <TerminalSection />
            <ContactSection />
          </div>
        ) : (
          <ProjectsPage 
            onBackToHome={() => navigateTo('home', 'hero')}
            onGoToContact={() => navigateTo('home', 'contact')}
          />
        )}
      </main>

      {/* 4. Rodapé Institucional (Apenas na Home) */}
      {currentPage === 'home' && (
        <Footer scrollToTop={scrollToTop} />
      )}

    </div>
  );
}

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar({ currentPage, currentSection, scrollTo, onNavigate }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-transparent transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 flex items-center justify-between">
        
        {/* Logo Estilo 'Folioblox' */}
        <div 
          onClick={() => onNavigate ? onNavigate('home', 'hero') : scrollTo('hero')} 
          className="cursor-pointer group flex items-center gap-2"
        >
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            Tridon
          </span>
        </div>

        {/* Links de Navegação Texto Limpo */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { id: 'hero', label: 'Home', isPage: false },
            { id: 'arsenal', label: 'Workflow', isPage: false },
            { id: 'projects', label: 'Projects', isPage: true },
            { id: 'terminal', label: 'CLI', isPage: false },
            { id: 'contact', label: 'Contact', isPage: false },
          ].map((item) => {
            const isActive = item.isPage 
              ? currentPage === 'projects'
              : (currentPage === 'home' && currentSection === item.id);

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isPage) {
                    onNavigate('projects');
                  } else {
                    scrollTo(item.id);
                  }
                }}
                className={`text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'text-white border-b-2 border-emerald-400 pb-0.5'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Botão Cápsula Branca */}
        <div>
          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2.5 pl-4 pr-1.5 py-1.5 rounded-full bg-white text-slate-950 text-xs font-bold hover:bg-slate-100 transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-white/10 group"
          >
            <span>Falar Comigo</span>
            <span className="w-6 h-6 rounded-full bg-emerald-500 group-hover:bg-emerald-400 text-slate-950 flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function HeroSection({ scrollTo }) {
  return (
    <section 
      id="hero" 
      className="min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 px-6 sm:px-12 max-w-7xl mx-auto relative z-10 select-none"
    >
      {/* Grade Principal: Título à Esquerda + Texto Descritivo à Direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        
        {/* Lado Esquerdo: Tagline + Título Gigante (Estilo 'Creative Director') */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-emerald-400 text-xs sm:text-sm font-semibold font-mono tracking-wide">
            Olá, eu sou
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.95]">
            Software <br />
            Architect.
          </h1>
        </div>

        {/* Lado Direito: Tagline de Alto Padrão + Descrição do Projeto Real (Estilo 'Great design should feel invisible.') */}
        <div className="lg:col-span-5 space-y-4 lg:pl-6 text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
            Sistemas enterprise &amp; <br className="hidden sm:inline" />
            arquitetura de alta escala.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-sm">
            Desenvolvimento de alta performance com <strong className="text-white font-medium">Spring Boot</strong>, aplicações <strong className="text-white font-medium">Electron nativas</strong> e ecossistemas web <strong className="text-white font-medium">multi-tenant</strong> robustos e seguros.
          </p>
        </div>

      </div>

      {/* Faixa Inferior de Categorias Numeradas (Estilo '#01 Brand Strategy ... #04 Creative Direction') */}
      <div className="pt-16 pb-4 border-t border-slate-800/40 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {[
          { num: '#01', title: 'Spring Boot & Java' },
          { num: '#02', title: 'Electron Desktop' },
          { num: '#03', title: 'React & PWA' },
          { num: '#04', title: 'Multi-Tenant Core' },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5">
            <span className="font-mono font-bold text-xs text-emerald-400">
              {item.num}
            </span>
            <span className="text-xs font-semibold text-white tracking-wide">
              {item.title}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}

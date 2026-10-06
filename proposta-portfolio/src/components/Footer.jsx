import React from 'react';
import { ShieldCheck, ArrowUp } from 'lucide-react';

export default function Footer({ scrollToTop }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-slate-900 bg-slate-950/90 py-12 px-4 sm:px-6 lg:px-8 text-slate-500 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-300 font-semibold font-sans">Tridon José Acácio</span>
          <span className="text-slate-600">&bull;</span>
          <span>Software Architect</span>
        </div>

        <div>
          &copy; {currentYear} Todos os direitos reservados. Engenharia de Sistemas &amp; Arquitetura Cloud.
        </div>

        <button
          onClick={scrollToTop}
          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all flex items-center gap-1.5"
          title="Voltar ao topo"
        >
          <span>Topo</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
}

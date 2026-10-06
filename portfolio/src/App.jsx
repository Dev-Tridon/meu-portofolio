import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  Code, Rocket, Mail, User, Monitor, Smartphone, Database, 
  MapPin, MessageCircle, CheckCircle, Terminal, Server, Layers, 
  TerminalSquare, Eye, ArrowRight, Menu, X, Sparkles, 
  ChevronLeft, ChevronRight, ArrowLeft, Home, FolderKanban, 
  Cpu, MessageSquare, Copy, Check, HelpCircle, Trash2, UserCheck, ShieldCheck,
  Atom, Zap, AppWindow, Braces, Coffee, Leaf, Hexagon, Boxes, Container
} from 'lucide-react';
import { translations, themes } from './data/translations';
import BlurText from './components/BlurText';
import GlowCard from './components/GlowCard';
import SpotlightCard from './components/SpotlightCard';
import InfiniteSpiral from './components/InfiniteSpiral';

// Projetos com campo "image" apontando para a imagem do projeto
const PROJECTS_DATA = [
  { 
    key: 'project1', 
    icon: Monitor, 
    image: '/img/projetos/02_Dashboard_Principal_1920x1080_HD.png', 
    tech: 'Electron JS + Spring Boot', 
    arch: 'Desktop corporate architecture with local database sync.' 
  },
  { 
    key: 'project2', 
    icon: Smartphone, 
    image: '/img/projetos/img2.png', 
    tech: 'React 18 + PWA + WebSockets', 
    arch: 'Offline-first PWA with table scanning.' 
  },
  { 
    key: 'project3', 
    icon: Database, 
    image: '/img/projetos/img4.jpg', 
    tech: 'Spring Boot + Node.js + Redis', 
    arch: 'Multi-tenant isolated database backend design.' 
  }
];

// Tecnologias com ícones temáticos para o giratório
const TECHNOLOGIES = [
  { name: 'React 18',     icon: Atom,       color: 'accent' },
  { name: 'Vite',         icon: Zap,        color: 'text-violet-500' },
  { name: 'Electron',     icon: AppWindow,  color: 'text-cyan-600' },
  { name: 'PWA',          icon: Smartphone, color: 'text-indigo-600' },
  { name: 'JavaScript',   icon: Braces,     color: 'text-yellow-500' },
  { name: 'Java 17+',     icon: Coffee,     color: 'text-orange-600' },
  { name: 'Spring Boot',  icon: Leaf,       color: 'text-emerald-600' },
  { name: 'Node.js',      icon: Hexagon,    color: 'text-green-600' },
  { name: 'Multi-tenant', icon: Boxes,      color: 'accent' },
  { name: 'PostgreSQL',   icon: Database,   color: 'text-blue-600' },
  { name: 'Redis',        icon: Zap,        color: 'text-red-500' },
  { name: 'Docker',       icon: Container,  color: 'text-sky-500' }
];

const NAV_ITEMS = ['home', 'projects', 'expertise', 'terminal', 'contact'];
const THEME_COLORS = { emerald: 'bg-emerald-600', blue: 'bg-blue-600', violet: 'bg-violet-600' };

// Cor hex do tema (para glow/spotlight)
const THEME_HEX = {
  emerald: '#10b981',
  blue:    '#3b82f6',
  violet:  '#8b5cf6'
};

const BG = 'bg-slate-50/80';

const DOCK_ITEMS = [
  { id: 'home',      icon: Home,          labelPt: 'Início',    labelEn: 'Home' },
  { id: 'projects',  icon: FolderKanban,  labelPt: 'Projetos',  labelEn: 'Projects' },
  { id: 'expertise', icon: Cpu,           labelPt: 'Expertise', labelEn: 'Expertise' },
  { id: 'terminal',  icon: TerminalSquare,labelPt: 'Terminal',  labelEn: 'Terminal' },
  { id: 'contact',   icon: MessageSquare, labelPt: 'Contato',   labelEn: 'Contact' }
];

export default function App() {
  const [lang, setLang] = useState('pt');
  const [themeKey, setThemeKey] = useState('emerald');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [imgError, setImgError] = useState(false);

  const [heroIndex, setHeroIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [activeSection, setActiveSection] = useState('home');
  const [hoveredDock, setHoveredDock] = useState(null);

  const [terminalInput, setTerminalInput] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const terminalContainerRef = useRef(null);
  const isInitialMount = useRef(true);
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'Tridon OS v4.5 [Secure Enterprise Core] - Maputo Primary Node' },
    { type: 'system', text: 'Digite "ajuda" ou clique nos comandos rápidos para interagir.' }
  ]);

  const projectsScrollRef = useRef(null);

  const t = translations[lang] || translations.pt;
  const currentTheme = themes[themeKey];
  const glowHex = THEME_HEX[themeKey];

  const heroSlides = useMemo(() => {
    if (t.hero.slides && t.hero.slides.length > 0) return t.hero.slides;
    return [{
      titlePre: t.hero.titlePre || '',
      titleHighlight: t.hero.titleHighlight || '',
      description: t.hero.description || ''
    }];
  }, [t]);

  const totalSlides = heroSlides.length;
  const currentSlide = heroSlides[heroIndex] || heroSlides[0];

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  useEffect(() => {
    setHeroIndex(0);
  }, [lang]);

  const goNext = useCallback(() => {
    setHeroIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setHeroIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goTo = useCallback((idx) => {
    setHeroIndex(idx);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          const scrollPos = window.scrollY + window.innerHeight / 3;
          let current = 'home';
          for (const item of DOCK_ITEMS) {
            const el = document.getElementById(item.id);
            if (el && el.offsetTop <= scrollPos) {
              current = item.id;
            }
          }
          setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (activeModalProject || mobileMenuOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeModalProject, mobileMenuOpen]);

  const scrollToSection = useCallback((id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollCarousel = useCallback((ref, direction) => {
    if (ref.current) {
      const cardWidth = window.innerWidth < 640 ? 280 : 340;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  const executeCommand = useCallback((cmdString) => {
    const raw = cmdString || '';
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear' || cmd === 'cls') {
      setTerminalHistory([{ type: 'system', text: 'Terminal reinicializado.' }]);
      setTerminalInput('');
      return;
    }

    const commands = {
      help: 'Comandos disponíveis:\n- whoami: Perfil arquitetural do engenheiro\n- skills: Stack técnica completa\n- projetos: Portfólio de soluções corporativas\n- contato: Canais diretos de comunicação\n- status: Métricas e saúde do sistema\n- clear: Limpar histórico do terminal',
      ajuda: 'Comandos disponíveis:\n- whoami: Perfil arquitetural do engenheiro\n- skills: Stack técnica completa\n- projetos: Portfólio de soluções corporativas\n- contato: Canais diretos de comunicação\n- status: Métricas e saúde do sistema\n- clear: Limpar histórico do terminal',
      whoami: 'Arquiteto: Tridon José Acácio\nFunção: Software Architect & Tech Lead\nEspecialidade: Sistemas Distribuídos, Desktop Corporativo e Offline-First\nDisponibilidade: Consultorias Enterprise e Novos Desafios\nLocalização: Maputo, Moçambique / Remoto Internacional',
      skills: 'Stack de Engenharia:\n- Backend: Java 17+, Spring Boot, Node.js, REST APIs, WebSockets\n- Desktop: Electron JS, sincronização local SQLite/PostgreSQL\n- Frontend: React 19, Vite, Tailwind CSS, PWA Offline-First\n- Dados & Infra: PostgreSQL, Redis, Docker, Arquitetura Multi-tenant',
      projetos: '1. GSInfo Desktop Suite (Electron + Spring Boot)\n2. Garçom Digital Offline-First (React PWA + WebSockets)\n3. Core Backend Distribuído (Multi-tenant Spring Boot + Redis)',
      projects: '1. GSInfo Desktop Suite (Electron + Spring Boot)\n2. Digital Waiter Offline-First (React PWA + WebSockets)\n3. Distributed Core Backend (Multi-tenant Spring Boot + Redis)',
      contato: 'Email: tridonjose.acacio@gsinfo.co.mz\nWhatsApp: (+258) 84 488 3000\nLocal: Maputo, Moçambique',
      contact: 'Email: tridonjose.acacio@gsinfo.co.mz\nWhatsApp: (+258) 84 488 3000\nLocation: Maputo, Mozambique',
      status: 'Status Operacional: 100% Estável | Nó Ativo: Maputo-Primary-Core | Uptime: 99.99%',
    };

    const output = commands[cmd] || `Comando não reconhecido: "${raw}". Digite "ajuda" para listar os comandos.`;

    setTerminalHistory(prev => [
      ...prev,
      { type: 'user', text: `$ ${raw}` },
      { type: 'output', text: output }
    ]);
    setTerminalInput('');
  }, []);

  const handleTerminalSubmit = useCallback((e) => {
    e.preventDefault();
    executeCommand(terminalInput);
  }, [executeCommand, terminalInput]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyEmail = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('tridonjose.acacio@gsinfo.co.mz');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  }, []);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 4000);
  }, [formData]);

  const navLabels = useMemo(() => ({
    home: t.nav.home,
    projects: t.nav.projects,
    expertise: t.nav.expertise,
    terminal: t.nav.terminal,
    contact: t.nav.contact,
  }), [t]);

  const getDockLabel = (item) => lang === 'en' ? item.labelEn : item.labelPt;

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-slate-900 selection:text-white relative overflow-x-hidden">

      {/* ============================================================
          NAVBAR
      ============================================================ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-2 sm:py-3' 
          : 'bg-white py-3 sm:py-4 lg:py-5'
      }`}>
        <div className="max-w-[1400px] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">

          <button 
            onClick={() => scrollToSection('home')} 
            className="flex items-center gap-2 sm:gap-3 shrink-0"
            aria-label="Ir para o início"
          >
            <div className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full overflow-hidden border-2 ${currentTheme.border} bg-white flex items-center justify-center shadow-xs shrink-0`}>
              {!imgError ? (
                <img 
                  src="/img/perfil/tridonJ_avatar.jpeg" 
                  alt="Tridon José Acácio"
                  className="w-full h-full object-cover border-0 outline-none ring-0 shadow-none"
                  style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className={`font-bold text-xs sm:text-sm ${currentTheme.accentText}`}>T</span>
              )}
            </div>
            <div className="text-left">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 block leading-none">Tridon José</span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-0.5 block">Software Architect</span>
            </div>
          </button>

          <nav 
            className="hidden lg:flex items-center gap-5 xl:gap-8 font-medium text-xs text-slate-600 flex-1 justify-center"
            aria-label="Navegação principal"
          >
            {NAV_ITEMS.map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item)} 
                className="relative py-1 hover:text-slate-900 transition-colors group whitespace-nowrap"
              >
                <span className="flex items-center gap-1.5">
                  {item === 'terminal' && <TerminalSquare className={`w-3.5 h-3.5 ${currentTheme.accentText}`} />}
                  {navLabels[item]}
                </span>
                <span className={`absolute -bottom-0.5 left-0 right-0 h-px border-b border-dashed border-slate-300 opacity-0 group-hover:opacity-100 transition-opacity ${item === 'terminal' ? 'opacity-100' : ''}`} />
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
            <div className="flex bg-slate-100 border border-slate-200 rounded-xl p-0.5 gap-1" role="group" aria-label="Selecionar tema">
              {Object.keys(themes).map((k) => (
                <button
                  key={k}
                  onClick={() => setThemeKey(k)}
                  title={themes[k].name}
                  aria-label={`Tema ${themes[k].name}`}
                  aria-pressed={themeKey === k}
                  className={`w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-lg transition-all ${THEME_COLORS[k]} ${
                    themeKey === k ? 'ring-2 ring-slate-900 scale-105' : 'opacity-40 hover:opacity-100'
                  }`}
                />
              ))}
            </div>

            <div className="flex bg-slate-100 border border-slate-200 rounded-xl p-0.5" role="group" aria-label="Selecionar idioma">
              {['pt', 'en'].map((l) => (
                <button 
                  key={l}
                  onClick={() => setLang(l)} 
                  aria-pressed={lang === l}
                  className={`px-2 py-0.5 text-[10px] lg:text-[11px] font-bold uppercase rounded-lg transition-all ${
                    lang === l ? `${currentTheme.primary} shadow-xs` : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button 
              onClick={() => scrollToSection('contact')} 
              className={`${currentTheme.primary} px-4 xl:px-5 py-2 rounded-full text-[11px] xl:text-xs shadow-xs transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 whitespace-nowrap`}
            >
              <span>{t.nav.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden text-slate-800 p-2 rounded-xl bg-slate-100 border border-slate-200 shrink-0"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 px-4 sm:px-6 py-4 sm:py-5 flex flex-col gap-2 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item)} 
                className="text-left py-2.5 px-2 text-sm font-medium text-slate-700 border-b border-dashed border-slate-200 last:border-0 flex items-center gap-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {item === 'terminal' && <TerminalSquare className={`w-3.5 h-3.5 ${currentTheme.accentText}`} />}
                {navLabels[item]}
              </button>
            ))}

            <div className="flex items-center justify-between pt-3 mt-1 border-t border-slate-200">
              <div className="flex bg-slate-100 border border-slate-200 rounded-xl p-1 gap-1.5">
                {Object.keys(themes).map((k) => (
                  <button
                    key={k}
                    onClick={() => setThemeKey(k)}
                    aria-label={`Tema ${themes[k].name}`}
                    className={`w-5 h-5 rounded-lg transition-all ${THEME_COLORS[k]} ${
                      themeKey === k ? 'ring-2 ring-slate-900 scale-105' : 'opacity-40'
                    }`}
                  />
                ))}
              </div>
              <div className="flex bg-slate-100 border border-slate-200 rounded-xl p-0.5">
                {['pt', 'en'].map((l) => (
                  <button 
                    key={l}
                    onClick={() => setLang(l)} 
                    className={`px-3 py-1 text-xs font-bold uppercase rounded-lg transition-all ${
                      lang === l ? `${currentTheme.primary} shadow-xs` : 'text-slate-600'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => scrollToSection('contact')} 
              className={`${currentTheme.primary} w-full mt-2 py-3 rounded-full text-xs shadow-xs flex items-center justify-center gap-1.5`}
            >
              <span>{t.nav.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </header>

      {/* ============================================================
          HERO
      ============================================================ */}
      <section 
        id="home" 
        className={`pt-24 xs:pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20 ${BG}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-roledescription="carrossel"
        aria-label="Destaques profissionais"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center">

            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="space-y-4 sm:space-y-5 min-h-[280px] sm:min-h-[300px] lg:min-h-[340px] flex flex-col justify-center">

                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border ${currentTheme.border} ${currentTheme.accentText} text-[10px] sm:text-[11px] font-bold shadow-xs self-center lg:self-start`}>
                 
                  <span>{t.hero.badge}</span>
                </div>

                <h1 
                  key={`title-${heroIndex}-${lang}`}
                  className="text-[22px] xs:text-[26px] sm:text-3xl md:text-4xl lg:text-[36px] xl:text-[42px] font-black tracking-tight text-slate-900 leading-[1.15] max-w-[600px] mx-auto lg:mx-0"
                >
                  <span className="block">
                    <BlurText text={currentSlide.titlePre} delay={80} />
                  </span>
                  <span className={`block ${currentTheme.accentText}`}>
                    <BlurText text={currentSlide.titleHighlight} delay={120} />
                  </span>
                </h1>

                <p 
                  key={`desc-${heroIndex}-${lang}`}
                  className="text-sm sm:text-base text-slate-700 max-w-[540px] mx-auto lg:mx-0 font-light leading-relaxed"
                >
                  {currentSlide.description}
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                  <button 
                    onClick={() => scrollToSection('projects')} 
                    className={`${currentTheme.primary} px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-[11px] sm:text-xs font-bold shadow-xs transition-all hover:scale-105 flex items-center gap-1.5 sm:gap-2`}
                  >
                    <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{t.hero.projectsCta}</span>
                  </button>

                  <button 
                    onClick={() => scrollToSection('contact')} 
                    className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 sm:gap-2"
                  >
                    <Mail className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${currentTheme.accentText}`} />
                    <span>{t.hero.contactCta}</span>
                  </button>
                </div>

                {totalSlides > 1 && (
                  <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={goPrev}
                        aria-label="Slide anterior"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-300 shadow-xs hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-all hover:scale-105 active:scale-95"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                      <button 
                        onClick={goNext}
                        aria-label="Próximo slide"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-300 shadow-xs hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-all hover:scale-105 active:scale-95"
                      >
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5" role="tablist" aria-label="Selecionar slide">
                      {heroSlides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => goTo(idx)}
                          role="tab"
                          aria-selected={heroIndex === idx}
                          aria-label={`Ir para o slide ${idx + 1}`}
                          className={`h-1.5 rounded-full transition-all ${
                            heroIndex === idx 
                              ? `${currentTheme.primary} w-6` 
                              : 'bg-slate-400 hover:bg-slate-500 w-1.5'
                          }`}
                        />
                      ))}
                    </div>

                    <span className="text-[10px] font-mono text-slate-500 tabular-nums">
                      {String(heroIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                    </span>
                  </div>
                )}

              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-5 text-[10px] sm:text-[11px]">
                <div>
                  <span className={`font-black text-sm sm:text-base ${currentTheme.accentText}`}>3+</span>
                  <span className="text-slate-600 ml-1.5 uppercase font-bold tracking-wider">{t.stats.projects}</span>
                </div>
                <div className="w-px h-4 bg-slate-400" />
                <div>
                  <span className="font-black text-sm sm:text-base text-slate-900">99.9%</span>
                  <span className="text-slate-600 ml-1.5 uppercase font-bold tracking-wider">{t.stats.satisfaction}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center items-center order-first lg:order-last">
              <div className="w-full max-w-[310px] xs:max-w-[350px] sm:max-w-[390px] md:max-w-[430px] lg:max-w-[450px] relative">
                {!imgError ? (
                  <div className="relative flex justify-center items-center">
                    {/* Aura esverdeada / cor do tema no centro da imagem */}
                    <div 
                      className="absolute w-[95%] h-[95%] rounded-full opacity-35 blur-3xl pointer-events-none transition-opacity duration-700"
                      style={{ background: `radial-gradient(circle, ${glowHex}, transparent 68%)` }}
                    />

                    {/* Silhueta recortada sem bordas, casaco 100% sólido sem gradiente branco */}
                    <img 
                      src="/img/perfil/tridonJ_clean_cutout.png" 
                      alt="Tridon José Acácio - Software Architect" 
                      className="relative z-10 block w-full h-auto object-contain select-none pointer-events-none filter drop-shadow-xl"
                      loading="eager"
                      draggable={false}
                      onError={() => setImgError(true)}
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square flex flex-col items-center justify-center text-slate-500 gap-2 bg-slate-100 rounded-2xl border border-slate-200">
                    <User className="w-16 h-16 sm:w-20 sm:h-20 text-slate-400" />
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest">Foto de Perfil</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          PROJETOS — com imagens + GlowCard
      ============================================================ */}
      <section id="projects" className="py-14 sm:py-16 lg:py-20 bg-white border-t border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-black tracking-tight text-slate-900">{t.projects.title}</h2>
              <p className="text-slate-600 text-xs md:text-sm font-light mt-1">{t.projects.subtitle}</p>
            </div>
            <div className="flex items-center gap-2 md:mt-0 self-center md:self-auto">
              <button onClick={() => scrollCarousel(projectsScrollRef, 'left')} className="p-2 sm:p-2.5 rounded-full bg-white border border-slate-200 shadow-xs hover:bg-slate-50 text-slate-700" aria-label="Projeto anterior">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => scrollCarousel(projectsScrollRef, 'right')} className="p-2 sm:p-2.5 rounded-full bg-white border border-slate-200 shadow-xs hover:bg-slate-50 text-slate-700" aria-label="Próximo projeto">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div 
            ref={projectsScrollRef} 
            className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible"
          >
            {PROJECTS_DATA.map(({ key, icon: Icon, image, tech, arch }) => {
              const proj = t[key];
              return (
                <GlowCard
                  key={key}
                  glowColor={glowHex}
                  borderWidth={2}
                  intensity={1.2}
                  radius="1rem"
                  className="min-w-[260px] xs:min-w-[280px] sm:min-w-[320px] md:min-w-0 max-w-[340px] md:max-w-none snap-start"
                >
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between h-full">
                    <div>
                      {/* IMAGEM DO PROJETO */}
                      <div className="h-40 sm:h-44 bg-slate-100 relative border-b border-slate-200 overflow-hidden">
                        <img
                          src={image}
                          alt={proj.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          draggable={false}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        {/* Fallback com ícone */}
                        <div className="hidden absolute inset-0 flex items-center justify-center bg-slate-100">
                          <Icon className="w-12 h-12 text-slate-400" />
                        </div>

                        {/* Badge */}
                        <span className={`absolute top-3 right-3 bg-white/95 backdrop-blur-sm border border-slate-200 ${currentTheme.accentText} font-bold text-[10px] px-2.5 py-1 rounded-lg shadow-md z-10`}>
                          {proj.badge}
                        </span>

                        {/* Gradiente sutil na base */}
                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                      </div>

                      <div className="p-4 sm:p-5 space-y-2">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">{proj.title}</h3>
                        <p className="text-slate-600 text-xs font-light leading-relaxed">{proj.description}</p>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between bg-white">
                      <span className="text-[10px] font-mono text-slate-500">{tech.split('+')[0].trim()}</span>
                      <button 
                        onClick={() => setActiveModalProject({ title: proj.title, tech, arch })} 
                        className={`text-[11px] font-bold ${currentTheme.accentText} flex items-center gap-1`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t.projects.viewArch}</span>
                      </button>
                    </div>
                  </div>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          EXPERTISE — Infinite Spiral
      ============================================================ */}
      <section id="expertise" className="py-14 sm:py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2">
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-black tracking-tight text-slate-900">{t.expertise.title}</h2>
            <p className="text-slate-600 text-xs md:text-sm font-light mt-1">{t.expertise.subtitle}</p>
          </div>

          <InfiniteSpiral
            items={TECHNOLOGIES}
            radius={260}
            speed={0.28}
            cardWidth={150}
            cardHeight={72}
            glowHex={glowHex}
          />
        </div>
      </section>

      {/* ============================================================
          TERMINAL
      ============================================================ */}
      {/* ============================================================
          TERMINAL
      ============================================================ */}
      <section id="terminal" className="py-14 sm:py-16 lg:py-20 bg-slate-50/60 border-t border-b border-slate-200 scroll-mt-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 space-y-2">
            <h2 className="text-lg xs:text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
              <Terminal className={`w-4 h-4 sm:w-5 sm:h-5 ${currentTheme.accentText}`} />
              <span>{t.terminalSection.title}</span>
            </h2>
            <p className="text-slate-600 text-[11px] sm:text-xs font-light">{t.terminalSection.subtitle}</p>
          </div>

          {/* Atalhos Rápidos Clicáveis - Sem emojis */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-3">
            {[
              { cmd: 'ajuda', label: 'ajuda', icon: HelpCircle },
              { cmd: 'whoami', label: 'whoami', icon: UserCheck },
              { cmd: 'skills', label: 'skills', icon: Cpu },
              { cmd: 'projetos', label: 'projetos', icon: FolderKanban },
              { cmd: 'contato', label: 'contato', icon: Mail },
              { cmd: 'clear', label: 'limpar', icon: Trash2 }
            ].map(({ cmd, label, icon: Icon }) => (
              <button
                key={cmd}
                type="button"
                onClick={() => executeCommand(cmd)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-400 text-[10px] sm:text-[11px] font-mono shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Icon className="w-3 h-3 text-slate-500" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-xl overflow-hidden font-mono text-[11px] sm:text-xs text-slate-100">
            <div className="bg-slate-900 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-1 sm:ml-2 text-[10px] sm:text-[11px] text-slate-400 truncate">tridon@clean-core:~</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono hidden xs:inline">bash (interactive)</span>
            </div>

            <div ref={terminalContainerRef} className="p-3 sm:p-5 h-44 sm:h-52 overflow-y-auto space-y-2 select-text" aria-live="polite">
              {terminalHistory.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`${
                    item.type === 'user' ? 'text-white font-bold' : 
                    item.type === 'system' ? 'text-emerald-400' : 'text-slate-300'
                  } whitespace-pre-line break-words leading-relaxed`}
                >
                  {item.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleTerminalSubmit} className="bg-slate-900/95 border-t border-slate-800 p-2.5 sm:p-3 flex items-center gap-2">
              <span className="text-emerald-400 font-bold font-mono">$</span>
              <input 
                type="text" 
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder={t.terminalSection.placeholder}
                aria-label="Comando do terminal"
                className="bg-transparent border-none outline-none flex-1 text-white text-[11px] sm:text-xs font-mono placeholder:text-slate-600 min-w-0"
              />
              <button type="submit" className={`px-3 sm:px-4 py-1.5 rounded-lg ${currentTheme.primary} text-[11px] sm:text-xs shadow-xs shrink-0 cursor-pointer`}>
                Run
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ============================================================
          CONTATO — SpotlightCard com espaçamento anti-sobreposição
      ============================================================ */}
      <section id="contact" className="py-14 sm:py-16 lg:py-20 bg-white pb-32 sm:pb-36 lg:pb-40 scroll-mt-14">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2">
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-slate-900">{t.contact.title}</h2>
            <p className="text-slate-600 text-xs sm:text-sm font-light px-2">{t.contact.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="lg:col-span-5 space-y-4">
              <SpotlightCard
                spotlightColor={`${glowHex}30`}
                radius="1rem"
                className="bg-white border border-slate-200 shadow-xs"
              >
                <div className="p-5 sm:p-6 space-y-5 sm:space-y-6">
                  {/* Email com botão de cópia com 1 clique */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-50 border border-slate-200 ${currentTheme.accentText} flex items-center justify-center shrink-0 shadow-xs`}>
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-900 text-xs">{t.contact.email}</h3>
                        <a href="mailto:tridonjose.acacio@gsinfo.co.mz" className="text-slate-600 text-[11px] sm:text-xs mt-0.5 font-light hover:text-slate-900 transition-colors break-all block">
                          tridonjose.acacio@gsinfo.co.mz
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      title="Copiar e-mail"
                      aria-label="Copiar endereço de e-mail"
                      className="shrink-0 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all flex items-center gap-1.5 text-[10px] font-medium shadow-2xs cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 shadow-xs">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs">{t.contact.whatsapp}</h3>
                      <a 
                        href="https://wa.me/258844883000?text=Ol%C3%A1%20Tridon,%20gostaria%20de%20conversar%20sobre%20um%20projeto" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-slate-600 text-[11px] sm:text-xs mt-0.5 font-light hover:text-slate-900 transition-colors block"
                      >
                        (+258) 84 488 3000
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs">Localização</h3>
                      <p className="text-slate-600 text-[11px] sm:text-xs mt-0.5 font-light">{t.contact.location}</p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>

            <div className="lg:col-span-7">
              <SpotlightCard
                spotlightColor={`${glowHex}25`}
                radius="1rem"
                className="bg-white border border-slate-200 shadow-xs"
              >
                <form onSubmit={handleFormSubmit} className="p-5 sm:p-6 space-y-4 relative">
                  {formSubmitted && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center p-6 text-center z-20" role="status">
                      <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 mb-3 animate-bounce" />
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Sucesso!</h3>
                      <p className="text-slate-600 text-xs font-light">{t.contact.form.success}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-[10px] font-bold text-slate-500 uppercase">{t.contact.form.name}</label>
                      <input 
                        id="name" type="text" required value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-slate-400 shadow-xs"
                        placeholder="Carlos Silva"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-[10px] font-bold text-slate-500 uppercase">{t.contact.form.email}</label>
                      <input 
                        id="email" type="email" required value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-slate-400 shadow-xs"
                        placeholder="carlos@empresa.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="company" className="text-[10px] font-bold text-slate-500 uppercase">{t.contact.form.company}</label>
                    <input 
                      id="company" type="text" value={formData.company} 
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-slate-400 shadow-xs"
                      placeholder="Nome da empresa"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="text-[10px] font-bold text-slate-500 uppercase">{t.contact.form.message}</label>
                    <textarea 
                      id="message" required rows={3} value={formData.message} 
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Como posso ajudar no projeto?"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-slate-400 resize-none shadow-xs"
                    ></textarea>
                  </div>

                  <button type="submit" className={`w-full ${currentTheme.primary} py-3 rounded-full text-xs shadow-xs transition-all hover:scale-[1.01] cursor-pointer`}>
                    {t.contact.form.submit}
                  </button>
                </form>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MODAL
      ============================================================ */}
      {activeModalProject && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
          onClick={() => setActiveModalProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white border border-slate-200 max-w-md w-full rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveModalProject(null)} 
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-500 hover:text-slate-900 p-2 rounded-xl bg-slate-100 border border-slate-200"
              aria-label="Fechar modal"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="pr-10">
              <span className={`text-[10px] font-mono uppercase tracking-widest ${currentTheme.accentText}`}>Arquitetura</span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">{activeModalProject.title}</h3>
            </div>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block mb-1 font-mono uppercase">Stack</span>
                <span className="font-semibold text-slate-900 break-words">{activeModalProject.tech}</span>
              </div>
              <div className="bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block mb-1 font-mono uppercase">Especificação</span>
                <p className="font-light text-slate-600">{activeModalProject.arch}</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveModalProject(null)} 
              className={`w-full py-2.5 rounded-full ${currentTheme.primary} text-xs shadow-xs`}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* ============================================================
          DOCK FLUTUANTE
      ============================================================ */}
      <nav 
        className="hidden md:flex fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        aria-label="Dock de navegação rápida"
      >
        <div className="pointer-events-auto flex items-end gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-2xl bg-white/85 backdrop-blur-2xl border border-slate-200/90 shadow-2xl shadow-slate-950/15">
          {DOCK_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const isHovered = hoveredDock === item.id;
            return (
              <div key={item.id} className="relative flex flex-col items-center">
                <span
                  className={`absolute -top-9 px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider font-bold whitespace-nowrap bg-slate-900 text-white shadow-xl transition-all duration-200 ${
                    isHovered ? 'opacity-100 -translate-y-0.5' : 'opacity-0 translate-y-0 pointer-events-none'
                  }`}
                >
                  {getDockLabel(item)}
                </span>

                <button
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setHoveredDock(item.id)}
                  onMouseLeave={() => setHoveredDock(null)}
                  aria-label={getDockLabel(item)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative flex items-center justify-center rounded-xl transition-all duration-200 ease-out cursor-pointer ${
                    isHovered ? 'scale-125 -translate-y-2' : 'scale-100 translate-y-0'
                  } ${
                    isActive 
                      ? `${currentTheme.primary} text-white shadow-lg` 
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                  } w-10 h-10 sm:w-11 sm:h-11`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <span
                  className={`absolute -bottom-1 w-1 h-1 rounded-full transition-all ${
                    isActive ? `${currentTheme.primary} opacity-100` : 'opacity-0'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </nav>

      {/* ============================================================
          FOOTER - Padrão Corporativo Escuro Sem Emojis
      ============================================================ */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 py-10 sm:py-12 text-center text-xs pb-28 sm:pb-36">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <TerminalSquare className={`w-4 h-4 ${currentTheme.accentText}`} />
            <span className="font-mono text-xs font-bold text-white tracking-wide">Tridon José Acácio</span>
          </div>
          <p className="text-slate-400 text-[11px] max-w-md mx-auto font-light leading-relaxed">
            {lang === 'en' 
              ? 'Enterprise Software Architecture, Offline-First Systems & High Availability Backend Solutions.' 
              : 'Arquitetura de Software Corporativo, Sistemas Offline-First e Soluções Backend de Alta Disponibilidade.'}
          </p>
          <p className="text-slate-500 font-mono text-[10px] pt-1">© {new Date().getFullYear()} Tridon José Acácio. {t.footer.rights}</p>
        </div>
      </footer>

    </div>
  );
}
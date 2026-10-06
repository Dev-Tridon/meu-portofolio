import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, ArrowUpRight, CheckCircle2,
  Monitor, Smartphone, Database,
  Maximize2, X, Eye, Grid, SlidersHorizontal, Sparkles, Cpu, Zap, Shield, Activity
} from 'lucide-react';
import GSInfoMockup from './mockups/GSInfoMockup';

/* ──────────────────── DATA ──────────────────── */
const projects = [
  {
    id: 'desktop',
    badge: 'Electron & Java',
    badgeColor: '#10b981',
    glowColor: 'rgba(16,185,129,0.18)',
    accentRgb: '16,185,129',
    title: 'GSInfo Desktop Suite',
    category: 'desktop',
    image: '/img/projetos/02_Dashboard_Principal_1920x1080_HD.png',
    screenshots: [
      { id: 'dashboard', label: 'Dashboard', title: 'Dashboard Principal & KPIs',     src: '/img/projetos/02_Dashboard_Principal_1920x1080_HD.png' },
      { id: 'login',     label: 'Login',     title: 'Autenticação & Segurança',       src: '/img/projetos/01_Login_1920x1080_HD.png' },
      { id: 'estoque',   label: 'Estoque',   title: 'Estoque & Armazém',              src: '/img/projetos/04_Estoque_Armazem_1920x1080_HD.png' },
      { id: 'config',    label: 'Ajustes',   title: 'Configurações do Sistema',       src: '/img/projetos/13_Configuracoes_1920x1080_HD.png' },
    ],
    icon: Monitor,
    summary: 'Sistema desktop multi-plataforma corporativo para gestão de restaurantes com sincronização offline e base de dados distribuída.',
    metrics: [
      { label: 'Stack',         value: 'Electron + Java', icon: Cpu },
      { label: 'Sincronização', value: 'Offline-First',   icon: Zap },
      { label: 'Plataforma',   value: 'Cross-Platform',  icon: Shield },
    ],
    stack: ['Electron JS', 'Java 17', 'Spring Boot', 'SQLite', 'PostgreSQL', 'TailwindCSS'],
    highlights: [
      'Sincronização offline automática com tolerância ativa a falhas locais.',
      'Painel corporativo em tempo real: financeiro, inventário e comandas.',
      'Execução nativa de baixo consumo para terminais PDV corporativos.',
    ],
  },
  {
    id: 'pwa',
    badge: 'React PWA',
    badgeColor: '#06b6d4',
    glowColor: 'rgba(6,182,212,0.18)',
    accentRgb: '6,182,212',
    title: 'Garçom Digital Offline-First',
    category: 'pwa',
    image: '/img/projetos/garcom_pwa.jpg',
    screenshots: [
      { id: 'pwa-main', label: 'Interface', title: 'Cardápio Digital & Mesas', src: '/img/projetos/garcom_pwa.jpg' },
    ],
    icon: Smartphone,
    summary: 'Aplicação PWA de ultra-performance com QR Code nas mesas e sincronização bidirecional em tempo real via WebSockets.',
    metrics: [
      { label: 'Interface', value: 'PWA Mobile',    icon: Smartphone },
      { label: 'Acesso',    value: 'QR Code Direct', icon: Zap },
      { label: 'Latência',  value: 'Realtime Push',  icon: Activity },
    ],
    stack: ['React 18', 'PWA', 'WebSockets', 'Vite', 'Node.js', 'Redis'],
    highlights: [
      'Leitura instantânea de QR Code nas mesas sem instalação de app nativa.',
      'Notificações push em tempo real com status para cozinha e salão.',
      'Resiliência offline completa durante oscilações da rede Wi-Fi.',
    ],
  },
  {
    id: 'backend',
    badge: 'Multi-Tenant Core',
    badgeColor: '#818cf8',
    glowColor: 'rgba(129,140,248,0.18)',
    accentRgb: '129,140,248',
    title: 'Core Backend Distribuído',
    category: 'backend',
    image: '/img/projetos/multitenant_backend.jpg',
    screenshots: [
      { id: 'core-main', label: 'Infra', title: 'Infraestrutura Multi-Tenant & Clusters', src: '/img/projetos/multitenant_backend.jpg' },
    ],
    icon: Database,
    summary: 'Arquitetura multi-inquilino robusta em Spring Boot e Node.js com isolamento rigoroso por schema e cache Redis de alta performance.',
    metrics: [
      { label: 'Isolamento', value: 'Schema/Tenant', icon: Shield },
      { label: 'Cache Hit',  value: '96.2%',         icon: Zap },
      { label: 'Uptime',     value: '99.99%',         icon: Activity },
    ],
    stack: ['Spring Boot', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'OAuth2/JWT'],
    highlights: [
      'Isolamento de dados por Tenant-ID com replicação de leitura horizontal.',
      'Cache Redis distribuído reduz consultas ao banco de dados em até 80%.',
      'APIs RESTful seguras com controle granular de acesso RBAC.',
    ],
  },
];

const wallShots = [
  { id: 'w1', projectId: 'desktop',  category: 'desktop',  title: 'Dashboard Principal & KPIs',          projectTitle: 'GSInfo Desktop Suite',         badge: 'Electron & Java',     badgeColor: '#10b981', accentRgb: '16,185,129',  src: '/img/projetos/02_Dashboard_Principal_1920x1080_HD.png', tag: 'Gestão & Métricas' },
  { id: 'w2', projectId: 'desktop',  category: 'desktop',  title: 'Autenticação & Segurança',             projectTitle: 'GSInfo Desktop Suite',         badge: 'Electron & Java',     badgeColor: '#10b981', accentRgb: '16,185,129',  src: '/img/projetos/01_Login_1920x1080_HD.png',                tag: 'Segurança & RBAC' },
  { id: 'w3', projectId: 'desktop',  category: 'desktop',  title: 'Estoque & Armazém',                    projectTitle: 'GSInfo Desktop Suite',         badge: 'Electron & Java',     badgeColor: '#10b981', accentRgb: '16,185,129',  src: '/img/projetos/04_Estoque_Armazem_1920x1080_HD.png',      tag: 'Inventário Inteligente' },
  { id: 'w4', projectId: 'desktop',  category: 'desktop',  title: 'Configurações do Sistema',             projectTitle: 'GSInfo Desktop Suite',         badge: 'Electron & Java',     badgeColor: '#10b981', accentRgb: '16,185,129',  src: '/img/projetos/13_Configuracoes_1920x1080_HD.png',        tag: 'Parâmetros Operacionais' },
  { id: 'w5', projectId: 'pwa',      category: 'pwa',      title: 'Interface Garçom PWA',                 projectTitle: 'Garçom Digital Offline-First', badge: 'React PWA',           badgeColor: '#06b6d4', accentRgb: '6,182,212',   src: '/img/projetos/garcom_pwa.jpg',                           tag: 'Mobile & WebSockets' },
  { id: 'w6', projectId: 'backend',  category: 'backend',  title: 'Infraestrutura Multi-Tenant',          projectTitle: 'Core Backend Distribuído',     badge: 'Multi-Tenant Core',   badgeColor: '#818cf8', accentRgb: '129,140,248', src: '/img/projetos/multitenant_backend.jpg',                  tag: 'Arquitetura & Cache' },
];

/* ──────────────────── ANIMATED BACKGROUND CANVAS ──────────────────── */
function TechBackground({ accentColor }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* Floating particles */
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const [r, g, b] = accentColor.split(',').map(Number);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* Grid */
      ctx.strokeStyle = `rgba(30,41,59,0.35)`;
      ctx.lineWidth = 0.5;
      const gs = 72;
      for (let x = 0; x < canvas.width; x += gs) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gs) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      /* Particles + connections */
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
        ctx.fill();

        particles.forEach(p2 => {
          const dx = p.x - p2.x, dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - dist / 130) * 0.10})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [accentColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

/* ──────────────────── GLASS PANEL HELPER ──────────────────── */
const glass = (accentRgb, opacity = 0.04, blur = '20px', borderOpacity = 0.12) => ({
  background: `rgba(${accentRgb},${opacity})`,
  backdropFilter: `blur(${blur}) saturate(160%)`,
  WebkitBackdropFilter: `blur(${blur}) saturate(160%)`,
  border: `1px solid rgba(${accentRgb},${borderOpacity})`,
  boxShadow: `
    0 4px 32px rgba(0,0,0,0.5),
    inset 0 1px 0 rgba(255,255,255,0.06),
    inset 0 -1px 0 rgba(${accentRgb},0.08)
  `,
});

/* ──────────────────── COMPONENT ──────────────────── */
export default function ProjectsPage({ onBackToHome, onGoToContact }) {
  const [viewMode,        setViewMode]        = useState('accordion');
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeScreenIdx,  setActiveScreenIdx]  = useState(0);
  const [wallFilter,      setWallFilter]      = useState('all');
  const [modalData,       setModalData]       = useState(null);
  const [hoverCard,       setHoverCard]       = useState(null);
  const [mousePos,        setMousePos]        = useState({ x: 0, y: 0 });

  const activeProject = projects[activeProjectIdx];
  const activeImage = activeProject.screenshots?.[activeScreenIdx]?.src || activeProject.image;
  const activeTitle = activeProject.screenshots?.[activeScreenIdx]?.title || activeProject.title;

  const selectProject = (idx) => { setActiveProjectIdx(idx); setActiveScreenIdx(0); };

  const filteredWall = wallFilter === 'all'
    ? wallShots
    : wallShots.filter(s => s.category === wallFilter);

  /* Specular mouse tracking for drift wall cards */
  const handleMouseMove = (e, cardEl) => {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    });
  };

  return (
    <div
      className="min-h-screen text-slate-100 flex flex-col select-none relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #020817 0%, #040d1a 50%, #020817 100%)' }}
    >
      {/* Animated tech canvas background */}
      <TechBackground accentColor={activeProject.accentRgb} />

      {/* Ambient radial glow – reacts to active project */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-1200 z-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 45% at 50% -5%, ${activeProject.glowColor}, transparent 65%),
            radial-gradient(ellipse 40% 30% at 85% 90%, rgba(${activeProject.accentRgb},0.07), transparent 60%)
          `,
        }}
      />

      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px)',
          backgroundSize: '100% 3px',
        }}
      />

      {/* ── HEADER ── */}
      <header
        className="relative z-30 px-4 sm:px-8 py-4"
        style={glass(activeProject.accentRgb, 0.03, '28px', 0.10)}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">

          {/* Left: back button + live badge */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <button
              onClick={onBackToHome}
              className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
              style={glass(activeProject.accentRgb, 0.06, '16px', 0.25)}
            >
              <ArrowLeft
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                style={{ color: activeProject.badgeColor }}
              />
              <span className="text-slate-200">Voltar</span>
            </button>

            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase"
              style={{ color: activeProject.badgeColor, ...glass(activeProject.accentRgb, 0.05, '12px', 0.18) }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: activeProject.badgeColor }} />
              PORTFÓLIO
            </div>
          </div>

          {/* Center: mode switcher */}
          <div
            className="flex items-center gap-1 p-1 rounded-full"
            style={glass('148,163,184', 0.03, '20px', 0.08)}
          >
            {[
              { id: 'accordion', label: 'Destaque', Icon: SlidersHorizontal },
              { id: 'drift',     label: 'Grade', Icon: Grid },
            ].map(({ id, label, Icon: Ic }) => (
              <button
                key={id}
                onClick={() => setViewMode(id)}
                title={label}
                className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 cursor-pointer"
                style={
                  viewMode === id
                    ? {
                        background: activeProject.badgeColor,
                        color: '#020817',
                        boxShadow: `0 0 20px ${activeProject.glowColor}, 0 4px 12px rgba(0,0,0,0.4)`,
                      }
                    : { color: '#94a3b8' }
                }
              >
                <Ic className="w-4 h-4" />
              </button>
            ))}
          </div>

          {/* Right: CTA */}
          <button
            onClick={onGoToContact}
            className="hidden md:inline-flex items-center gap-2.5 pl-4 pr-1.5 py-1.5 rounded-full bg-white text-slate-950 text-xs font-bold hover:bg-slate-100 transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-white/10 group cursor-pointer"
          >
            <span>Solicitar Proposta</span>
            <span className="w-6 h-6 rounded-full bg-emerald-500 group-hover:bg-emerald-400 text-slate-950 flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
            </span>
          </button>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="relative z-20 flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col justify-center">

        {/* ══════════ ACCORDION GALLERY ══════════ */}
        {viewMode === 'accordion' && (
          <div className="w-full flex flex-col lg:flex-row gap-3 h-auto lg:h-[calc(100vh-160px)] min-h-[580px]">
            {projects.map((proj, pIdx) => {
              const isActive = activeProjectIdx === pIdx;
              const Icon = proj.icon;
              const currentShot = isActive ? activeImage : proj.image;

              return (
                <div
                  key={proj.id}
                  onClick={() => selectProject(pIdx)}
                  className="relative rounded-2xl overflow-hidden cursor-pointer flex flex-col transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    flexGrow: isActive ? 3.6 : 0.8,
                    minWidth: isActive ? undefined : '72px',
                    ...glass(proj.accentRgb, isActive ? 0.05 : 0.02, '24px', isActive ? 0.20 : 0.07),
                  }}
                >
                  {/* ── Image layer or Mockup ── */}
                  {proj.id === 'desktop' && currentShot === '/img/projetos/02_Dashboard_Principal_1920x1080_HD.png' ? (
                    <div 
                      className="absolute inset-0 w-full h-full transition-all duration-700 flex items-center justify-center p-0 sm:p-2 md:p-6 pb-24"
                      style={{ 
                        opacity: isActive ? 1 : 0.3,
                        transform: isActive ? 'scale(1)' : 'scale(0.95)'
                      }}
                    >
                      {/* The Mockup is responsive, we give it some padding so it looks like a "window" floating inside the accordion panel. */}
                      <GSInfoMockup />
                    </div>
                  ) : (
                    <img
                      src={currentShot}
                      alt={proj.title}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                      style={{
                        opacity: isActive ? 1 : 0.4,
                        filter: isActive ? 'saturate(1.1)' : 'grayscale(0.7) saturate(0.4)',
                        transform: isActive ? 'scale(1.02)' : 'scale(1.06)',
                      }}
                    />
                  )}

                  {/* Specular gradient overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                    style={{
                      background: isActive
                        ? `
                          linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(${proj.accentRgb},0.08) 100%),
                          linear-gradient(to bottom, rgba(2,8,23,0.0) 0%, rgba(2,8,23,0.3) 70%, rgba(2,8,23,0.85) 100%)
                        `
                        : 'linear-gradient(to bottom, rgba(2,8,23,0.2) 0%, rgba(2,8,23,0.6) 100%)',
                    }}
                  />

                  {/* Top specular shine line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,${isActive ? 0.12 : 0.03}) 50%, transparent 100%)`,
                    }}
                  />

                  {/* Corner accent dot */}
                  <div
                    className="absolute top-3 right-3 w-2 h-2 rounded-full transition-all duration-500"
                    style={{
                      background: proj.badgeColor,
                      boxShadow: `0 0 ${isActive ? '10px' : '4px'} ${proj.badgeColor}`,
                      opacity: isActive ? 1 : 0.4,
                    }}
                  />

                  {/* ── COLLAPSED STATE ── */}
                  {!isActive && (
                    <div className="relative z-10 flex-1 flex flex-row lg:flex-col items-center justify-between p-4">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{ background: `rgba(${proj.accentRgb},0.12)`, border: `1px solid rgba(${proj.accentRgb},0.25)` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: proj.badgeColor }} />
                      </div>

                      <div
                        className="hidden lg:block text-[11px] font-black tracking-[0.25em] uppercase transition-colors duration-300"
                        style={{
                          writingMode: 'vertical-lr',
                          transform: 'rotate(180deg)',
                          color: '#475569',
                        }}
                      >
                        {proj.title}
                      </div>

                      <span className="text-[10px] font-mono" style={{ color: `rgba(${proj.accentRgb},0.5)` }}>
                        0{pIdx + 1}
                      </span>
                    </div>
                  )}

                  {/* ── EXPANDED STATE ── */}
                  {isActive && (
                    <div className="relative z-10 flex-1 flex flex-col justify-end p-5 sm:p-7">
                      
                      {/* Bottom Unified Bar */}
                      <div className="w-full flex flex-col sm:flex-row items-end justify-between gap-4">
                        
                        {/* Left: Project Info */}
                        <div className="flex flex-col gap-2.5 max-w-lg">
                          <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold w-max"
                            style={{ color: proj.badgeColor, ...glass(proj.accentRgb, 0.08, '12px', 0.25) }}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {proj.badge}
                            <span className="text-slate-500">· 0{pIdx + 1}/{projects.length}</span>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 text-[10px] font-mono mb-1 uppercase tracking-widest" style={{ color: `rgba(${proj.accentRgb},1)` }}>
                              <Sparkles className="w-3.5 h-3.5" />
                              <span style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>{activeTitle}</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight" style={{ textShadow: '0 4px 16px rgba(0,0,0,0.8)' }}>
                              {proj.title}
                            </h2>
                          </div>
                        </div>

                        {/* Right: Controls & CTA */}
                        <div className="flex flex-col items-end gap-3">
                          {/* Screenshot switcher + Expand */}
                          <div className="flex items-center gap-2">
                            {proj.screenshots && proj.screenshots.length > 1 && (
                              <div
                                className="flex items-center gap-1 p-1 rounded-xl"
                                style={glass(proj.accentRgb, 0.15, '16px', 0.25)}
                              >
                                {proj.screenshots.map((shot, sIdx) => (
                                  <button
                                    key={shot.id}
                                    onClick={(e) => { e.stopPropagation(); setActiveScreenIdx(sIdx); }}
                                    className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold transition-all duration-200 cursor-pointer"
                                    style={
                                      activeScreenIdx === sIdx
                                        ? { background: proj.badgeColor, color: '#020817', boxShadow: `0 0 12px rgba(${proj.accentRgb},0.5)` }
                                        : { color: '#f8fafc', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }
                                    }
                                  >
                                    {shot.label}
                                  </button>
                                ))}
                              </div>
                            )}

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setModalData({ title: activeTitle, projectTitle: proj.title, src: currentShot, accentRgb: proj.accentRgb, badgeColor: proj.badgeColor });
                              }}
                              className="p-2 rounded-xl transition-all duration-200 hover:scale-110 cursor-pointer"
                              style={glass(proj.accentRgb, 0.15, '12px', 0.35)}
                              title="Visualizar em HD"
                            >
                              <Maximize2 className="w-4 h-4" style={{ color: proj.badgeColor }} />
                            </button>
                          </div>

                          <button
                            onClick={(e) => { e.stopPropagation(); onGoToContact(); }}
                            className="inline-flex items-center gap-2.5 pl-4 pr-1.5 py-1.5 rounded-full bg-white text-slate-950 text-xs font-bold hover:bg-slate-100 transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-white/10 group cursor-pointer"
                          >
                            <span>Solicitar Proposta</span>
                            <span className="w-6 h-6 rounded-full bg-emerald-500 group-hover:bg-emerald-400 text-slate-950 flex items-center justify-center transition-colors">
                              <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
                            </span>
                          </button>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ══════════ DRIFT WALL ══════════ */}
        {viewMode === 'drift' && (
          <div className="space-y-5 animate-in fade-in duration-500 py-2">

            {/* Filters */}
            <div
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl"
              style={glass('148,163,184', 0.03, '20px', 0.07)}
            >
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all',     label: 'TODAS (06)' },
                  { id: 'desktop', label: 'GSInfo Desktop (04)', rgb: '16,185,129',  color: '#10b981' },
                  { id: 'pwa',     label: 'Garçom PWA (01)',     rgb: '6,182,212',   color: '#06b6d4' },
                  { id: 'backend', label: 'Backend (01)',         rgb: '129,140,248', color: '#818cf8' },
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setWallFilter(f.id)}
                    className="px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                    style={
                      wallFilter === f.id
                        ? {
                            background: f.color || '#10b981',
                            color: '#020817',
                            boxShadow: `0 0 16px rgba(${f.rgb || '16,185,129'},0.5)`,
                          }
                        : { color: '#64748b', ...glass('148,163,184', 0.04, '10px', 0.08) }
                    }
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">
                {filteredWall.length} INTERFACE{filteredWall.length > 1 ? 'S' : ''}
              </span>
            </div>

            {/* Drift grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWall.map((shot) => (
                <DriftCard
                  key={shot.id}
                  shot={shot}
                  onExpand={() => setModalData({
                    title: shot.title,
                    projectTitle: shot.projectTitle,
                    src: shot.src,
                    accentRgb: shot.accentRgb,
                    badgeColor: shot.badgeColor,
                  })}
                />
              ))}
            </div>

          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer
        className="relative z-20 py-3 text-center text-[10px] font-mono tracking-widest uppercase"
        style={{ color: 'rgba(71,85,105,0.7)', borderTop: '1px solid rgba(30,41,59,0.5)' }}
      >
        Engenharia de Alta Disponibilidade · Offline-First Architecture · GSInfo Suite · Garçom PWA
      </footer>

      {/* ── LIGHTBOX MODAL ── */}
      {modalData && (
        <div
          className="fixed inset-0 z-50 flex flex-col p-4 sm:p-8"
          style={{
            background: 'rgba(2,8,23,0.93)',
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          }}
          onClick={() => setModalData(null)}
        >
          {/* Glow behind image */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(${modalData.accentRgb},0.08), transparent 70%)` }}
          />

          {/* Modal Header */}
          <div
            className="relative z-10 flex items-center justify-between max-w-5xl mx-auto w-full pb-4 mb-4"
            style={{ borderBottom: `1px solid rgba(${modalData.accentRgb},0.15)` }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="w-3 h-3 rounded-full block animate-ping absolute" style={{ background: modalData.badgeColor, opacity: 0.4 }} />
                <span className="w-3 h-3 rounded-full block relative" style={{ background: modalData.badgeColor }} />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: `rgba(${modalData.accentRgb},0.7)` }}>
                  {modalData.projectTitle}
                </p>
                <h3 className="text-base font-black text-white">{modalData.title}</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                style={{ color: modalData.badgeColor, ...glass(modalData.accentRgb, 0.06, '10px', 0.20) }}
              >
                1920 × 1080 · HD
              </span>
              <button
                onClick={() => setModalData(null)}
                className="p-2 rounded-xl transition-all hover:scale-110 cursor-pointer"
                style={glass(modalData.accentRgb, 0.06, '10px', 0.20)}
              >
                <X className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          </div>

          {/* Image */}
          <div
            className="relative z-10 flex-1 flex items-center justify-center overflow-hidden max-w-5xl mx-auto w-full"
            onClick={e => e.stopPropagation()}
          >
            {/* Specular frame around image */}
            <div
              className="relative rounded-2xl overflow-hidden p-[1px]"
              style={{
                background: `linear-gradient(135deg, rgba(${modalData.accentRgb},0.4) 0%, rgba(255,255,255,0.05) 40%, rgba(${modalData.accentRgb},0.2) 100%)`,
                boxShadow: `0 0 60px rgba(${modalData.accentRgb},0.25), 0 20px 80px rgba(0,0,0,0.8)`,
              }}
            >
              <img
                src={modalData.src}
                alt={modalData.title}
                className="block max-h-[74vh] max-w-full object-contain rounded-[14px]"
              />
              {/* Inner specular highlight */}
              <div
                className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none rounded-t-[14px]"
                style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)' }}
              />
            </div>
          </div>

          {/* Footer hint */}
          <p
            className="relative z-10 text-center text-[10px] font-mono tracking-widest uppercase pt-4 max-w-5xl mx-auto"
            style={{ color: 'rgba(71,85,105,0.6)' }}
            onClick={e => e.stopPropagation()}
          >
            Clique fora da imagem para fechar · ESC
          </p>
        </div>
      )}

    </div>
  );
}

/* ──────────────────── DRIFT CARD ──────────────────── */
function DriftCard({ shot, onExpand }) {
  const cardRef  = useRef(null);
  const [tilt,   setTilt]   = useState({ x: 0, y: 0 });
  const [shimmer, setShimmer] = useState({ x: 50, y: 50 });
  const [hover,  setHover]  = useState(false);
  const rafRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
    const cy = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    const shimX = ((e.clientX - rect.left) / rect.width)  * 100;
    const shimY = ((e.clientY - rect.top)  / rect.height) * 100;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setTilt({ x: cy * -7, y: cx * 7 });
      setShimmer({ x: shimX, y: shimY });
    });
  };

  const handleLeave = () => {
    setHover(false);
    setTilt({ x: 0, y: 0 });
    setShimmer({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleLeave}
      onClick={onExpand}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hover ? '6px' : '0'})`,
        transition: hover ? 'transform 0.08s ease-out' : 'transform 0.6s cubic-bezier(0.23,1,0.32,1)',
        ...glass(shot.accentRgb, 0.04, '16px', hover ? 0.28 : 0.10),
      }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={shot.src}
          alt={shot.title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hover ? 'scale(1.06)' : 'scale(1.00)' }}
        />

        {/* Dark tint */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to bottom, rgba(2,8,23,0.0) 0%, rgba(2,8,23,0.7) 100%)`,
            opacity: hover ? 0.2 : 0.6,
          }}
        />

        {/* Specular shimmer layer — tracks mouse */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(ellipse 40% 40% at ${shimmer.x}% ${shimmer.y}%, rgba(255,255,255,0.10), transparent 70%)`,
            opacity: hover ? 1 : 0,
          }}
        />

        {/* Top specular line */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,${hover ? 0.18 : 0.05}) 50%, transparent)` }}
        />

        {/* Tag badge */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold"
          style={{ color: shot.badgeColor, ...glass(shot.accentRgb, 0.15, '12px', 0.25) }}
        >
          {shot.tag}
        </div>

        {/* Expand icon */}
        <div
          className="absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            opacity: hover ? 1 : 0,
            transform: hover ? 'scale(1)' : 'scale(0.7)',
            ...glass(shot.accentRgb, 0.15, '12px', 0.30),
          }}
        >
          <Eye className="w-4 h-4" style={{ color: shot.badgeColor }} />
        </div>
      </div>

      {/* Card footer */}
      <div
        className="p-4 flex items-center justify-between"
        style={{ borderTop: `1px solid rgba(${shot.accentRgb},0.12)` }}
      >
        <div>
          <h3
            className="text-sm font-bold transition-colors duration-300"
            style={{ color: hover ? shot.badgeColor : '#f1f5f9' }}
          >
            {shot.title}
          </h3>
          <p className="text-[10px] font-mono mt-0.5" style={{ color: 'rgba(100,116,139,0.8)' }}>
            {shot.projectTitle}
          </p>
        </div>

        <div
          className="text-[9px] font-mono px-2 py-0.5 rounded-lg"
          style={{ color: shot.badgeColor, ...glass(shot.accentRgb, 0.08, '8px', 0.18) }}
        >
          1080p HD
        </div>
      </div>

      {/* Bottom glow on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${shot.badgeColor} 50%, transparent)`,
          opacity: hover ? 0.6 : 0,
          boxShadow: `0 0 8px ${shot.badgeColor}`,
        }}
      />
    </div>
  );
}

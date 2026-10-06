import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, Activity, Zap, Shield, GitBranch,
  Database, Box, Globe, Server, HardDrive, Wifi, RefreshCw, Package, Cpu, Layers
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────────────
   Keyframes para Animações Injectadas via Style (Plug & Play)
──────────────────────────────────────────────────────────────────────────── */
const injectStyles = `
  @keyframes textAssemble {
    0% { opacity: 0; transform: translateY(15px) translateX(-15px) scale(0.9); filter: blur(8px); }
    100% { opacity: 1; transform: translateY(0) translateX(0) scale(1); filter: blur(0); }
  }
  .animate-text-assemble {
    animation: textAssemble 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }
  
  @keyframes fadeUp {
    0% { opacity: 0; transform: translateY(10px); }
    100% { transform: translateY(0); opacity: 1; }
  }
  .animate-fade-up {
    animation: fadeUp 0.5s ease-out forwards;
  }

  @keyframes signalGlow {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }
  .animate-signal-glow {
    animation: signalGlow 2.5s linear infinite;
  }

  @keyframes dashRun {
    0% { stroke-dashoffset: 2100; }
    100% { stroke-dashoffset: 0; }
  }
  .signal-trace {
    stroke-dasharray: 100 2000;
    animation: dashRun linear infinite;
  }
  .trace-fast { animation-duration: 6s; animation-delay: 0s; }
  .trace-slow { animation-duration: 9s; animation-delay: 1.5s; }

  /* Premium Bento Styles */
  .bento-card {
    background: rgba(255, 255, 255, 0.015);
    border: 1px solid rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 1.5rem;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
  }
  .bento-card:hover {
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -15px rgba(0,0,0,0.6);
  }

  .bg-blob {
    position: absolute;
    filter: blur(120px);
    opacity: 0.15;
    border-radius: 50%;
    animation: blobFloat 12s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
    pointer-events: none;
    transition: background-color 1s ease;
  }
  @keyframes blobFloat {
    0% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(40px, -60px) scale(1.2); }
    100% { transform: translate(-30px, 30px) scale(0.8); }
  }

  @keyframes slideEnter {
    0% { opacity: 0; transform: translateX(15px); filter: blur(4px); }
    100% { opacity: 1; transform: translateX(0); filter: blur(0); }
  }
  .animate-slide-enter {
    animation: slideEnter 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes scaleUp {
    0% { opacity: 0; transform: scale(0.95); filter: blur(4px); }
    100% { opacity: 1; transform: scale(1); filter: blur(0); }
  }
  .animate-scale-up {
    animation: scaleUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .svg-node-group { 
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease; 
  }
  .svg-node-group:hover { 
    transform: scale(1.05);
    filter: brightness(1.2);
  }
`;

/* ────────────────────────────────────────────────────────────────────────────
   Slide definitions
──────────────────────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    counter: '01/03', badge: 'ENTERPRISE CORE',
    title: 'Backend Power', tag: 'stack/Spring-Boot-Java',
    accent: '#10b981',
    desc: 'Arquiteturas resilientes com Java 17+ e Spring Boot. Microsserviços de alta disponibilidade, concorrência e latência P99 < 8ms.',
    chip: { label: 'Spring Boot', sub: 'JVM · Java 17+' },
    nodes: [
      { label: 'PostgreSQL', sub: 'Relational DB',  icon: Database, col: '#06b6d4' },
      { label: 'Redis',      sub: 'Cache Layer',    icon: Zap,      col: '#f59e0b' },
    ],
    metric: { title: 'Throughput de Pico', val: '+50k TPS', alt: 'P99 < 8ms' },
    stats: [
      { val: '99.999%', lbl: 'Uptime' },
      { val: 'P99 <8ms', lbl: 'Latência' },
      { val: 'Docker', lbl: 'Containers' },
    ],
    tags: ['Spring Boot 3', 'Java 17+', 'PostgreSQL', 'Redis', 'Docker', 'Node.js'],
  },
  {
    counter: '02/03', badge: 'CROSS-PLATFORM',
    title: 'Native Desktop', tag: 'stack/Electron-React-PWA',
    accent: '#06b6d4',
    desc: 'Sistemas desktop cross-platform em Electron JS com sincronização offline-first e PWAs resilientes via WebSockets.',
    chip: { label: 'Electron JS', sub: 'Node · Chromium' },
    nodes: [
      { label: 'React 18', sub: 'UI Renderer',   icon: Cpu,       col: '#10b981' },
      { label: 'SQLite',   sub: 'Local Storage', icon: HardDrive, col: '#f59e0b' },
    ],
    metric: { title: 'Sync Offline', val: '100% Resiliente', alt: 'Delta < 200ms' },
    stats: [
      { val: 'PWA',       lbl: 'Offline-First' },
      { val: 'QR Code',   lbl: 'Table Scan' },
      { val: 'Vite',      lbl: 'Bundler' },
    ],
    tags: ['Electron JS', 'React 18', 'PWA', 'WebSockets', 'SQLite', 'Vite'],
  },
  {
    counter: '03/03', badge: 'SECURE CLOUD',
    title: 'Multi-Tenant', tag: 'stack/Cloud-Architecture',
    accent: '#818cf8',
    desc: 'Infraestrutura multi-tenant com isolamento estrito de dados por schema, autenticação JWT/OAuth2 e Docker.',
    chip: { label: 'Spring Boot', sub: 'Multi-Tenant Core' },
    nodes: [
      { label: 'PostgreSQL', sub: 'Schema Isolated', icon: Database, col: '#06b6d4' },
      { label: 'Docker',     sub: 'Orchestration',   icon: Box,      col: '#e879f9' },
    ],
    metric: { title: 'Isolamento de Dados', val: 'Schema/Tenant', alt: 'Zero cross-leak' },
    stats: [
      { val: '96.2%',   lbl: 'Cache Hit' },
      { val: '99.99%',  lbl: 'Uptime' },
      { val: 'Redis',   lbl: 'Cache Layer' },
    ],
    tags: ['Multi-Tenant', 'Spring Boot', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
  },
];

/* ────────────────────────────────────────────────────────────────────────────
   Animated Text Component
──────────────────────────────────────────────────────────────────────────── */
const AnimatedText = ({ text, delayOffset = 0 }) => (
  <span className="flex flex-wrap">
    {text.split('').map((char, index) => (
      <span
        key={index}
        className="opacity-0 animate-text-assemble whitespace-pre"
        style={{ animationDelay: `${delayOffset + index * 0.03}s` }}
      >
        {char}
      </span>
    ))}
  </span>
);

/* ────────────────────────────────────────────────────────────────────────────
   PCB SVG — parallel bundle traces + data packet light effect
──────────────────────────────────────────────────────────────────────────── */
function PCBSvg({ size, accent, slideIndex }) {
  const W = size.w;
  const H = size.h;

  /* ── geometry ── */
  const cx = W * 0.25; // chip centre x
  const cy = H * 0.50; // chip centre y
  
  const crW = Math.min(W, H) * 0.22; // chip half-width
  const crH = Math.min(W, H) * 0.16; // chip half-height

  const nrW = Math.min(W, H) * 0.14; // node half-width
  const nrH = Math.min(W, H) * 0.13; // node half-height

  const nodePositions = [
    { px: W * 0.80, py: H * 0.28 },
    { px: W * 0.80, py: H * 0.72 },
  ];

  const LINES_PER_NODE = 6;
  const SPACING = 3.5;

  function buildBundlePaths(node, nodeIdx) {
    const paths = [];
    const midX = cx + crW + (node.px - cx - crW) * 0.52;

    for (let li = 0; li < LINES_PER_NODE; li++) {
      const kChip = li - (LINES_PER_NODE - 1) / 2;
      const kNode = li - (LINES_PER_NODE - 1) / 2;

      const startY = cy + kChip * SPACING * (nodeIdx === 0 ? -1 : 1);
      const endY = node.py + kNode * SPACING;

      paths.push(
        `M ${cx + crW} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${node.px - nrW} ${endY}`
      );
    }
    return paths;
  }

  const allPaths = nodePositions.map((n, i) => buildBundlePaths(n, i)).flat();

  const pins = 4;
  const pinLines = [];
  for (let i = 0; i < pins; i++) {
    const f = (i + 0.5) / pins;
    const tx = cx - crW + f * crW * 2;
    const ty = cy - crH + f * crH * 2;
    pinLines.push(<line key={`t-${i}`} x1={tx} y1={cy - crH} x2={tx} y2={cy - crH - 5} stroke={`${accent}66`} strokeWidth="1" />);
    pinLines.push(<line key={`b-${i}`} x1={tx} y1={cy + crH} x2={tx} y2={cy + crH + 5} stroke={`${accent}66`} strokeWidth="1" />);
    pinLines.push(<line key={`l-${i}`} x1={cx - crW} y1={ty} x2={cx - crW - 5} y2={ty} stroke={`${accent}66`} strokeWidth="1" />);
    pinLines.push(<line key={`r-${i}`} x1={cx + crW} y1={ty} x2={cx + crW + 5} y2={ty} stroke={`${accent}66`} strokeWidth="1" />);
  }

  return (
    <svg width={W} height={H} className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <radialGradient id={`glow-${slideIndex}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Traces ── */}
      {allPaths.map((d, i) => (
        <g key={`path-${i}`} style={{ color: accent }}>
          {/* Base static line */}
          <path d={d} fill="none" stroke="#131e1a" strokeWidth="1.2" />
          {/* Animated trace */}
          <path
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className={`signal-trace ${i % 3 === 0 ? 'trace-slow' : 'trace-fast'}`}
            style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
          />
        </g>
      ))}

      {/* ── Nodes ── */}
      {nodePositions.map((n, i) => (
        <g key={`node-${i}`} className="svg-node-group" style={{ transformOrigin: `${n.px}px ${n.py}px` }}>
          <rect
            x={n.px - nrW}
            y={n.py - nrH}
            width={nrW * 2}
            height={nrH * 2}
            rx={Math.min(nrW, nrH) * 0.25}
            fill="#0a0f0d"
            stroke={`${accent}88`}
            strokeWidth="1"
            style={{ filter: `drop-shadow(0 0 10px ${accent})` }}
          />
        </g>
      ))}

      {/* ── Chip ── */}
      <g className="svg-node-group" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <circle cx={cx} cy={cy} r={crW * 1.5} fill={`url(#glow-${slideIndex})`} />
        <rect
          x={cx - crW}
          y={cy - crH}
          width={crW * 2}
          height={crH * 2}
          rx={Math.min(crW, crH) * 0.25}
          fill="#0a0f0d"
          stroke={`${accent}cc`}
          strokeWidth="1.2"
          style={{ filter: `drop-shadow(0 0 16px ${accent})` }}
        />
        <rect
          x={cx - crW * 0.75}
          y={cy - crH * 0.75}
          width={crW * 1.5}
          height={crH * 1.5}
          rx={Math.min(crW, crH) * 0.15}
          fill={`${accent}12`}
        />
        {pinLines}
      </g>
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   Full PCB Diagram = Canvas + HTML node icon overlays
──────────────────────────────────────────────────────────────────────────── */
function PCBDiagram({ slide, slideIndex }) {
  const wrapRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: Math.round(e.contentRect.width), h: Math.round(e.contentRect.height) })
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const nodePos = [
    { x: 80, y: 28 },
    { x: 80, y: 72 },
  ];

  return (
    <div ref={wrapRef} className="relative w-full h-full overflow-hidden">
      {size.w > 0 && (
        <PCBSvg size={size} accent={slide.accent} slideIndex={slideIndex} />
      )}

      {/* HTML Overlays (animados na mudança do slide e interativos ao hover) */}
      <div 
        className="absolute z-10" 
        style={{ left: '25%', top: '50%', transform: 'translate(-50%,-50%)', width: '35%' }}
      >
        <div
          key={`chip-${slideIndex}`}
          className="animate-fade-up flex flex-col items-center justify-center text-center transition-transform duration-500 hover:scale-110 cursor-default px-2"
          style={{
            animationDelay: '0.3s',
            opacity: 0,
          }}
        >
          <div className="text-[10px] sm:text-[12px] font-black font-mono leading-tight text-white drop-shadow-md">{slide.chip.label}</div>
          <div className="text-[7px] sm:text-[9px] font-mono leading-tight mt-1" style={{ color: slide.accent + 'ee' }}>
            {slide.chip.sub}
          </div>
        </div>
      </div>

      {size.w > 0 &&
        slide.nodes.map((node, i) => {
          const Icon = node.icon;
          const pos = nodePos[i];
          return (
            <div 
              key={`node-wrapper-${slideIndex}-${i}`}
              className="absolute z-10" 
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%,-50%)', width: '24%' }}
            >
              <div
                key={`node-${slideIndex}-${i}`}
                className="animate-fade-up flex flex-col items-center justify-center gap-1 transition-transform duration-500 hover:scale-110 cursor-default px-1"
                style={{
                  animationDelay: `${0.4 + i * 0.1}s`,
                  opacity: 0,
                }}
              >
                <Icon style={{ width: 18, height: 18, color: node.col }} strokeWidth={2} className="drop-shadow-md" />
                <div className="text-center">
                   <div className="text-[8px] sm:text-[10px] font-mono font-bold text-white leading-tight drop-shadow-md">
                     {node.label}
                   </div>
                   <div className="text-[6px] sm:text-[8px] font-mono leading-tight mt-0.5" style={{ color: node.col + 'dd' }}>
                     {node.sub}
                   </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   Main Component (Premium Bento Box Layout)
──────────────────────────────────────────────────────────────────────────── */
export default function ArsenalSection() {
  const [idx, setIdx] = useState(0);
  const slide = SLIDES[idx];
  const ac = slide.accent;

  const prev = () => setIdx(i => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setIdx(i => (i + 1) % SLIDES.length);

  return (
    <>
      <style>{injectStyles}</style>

      <section id="arsenal" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 select-none min-h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Orbs de fundo fluídos acompanhando a cor principal do slide */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="bg-blob w-96 h-96 top-0 left-0" style={{ backgroundColor: ac, opacity: 0.15 }} />
           <div className="bg-blob w-[30rem] h-[30rem] bottom-0 right-0" style={{ backgroundColor: ac, opacity: 0.1, animationDelay: '-5s' }} />
        </div>

        {/* Section header com animação */}
        <div className="max-w-3xl mb-12 space-y-4 relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white flex">
            <AnimatedText text="Arquitetura & Stack" delayOffset={0} />
          </h2>
          <p
            className="text-slate-400 text-base sm:text-lg font-light leading-relaxed opacity-0 animate-fade-up max-w-2xl"
            style={{ animationDelay: '0.8s' }}
          >
            Sistemas distribuídos e interfaces resilientes, desenhados para escala. Uma visão detalhada do coração da engenharia.
          </p>
        </div>

        {/* ── Bento Grid Premium ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          
          {/* Left Column (Main Info + Nav) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
             
             {/* Info Card principal */}
             <div className="bento-card p-8 flex-1 flex flex-col justify-between group overflow-hidden relative">
                {/* Efeito Glow interno no hover ligado à cor de acento */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" 
                  style={{ background: `radial-gradient(circle at top right, ${ac}15, transparent 70%)`}} 
                />
                
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider transition-colors duration-500 shadow-sm"
                      style={{ color: ac, background: `${ac}15`, border: `1px solid ${ac}30` }}>
                      ● {slide.counter}
                    </span>
                    <span key={`badge-${idx}`} className="text-xs font-mono text-slate-400 tracking-widest animate-slide-enter opacity-0 uppercase">
                      {slide.badge}
                    </span>
                  </div>
                  <div key={`title-block-${idx}`}>
                    <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight opacity-0 animate-slide-enter">
                      {slide.title}
                    </h3>
                    <div className="font-mono text-sm font-semibold mt-2 opacity-0 animate-slide-enter" style={{ color: ac, animationDelay: '0.1s' }}>
                      {slide.tag}
                    </div>
                    <p className="text-slate-400 mt-5 text-sm sm:text-base leading-relaxed font-light opacity-0 animate-slide-enter" style={{ animationDelay: '0.2s' }}>
                      {slide.desc}
                    </p>
                  </div>
                </div>
                
                <div className="mt-10">
                  <div key={`tags-${idx}`} className="flex flex-wrap gap-2">
                    {slide.tags.map((t, i) => (
                      <span 
                        key={`tag-${i}`} 
                        className="px-3 py-1.5 text-[10px] sm:text-xs font-mono rounded-full border border-white/5 bg-white/5 text-slate-300 opacity-0 animate-slide-enter shadow-sm" 
                        style={{ animationDelay: `${0.3 + i*0.05}s`}}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
             </div>

             {/* Navigation Card (Segmented Control style) */}
             <div className="bento-card p-3 flex items-center justify-between">
                <div className="flex gap-1 bg-black/40 rounded-xl p-1 border border-white/5">
                  {SLIDES.map((s, i) => (
                    <button key={i} onClick={() => setIdx(i)} className="relative px-5 py-2 rounded-lg text-xs font-bold font-mono transition-colors duration-300"
                      style={{ color: idx === i ? '#fff' : '#64748b' }}>
                      {idx === i && (
                        <div className="absolute inset-0 rounded-lg bg-white/10 shadow-sm" style={{ borderBottom: `2px solid ${ac}` }} />
                      )}
                      <span className="relative z-10">{`0${i+1}`}</span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 mr-1">
                   <button onClick={prev} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 text-slate-400 hover:text-white hover:-translate-x-0.5 active:scale-95">
                     <ChevronLeft size={16}/>
                   </button>
                   <button onClick={next} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 text-slate-400 hover:text-white hover:translate-x-0.5 active:scale-95">
                     <ChevronRight size={16}/>
                   </button>
                </div>
             </div>

          </div>

          {/* Right Column (Visuals + Stats) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
             
             {/* Circuit Visual Card */}
             <div className="bento-card h-72 sm:h-80 w-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#060808]" />
                {/* Dotted Grid Background */}
                <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                
                {/* Linha de energia de topo */}
                <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 left-0 h-full w-1/3 animate-signal-glow" style={{ background: `linear-gradient(90deg, transparent, ${ac}aa, transparent)`, boxShadow: `0 0 15px ${ac}` }} />
                </div>

                <PCBDiagram slide={slide} slideIndex={idx} />
             </div>
             
             {/* Stats Row */}
             <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
                
                {/* Main Metric */}
                <div className="bento-card p-6 sm:col-span-2 flex flex-col justify-center relative overflow-hidden group">
                   <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 transform group-hover:scale-110">
                     <Activity size={120} style={{ color: ac }}/>
                   </div>
                   <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 z-10">{slide.metric.title}</div>
                   <div key={`metric-val-${idx}`} className="text-3xl font-black text-white font-mono opacity-0 animate-scale-up z-10">
                     {slide.metric.val}
                   </div>
                   <div key={`metric-alt-${idx}`} className="text-xs text-slate-400 font-mono mt-1.5 opacity-0 animate-slide-enter z-10" style={{ animationDelay: '0.1s' }}>
                     {slide.metric.alt}
                   </div>
                </div>
                
                {/* Detailed Stats */}
                <div className="bento-card p-6 sm:col-span-3 grid grid-cols-3 gap-4 items-center">
                   {slide.stats.map((s, i) => (
                      <div key={`stat-${idx}-${i}`} className="flex flex-col justify-center opacity-0 animate-scale-up text-center border-r border-white/5 last:border-0" style={{ animationDelay: `${0.2 + i*0.1}s` }}>
                         <div className="text-xl sm:text-2xl font-black font-mono text-white mb-1">{s.val}</div>
                         <div className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">{s.lbl}</div>
                      </div>
                   ))}
                </div>

             </div>

          </div>
        </div>
      </section>
    </>
  );
}

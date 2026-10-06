import React from 'react';
import { Layers, ArrowUpRight, CheckCircle2, Shield, Activity, GitBranch, Monitor, Smartphone, Database } from 'lucide-react';

export default function ProjectsSection() {
  const projects = [
    {
      badge: 'Electron & Java',
      title: 'GSInfo Desktop Suite',
      image: '/img/projetos/02_Dashboard_Principal_1920x1080_HD.png',
      icon: Monitor,
      summary: 'Sistema desktop multi-plataforma corporativo para gestão complexa de restaurantes e lazer com sincronização offline de banco de dados.',
      metrics: [
        { label: 'Arquitetura', value: 'Electron + Java' },
        { label: 'Sincronização', value: 'Offline-First' },
        { label: 'Plataforma', value: 'Cross-Platform' },
      ],
      stack: ['Electron JS', 'Java 17', 'Spring Boot', 'SQLite / PostgreSQL', 'TailwindCSS'],
      highlights: [
        'Sincronização offline automática com mecanismo de tolerância a falhas de conectividade local.',
        'Painel corporativo em tempo real para controle financeiro, inventário e gestão de comandas.',
        'Execução nativa otimizada com consumo eficiente de recursos computacionais em PDVs.',
      ]
    },
    {
      badge: 'React PWA',
      title: 'Garçom Digital Offline-First',
      image: '/img/projetos/img2.png',
      icon: Smartphone,
      summary: 'Aplicação PWA de alta performance com leitura de QR Code em mesas e sincronização em tempo real via WebSockets.',
      metrics: [
        { label: 'Interface', value: 'PWA WebSockets' },
        { label: 'Navegação', value: 'QR Code Direct' },
        { label: 'Latência', value: 'Realtime Push' },
      ],
      stack: ['React 18', 'PWA', 'WebSockets', 'Vite', 'Node.js', 'Redis'],
      highlights: [
        'Leitura instantânea de QR Code nas mesas sem necessidade de instalação na loja de apps.',
        'Atualização síncrona dos pedidos na cozinha com notificações sonoras e status em tempo real.',
        'Suporte completo a funcionamento offline temporário durante oscilações da rede Wi-Fi.',
      ]
    },
    {
      badge: 'Multi-tenant Core',
      title: 'Core Backend Distribuído',
      image: '/img/projetos/img4.jpg',
      icon: Database,
      summary: 'Arquitetura multi-tenant em Java Spring Boot e Node.js com isolamento rigoroso de dados e cache Redis.',
      metrics: [
        { label: 'Isolamento', value: 'Tenant Schema' },
        { label: 'Cache', value: 'Redis Cluster' },
        { label: 'Throughput', value: 'Alta Escala' },
      ],
      stack: ['Spring Boot', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'JWT / OAuth2'],
      highlights: [
        'Arquitetura multi-inquilino com isolamento lógico de banco de dados e chave Tenant-ID.',
        'Camada de cache distribuído em Redis reduzindo consultas a banco de dados em até 80%.',
        'APIs RESTful e gRPC seguras com controle de acesso RBAC e auditoria contínua de segurança.',
      ]
    }
  ];

  return (
    <section 
      id="projects" 
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10"
    >
      <div className="max-w-3xl mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <Layers className="w-3.5 h-3.5" />
          <span>SOLUÇÕES DE ALTA ENGENHARIA &bull; CASOS REAIS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Projetos &amp; Arquiteturas em Produção
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
          Arquiteturas sólidas focadas em escalabilidade, sincronização offline e alta disponibilidade operacional.
        </p>
      </div>

      <div className="space-y-8 sm:space-y-10">
        {projects.map((proj, idx) => {
          const Icon = proj.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/20 border border-slate-800/60 backdrop-blur-sm hover:border-emerald-500/40 transition-all shadow-xl shadow-black/20 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                
                {/* Imagem do Projeto */}
                <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950/80 aspect-video relative group/img">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-emerald-400 text-[11px] font-mono flex items-center gap-1.5 backdrop-blur-md">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{proj.badge}</span>
                  </div>
                </div>

                {/* Conteúdo do Projeto */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {proj.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {proj.metrics.map((m, mIdx) => (
                        <div 
                          key={mIdx}
                          className="px-2.5 py-1 rounded-lg bg-slate-950/70 border border-slate-800 font-mono text-center"
                        >
                          <div className="text-xs font-bold text-emerald-400">{m.value}</div>
                          <div className="text-[9px] text-slate-500 uppercase">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {proj.summary}
                  </p>

                  {/* Destaques Arquiteturais */}
                  <div className="space-y-1.5 pt-1">
                    {proj.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Badges de Stack */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-3">
                    {proj.stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-300 text-[10px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

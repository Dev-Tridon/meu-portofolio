import React from 'react';
import { Compass, Network, Activity, Lock, GitFork, Server } from 'lucide-react';

export default function PhilosophySection() {
  const tenets = [
    {
      icon: Network,
      code: 'ARCH-01',
      title: 'Domain-Driven Design & Contextos Delimitados',
      description: 'Modelagem rigorosa alinhada ao negócio. Microsserviços com contratos claros (gRPC/OpenAPI) e limites estritos para evitar monólitos distribuídos.'
    },
    {
      icon: GitFork,
      code: 'ARCH-02',
      title: 'Arquiteturas Orientadas a Eventos (EDA)',
      description: 'Comunicação assíncrona desacoplada via streaming com Apache Kafka e RabbitMQ. Padrões CQRS e Outbox Pattern para garantia de consistência eventual.'
    },
    {
      icon: Activity,
      code: 'ARCH-03',
      title: 'Observabilidade Total & SRE',
      description: 'Telemetria unificada (Distributed Tracing, Métricas e Logs estruturados) com OpenTelemetry, Prometheus e Grafana para resolução preditiva de incidentes.'
    },
    {
      icon: Lock,
      code: 'ARCH-04',
      title: 'Zero-Trust & Segurança em Camadas',
      description: 'Autenticação mutual TLS (mTLS), OAuth2/OIDC, gestão de segredos via HashiCorp Vault e princípios de menor privilégio em todas as camadas da malha de serviços.'
    },
  ];

  return (
    <section 
      id="philosophy" 
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10"
    >
      <div className="max-w-3xl mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <Compass className="w-3.5 h-3.5" />
          <span>PILAR ESTRATÉGICO &bull; GOVERNANÇA DE ARQUITETURA</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Filosofia &amp; Princípios de Engenharia
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
          Sistemas estáveis nascem de decisões arquiteturais deliberadas. Cada escolha técnica prioriza escalabilidade horizontal, manutenibilidade a longo prazo e segurança intrínseca.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {tenets.map((tenet, idx) => {
          const Icon = tenet.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/20 border border-slate-800/60 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-slate-900/40 transition-all duration-300 group shadow-lg shadow-black/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs text-slate-500 group-hover:text-emerald-400 transition-colors font-semibold">
                  {tenet.code}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                {tenet.title}
              </h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                {tenet.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

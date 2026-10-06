import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, CornerDownLeft, Trash2 } from 'lucide-react';

const INITIAL_OUTPUT = [
  'Sistema de Arquitetura Tridon Core CLI [Versao 2.4.0-enterprise]',
  'Digite "help" ou clique nos atalhos abaixo para interagir com o terminal.',
  '----------------------------------------------------------------------',
];

export default function TerminalSection() {
  const [history, setHistory] = useState(INITIAL_OUTPUT);
  const [input, setInput] = useState('');
  const terminalBodyRef = useRef(null);
  const isInitialMount = useRef(true);

  const scrollToBottom = () => {
    if (terminalBodyRef.current && !isInitialMount.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    scrollToBottom();
  }, [history]);

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, `tridon@architect:~$ ${cmd}`];

    switch (trimmed) {
      case 'help':
        newHistory.push(
          'COMANDOS DISPONÍVEIS:',
          '  whoami   - Perfil profissional e credenciais do arquiteto',
          '  stack    - Resumo das tecnologias e runtimes em producao',
          '  metrics  - Indicadores e SLAs de sistemas arquitetados',
          '  arch     - Principios e padroes arquiteturais aplicados',
          '  contact  - Canais diretos de comunicacao institucional',
          '  clear    - Limpar o historico do terminal'
        );
        break;

      case 'whoami':
        newHistory.push(
          'NOME: Tridon Jose Acacio',
          'CARGO: Software Architect & Principal Systems Engineer',
          'EXPERIENCIA: +8 anos em engenharia distribuida e ecossistemas cloud-native',
          'FOCO: Alta disponibilidade, baixa latencia (P99 < 15ms) e microsservicos orientados a eventos'
        );
        break;

      case 'stack':
        newHistory.push(
          'STACK PRINCIPAL:',
          '  - Linguagens: Java 21 (Spring Boot), Go (Golang), TypeScript (NestJS), Python',
          '  - Cloud & K8s: Kubernetes, Docker, AWS (EKS, RDS, MSK), Terraform (IaC)',
          '  - Streaming: Apache Kafka, RabbitMQ, gRPC, Protocol Buffers',
          '  - Bancos de Dados: PostgreSQL particionado, Redis Cluster, MongoDB, Elasticsearch',
          '  - Seguranca & SRE: OpenTelemetry, Prometheus, Grafana, HashiCorp Vault, Keycloak'
        );
        break;

      case 'metrics':
        newHistory.push(
          'METRICAS OPERACIONAIS EM PRODUCAO:',
          '  - SLA Global: 99.999% uptime sustentado',
          '  - Throughput de Pico: +50.000 TPS em liquidação financeira',
          '  - Latencia P99: < 8ms em operacoes criticas inter-servicos',
          '  - MTTR (Mean Time To Recovery): < 2 minutos com failover automatizado'
        );
        break;

      case 'arch':
        newHistory.push(
          'PARADIGMAS & PADROES ARQUITETURAIS:',
          '  - Domain-Driven Design (DDD) & Bounded Contexts',
          '  - Event-Driven Architecture (EDA) com Outbox Pattern & CQRS',
          '  - Zero-Trust Security com mutual TLS (mTLS) & RBAC',
          '  - Circuit Breakers, Bulkheads & Retry Policies inteligentes'
        );
        break;

      case 'contact':
        newHistory.push(
          'CANAIS INSTITUCIONAIS:',
          '  - E-mail Corporativo: tridon.acacio@engenharia.io',
          '  - WhatsApp Business: Disponivel para agendamento executivo',
          '  - LinkedIn: linkedin.com/in/tridon-acacio'
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case '':
        break;

      default:
        newHistory.push(
          `Comando nao reconhecido: "${cmd}". Digite "help" para ver as opcoes disponiveis.`
        );
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    executeCommand(input);
  };

  const quickCommands = ['help', 'whoami', 'stack', 'metrics', 'arch', 'contact', 'clear'];

  return (
    <section 
      id="terminal" 
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10"
    >
      <div className="max-w-2xl mb-8 space-y-2 text-center mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Terminal Interativo CLI
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm font-light">
          Interaja em tempo real com as especificações técnicas e parâmetros do arquiteto.
        </p>
      </div>

      {/* Atalhos Rápidos */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 text-xs font-mono transition-all backdrop-blur-md"
          >
            {cmd === 'clear' ? (
              <span className="flex items-center gap-1">
                <Trash2 className="w-3 h-3 text-red-400" />
                limpar
              </span>
            ) : (
              `[${cmd}]`
            )}
          </button>
        ))}
      </div>

      {/* Janela de Terminal */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 shadow-2xl shadow-black/40 overflow-hidden backdrop-blur-md">
        
        {/* Barra de Título */}
        <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-slate-400 ml-2 font-medium">tridon@architect-core: ~ (zsh)</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            ONLINE
          </span>
        </div>

        {/* Corpo do Terminal */}
        <div 
          ref={terminalBodyRef}
          className="p-4 sm:p-6 font-mono text-xs sm:text-sm text-slate-300 space-y-1.5 max-h-[360px] overflow-y-auto"
        >
          {history.map((line, idx) => (
            <div 
              key={idx}
              className={`leading-relaxed ${
                line.startsWith('tridon@architect')
                  ? 'text-emerald-400 font-semibold'
                  : line.startsWith('COMANDOS') || line.startsWith('STACK') || line.startsWith('METRICAS')
                  ? 'text-white font-bold pt-1'
                  : 'text-slate-300'
              }`}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Linha de Comando / Input */}
        <form 
          onSubmit={handleSubmit}
          className="p-3 sm:p-4 bg-slate-900/50 border-t border-slate-800/80 flex items-center gap-2"
        >
          <span className="text-emerald-400 font-mono text-xs sm:text-sm shrink-0 font-bold">
            tridon@architect:~$
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite um comando (ex: whoami, stack, contact)..."
            className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm outline-none placeholder:text-slate-600"
          />
          <button
            type="submit"
            className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all text-xs font-mono"
            title="Executar comando"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </section>
  );
}

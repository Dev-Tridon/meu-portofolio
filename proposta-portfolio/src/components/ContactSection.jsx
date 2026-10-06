import React, { useState, useEffect } from 'react';
import { Mail, Copy, Check, Send, Phone, ArrowUpRight, X, Terminal, ShieldCheck } from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────────────
   Estilos Avançados para a Modal e Inputs
──────────────────────────────────────────────────────────────────────────── */
const injectStyles = `
  @keyframes modalEnter {
    0% { opacity: 0; transform: scale(0.95) translateY(10px); filter: blur(10px); }
    100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
  }
  .animate-modal-enter {
    animation: modalEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes spinSlow {
    100% { transform: rotate(360deg); }
  }
  
  /* Glow Card Border Magic (Laser rotativo) */
  .glow-border-wrapper {
    position: relative;
    border-radius: 1.5rem;
    padding: 1px; /* Espessura do feixe de laser */
    overflow: hidden;
  }
  .glow-border-wrapper::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(transparent, rgba(16, 185, 129, 0.4), transparent 30%);
    animation: spinSlow 4s linear infinite;
  }
  .glow-inner-content {
    background: #020617; /* Slate 950 sólido para esconder o fundo do laser */
    border-radius: 1.5rem;
    position: relative;
    z-index: 1;
    height: 100%;
    /* Dotted grid fina no fundo da modal */
    background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 20px 20px;
  }

  /* Floating Label Input Futurista */
  .tech-input-group {
    position: relative;
    margin-bottom: 2rem;
  }
  .tech-input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 0.875rem;
    padding: 0.5rem 0;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .tech-input:focus {
    border-bottom: 1px solid #10b981;
    box-shadow: 0 10px 20px -10px rgba(16, 185, 129, 0.15);
  }
  .tech-label {
    position: absolute;
    left: 0;
    top: 0.5rem;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.875rem;
    font-family: monospace;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  /* Aciona label flutuante no foco ou se não estiver vazio (usando :not(:placeholder-shown)) */
  .tech-input:focus ~ .tech-label,
  .tech-input:not(:placeholder-shown) ~ .tech-label {
    top: -1.2rem;
    font-size: 0.65rem;
    color: #10b981;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  /* Efeito de escrita do terminal */
  @keyframes typeLine {
    0% { opacity: 0; transform: translateX(-5px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  .animate-type-line {
    animation: typeLine 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  @keyframes pulseOpacity {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  .animate-pulse-cursor {
    animation: pulseOpacity 1s infinite;
  }
`;

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  // Estados para a animação "Hacker" de envio
  // idle | sending | success
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [terminalLogs, setTerminalLogs] = useState([]);

  const email = 'tridon.acacio@engenharia.io';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    setTerminalLogs([]);

    // Sequência cronometrada de logs do terminal
    const sequence = [
      { text: '[+] Initiating secure TLS handshake...', delay: 100 },
      { text: '[+] Exchanging ephemeral keys...', delay: 600 },
      { text: '[+] Encrypting payload with AES-256-GCM...', delay: 1100 },
      { text: '[+] Routing through edge network...', delay: 1700 },
      { text: '[ok] Payload delivered successfully.', delay: 2400 },
    ];

    sequence.forEach((step, index) => {
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, step.text]);
        
        // No último log, espera um pouco e transita para o ecrã de sucesso
        if (index === sequence.length - 1) {
          setTimeout(() => {
             setSubmitStatus('success');
             
             // Limpa tudo e fecha após 3.5 segundos no estado de sucesso
             setTimeout(() => {
               setIsModalOpen(false);
               setTimeout(() => { // Espera a animação de fecho (se houvesse) antes de dar reset
                  setSubmitStatus('idle');
                  setTerminalLogs([]);
                  setFormData({ name: '', email: '', message: '' });
               }, 300);
             }, 3500);
          }, 800);
        }
      }, step.delay);
    });
  };

  // Bloqueia scroll do body se modal aberta
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  return (
    <>
      <style>{injectStyles}</style>

      <section 
        id="contact" 
        className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto relative z-10 select-none"
      >
        <div className="max-w-2xl space-y-4 relative z-10">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Vamos construir o <br />
            seu próximo projeto?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-lg">
            Disponível para consultoria técnica de alto nível, engenharia de software, aplicações Electron nativas e sistemas multi-tenant.
          </p>

          <div className="pt-6 flex flex-wrap items-center gap-3">
            
            {/* Botão Copiar E-mail */}
            <button
              onClick={copyEmail}
              className="px-4 py-2.5 rounded-full bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-slate-200 text-xs font-mono flex items-center gap-2 transition-all backdrop-blur-md hover:scale-[1.02]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{copied ? 'E-mail Copiado!' : email}</span>
            </button>

            {/* WhatsApp Direto */}
            <a
              href="https://wa.me/258840000000?text=Ola%20Tridon,%20gostaria%20de%20conversar%20sobre%20um%20projeto."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2 transition-all backdrop-blur-md hover:scale-[1.02]"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Direto</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Enviar Mensagem */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-full bg-white text-slate-950 hover:bg-slate-200 text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02]"
            >
              <Mail className="w-3.5 h-3.5 text-slate-950" />
              <span>Enviar Mensagem</span>
            </button>

          </div>
        </div>

        {/* Modal / Drawer Opcional de Envio de Mensagem */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            
            {/* O Invólucro do Glow e Animação */}
            <div className="w-full max-w-lg animate-modal-enter glow-border-wrapper shadow-[0_0_60px_-15px_rgba(16,185,129,0.3)]">
              <div className="glow-inner-content p-8 sm:p-10 relative">
                
                <button
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitStatus === 'sending'} // Não permite fechar enquanto envia
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="w-4 h-4" />
                </button>

                {submitStatus === 'idle' && (
                  <div className="animate-type-line">
                    <h3 className="text-2xl font-black text-white flex items-center gap-3 mb-2">
                      <Terminal className="w-6 h-6 text-emerald-400" />
                      <span>Transmissão Segura</span>
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mb-8">
                      Criptografia ponta-a-ponta ativada. Digite os parâmetros do payload abaixo.
                    </p>

                    <form onSubmit={handleFormSubmit}>
                      
                      <div className="tech-input-group">
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="tech-input"
                          placeholder=" " // O placeholder VAZIO é obrigatório para o CSS :not(:placeholder-shown) detetar se tem texto!
                        />
                        <label className="tech-label">ID Identificador (Nome)</label>
                      </div>

                      <div className="tech-input-group">
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="tech-input"
                          placeholder=" "
                        />
                        <label className="tech-label">Endereço de Retorno (E-mail)</label>
                      </div>

                      <div className="tech-input-group !mb-10">
                        <textarea
                          rows={3}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="tech-input resize-none"
                          placeholder=" "
                        ></textarea>
                        <label className="tech-label">Payload de Dados (Mensagem)</label>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
                      >
                        <Send className="w-4 h-4" />
                        <span>Executar Transmissão</span>
                      </button>
                    </form>
                  </div>
                )}

                {submitStatus === 'sending' && (
                  <div className="h-64 flex flex-col justify-end font-mono text-[10px] sm:text-xs text-emerald-400/80">
                    <div className="space-y-3 mb-4">
                      {terminalLogs.map((log, i) => (
                        <div key={i} className="animate-type-line flex gap-2">
                          <span className="opacity-50">{`>`}</span>
                          <span>{log}</span>
                        </div>
                      ))}
                      <div className="flex gap-2">
                         <span className="opacity-50">{`>`}</span>
                         <span className="w-2 h-4 bg-emerald-400 animate-pulse-cursor"></span>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'success' && (
                  <div className="h-64 flex flex-col items-center justify-center text-center animate-type-line">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                      <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Transmissão Recebida</h4>
                    <p className="text-xs font-mono text-slate-400 max-w-[250px]">
                      A tua mensagem foi desencriptada e lida com sucesso. Responderei o mais breve possível.
                    </p>
                  </div>
                )}

              </div>
            </div>

          </div>
        )}
      </section>
    </>
  );
}

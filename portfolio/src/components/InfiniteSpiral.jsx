import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCw, Compass } from 'lucide-react';

/**
 * InfiniteSpiral — carrossel infinito em espiral 3D com giro automático contínuo,
 * aceleração dinâmica ao entrar no campo de visão (IntersectionObserver)
 * e suporte a arrasto/interação manual.
 */
const InfiniteSpiral = ({
  items = [],
  radius = 260,
  speed = 0.65,
  cardWidth = 140,
  cardHeight = 80,
  glowHex = '#10b981'
}) => {
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(speed);
  const dragStartXRef = useRef(0);
  const dragStartAngleRef = useRef(0);

  // Gatilho: Ao chegar no Arsenal Tecnológico, dispara giro dinâmico automático
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Acelera dinamicamente para exibir todo o arsenal
          velocityRef.current = 3.2;
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Loop de animação contínua e ininterrupta
  useEffect(() => {
    lastTimeRef.current = performance.now();

    const animate = (now) => {
      const elapsed = now - lastTimeRef.current;
      lastTimeRef.current = now;

      // Limita dt entre 1ms e 50ms para garantir rotação fluida sem saltos
      const dt = Math.min(Math.max(elapsed, 1), 50);

      if (!isDragging) {
        // Desacelera suavemente do impulso inicial até a velocidade constante
        velocityRef.current += (speed - velocityRef.current) * 0.02;
        const delta = (velocityRef.current * dt) / 16.67;
        setAngle((prev) => (prev + delta) % 360);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDragging, speed]);

  // Controles de arrasto manual com mouse / touch
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = angle;
  }, [angle]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartXRef.current;
    setAngle((dragStartAngleRef.current + deltaX * 0.4) % 360);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e) => {
    if (e.touches.length > 0) {
      setIsDragging(true);
      dragStartXRef.current = e.touches[0].clientX;
      dragStartAngleRef.current = angle;
    }
  }, [angle]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - dragStartXRef.current;
    setAngle((dragStartAngleRef.current + deltaX * 0.4) % 360);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const count = items.length;
  if (count === 0) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ perspective: '1200px' }}
    >
      {/* Aura de fundo */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${glowHex}, transparent 70%)` }}
      />

      {/* Container 3D em órbita contínua */}
      <div
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(-8deg) rotateY(${angle}deg)`,
          width: 0,
          height: 0
        }}
      >
        {items.map((item, i) => {
          const itemAngle = (360 / count) * i;
          const Icon = item.icon;
          const isAccent = item.color === 'accent';

          return (
            <div
              key={item.name}
              className="absolute pointer-events-none"
              style={{
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) rotateY(-${angle + itemAngle}deg) rotateX(8deg)`,
                transformStyle: 'preserve-3d',
                left: -cardWidth / 2,
                top: -cardHeight / 2
              }}
            >
              <div
                className="group flex items-center gap-2.5 px-3.5 py-3 rounded-2xl bg-white/95 border border-slate-200/90 shadow-lg transition-transform duration-200 hover:scale-110 pointer-events-auto cursor-default"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  boxShadow: `0 10px 30px -10px ${glowHex}40, 0 0 0 1px rgba(255,255,255,0.7) inset`,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 shrink-0 transition-colors"
                  style={{ borderColor: `${glowHex}40` }}
                >
                  <Icon
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    style={{
                      color: isAccent ? glowHex : undefined
                    }}
                  />
                </div>
                <span
                  className={`font-bold text-[11px] sm:text-xs truncate ${isAccent ? '' : 'text-slate-800'}`}
                  style={{ color: isAccent ? glowHex : undefined }}
                >
                  {item.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Halo central */}
      <div
        className="absolute w-32 h-32 rounded-full opacity-30 blur-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${glowHex}, transparent 70%)` }}
      />

      {/* Indicador de status técnico - SEM EMOJIS */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200/90 text-[10px] font-mono uppercase tracking-wider text-slate-600 pointer-events-none select-none backdrop-blur-md shadow-xs">
        {isDragging ? (
          <>
            <Compass className="w-3 h-3 text-slate-700 animate-spin" />
            <span>Rotacionando Manualmente</span>
          </>
        ) : (
          <>
            <RotateCw className="w-3 h-3 text-slate-700 animate-spin" style={{ animationDuration: '2.5s' }} />
            <span>Giro Automático Ativo</span>
          </>
        )}
      </div>
    </div>
  );
};

export default InfiniteSpiral;
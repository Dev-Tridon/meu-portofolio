import React, { useEffect, useRef, useState } from 'react';

/**
 * InfiniteSpiral — carrossel infinito em espiral 3D
 * 
 * Props:
 *  - items: array de { name, icon, color }
 *  - radius: raio da espiral (padrão: 260)
 *  - speed: velocidade de rotação (padrão: 0.15)
 *  - cardWidth / cardHeight: dimensões do card
 *  - glowHex: cor do glow
 */
const InfiniteSpiral = ({
  items = [],
  radius = 260,
  speed = 0.15,
  cardWidth = 140,
  cardHeight = 80,
  glowHex = '#10b981'
}) => {
  const [angle, setAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(performance.now());

  // Rotação contínua
  useEffect(() => {
    const animate = (now) => {
      const dt = now - lastTimeRef.current;
      lastTimeRef.current = now;
      if (!isPaused) {
        setAngle((prev) => prev + (speed * dt) / 16.67);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPaused, speed]);

  const count = items.length;
  if (count === 0) return null;

  return (
    <div
      className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ perspective: '1200px' }}
    >
      {/* Aura de fundo */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${glowHex}, transparent 70%)` }}
      />

      {/* Container 3D */}
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
              className="absolute"
              style={{
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d',
                left: -cardWidth / 2,
                top: -cardHeight / 2
              }}
            >
              <div
                className="group flex items-center gap-2.5 px-3.5 py-3 rounded-2xl bg-white border border-slate-200 shadow-lg transition-all duration-300 hover:scale-110 cursor-default"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  boxShadow: `0 10px 30px -10px ${glowHex}55, 0 0 0 1px rgba(255,255,255,0.6) inset`,
                  backdropFilter: 'blur(8px)'
                }}
              >
                <div
                  className="p-2 rounded-lg bg-white border border-slate-200 shrink-0 transition-colors"
                  style={{ borderColor: `${glowHex}55` }}
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

      {/* Hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-widest text-slate-400 pointer-events-none">
        {isPaused ? '⏸ Pausado' : '↻ Girando'}
      </div>
    </div>
  );
};

export default InfiniteSpiral;
import React, { useRef, useState, useCallback } from 'react';

const GlowCard = ({
  children,
  className = '',
  glowColor = '#10b981',
  spotlightColor,
  borderWidth = 1.5,
  intensity = 0.55,
  radius = '1rem'
}) => {
  const cardRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const spotColor = spotlightColor || hexToRgba(glowColor, 0.18);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative group ${className}`}
      style={{ borderRadius: radius }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          borderRadius: radius,
          padding: `${borderWidth}px`,
          background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, ${hexToRgba(glowColor, isHovering ? intensity * 1.6 : intensity * 0.35)}, ${hexToRgba(glowColor, isHovering ? 0.35 : 0.12)} 40%, ${hexToRgba(glowColor, isHovering ? 0.12 : 0.04)} 60%, transparent 80%)`,
          WebkitMask: `linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)`,
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 1
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          borderRadius: radius,
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(500px circle at ${mouse.x}px ${mouse.y}px, ${spotColor}, transparent 40%)`
        }}
      />
      <div className="relative h-full" style={{ borderRadius: radius }}>
        {children}
      </div>
    </div>
  );
};

function hexToRgba(hex, alpha = 1) {
  if (!hex) return `rgba(16, 185, 129, ${alpha})`;
  const clean = hex.replace('#', '').trim();
  if (clean.startsWith('rgb')) {
    return hex.replace(')', `, ${alpha})`).replace('rgb(', 'rgba(');
  }
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
    return `rgba(16, 185, 129, ${alpha})`;
  }
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default GlowCard;
import React from 'react';
import { Compass, RotateCw } from 'lucide-react';

export default function RotationHUD({ degrees = 0, frame = 1, progress = 0 }) {
  const formattedDegrees = String(degrees).padStart(3, '0');
  const formattedFrame = String(frame).padStart(3, '0');

  return (
    <aside 
      aria-label="Indicador de rotação 3D"
      className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-xl shadow-2xl shadow-slate-950/80 font-mono text-[11px] text-slate-400 select-none"
    >
      <div className="flex items-center gap-2">
        <RotateCw 
          className="w-3.5 h-3.5 text-emerald-400"
          style={{ transform: `rotate(${degrees}deg)`, transition: 'transform 0.1s linear' }}
        />
        <span className="text-white font-bold tracking-wider">{formattedDegrees}°</span>
      </div>

      <div className="w-px h-3.5 bg-slate-800" />

      <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
        <span>FRAME</span>
        <span className="text-slate-300 font-semibold">{formattedFrame}/240</span>
      </div>

      <div className="w-px h-3.5 bg-slate-800" />

      <div className="flex items-center gap-1 text-emerald-400 text-[10px]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>360° SCROLL SYNC</span>
      </div>
    </aside>
  );
}

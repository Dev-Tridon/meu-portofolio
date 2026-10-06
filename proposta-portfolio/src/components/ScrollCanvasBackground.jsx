import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 240;

const getFramePath = (index) => {
  const paddedIndex = String(index).padStart(4, '0');
  return `/frames/frame_${paddedIndex}.png`;
};

export default function ScrollCanvasBackground({ onRotationUpdate }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Array(TOTAL_FRAMES + 1));
  const loadedCountRef = useRef(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isInitialReady, setIsInitialReady] = useState(false);

  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);
  const lastReportedFrameRef = useRef(1);
  const rafRef = useRef(null);

  // 1. Carregamento e decodificação otimizada de alta performance
  useEffect(() => {
    let isCancelled = false;

    const loadImage = async (index) => {
      if (imagesRef.current[index]) {
        return imagesRef.current[index];
      }

      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFramePath(index);
        
        img.onload = async () => {
          if (!isCancelled) {
            try {
              if ('decode' in img) {
                await img.decode();
              }
            } catch (e) {
              // Decode fallback gracioso se o browser cancelar decode de background
            }
            imagesRef.current[index] = img;
            loadedCountRef.current += 1;
            setLoadProgress(Math.round((loadedCountRef.current / TOTAL_FRAMES) * 100));

            if (index === 1) {
              setIsInitialReady(true);
            }
          }
          resolve(img);
        };

        img.onerror = () => resolve(null);
      });
    };

    // Estratégia de priorização em 3 fases para resposta instantânea
    const loadAllFrames = async () => {
      // Fase 1: Carrega o quadro 1 e exibe imediatamente
      await loadImage(1);
      if (isCancelled) return;

      // Fase 2: Carrega quadros-chave (a cada 4) para scroll fluido mesmo durante download
      const keyframeIndices = [];
      for (let i = 2; i <= TOTAL_FRAMES; i += 4) {
        keyframeIndices.push(i);
      }
      
      // Carrega em lotes concorrentes para não travar a fila de rede
      const BATCH_SIZE = 8;
      for (let i = 0; i < keyframeIndices.length; i += BATCH_SIZE) {
        if (isCancelled) return;
        const batch = keyframeIndices.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(loadImage));
      }

      // Fase 3: Carrega todos os quadros restantes
      const remainingIndices = [];
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (!imagesRef.current[i]) {
          remainingIndices.push(i);
        }
      }

      for (let i = 0; i < remainingIndices.length; i += BATCH_SIZE) {
        if (isCancelled) return;
        const batch = remainingIndices.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(loadImage));
      }
    };

    loadAllFrames();

    return () => {
      isCancelled = true;
    };
  }, []);

  // 2. Rastreamento fluido de scroll com suporte a ResizeObserver
  useEffect(() => {
    const calculateTargetFrame = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollFraction = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // Mapeamento preciso de 1 a 240 quadros
      const targetFrame = 1 + scrollFraction * (TOTAL_FRAMES - 1);
      targetFrameRef.current = targetFrame;
    };

    const handleScroll = () => {
      calculateTargetFrame();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateTargetFrame();

    // Recalcula limites quando a página redimensiona ou o conteúdo muda
    const resizeObserver = new ResizeObserver(() => {
      calculateTargetFrame();
    });
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  // 3. Loop de renderização Canvas com LERP inercial ultra-suave
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: false });

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Desenho com ajuste perfeito 'object-fit: cover' centralizado
    const renderFrame = (img) => {
      if (!img || !ctx || !canvas) return;

      const cWidth = canvas.width;
      const cHeight = canvas.height;

      const imgWidth = img.naturalWidth || 1920;
      const imgHeight = img.naturalHeight || 1080;

      const canvasRatio = cWidth / cHeight;
      const imgRatio = imgWidth / imgHeight;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = cWidth;
        drawHeight = cWidth / imgRatio;
        offsetX = 0;
        offsetY = (cHeight - drawHeight) / 2;
      } else {
        drawHeight = cHeight;
        drawWidth = cHeight * imgRatio;
        offsetX = (cWidth - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Encontra o quadro carregado mais próximo se o alvo ainda estiver em download
    const getClosestLoadedImage = (targetIndex) => {
      const rounded = Math.round(targetIndex);
      if (imagesRef.current[rounded]) return imagesRef.current[rounded];

      for (let offset = 1; offset < 30; offset++) {
        if (rounded - offset >= 1 && imagesRef.current[rounded - offset]) {
          return imagesRef.current[rounded - offset];
        }
        if (rounded + offset <= TOTAL_FRAMES && imagesRef.current[rounded + offset]) {
          return imagesRef.current[rounded + offset];
        }
      }
      return imagesRef.current[1] || null;
    };

    const animate = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      
      // Suavização LERP contínua
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.095;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const imgToDraw = getClosestLoadedImage(currentFrameRef.current);
      if (imgToDraw) {
        renderFrame(imgToDraw);
      }

      // Sincroniza HUD de Rotação em tempo real com a física da animação
      const currentFrameRounded = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentFrameRef.current)));
      if (onRotationUpdate && currentFrameRounded !== lastReportedFrameRef.current) {
        lastReportedFrameRef.current = currentFrameRounded;
        const progress = (currentFrameRef.current - 1) / (TOTAL_FRAMES - 1);
        const degrees = Math.round(progress * 360);
        onRotationUpdate({
          degrees,
          frame: currentFrameRounded,
          progress: Math.max(0, Math.min(1, progress)),
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onRotationUpdate]);

  return (
    <>
      {/* Canvas Fullscreen Fixo no Fundo de Tela com Alta Visibilidade */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* Vinheta Sutil de Transparência que Preserva o Fundo Animado */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(2, 6, 23, 0.05) 0%, rgba(2, 6, 23, 0.4) 70%, rgba(2, 6, 23, 0.75) 100%),
            linear-gradient(to bottom, rgba(2, 6, 23, 0.25) 0%, transparent 25%, transparent 75%, rgba(2, 6, 23, 0.75) 100%)
          `
        }}
      />

      {/* Indicador Elegante de Progresso de Carregamento de Quadros 3D */}
      {loadProgress < 100 && (
        <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none bg-slate-950/80 backdrop-blur-md">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-300 ease-out shadow-sm shadow-emerald-500/50"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
      )}
    </>
  );
}


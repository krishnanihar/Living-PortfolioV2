'use client';

import React, { useRef, useEffect, useState } from 'react';

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface MetaballsProps {
  blobCount?: number;
  blobSize?: number;
  speed?: number;
}

export default function Metaballs({
  blobCount = 12,
  blobSize = 80,
  speed = 0.5
}: MetaballsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobsRef = useRef<Blob[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize blobs
    const initBlobs = () => {
      blobsRef.current = [];
      const colors = [
        '#6366F1', // Indigo
        '#8B5CF6', // Purple
        '#EC4899', // Pink
        '#F59E0B', // Amber
        '#10B981', // Green
        '#3B82F6'  // Blue
      ];

      for (let i = 0; i < blobCount; i++) {
        blobsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: blobSize + Math.random() * 40,
          color: colors[i % colors.length]
        });
      }
    };
    initBlobs();

    // Create offline canvas for blob pre-rendering
    const blobCanvas = document.createElement('canvas');
    const blobSize = 200;
    blobCanvas.width = blobSize;
    blobCanvas.height = blobSize;
    const blobCtx = blobCanvas.getContext('2d')!;

    // Pre-render radial gradient blob
    const gradient = blobCtx.createRadialGradient(
      blobSize / 2, blobSize / 2, 0,
      blobSize / 2, blobSize / 2, blobSize / 2
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    blobCtx.fillStyle = gradient;
    blobCtx.fillRect(0, 0, blobSize, blobSize);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        isActive: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // FPS monitoring
    let frameCount = 0;
    let lastTime = performance.now();

    // Animation loop
    const animate = () => {
      const currentTime = performance.now();
      frameCount++;

      if (currentTime >= lastTime + 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = currentTime;
      }

      // Clear canvas
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw blobs
      ctx.globalCompositeOperation = 'lighter';

      blobsRef.current.forEach(blob => {
        // Mouse attraction
        if (mouseRef.current.isActive) {
          const dx = mouseRef.current.x - blob.x;
          const dy = mouseRef.current.y - blob.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const force = (1 - distance / 200) * 0.5;
            blob.vx += (dx / distance) * force * 0.1;
            blob.vy += (dy / distance) * force * 0.1;
          }
        }

        // Update position
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Bounce off edges
        if (blob.x < -50) blob.x = canvas.width + 50;
        if (blob.x > canvas.width + 50) blob.x = -50;
        if (blob.y < -50) blob.y = canvas.height + 50;
        if (blob.y > canvas.height + 50) blob.y = -50;

        // Apply velocity damping
        blob.vx *= 0.99;
        blob.vy *= 0.99;

        // Draw blob with color
        ctx.save();
        ctx.translate(blob.x - blobSize / 2, blob.y - blobSize / 2);

        // Apply color tint
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = blob.color;

        // Draw pre-rendered blob
        const scale = blob.radius / (blobSize / 2);
        ctx.scale(scale, scale);
        ctx.drawImage(blobCanvas, 0, 0);

        ctx.restore();
      });

      // Apply blur and contrast to create metaball effect
      ctx.filter = 'blur(40px) contrast(25)';
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(canvas, 0, 0);

      // Reset filter
      ctx.filter = 'none';

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [blobCount, blobSize, speed]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          background: '#0A0A0A'
        }}
      />

      {/* FPS Display */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        padding: '0.5rem 1rem',
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '8px',
        color: fps >= 55 ? '#4ade80' : fps >= 30 ? '#fbbf24' : '#ef4444',
        fontFamily: 'monospace',
        fontSize: '0.75rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {fps} FPS
      </div>

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        pointerEvents: 'none',
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: '0.875rem'
      }}>
        Move mouse to attract liquid blobs
      </div>
    </div>
  );
}

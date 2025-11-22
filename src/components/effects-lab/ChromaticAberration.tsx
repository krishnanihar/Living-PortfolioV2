'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function ChromaticAberration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [fps, setFps] = useState(60);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create sample content (grid pattern)
    const gridCanvas = document.createElement('canvas');
    gridCanvas.width = 1024;
    gridCanvas.height = 1024;
    const ctx = gridCanvas.getContext('2d')!;

    // Draw interesting pattern
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, 1024, 1024);

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 1024; i += 64) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 1024);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1024, i);
      ctx.stroke();
    }

    // Circles
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const r = Math.random() * 100 + 50;
      const hue = Math.random() * 360;

      ctx.fillStyle = `hsla(${hue}, 70%, 60%, 0.3)`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Text
    ctx.font = 'bold 120px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.textAlign = 'center';
    ctx.fillText('ABERRATION', 512, 512);

    const gridTexture = new THREE.CanvasTexture(gridCanvas);

    // Chromatic aberration shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: gridTexture },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_strength: { value: 0.0 },
        u_time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 u_mouse;
        uniform float u_strength;
        uniform float u_time;
        varying vec2 vUv;

        void main() {
          // Direction from mouse
          vec2 dir = vUv - u_mouse;
          float dist = length(dir);

          // Radial distortion strength based on distance from mouse
          float strength = u_strength * (1.0 - smoothstep(0.0, 0.5, dist));

          // Animated pulse
          float pulse = sin(u_time * 2.0) * 0.5 + 0.5;
          strength *= (0.7 + pulse * 0.3);

          // Sample RGB channels with offset
          float offset = strength * 0.02;

          float r = texture2D(tDiffuse, vUv + dir * offset * 1.2).r;
          float g = texture2D(tDiffuse, vUv).g;
          float b = texture2D(tDiffuse, vUv - dir * offset * 1.2).b;

          // Add subtle chromatic glow
          float glow = smoothstep(0.5, 0.0, dist) * strength;

          gl_FragColor = vec4(
            r + glow * 0.1,
            g,
            b + glow * 0.2,
            1.0
          );
        }
      `
    });

    // Create full-screen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse tracking
    let targetStrength = 0;
    let currentStrength = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1 - (e.clientY - rect.top) / rect.height
      };
      targetStrength = 1.0;
    };

    const handleMouseLeave = () => {
      targetStrength = 0.0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Handle resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // FPS tracking
    let frameCount = 0;
    let lastTime = performance.now();

    // Animation loop
    const animate = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = currentTime;
      }

      // Smooth strength transition
      currentStrength += (targetStrength - currentStrength) * 0.1;

      // Update uniforms
      material.uniforms.u_mouse.value.set(mouseRef.current.x, mouseRef.current.y);
      material.uniforms.u_strength.value = currentStrength;
      material.uniforms.u_time.value = currentTime * 0.001;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      gridTexture.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
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
        border: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 10
      }}>
        {fps} FPS
      </div>

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, calc(-50% - 120px))',
        textAlign: 'center',
        pointerEvents: 'none',
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: '0.875rem',
        zIndex: 10
      }}>
        Move your mouse to create RGB split effect
      </div>
    </div>
  );
}

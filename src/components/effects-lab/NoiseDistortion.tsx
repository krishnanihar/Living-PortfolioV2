'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function NoiseDistortion() {
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

    // Create gradient texture for background
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 1024;
    textureCanvas.height = 1024;
    const ctx = textureCanvas.getContext('2d')!;

    // Radial gradient background
    const gradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 700);
    gradient.addColorStop(0, '#1E1B4B');
    gradient.addColorStop(0.5, '#312E81');
    gradient.addColorStop(1, '#0A0A0A');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);

    // Add grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 1024; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 1024);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1024, i);
      ctx.stroke();
    }

    // Add text
    ctx.font = 'bold 100px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.textAlign = 'center';
    ctx.fillText('NOISE', 512, 400);
    ctx.fillText('DISTORTION', 512, 520);

    const texture = new THREE.CanvasTexture(textureCanvas);

    // Simplex noise GLSL function
    const simplexNoise = `
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);

        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;

        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));

        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);

        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);

        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
    `;

    // Noise distortion shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: texture },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_time: { value: 0 },
        u_distortion: { value: 0.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        ${simplexNoise}

        uniform sampler2D tDiffuse;
        uniform vec2 u_mouse;
        uniform float u_time;
        uniform float u_distortion;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;

          // Distance from mouse
          float dist = distance(uv, u_mouse);

          // Create noise-based distortion around mouse
          if (dist < 0.4) {
            float influence = (1.0 - dist / 0.4) * u_distortion;

            // Multi-octave noise for organic distortion
            float noise1 = snoise(vec3(uv * 5.0, u_time * 0.2));
            float noise2 = snoise(vec3(uv * 10.0, u_time * 0.3)) * 0.5;
            float noise3 = snoise(vec3(uv * 20.0, u_time * 0.4)) * 0.25;

            float noise = noise1 + noise2 + noise3;

            // Circular wave distortion
            float wave = sin(dist * 20.0 - u_time * 2.0) * 0.01;

            // Apply distortion
            vec2 distortion = vec2(
              noise * influence * 0.05,
              noise * influence * 0.05
            );

            distortion += wave * influence;

            uv += distortion;
          }

          // Sample texture with distorted UVs
          vec3 color = texture2D(tDiffuse, uv).rgb;

          // Add grain texture
          float grain = snoise(vec3(uv * 100.0, u_time)) * 0.05;
          color += grain * u_distortion;

          gl_FragColor = vec4(color, 1.0);
        }
      `
    });

    // Create full-screen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse tracking
    let targetDistortion = 0;
    let currentDistortion = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1 - (e.clientY - rect.top) / rect.height
      };
      targetDistortion = 1.0;
    };

    const handleMouseLeave = () => {
      targetDistortion = 0.0;
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

      // Smooth distortion transition
      currentDistortion += (targetDistortion - currentDistortion) * 0.1;

      // Update uniforms
      material.uniforms.u_mouse.value.set(mouseRef.current.x, mouseRef.current.y);
      material.uniforms.u_time.value = currentTime * 0.001;
      material.uniforms.u_distortion.value = currentDistortion;

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
      texture.dispose();
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
        transform: 'translate(-50%, calc(-50% - 140px))',
        textAlign: 'center',
        pointerEvents: 'none',
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: '0.875rem',
        zIndex: 10
      }}>
        Move mouse to create wavy distortions
      </div>
    </div>
  );
}

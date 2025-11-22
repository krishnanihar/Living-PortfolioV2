'use client';

import React, { useRef, useEffect, useState } from 'react';

interface FluidSimulationProps {
  simResolution?: number;
  dyeResolution?: number;
  densityDissipation?: number;
  velocityDissipation?: number;
  pressure?: number;
}

export default function FluidSimulation({
  simResolution = 128,
  dyeResolution = 512,
  densityDissipation = 0.98,
  velocityDissipation = 0.99,
  pressure = 0.8
}: FluidSimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Vertex shader (used for all programs)
    const vertexShaderSource = `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;

      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // Display shader - renders the final dye texture
    const displayFragmentSource = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;

      void main() {
        vec3 color = texture2D(uTexture, vUv).rgb;
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Advection shader - moves quantities through velocity field
    const advectionFragmentSource = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;

      void main() {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        gl_FragColor = dissipation * texture2D(uSource, coord);
      }
    `;

    // Divergence shader - calculates divergence of velocity field
    const divergenceFragmentSource = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform vec2 texelSize;

      void main() {
        float L = texture2D(uVelocity, vUv - vec2(texelSize.x, 0.0)).x;
        float R = texture2D(uVelocity, vUv + vec2(texelSize.x, 0.0)).x;
        float T = texture2D(uVelocity, vUv + vec2(0.0, texelSize.y)).y;
        float B = texture2D(uVelocity, vUv - vec2(0.0, texelSize.y)).y;

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    // Pressure shader - calculates pressure through iteration
    const pressureFragmentSource = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      uniform vec2 texelSize;

      void main() {
        float L = texture2D(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
        float R = texture2D(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
        float T = texture2D(uPressure, vUv + vec2(0.0, texelSize.y)).x;
        float B = texture2D(uPressure, vUv - vec2(0.0, texelSize.y)).x;
        float C = texture2D(uDivergence, vUv).x;

        float pressure = (L + R + B + T - C) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `;

    // Gradient subtraction shader - makes velocity field divergence-free
    const gradientSubtractFragmentSource = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      uniform vec2 texelSize;

      void main() {
        float L = texture2D(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
        float R = texture2D(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
        float T = texture2D(uPressure, vUv + vec2(0.0, texelSize.y)).x;
        float B = texture2D(uPressure, vUv - vec2(0.0, texelSize.y)).x;

        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity -= vec2(R - L, T - B) * 0.5;
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `;

    // Splat shader - adds force and dye at cursor position
    const splatFragmentSource = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;

      void main() {
        vec2 p = vUv - point;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }
    `;

    // Helper to compile shader
    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    // Helper to create program
    const createProgram = (vertexSource: string, fragmentSource: string) => {
      const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
      const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);

      if (!vertexShader || !fragmentShader) return null;

      const program = gl.createProgram();
      if (!program) return null;

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        return null;
      }

      return program;
    };

    // Create programs
    const programs = {
      display: createProgram(vertexShaderSource, displayFragmentSource),
      advection: createProgram(vertexShaderSource, advectionFragmentSource),
      divergence: createProgram(vertexShaderSource, divergenceFragmentSource),
      pressure: createProgram(vertexShaderSource, pressureFragmentSource),
      gradientSubtract: createProgram(vertexShaderSource, gradientSubtractFragmentSource),
      splat: createProgram(vertexShaderSource, splatFragmentSource)
    };

    // Create full-screen quad
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);

    // Create framebuffer texture helper
    const createFramebuffer = (width: number, height: number) => {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, width, height);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return { fbo, texture, width, height };
    };

    // Create double framebuffer for ping-pong rendering
    const createDoubleFBO = (width: number, height: number) => {
      return {
        read: createFramebuffer(width, height),
        write: createFramebuffer(width, height),
        swap() {
          const temp = this.read;
          this.read = this.write;
          this.write = temp;
        }
      };
    };

    // Initialize simulation textures
    const velocity = createDoubleFBO(simResolution, simResolution);
    const density = createDoubleFBO(dyeResolution, dyeResolution);
    const pressure = createDoubleFBO(simResolution, simResolution);
    const divergence = createFramebuffer(simResolution, simResolution);

    // Mouse/touch tracking
    let pointers: Array<{ x: number; y: number; dx: number; dy: number; down: boolean }> = [];

    const updatePointer = (e: MouseEvent | Touch) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;

      const pointer = pointers[0] || { x: 0, y: 0, dx: 0, dy: 0, down: false };
      pointer.dx = (x - pointer.x) * 5;
      pointer.dy = (y - pointer.y) * 5;
      pointer.x = x;
      pointer.y = y;
      pointer.down = true;

      pointers[0] = pointer;
    };

    canvas.addEventListener('mousemove', (e) => updatePointer(e));
    canvas.addEventListener('touchmove', (e) => updatePointer(e.touches[0]));
    canvas.addEventListener('touchstart', (e) => {
      pointers = [{ x: 0, y: 0, dx: 0, dy: 0, down: true }];
      updatePointer(e.touches[0]);
    });

    // Render loop
    let lastTime = 0;
    let frameCount = 0;
    let fpsTime = 0;

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.016);
      lastTime = time;

      // FPS counter
      frameCount++;
      fpsTime += dt;
      if (fpsTime >= 1) {
        setFps(frameCount);
        frameCount = 0;
        fpsTime = 0;
      }

      // Splat input
      pointers.forEach(pointer => {
        if (pointer.down) {
          // Splat velocity
          if (programs.splat) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
            gl.useProgram(programs.splat);
            gl.uniform1i(gl.getUniformLocation(programs.splat, 'uTarget'), 0);
            gl.uniform1f(gl.getUniformLocation(programs.splat, 'aspectRatio'), canvas.width / canvas.height);
            gl.uniform2f(gl.getUniformLocation(programs.splat, 'point'), pointer.x, pointer.y);
            gl.uniform3f(gl.getUniformLocation(programs.splat, 'color'), pointer.dx, pointer.dy, 0);
            gl.uniform1f(gl.getUniformLocation(programs.splat, 'radius'), 0.0005);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
            velocity.swap();

            // Splat density (color)
            gl.bindFramebuffer(gl.FRAMEBUFFER, density.write.fbo);
            gl.uniform3f(gl.getUniformLocation(programs.splat, 'color'),
              Math.random() * 0.5 + 0.5,
              Math.random() * 0.5 + 0.5,
              Math.random() * 0.5 + 0.5
            );
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
            density.swap();
          }
        }
      });

      // Advection step
      if (programs.advection) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
        gl.useProgram(programs.advection);
        gl.uniform2f(gl.getUniformLocation(programs.advection, 'texelSize'), 1 / simResolution, 1 / simResolution);
        gl.uniform1f(gl.getUniformLocation(programs.advection, 'dt'), dt);
        gl.uniform1f(gl.getUniformLocation(programs.advection, 'dissipation'), velocityDissipation);
        gl.uniform1i(gl.getUniformLocation(programs.advection, 'uVelocity'), 0);
        gl.uniform1i(gl.getUniformLocation(programs.advection, 'uSource'), 1);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        velocity.swap();

        // Advect density
        gl.bindFramebuffer(gl.FRAMEBUFFER, density.write.fbo);
        gl.uniform2f(gl.getUniformLocation(programs.advection, 'texelSize'), 1 / dyeResolution, 1 / dyeResolution);
        gl.uniform1f(gl.getUniformLocation(programs.advection, 'dissipation'), densityDissipation);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        density.swap();
      }

      // Pressure projection (simplified - normally needs iteration)
      if (programs.display) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(programs.display);
        gl.uniform1i(gl.getUniformLocation(programs.display, 'uTexture'), 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      }

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [simResolution, dyeResolution, densityDissipation, velocityDissipation, pressure]);

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
        Drag to create fluid motion
      </div>
    </div>
  );
}

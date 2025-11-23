// GPGPU Pattern Particle Shaders
// Vertex and fragment shaders for GPU-accelerated pattern-forming particles

export const gpgpuVertexShader = /* glsl */ `
// GPGPU Pattern Particles - Vertex Shader
uniform float uTime;
uniform float uSize;
uniform float uScrollProgress;
uniform float uIntroPhase; // NEW: 0.0 = chaos, 0.0-1.0 = converge, 2.0 = scroll

attribute vec3 velocity;
attribute vec3 targetPosition;
attribute float randomSeed;
attribute float lifetime;

varying vec3 vVelocity;
varying float vSpeed;
varying float vLifetime;
varying float vDepth;
varying float vIntroPhase; // NEW: Pass to fragment shader

void main() {
  vVelocity = velocity;
  vSpeed = length(velocity);
  vLifetime = lifetime;
  vIntroPhase = uIntroPhase; // NEW

  vec3 pos = position;

  // Transform position
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vDepth = -mvPosition.z;

  // Size attenuation based on depth and speed
  // Near = large, far = small
  // Fast = larger (more energy)
  float baseSize = uSize * (0.8 + vSpeed * 0.4);
  float sizeAttenuation = 180.0 / max(vDepth, 75.0);
  gl_PointSize = clamp(baseSize * sizeAttenuation, 0.5, 5.0);

  // Larger particles during chaos phase for impact
  if (uIntroPhase < 1.0) {
    gl_PointSize *= 1.3;
  }

  // Pulse effect
  float pulse = 1.0 + sin(uTime * 2.0 + randomSeed * 6.28) * 0.1;
  gl_PointSize *= pulse;

  gl_Position = projectionMatrix * mvPosition;
}
`;

export const gpgpuFragmentShader = /* glsl */ `
// GPGPU Pattern Particles - Fragment Shader
uniform float uTime;
uniform vec3 uColorSlow;   // Blue
uniform vec3 uColorMedium; // Purple
uniform vec3 uColorFast;   // Pink

varying vec3 vVelocity;
varying float vSpeed;
varying float vLifetime;
varying float vDepth;
varying float vIntroPhase; // NEW

void main() {
  // Circular particle shape
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);

  // Discard pixels outside circle
  if (dist > 0.5) discard;

  // === COLOR CALCULATION ===

  // Chaos phase: Rainbow cycling based on speed + time
  vec3 chaosColor = vec3(
    sin(vSpeed * 3.0 + uTime) * 0.5 + 0.5,
    sin(vSpeed * 3.0 + uTime + 2.094) * 0.5 + 0.5,  // +120°
    sin(vSpeed * 3.0 + uTime + 4.189) * 0.5 + 0.5   // +240°
  );

  // Branded gradient (normal behavior)
  vec3 brandedGradient;
  float normalizedSpeed = clamp(vSpeed / 0.8, 0.0, 1.0);
  if (normalizedSpeed < 0.5) {
    // Blue → Purple
    brandedGradient = mix(uColorSlow, uColorMedium, normalizedSpeed * 2.0);
  } else {
    // Purple → Pink
    brandedGradient = mix(uColorMedium, uColorFast, (normalizedSpeed - 0.5) * 2.0);
  }

  // Blend based on intro phase
  vec3 color;
  if (vIntroPhase < 1.0) {
    // Chaos → Converge transition (0.0 → 1.0)
    color = mix(chaosColor, brandedGradient, vIntroPhase);
  } else {
    // Converge → Scroll (stay branded)
    color = brandedGradient;
  }

  // Radial gradient (bright center → glow edge)
  float radialGradient = 1.0 - smoothstep(0.0, 0.5, dist);
  radialGradient = pow(radialGradient, 2.0);

  // Outer glow
  float glow = exp(-dist * 4.0) * 0.4;

  // Add glow to color for luminosity
  vec3 finalColor = color * (1.0 + glow);

  // Alpha with lifetime fade
  float alpha = radialGradient * vLifetime * 0.8;

  // Depth-based fade (far particles dimmer)
  alpha *= 1.0 - clamp((vDepth - 100.0) / 300.0, 0.0, 0.7);

  gl_FragColor = vec4(finalColor, alpha);
}
`;

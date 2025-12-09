// GPGPU Pattern Particle Shaders
// Vertex and fragment shaders for GPU-accelerated pattern-forming particles

export const gpgpuVertexShader = /* glsl */ `
// GPGPU Pattern Particles - Vertex Shader (Single Ring with Blended Colors)
uniform float uTime;
uniform float uSize;
uniform float uScrollProgress;

attribute vec3 velocity;
attribute vec3 targetPosition;
attribute float randomSeed;
attribute float lifetime;

varying vec3 vVelocity;
varying float vSpeed;
varying float vLifetime;
varying float vDepth;

void main() {
  vVelocity = velocity;
  vSpeed = length(velocity);
  vLifetime = lifetime;

  vec3 pos = position;

  // Transform position
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vDepth = -mvPosition.z;

  // Size attenuation based on depth and speed
  // Near = large, far = small
  // Fast = larger (more energy)
  float baseSize = uSize * (1.0 + vSpeed * 0.6);
  float sizeAttenuation = 240.0 / max(vDepth, 60.0);
  gl_PointSize = clamp(baseSize * sizeAttenuation, 1.0, 8.0);

  // Pulse effect
  float pulse = 1.0 + sin(uTime * 2.5 + randomSeed * 6.28) * 0.15;
  gl_PointSize *= pulse;

  gl_Position = projectionMatrix * mvPosition;
}
`;

export const gpgpuFragmentShader = /* glsl */ `
// GPGPU Pattern Particles - Fragment Shader (Single Ring with Blended Palettes)
uniform float uTime;
uniform float uAlphaMultiplier; // Theme-aware alpha (1.0 dark, 2.5 light)
// Cool palette
uniform vec3 uColorSlowCool;    // Deep Blue
uniform vec3 uColorMediumCool;  // Cyan
uniform vec3 uColorFastCool;    // Near White
// Warm palette
uniform vec3 uColorSlowWarm;    // Blue
uniform vec3 uColorMediumWarm;  // Purple
uniform vec3 uColorFastWarm;    // Pink

varying vec3 vVelocity;
varying float vSpeed;
varying float vLifetime;
varying float vDepth;

void main() {
  // Circular particle shape
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);

  // Discard pixels outside circle
  if (dist > 0.5) discard;

  // === BLENDED COLOR CALCULATION ===
  float normalizedSpeed = clamp(vSpeed / 0.8, 0.0, 1.0);

  // Cool palette gradient (Deep Blue → Cyan → White)
  vec3 coolColor;
  if (normalizedSpeed < 0.5) {
    coolColor = mix(uColorSlowCool, uColorMediumCool, normalizedSpeed * 2.0);
  } else {
    coolColor = mix(uColorMediumCool, uColorFastCool, (normalizedSpeed - 0.5) * 2.0);
  }

  // Warm palette gradient (Blue → Purple → Pink)
  vec3 warmColor;
  if (normalizedSpeed < 0.5) {
    warmColor = mix(uColorSlowWarm, uColorMediumWarm, normalizedSpeed * 2.0);
  } else {
    warmColor = mix(uColorMediumWarm, uColorFastWarm, (normalizedSpeed - 0.5) * 2.0);
  }

  // Blend both palettes 50/50 for unique colors
  // Result: Rich Blue (slow) → Teal-Purple (medium) → Pink-White (fast)
  vec3 color = mix(coolColor, warmColor, 0.5);

  // Radial gradient (bright center → glow edge)
  float radialGradient = 1.0 - smoothstep(0.0, 0.5, dist);
  radialGradient = pow(radialGradient, 3.0); // Sharper falloff

  // Glow effect
  float glow = exp(-dist * 3.5) * 0.6;

  // Add glow to color for luminosity
  vec3 finalColor = color * (1.0 + glow);

  // Alpha with lifetime fade and theme-aware multiplier
  float alpha = radialGradient * vLifetime * 0.95 * uAlphaMultiplier;

  // Softer depth-based fade
  alpha *= 1.0 - clamp((vDepth - 80.0) / 400.0, 0.0, 0.5);

  // Clamp alpha to valid range
  alpha = clamp(alpha, 0.0, 1.0);

  gl_FragColor = vec4(finalColor, alpha);
}
`;

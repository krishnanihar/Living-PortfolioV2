// GPGPU Pattern Particle Shaders
// Vertex and fragment shaders for GPU-accelerated pattern-forming particles

export const gpgpuVertexShader = /* glsl */ `
// GPGPU Pattern Particles - Vertex Shader
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
  float baseSize = uSize * (0.8 + vSpeed * 0.4);
  gl_PointSize = baseSize * (400.0 / max(vDepth, 1.0));

  // Pulse effect based on scroll progress
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

void main() {
  // Circular particle shape
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);

  // Discard pixels outside circle
  if (dist > 0.5) discard;

  // Velocity-based color
  // Slow (0-0.3): Blue
  // Medium (0.3-0.6): Purple
  // Fast (0.6+): Pink
  vec3 color;
  float normalizedSpeed = clamp(vSpeed / 0.8, 0.0, 1.0);

  if (normalizedSpeed < 0.5) {
    // Blue → Purple
    color = mix(uColorSlow, uColorMedium, normalizedSpeed * 2.0);
  } else {
    // Purple → Pink
    color = mix(uColorMedium, uColorFast, (normalizedSpeed - 0.5) * 2.0);
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

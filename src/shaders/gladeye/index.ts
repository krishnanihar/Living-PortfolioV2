// Export GLSL shaders as strings for Gladeye particle system

export const shimmerVertexShader = /* glsl */ `
// Gladeye-style shimmer vertex shader
uniform float time;
uniform float shimmerIntensity;
uniform float scrollProgress;
attribute float randomOffset;
attribute float twinklePhase;
varying float vTwinklePhase;
varying float vDepth;

void main() {
  vTwinklePhase = twinklePhase;

  vec3 pos = position;

  // Subtle shimmer: vertical oscillation
  pos.y += sin(time * 0.5 + randomOffset) * shimmerIntensity;

  // Transform position
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

  // Store depth for fragment shader
  vDepth = -mvPosition.z;

  // Size attenuation based on depth (near = large, far = small)
  // Base size increases with scroll progress
  float baseSize = 0.4 + scrollProgress * 1.6; // 0.4 -> 2.0
  gl_PointSize = baseSize * (300.0 / max(vDepth, 1.0));

  gl_Position = projectionMatrix * mvPosition;
}
`;

export const shimmerFragmentShader = /* glsl */ `
// White star-like twinkle fragment shader
uniform float time;
uniform vec3 color;
uniform float scrollProgress;
varying float vTwinklePhase;
varying float vDepth;

void main() {
  // Circular particle shape
  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r = dot(cxy, cxy);

  // Discard pixels outside circle
  if (r > 1.0) discard;

  // Twinkle effect (oscillating brightness)
  float twinkle = sin(time * 2.0 + vTwinklePhase) * 0.5 + 0.5;

  // Random sparkle variation
  float sparkle = fract(sin(vTwinklePhase * 12.9898) * 43758.5453);
  twinkle = mix(twinkle, 1.0, sparkle * 0.3);

  // Soft circular gradient (inner glow)
  float alpha = 1.0 - smoothstep(0.0, 1.0, r);

  // Exponential glow (outer halo)
  float glow = exp(-r * 3.5) * 0.4;

  // Add glow to white color for luminosity
  vec3 finalColor = color + vec3(glow);

  // Apply twinkle to alpha
  float finalAlpha = alpha * (0.6 + twinkle * 0.4);

  gl_FragColor = vec4(finalColor, finalAlpha);
}
`;

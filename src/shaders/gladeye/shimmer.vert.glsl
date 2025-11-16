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

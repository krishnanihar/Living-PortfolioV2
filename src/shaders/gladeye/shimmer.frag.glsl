// Gladeye-style twinkle fragment shader
uniform float time;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform vec3 color4;
uniform float scrollProgress;
varying float vTwinklePhase;
varying float vDepth;

// Get interpolated color based on scroll progress (4-stage transition)
vec3 getColor(float progress) {
  // Ensure progress is in range [0, 1]
  float p = clamp(progress, 0.0, 1.0);

  // 4-stage color system
  float stage = p * 3.0; // 0-3 range
  int idx = int(floor(stage));
  float blend = fract(stage);

  // Smooth interpolation between stages
  blend = smoothstep(0.0, 1.0, blend);

  if (idx == 0) {
    return mix(color1, color2, blend);
  } else if (idx == 1) {
    return mix(color2, color3, blend);
  } else {
    return mix(color3, color4, blend);
  }
}

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

  // Get color based on scroll progress
  vec3 color = getColor(scrollProgress);

  // Soft circular gradient (inner glow)
  float alpha = 1.0 - smoothstep(0.0, 1.0, r);

  // Exponential glow (outer halo)
  float glow = exp(-r * 3.5) * 0.4;

  // Add glow to color for luminosity
  vec3 finalColor = color + vec3(glow);

  // Apply twinkle to alpha
  float finalAlpha = alpha * (0.6 + twinkle * 0.4);

  gl_FragColor = vec4(finalColor, finalAlpha);
}

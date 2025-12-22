/**
 * Journey Page Shaders
 * Custom GLSL shaders for the 3D spatial timeline
 */

// ============================================
// STAR FIELD SHADER
// ============================================

export const starVertexShader = /* glsl */ `
  attribute float size;
  attribute vec3 color;

  varying vec3 vColor;
  varying float vSize;

  uniform float uTime;
  uniform float uPixelRatio;

  void main() {
    vColor = color;
    vSize = size;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    // Size attenuation
    float sizeAttenuation = 300.0 / -mvPosition.z;

    // Subtle twinkle based on position and time
    float twinkle = sin(uTime * 2.0 + position.x * 0.1 + position.y * 0.1) * 0.3 + 0.7;

    gl_PointSize = size * sizeAttenuation * uPixelRatio * twinkle;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const starFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vSize;

  void main() {
    // Circular point with soft edge
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);

    if (dist > 0.5) discard;

    // Soft glow falloff
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha = pow(alpha, 1.5);

    // Core brightness
    float core = 1.0 - smoothstep(0.0, 0.15, dist);
    vec3 color = vColor + core * 0.3;

    gl_FragColor = vec4(color, alpha * 0.8);
  }
`;

// ============================================
// CARD GLOW SHADER
// ============================================

export const cardGlowVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const cardGlowFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uTime;
  uniform float uActive;

  varying vec2 vUv;

  void main() {
    // Distance from center
    vec2 center = vUv - vec2(0.5);
    float dist = length(center) * 2.0;

    // Soft radial gradient
    float glow = 1.0 - smoothstep(0.0, 1.0, dist);
    glow = pow(glow, 2.0);

    // Pulse animation for active cards
    float pulse = sin(uTime * 2.0) * 0.15 + 0.85;
    float intensity = uIntensity * mix(1.0, pulse, uActive);

    // Outer ring glow
    float ring = smoothstep(0.6, 0.8, dist) * (1.0 - smoothstep(0.8, 1.0, dist));
    ring *= 0.5;

    // Combine effects
    float finalGlow = (glow + ring) * intensity;

    gl_FragColor = vec4(uColor * finalGlow, finalGlow * 0.7);
  }
`;

// ============================================
// NEBULA SHADER
// ============================================

export const nebulaVertexShader = /* glsl */ `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const nebulaFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uDensity;
  uniform float uOpacity;

  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;

  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
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

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

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

  void main() {
    // View-dependent effect for volumetric look
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float viewDot = abs(dot(viewDir, vNormal));

    // Multi-octave noise for cloud-like appearance
    float n = 0.0;
    n += snoise(vPosition * 0.008 + uTime * 0.02) * 0.5;
    n += snoise(vPosition * 0.016 - uTime * 0.015) * 0.25;
    n += snoise(vPosition * 0.032 + uTime * 0.01) * 0.125;
    n = n * 0.5 + 0.5; // Normalize to 0-1

    // Edge glow effect
    float edge = pow(1.0 - viewDot, 3.0);

    // Combine for final appearance
    float density = n * uDensity * (edge * 0.7 + 0.3);
    vec3 color = uColor * (1.0 + edge * 0.5);

    gl_FragColor = vec4(color, density * uOpacity);
  }
`;

// ============================================
// DUST PARTICLES SHADER
// ============================================

export const dustVertexShader = /* glsl */ `
  attribute float size;
  attribute float speed;

  varying float vAlpha;

  uniform float uTime;
  uniform float uPixelRatio;

  void main() {
    // Gentle floating motion
    vec3 pos = position;
    pos.y += sin(uTime * speed + position.x * 0.5) * 2.0;
    pos.x += cos(uTime * speed * 0.7 + position.z * 0.3) * 1.5;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Distance-based alpha
    float dist = -mvPosition.z;
    vAlpha = smoothstep(500.0, 100.0, dist) * 0.6;

    // Size with attenuation
    gl_PointSize = size * (200.0 / dist) * uPixelRatio;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const dustFragmentShader = /* glsl */ `
  varying float vAlpha;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);

    if (dist > 0.5) discard;

    float alpha = (1.0 - smoothstep(0.0, 0.5, dist)) * vAlpha;

    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
  }
`;

// ============================================
// CONNECTION LINE SHADER
// ============================================

export const lineVertexShader = /* glsl */ `
  varying float vProgress;

  attribute float progress;

  void main() {
    vProgress = progress;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const lineFragmentShader = /* glsl */ `
  uniform vec3 uColorStart;
  uniform vec3 uColorEnd;
  uniform float uScrollProgress;
  uniform float uTime;

  varying float vProgress;

  void main() {
    // Gradient along the line
    vec3 color = mix(uColorStart, uColorEnd, vProgress);

    // Animated dash pattern
    float dash = sin((vProgress - uTime * 0.1) * 100.0) * 0.5 + 0.5;

    // Fade based on scroll progress
    float scrollFade = smoothstep(vProgress - 0.1, vProgress, uScrollProgress);

    float alpha = dash * scrollFade * 0.4;

    gl_FragColor = vec4(color, alpha);
  }
`;

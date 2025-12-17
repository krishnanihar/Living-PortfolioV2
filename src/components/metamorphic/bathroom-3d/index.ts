// Bathroom 3D Exploded View Components
// Barrel exports for the bathroom visualization system

// Main components
export { BathroomScene } from './BathroomScene';

// Individual bathroom parts
export { OuterShell } from './components/OuterShell';
export { MetalFrame } from './components/MetalFrame';
export { MirrorAssembly } from './components/MirrorAssembly';
export { SinkBasin } from './components/SinkBasin';
export { TapWithEncoder } from './components/TapWithEncoder';
export { Electronics } from './components/Electronics';
export { Lighting } from './components/Lighting';

// Materials
export { WireframeMaterial, EdgeLines, WireframeBox, WireframeCylinder, WireframePlane } from './materials/WireframeMaterial';

// Annotations
export { FloatingLabel } from './annotations/FloatingLabel';

// Hooks
export { useExplodeAnimation, ExplodeDirections, shouldShowLabel, getLabelDelay } from './hooks/useExplodeAnimation';

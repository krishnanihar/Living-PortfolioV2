// Knowledge Graph Type Definitions
// For the 3D mind map hero section on the About page

export type NodeType = 'core' | 'domain' | 'skill' | 'project' | 'influence';

export interface KnowledgeNode {
  id: string;
  label: string;
  type: NodeType;
  size: number;           // Base size multiplier (1.0 = default)
  color: string;          // Hex color
  url?: string;           // For clickable nodes (projects)
  connections: string[];  // Array of connected node IDs
  description?: string;   // Tooltip/hover description
}

export interface KnowledgeEdge {
  source: string;         // Source node ID
  target: string;         // Target node ID
  strength: number;       // 0-1, affects visual weight and physics
}

export interface KnowledgeGraphData {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}

// Physics state for a single node
export interface NodePhysicsState {
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
}

// Physics configuration
export interface PhysicsConfig {
  repulsionStrength: number;   // How strongly nodes push apart
  attractionStrength: number;  // How strongly edges pull nodes together
  centeringStrength: number;   // How strongly nodes are pulled to center
  damping: number;             // Velocity decay (0-1, higher = more friction)
  maxVelocity: number;         // Speed limit
  minDistance: number;         // Minimum distance between nodes
}

// Interaction state
export interface GraphInteractionState {
  hoveredNode: string | null;
  selectedNode: string | null;
  connectedNodes: Set<string>;
}

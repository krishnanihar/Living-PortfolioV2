import { KnowledgeGraphData, KnowledgeNode, KnowledgeEdge } from '@/types/knowledge-graph';

// Color palette matching the design system
const colors = {
  brandRed: '#DA0E29',
  blue: '#3B82F6',
  purple: '#8B5CF6',
  pink: '#EC4899',
  green: '#10B981',
  orange: '#F59E0B',
  indigo: '#6366F1',
  cyan: '#06B6D4',
  neutral: '#94A3B8',
  neutralLight: '#CBD5E1',
};

// === NODES ===

// Core node - the center of the graph
const coreNode: KnowledgeNode = {
  id: 'nihar',
  label: 'Nihar',
  type: 'core',
  size: 2.5,
  color: colors.brandRed,
  connections: ['design-systems', 'product-design', 'frontend-dev', 'systems-thinking', 'data-viz', 'research'],
  description: 'Systems-thinking designer who ships in code',
};

// Domain nodes - major professional pillars
const domainNodes: KnowledgeNode[] = [
  {
    id: 'design-systems',
    label: 'Design Systems',
    type: 'domain',
    size: 1.4,
    color: colors.blue,
    connections: ['nihar', 'figma', 'design-tokens', 'component-libs', 'air-india'],
    description: 'Building scalable, consistent design languages',
  },
  {
    id: 'product-design',
    label: 'Product Design',
    type: 'domain',
    size: 1.3,
    color: colors.purple,
    connections: ['nihar', 'figma', 'user-research', 'psoriassist', 'mythos'],
    description: 'End-to-end product thinking and execution',
  },
  {
    id: 'frontend-dev',
    label: 'Frontend Dev',
    type: 'domain',
    size: 1.3,
    color: colors.pink,
    connections: ['nihar', 'react', 'typescript', 'nextjs', 'threejs', 'framer-motion'],
    description: 'Building interfaces that breathe',
  },
  {
    id: 'systems-thinking',
    label: 'Systems Thinking',
    type: 'domain',
    size: 1.2,
    color: colors.indigo,
    connections: ['nihar', 'geb', 'latent-space', 'data-viz'],
    description: 'Understanding interconnections and feedback loops',
  },
  {
    id: 'data-viz',
    label: 'Data Visualization',
    type: 'domain',
    size: 1.1,
    color: colors.green,
    connections: ['nihar', 'threejs', 'd3', 'air-india'],
    description: 'Making complex data understandable',
  },
  {
    id: 'research',
    label: 'Research',
    type: 'domain',
    size: 1.0,
    color: colors.cyan,
    connections: ['nihar', 'user-research', 'speculative-design', 'latent-space'],
    description: 'Speculative design and user research',
  },
];

// Skill nodes - specific competencies
const skillNodes: KnowledgeNode[] = [
  {
    id: 'react',
    label: 'React',
    type: 'skill',
    size: 0.8,
    color: colors.neutral,
    connections: ['frontend-dev', 'nextjs', 'air-india', 'psoriassist', 'mythos'],
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    type: 'skill',
    size: 0.75,
    color: colors.neutral,
    connections: ['frontend-dev', 'react', 'nextjs'],
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    type: 'skill',
    size: 0.7,
    color: colors.neutral,
    connections: ['frontend-dev', 'react', 'typescript'],
  },
  {
    id: 'threejs',
    label: 'Three.js',
    type: 'skill',
    size: 0.7,
    color: colors.neutral,
    connections: ['frontend-dev', 'data-viz', 'latent-space'],
  },
  {
    id: 'framer-motion',
    label: 'Framer Motion',
    type: 'skill',
    size: 0.6,
    color: colors.neutral,
    connections: ['frontend-dev', 'react'],
  },
  {
    id: 'figma',
    label: 'Figma',
    type: 'skill',
    size: 0.8,
    color: colors.neutral,
    connections: ['design-systems', 'product-design', 'air-india'],
  },
  {
    id: 'design-tokens',
    label: 'Design Tokens',
    type: 'skill',
    size: 0.6,
    color: colors.neutral,
    connections: ['design-systems', 'component-libs'],
  },
  {
    id: 'component-libs',
    label: 'Component Libraries',
    type: 'skill',
    size: 0.65,
    color: colors.neutral,
    connections: ['design-systems', 'react'],
  },
  {
    id: 'd3',
    label: 'D3.js',
    type: 'skill',
    size: 0.55,
    color: colors.neutral,
    connections: ['data-viz'],
  },
  {
    id: 'user-research',
    label: 'User Research',
    type: 'skill',
    size: 0.65,
    color: colors.neutral,
    connections: ['product-design', 'research', 'psoriassist'],
  },
  {
    id: 'speculative-design',
    label: 'Speculative Design',
    type: 'skill',
    size: 0.6,
    color: colors.neutral,
    connections: ['research', 'latent-space'],
  },
  // Additional frontend skills
  {
    id: 'tailwind',
    label: 'Tailwind CSS',
    type: 'skill',
    size: 0.65,
    color: colors.neutral,
    connections: ['frontend-dev', 'react'],
  },
  {
    id: 'webgl',
    label: 'WebGL',
    type: 'skill',
    size: 0.55,
    color: colors.neutral,
    connections: ['threejs', 'data-viz'],
  },
  {
    id: 'glsl',
    label: 'GLSL Shaders',
    type: 'skill',
    size: 0.5,
    color: colors.neutral,
    connections: ['webgl', 'threejs', 'latent-space'],
  },
  {
    id: 'gsap',
    label: 'GSAP',
    type: 'skill',
    size: 0.55,
    color: colors.neutral,
    connections: ['animation', 'frontend-dev'],
  },
  {
    id: 'animation',
    label: 'Animation Design',
    type: 'skill',
    size: 0.6,
    color: colors.neutral,
    connections: ['framer-motion', 'threejs'],
  },
  // Design skills
  {
    id: 'prototyping',
    label: 'Prototyping',
    type: 'skill',
    size: 0.6,
    color: colors.neutral,
    connections: ['figma', 'product-design', 'psoriassist'],
  },
  {
    id: 'visual-design',
    label: 'Visual Design',
    type: 'skill',
    size: 0.55,
    color: colors.neutral,
    connections: ['product-design', 'figma'],
  },
  {
    id: 'interaction-design',
    label: 'Interaction Design',
    type: 'skill',
    size: 0.6,
    color: colors.neutral,
    connections: ['product-design', 'animation'],
  },
  {
    id: 'micro-interactions',
    label: 'Micro-interactions',
    type: 'skill',
    size: 0.5,
    color: colors.neutral,
    connections: ['interaction-design', 'framer-motion'],
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    type: 'skill',
    size: 0.55,
    color: colors.neutral,
    connections: ['product-design', 'frontend-dev'],
  },
  // AI/ML skills
  {
    id: 'ai-ml',
    label: 'AI/ML',
    type: 'skill',
    size: 0.65,
    color: colors.neutral,
    connections: ['psoriassist', 'mythos', 'research'],
  },
  {
    id: 'prompt-engineering',
    label: 'Prompt Engineering',
    type: 'skill',
    size: 0.5,
    color: colors.neutral,
    connections: ['ai-ml', 'mythos'],
  },
  // Research skills
  {
    id: 'usability-testing',
    label: 'Usability Testing',
    type: 'skill',
    size: 0.55,
    color: colors.neutral,
    connections: ['user-research', 'psoriassist'],
  },
];

// Project nodes - clickable to case studies
const projectNodes: KnowledgeNode[] = [
  {
    id: 'air-india',
    label: 'Air India',
    type: 'project',
    size: 1.0,
    color: colors.neutralLight,
    url: '/work/air-india',
    connections: ['design-systems', 'data-viz', 'react', 'figma'],
    description: 'Design system for airline operations',
  },
  {
    id: 'psoriassist',
    label: 'PsoriAssist',
    type: 'project',
    size: 0.95,
    color: colors.neutralLight,
    url: '/work/psoriassist',
    connections: ['product-design', 'user-research', 'react'],
    description: 'AI-powered health management app',
  },
  {
    id: 'latent-space',
    label: 'Latent Space',
    type: 'project',
    size: 0.9,
    color: colors.neutralLight,
    url: '/work/latent-space',
    connections: ['systems-thinking', 'threejs', 'speculative-design', 'research'],
    description: 'Immersive narrative experience',
  },
  {
    id: 'mythos',
    label: 'mythOS',
    type: 'project',
    size: 0.85,
    color: colors.neutralLight,
    url: '/work/mythos',
    connections: ['product-design', 'react', 'ai-ml'],
    description: 'Gaming platform with clean architecture',
  },
  // Additional projects
  {
    id: 'living-portfolio',
    label: 'Living Portfolio',
    type: 'project',
    size: 0.9,
    color: colors.neutralLight,
    url: '/',
    connections: ['frontend-dev', 'threejs', 'micro-interactions', 'tailwind'],
    description: 'This portfolio - a breathing digital organism',
  },
  {
    id: 'metamorphic',
    label: 'Metamorphic Fractals',
    type: 'project',
    size: 0.8,
    color: colors.neutralLight,
    url: '/work/metamorphic-fractal-reflections',
    connections: ['touchdesigner', 'blender', 'research'],
    description: 'Immersive consciousness installation',
  },
];

// Tool nodes - specific software and platforms
const toolNodes: KnowledgeNode[] = [
  // Design tools
  {
    id: 'vscode',
    label: 'VS Code',
    type: 'tool',
    size: 0.5,
    color: colors.cyan,
    connections: ['frontend-dev', 'typescript'],
    description: 'Primary development environment',
  },
  {
    id: 'git',
    label: 'Git',
    type: 'tool',
    size: 0.5,
    color: colors.cyan,
    connections: ['frontend-dev'],
    description: 'Version control',
  },
  {
    id: 'github',
    label: 'GitHub',
    type: 'tool',
    size: 0.45,
    color: colors.cyan,
    connections: ['git'],
    description: 'Code collaboration',
  },
  {
    id: 'vercel',
    label: 'Vercel',
    type: 'tool',
    size: 0.45,
    color: colors.cyan,
    connections: ['nextjs'],
    description: 'Deployment platform',
  },
  // Creative tools
  {
    id: 'touchdesigner',
    label: 'TouchDesigner',
    type: 'tool',
    size: 0.5,
    color: colors.cyan,
    connections: ['data-viz', 'threejs'],
    description: 'Real-time visual programming',
  },
  {
    id: 'blender',
    label: 'Blender',
    type: 'tool',
    size: 0.5,
    color: colors.cyan,
    connections: ['threejs'],
    description: '3D modeling and animation',
  },
  {
    id: 'cursor',
    label: 'Cursor',
    type: 'tool',
    size: 0.45,
    color: colors.cyan,
    connections: ['vscode', 'ai-ml'],
    description: 'AI-powered IDE',
  },
  {
    id: 'notion',
    label: 'Notion',
    type: 'tool',
    size: 0.4,
    color: colors.cyan,
    connections: ['research'],
    description: 'Knowledge management',
  },
];

// Influence nodes - books, games, and thinkers
const influenceNodes: KnowledgeNode[] = [
  // Books
  {
    id: 'geb',
    label: 'Gödel, Escher, Bach',
    type: 'influence',
    size: 0.5,
    color: colors.orange,
    connections: ['systems-thinking'],
    description: 'Strange loops and self-reference',
  },
  {
    id: 'design-everyday',
    label: 'Design of Everyday Things',
    type: 'influence',
    size: 0.45,
    color: colors.orange,
    connections: ['product-design'],
    description: 'Foundational UX principles',
  },
  {
    id: 'refactoring-ui',
    label: 'Refactoring UI',
    type: 'influence',
    size: 0.45,
    color: colors.orange,
    connections: ['visual-design', 'tailwind'],
    description: 'Design for developers',
  },
  {
    id: 'speculative-everything',
    label: 'Speculative Everything',
    type: 'influence',
    size: 0.45,
    color: colors.orange,
    connections: ['speculative-design', 'latent-space'],
    description: 'Dunne & Raby critical design',
  },
  {
    id: 'thinking-fast-slow',
    label: 'Thinking Fast & Slow',
    type: 'influence',
    size: 0.4,
    color: colors.orange,
    connections: ['user-research', 'systems-thinking'],
    description: 'Cognitive biases in design',
  },
  // Games
  {
    id: 'baldurs-gate',
    label: "Baldur's Gate 3",
    type: 'influence',
    size: 0.5,
    color: colors.orange,
    connections: ['systems-thinking', 'research'],
    description: 'Narrative systems and player agency',
  },
  {
    id: 'disco-elysium',
    label: 'Disco Elysium',
    type: 'influence',
    size: 0.45,
    color: colors.orange,
    connections: ['systems-thinking'],
    description: 'Narrative systems design',
  },
  {
    id: 'control-game',
    label: 'Control',
    type: 'influence',
    size: 0.4,
    color: colors.orange,
    connections: ['visual-design'],
    description: 'Environmental storytelling',
  },
  // Thinkers
  {
    id: 'dieter-rams',
    label: 'Dieter Rams',
    type: 'influence',
    size: 0.45,
    color: colors.orange,
    connections: ['product-design', 'design-systems'],
    description: '10 Principles of Good Design',
  },
  {
    id: 'bret-victor',
    label: 'Bret Victor',
    type: 'influence',
    size: 0.5,
    color: colors.orange,
    connections: ['interaction-design', 'systems-thinking'],
    description: 'Inventing on principle',
  },
];

// Combine all nodes
const nodes: KnowledgeNode[] = [
  coreNode,
  ...domainNodes,
  ...skillNodes,
  ...projectNodes,
  ...toolNodes,
  ...influenceNodes,
];

// === EDGES ===
// Generate edges from node connections
function generateEdges(nodes: KnowledgeNode[]): KnowledgeEdge[] {
  const edges: KnowledgeEdge[] = [];
  const edgeSet = new Set<string>(); // To avoid duplicates

  nodes.forEach(node => {
    node.connections.forEach(targetId => {
      // Create unique edge key (sorted to avoid duplicates)
      const edgeKey = [node.id, targetId].sort().join('-');

      if (!edgeSet.has(edgeKey)) {
        edgeSet.add(edgeKey);

        // Determine edge strength based on node types
        let strength = 0.5;
        const targetNode = nodes.find(n => n.id === targetId);

        if (node.type === 'core' || targetNode?.type === 'core') {
          strength = 1.0; // Strong connection to core
        } else if (node.type === 'domain' || targetNode?.type === 'domain') {
          strength = 0.8; // Medium-strong for domain connections
        } else if (node.type === 'project' || targetNode?.type === 'project') {
          strength = 0.6; // Medium for project connections
        } else if (node.type === 'tool' || targetNode?.type === 'tool') {
          strength = 0.4; // Subtle for tool connections
        } else if (node.type === 'influence' || targetNode?.type === 'influence') {
          strength = 0.3; // Very subtle for influence connections
        }

        edges.push({
          source: node.id,
          target: targetId,
          strength,
        });
      }
    });
  });

  return edges;
}

// Export the complete graph data
export const knowledgeGraphData: KnowledgeGraphData = {
  nodes,
  edges: generateEdges(nodes),
};

// Export individual arrays for flexibility
export { nodes, domainNodes, skillNodes, projectNodes, toolNodes, influenceNodes };

// Helper to get node by ID
export function getNodeById(id: string): KnowledgeNode | undefined {
  return nodes.find(node => node.id === id);
}

// Helper to get connected nodes
export function getConnectedNodes(nodeId: string): KnowledgeNode[] {
  const node = getNodeById(nodeId);
  if (!node) return [];

  return node.connections
    .map(id => getNodeById(id))
    .filter((n): n is KnowledgeNode => n !== undefined);
}

// Helper to get edges for a node
export function getNodeEdges(nodeId: string): KnowledgeEdge[] {
  return knowledgeGraphData.edges.filter(
    edge => edge.source === nodeId || edge.target === nodeId
  );
}

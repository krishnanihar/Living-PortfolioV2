'use client';

import { motion } from 'framer-motion';

/**
 * MicroVisualization Props Interface
 * Each visualization is semantically connected to its card content
 */
interface MicroVisualizationProps {
  cardId: number;
  projectId: 'air-india' | 'cleara' | 'metamorphic' | 'latent-space';
  color: string; // RGB format: "99, 102, 241"
  isHovered: boolean;
  size?: 'main' | 'thumbnail';
}

// Animation variants matching codebase easing
const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
  }
};

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] }
  }
};

const staggerChildren = {
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } }
};

// ============================================================================
// AIR INDIA VISUALIZATIONS (Cards 1-6)
// ============================================================================

/** Card 1: Design Systems - Token Grid with connection lines */
function TokenGridViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';
  const gridSize = isMain ? 3 : 2;
  const cellSize = isMain ? 28 : 16;
  const gap = isMain ? 12 : 8;
  const totalSize = gridSize * cellSize + (gridSize - 1) * gap;
  const offset = (100 - totalSize) / 2;

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Grid cells */}
      {Array.from({ length: gridSize * gridSize }).map((_, i) => {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        const x = offset + col * (cellSize + gap);
        const y = offset + row * (cellSize + gap);
        return (
          <motion.rect
            key={i}
            x={x}
            y={y}
            width={cellSize}
            height={cellSize}
            rx={isMain ? 6 : 4}
            fill={`rgba(${color}, ${0.15 + (i * 0.08)})`}
            stroke={`rgba(${color}, 0.4)`}
            strokeWidth={1}
            variants={fadeInUp}
            style={{
              animation: isHovered ? `microPulse 2s ease-in-out ${i * 0.15}s infinite` : 'none'
            }}
          />
        );
      })}
      {/* Connection lines */}
      {isMain && (
        <>
          <motion.line
            x1={offset + cellSize / 2}
            y1={offset + cellSize}
            x2={offset + cellSize / 2}
            y2={offset + cellSize + gap}
            stroke={`rgba(${color}, 0.5)`}
            strokeWidth={1.5}
            variants={pathVariants}
          />
          <motion.line
            x1={offset + cellSize + gap}
            y1={offset + cellSize / 2}
            x2={offset + cellSize + gap + cellSize}
            y2={offset + cellSize / 2}
            stroke={`rgba(${color}, 0.5)`}
            strokeWidth={1.5}
            variants={pathVariants}
          />
        </>
      )}
    </motion.svg>
  );
}

/** Card 2: Data Visualization - Mini Bar Chart */
function BarChartViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';
  const bars = isMain ? [65, 85, 45, 70, 90] : [60, 80, 50];
  const barWidth = isMain ? 12 : 14;
  const gap = isMain ? 8 : 10;
  const totalWidth = bars.length * barWidth + (bars.length - 1) * gap;
  const startX = (100 - totalWidth) / 2;

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Grid lines */}
      {isMain && [20, 40, 60, 80].map((y) => (
        <motion.line
          key={y}
          x1={10}
          y1={y}
          x2={90}
          y2={y}
          stroke={`rgba(${color}, 0.1)`}
          strokeWidth={0.5}
          variants={pathVariants}
        />
      ))}
      {/* Bars */}
      {bars.map((height, i) => (
        <motion.rect
          key={i}
          x={startX + i * (barWidth + gap)}
          y={85 - height * 0.7}
          width={barWidth}
          height={height * 0.7}
          rx={isMain ? 3 : 2}
          fill={`rgba(${color}, ${0.4 + i * 0.12})`}
          variants={{
            hidden: { scaleY: 0, opacity: 0 },
            visible: {
              scaleY: 1,
              opacity: 1,
              transition: { duration: 0.5, delay: i * 0.1, ease: [0.32, 0.72, 0, 1] }
            }
          }}
          style={{ transformOrigin: 'bottom' }}
        />
      ))}
    </motion.svg>
  );
}

/** Card 3: Mobile Patterns - Dual Devices with bridge */
function DualDevicesViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* iOS Device */}
      <motion.rect
        x={isMain ? 15 : 20}
        y={25}
        width={isMain ? 25 : 20}
        height={isMain ? 50 : 40}
        rx={4}
        fill="none"
        stroke={`rgba(${color}, 0.6)`}
        strokeWidth={1.5}
        variants={pathVariants}
      />
      {isMain && (
        <motion.circle
          cx={27.5}
          cy={68}
          r={3}
          fill={`rgba(${color}, 0.3)`}
          variants={fadeInUp}
        />
      )}

      {/* Android Device */}
      <motion.rect
        x={isMain ? 60 : 60}
        y={25}
        width={isMain ? 25 : 20}
        height={isMain ? 50 : 40}
        rx={4}
        fill="none"
        stroke={`rgba(${color}, 0.6)`}
        strokeWidth={1.5}
        variants={pathVariants}
      />
      {isMain && (
        <motion.rect
          x={65}
          y={67}
          width={15}
          height={3}
          rx={1}
          fill={`rgba(${color}, 0.3)`}
          variants={fadeInUp}
        />
      )}

      {/* Bridge arc */}
      <motion.path
        d={isMain ? "M 40 50 Q 50 30 60 50" : "M 40 45 Q 50 32 60 45"}
        fill="none"
        stroke={`rgba(${color}, 0.5)`}
        strokeWidth={1.5}
        strokeDasharray={isHovered ? "0" : "4 4"}
        variants={pathVariants}
        style={{
          animation: isHovered ? 'dataFlow 2s linear infinite' : 'none'
        }}
      />
    </motion.svg>
  );
}

/** Card 4: IFE Experience - Seat-back screen with play button */
function IFEScreenViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Screen frame */}
      <motion.rect
        x={15}
        y={20}
        width={70}
        height={isMain ? 45 : 40}
        rx={4}
        fill={`rgba(${color}, 0.1)`}
        stroke={`rgba(${color}, 0.5)`}
        strokeWidth={1.5}
        variants={fadeInUp}
      />

      {/* Play button */}
      <motion.path
        d={isMain ? "M 45 35 L 45 52 L 60 43.5 Z" : "M 45 35 L 45 48 L 56 41.5 Z"}
        fill={`rgba(${color}, 0.6)`}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { duration: 0.4, delay: 0.3 } }
        }}
        style={{
          animation: isHovered ? 'microPulse 1.5s ease-in-out infinite' : 'none'
        }}
      />

      {/* Timeline bar */}
      {isMain && (
        <>
          <motion.rect
            x={20}
            y={72}
            width={60}
            height={4}
            rx={2}
            fill={`rgba(${color}, 0.15)`}
            variants={fadeInUp}
          />
          <motion.rect
            x={20}
            y={72}
            width={35}
            height={4}
            rx={2}
            fill={`rgba(${color}, 0.5)`}
            variants={{
              hidden: { width: 0 },
              visible: { width: 35, transition: { duration: 1, delay: 0.5 } }
            }}
          />
        </>
      )}
    </motion.svg>
  );
}

/** Card 5: Team Culture - Ascending Steps with avatars */
function TeamStepsViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';
  const steps = isMain ? 4 : 3;

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Steps */}
      {Array.from({ length: steps }).map((_, i) => (
        <motion.rect
          key={i}
          x={15 + i * (isMain ? 18 : 22)}
          y={75 - (i + 1) * (isMain ? 12 : 14)}
          width={isMain ? 14 : 18}
          height={(i + 1) * (isMain ? 12 : 14)}
          rx={2}
          fill={`rgba(${color}, ${0.2 + i * 0.15})`}
          variants={{
            hidden: { scaleY: 0, opacity: 0 },
            visible: { scaleY: 1, opacity: 1, transition: { duration: 0.4, delay: i * 0.15 } }
          }}
          style={{ transformOrigin: 'bottom' }}
        />
      ))}

      {/* Avatar circles */}
      {isMain && Array.from({ length: 3 }).map((_, i) => (
        <motion.circle
          key={i}
          cx={22 + i * 18}
          cy={75 - (i + 1) * 12 - 8}
          r={5}
          fill={`rgba(${color}, 0.5)`}
          stroke={`rgba(${color}, 0.7)`}
          strokeWidth={1}
          variants={fadeInUp}
        />
      ))}

      {/* Arrow */}
      <motion.path
        d={isMain ? "M 75 25 L 85 35 L 75 45" : "M 78 30 L 85 37 L 78 44"}
        fill="none"
        stroke={`rgba(${color}, 0.6)`}
        strokeWidth={2}
        strokeLinecap="round"
        variants={pathVariants}
      />
    </motion.svg>
  );
}

/** Card 3: Search with AI - NLU Pipeline visualization */
function SearchPipelineViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Search input */}
      <motion.rect
        x={10}
        y={40}
        width={isMain ? 22 : 18}
        height={isMain ? 20 : 16}
        rx={4}
        fill={`rgba(${color}, 0.15)`}
        stroke={`rgba(${color}, 0.5)`}
        strokeWidth={1.5}
        variants={fadeInUp}
      />
      {/* Magnifying glass icon */}
      <motion.circle
        cx={isMain ? 18 : 16}
        cy={isMain ? 47 : 46}
        r={isMain ? 5 : 4}
        fill="none"
        stroke={`rgba(${color}, 0.6)`}
        strokeWidth={1.5}
        variants={fadeInUp}
      />
      <motion.line
        x1={isMain ? 22 : 19}
        y1={isMain ? 51 : 49}
        x2={isMain ? 26 : 23}
        y2={isMain ? 55 : 53}
        stroke={`rgba(${color}, 0.6)`}
        strokeWidth={1.5}
        strokeLinecap="round"
        variants={fadeInUp}
      />

      {/* AI Processing nodes */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={isMain ? 42 + i * 12 : 40 + i * 14}
          cy={50}
          r={isMain ? 6 : 5}
          fill={`rgba(${color}, ${0.2 + i * 0.15})`}
          stroke={`rgba(${color}, 0.5)`}
          strokeWidth={1}
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { scale: 1, opacity: 1, transition: { duration: 0.3, delay: 0.2 + i * 0.1 } }
          }}
          style={{
            animation: isHovered ? `microPulse 1.5s ease-in-out ${i * 0.2}s infinite` : 'none'
          }}
        />
      ))}

      {/* Connection lines between nodes */}
      {isMain && (
        <>
          <motion.line x1={32} y1={50} x2={36} y2={50} stroke={`rgba(${color}, 0.4)`} strokeWidth={1.5} variants={pathVariants} />
          <motion.line x1={48} y1={50} x2={54} y2={50} stroke={`rgba(${color}, 0.4)`} strokeWidth={1.5} variants={pathVariants} />
          <motion.line x1={60} y1={50} x2={66} y2={50} stroke={`rgba(${color}, 0.4)`} strokeWidth={1.5} variants={pathVariants} />
        </>
      )}

      {/* Result sparkles */}
      {isMain && (
        <>
          <motion.circle cx={80} cy={42} r={3} fill={`rgba(${color}, 0.6)`} variants={fadeInUp} />
          <motion.circle cx={88} cy={50} r={4} fill={`rgba(${color}, 0.5)`} variants={fadeInUp} />
          <motion.circle cx={80} cy={58} r={3} fill={`rgba(${color}, 0.6)`} variants={fadeInUp} />
        </>
      )}

      {/* Data flow line */}
      <motion.path
        d={isMain ? "M 72 50 Q 80 50 88 50" : "M 68 50 Q 78 50 88 50"}
        fill="none"
        stroke={`rgba(${color}, 0.4)`}
        strokeWidth={1.5}
        strokeDasharray={isHovered ? "0" : "3 3"}
        variants={pathVariants}
        style={{
          animation: isHovered ? 'dataFlow 2s linear infinite' : 'none'
        }}
      />
    </motion.svg>
  );
}

/** Card 4: MCP Handoff - Design to Code Bridge */
function MCPBridgeViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Figma frame (left) */}
      <motion.rect
        x={isMain ? 10 : 12}
        y={30}
        width={isMain ? 24 : 20}
        height={isMain ? 40 : 35}
        rx={3}
        fill={`rgba(${color}, 0.1)`}
        stroke={`rgba(${color}, 0.5)`}
        strokeWidth={1.5}
        variants={fadeInUp}
      />
      {/* Figma inner frame */}
      <motion.rect
        x={isMain ? 14 : 15}
        y={35}
        width={isMain ? 16 : 12}
        height={isMain ? 20 : 16}
        rx={2}
        fill={`rgba(${color}, 0.2)`}
        variants={fadeInUp}
      />
      {/* Layer lines */}
      {isMain && (
        <>
          <motion.line x1={14} y1={60} x2={30} y2={60} stroke={`rgba(${color}, 0.3)`} strokeWidth={1} variants={fadeInUp} />
          <motion.line x1={14} y1={64} x2={26} y2={64} stroke={`rgba(${color}, 0.3)`} strokeWidth={1} variants={fadeInUp} />
        </>
      )}

      {/* MCP Bridge (center) */}
      <motion.g variants={fadeInUp}>
        {/* Bidirectional arrows */}
        <motion.path
          d={isMain ? "M 38 45 L 46 50 L 38 55" : "M 36 45 L 42 50 L 36 55"}
          fill="none"
          stroke={`rgba(${color}, 0.6)`}
          strokeWidth={1.5}
          strokeLinecap="round"
          variants={pathVariants}
        />
        <motion.path
          d={isMain ? "M 62 45 L 54 50 L 62 55" : "M 64 45 L 58 50 L 64 55"}
          fill="none"
          stroke={`rgba(${color}, 0.6)`}
          strokeWidth={1.5}
          strokeLinecap="round"
          variants={pathVariants}
        />
        {/* Sync circle */}
        <motion.circle
          cx={50}
          cy={50}
          r={isMain ? 8 : 6}
          fill={`rgba(${color}, 0.15)`}
          stroke={`rgba(${color}, 0.5)`}
          strokeWidth={1.5}
          style={{
            animation: isHovered ? 'microPulse 2s ease-in-out infinite' : 'none'
          }}
        />
        {/* Sync arrows inside */}
        {isMain && (
          <>
            <motion.path d="M 47 47 L 50 44 L 53 47" fill="none" stroke={`rgba(${color}, 0.6)`} strokeWidth={1} strokeLinecap="round" variants={pathVariants} />
            <motion.path d="M 53 53 L 50 56 L 47 53" fill="none" stroke={`rgba(${color}, 0.6)`} strokeWidth={1} strokeLinecap="round" variants={pathVariants} />
          </>
        )}
      </motion.g>

      {/* Code brackets (right) */}
      <motion.rect
        x={isMain ? 66 : 68}
        y={30}
        width={isMain ? 24 : 20}
        height={isMain ? 40 : 35}
        rx={3}
        fill={`rgba(${color}, 0.1)`}
        stroke={`rgba(${color}, 0.5)`}
        strokeWidth={1.5}
        variants={fadeInUp}
      />
      {/* Code lines */}
      <motion.g variants={fadeInUp}>
        <motion.line x1={isMain ? 70 : 71} y1={38} x2={isMain ? 86 : 84} y2={38} stroke={`rgba(${color}, 0.4)`} strokeWidth={2} />
        <motion.line x1={isMain ? 70 : 71} y1={45} x2={isMain ? 82 : 80} y2={45} stroke={`rgba(${color}, 0.3)`} strokeWidth={2} />
        <motion.line x1={isMain ? 70 : 71} y1={52} x2={isMain ? 78 : 77} y2={52} stroke={`rgba(${color}, 0.3)`} strokeWidth={2} />
        {isMain && (
          <>
            <motion.line x1={70} y1={59} x2={84} y2={59} stroke={`rgba(${color}, 0.4)`} strokeWidth={2} />
          </>
        )}
      </motion.g>
    </motion.svg>
  );
}

/** Card 5: IFE System Design - Seat-back display with content */
function IFEDisplayViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Screen frame (landscape) */}
      <motion.rect
        x={10}
        y={isMain ? 20 : 25}
        width={80}
        height={isMain ? 55 : 45}
        rx={4}
        fill={`rgba(${color}, 0.08)`}
        stroke={`rgba(${color}, 0.5)`}
        strokeWidth={2}
        variants={fadeInUp}
      />

      {/* Header tabs */}
      <motion.g variants={fadeInUp}>
        {['Movies', 'Shows', 'Music'].map((_, i) => (
          <motion.rect
            key={i}
            x={15 + i * 25}
            y={isMain ? 25 : 29}
            width={20}
            height={isMain ? 8 : 6}
            rx={2}
            fill={`rgba(${color}, ${i === 0 ? 0.4 : 0.15})`}
          />
        ))}
      </motion.g>

      {/* Featured content area */}
      <motion.rect
        x={15}
        y={isMain ? 38 : 38}
        width={isMain ? 45 : 40}
        height={isMain ? 28 : 22}
        rx={3}
        fill={`rgba(${color}, 0.2)`}
        variants={fadeInUp}
      />

      {/* Play button overlay */}
      <motion.path
        d={isMain ? "M 32 48 L 32 56 L 42 52 Z" : "M 30 46 L 30 52 L 38 49 Z"}
        fill={`rgba(${color}, 0.7)`}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { duration: 0.3, delay: 0.4 } }
        }}
        style={{
          animation: isHovered ? 'microPulse 1.5s ease-in-out infinite' : 'none'
        }}
      />

      {/* Side content cards */}
      {isMain && [0, 1].map((i) => (
        <motion.rect
          key={i}
          x={65}
          y={38 + i * 15}
          width={20}
          height={12}
          rx={2}
          fill={`rgba(${color}, ${0.15 + i * 0.1})`}
          variants={fadeInUp}
        />
      ))}

      {/* Touch target indicators */}
      {isMain && (
        <motion.g variants={fadeInUp}>
          <motion.circle cx={75} cy={44} r={3} fill="none" stroke={`rgba(${color}, 0.4)`} strokeWidth={1} strokeDasharray="2 2" />
          <motion.circle cx={75} cy={59} r={3} fill="none" stroke={`rgba(${color}, 0.4)`} strokeWidth={1} strokeDasharray="2 2" />
        </motion.g>
      )}

      {/* Progress bar */}
      <motion.rect
        x={15}
        y={isMain ? 70 : 63}
        width={70}
        height={3}
        rx={1.5}
        fill={`rgba(${color}, 0.15)`}
        variants={fadeInUp}
      />
      <motion.rect
        x={15}
        y={isMain ? 70 : 63}
        width={isMain ? 40 : 35}
        height={3}
        rx={1.5}
        fill={`rgba(${color}, 0.5)`}
        variants={{
          hidden: { width: 0 },
          visible: { width: isMain ? 40 : 35, transition: { duration: 1, delay: 0.5 } }
        }}
      />
    </motion.svg>
  );
}

/** Card 6: Liftoff Program - Team culture hub */
function TeamCultureViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';
  const memberPositions = isMain
    ? [{ x: 30, y: 25 }, { x: 70, y: 25 }, { x: 20, y: 55 }, { x: 50, y: 70 }, { x: 80, y: 55 }]
    : [{ x: 30, y: 30 }, { x: 70, y: 30 }, { x: 30, y: 65 }, { x: 70, y: 65 }];

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Central hub */}
      <motion.circle
        cx={50}
        cy={isMain ? 45 : 48}
        r={isMain ? 12 : 10}
        fill={`rgba(${color}, 0.25)`}
        stroke={`rgba(${color}, 0.6)`}
        strokeWidth={2}
        variants={fadeInUp}
        style={{
          animation: isHovered ? 'microPulse 2s ease-in-out infinite' : 'none'
        }}
      />
      {/* Hub icon (people silhouette) */}
      <motion.g variants={fadeInUp}>
        <motion.circle cx={50} cy={isMain ? 41 : 44} r={isMain ? 4 : 3} fill={`rgba(${color}, 0.6)`} />
        <motion.path
          d={isMain ? "M 43 52 Q 50 48 57 52" : "M 45 53 Q 50 50 55 53"}
          fill="none"
          stroke={`rgba(${color}, 0.6)`}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </motion.g>

      {/* Connection lines to members */}
      {memberPositions.map((pos, i) => (
        <motion.line
          key={`line-${i}`}
          x1={50}
          y1={isMain ? 45 : 48}
          x2={pos.x}
          y2={pos.y}
          stroke={`rgba(${color}, 0.3)`}
          strokeWidth={1}
          strokeDasharray={isHovered ? "0" : "3 3"}
          variants={pathVariants}
          style={{
            animation: isHovered ? 'dataFlow 3s linear infinite' : 'none',
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}

      {/* Team member circles */}
      {memberPositions.map((pos, i) => (
        <motion.circle
          key={`member-${i}`}
          cx={pos.x}
          cy={pos.y}
          r={isMain ? 8 : 7}
          fill={`rgba(${color}, ${0.15 + i * 0.08})`}
          stroke={`rgba(${color}, 0.5)`}
          strokeWidth={1.5}
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { scale: 1, opacity: 1, transition: { duration: 0.3, delay: 0.1 + i * 0.08 } }
          }}
        />
      ))}

      {/* Growth arrow */}
      {isMain && (
        <motion.path
          d="M 85 75 L 90 68 L 95 75"
          fill="none"
          stroke={`rgba(${color}, 0.5)`}
          strokeWidth={2}
          strokeLinecap="round"
          variants={pathVariants}
        />
      )}
    </motion.svg>
  );
}

// ============================================================================
// CLEARA VISUALIZATIONS (Cards 7-12)
// ============================================================================

/** Card 7: Ghost Overlay - Layered photo frames with crosshair */
function GhostOverlayViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Back frame */}
      <motion.rect
        x={25}
        y={20}
        width={isMain ? 45 : 40}
        height={isMain ? 55 : 50}
        rx={4}
        fill={`rgba(${color}, 0.1)`}
        stroke={`rgba(${color}, 0.3)`}
        strokeWidth={1}
        variants={fadeInUp}
      />

      {/* Front frame (offset) */}
      <motion.rect
        x={30}
        y={25}
        width={isMain ? 45 : 40}
        height={isMain ? 55 : 50}
        rx={4}
        fill={`rgba(${color}, 0.15)`}
        stroke={`rgba(${color}, 0.5)`}
        strokeWidth={1.5}
        variants={{
          hidden: { x: -5, opacity: 0 },
          visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2 } }
        }}
      />

      {/* Crosshair */}
      <motion.g variants={pathVariants}>
        <line x1={52} y1={40} x2={52} y2={60} stroke={`rgba(${color}, 0.7)`} strokeWidth={1} />
        <line x1={42} y1={50} x2={62} y2={50} stroke={`rgba(${color}, 0.7)`} strokeWidth={1} />
        <circle cx={52} cy={50} r={8} fill="none" stroke={`rgba(${color}, 0.5)`} strokeWidth={1} />
      </motion.g>
    </motion.svg>
  );
}

/** Card 8: AI PASI Scoring - Radial meter with percentage */
function PASIMeterViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';
  const radius = isMain ? 32 : 28;
  const strokeWidth = isMain ? 6 : 5;
  const circumference = 2 * Math.PI * radius;
  const progress = 0.33; // 33% improvement

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Background arc */}
      <circle
        cx={50}
        cy={50}
        r={radius}
        fill="none"
        stroke={`rgba(${color}, 0.15)`}
        strokeWidth={strokeWidth}
      />

      {/* Progress arc */}
      <motion.circle
        cx={50}
        cy={50}
        r={radius}
        fill="none"
        stroke={`rgba(${color}, 0.7)`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        transform="rotate(-90 50 50)"
        variants={{
          hidden: { strokeDashoffset: circumference },
          visible: {
            strokeDashoffset: circumference * (1 - progress),
            transition: { duration: 1.2, ease: [0.32, 0.72, 0, 1] }
          }
        }}
      />

      {/* Inner arcs */}
      {isMain && (
        <>
          <motion.circle
            cx={50}
            cy={50}
            r={radius - 10}
            fill="none"
            stroke={`rgba(${color}, 0.3)`}
            strokeWidth={3}
            strokeDasharray={2 * Math.PI * (radius - 10)}
            strokeDashoffset={2 * Math.PI * (radius - 10) * 0.5}
            transform="rotate(-90 50 50)"
            variants={pathVariants}
          />
        </>
      )}

      {/* Percentage text */}
      <motion.text
        x={50}
        y={isMain ? 54 : 52}
        textAnchor="middle"
        fill={`rgba(${color}, 0.9)`}
        fontSize={isMain ? 14 : 11}
        fontWeight={600}
        variants={fadeInUp}
      >
        +33%
      </motion.text>
    </motion.svg>
  );
}

/** Card 9a: Predictive Flare Alerts - Timeline with prediction marker */
function PredictiveAlertViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Timeline base */}
      <motion.line
        x1={15}
        y1={60}
        x2={85}
        y2={60}
        stroke={`rgba(${color}, 0.3)`}
        strokeWidth={2}
        variants={pathVariants}
      />

      {/* Day markers */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.g key={i} variants={fadeInUp}>
          <line
            x1={20 + i * 16}
            y1={57}
            x2={20 + i * 16}
            y2={63}
            stroke={`rgba(${color}, 0.4)`}
            strokeWidth={1.5}
          />
          {isMain && (
            <text
              x={20 + i * 16}
              y={72}
              textAnchor="middle"
              fill={`rgba(${color}, 0.5)`}
              fontSize={8}
            >
              {i + 1}
            </text>
          )}
        </motion.g>
      ))}

      {/* Prediction zone (shaded area before alert) */}
      <motion.rect
        x={52}
        y={35}
        width={isMain ? 28 : 24}
        height={20}
        rx={4}
        fill={`rgba(${color}, 0.1)`}
        stroke={`rgba(${color}, 0.3)`}
        strokeWidth={1}
        strokeDasharray="3 3"
        variants={fadeInUp}
      />

      {/* Alert marker */}
      <motion.g
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { duration: 0.4, delay: 0.5 } }
        }}
      >
        {/* Alert triangle */}
        <motion.path
          d={isMain ? "M 68 25 L 76 38 L 60 38 Z" : "M 68 28 L 74 38 L 62 38 Z"}
          fill={`rgba(${color}, 0.6)`}
          style={{
            animation: isHovered ? 'microPulse 1.5s ease-in-out infinite' : 'none'
          }}
        />
        {/* Exclamation mark */}
        <motion.line
          x1={68}
          y1={isMain ? 29 : 31}
          x2={68}
          y2={isMain ? 33 : 34}
          stroke={`rgba(255, 255, 255, 0.9)`}
          strokeWidth={2}
          strokeLinecap="round"
        />
        <motion.circle
          cx={68}
          cy={isMain ? 36 : 36}
          r={1}
          fill="rgba(255, 255, 255, 0.9)"
        />
      </motion.g>

      {/* Prediction label */}
      {isMain && (
        <motion.text
          x={66}
          y={48}
          textAnchor="middle"
          fill={`rgba(${color}, 0.7)`}
          fontSize={8}
          fontWeight={500}
          variants={fadeInUp}
        >
          3-5 days
        </motion.text>
      )}

      {/* Current day marker */}
      <motion.circle
        cx={20}
        cy={60}
        r={isMain ? 5 : 4}
        fill={`rgba(${color}, 0.5)`}
        stroke={`rgba(${color}, 0.7)`}
        strokeWidth={1.5}
        variants={fadeInUp}
      />
    </motion.svg>
  );
}

/** Card 9: Smart Reminders - Clock with bell and optimal arc */
function SmartRemindersViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Clock face */}
      <motion.circle
        cx={50}
        cy={50}
        r={isMain ? 30 : 25}
        fill={`rgba(${color}, 0.1)`}
        stroke={`rgba(${color}, 0.5)`}
        strokeWidth={1.5}
        variants={fadeInUp}
      />

      {/* Clock hands */}
      <motion.line
        x1={50}
        y1={50}
        x2={50}
        y2={isMain ? 28 : 32}
        stroke={`rgba(${color}, 0.8)`}
        strokeWidth={2}
        strokeLinecap="round"
        variants={pathVariants}
      />
      <motion.line
        x1={50}
        y1={50}
        x2={isMain ? 65 : 62}
        y2={50}
        stroke={`rgba(${color}, 0.6)`}
        strokeWidth={2}
        strokeLinecap="round"
        variants={pathVariants}
      />

      {/* Bell icon */}
      {isMain && (
        <motion.g variants={fadeInUp} transform="translate(72, 20)">
          <path
            d="M 0 8 Q 0 0 6 0 Q 12 0 12 8 L 12 12 L 0 12 Z"
            fill={`rgba(${color}, 0.5)`}
          />
          <circle cx={6} cy={14} r={2} fill={`rgba(${color}, 0.6)`} />
        </motion.g>
      )}

      {/* Optimal time arc */}
      <motion.path
        d={isMain ? "M 75 30 Q 85 50 75 70" : "M 70 35 Q 78 50 70 65"}
        fill="none"
        stroke={`rgba(${color}, 0.4)`}
        strokeWidth={2}
        strokeDasharray="4 4"
        variants={pathVariants}
      />
    </motion.svg>
  );
}

/** Card 10: Early PsA Detection - Joint with alert */
function JointAlertViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Hand outline (simplified) */}
      <motion.path
        d={isMain
          ? "M 25 70 L 25 45 L 35 30 M 35 70 L 35 40 L 45 20 M 45 70 L 45 35 L 55 15 M 55 70 L 55 40 L 65 25 M 65 70 L 65 50 L 72 40"
          : "M 30 65 L 30 45 L 40 30 M 45 65 L 45 40 L 55 25 M 60 65 L 60 50 L 68 40"
        }
        fill="none"
        stroke={`rgba(${color}, 0.5)`}
        strokeWidth={isMain ? 3 : 4}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
      />

      {/* Joint highlight */}
      <motion.circle
        cx={isMain ? 45 : 45}
        cy={isMain ? 35 : 40}
        r={isMain ? 8 : 6}
        fill={`rgba(${color}, 0.3)`}
        stroke={`rgba(${color}, 0.7)`}
        strokeWidth={2}
        variants={fadeInUp}
        style={{
          animation: isHovered ? 'microPulse 1.5s ease-in-out infinite' : 'none'
        }}
      />

      {/* Alert icon */}
      {isMain && (
        <motion.g variants={fadeInUp} transform="translate(70, 15)">
          <circle cx={0} cy={0} r={10} fill={`rgba(${color}, 0.2)`} stroke={`rgba(${color}, 0.6)`} strokeWidth={1.5} />
          <text x={0} y={4} textAnchor="middle" fill={`rgba(${color}, 0.9)`} fontSize={12} fontWeight={700}>!</text>
        </motion.g>
      )}
    </motion.svg>
  );
}

/** Card 11: Mental Health - Brain and heart connection */
function MindBodyViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Brain (simplified) */}
      <motion.ellipse
        cx={30}
        cy={40}
        rx={isMain ? 18 : 14}
        ry={isMain ? 20 : 16}
        fill={`rgba(${color}, 0.15)`}
        stroke={`rgba(${color}, 0.5)`}
        strokeWidth={1.5}
        variants={fadeInUp}
      />
      {isMain && (
        <motion.path
          d="M 22 35 Q 30 30 38 35 M 22 45 Q 30 50 38 45"
          fill="none"
          stroke={`rgba(${color}, 0.4)`}
          strokeWidth={1}
          variants={pathVariants}
        />
      )}

      {/* Heart */}
      <motion.path
        d={isMain
          ? "M 70 45 C 70 38 62 35 62 42 C 62 35 54 38 54 45 L 62 55 L 70 45 Z"
          : "M 70 48 C 70 42 64 40 64 45 C 64 40 58 42 58 48 L 64 55 L 70 48 Z"
        }
        fill={`rgba(${color}, 0.4)`}
        stroke={`rgba(${color}, 0.6)`}
        strokeWidth={1.5}
        variants={fadeInUp}
        style={{
          animation: isHovered ? 'microPulse 1s ease-in-out infinite' : 'none'
        }}
      />

      {/* Flowing connection */}
      <motion.path
        d={isMain ? "M 48 40 Q 55 55 54 45" : "M 44 42 Q 50 50 58 48"}
        fill="none"
        stroke={`rgba(${color}, 0.5)`}
        strokeWidth={2}
        strokeDasharray="4 4"
        variants={pathVariants}
        style={{
          animation: isHovered ? 'dataFlow 1.5s linear infinite' : 'none'
        }}
      />
    </motion.svg>
  );
}

/** Card 12: Provider Dashboard - Analytics grid */
function AnalyticsGridViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';
  const cellSize = isMain ? 35 : 30;
  const gap = isMain ? 6 : 5;

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* 2x2 grid of mini charts */}
      {[[15, 15], [15 + cellSize + gap, 15], [15, 15 + cellSize + gap], [15 + cellSize + gap, 15 + cellSize + gap]].map(([x, y], i) => (
        <motion.g key={i} variants={fadeInUp}>
          <rect
            x={x}
            y={y}
            width={cellSize}
            height={cellSize}
            rx={4}
            fill={`rgba(${color}, 0.1)`}
            stroke={`rgba(${color}, 0.3)`}
            strokeWidth={1}
          />
          {/* Mini chart inside */}
          {i === 0 && (
            <rect x={x + 5} y={y + 20} width={6} height={10} fill={`rgba(${color}, 0.4)`} rx={1} />
          )}
          {i === 1 && (
            <circle cx={x + cellSize / 2} cy={y + cellSize / 2} r={8} fill="none" stroke={`rgba(${color}, 0.5)`} strokeWidth={3} strokeDasharray="25 75" transform={`rotate(-90 ${x + cellSize / 2} ${y + cellSize / 2})`} />
          )}
          {i === 2 && (
            <path d={`M ${x + 5} ${y + 25} L ${x + 15} ${y + 15} L ${x + 25} ${y + 20}`} fill="none" stroke={`rgba(${color}, 0.5)`} strokeWidth={2} />
          )}
          {i === 3 && isMain && (
            <text x={x + cellSize / 2} y={y + cellSize / 2 + 4} textAnchor="middle" fill={`rgba(${color}, 0.6)`} fontSize={10}>42</text>
          )}
        </motion.g>
      ))}

      {/* Export arrow */}
      {isMain && (
        <motion.path
          d="M 80 80 L 88 80 L 88 72 M 82 78 L 88 72"
          fill="none"
          stroke={`rgba(${color}, 0.6)`}
          strokeWidth={2}
          strokeLinecap="round"
          variants={pathVariants}
        />
      )}
    </motion.svg>
  );
}

// ============================================================================
// METAMORPHIC FRACTAL VISUALIZATIONS (Cards 13-18)
// ============================================================================

/** Card 13: Research Foundation - Open book with waves */
function OpenBookViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Book pages */}
      <motion.path
        d={isMain
          ? "M 50 25 L 20 30 L 20 75 L 50 70 Z"
          : "M 50 30 L 25 34 L 25 70 L 50 66 Z"
        }
        fill={`rgba(${color}, 0.15)`}
        stroke={`rgba(${color}, 0.5)`}
        strokeWidth={1.5}
        variants={fadeInUp}
      />
      <motion.path
        d={isMain
          ? "M 50 25 L 80 30 L 80 75 L 50 70 Z"
          : "M 50 30 L 75 34 L 75 70 L 50 66 Z"
        }
        fill={`rgba(${color}, 0.2)`}
        stroke={`rgba(${color}, 0.5)`}
        strokeWidth={1.5}
        variants={fadeInUp}
      />

      {/* Page lines */}
      {isMain && [35, 45, 55].map((y) => (
        <motion.line key={y} x1={25} y1={y} x2={45} y2={y - 2} stroke={`rgba(${color}, 0.3)`} strokeWidth={1} variants={pathVariants} />
      ))}

      {/* Wave emanation */}
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M 50 ${isMain ? 15 - i * 5 : 22 - i * 4} Q ${60 + i * 5} ${isMain ? 10 - i * 5 : 18 - i * 4} ${70 + i * 8} ${isMain ? 15 - i * 5 : 22 - i * 4}`}
          fill="none"
          stroke={`rgba(${color}, ${0.5 - i * 0.15})`}
          strokeWidth={1}
          variants={pathVariants}
          style={{
            animation: isHovered ? `waveOscillate 1.5s ease-in-out ${i * 0.2}s infinite` : 'none'
          }}
        />
      ))}
    </motion.svg>
  );
}

/** Card 14: 3D Modelling - Wireframe cube with VR goggles */
function WireframeCubeViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Isometric cube */}
      <motion.g variants={pathVariants}>
        {/* Front face */}
        <path
          d={isMain
            ? "M 50 30 L 25 45 L 25 70 L 50 85 L 75 70 L 75 45 Z"
            : "M 50 35 L 30 47 L 30 67 L 50 79 L 70 67 L 70 47 Z"
          }
          fill="none"
          stroke={`rgba(${color}, 0.5)`}
          strokeWidth={1.5}
        />
        {/* Back edges */}
        <path
          d={isMain
            ? "M 50 30 L 50 55 M 25 45 L 50 55 L 75 45"
            : "M 50 35 L 50 55 M 30 47 L 50 55 L 70 47"
          }
          fill="none"
          stroke={`rgba(${color}, 0.3)`}
          strokeWidth={1}
          strokeDasharray="3 3"
        />
      </motion.g>

      {/* VR goggles */}
      {isMain && (
        <motion.g variants={fadeInUp} transform="translate(65, 15)">
          <rect x={0} y={0} width={25} height={12} rx={3} fill={`rgba(${color}, 0.2)`} stroke={`rgba(${color}, 0.5)`} strokeWidth={1} />
          <circle cx={7} cy={6} r={4} fill={`rgba(${color}, 0.3)`} />
          <circle cx={18} cy={6} r={4} fill={`rgba(${color}, 0.3)`} />
        </motion.g>
      )}
    </motion.svg>
  );
}

/** Card 15: TouchDesigner - Node graph with bezier connections */
function NodeGraphViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';
  const nodes = isMain
    ? [[20, 30], [50, 20], [80, 35], [35, 60], [65, 70]]
    : [[25, 35], [50, 25], [75, 40], [50, 65]];

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Bezier connections */}
      <motion.g variants={pathVariants}>
        <path
          d={isMain
            ? `M 20 30 Q 35 25 50 20`
            : `M 25 35 Q 37 30 50 25`
          }
          fill="none"
          stroke={`rgba(${color}, 0.4)`}
          strokeWidth={1.5}
        />
        <path
          d={isMain
            ? `M 50 20 Q 65 27 80 35`
            : `M 50 25 Q 62 32 75 40`
          }
          fill="none"
          stroke={`rgba(${color}, 0.4)`}
          strokeWidth={1.5}
        />
        <path
          d={isMain
            ? `M 20 30 Q 27 45 35 60`
            : `M 25 35 Q 37 50 50 65`
          }
          fill="none"
          stroke={`rgba(${color}, 0.4)`}
          strokeWidth={1.5}
        />
        {isMain && (
          <path
            d={`M 35 60 Q 50 65 65 70`}
            fill="none"
            stroke={`rgba(${color}, 0.4)`}
            strokeWidth={1.5}
          />
        )}
      </motion.g>

      {/* Nodes */}
      {nodes.map(([x, y], i) => (
        <motion.rect
          key={i}
          x={x - 8}
          y={y - 6}
          width={16}
          height={12}
          rx={3}
          fill={`rgba(${color}, ${0.2 + i * 0.1})`}
          stroke={`rgba(${color}, 0.6)`}
          strokeWidth={1.5}
          variants={fadeInUp}
        />
      ))}

      {/* Particles */}
      {isMain && isHovered && [0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={30 + i * 20}
          cy={25 + i * 5}
          r={2}
          fill={`rgba(${color}, 0.7)`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], x: [0, 10, 20] }}
          transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
        />
      ))}
    </motion.svg>
  );
}

/** Card 16: Stable Diffusion - Noise to pattern */
function NoisePatternViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';
  const dots = isMain ? 25 : 12;

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Scattered dots that organize */}
      {Array.from({ length: dots }).map((_, i) => {
        const randomX = 15 + Math.random() * 30;
        const randomY = 20 + Math.random() * 60;
        const organizedX = 55 + (i % 5) * 8;
        const organizedY = 25 + Math.floor(i / 5) * 10;

        return (
          <motion.circle
            key={i}
            r={isMain ? 2.5 : 3}
            fill={`rgba(${color}, ${0.3 + (i / dots) * 0.5})`}
            variants={{
              hidden: { cx: randomX, cy: randomY, opacity: 0.3 },
              visible: {
                cx: isMain ? organizedX : 55 + (i % 3) * 12,
                cy: isMain ? organizedY : 30 + Math.floor(i / 3) * 12,
                opacity: 0.8,
                transition: { duration: 0.8, delay: i * 0.03, ease: [0.32, 0.72, 0, 1] }
              }
            }}
          />
        );
      })}

      {/* Arrow */}
      <motion.path
        d={isMain ? "M 42 50 L 52 50 M 48 45 L 52 50 L 48 55" : "M 45 50 L 52 50"}
        fill="none"
        stroke={`rgba(${color}, 0.5)`}
        strokeWidth={2}
        strokeLinecap="round"
        variants={pathVariants}
      />
    </motion.svg>
  );
}

/** Card 17: Arduino Integration - Sensor chip with data packets */
function SensorChipViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Chip outline */}
      <motion.rect
        x={isMain ? 30 : 32}
        y={30}
        width={isMain ? 40 : 36}
        height={isMain ? 40 : 36}
        rx={4}
        fill={`rgba(${color}, 0.15)`}
        stroke={`rgba(${color}, 0.6)`}
        strokeWidth={2}
        variants={fadeInUp}
      />

      {/* Chip pins */}
      {isMain && [0, 1, 2, 3].map((i) => (
        <motion.g key={i} variants={fadeInUp}>
          <rect x={35 + i * 8} y={25} width={4} height={6} fill={`rgba(${color}, 0.5)`} rx={1} />
          <rect x={35 + i * 8} y={69} width={4} height={6} fill={`rgba(${color}, 0.5)`} rx={1} />
        </motion.g>
      ))}

      {/* Center chip marking */}
      <motion.circle
        cx={50}
        cy={50}
        r={isMain ? 10 : 8}
        fill={`rgba(${color}, 0.2)`}
        stroke={`rgba(${color}, 0.4)`}
        strokeWidth={1}
        variants={fadeInUp}
      />

      {/* Data packets */}
      {isMain && isHovered && [0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={75}
          y={40 + i * 10}
          width={6}
          height={4}
          rx={1}
          fill={`rgba(${color}, 0.7)`}
          initial={{ x: 75, opacity: 0 }}
          animate={{ x: [75, 90], opacity: [0, 1, 0] }}
          transition={{ duration: 1, delay: i * 0.3, repeat: Infinity }}
        />
      ))}

      {/* Wave from chip */}
      <motion.path
        d={isMain ? "M 70 50 Q 78 45 85 50 Q 92 55 100 50" : "M 68 50 Q 78 45 88 50"}
        fill="none"
        stroke={`rgba(${color}, 0.4)`}
        strokeWidth={1.5}
        variants={pathVariants}
      />
    </motion.svg>
  );
}

/** Card 18: Audio-Reactive SFX - Sound waveform */
function SoundWaveViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';
  const bars = isMain ? 12 : 8;

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Waveform bars */}
      {Array.from({ length: bars }).map((_, i) => {
        const height = 15 + Math.sin(i * 0.8) * 20 + Math.random() * 10;
        const x = 10 + i * (isMain ? 7 : 10);

        return (
          <motion.rect
            key={i}
            x={x}
            y={50 - height / 2}
            width={isMain ? 4 : 6}
            height={height}
            rx={2}
            fill={`rgba(${color}, ${0.4 + (i / bars) * 0.4})`}
            variants={{
              hidden: { scaleY: 0, opacity: 0 },
              visible: {
                scaleY: 1,
                opacity: 1,
                transition: { duration: 0.4, delay: i * 0.05 }
              }
            }}
            style={{
              transformOrigin: 'center',
              animation: isHovered ? `waveOscillate 0.8s ease-in-out ${i * 0.1}s infinite` : 'none'
            }}
          />
        );
      })}

      {/* Floating particles */}
      {isMain && isHovered && [0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          r={2}
          fill={`rgba(${color}, 0.6)`}
          initial={{ cx: 50, cy: 30, opacity: 0 }}
          animate={{
            cy: [30, 15, 5],
            opacity: [0, 1, 0],
            cx: [50 + (i - 1) * 15, 50 + (i - 1) * 20, 50 + (i - 1) * 25]
          }}
          transition={{ duration: 1.5, delay: i * 0.4, repeat: Infinity }}
        />
      ))}
    </motion.svg>
  );
}

// ============================================================================
// LATENT SPACE VISUALIZATIONS (Cards 19-24)
// ============================================================================

/** Card 19: Eye-Gaze Tracking - Eye with REM motion */
function EyeGazeViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Eye outline */}
      <motion.ellipse
        cx={50}
        cy={50}
        rx={isMain ? 35 : 30}
        ry={isMain ? 20 : 17}
        fill={`rgba(${color}, 0.1)`}
        stroke={`rgba(${color}, 0.5)`}
        strokeWidth={1.5}
        variants={fadeInUp}
      />

      {/* Iris */}
      <motion.circle
        cx={50}
        cy={50}
        r={isMain ? 12 : 10}
        fill={`rgba(${color}, 0.3)`}
        stroke={`rgba(${color}, 0.6)`}
        strokeWidth={1.5}
        variants={fadeInUp}
      />

      {/* Pupil with REM motion */}
      <motion.circle
        cx={50}
        cy={50}
        r={isMain ? 5 : 4}
        fill={`rgba(${color}, 0.8)`}
        variants={fadeInUp}
        animate={isHovered ? {
          cx: [50, 53, 47, 50],
          cy: [50, 48, 52, 50]
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Reticle */}
      {isMain && (
        <motion.g variants={pathVariants}>
          <line x1={50} y1={25} x2={50} y2={32} stroke={`rgba(${color}, 0.5)`} strokeWidth={1} />
          <line x1={50} y1={68} x2={50} y2={75} stroke={`rgba(${color}, 0.5)`} strokeWidth={1} />
          <line x1={12} y1={50} x2={18} y2={50} stroke={`rgba(${color}, 0.5)`} strokeWidth={1} />
          <line x1={82} y1={50} x2={88} y2={50} stroke={`rgba(${color}, 0.5)`} strokeWidth={1} />
        </motion.g>
      )}

      {/* Badge */}
      <motion.g variants={fadeInUp} transform={`translate(${isMain ? 72 : 68}, ${isMain ? 18 : 22})`}>
        <rect x={0} y={0} width={isMain ? 22 : 20} height={isMain ? 14 : 12} rx={3} fill={`rgba(${color}, 0.3)`} />
        <text x={isMain ? 11 : 10} y={isMain ? 10 : 9} textAnchor="middle" fill={`rgba(${color}, 0.9)`} fontSize={isMain ? 8 : 7} fontWeight={600}>87%</text>
      </motion.g>
    </motion.svg>
  );
}

/** Card 20: EEG Delta Analysis - Brain with delta wave */
function BrainWaveViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Brain outline */}
      <motion.ellipse
        cx={40}
        cy={45}
        rx={isMain ? 25 : 22}
        ry={isMain ? 28 : 24}
        fill={`rgba(${color}, 0.1)`}
        stroke={`rgba(${color}, 0.5)`}
        strokeWidth={1.5}
        variants={fadeInUp}
      />

      {/* Brain folds */}
      {isMain && (
        <motion.g variants={pathVariants}>
          <path d="M 25 40 Q 35 35 45 40" fill="none" stroke={`rgba(${color}, 0.3)`} strokeWidth={1} />
          <path d="M 28 50 Q 40 48 52 52" fill="none" stroke={`rgba(${color}, 0.3)`} strokeWidth={1} />
        </motion.g>
      )}

      {/* Delta wave */}
      <motion.path
        d={isMain
          ? "M 10 80 L 25 80 L 35 65 L 45 80 L 55 65 L 65 80 L 90 80"
          : "M 15 78 L 30 78 L 40 65 L 50 78 L 60 65 L 70 78 L 85 78"
        }
        fill="none"
        stroke={`rgba(${color}, 0.6)`}
        strokeWidth={2}
        strokeLinecap="round"
        variants={pathVariants}
        style={{
          animation: isHovered ? 'waveOscillate 2s ease-in-out infinite' : 'none'
        }}
      />

      {/* Badge */}
      <motion.g variants={fadeInUp} transform={`translate(${isMain ? 68 : 64}, ${isMain ? 25 : 28})`}>
        <rect x={0} y={0} width={isMain ? 22 : 20} height={isMain ? 14 : 12} rx={3} fill={`rgba(${color}, 0.3)`} />
        <text x={isMain ? 11 : 10} y={isMain ? 10 : 9} textAnchor="middle" fill={`rgba(${color}, 0.9)`} fontSize={isMain ? 8 : 7} fontWeight={600}>92%</text>
      </motion.g>
    </motion.svg>
  );
}

/** Card 21: Biometric Fusion - Converging streams */
function BiometricFusionViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Source icons */}
      {[[20, 25], [20, 50], [20, 75]].map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={isMain ? 8 : 7}
          fill={`rgba(${color}, ${0.2 + i * 0.1})`}
          stroke={`rgba(${color}, 0.5)`}
          strokeWidth={1.5}
          variants={fadeInUp}
        />
      ))}

      {/* Converging streams */}
      <motion.g variants={pathVariants}>
        <path d={`M 28 25 Q 45 35 55 50`} fill="none" stroke={`rgba(${color}, 0.4)`} strokeWidth={1.5} />
        <path d={`M 28 50 L 55 50`} fill="none" stroke={`rgba(${color}, 0.4)`} strokeWidth={1.5} />
        <path d={`M 28 75 Q 45 65 55 50`} fill="none" stroke={`rgba(${color}, 0.4)`} strokeWidth={1.5} />
      </motion.g>

      {/* Fusion node */}
      <motion.circle
        cx={isMain ? 62 : 60}
        cy={50}
        r={isMain ? 12 : 10}
        fill={`rgba(${color}, 0.3)`}
        stroke={`rgba(${color}, 0.7)`}
        strokeWidth={2}
        variants={fadeInUp}
        style={{
          animation: isHovered ? 'microPulse 1.5s ease-in-out infinite' : 'none'
        }}
      />

      {/* Badge */}
      <motion.g variants={fadeInUp} transform={`translate(${isMain ? 72 : 68}, ${isMain ? 18 : 22})`}>
        <rect x={0} y={0} width={isMain ? 22 : 20} height={isMain ? 14 : 12} rx={3} fill={`rgba(${color}, 0.3)`} />
        <text x={isMain ? 11 : 10} y={isMain ? 10 : 9} textAnchor="middle" fill={`rgba(${color}, 0.9)`} fontSize={isMain ? 8 : 7} fontWeight={600}>95%</text>
      </motion.g>
    </motion.svg>
  );
}

/** Card 22: Consent Framework - Shield with locks */
function ConsentShieldViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Shield */}
      <motion.path
        d={isMain
          ? "M 50 15 L 20 25 L 20 50 Q 20 75 50 90 Q 80 75 80 50 L 80 25 Z"
          : "M 50 20 L 25 28 L 25 50 Q 25 70 50 82 Q 75 70 75 50 L 75 28 Z"
        }
        fill={`rgba(${color}, 0.15)`}
        stroke={`rgba(${color}, 0.6)`}
        strokeWidth={2}
        variants={fadeInUp}
      />

      {/* Lock icons */}
      {isMain && [[35, 45], [50, 55], [65, 45]].map(([x, y], i) => (
        <motion.g key={i} variants={fadeInUp} transform={`translate(${x - 6}, ${y - 8})`}>
          <rect x={2} y={6} width={8} height={8} rx={1} fill={`rgba(${color}, 0.4)`} />
          <path d="M 3 6 L 3 4 Q 3 0 6 0 Q 9 0 9 4 L 9 6" fill="none" stroke={`rgba(${color}, 0.6)`} strokeWidth={1.5} />
        </motion.g>
      ))}

      {/* Checkmark */}
      <motion.path
        d={isMain ? "M 42 65 L 48 72 L 60 58" : "M 42 60 L 47 66 L 58 54"}
        fill="none"
        stroke={`rgba(${color}, 0.8)`}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
      />
    </motion.svg>
  );
}

/** Card 23: Dream Recorder - Wearable band with dream bubble */
function DreamRecorderViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Wearable band */}
      <motion.ellipse
        cx={35}
        cy={55}
        rx={isMain ? 20 : 18}
        ry={isMain ? 25 : 22}
        fill="none"
        stroke={`rgba(${color}, 0.5)`}
        strokeWidth={isMain ? 6 : 5}
        variants={fadeInUp}
      />

      {/* Screen on band */}
      <motion.rect
        x={isMain ? 28 : 29}
        y={isMain ? 45 : 46}
        width={isMain ? 14 : 12}
        height={isMain ? 20 : 18}
        rx={3}
        fill={`rgba(${color}, 0.25)`}
        stroke={`rgba(${color}, 0.6)`}
        strokeWidth={1}
        variants={fadeInUp}
      />

      {/* Dream bubble */}
      <motion.g variants={fadeInUp}>
        <ellipse
          cx={isMain ? 70 : 68}
          cy={isMain ? 35 : 38}
          rx={isMain ? 18 : 15}
          ry={isMain ? 15 : 12}
          fill={`rgba(${color}, 0.15)`}
          stroke={`rgba(${color}, 0.4)`}
          strokeWidth={1}
        />
        {/* Bubble trail */}
        <circle cx={isMain ? 52 : 52} cy={isMain ? 48 : 50} r={4} fill={`rgba(${color}, 0.2)`} />
        <circle cx={isMain ? 58 : 58} cy={isMain ? 42 : 45} r={3} fill={`rgba(${color}, 0.25)`} />
      </motion.g>

      {/* Dream content (stars) */}
      {isMain && (
        <motion.g variants={pathVariants}>
          <circle cx={65} cy={32} r={2} fill={`rgba(${color}, 0.5)`} />
          <circle cx={75} cy={38} r={1.5} fill={`rgba(${color}, 0.4)`} />
          <circle cx={70} cy={42} r={1} fill={`rgba(${color}, 0.3)`} />
        </motion.g>
      )}
    </motion.svg>
  );
}

/** Card 24: Narrative Arc - 3-act story curve */
function NarrativeArcViz({ color, isHovered, size }: Omit<MicroVisualizationProps, 'cardId' | 'projectId'>) {
  const isMain = size === 'main';

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {/* Baseline */}
      <motion.line
        x1={10}
        y1={75}
        x2={90}
        y2={75}
        stroke={`rgba(${color}, 0.2)`}
        strokeWidth={1}
        variants={pathVariants}
      />

      {/* 3-act curve */}
      <motion.path
        d={isMain
          ? "M 10 75 Q 25 70 35 55 Q 50 25 60 35 Q 75 50 90 75"
          : "M 15 72 Q 30 65 40 55 Q 55 35 65 45 Q 80 60 85 72"
        }
        fill="none"
        stroke={`rgba(${color}, 0.7)`}
        strokeWidth={2}
        strokeLinecap="round"
        variants={pathVariants}
      />

      {/* Act markers */}
      {isMain && (
        <motion.g variants={fadeInUp}>
          <circle cx={25} cy={65} r={4} fill={`rgba(${color}, 0.3)`} stroke={`rgba(${color}, 0.5)`} strokeWidth={1} />
          <circle cx={50} cy={28} r={5} fill={`rgba(${color}, 0.4)`} stroke={`rgba(${color}, 0.6)`} strokeWidth={1.5} />
          <circle cx={75} cy={55} r={4} fill={`rgba(${color}, 0.3)`} stroke={`rgba(${color}, 0.5)`} strokeWidth={1} />
        </motion.g>
      )}

      {/* Labels */}
      {isMain && (
        <motion.g variants={fadeInUp}>
          <text x={25} y={85} textAnchor="middle" fill={`rgba(${color}, 0.5)`} fontSize={6}>I</text>
          <text x={50} y={20} textAnchor="middle" fill={`rgba(${color}, 0.5)`} fontSize={6}>II</text>
          <text x={75} y={68} textAnchor="middle" fill={`rgba(${color}, 0.5)`} fontSize={6}>III</text>
        </motion.g>
      )}
    </motion.svg>
  );
}

// ============================================================================
// MAIN SELECTOR COMPONENT
// ============================================================================

/**
 * Main MicroVisualization Component
 * Selects and renders the appropriate visualization based on cardId and projectId
 */
export function MicroVisualization({ cardId, projectId, color, isHovered, size = 'main' }: MicroVisualizationProps) {
  const props = { color, isHovered, size };

  // Air India visualizations (cards 1-6)
  if (projectId === 'air-india') {
    switch (cardId) {
      case 1: return <TokenGridViz {...props} />;
      case 2: return <BarChartViz {...props} />;
      case 3: return <SearchPipelineViz {...props} />;
      case 4: return <MCPBridgeViz {...props} />;
      case 5: return <IFEDisplayViz {...props} />;
      case 6: return <TeamCultureViz {...props} />;
    }
  }

  // Cleara visualizations (cards 1-6 / conceptually 7-12)
  if (projectId === 'cleara') {
    switch (cardId) {
      case 1: return <GhostOverlayViz {...props} />;
      case 2: return <PASIMeterViz {...props} />;
      case 3: return <PredictiveAlertViz {...props} />;
      case 4: return <MindBodyViz {...props} />;
      case 5: return <SmartRemindersViz {...props} />;
      case 6: return <AnalyticsGridViz {...props} />;
    }
  }

  // Metamorphic visualizations (cards 1-6 / conceptually 13-18)
  if (projectId === 'metamorphic') {
    switch (cardId) {
      case 1: return <OpenBookViz {...props} />;
      case 2: return <WireframeCubeViz {...props} />;
      case 3: return <NodeGraphViz {...props} />;
      case 4: return <NoisePatternViz {...props} />;
      case 5: return <SensorChipViz {...props} />;
      case 6: return <SoundWaveViz {...props} />;
    }
  }

  // Latent Space visualizations (cards 1-6 / conceptually 19-24)
  if (projectId === 'latent-space') {
    switch (cardId) {
      case 1: return <EyeGazeViz {...props} />;
      case 2: return <BrainWaveViz {...props} />;
      case 3: return <BiometricFusionViz {...props} />;
      case 4: return <ConsentShieldViz {...props} />;
      case 5: return <DreamRecorderViz {...props} />;
      case 6: return <NarrativeArcViz {...props} />;
    }
  }

  // Fallback - return empty SVG
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <rect x={10} y={10} width={80} height={80} rx={8} fill={`rgba(${color}, 0.1)`} stroke={`rgba(${color}, 0.3)`} strokeWidth={1} strokeDasharray="4 4" />
    </svg>
  );
}

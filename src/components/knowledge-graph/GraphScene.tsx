'use client';

import React, { useState, useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useThree, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { GraphNode } from './GraphNode';
import { GraphEdge } from './GraphEdge';
import { useGraphPhysics } from './useGraphPhysics';
import { knowledgeGraphData, getConnectedNodes } from '@/data/knowledge-graph';
import { KnowledgeNode } from '@/types/knowledge-graph';

interface GraphSceneProps {
  onNodeHover?: (node: KnowledgeNode | null) => void;
  onNodeClick?: (node: KnowledgeNode) => void;
  onNodeFocus?: (node: KnowledgeNode, position: THREE.Vector3, connectedPositions: THREE.Vector3[]) => void;
  pausePhysics?: boolean;
}

export function GraphScene({ onNodeHover, onNodeClick, onNodeFocus, pausePhysics = false }: GraphSceneProps) {
  const router = useRouter();
  const { camera, gl } = useThree();
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);

  // Drag plane for intersection calculation
  const dragPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const dragOffset = useRef(new THREE.Vector3());

  // Initialize physics with drag support (pause when hovering or focused)
  const { positions, getPosition, setNodePosition, lockNode, unlockNode, reheatSimulation } = useGraphPhysics({
    nodes: knowledgeGraphData.nodes,
    edges: knowledgeGraphData.edges,
    enabled: !pausePhysics,
  });

  // Get connected node IDs for the hovered node
  const connectedNodeIds = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>();

    const hoveredNode = knowledgeGraphData.nodes.find(n => n.id === hoveredNodeId);
    if (!hoveredNode) return new Set<string>();

    const connected = new Set<string>(hoveredNode.connections);
    connected.add(hoveredNodeId); // Include the hovered node itself
    return connected;
  }, [hoveredNodeId]);

  // Get highlighted edge keys
  const highlightedEdges = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>();

    const edges = new Set<string>();
    knowledgeGraphData.edges.forEach(edge => {
      if (edge.source === hoveredNodeId || edge.target === hoveredNodeId) {
        edges.add(`${edge.source}-${edge.target}`);
      }
    });
    return edges;
  }, [hoveredNodeId]);

  // Handle node hover
  const handleNodeHover = useCallback(
    (node: KnowledgeNode | null) => {
      setHoveredNodeId(node?.id || null);
      onNodeHover?.(node);
    },
    [onNodeHover]
  );

  // Handle node click (only if not dragging)
  const handleNodeClick = useCallback(
    (node: KnowledgeNode) => {
      // Skip if we were dragging
      if (draggingNodeId) return;

      setSelectedNodeId(node.id);
      onNodeClick?.(node);

      // Trigger camera focus on click with connected node positions
      const position = getPosition(node.id);
      const connectedPositions = node.connections
        .map(id => getPosition(id))
        .filter((p): p is THREE.Vector3 => p !== undefined);
      onNodeFocus?.(node, position, connectedPositions);

      // Navigate to project page if it's a project node
      if (node.type === 'project' && node.url) {
        router.push(node.url);
      }
    },
    [onNodeClick, onNodeFocus, router, draggingNodeId, getPosition]
  );

  // Handle drag start
  const handleDragStart = useCallback(
    (node: KnowledgeNode, event: ThreeEvent<PointerEvent>) => {
      // Don't drag the core node
      if (node.type === 'core') return;

      event.stopPropagation();
      setDraggingNodeId(node.id);
      lockNode(node.id);

      // Set up drag plane perpendicular to camera view
      const nodePos = getPosition(node.id);
      const cameraDir = new THREE.Vector3();
      camera.getWorldDirection(cameraDir);
      dragPlane.current.setFromNormalAndCoplanarPoint(cameraDir, nodePos);

      // Calculate offset from click point to node center
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2(
        (event.clientX / gl.domElement.clientWidth) * 2 - 1,
        -(event.clientY / gl.domElement.clientHeight) * 2 + 1
      );
      raycaster.setFromCamera(mouse, camera);

      const intersectPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(dragPlane.current, intersectPoint);
      dragOffset.current.copy(nodePos).sub(intersectPoint);

      // Add move and up listeners to window
      const handleMove = (e: PointerEvent) => handleDragMove(e, node.id);
      const handleUp = () => handleDragEnd(node.id, handleMove, handleUp);

      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleUp);
    },
    [camera, gl, lockNode, getPosition]
  );

  // Handle drag move
  const handleDragMove = useCallback(
    (event: PointerEvent, nodeId: string) => {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2(
        (event.clientX / gl.domElement.clientWidth) * 2 - 1,
        -(event.clientY / gl.domElement.clientHeight) * 2 + 1
      );
      raycaster.setFromCamera(mouse, camera);

      const intersectPoint = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(dragPlane.current, intersectPoint)) {
        const newPos = intersectPoint.add(dragOffset.current);
        setNodePosition(nodeId, newPos);
      }
    },
    [camera, gl, setNodePosition]
  );

  // Handle drag end
  const handleDragEnd = useCallback(
    (nodeId: string, moveHandler: (e: PointerEvent) => void, upHandler: () => void) => {
      window.removeEventListener('pointermove', moveHandler);
      window.removeEventListener('pointerup', upHandler);

      unlockNode(nodeId);
      reheatSimulation();

      // Delay clearing dragging state to prevent click from firing
      setTimeout(() => setDraggingNodeId(null), 50);
    },
    [unlockNode, reheatSimulation]
  );

  return (
    <group>
      {/* Render edges first (behind nodes) */}
      {knowledgeGraphData.edges.map(edge => {
        const sourcePos = getPosition(edge.source);
        const targetPos = getPosition(edge.target);

        const edgeKey = `${edge.source}-${edge.target}`;
        const isHighlighted = highlightedEdges.has(edgeKey);
        const isDimmed = hoveredNodeId !== null && !isHighlighted;

        return (
          <GraphEdge
            key={edgeKey}
            edge={edge}
            sourcePosition={sourcePos}
            targetPosition={targetPos}
            isHighlighted={isHighlighted}
            isDimmed={isDimmed}
          />
        );
      })}

      {/* Render nodes */}
      {knowledgeGraphData.nodes.map(node => {
        const position = getPosition(node.id);
        const isHovered = hoveredNodeId === node.id;
        const isConnected = connectedNodeIds.has(node.id);
        const isDimmed = hoveredNodeId !== null && !isConnected;
        const isDragging = draggingNodeId === node.id;

        return (
          <GraphNode
            key={node.id}
            node={node}
            position={position}
            isHovered={isHovered}
            isConnected={isConnected}
            isDimmed={isDimmed}
            isDragging={isDragging}
            onClick={() => handleNodeClick(node)}
            onPointerOver={() => handleNodeHover(node)}
            onPointerOut={() => handleNodeHover(null)}
            onPointerDown={(e) => handleDragStart(node, e)}
          />
        );
      })}
    </group>
  );
}

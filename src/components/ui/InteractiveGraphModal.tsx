'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SimpleKnowledgeGraph } from '../sections/SimpleKnowledgeGraph';

interface Book {
  title: string;
  author: string;
  tags: string[];
  progress: number;
}

interface Game {
  title: string;
  studio: string;
  tags: string[];
  hoursPlayed: number;
}

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'book' | 'game' | 'concept';
  color: string;
  metadata?: {
    author?: string;
    studio?: string;
    progress?: number;
    hoursPlayed?: number;
  };
}

interface InteractiveGraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
  games: Game[];
  onNodeClick?: (node: GraphNode | null) => void;
}

export function InteractiveGraphModal({
  isOpen,
  onClose,
  books,
  games,
  onNodeClick
}: InteractiveGraphModalProps) {
  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              zIndex: 9998,
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              margin: 'auto',
              width: 'min(1000px, 90vw)',
              height: 'fit-content',
              maxHeight: '90vh',
              background: 'var(--surface-primary)',
              backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
              WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
              borderRadius: '32px',
              border: '1px solid var(--border-primary)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 20px 60px rgba(0, 0, 0, 0.6)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '2rem 2rem 1rem 2rem',
              borderBottom: '1px solid var(--border-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem',
                }}>
                  Knowledge Network
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  fontWeight: '300',
                }}>
                  Explore connections between books, games, and concepts
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-primary)',
                  background: 'var(--surface-secondary)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--surface-hover)';
                  e.currentTarget.style.borderColor = 'var(--border-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--surface-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-primary)';
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div style={{
              flex: 1,
              padding: '2rem',
              overflow: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <SimpleKnowledgeGraph
                books={books}
                games={games}
                onNodeClick={onNodeClick}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

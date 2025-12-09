'use client';

import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AccordionItem } from './AccordionItem';

interface AccordionGroupItem {
  id: string;
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  icon?: ReactNode;
  accentColor?: string;
  content: ReactNode;
  headerContent?: ReactNode;
}

interface AccordionGroupProps {
  items: AccordionGroupItem[];
  allowMultiple?: boolean;
  defaultOpenId?: string | null;
  gap?: string;
  columns?: number;
}

export function AccordionGroup({
  items,
  allowMultiple = false,
  defaultOpenId = null,
  gap = '0.75rem',
  columns = 1,
}: AccordionGroupProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    defaultOpenId ? new Set([defaultOpenId]) : new Set()
  );

  const handleToggle = (id: string) => {
    setOpenIds((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        // Close this item
        newSet.delete(id);
      } else {
        // Open this item
        if (!allowMultiple) {
          // Auto-collapse: close all others first
          newSet.clear();
        }
        newSet.add(id);
      }

      return newSet;
    });
  };

  const gridStyle = columns > 1 ? {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
  } : {
    display: 'flex',
    flexDirection: 'column' as const,
    gap,
  };

  return (
    <motion.div
      style={gridStyle}
      initial={false}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <AccordionItem
            id={item.id}
            title={item.title}
            subtitle={item.subtitle}
            badge={item.badge}
            icon={item.icon}
            accentColor={item.accentColor}
            isOpen={openIds.has(item.id)}
            onToggle={handleToggle}
            headerContent={item.headerContent}
          >
            {item.content}
          </AccordionItem>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Helper component for expandable sections with a "Show More" button
interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <AccordionItem
      id={title}
      title={title}
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      {children}
    </AccordionItem>
  );
}

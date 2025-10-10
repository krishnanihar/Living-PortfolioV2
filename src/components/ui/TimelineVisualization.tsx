'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  color: string;
  completed?: boolean;
}

interface TimelineVisualizationProps {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
  animate?: boolean;
}

export function TimelineVisualization({
  items,
  orientation = 'vertical',
  animate = true
}: TimelineVisualizationProps) {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) {
      setVisibleItems(new Set(items.map((item) => item.id)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.getAttribute('data-timeline-id');
            if (itemId) {
              setVisibleItems((prev) => new Set([...prev, itemId]));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const itemElements = timelineRef.current?.querySelectorAll('[data-timeline-id]');
    itemElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items, animate]);

  if (orientation === 'horizontal') {
    return (
      <div
        ref={timelineRef}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0',
          overflowX: 'auto',
          paddingBottom: '2rem',
          position: 'relative'
        }}
      >
        {/* Horizontal Line */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            zIndex: 0
          }}
        />

        {items.map((item, index) => {
          const isVisible = visibleItems.has(item.id);
          const Icon = item.completed ? CheckCircle : Circle;

          return (
            <div
              key={item.id}
              data-timeline-id={item.id}
              style={{
                flex: '0 0 250px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) ${index * 0.1}s`
              }}
            >
              {/* Timeline Dot */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: `rgba(${item.color}, 0.15)`,
                  border: `2px solid rgb(${item.color})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: `0 0 20px rgba(${item.color}, 0.3)`
                }}
              >
                <Icon size={24} color={`rgb(${item.color})`} />
              </div>

              {/* Content */}
              <div
                style={{
                  marginTop: '1.5rem',
                  textAlign: 'center',
                  paddingRight: index < items.length - 1 ? '2rem' : 0
                }}
              >
                <h4
                  style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: `rgb(${item.color})`,
                    marginBottom: '0.5rem'
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.5',
                    margin: 0
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Vertical Timeline
  return (
    <div ref={timelineRef} style={{ position: 'relative' }}>
      {/* Vertical Line */}
      <div
        style={{
          position: 'absolute',
          left: '24px',
          top: 0,
          bottom: 0,
          width: '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }}
      />

      {items.map((item, index) => {
        const isVisible = visibleItems.has(item.id);
        const Icon = item.completed ? CheckCircle : Circle;

        return (
          <div
            key={item.id}
            data-timeline-id={item.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '2rem',
              marginBottom: index < items.length - 1 ? '3rem' : 0,
              position: 'relative',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
              transition: `all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) ${index * 0.1}s`
            }}
          >
            {/* Timeline Dot */}
            <div
              style={{
                flex: '0 0 48px',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: `rgba(${item.color}, 0.15)`,
                border: `2px solid rgb(${item.color})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
                boxShadow: `0 0 20px rgba(${item.color}, 0.3)`
              }}
            >
              <Icon size={24} color={`rgb(${item.color})`} />
            </div>

            {/* Content */}
            <div style={{ flex: 1, paddingTop: '0.5rem' }}>
              <h4
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: `rgb(${item.color})`,
                  marginBottom: '0.5rem'
                }}
              >
                {item.title}
              </h4>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.7',
                  margin: 0
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

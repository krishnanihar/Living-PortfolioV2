'use client';

import React, { useEffect, useState } from 'react';

interface ScrollProgressProps {
  sections?: { id: string; label: string }[];
  color?: string;
}

export function ScrollProgress({ sections = [], color = '74, 144, 226' }: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Determine active section
      if (sections.length > 0) {
        for (let i = sections.length - 1; i >= 0; i--) {
          const element = document.getElementById(sections[i].id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= windowHeight / 2) {
              setActiveSection(sections[i].id);
              break;
            }
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'flex-end'
      }}
    >
      {/* Progress Bar */}
      <div
        style={{
          width: '3px',
          height: '200px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${scrollProgress}%`,
            backgroundColor: `rgb(${color})`,
            transition: 'height 0.1s ease-out',
            boxShadow: `0 0 10px rgba(${color}, 0.5)`
          }}
        />
      </div>

      {/* Section Dots */}
      {sections.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'flex-end'
          }}
        >
          {sections.map((section) => (
            <div
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                const label = e.currentTarget.querySelector('.section-label') as HTMLElement;
                if (label) label.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                const label = e.currentTarget.querySelector('.section-label') as HTMLElement;
                if (label && activeSection !== section.id) label.style.opacity = '0';
              }}
            >
              <span
                className="section-label"
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  opacity: activeSection === section.id ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none'
                }}
              >
                {section.label}
              </span>
              <div
                style={{
                  width: activeSection === section.id ? '12px' : '8px',
                  height: activeSection === section.id ? '12px' : '8px',
                  borderRadius: '50%',
                  backgroundColor:
                    activeSection === section.id
                      ? `rgb(${color})`
                      : 'rgba(255, 255, 255, 0.3)',
                  border: `1px solid ${
                    activeSection === section.id
                      ? `rgb(${color})`
                      : 'rgba(255, 255, 255, 0.4)'
                  }`,
                  transition: 'all 0.3s ease',
                  boxShadow:
                    activeSection === section.id
                      ? `0 0 12px rgba(${color}, 0.6)`
                      : 'none'
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Percentage indicator */}
      <div
        style={{
          fontSize: '0.75rem',
          fontWeight: '500',
          color: `rgb(${color})`,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '0.375rem 0.75rem',
          borderRadius: '12px',
          border: `1px solid rgba(${color}, 0.3)`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
      >
        {Math.round(scrollProgress)}%
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { User, GraduationCap, Award } from 'lucide-react';

interface SimpleAboutSectionProps {
  className?: string;
}

export default function SimpleAboutSection({ className = '' }: SimpleAboutSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    let rafId: number;
    let isThrottled = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (isThrottled) return;

      isThrottled = true;
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        setMousePos({ x, y });
        isThrottled = false;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const aboutCards = [
    {
      id: 1,
      title: "Building Living Interfaces",
      subtitle: "Designer & Developer",
      description: "I'm Nihar, crafting interfaces that breathe, remember, and evolve. Currently leading design transformation at Air India DesignLAB, where I build systems that serve 450+ daily users.",
      icon: User,
      highlight: "Air India DesignLAB"
    },
    {
      id: 2,
      title: "Education & Learning",
      subtitle: "Masters + Bachelors in Design",
      description: "Master's in New Media Design from National Institute of Design (2021-2023) and BFA in Design & Applied Arts from JNTU (2016-2020). Specialized in prototyping, systems thinking, and creative coding.",
      icon: GraduationCap,
      highlight: "NID + Creative Coding"
    },
    {
      id: 3,
      title: "4+ Years Experience",
      subtitle: "12 Products Shipped",
      description: "From aviation UX to speculative design explorations, I've shipped products that balance technical innovation with human intuition across multiple domains.",
      icon: Award,
      highlight: "Aviation UX + Speculative Design"
    }
  ];

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&display=swap');

        @keyframes aboutFadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }

        @keyframes aboutFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-2px) scale(1.005);
          }
        }
      `}</style>

      <section style={{
        minHeight: '100vh',
        background: '#000000',
        fontFamily: 'Inter, sans-serif',
        padding: '6rem 1.5rem',
        position: 'relative',
      }} className={className}>
        {/* Subtle background gradient */}
        <div style={{
          position: 'fixed',
          inset: 0,
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%,
            rgba(218, 14, 41, 0.01) 0%,
            transparent 40%)`,
          pointerEvents: 'none',
          transition: 'background 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }} />

        {/* Section Header */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto 5rem',
          animation: 'aboutFadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.6)',
              }} />
            </div>
            <h2 style={{
              fontSize: '0.875rem',
              fontWeight: '300',
              color: 'rgba(255, 255, 255, 0.5)',
              letterSpacing: '0.05em',
            }}>
              About
            </h2>
          </div>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          {aboutCards.map((card, index) => {
            const Icon = card.icon;
            const isHovered = hoveredCard === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  animation: `aboutFadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s both`,
                  transform: isHovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Glass Card Body */}
                <div style={{
                  position: 'relative',
                  background: isHovered
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.005) 100%)',
                  backdropFilter: 'blur(30px) saturate(120%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(120%)',
                  border: isHovered
                    ? '1px solid rgba(255, 255, 255, 0.06)'
                    : '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: '24px',
                  padding: '2.5rem',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isHovered
                    ? 'inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 10px 20px rgba(0, 0, 0, 0.3)'
                    : 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
                }}>
                  {/* Icon */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    animation: isHovered ? 'aboutFloat 3s ease-in-out infinite' : 'none',
                  }}>
                    <Icon size={20} style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }} />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '300',
                      color: 'rgba(255, 255, 255, 0.9)',
                      marginBottom: '0.5rem',
                      letterSpacing: '-0.01em',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
                    }}>
                      {card.title}
                    </h3>

                    <p style={{
                      fontSize: '0.75rem',
                      fontWeight: '300',
                      color: 'rgba(255, 255, 255, 0.4)',
                      letterSpacing: '0.02em',
                      marginBottom: '1.5rem',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      opacity: isHovered ? 0.6 : 0.4,
                    }}>
                      {card.subtitle}
                    </p>

                    <p style={{
                      fontSize: '0.875rem',
                      fontWeight: '300',
                      color: 'rgba(255, 255, 255, 0.6)',
                      lineHeight: '1.6',
                      letterSpacing: '0.01em',
                      marginBottom: '1.5rem',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      opacity: isHovered ? 0.8 : 0.6,
                    }}>
                      {card.description}
                    </p>

                    {/* Highlight */}
                    <div style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.03)',
                      display: 'inline-block',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                    }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '400',
                        color: 'rgba(255, 255, 255, 0.7)',
                        letterSpacing: '0.01em',
                      }}>
                        {card.highlight}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
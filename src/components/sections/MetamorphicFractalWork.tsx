'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BookOpen, Lightbulb, Box, Wrench, Home, Sparkles, Cpu, TestTube, Circle, Hexagon, Heart, ArrowLeft, type LucideIcon } from 'lucide-react';
import { useTheme } from '@/components/effects/ThemeProvider';

export function MetamorphicFractalWork() {
  const { resolvedTheme } = useTheme();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [visibleElements, setVisibleElements] = useState(new Set<string>());
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredOtherProject, setHoveredOtherProject] = useState<number | null>(null);
  const [hoveredCTA, setHoveredCTA] = useState<string | null>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );

    observerRef.current = observer;

    // Observe all reveal elements after mount
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        if (el.id) observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  const otherProjects = [
    {
      id: 1,
      icon: Circle,
      title: 'Design at Air India',
      category: 'Design Systems',
      description: 'Leading design transformation for India\'s flag carrier.',
      year: '2024',
      href: '/work/air-india' as const,
      orbColor: '218, 14, 41'
    },
    {
      id: 2,
      icon: Hexagon,
      title: 'Latent Space',
      category: 'Speculative Design',
      description: 'Speculative design exploration of dream technology ethics.',
      year: '2024',
      href: '/work/latent-space' as const,
      orbColor: '140, 100, 255'
    },
    {
      id: 4,
      icon: Heart,
      title: 'Living Organism',
      category: 'Meta Design',
      description: 'This portfolio website - architected to feel like a living organism.',
      year: '2024',
      href: '/' as const,
      orbColor: '255, 255, 255'
    }
  ] as const;

  const processSteps = [
    {
      icon: BookOpen,
      title: "Research",
      description: "Reading Timothy Leary, Terence McKenna, and Ram Dass; exploring psychedelic subreddits; browsing Erowid for trip reports and safety learnings.",
      color: '255, 0, 122' // Pink
    },
    {
      icon: Lightbulb,
      title: "Conceptualization",
      description: "Ideating across mediums to distill a bathroom–mirror portal motif and an ego-dissolution arc. Mapping sensory stages and consent guardrails.",
      hasLink: true,
      color: '255, 184, 0' // Orange
    },
    {
      icon: Box,
      title: "3D Modelling",
      description: "Blocking the environment in 3D and reviewing the flow in VR to validate spatial pacing before fabrication.",
      color: '0, 255, 255' // Cyan
    },
    {
      icon: Wrench,
      title: "Construction of Metal Frame",
      description: "Welding a stable metal skeleton to support panels, mirror assembly, and embedded sensors.",
      color: '102, 255, 0' // Green
    },
    {
      icon: Home,
      title: "Building the Bathroom",
      description: "Plywood superstructure with granite finishes for realistic tactility; concealed cable runs to keep the illusion intact.",
      color: '181, 131, 255' // Purple
    },
    {
      icon: Sparkles,
      title: "Visuals",
      description: "Generating video sequences using Deforum Stable Diffusion; comparing models, samplers, steps, prompt embeddings for the most organic motion feel.",
      color: '255, 0, 170' // Magenta
    },
    {
      icon: Cpu,
      title: "TouchDesigner + Arduino",
      description: "Tap-sensor input triggers the mirror dissolve; TouchDesigner orchestrates video, audio and light; Arduino handles IO and safety failsafes.",
      color: '0, 200, 255' // Light Blue
    },
    {
      icon: TestTube,
      title: "Testing",
      description: "Every viewer experiences different visuals and timing. Iterative tests tuned thresholds, volume and fade-curves to keep it safe yet profound.",
      color: '140, 255, 180' // Mint
    }
  ];

  const techStack = [
    "TouchDesigner",
    "Arduino",
    "Deforum Stable Diffusion",
    "VR Previz",
    "Granite · Plywood",
    "Audio-Reactive SFX",
    "Safety & Consent Flow"
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&display=swap');

        .psychedelic-page {
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Inter', -apple-system, system-ui, sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .psych-wrap {
          width: min(100%, 1200px);
          margin-inline: auto;
          padding: 0 24px;
        }

        .psych-header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 60px 24px;
          overflow: hidden;
          background: radial-gradient(ellipse at top center, ${resolvedTheme === 'light' ? 'rgba(181,131,255,.15)' : 'rgba(181,131,255,.08)'} 0%, transparent 50%);
        }

        .psych-hero-content {
          text-align: center;
          max-width: 1000px;
          width: 100%;
        }

        .psych-title {
          font-weight: 200;
          letter-spacing: -0.03em;
          line-height: 1.05;
          font-size: clamp(2.5rem, 5vw + 1rem, 5.5rem);
          margin: 25px 0;
        }

        .psych-kicker {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 15px;
        }

        .psych-sub {
          max-width: 900px;
          color: var(--text-secondary);
          font-size: clamp(1rem, .6vw + .9rem, 1.15rem);
          font-weight: 300;
          margin: 30px auto;
          line-height: 1.8;
        }

        .psych-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 16px;
          margin-top: 30px;
          justify-content: center;
        }

        .psych-pill {
          border: 1px solid var(--border-primary);
          background: var(--surface-primary);
          padding: 10px 16px;
          border-radius: 100px;
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 300;
        }

        .psych-pill strong {
          font-weight: 500;
          color: var(--text-primary);
        }

        .psych-aura {
          position: relative;
          display: inline;
        }

        .psych-aura::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: screen;
          filter: blur(8px) saturate(150%);
          background: conic-gradient(from 0deg at 50% 50%, #ff007a 0deg, #ffb800 72deg, #60f 144deg, #0ff 216deg, #0fa 288deg, #ff007a 360deg);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          opacity: ${resolvedTheme === 'light' ? '.25' : '.18'};
          animation: psych-hue 12s linear infinite;
        }

        @keyframes psych-hue {
          to { filter: hue-rotate(360deg) blur(8px) saturate(150%); }
        }

        .psych-cta {
          display: flex;
          gap: 16px;
          margin-top: 40px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .psych-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          border-radius: 100px;
          border: 1px solid var(--border-primary);
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 400;
          font-size: 0.9rem;
          letter-spacing: 0.02em;
          transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
          background: var(--surface-primary);
          cursor: pointer;
          overflow: hidden;
        }

        .psych-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 100px;
          background: linear-gradient(90deg,
            transparent,
            ${resolvedTheme === 'light' ? 'rgba(181, 131, 255, 0.4)' : 'rgba(181, 131, 255, 0.3)'},
            ${resolvedTheme === 'light' ? 'rgba(0, 255, 255, 0.4)' : 'rgba(0, 255, 255, 0.3)'},
            transparent
          );
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }

        .psych-btn:hover::before {
          transform: translateX(100%);
        }

        .psych-btn:hover {
          transform: translateY(-2px);
          border-color: ${resolvedTheme === 'light' ? 'rgba(181,131,255,.4)' : 'rgba(181,131,255,.3)'};
          background: var(--surface-secondary);
          box-shadow: 0 10px 30px ${resolvedTheme === 'light' ? 'rgba(181, 131, 255, 0.2)' : 'rgba(181, 131, 255, 0.15)'};
        }

        .psych-btn.primary {
          background: radial-gradient(100% 100% at 0% 0%, ${resolvedTheme === 'light' ? 'rgba(181,131,255,.2)' : 'rgba(181,131,255,.15)'}, transparent);
          border-color: ${resolvedTheme === 'light' ? 'rgba(181,131,255,.4)' : 'rgba(181,131,255,.3)'};
        }

        .psych-btn.primary::before {
          background: linear-gradient(90deg,
            transparent,
            ${resolvedTheme === 'light' ? 'rgba(255, 0, 122, 0.4)' : 'rgba(255, 0, 122, 0.3)'},
            ${resolvedTheme === 'light' ? 'rgba(255, 184, 0, 0.4)' : 'rgba(255, 184, 0, 0.3)'},
            ${resolvedTheme === 'light' ? 'rgba(0, 255, 255, 0.4)' : 'rgba(0, 255, 255, 0.3)'},
            transparent
          );
        }

        .psych-btn.primary:hover {
          background: radial-gradient(100% 100% at 0% 0%, ${resolvedTheme === 'light' ? 'rgba(181,131,255,.3)' : 'rgba(181,131,255,.25)'}, transparent);
          border-color: ${resolvedTheme === 'light' ? 'rgba(181,131,255,.6)' : 'rgba(181,131,255,.5)'};
          box-shadow: 0 10px 40px ${resolvedTheme === 'light' ? 'rgba(181, 131, 255, 0.3)' : 'rgba(181, 131, 255, 0.25)'};
        }

        .psych-ribbon {
          position: absolute;
          inset: auto -20vw -50% -20vw;
          height: 60vh;
          background: radial-gradient(120% 60% at 50% 50%, ${resolvedTheme === 'light' ? 'rgba(181,131,255,.15)' : 'rgba(181,131,255,.08)'}, transparent 60%),
            conic-gradient(from 90deg at 50% 50%, ${resolvedTheme === 'light' ? 'rgba(255,0,122,.12)' : 'rgba(255,0,122,.08)'}, ${resolvedTheme === 'light' ? 'rgba(0,255,255,.1)' : 'rgba(0,255,255,.06)'}, ${resolvedTheme === 'light' ? 'rgba(0,255,170,.12)' : 'rgba(0,255,170,.08)'}, ${resolvedTheme === 'light' ? 'rgba(255,184,0,.12)' : 'rgba(255,184,0,.08)'}, ${resolvedTheme === 'light' ? 'rgba(255,0,122,.12)' : 'rgba(255,0,122,.08)'});
          filter: blur(100px) saturate(130%);
          opacity: .5;
          pointer-events: none;
          transform: skewY(-8deg);
          animation: psych-ribbonFlow 25s ease-in-out infinite;
        }

        @keyframes psych-ribbonFlow {
          0%, 100% { transform: skewY(-8deg) scale(1) translateY(0); }
          50% { transform: skewY(-8deg) scale(1.05) translateY(-20px); }
        }

        .psych-gradient-transition {
          height: 200px;
          background: linear-gradient(to bottom,
            transparent 0%,
            ${resolvedTheme === 'light' ? 'rgba(181,131,255,.08)' : 'rgba(181,131,255,.03)'} 30%,
            ${resolvedTheme === 'light' ? 'rgba(181,131,255,.1)' : 'rgba(181,131,255,.05)'} 60%,
            transparent 100%
          );
          margin-top: -100px;
          pointer-events: none;
        }

        .psych-section {
          padding: 100px 0;
        }

        .psych-section-title {
          font-size: clamp(1.8rem, 2vw + 1rem, 2.5rem);
          font-weight: 200;
          letter-spacing: -0.02em;
          margin-bottom: 25px;
          text-align: center;
          color: var(--text-primary);
        }

        .psych-lead {
          color: var(--text-secondary);
          max-width: 900px;
          margin: 0 auto 40px auto;
          font-weight: 300;
          font-size: 1.05rem;
          text-align: center;
        }

        .psych-video-wrap {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: var(--surface-primary);
          border: 1px solid var(--border-primary);
          box-shadow: 0 20px 40px ${resolvedTheme === 'light' ? 'rgba(0,0,0,.15)' : 'rgba(0,0,0,.3)'};
        }

        .psych-video-veil {
          position: absolute;
          inset: 0;
          background: radial-gradient(100% 80% at 50% 0%, transparent, ${resolvedTheme === 'light' ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,.2)'} 90%);
          pointer-events: none;
        }

        .psych-caption {
          color: var(--text-muted);
          font-size: 0.875rem;
          margin-top: 15px;
          font-weight: 300;
          text-align: center;
        }

        .psych-process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 500px), 1fr));
          gap: 30px;
        }

        .psych-process-card {
          background: var(--surface-primary);
          border: 1px solid transparent;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          text-align: center;
        }

        .psych-process-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 20px;
          padding: 2px;
          background: linear-gradient(45deg,
            transparent,
            ${resolvedTheme === 'light' ? 'rgba(255, 0, 122, 0.5)' : 'rgba(255, 0, 122, 0.4)'},
            ${resolvedTheme === 'light' ? 'rgba(255, 184, 0, 0.5)' : 'rgba(255, 184, 0, 0.4)'},
            ${resolvedTheme === 'light' ? 'rgba(0, 255, 255, 0.5)' : 'rgba(0, 255, 255, 0.4)'},
            ${resolvedTheme === 'light' ? 'rgba(102, 255, 0, 0.5)' : 'rgba(102, 255, 0, 0.4)'},
            ${resolvedTheme === 'light' ? 'rgba(181, 131, 255, 0.5)' : 'rgba(181, 131, 255, 0.4)'},
            ${resolvedTheme === 'light' ? 'rgba(255, 0, 122, 0.5)' : 'rgba(255, 0, 122, 0.4)'},
            transparent
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .psych-process-card:hover::before {
          opacity: 1;
          animation: psych-borderRotate 4s linear infinite;
        }

        @keyframes psych-borderRotate {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .psych-process-card:hover {
          transform: translateY(-4px);
          background: var(--surface-secondary);
          box-shadow: 0 30px 60px ${resolvedTheme === 'light' ? 'rgba(0,0,0,.15)' : 'rgba(0,0,0,.3)'}, 0 0 40px ${resolvedTheme === 'light' ? 'rgba(181, 131, 255, 0.15)' : 'rgba(181, 131, 255, 0.1)'};
        }

        .psych-process-icon {
          width: 80px;
          height: 80px;
          margin: 30px auto 20px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .psych-process-card:hover .psych-process-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .psych-process-content {
          padding: 0 30px 30px;
        }

        .psych-process-number {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          color: #b583ff;
          margin-bottom: 12px;
          opacity: 0.7;
        }

        .psych-process-card h3 {
          font-size: 1.3rem;
          font-weight: 400;
          letter-spacing: -0.01em;
          margin-bottom: 15px;
          color: var(--text-primary);
        }

        .psych-process-card p {
          color: var(--text-secondary);
          font-weight: 300;
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .psych-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
          gap: 20px;
        }

        .psych-card {
          border: 1px solid var(--border-primary);
          border-radius: 20px;
          background: var(--surface-primary);
          padding: 28px;
          transition: all 0.3s ease;
          position: relative;
          text-align: center;
        }

        .psych-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 20px;
          padding: 1px;
          background: conic-gradient(from 0deg,
            ${resolvedTheme === 'light' ? 'rgba(255, 0, 122, 0.6)' : 'rgba(255, 0, 122, 0.5)'},
            ${resolvedTheme === 'light' ? 'rgba(255, 184, 0, 0.6)' : 'rgba(255, 184, 0, 0.5)'},
            ${resolvedTheme === 'light' ? 'rgba(0, 255, 255, 0.6)' : 'rgba(0, 255, 255, 0.5)'},
            ${resolvedTheme === 'light' ? 'rgba(181, 131, 255, 0.6)' : 'rgba(181, 131, 255, 0.5)'},
            ${resolvedTheme === 'light' ? 'rgba(255, 0, 122, 0.6)' : 'rgba(255, 0, 122, 0.5)'}
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .psych-card:hover::before {
          opacity: 0.6;
          animation: psych-borderSpin 3s linear infinite;
        }

        @keyframes psych-borderSpin {
          from { background-position: 0% 50%; }
          to { background-position: 200% 50%; }
        }

        .psych-card:hover {
          background: var(--surface-secondary);
          transform: translateY(-2px);
          box-shadow: 0 20px 40px ${resolvedTheme === 'light' ? 'rgba(0,0,0,.15)' : 'rgba(0,0,0,.3)'}, 0 0 30px ${resolvedTheme === 'light' ? 'rgba(181, 131, 255, 0.12)' : 'rgba(181, 131, 255, 0.08)'};
        }

        .psych-card p {
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .psych-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }

        .psych-chip {
          border: 1px solid var(--border-primary);
          padding: 10px 18px;
          border-radius: 100px;
          background: var(--surface-primary);
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 300;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .psych-chip::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 100px;
          background: linear-gradient(90deg,
            transparent,
            ${resolvedTheme === 'light' ? 'rgba(181, 131, 255, 0.3)' : 'rgba(181, 131, 255, 0.2)'},
            ${resolvedTheme === 'light' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(0, 255, 255, 0.2)'},
            transparent
          );
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .psych-chip:hover::before {
          transform: translateX(100%);
        }

        .psych-chip:hover {
          border-color: ${resolvedTheme === 'light' ? 'rgba(181, 131, 255, 0.4)' : 'rgba(181, 131, 255, 0.3)'};
          transform: translateY(-2px);
          background: var(--surface-secondary);
          box-shadow: 0 5px 15px ${resolvedTheme === 'light' ? 'rgba(181, 131, 255, 0.15)' : 'rgba(181, 131, 255, 0.1)'};
        }

        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .reveal.on {
          opacity: 1;
          transform: none;
        }

        .psych-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.2;
          pointer-events: none;
          animation: psych-float 25s ease-in-out infinite;
          z-index: 0;
        }

        .psych-orb1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #ff007a, transparent);
          top: 10%;
          right: -150px;
        }

        .psych-orb2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #0ff, transparent);
          bottom: 20%;
          left: -100px;
          animation-delay: -8s;
        }

        .psych-orb3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #ffb800, transparent);
          top: 50%;
          left: 30%;
          animation-delay: -16s;
        }

        @keyframes psych-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(40px, -80px) scale(1.1); }
          50% { transform: translate(-30px, 60px) scale(0.95); }
          75% { transform: translate(20px, -40px) scale(1.05); }
        }

        .psych-section-border {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-primary), transparent);
          margin: 0 auto;
          max-width: 1200px;
        }

        .psych-footer {
          padding: 60px 24px 40px;
          border-top: 1px solid var(--border-primary);
          text-align: center;
        }

        @media (max-width: 768px) {
          .psych-process-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="psychedelic-page">
        {/* Floating orbs */}
        <div className="psych-orb psych-orb1" />
        <div className="psych-orb psych-orb2" />
        <div className="psych-orb psych-orb3" />

        {/* Header */}
        <header className="psych-header">
          <div className="psych-ribbon" aria-hidden="true" />
          <div className="psych-hero-content">
            <span className="psych-kicker">Classroom Project · Immersive Installation</span>
            <h1 className="psych-title">
              <span className="psych-aura" data-text="Metamorphic Fractal Reflections">
                Metamorphic Fractal Reflections
              </span>
            </h1>
            <h2 style={{ fontWeight: 200, fontSize: 'clamp(1.2rem, 2vw + 0.5rem, 2rem)', marginTop: '-10px', color: 'var(--text-primary)' }}>
              A Psychedelic Journey towards Ego Death
            </h2>
            <p className="psych-sub">
              The participant steps into a bathroom, turns on the tap, and watches their reflection dissolve.
              Pulled through the mirror, they traverse a trippy multiverse of liquid color, pattern-creatures
              and structureless yet beautiful music, guided by a fading companion until reality calls them home.
            </p>
            <div className="psych-meta" role="list">
              <span className="psych-pill" role="listitem">Duration: <strong>Two months</strong></span>
              <span className="psych-pill" role="listitem">
                Guide: Jignesh Khakar · Shoban Shah · Kaushal Sapre · Mochu · Suvani Suri · Arshad Pathan · Ravishekhar Aradhya
              </span>
              <span className="psych-pill" role="listitem">
                Based on: Timothy Leary's <em>The Psychedelic Experience</em>
              </span>
              <span className="psych-pill" role="listitem">Goal: Safe, accessible ego-dissolution themes</span>
            </div>
            <div className="psych-cta">
              <a className="psych-btn primary" href="#experience">Watch experience ▶</a>
              <a className="psych-btn" href="#process">See process</a>
            </div>
          </div>
        </header>

        {/* Gradient transition */}
        <div className="psych-gradient-transition" />

        <main>
          {/* Experience / Video */}
          <section id="experience" className="psych-section" style={{ paddingTop: 0, background: `radial-gradient(ellipse at top center, ${resolvedTheme === 'light' ? 'rgba(181,131,255,.08)' : 'rgba(181,131,255,.03)'} 0%, transparent 40%)` }}>
            <div className="psych-wrap">
              <h2 id="exp-title" className={`psych-section-title reveal ${visibleElements.has('exp-title') ? 'on' : ''}`}>
                Experience Film
              </h2>
              <p id="exp-lead" className={`psych-lead reveal ${visibleElements.has('exp-lead') ? 'on' : ''}`}>
                A short capture of the installation and the mirror-portal moment.
              </p>
              <div id="exp-video" className={`psych-video-wrap reveal ${visibleElements.has('exp-video') ? 'on' : ''}`}>
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/0U_BLJTcsDU?si=FmbBoowxVPrfZYkx"
                  title="Metamorphic Fractal Reflections - Experience Film"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{
                    aspectRatio: '16/9',
                    background: 'var(--bg-primary)',
                    borderRadius: '20px'
                  }}
                />
                <div className="psych-video-veil" aria-hidden="true" />
              </div>
              <div className="psych-caption">
                Experience film showing the installation and mirror-portal interaction.
              </div>
            </div>
          </section>

          <div className="psych-section-border" />

          {/* Concept */}
          <section id="concept" className="psych-section">
            <div className="psych-wrap">
              <h2 id="concept-title" className={`psych-section-title reveal ${visibleElements.has('concept-title') ? 'on' : ''}`}>
                Concept
              </h2>
              <div className="psych-grid">
                <article id="concept-1" className={`psych-card reveal ${visibleElements.has('concept-1') ? 'on' : ''}`}>
                  <p>
                    The viewers confront death-like states within an immersive environment. The design intentionally
                    mirrors bardo-like passages: loss of ordinary identity, surrender to sensory overload, and
                    re-emergence with insight. While intense, the aesthetic stays tender and humane, allowing
                    participants to form meaning without prescriptive narrative.
                  </p>
                </article>
                <article id="concept-2" className={`psych-card reveal ${visibleElements.has('concept-2') ? 'on' : ''}`}>
                  <p>
                    Soundscapes avoid rigid structure—free-flowing, emergent, and deeply textural—while visuals
                    behave like sentient reflections (pattern-creatures) born from light itself. The guide archetype
                    appears briefly as a compassionate presence and then recedes, respecting autonomy as reality
                    reasserts itself.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <div className="psych-section-border" />

          {/* Process with Icons */}
          <section id="process" className="psych-section">
            <div className="psych-wrap">
              <div style={{ marginBottom: '60px', textAlign: 'center' }}>
                <h2 className="psych-section-title">Process</h2>
                <p className="psych-lead">
                  Eight stages of creation, from research to final testing.
                </p>
              </div>
              <div className="psych-process-grid">
                {processSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={index}
                      id={`step-${index}`}
                      className={`psych-process-card reveal ${visibleElements.has(`step-${index}`) ? 'on' : ''}`}
                    >
                      <div className="psych-process-icon" style={{
                        background: `rgba(${step.color}, ${resolvedTheme === 'light' ? '0.15' : '0.1'})`
                      }}>
                        <Icon size={40} style={{ color: `rgb(${step.color})` }} />
                      </div>
                      <div className="psych-process-content">
                        <span className="psych-process-number">STAGE {String(index + 1).padStart(2, '0')}</span>
                        <h3>{step.title}</h3>
                        <p>
                          {step.description}
                          {step.hasLink && (
                            <>
                              <br/><br/>
                              <a href="#" rel="noopener" style={{ color: '#b583ff', textDecoration: 'none', fontWeight: 400 }}>→ View MIRO Board</a>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <div className="psych-section-border" />

          {/* Tech Stack */}
          <section id="stack" className="psych-section">
            <div className="psych-wrap">
              <h2 id="tech-title" className={`psych-section-title reveal ${visibleElements.has('tech-title') ? 'on' : ''}`}>
                Tech Stack
              </h2>
              <div
                id="tech-chips"
                className={`psych-chips reveal ${visibleElements.has('tech-chips') ? 'on' : ''}`}
                aria-label="Technologies used"
              >
                {techStack.map((tech, index) => (
                  <span key={index} className="psych-chip">{tech}</span>
                ))}
              </div>
            </div>
          </section>

          <div className="psych-section-border" />

          {/* Ethics */}
          <section id="ethics" className="psych-section">
            <div className="psych-wrap">
              <h2 id="ethics-title" className={`psych-section-title reveal ${visibleElements.has('ethics-title') ? 'on' : ''}`}>
                Notes on Ethics & Safety
              </h2>
              <div className="psych-grid">
                <article id="ethics-1" className={`psych-card reveal ${visibleElements.has('ethics-1') ? 'on' : ''}`}>
                  <p>
                    Inspired by <em>The Psychedelic Experience</em> (Leary et al.), the installation frames
                    ego-dissolution symbolically—no substances involved. The environment includes clear opt-out,
                    calming lights on exit, and staff-visible safety indicators.
                  </p>
                </article>
                <article id="ethics-2" className={`psych-card reveal ${visibleElements.has('ethics-2') ? 'on' : ''}`}>
                  <p>
                    Accessibility: subtitles for audio sequences, path lighting, and a seated option near the mirror.
                    Motion intensity respects <code>prefers-reduced-motion</code>.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <div className="psych-section-border" />

          {/* More Projects */}
          <section className="psych-section">
            <div className="psych-wrap">
              <div style={{
                marginBottom: '3rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}>
                <h2 className="psych-section-title" style={{ marginBottom: 0 }}>
                  More Projects
                </h2>
                <Link
                  href="/work"
                  onMouseEnter={() => setHoveredCTA('back')}
                  onMouseLeave={() => setHoveredCTA(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '12px',
                    background: hoveredCTA === 'back'
                      ? 'var(--surface-secondary)'
                      : 'transparent',
                    border: '1px solid var(--border-primary)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '400',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <ArrowLeft size={16} />
                  <span>All Work</span>
                </Link>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem',
              }}>
                {otherProjects.map((project) => {
                  const Icon = project.icon;
                  const isHovered = hoveredOtherProject === project.id;

                  return (
                    <Link
                      key={project.id}
                      href={project.href}
                      onMouseEnter={() => setHoveredOtherProject(project.id)}
                      onMouseLeave={() => setHoveredOtherProject(null)}
                      style={{
                        position: 'relative',
                        display: 'block',
                        padding: '2rem',
                        borderRadius: '20px',
                        background: 'var(--surface-primary)',
                        backdropFilter: 'blur(40px)',
                        WebkitBackdropFilter: 'blur(40px)',
                        border: '1px solid var(--border-primary)',
                        textDecoration: 'none',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                        boxShadow: isHovered
                          ? `0 20px 40px rgba(${project.orbColor}, ${resolvedTheme === 'light' ? '0.2' : '0.15'})`
                          : `0 4px 8px ${resolvedTheme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.2)'}`,
                      }}
                    >
                      {/* Animated Outline */}
                      {isHovered && (
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '20px',
                          padding: '1px',
                          background: `linear-gradient(135deg, rgba(${project.orbColor}, ${resolvedTheme === 'light' ? '0.7' : '0.6'}), rgba(${project.orbColor}, ${resolvedTheme === 'light' ? '0.3' : '0.2'}), rgba(${project.orbColor}, ${resolvedTheme === 'light' ? '0.7' : '0.6'}))`,
                          backgroundSize: '200% 200%',
                          animation: 'borderShimmer 3s ease-in-out infinite',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                          pointerEvents: 'none',
                        }} />
                      )}

                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: `rgba(${project.orbColor}, ${resolvedTheme === 'light' ? '0.15' : '0.1'})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                      }}>
                        <Icon size={24} style={{ color: `rgb(${project.orbColor})` }} />
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                      }}>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: '400',
                          color: 'var(--text-muted)',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                        }}>
                          {project.category}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', opacity: 0.5 }}>•</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {project.year}
                        </span>
                      </div>

                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '500',
                        color: 'var(--text-primary)',
                        marginBottom: '0.75rem',
                        letterSpacing: '-0.01em',
                      }}>
                        {project.title}
                      </h3>

                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-tertiary)',
                        lineHeight: '1.6',
                      }}>
                        {project.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        <footer className="psych-footer">
          <div className="psych-wrap">
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Metamorphic Fractal Reflections · 2023
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

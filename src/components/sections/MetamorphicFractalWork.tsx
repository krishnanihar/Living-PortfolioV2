'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { cn } from '@/lib/utils';

export function MetamorphicFractalWork() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [visibleElements, setVisibleElements] = useState(new Set<string>());

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.id) {
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

  // Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const processSteps = [
    {
      title: "Research",
      description: "Reading Timothy Leary, Terence McKenna, and Ram Dass; exploring psychedelic subreddits; browsing Erowid for trip reports and safety learnings.",
      imageUrl: "https://picsum.photos/600/400?random=10"
    },
    {
      title: "Conceptualization",
      description: "Ideating across mediums to distill a bathroom–mirror portal motif and an ego-dissolution arc. Mapping sensory stages and consent guardrails.",
      hasLink: true,
      imageUrl: "https://picsum.photos/600/400?random=11"
    },
    {
      title: "3D Modelling",
      description: "Blocking the environment in 3D and reviewing the flow in VR to validate spatial pacing before fabrication.",
      imageUrl: "https://picsum.photos/600/400?random=12"
    },
    {
      title: "Construction of Metal Frame",
      description: "Welding a stable metal skeleton to support panels, mirror assembly, and embedded sensors.",
      imageUrl: "https://picsum.photos/600/400?random=13"
    },
    {
      title: "Building the Bathroom",
      description: "Plywood superstructure with granite finishes for realistic tactility; concealed cable runs to keep the illusion intact.",
      imageUrl: "https://picsum.photos/600/400?random=14"
    },
    {
      title: "Visuals",
      description: "Generating video sequences using Deforum Stable Diffusion; comparing models, samplers, steps, prompt embeddings for the most organic motion feel.",
      imageUrl: "https://picsum.photos/600/400?random=15"
    },
    {
      title: "TouchDesigner + Arduino",
      description: "Tap-sensor input triggers the mirror dissolve; TouchDesigner orchestrates video, audio and light; Arduino handles IO and safety failsafes.",
      imageUrl: "https://picsum.photos/600/400?random=16"
    },
    {
      title: "Testing",
      description: "Every viewer experiences different visuals and timing. Iterative tests tuned thresholds, volume and fade-curves to keep it safe yet profound.",
      imageUrl: "https://picsum.photos/600/400?random=17"
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
        @keyframes psychedelicPulse {
          0%, 100% {
            background: linear-gradient(45deg, rgba(255, 100, 150, 0.1), rgba(50, 200, 150, 0.1));
          }
          50% {
            background: linear-gradient(45deg, rgba(50, 200, 150, 0.1), rgba(140, 100, 255, 0.1));
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(40px, -80px) scale(1.1);
          }
          50% {
            transform: translate(-30px, 60px) scale(0.95);
          }
          75% {
            transform: translate(20px, -40px) scale(1.05);
          }
        }

        @keyframes borderRotate {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        @keyframes shimmer {
          0%, 100% {
            transform: translateX(-5%) scale(1);
          }
          50% {
            transform: translateX(5%) scale(1.02);
          }
        }

        @keyframes ribbonFlow {
          0%, 100% { transform: skewY(-8deg) scale(1) translateY(0); }
          50% { transform: skewY(-8deg) scale(1.05) translateY(-20px); }
        }

        .psychedelic-gradient {
          background: linear-gradient(
            135deg,
            rgba(255, 100, 150, 0.1) 0%,
            rgba(50, 200, 150, 0.1) 25%,
            rgba(140, 100, 255, 0.1) 50%,
            rgba(255, 200, 100, 0.1) 75%,
            rgba(255, 100, 150, 0.1) 100%
          );
          animation: psychedelicPulse 8s var(--ease-premium) infinite;
        }

        .text-glow {
          text-shadow: 0 0 20px rgba(255, 100, 150, 0.3);
        }

        .cursor-prism {
          position: fixed;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          pointer-events: none;
          mix-blend-mode: screen;
          background: radial-gradient(closest-side, rgba(181,131,255,.15), rgba(0,0,0,0));
          filter: blur(30px) saturate(150%);
          opacity: 0.4;
          transition: opacity var(--duration-base) var(--ease-out);
          z-index: 9999;
        }

        .floating-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.2;
          pointer-events: none;
          animation: float 25s var(--ease-premium) infinite;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #ff007a, transparent);
          top: 10%;
          right: -150px;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #0ff, transparent);
          bottom: 20%;
          left: -100px;
          animation-delay: -8s;
        }

        .orb-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #ffb800, transparent);
          top: 50%;
          left: 30%;
          animation-delay: -16s;
        }

        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s var(--ease-premium);
        }

        .reveal.visible {
          opacity: 1;
          transform: none;
        }

        .aura-text::after {
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
          opacity: 0.18;
          animation: psychedelicPulse 12s linear infinite;
        }
      `}</style>

      {/* Portfolio Navigation */}
      <PortfolioNavigation />

      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-pink-400 via-emerald-400 to-purple-400 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Cursor prism effect */}
      <div
        className="cursor-prism"
        aria-hidden="true"
        style={{
          transform: `translate(${cursorPos.x - 150}px, ${cursorPos.y - 150}px)`
        }}
      />

      {/* Floating orbs */}
      <div className="floating-orb orb-1" aria-hidden="true" />
      <div className="floating-orb orb-2" aria-hidden="true" />
      <div className="floating-orb orb-3" aria-hidden="true" />

      <div className="min-h-screen bg-[var(--bg-primary)] relative">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center relative px-8 py-24">
          {/* Psychedelic Background */}
          <div
            className="psychedelic-gradient absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at top center, rgba(181,131,255,.08) 0%, transparent 50%)',
            }}
          />

          {/* Background ribbon */}
          <div
            className="absolute inset-x-[-20vw] bottom-[-50%] h-[60vh] pointer-events-none opacity-50"
            style={{
              background: `radial-gradient(120% 60% at 50% 50%, rgba(181,131,255,.08), transparent 60%),
                          conic-gradient(from 90deg at 50% 50%, rgba(255,0,122,.08), rgba(0,255,255,.06), rgba(0,255,170,.08), rgba(255,184,0,.08), rgba(255,0,122,.08))`,
              filter: 'blur(100px) saturate(130%)',
              transform: 'skewY(-8deg)',
              animation: 'ribbonFlow 25s ease-in-out infinite'
            }}
            aria-hidden="true"
          />

          <div className="text-center relative z-10 max-w-6xl mx-auto">
            <span className="text-micro text-[var(--text-muted)] mb-4 block">
              Classroom Project · Immersive Installation
            </span>

            <h1 className="relative inline-block">
              <span
                className="text-display text-glow mb-6 block text-[var(--text-primary)] aura-text relative"
                data-text="Metamorphic Fractal Reflections"
              >
                Metamorphic Fractal Reflections
              </span>
            </h1>

            <h2 className="text-heading text-[var(--text-secondary)] mb-6">
              A Psychedelic Journey towards Ego Death
            </h2>

            <p className="text-body text-[var(--text-tertiary)] max-w-4xl mx-auto mb-8 leading-relaxed">
              The participant steps into a bathroom, turns on the tap, and watches their reflection dissolve.
              Pulled through the mirror, they traverse a trippy multiverse of liquid color, pattern-creatures
              and structureless yet beautiful music, guided by a fading companion until reality calls them home.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-10">
              <div className="glass-card px-4 py-2 rounded-full text-small text-[var(--text-secondary)]">
                Duration: <span className="font-medium">Two months</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-full text-small text-[var(--text-secondary)]">
                Based on: Timothy Leary's <em>The Psychedelic Experience</em>
              </div>
              <div className="glass-card px-4 py-2 rounded-full text-small text-[var(--text-secondary)]">
                Goal: Safe, accessible ego-dissolution themes
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link
                href="#experience"
                className="glass-card px-6 py-3 rounded-full text-[var(--text-primary)] font-medium hover:bg-[var(--surface-hover)] transition-all duration-[var(--duration-base)] ease-[var(--ease-premium)]"
              >
                Watch experience ▶
              </Link>
              <Link
                href="#process"
                className="glass-card px-6 py-3 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all duration-[var(--duration-base)] ease-[var(--ease-premium)]"
              >
                See process
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-[float_3s_var(--ease-premium)_infinite]">
            <ChevronDown size={24} className="text-[var(--text-muted)]" />
          </div>
        </section>

        {/* Gradient transition */}
        <div
          className="h-48 -mt-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(181,131,255,.03) 30%, rgba(181,131,255,.05) 60%, rgba(0,0,0,0) 100%)'
          }}
        />

        {/* Experience Section */}
        <section id="experience" className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <h2
              id="exp-title"
              className={`text-heading text-[var(--text-primary)] text-center mb-8 reveal ${visibleElements.has('exp-title') ? 'visible' : ''}`}
            >
              Experience Film
            </h2>

            <p
              id="exp-lead"
              className={`text-body text-[var(--text-secondary)] text-center max-w-4xl mx-auto mb-12 reveal ${visibleElements.has('exp-lead') ? 'visible' : ''}`}
            >
              A short capture of the installation and the mirror-portal moment.
            </p>

            <div
              id="exp-video"
              className={`glass-card p-4 rounded-[var(--radius-2xl)] reveal ${visibleElements.has('exp-video') ? 'visible' : ''}`}
            >
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full h-auto aspect-video bg-black rounded-[var(--radius-xl)]"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              >
                <source src="" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video overlay */}
              <div
                className="absolute inset-4 rounded-[var(--radius-xl)] pointer-events-none"
                style={{
                  background: 'radial-gradient(100% 80% at 50% 0%, transparent, rgba(0,0,0,.4) 90%)'
                }}
              />
            </div>

            <div className="text-center mt-4">
              <p className="text-small text-[var(--text-muted)]">
                Replace video source with your final render or Vimeo/YouTube embed.
              </p>
            </div>
          </div>
        </section>

        {/* Section border */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-primary)] to-transparent max-w-7xl mx-auto" />

        {/* Concept Section */}
        <section id="concept" className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <h2
              id="concept-title"
              className={`text-heading text-[var(--text-primary)] text-center mb-16 reveal ${visibleElements.has('concept-title') ? 'visible' : ''}`}
            >
              Concept
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article
                id="concept-1"
                className={`glass-card p-8 rounded-[var(--radius-xl)] hover:bg-[var(--surface-hover)] transition-all duration-[var(--duration-base)] ease-[var(--ease-premium)] reveal ${visibleElements.has('concept-1') ? 'visible' : ''}`}
              >
                <p className="text-body text-[var(--text-secondary)] leading-relaxed">
                  The viewers confront death-like states within an immersive environment. The design intentionally
                  mirrors bardo-like passages: loss of ordinary identity, surrender to sensory overload, and
                  re-emergence with insight. While intense, the aesthetic stays tender and humane, allowing
                  participants to form meaning without prescriptive narrative.
                </p>
              </article>

              <article
                id="concept-2"
                className={`glass-card p-8 rounded-[var(--radius-xl)] hover:bg-[var(--surface-hover)] transition-all duration-[var(--duration-base)] ease-[var(--ease-premium)] reveal ${visibleElements.has('concept-2') ? 'visible' : ''}`}
              >
                <p className="text-body text-[var(--text-secondary)] leading-relaxed">
                  Soundscapes avoid rigid structure—free-flowing, emergent, and deeply textural—while visuals
                  behave like sentient reflections (pattern-creatures) born from light itself. The guide archetype
                  appears briefly as a compassionate presence and then recedes, respecting autonomy as reality
                  reasserts itself.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Section border */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-primary)] to-transparent max-w-7xl mx-auto" />

        {/* Process Section */}
        <section id="process" className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-heading text-[var(--text-primary)] mb-4">Process</h2>
              <p className="text-body text-[var(--text-secondary)] max-w-2xl mx-auto">
                Eight stages of creation, from research to final testing.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  id={`step-${index}`}
                  className={cn(
                    "glass-card rounded-[var(--radius-xl)] overflow-hidden group",
                    "hover:bg-[var(--surface-hover)] hover:scale-[1.02]",
                    "transition-all duration-[var(--duration-slow)] ease-[var(--ease-premium)]",
                    "reveal",
                    visibleElements.has(`step-${index}`) ? 'visible' : ''
                  )}
                >
                  <div className="aspect-video overflow-hidden bg-gradient-to-br from-purple-400/10 to-cyan-400/10">
                    <img
                      src={step.imageUrl}
                      alt={step.title}
                      className="w-full h-full object-cover filter saturate-75 brightness-90 group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[var(--duration-slow)]"
                    />
                  </div>

                  <div className="p-8">
                    <span className="text-micro text-purple-400 opacity-70 mb-3 block">
                      STAGE {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-subheading text-[var(--text-primary)] mb-4">
                      {step.title}
                    </h3>
                    <p className="text-body text-[var(--text-tertiary)] leading-relaxed">
                      {step.description}
                      {step.hasLink && (
                        <span className="block mt-4">
                          <Link href="#" className="text-purple-400 hover:opacity-80 transition-opacity">
                            → View MIRO Board
                          </Link>
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section border */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-primary)] to-transparent max-w-7xl mx-auto" />

        {/* Visuals Gallery */}
        <section id="visuals" className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <h2
              id="vis-title"
              className={`text-heading text-[var(--text-primary)] text-center mb-4 reveal ${visibleElements.has('vis-title') ? 'visible' : ''}`}
            >
              Stills & Frames
            </h2>
            <p
              id="vis-lead"
              className={`text-body text-[var(--text-secondary)] text-center max-w-2xl mx-auto mb-16 reveal ${visibleElements.has('vis-lead') ? 'visible' : ''}`}
            >
              Documentation stills and renders from the installation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(num => (
                <figure
                  key={num}
                  id={`shot-${num}`}
                  className={cn(
                    "glass-card rounded-[var(--radius-xl)] overflow-hidden group",
                    "hover:scale-[1.03] transition-all duration-[var(--duration-slow)] ease-[var(--ease-premium)]",
                    "reveal",
                    visibleElements.has(`shot-${num}`) ? 'visible' : ''
                  )}
                  style={{
                    boxShadow: 'var(--shadow-lg)'
                  }}
                >
                  <img
                    src={`https://picsum.photos/1280/800?random=${num}`}
                    alt={`Fractal still ${num}`}
                    className="w-full h-auto aspect-video object-cover filter saturate-90 group-hover:saturate-110 group-hover:scale-105 transition-all duration-[var(--duration-slow)]"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Section border */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-primary)] to-transparent max-w-7xl mx-auto" />

        {/* Tech Stack */}
        <section id="stack" className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <h2
              id="tech-title"
              className={`text-heading text-[var(--text-primary)] text-center mb-16 reveal ${visibleElements.has('tech-title') ? 'visible' : ''}`}
            >
              Tech Stack
            </h2>

            <div
              id="tech-chips"
              className={cn(
                "flex flex-wrap gap-4 justify-center reveal",
                visibleElements.has('tech-chips') ? 'visible' : ''
              )}
            >
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="glass-card px-6 py-3 rounded-full text-small text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:scale-[1.05] transition-all duration-[var(--duration-base)] ease-[var(--ease-premium)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Section border */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-primary)] to-transparent max-w-7xl mx-auto" />

        {/* Ethics & Safety */}
        <section id="ethics" className="py-24 px-8">
          <div className="max-w-4xl mx-auto">
            <h2
              id="ethics-title"
              className={`text-heading text-[var(--text-primary)] text-center mb-16 reveal ${visibleElements.has('ethics-title') ? 'visible' : ''}`}
            >
              Notes on Ethics & Safety
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article
                id="ethics-1"
                className={`glass-card p-8 rounded-[var(--radius-xl)] hover:bg-[var(--surface-hover)] transition-all duration-[var(--duration-base)] ease-[var(--ease-premium)] reveal ${visibleElements.has('ethics-1') ? 'visible' : ''}`}
              >
                <p className="text-body text-[var(--text-secondary)] leading-relaxed">
                  Inspired by <em>The Psychedelic Experience</em> (Leary et al.), the installation frames
                  ego-dissolution symbolically—no substances involved. The environment includes clear opt-out,
                  calming lights on exit, and staff-visible safety indicators.
                </p>
              </article>

              <article
                id="ethics-2"
                className={`glass-card p-8 rounded-[var(--radius-xl)] hover:bg-[var(--surface-hover)] transition-all duration-[var(--duration-base)] ease-[var(--ease-premium)] reveal ${visibleElements.has('ethics-2') ? 'visible' : ''}`}
              >
                <p className="text-body text-[var(--text-secondary)] leading-relaxed">
                  Accessibility: subtitles for audio sequences, path lighting, and a seated option near the mirror.
                  Motion intensity respects <code className="text-purple-400">prefers-reduced-motion</code>.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-8 border-t border-[var(--border-primary)]">
          <div className="max-w-7xl mx-auto text-center">
            <Link
              href="/work"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-4",
                "bg-gradient-to-r from-pink-400 to-emerald-400",
                "text-white font-medium rounded-full",
                "transition-all duration-[var(--duration-base)] ease-[var(--ease-premium)]",
                "hover:scale-[1.05] hover:shadow-2xl"
              )}
            >
              Back to All Work
            </Link>

            <div className="mt-8 text-small text-[var(--text-muted)]">
              Metamorphic Fractal Reflections · 2024
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
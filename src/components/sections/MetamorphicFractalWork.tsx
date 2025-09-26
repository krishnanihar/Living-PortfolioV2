'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { cn } from '@/lib/utils';

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  details: string;
  duration: string;
}

export function MetamorphicFractalWork() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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

  const timelineSteps: TimelineStep[] = [
    {
      id: 'concept',
      title: 'Conceptualization',
      description: 'Exploring themes of ego dissolution and consciousness',
      details: 'The project began with extensive research into psychedelic experiences, ego dissolution, and the nature of consciousness. Drawing inspiration from bathroom mirror portals as thresholds between realities.',
      duration: '2 weeks'
    },
    {
      id: 'research',
      title: 'Technical Research',
      description: 'Investigating TouchDesigner and Arduino integration',
      details: 'Deep dive into TouchDesigner for real-time visual generation, Arduino for sensor integration, and VR previz techniques for spatial design.',
      duration: '3 weeks'
    },
    {
      id: 'prototyping',
      title: 'Prototyping',
      description: 'Building interactive elements and visual systems',
      details: 'Created modular TouchDesigner networks for pattern generation, implemented Arduino sensor arrays for user interaction, and developed audio-reactive systems.',
      duration: '4 weeks'
    },
    {
      id: 'installation',
      title: 'Installation Design',
      description: 'Spatial design and immersive environment creation',
      details: 'Designed the bathroom mirror portal interface, mapped projection surfaces, and created safety protocols for the psychedelic journey experience.',
      duration: '3 weeks'
    }
  ];

  const techStack = [
    { name: 'TouchDesigner', description: 'Real-time visual generation and interaction' },
    { name: 'Arduino', description: 'Sensor integration and hardware control' },
    { name: 'Deforum Stable Diffusion', description: 'AI-generated psychedelic visuals' },
    { name: 'VR Previz', description: 'Spatial design and user experience testing' },
    { name: 'Audio-Reactive SFX', description: 'Immersive soundscape generation' }
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

        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
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
      `}</style>

      {/* Portfolio Navigation */}
      <PortfolioNavigation />

      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-pink-400 via-emerald-400 to-purple-400 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="min-h-screen bg-[var(--bg-primary)] relative">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center relative px-8 py-16">
          {/* Psychedelic Background */}
          <div
            className="psychedelic-gradient absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at center, rgba(255, 100, 150, 0.05) 0%, transparent 70%)',
            }}
          />

          <div className="text-center relative z-10 max-w-6xl mx-auto">
            <h1 className={cn(
              "text-display text-glow mb-8 animate-[breathe_4s_var(--ease-premium)_infinite]",
              "text-[var(--text-primary)]"
            )}>
              Metamorphic Fractal Reflections
            </h1>

            <p className={cn(
              "text-subheading text-[var(--text-secondary)] max-w-4xl mx-auto mb-12"
            )}>
              An immersive installation exploring consciousness through ego dissolution.
              Participants enter a bathroom mirror portal and traverse a trippy multiverse
              of liquid color and pattern-creatures.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <div className={cn(
                "glass-card px-6 py-3 rounded-[var(--radius-full)]",
                "text-small font-medium text-[var(--text-primary)]"
              )}>
                Interactive Installation
              </div>
              <div className={cn(
                "glass-card px-6 py-3 rounded-[var(--radius-full)]",
                "text-small font-medium text-[var(--text-primary)]"
              )}>
                2 Months Development
              </div>
              <div className={cn(
                "glass-card px-6 py-3 rounded-[var(--radius-full)]",
                "text-small font-medium text-[var(--text-primary)]"
              )}>
                Completed 2023
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-[float_3s_var(--ease-premium)_infinite]">
            <ChevronDown
              size={24}
              className="text-[var(--text-muted)]"
            />
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-24 px-8" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(50, 200, 150, 0.02) 100%)',
        }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-heading text-[var(--text-primary)] text-center mb-8">
              The Experience
            </h2>

            <div className="glass-card p-12 my-8 rounded-[var(--radius-2xl)]">
              <p className="text-body text-[var(--text-secondary)] text-center max-w-4xl mx-auto leading-relaxed">
                Participants begin their journey by gazing into a seemingly ordinary bathroom mirror.
                As sensors detect their presence, the reflection begins to shift and morph, revealing
                portals to other dimensions. TouchDesigner-generated visuals respond to movement and
                breathing patterns, creating a deeply personal and introspective experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              <div className="glass-card p-8 rounded-[var(--radius-xl)]">
                <h3 className="text-subheading mb-4 text-pink-400">
                  Mirror Portal
                </h3>
                <p className="text-body text-[var(--text-tertiary)]">
                  The bathroom mirror serves as the threshold between realities,
                  equipped with depth sensors and computer vision to track participant movement.
                </p>
              </div>

              <div className="glass-card p-8 rounded-[var(--radius-xl)]">
                <h3 className="text-subheading mb-4 text-emerald-400">
                  Reactive Visuals
                </h3>
                <p className="text-body text-[var(--text-tertiary)]">
                  TouchDesigner algorithms generate infinite fractal patterns that respond
                  to breathing, heart rate, and subtle movements of the participant.
                </p>
              </div>

              <div className="glass-card p-8 rounded-[var(--radius-xl)]">
                <h3 className="text-subheading mb-4 text-purple-400">
                  Audio Landscape
                </h3>
                <p className="text-body text-[var(--text-tertiary)]">
                  Spatial audio creates an immersive soundscape that adapts to the visual journey,
                  guiding participants through different states of consciousness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-24 px-8" style={{
          background: 'linear-gradient(180deg, rgba(50, 200, 150, 0.02) 0%, rgba(140, 100, 255, 0.02) 100%)',
        }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-heading text-[var(--text-primary)] text-center mb-16">
              Development Process
            </h2>

            <div className="grid gap-4">
              {timelineSteps.map((step) => (
                <div
                  key={step.id}
                  className={cn(
                    "glass-card p-8 rounded-[var(--radius-xl)] cursor-pointer",
                    "transition-all duration-[var(--duration-slow)] ease-[var(--ease-premium)]",
                    "hover:bg-[var(--surface-hover)]",
                    activeStep === step.id ? "border-pink-400/30" : "border-[var(--border-primary)]"
                  )}
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                >
                  <div className={cn(
                    "flex justify-between items-center",
                    activeStep === step.id ? "mb-4" : "mb-0"
                  )}>
                    <div>
                      <h3 className="text-subheading text-[var(--text-primary)] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-small text-[var(--text-tertiary)]">
                        {step.description}
                      </p>
                    </div>
                    <div className="px-4 py-2 bg-pink-400/10 rounded-lg">
                      <span className="text-micro text-[var(--text-primary)]">
                        {step.duration}
                      </span>
                    </div>
                  </div>

                  {activeStep === step.id && (
                    <div className="pt-4 border-t border-[var(--border-primary)] animate-[fadeIn_300ms_var(--ease-out)]">
                      <p className="text-body text-[var(--text-secondary)]">
                        {step.details}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-24 px-8" style={{
          background: 'linear-gradient(180deg, rgba(140, 100, 255, 0.02) 0%, transparent 100%)',
        }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-heading text-[var(--text-primary)] text-center mb-16">
              Technology Stack
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className={cn(
                    "glass-card p-8 text-center rounded-[var(--radius-xl)]",
                    "transition-all duration-[var(--duration-base)] ease-[var(--ease-premium)]",
                    "hover:bg-[var(--surface-hover)] hover:scale-[1.02]"
                  )}
                >
                  <h3 className="text-subheading mb-4 text-pink-400">
                    {tech.name}
                  </h3>
                  <p className="text-body text-[var(--text-tertiary)]">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ethics & Safety */}
        <section className="py-24 px-8" style={{
          background: 'radial-gradient(circle at center, rgba(255, 100, 150, 0.05) 0%, transparent 70%)',
        }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-heading text-[var(--text-primary)] mb-8">
              Ethics & Safety
            </h2>

            <div className="glass-card p-12 rounded-[var(--radius-2xl)]">
              <p className="text-body text-[var(--text-secondary)] mb-8 leading-relaxed">
                The installation was designed with careful consideration for participant safety and
                psychological well-being. Clear consent protocols, exit mechanisms, and trained
                facilitators ensure a secure exploration of consciousness.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-4">
                  <h4 className="text-body font-semibold mb-2 text-emerald-400">
                    Informed Consent
                  </h4>
                  <p className="text-small text-[var(--text-muted)]">
                    Clear explanation of experience
                  </p>
                </div>
                <div className="p-4">
                  <h4 className="text-body font-semibold mb-2 text-purple-400">
                    Exit Protocols
                  </h4>
                  <p className="text-small text-[var(--text-muted)]">
                    Multiple ways to end session
                  </p>
                </div>
                <div className="p-4">
                  <h4 className="text-body font-semibold mb-2 text-pink-400">
                    Trained Support
                  </h4>
                  <p className="text-small text-[var(--text-muted)]">
                    Facilitators present at all times
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="py-16 px-8 border-t border-[var(--border-primary)]">
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
          </div>
        </section>
      </div>
    </>
  );
}
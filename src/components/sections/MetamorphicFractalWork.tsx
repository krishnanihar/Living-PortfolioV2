'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';

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
      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: #0A0A0A;
          color: white;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }

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

        .psychedelic-gradient {
          background: linear-gradient(
            135deg,
            rgba(255, 100, 150, 0.1) 0%,
            rgba(50, 200, 150, 0.1) 25%,
            rgba(140, 100, 255, 0.1) 50%,
            rgba(255, 200, 100, 0.1) 75%,
            rgba(255, 100, 150, 0.1) 100%
          );
          animation: psychedelicPulse 8s ease-in-out infinite;
        }

        .glassmorphism {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
        }

        .text-glow {
          text-shadow: 0 0 20px rgba(255, 100, 150, 0.3);
        }
      `}</style>

      {/* Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: '2px',
        background: 'linear-gradient(90deg, #FF6496, #32C896, #8C64FF)',
        zIndex: 1000,
        transition: 'width 0.1s ease-out',
      }} />

      {/* Back Navigation */}
      <div style={{
        position: 'fixed',
        top: '2rem',
        left: '2rem',
        zIndex: 100,
      }}>
        <Link href="/work" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          color: 'rgba(255, 255, 255, 0.8)',
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontWeight: '400',
          transition: 'all 0.3s ease',
        }}>
          <ArrowLeft size={16} />
          Back to Work
        </Link>
      </div>

      <div style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        position: 'relative',
      }}>
        {/* Hero Section */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          padding: '2rem',
          background: 'radial-gradient(circle at center, rgba(255, 100, 150, 0.05) 0%, transparent 70%)',
        }}>
          <div className="psychedelic-gradient" style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.3,
          }} />

          <div style={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
          }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: '200',
              marginBottom: '2rem',
              letterSpacing: '-0.02em',
              animation: 'breathe 4s ease-in-out infinite',
            }} className="text-glow">
              Metamorphic Fractal Reflections
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '800px',
              lineHeight: '1.6',
              marginBottom: '3rem',
            }}>
              An immersive installation exploring consciousness through ego dissolution.
              Participants enter a bathroom mirror portal and traverse a trippy multiverse
              of liquid color and pattern-creatures.
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <div className="glassmorphism" style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}>
                Interactive Installation
              </div>
              <div className="glassmorphism" style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}>
                2 Months Development
              </div>
              <div className="glassmorphism" style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}>
                Completed 2023
              </div>
            </div>
          </div>

          <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'float 3s ease-in-out infinite',
          }}>
            <ChevronDown size={24} style={{
              color: 'rgba(255, 255, 255, 0.5)',
            }} />
          </div>
        </section>

        {/* Experience Section */}
        <section style={{
          padding: '6rem 2rem',
          background: 'linear-gradient(180deg, transparent 0%, rgba(50, 200, 150, 0.02) 100%)',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '300',
              marginBottom: '2rem',
              textAlign: 'center',
            }}>
              The Experience
            </h2>

            <div className="glassmorphism" style={{
              padding: '3rem',
              margin: '2rem 0',
            }}>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: '1.8',
                color: 'rgba(255, 255, 255, 0.8)',
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto',
              }}>
                Participants begin their journey by gazing into a seemingly ordinary bathroom mirror.
                As sensors detect their presence, the reflection begins to shift and morph, revealing
                portals to other dimensions. TouchDesigner-generated visuals respond to movement and
                breathing patterns, creating a deeply personal and introspective experience.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginTop: '4rem',
            }}>
              <div className="glassmorphism" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#FF6496' }}>
                  Mirror Portal
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
                  The bathroom mirror serves as the threshold between realities,
                  equipped with depth sensors and computer vision to track participant movement.
                </p>
              </div>

              <div className="glassmorphism" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#32C896' }}>
                  Reactive Visuals
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
                  TouchDesigner algorithms generate infinite fractal patterns that respond
                  to breathing, heart rate, and subtle movements of the participant.
                </p>
              </div>

              <div className="glassmorphism" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#8C64FF' }}>
                  Audio Landscape
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
                  Spatial audio creates an immersive soundscape that adapts to the visual journey,
                  guiding participants through different states of consciousness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section style={{
          padding: '6rem 2rem',
          background: 'linear-gradient(180deg, rgba(50, 200, 150, 0.02) 0%, rgba(140, 100, 255, 0.02) 100%)',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '300',
              marginBottom: '4rem',
              textAlign: 'center',
            }}>
              Development Process
            </h2>

            <div style={{
              display: 'grid',
              gap: '1rem',
            }}>
              {timelineSteps.map((step) => (
                <div key={step.id} className="glassmorphism" style={{
                  padding: '2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: activeStep === step.id ? '1px solid rgba(255, 100, 150, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                }} onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: activeStep === step.id ? '1rem' : '0',
                  }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                        {step.title}
                      </h3>
                      <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>
                        {step.description}
                      </p>
                    </div>
                    <div style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(255, 100, 150, 0.1)',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                    }}>
                      {step.duration}
                    </div>
                  </div>

                  {activeStep === step.id && (
                    <div style={{
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      animation: 'fadeIn 0.3s ease-out',
                    }}>
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        lineHeight: '1.6',
                      }}>
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
        <section style={{
          padding: '6rem 2rem',
          background: 'linear-gradient(180deg, rgba(140, 100, 255, 0.02) 0%, transparent 100%)',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '300',
              marginBottom: '4rem',
              textAlign: 'center',
            }}>
              Technology Stack
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}>
              {techStack.map((tech) => (
                <div key={tech.name} className="glassmorphism" style={{
                  padding: '2rem',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    marginBottom: '1rem',
                    color: '#FF6496',
                  }}>
                    {tech.name}
                  </h3>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.6',
                  }}>
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ethics & Safety */}
        <section style={{
          padding: '6rem 2rem',
          background: 'radial-gradient(circle at center, rgba(255, 100, 150, 0.05) 0%, transparent 70%)',
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '300',
              marginBottom: '2rem',
            }}>
              Ethics & Safety
            </h2>

            <div className="glassmorphism" style={{
              padding: '3rem',
            }}>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: '1.8',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '2rem',
              }}>
                The installation was designed with careful consideration for participant safety and
                psychological well-being. Clear consent protocols, exit mechanisms, and trained
                facilitators ensure a secure exploration of consciousness.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginTop: '2rem',
              }}>
                <div style={{ padding: '1rem' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#32C896' }}>
                    Informed Consent
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    Clear explanation of experience
                  </p>
                </div>
                <div style={{ padding: '1rem' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#8C64FF' }}>
                    Exit Protocols
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    Multiple ways to end session
                  </p>
                </div>
                <div style={{ padding: '1rem' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#FF6496' }}>
                    Trained Support
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    Facilitators present at all times
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section style={{
          padding: '4rem 2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <Link href="/work" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              background: 'linear-gradient(45deg, #FF6496, #32C896)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
            }}>
              <ArrowLeft size={16} />
              Back to All Work
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
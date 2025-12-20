'use client';

import React from 'react';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Map, User, Plane, Users, Heart, Activity, Brain, Eye, ChevronDown } from 'lucide-react';
import { ContactChat } from '../ContactChat';
import { Chatbot } from '../Chatbot';
import Atropos from 'atropos';
import 'atropos/css';
import { useLenisScroll } from '@/hooks/useLenisScroll';

interface AboutSectionV2Props {
  className?: string;
  snapIndex?: number;
}

export default function AboutSectionV2({ className = '', snapIndex }: AboutSectionV2Props) {
  const { scrollTo } = useLenisScroll();
  const [mounted, setMounted] = useState(false);
  const [act1InView, setAct1InView] = useState(false);
  const [act2InView, setAct2InView] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [chatOpen, setChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [pillar1InView, setPillar1InView] = useState(false);
  const [pillar2InView, setPillar2InView] = useState(false);
  const [pillar3InView, setPillar3InView] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const pillar1Ref = useRef<HTMLDivElement>(null);
  const pillar2Ref = useRef<HTMLDivElement>(null);
  const pillar3Ref = useRef<HTMLDivElement>(null);
  const [activeTimeline, setActiveTimeline] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<'about' | 'journey' | null>(null);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    const observers: IntersectionObserver[] = [];

    const observerOptions = { threshold: 0.2, rootMargin: '0px' };

    const act1Observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setAct1InView(true),
      observerOptions
    );
    const act2Observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setAct2InView(true),
      observerOptions
    );

    const act1El = document.getElementById('act-1-philosophy');
    const act2El = document.getElementById('act-2-about');

    if (act1El) { act1Observer.observe(act1El); observers.push(act1Observer); }
    if (act2El) { act2Observer.observe(act2El); observers.push(act2Observer); }

    // Pillar observers for staggered reveal
    const pillarObserverOptions = { threshold: 0.3, rootMargin: '0px' };

    const pillar1Observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setPillar1InView(true),
      pillarObserverOptions
    );
    const pillar2Observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setPillar2InView(true),
      pillarObserverOptions
    );
    const pillar3Observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setPillar3InView(true),
      pillarObserverOptions
    );

    if (pillar1Ref.current) { pillar1Observer.observe(pillar1Ref.current); observers.push(pillar1Observer); }
    if (pillar2Ref.current) { pillar2Observer.observe(pillar2Ref.current); observers.push(pillar2Observer); }
    if (pillar3Ref.current) { pillar3Observer.observe(pillar3Ref.current); observers.push(pillar3Observer); }

    return () => {
      observers.forEach(o => o.disconnect());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Trigger section visibility based on snap scroll index
  // (IntersectionObserver doesn't work with CSS transforms used by snap scrolling)
  useEffect(() => {
    if (snapIndex === 1) {
      setAct1InView(true);
    }
    if (snapIndex !== undefined && snapIndex >= 7) {
      setAct2InView(true);
    }
  }, [snapIndex]);

  // 3D tilt effect for card hover
  const handleCardMouseMove = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4; // Max 4deg tilt
    const rotateY = ((x - centerX) / centerX) * 4;

    setCardTilt({ rotateX, rotateY });
  };

  // Featured projects for full-screen cards
  const featuredProjects = [
    {
      id: 'air-india',
      title: 'Air India',
      category: 'Aviation Design System',
      description: 'Designing experiences for millions of passengers at 30,000ft across mobile app and in-flight entertainment systems',
      image: '/images/air-india/hero.png',
      brandColor: { r: 218, g: 14, b: 41 },
      year: '2024',
      metrics: [
        { icon: Plane, label: '50M+ passengers', value: '50M+' },
        { icon: Users, label: 'System users', value: '10K+' }
      ],
      tags: ['Design System', 'React', 'Aviation', 'Mobile'],
      link: '/work/air-india',
    },
    {
      id: 'psoriassist',
      title: 'PsoriAssist',
      category: 'Healthcare AI Platform',
      description: 'AI-powered psoriasis management platform combining computer vision with clinical insights for personalized patient care',
      image: '/images/Psori_front.png',
      brandColor: { r: 16, g: 185, b: 129 },
      year: '2024',
      metrics: [
        { icon: Heart, label: 'Patient impact', value: 'Winner' },
        { icon: Activity, label: 'Research depth', value: '18mo' }
      ],
      tags: ['AI/ML', 'Healthcare', 'iOS', 'Computer Vision'],
      link: '/work/psoriassist',
    },
    {
      id: 'metamorphic',
      title: 'Metamorphic Fractal Reflections',
      category: 'Immersive Installation',
      description: 'Psychedelic journey installation exploring consciousness, ego dissolution, and the nature of reality through interactive design',
      image: '/images/meta_front.png',
      brandColor: { r: 139, g: 92, b: 246 },
      year: '2023',
      metrics: [
        { icon: Sparkles, label: 'Exhibition', value: 'NID' },
        { icon: Eye, label: 'Experience', value: 'Live' }
      ],
      tags: ['TouchDesigner', 'Arduino', 'Psychedelic', 'Installation'],
      link: '/work/metamorphic-fractal-reflections',
    },
    // HIDDEN: Latent Space WIP
    // {
    //   id: 'latent-space',
    //   title: 'Latent Space',
    //   category: 'Speculative Design Fiction',
    //   description: 'Narrative-driven experiences exploring consciousness technology through scroll-driven storytelling and speculative prototypes',
    //   image: '/images/work/latent-space-hero.jpg',
    //   brandColor: { r: 59, g: 130, b: 246 },
    //   year: '2024',
    //   metrics: [
    //     { icon: Brain, label: 'Narrative', value: '3-Act' },
    //     { icon: Sparkles, label: 'Tech', value: 'WebGL' }
    //   ],
    //   tags: ['Speculative Design', 'Narrative', 'WebGL', 'Ethics'],
    //   link: '/work/latent-space',
    // },
  ];

  const journeyMilestones = [
    {
      year: '1996',
      label: 'The Spark',
      id: 'hyderabad-roots',
      detail: 'Growing up in Hyderabad, tinkering with computers and wondering how interfaces could feel more human.'
    },
    {
      year: '2023',
      label: 'ISB',
      id: 'isb-2022',
      detail: 'Strategic Management Program at Indian School of Business, blending design thinking with business strategy.',
      logoFile: 'ISB.jpeg',
      organization: 'ISB Hyderabad'
    },
    {
      year: '2020',
      label: 'Infosys',
      id: 'infosys-2023',
      detail: 'Digital Experience Design at Infosys, crafting enterprise-scale design systems.',
      logoFile: 'infosys.svg',
      organization: 'Infosys'
    },
    {
      year: '2022',
      label: 'MDes',
      id: 'nid-2021',
      detail: 'Master of Design at National Institute of Design, specializing in Interaction Design.',
      logoFile: 'nid.svg',
      organization: 'NID Gandhinagar'
    },
    {
      year: '2019',
      label: 'BFA',
      id: 'undergrad-2018',
      detail: 'Bachelor of Fine Arts in Communication Design from JNAFAU, exploring the intersection of art and interaction.',
      logoFile: 'JNAFAU.png',
      organization: 'JNAFAU'
    },
    {
      year: '2024',
      label: 'Air India',
      id: 'air-india-2024',
      detail: 'Currently building living interfaces at Air India DesignLAB, reimagining aviation experiences.',
      logoFile: 'air-india.svg',
      organization: 'Air India DesignLAB'
    }
  ];

  // Full-Screen Project Card Component
  interface ProjectCardProps {
    project: typeof featuredProjects[0];
    index: number;
    scrollTo: (target: string | number | HTMLElement, options?: { duration?: number }) => void;
  }

  function FullScreenProjectCard({ project, index, scrollTo }: ProjectCardProps) {
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const atroposRef = useRef<HTMLDivElement>(null);
    const atroposInstance = useRef<ReturnType<typeof Atropos> | null>(null);
    const brandRgb = `${project.brandColor.r}, ${project.brandColor.g}, ${project.brandColor.b}`;
    const isAirIndia = project.id === 'air-india';

    // Initialize Atropos 3D effect on the ENTIRE card (reduced for easier clicking)
    useEffect(() => {
      if (atroposRef.current && !isMobile) {
        atroposInstance.current = Atropos({
          el: atroposRef.current,
          activeOffset: 60,
          rotateXMax: 1,
          rotateYMax: 1,
          shadow: false,
          highlight: false,
          duration: 600,
        });
      }

      return () => {
        if (atroposInstance.current) {
          atroposInstance.current.destroy();
        }
      };
    }, []);

    return (
      <div
        style={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          background: '#000',
        }}
      >
        {/* Atropos Container - Wraps ALL content for full-card 3D effect */}
        <div
          ref={atroposRef}
          className="atropos"
          style={{
            position: 'absolute',
            inset: 0,
          }}
        >
          <div className="atropos-scale" style={{ height: '100%' }}>
            <div className="atropos-rotate" style={{ height: '100%' }}>
              <div className="atropos-inner" style={{ width: '100%', height: '100%', position: 'relative' }}>

                {/* Giant Editorial Number - Parallax BACK */}
                <div
                  data-atropos-offset="-8"
                  style={{
                    position: 'absolute',
                    top: isMobile ? '6%' : '6%',
                    left: isMobile ? '4%' : '4%',
                    fontSize: isMobile ? '28vw' : 'clamp(220px, 30vw, 450px)',
                    fontWeight: '200',
                    color: `rgba(${brandRgb}, 0.15)`,
                    lineHeight: '0.85',
                    letterSpacing: '-0.05em',
                    pointerEvents: 'none',
                    zIndex: 5,
                    textShadow: `0 0 150px rgba(${brandRgb}, 0.3)`,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Multi-Layer Parallax Images */}
                {project.id === 'air-india' ? (
                  <>
                    {/* LAYER 1: Sky Background - Furthest Back */}
                    <div
                      data-atropos-offset="-10"
                      style={{
                        position: 'absolute',
                        inset: '-10%',
                        zIndex: 1,
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src="/images/home/hero-sky.png"
                        alt="Sky background"
                        fill
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                          transform: 'scale(1.2)',
                        }}
                        quality={95}
                        priority
                      />
                    </div>

                    {/* LAYER 2: Clouds - Middle Depth */}
                    <div
                      data-atropos-offset="-5"
                      style={{
                        position: 'absolute',
                        inset: '-10%',
                        zIndex: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src="/images/home/hero-clouds.png"
                        alt="Clouds"
                        fill
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                          transform: 'scale(1.2)',
                        }}
                        quality={95}
                      />
                    </div>

                    {/* LAYER 3: Aircraft - Center */}
                    <div
                      data-atropos-offset="0"
                      style={{
                        position: 'absolute',
                        inset: '-10%',
                        zIndex: 3,
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src="/images/home/hero-aircraft.png"
                        alt="Air India Aircraft"
                        fill
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                          transform: 'scale(1.2)',
                        }}
                        quality={95}
                      />
                    </div>

                    {/* Light gradient overlay for glass panel readability */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: '-10%',
                        background: `linear-gradient(180deg,
                          transparent 0%,
                          transparent 70%,
                          var(--overlay-40) 100%
                        )`,
                        pointerEvents: 'none',
                        zIndex: 4,
                      }}
                    />
                  </>
                ) : project.id === 'psoriassist' ? (
                  <>
                    {/* LAYER 1: Background - Furthest Back */}
                    <div
                      data-atropos-offset="-10"
                      style={{
                        position: 'absolute',
                        inset: '-10%',
                        zIndex: 1,
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src="/images/Psori_back.png"
                        alt=""
                        fill
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                          transform: 'scale(1.2)',
                        }}
                        quality={95}
                        priority
                      />
                    </div>

                    {/* LAYER 2: iPhone - Center */}
                    <div
                      data-atropos-offset="0"
                      style={{
                        position: 'absolute',
                        inset: '-10%',
                        zIndex: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src="/images/Psori_front.png"
                        alt="PsoriAssist App on iPhone"
                        fill
                        style={{
                          objectFit: 'contain',
                          objectPosition: 'center',
                          transform: 'scale(0.9)',
                        }}
                        quality={95}
                        priority
                      />
                    </div>
                  </>
                ) : project.id === 'metamorphic' ? (
                  <>
                    {/* LAYER 1: Background - Furthest Back */}
                    <div
                      data-atropos-offset="-10"
                      style={{
                        position: 'absolute',
                        inset: '-10%',
                        zIndex: 1,
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src="/images/meta_back.png"
                        alt=""
                        fill
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                          transform: 'scale(1.2)',
                        }}
                        quality={95}
                        priority
                      />
                    </div>

                    {/* LAYER 2: Foreground - Center */}
                    <div
                      data-atropos-offset="0"
                      style={{
                        position: 'absolute',
                        inset: '-10%',
                        zIndex: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src="/images/meta_front.png"
                        alt="Metamorphic Fractal Installation"
                        fill
                        style={{
                          objectFit: 'contain',
                          objectPosition: 'center',
                          transform: 'scale(0.9)',
                        }}
                        quality={95}
                        priority
                      />
                    </div>
                  </>
                ) : (
                  /* Single image for other projects */
                  <div
                    data-atropos-offset="-4"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 2,
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center top',
                      }}
                      quality={95}
                    />

                    {/* Light gradient overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(180deg,
                          transparent 0%,
                          transparent 60%,
                          rgba(0, 0, 0, 0.5) 100%
                        )`,
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                )}

                {/* Floating Glass Panel - Parallax FORWARD */}
                <div
                  data-atropos-offset="4"
                  style={{
                      position: 'absolute',
                      bottom: isMobile ? '18%' : '15%',
                      right: isMobile ? '5%' : '8%',
                      width: isMobile ? '90%' : 'clamp(340px, 32vw, 420px)',
                      zIndex: 10,
                      background: `linear-gradient(135deg, var(--glass-04) 0%, var(--glass-02) 50%, var(--glass-03) 100%), var(--overlay-65)`,
                      backdropFilter: 'blur(40px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                      borderRadius: '24px',
                      border: `1px solid rgba(${brandRgb}, 0.2)`,
                      padding: isMobile ? '1.75rem' : '2.25rem',
                      boxShadow: `
                        0 32px 64px var(--overlay-20),
                        0 0 0 1px var(--glass-05),
                        inset 0 1px 0 var(--glass-10),
                        0 0 80px rgba(${brandRgb}, 0.08)
                      `,
                    }}
                  >
                    {/* Category Tag */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.15em',
                          color: isAirIndia ? 'var(--text-50)' : `rgba(${brandRgb}, 0.9)`,
                        }}
                      >
                        {project.category}
                      </span>
                      <span style={{ color: 'var(--text-25)', fontSize: '0.65rem' }}>•</span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: '500',
                          color: 'var(--text-50)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {project.year}
                      </span>
                    </div>

                    {/* Title or Logo */}
                    {project.id === 'air-india' ? (
                      <div
                        data-atropos-offset="2"
                        style={{ margin: '0 0 0.875rem 0' }}
                      >
                        <Image
                          src="/logos/air-india.svg"
                          alt="Air India"
                          width={180}
                          height={64}
                          style={{
                            objectFit: 'contain',
                            opacity: 0.95,
                          }}
                        />
                      </div>
                    ) : (
                      <h2
                        data-atropos-offset="2"
                        style={{
                          fontSize: isMobile ? '1.75rem' : 'clamp(1.875rem, 3vw, 2.5rem)',
                          fontWeight: '300',
                          color: 'var(--text-95)',
                          lineHeight: '1.15',
                          letterSpacing: '-0.02em',
                          margin: '0 0 0.875rem 0',
                        }}
                      >
                        {project.title}
                      </h2>
                    )}

                    {/* Divider line */}
                    <div
                      style={{
                        width: '48px',
                        height: '2px',
                        background: isAirIndia
                          ? 'linear-gradient(90deg, var(--text-20), transparent)'
                          : `linear-gradient(90deg, rgba(${brandRgb}, 0.6), transparent)`,
                        marginBottom: '1rem',
                        borderRadius: '1px',
                      }}
                    />

                    {/* Description */}
                    <p
                      style={{
                        fontSize: isMobile ? '0.875rem' : '0.9375rem',
                        fontWeight: '300',
                        lineHeight: '1.7',
                        color: 'var(--text-60)',
                        margin: '0 0 1.25rem 0',
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                        marginBottom: '1.5rem',
                      }}
                    >
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: '500',
                            color: 'var(--text-50)',
                            background: isAirIndia ? 'var(--glass-05)' : `rgba(${brandRgb}, 0.08)`,
                            border: isAirIndia ? '1px solid var(--text-10)' : `1px solid rgba(${brandRgb}, 0.12)`,
                            borderRadius: '6px',
                            padding: '0.35rem 0.65rem',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button - Pops out MOST */}
                    <Link
                      href={project.link}
                      draggable="false"
                      data-atropos-offset="3"
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        padding: '0.875rem 1.5rem',
                        background: isButtonHovered
                          ? (isAirIndia ? 'var(--glass-10)' : `rgba(${brandRgb}, 0.2)`)
                          : (isAirIndia ? 'var(--glass-05)' : `rgba(${brandRgb}, 0.1)`),
                        border: isAirIndia
                          ? `1px solid var(--text-${isButtonHovered ? '25' : '15'})`
                          : `1px solid rgba(${brandRgb}, ${isButtonHovered ? 0.4 : 0.25})`,
                        borderRadius: '14px',
                        color: 'var(--text-95)',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: isButtonHovered
                          ? (isAirIndia
                              ? '0 12px 32px rgba(0, 0, 0, 0.35)'
                              : `0 12px 32px rgba(0, 0, 0, 0.35), 0 0 24px rgba(${brandRgb}, 0.15)`)
                          : '0 6px 20px rgba(0, 0, 0, 0.25)',
                      }}
                    >
                      <span>View Project</span>
                      <ArrowRight
                        size={16}
                        style={{
                          color: isAirIndia ? (isButtonHovered ? 'var(--text-90)' : 'var(--text-60)') : undefined,
                          transition: 'all 0.3s ease',
                          transform: isButtonHovered ? 'translateX(4px)' : 'translateX(0)',
                        }}
                      />
                    </Link>
                  </div>

              </div>
            </div>
          </div>
        </div>

        {/* Progress Dots - Vertical on LEFT side */}
        <div
          style={{
            position: 'absolute',
            left: isMobile ? '1rem' : '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            zIndex: 20,
          }}
        >
          {featuredProjects.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === index ? '10px' : '6px',
                height: i === index ? '10px' : '6px',
                borderRadius: '50%',
                background: i === index
                  ? `rgba(${brandRgb}, 0.9)`
                  : 'var(--text-25)',
                boxShadow: i === index
                  ? `0 0 12px rgba(${brandRgb}, 0.5), 0 0 24px rgba(${brandRgb}, 0.25)`
                  : 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div
          onClick={() => scrollTo(window.innerHeight * (index + 3), { duration: 0.7 })}
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            opacity: 0.6,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            zIndex: 15,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateX(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.6';
            e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
          }}
        >
          <span style={{
            fontSize: '0.75rem',
            fontWeight: '300',
            letterSpacing: '0.1em',
            color: 'rgba(255, 255, 255, 0.5)',
            textTransform: 'uppercase',
          }}>
            Scroll
          </span>
          <div style={{ animation: 'scrollBounce 3s ease-in-out infinite' }}>
            <ChevronDown size={18} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        /* Fix Atropos pointer events - disable blocking on wrapper layers */
        :global(.atropos-scale) {
          pointer-events: none !important;
        }
        :global(.atropos-rotate) {
          pointer-events: all !important;
        }
        :global(.atropos a),
        :global(.atropos button) {
          pointer-events: all !important;
          position: relative;
          z-index: 10;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blurToSharp {
          from {
            opacity: 0;
            filter: blur(12px);
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }

        @keyframes scrollBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes drawLine {
          from {
            stroke-dashoffset: 100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes borderRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes buttonGlow {
          0%, 100% {
            box-shadow:
              0 12px 48px rgba(0, 0, 0, 0.15),
              0 4px 16px rgba(0, 0, 0, 0.10),
              inset 0 1px 2px rgba(255, 255, 255, 0.25),
              inset 0 -1px 2px rgba(0, 0, 0, 0.15),
              0 0 20px rgba(139, 92, 246, 0.08);
          }
          50% {
            box-shadow:
              0 12px 48px rgba(0, 0, 0, 0.15),
              0 4px 16px rgba(0, 0, 0, 0.10),
              inset 0 1px 2px rgba(255, 255, 255, 0.25),
              inset 0 -1px 2px rgba(0, 0, 0, 0.15),
              0 0 24px rgba(236, 72, 153, 0.12);
          }
        }

        @keyframes projectGlow {
          0%, 100% {
            filter: drop-shadow(0 0 20px var(--text-10));
          }
          50% {
            filter: drop-shadow(0 0 30px var(--text-15));
          }
        }

        /* Project card animated borders */
        .project-card {
          position: relative;
          isolation: isolate;
        }

        .project-card::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 20px;
          padding: 3px;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          z-index: -1;
          animation: borderRotate 4s linear infinite, projectGlow 4s ease-in-out infinite;
          pointer-events: none;
        }

        .project-card:hover::before {
          animation-duration: 3s, 3s;
        }

        /* Air India - Red gradient */
        .project-card-air-india::before {
          background: conic-gradient(
            from 0deg,
            rgba(218, 14, 41, 0.6) 0deg,
            rgba(255, 82, 82, 0.8) 90deg,
            rgba(218, 14, 41, 0.6) 180deg,
            rgba(255, 82, 82, 0.8) 270deg,
            rgba(218, 14, 41, 0.6) 360deg
          );
        }

        .project-card-air-india:hover::before {
          background: conic-gradient(
            from 0deg,
            rgba(218, 14, 41, 0.8) 0deg,
            rgba(255, 82, 82, 1) 90deg,
            rgba(218, 14, 41, 0.8) 180deg,
            rgba(255, 82, 82, 1) 270deg,
            rgba(218, 14, 41, 0.8) 360deg
          );
        }

        /* PsoriAssist - Green gradient */
        .project-card-psoriassist::before {
          background: conic-gradient(
            from 0deg,
            rgba(16, 185, 129, 0.6) 0deg,
            rgba(52, 211, 153, 0.8) 90deg,
            rgba(16, 185, 129, 0.6) 180deg,
            rgba(52, 211, 153, 0.8) 270deg,
            rgba(16, 185, 129, 0.6) 360deg
          );
        }

        .project-card-psoriassist:hover::before {
          background: conic-gradient(
            from 0deg,
            rgba(16, 185, 129, 0.8) 0deg,
            rgba(52, 211, 153, 1) 90deg,
            rgba(16, 185, 129, 0.8) 180deg,
            rgba(52, 211, 153, 1) 270deg,
            rgba(16, 185, 129, 0.8) 360deg
          );
        }

        /* Latent Space - Purple gradient */
        .project-card-latent-space::before {
          background: conic-gradient(
            from 0deg,
            rgba(147, 51, 234, 0.6) 0deg,
            rgba(168, 85, 247, 0.8) 90deg,
            rgba(147, 51, 234, 0.6) 180deg,
            rgba(168, 85, 247, 0.8) 270deg,
            rgba(147, 51, 234, 0.6) 360deg
          );
        }

        .project-card-latent-space:hover::before {
          background: conic-gradient(
            from 0deg,
            rgba(147, 51, 234, 0.8) 0deg,
            rgba(168, 85, 247, 1) 90deg,
            rgba(147, 51, 234, 0.8) 180deg,
            rgba(168, 85, 247, 1) 270deg,
            rgba(147, 51, 234, 0.8) 360deg
          );
        }

        /* Aviation Analytics - Blue gradient */
        .project-card-aviation-analytics::before {
          background: conic-gradient(
            from 0deg,
            rgba(59, 130, 246, 0.6) 0deg,
            rgba(96, 165, 250, 0.8) 90deg,
            rgba(59, 130, 246, 0.6) 180deg,
            rgba(96, 165, 250, 0.8) 270deg,
            rgba(59, 130, 246, 0.6) 360deg
          );
        }

        .project-card-aviation-analytics:hover::before {
          background: conic-gradient(
            from 0deg,
            rgba(59, 130, 246, 0.8) 0deg,
            rgba(96, 165, 250, 1) 90deg,
            rgba(59, 130, 246, 0.8) 180deg,
            rgba(96, 165, 250, 1) 270deg,
            rgba(59, 130, 246, 0.8) 360deg
          );
        }

        /* Pixel Radar - Blue gradient */
        .project-card-pixel-radar::before {
          background: conic-gradient(
            from 0deg,
            rgba(59, 130, 246, 0.6) 0deg,
            rgba(96, 165, 250, 0.8) 90deg,
            rgba(59, 130, 246, 0.6) 180deg,
            rgba(96, 165, 250, 0.8) 270deg,
            rgba(59, 130, 246, 0.6) 360deg
          );
        }

        .project-card-pixel-radar:hover::before {
          background: conic-gradient(
            from 0deg,
            rgba(59, 130, 246, 0.8) 0deg,
            rgba(96, 165, 250, 1) 90deg,
            rgba(59, 130, 246, 0.8) 180deg,
            rgba(96, 165, 250, 1) 270deg,
            rgba(59, 130, 246, 0.8) 360deg
          );
        }

        /* mythOS - Magenta gradient */
        .project-card-mythos::before {
          background: conic-gradient(
            from 0deg,
            rgba(232, 121, 249, 0.6) 0deg,
            rgba(240, 171, 252, 0.8) 90deg,
            rgba(232, 121, 249, 0.6) 180deg,
            rgba(240, 171, 252, 0.8) 270deg,
            rgba(232, 121, 249, 0.6) 360deg
          );
        }

        .project-card-mythos:hover::before {
          background: conic-gradient(
            from 0deg,
            rgba(232, 121, 249, 0.8) 0deg,
            rgba(240, 171, 252, 1) 90deg,
            rgba(232, 121, 249, 0.8) 180deg,
            rgba(240, 171, 252, 1) 270deg,
            rgba(232, 121, 249, 0.8) 360deg
          );
        }

        /* Metamorphic Fractal Reflections - Magenta gradient */
        .project-card-metamorphic-fractal-reflections::before {
          background: conic-gradient(
            from 0deg,
            rgba(232, 121, 249, 0.6) 0deg,
            rgba(240, 171, 252, 0.8) 90deg,
            rgba(232, 121, 249, 0.6) 180deg,
            rgba(240, 171, 252, 0.8) 270deg,
            rgba(232, 121, 249, 0.6) 360deg
          );
        }

        .project-card-metamorphic-fractal-reflections:hover::before {
          background: conic-gradient(
            from 0deg,
            rgba(232, 121, 249, 0.8) 0deg,
            rgba(240, 171, 252, 1) 90deg,
            rgba(232, 121, 249, 0.8) 180deg,
            rgba(240, 171, 252, 1) 270deg,
            rgba(232, 121, 249, 0.8) 360deg
          );
        }

        /* Mobile UX Patterns - Green gradient */
        .project-card-mobile-ux-patterns::before {
          background: conic-gradient(
            from 0deg,
            rgba(16, 185, 129, 0.6) 0deg,
            rgba(52, 211, 153, 0.8) 90deg,
            rgba(16, 185, 129, 0.6) 180deg,
            rgba(52, 211, 153, 0.8) 270deg,
            rgba(16, 185, 129, 0.6) 360deg
          );
        }

        .project-card-mobile-ux-patterns:hover::before {
          background: conic-gradient(
            from 0deg,
            rgba(16, 185, 129, 0.8) 0deg,
            rgba(52, 211, 153, 1) 90deg,
            rgba(16, 185, 129, 0.8) 180deg,
            rgba(52, 211, 153, 1) 270deg,
            rgba(16, 185, 129, 0.8) 360deg
          );
        }

        @keyframes shimmerSweep {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes statusPulse {
          0%, 100% {
            box-shadow: 0 0 8px rgba(52, 211, 153, 0.4);
            opacity: 1;
          }
          50% {
            box-shadow: 0 0 16px rgba(52, 211, 153, 0.8);
            opacity: 0.9;
          }
        }

        @keyframes tagStagger {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes svgGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px var(--text-15));
          }
          50% {
            filter: drop-shadow(0 0 20px var(--text-30));
          }
        }

        @keyframes lightRay {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          50% {
            opacity: 0.6;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) translateX(10px);
            opacity: 0;
          }
        }

        /* Swiper custom styling */
        .swiper {
          width: 100%;
          padding: 0 !important;
        }

        .swiper-slide {
          height: auto;
          display: flex;
        }


        /* Custom navigation buttons - Base styling */
        .custom-nav-prev,
        .custom-nav-next,
        .custom-nav-button {
          width: 56px !important;
          height: 56px !important;
          border-radius: 50% !important;
          background: rgba(0, 0, 0, 0.7) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          border: 1px solid var(--text-10) !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 1px var(--text-10) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          color: 'var(--text-90)' !important;
        }

        .custom-nav-prev:hover,
        .custom-nav-next:hover,
        .custom-nav-button:hover {
          background: 'var(--glass-15)' !important;
          border: 1px solid var(--text-20) !important;
          transform: scale(1.05) !important;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 1px var(--text-10) !important;
        }

        .custom-nav-prev:active,
        .custom-nav-next:active,
        .custom-nav-button:active {
          transform: scale(0.95) !important;
        }

        .custom-nav-button.swiper-button-disabled {
          opacity: 0.3 !important;
          cursor: not-allowed !important;
        }

        .custom-nav-button.swiper-button-disabled:hover {
          background: rgba(0, 0, 0, 0.7) !important;
          border: 1px solid var(--text-10) !important;
          transform: scale(1) !important;
        }

        :global(.swiper-pagination) {
          position: static !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0 !important;
        }

        :global(.swiper-pagination) :global(.swiper-pagination-bullet) {
          width: 8px !important;
          height: 8px !important;
          background: #FFFFFF !important;
          background-color: #FFFFFF !important;
          border: none;
          opacity: 0.7 !important;
          margin: 0 6px !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.swiper-pagination) :global(.swiper-pagination-bullet:hover) {
          opacity: 0.8 !important;
          transform: scale(1.2);
        }

        :global(.swiper-pagination) :global(.swiper-pagination-bullet-active) {
          background: #FFFFFF !important;
          background-color: #FFFFFF !important;
          opacity: 1 !important;
          width: 24px !important;
          border-radius: 4px !important;
        }

        /* Center card prominence - CSS-only approach */
        :global(.swiper-slide) {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
          opacity: 0.5 !important;
        }

        :global(.swiper-slide) > * {
          transform: scale(0.92);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.swiper-slide-active) {
          opacity: 1 !important;
          z-index: 10 !important;
        }

        :global(.swiper-slide-active) > * {
          transform: scale(1.05);
        }

        :global(.swiper-slide-prev),
        :global(.swiper-slide-next) {
          opacity: 0.5 !important;
        }

        :global(.swiper-slide-prev) > *,
        :global(.swiper-slide-next) > * {
          transform: scale(0.95);
        }

        /* Navigation positioning */
        .carousel-navigation {
          margin-top: 32px;
        }

        /* Mobile responsive adjustments for Act 2 timeline */
        @media (max-width: 768px) {
          #act-2-journey .milestone-card {
            padding: 1.5rem !important;
          }

          #act-2-journey .metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .custom-nav-button {
            display: none !important;
          }
        }
      `}</style>

      <section
        style={{
          background: 'transparent',
          padding: '0',
          position: 'relative',
          zIndex: 1,
        }}
        className={className}
      >
        {/* Act 1: The Philosophy */}
        <div
          id="act-1-philosophy"
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6rem 1.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', transform: 'translateY(100px)' }}>
            <h2
              style={{
                fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                fontWeight: '300',
                lineHeight: '1.5',
                letterSpacing: '-0.01em',
                color: 'var(--text-95)',
                marginBottom: '1.5rem',
                opacity: act1InView && mounted ? 1 : 0,
                animation: act1InView && mounted ? 'blurToSharp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' : 'none',
              }}
            >
              Most designers can't{' '}
              <span
                style={{
                  background: 'linear-gradient(120deg, rgba(59,130,246,0.7), rgba(96,165,250,0.8), rgba(59,130,246,0.7), rgba(96,165,250,0.8))',
                  backgroundSize: '200% auto',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '500',
                  animation: 'gradientFlow 18s ease-in-out infinite',
                }}
              >
                code
              </span>
              . Most developers can't{' '}
              <span
                style={{
                  background: 'linear-gradient(120deg, rgba(236,72,153,0.7), rgba(139,92,246,0.8), rgba(236,72,153,0.7), rgba(139,92,246,0.8))',
                  backgroundSize: '200% auto',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '500',
                  animation: 'gradientFlow 18s ease-in-out infinite',
                }}
              >
                design
              </span>
              .
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.9375rem, 1.75vw, 1.125rem)',
                fontWeight: '300',
                lineHeight: '1.6',
                color: 'var(--text-85)',
                marginBottom: '1.5rem',
                opacity: act1InView && mounted ? 1 : 0,
                animation: act1InView && mounted ? 'blurToSharp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' : 'none',
              }}
            >
              I design and code experiences that remember, learn, and scale—
              <br />
              serving <span style={{ fontWeight: '400' }}>millions</span> across aviation, healthcare, and beyond.
            </p>

            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                fontWeight: '400',
                lineHeight: '1.6',
                color: 'var(--text-95)',
                marginBottom: '2rem',
                opacity: act1InView && mounted ? 1 : 0,
                animation: act1InView && mounted ? 'blurToSharp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both' : 'none',
              }}
            >
              Including this site. Designed and coded <span style={{ fontWeight: '500' }}>from the ground up</span>.
            </p>

            {/* Breathing Orb */}
            <div
              style={{
                marginTop: '3rem',
                display: 'flex',
                justifyContent: 'center',
                opacity: act1InView && mounted ? 1 : 0,
                animation: act1InView && mounted ? 'blurToSharp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both' : 'none',
              }}
            >
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(218, 14, 41, 0.4) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 100%)',
                  filter: 'blur(40px)',
                  animation: 'breathe 4s ease-in-out infinite',
                }}
              />
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            onClick={() => scrollTo(window.innerHeight * 2, { duration: 0.7 })}
            style={{
              position: 'absolute',
              bottom: '3rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              opacity: mounted ? 0.6 : 0,
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateX(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.6';
              e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
            }}
          >
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '300',
              letterSpacing: '0.1em',
              color: 'var(--text-50)',
              textTransform: 'uppercase',
            }}>
              Scroll
            </span>
            <div style={{ animation: 'scrollBounce 3s ease-in-out infinite' }}>
              <ChevronDown size={18} style={{ color: 'var(--text-50)' }} />
            </div>
          </div>
        </div>

        {/* Full-Screen Vertical Project Cards */}
        {featuredProjects.map((project, index) => (
          <FullScreenProjectCard
            key={project.id}
            project={project}
            index={index}
            scrollTo={scrollTo}
          />
        ))}

        {/* Full-Screen View All Work Card */}
        <div
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 1.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Liquid Glass Card with Flowing Line Border */}
          <div
            style={{
              position: 'relative',
              maxWidth: '600px',
              width: '100%',
              borderRadius: '30px',
              border: '2px solid transparent',
              background: `
                linear-gradient(var(--solid-95), var(--solid-95)) padding-box,
                conic-gradient(
                  from var(--border-angle),
                  transparent 0%,
                  transparent 10%,
                  #3B82F6 15%,
                  #8B5CF6 25%,
                  #EC4899 35%,
                  transparent 50%,
                  transparent 100%
                ) border-box
              `,
              animation: mounted ? 'rotateBorder 8s linear infinite' : 'none',
            }}
          >
            {/* Inner Glassmorphic Content */}
            <div
              style={{
                position: 'relative',
                background: 'var(--solid-65)',
                backdropFilter: 'blur(120px) saturate(200%) brightness(1.1)',
                WebkitBackdropFilter: 'blur(120px) saturate(200%) brightness(1.1)',
                borderRadius: '28px',
                padding: 'clamp(2.5rem, 5vw, 3.5rem)',
                border: '1px solid var(--text-12)',
                boxShadow: '0 4px 16px var(--glass-08)',
                textAlign: 'center',
              }}
            >
              {/* Project count badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: 'var(--glass-03)',
                  border: '1px solid var(--text-08)',
                  borderRadius: '20px',
                  marginBottom: '2rem',
                }}
              >
                <Sparkles size={14} style={{ color: 'var(--text-50)' }} />
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-60)', fontWeight: '400' }}>
                  12+ Projects
                </span>
              </div>

              {/* Heading */}
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: '300',
                  color: 'var(--text-95)',
                  lineHeight: '1.2',
                  marginBottom: '1.25rem',
                  letterSpacing: '-0.01em',
                }}
              >
                Explore All Projects
              </h2>

              {/* Description */}
              <p
                style={{
                  fontSize: 'clamp(0.9375rem, 1.25vw, 1rem)',
                  fontWeight: '300',
                  color: 'var(--text-60)',
                  lineHeight: '1.7',
                  marginBottom: '2rem',
                  maxWidth: '420px',
                  margin: '0 auto 2rem',
                }}
              >
                From aviation systems serving millions to healthcare AI platforms—
                discover the full range of work.
              </p>

              {/* CTA Button */}
              <Link
                href="/work"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.08))',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '14px',
                  color: 'var(--text-95)',
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: '500',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.12))';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.4), 0 0 24px rgba(59, 130, 246, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.08))';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                }}
              >
                <span>View All Work</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            onClick={() => scrollTo(window.innerHeight * 7, { duration: 0.7 })}
            style={{
              position: 'absolute',
              bottom: '3rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              opacity: mounted ? 0.6 : 0,
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateX(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.6';
              e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
            }}
          >
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '300',
              letterSpacing: '0.1em',
              color: 'var(--text-50)',
              textTransform: 'uppercase',
            }}>
              Scroll
            </span>
            <div style={{ animation: 'scrollBounce 3s ease-in-out infinite' }}>
              <ChevronDown size={18} style={{ color: 'var(--text-50)' }} />
            </div>
          </div>
        </div>

        {/* Act 2: About Me - Three Pillars (Moved below horizontal scroll) */}
        <div
          id="act-2-about"
          ref={timelineRef}
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '4rem 1.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative' }}>
          {/* Liquid Glass Card with Flowing Line Border */}
          <div
            style={{
              position: 'relative',
              maxWidth: '600px',
              margin: '3rem auto 0',
              borderRadius: '30px',
              border: '2px solid transparent',
              background: `
                linear-gradient(var(--solid-95), var(--solid-95)) padding-box,
                conic-gradient(
                  from var(--border-angle),
                  transparent 0%,
                  transparent 10%,
                  #3B82F6 15%,
                  #8B5CF6 25%,
                  #EC4899 35%,
                  transparent 50%,
                  transparent 100%
                ) border-box
              `,
              animation: act2InView && mounted ? 'rotateBorder 8s linear infinite' : 'none',
              opacity: act2InView && mounted ? 1 : 0,
              transform: act2InView && mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
            }}
          >
            <div
              style={{
                position: 'relative',
                background: 'var(--solid-65)',
                backdropFilter: 'blur(120px) saturate(200%) brightness(1.1)',
                WebkitBackdropFilter: 'blur(120px) saturate(200%) brightness(1.1)',
                borderRadius: '28px',
                padding: 'clamp(2.5rem, 5vw, 3rem)',
                border: '1px solid var(--text-12)',
                boxShadow: '0 4px 16px var(--glass-08)',
              }}
            >
              {/* Profile Image - Centered */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '2rem',
                }}
              >
                <div
                  style={{
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: `2px solid var(--text-08)`,
                    background: `linear-gradient(135deg, var(--glass-03), var(--glass-01))`,
                    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 var(--text-10)`,
                  }}
                >
                  <Image
                    src="/images/profile/mypic.png"
                    alt="Krishna Nihar Sunkara - Product Designer"
                    width={180}
                    height={180}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                    priority
                    quality={95}
                  />
                </div>
              </div>

              {/* Name */}
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: '300',
                  marginBottom: '0.75rem',
                  color: 'var(--text-95)',
                  textAlign: 'center',
                }}
              >
                Krishna Nihar Sunkara
              </h2>

              {/* Current Role */}
              <p
                style={{
                  fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                  fontWeight: '300',
                  color: 'var(--text-70)',
                  lineHeight: '1.6',
                  textAlign: 'center',
                  marginBottom: '1rem',
                }}
              >
                Product Designer at{' '}
                <span style={{ color: 'var(--brand-red)', fontWeight: '500' }}>
                  Air India DesignLAB
                </span>
              </p>

              {/* Organization Logos */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  marginBottom: '2.5rem',
                }}
              >
                {[
                  { file: 'nid.svg', alt: 'NID' },
                  { file: 'ISB.jpeg', alt: 'ISB' },
                  { file: 'infosys.svg', alt: 'Infosys' },
                  { file: 'air-india.svg', alt: 'Air India' }
                ].map((logo) => (
                  <div
                    key={logo.file}
                    style={{
                      width: '64px',
                      height: '64px',
                      padding: '8px',
                      borderRadius: '12px',
                      background: 'var(--glass-03)',
                      backdropFilter: 'blur(20px) saturate(110%)',
                      border: '1px solid var(--text-08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Image
                      src={`/logos/${logo.file}`}
                      alt={logo.alt}
                      width={56}
                      height={56}
                      style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                    />
                  </div>
                ))}
              </div>

              {/* CTA Buttons - Hero Style */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                {/* Learn More Button - Pink Accent */}
                <Link href="/about">
                  <div
                    onMouseEnter={() => setHoveredButton('about')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.875rem 1.75rem',
                      background: hoveredButton === 'about'
                        ? `linear-gradient(135deg, rgba(236, 72, 153, 0.04), rgba(139, 92, 246, 0.03))`
                        : `linear-gradient(135deg, rgba(236, 72, 153, 0.03), rgba(139, 92, 246, 0.02))`,
                      backdropFilter: 'blur(100px) saturate(220%) brightness(1.08)',
                      WebkitBackdropFilter: 'blur(100px) saturate(220%) brightness(1.08)',
                      border: hoveredButton === 'about' ? '1px solid rgba(236, 72, 153, 0.12)' : '1px solid rgba(236, 72, 153, 0.08)',
                      borderRadius: '20px',
                      color: 'var(--text-95)',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: hoveredButton === 'about' ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                      overflow: 'hidden',
                      boxShadow: `
                        0 12px 48px var(--glass-15),
                        0 4px 16px var(--glass-10),
                        inset 0 1px 2px var(--glass-25),
                        inset 0 -1px 2px var(--glass-15)
                      `,
                      animation: hoveredButton === 'about' ? 'buttonGlow 8s ease-in-out infinite' : 'none',
                    }}
                  >
                    {/* Refraction layer */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(135deg,
                          rgba(236, 72, 153, 0.08) 0%,
                          transparent 40%,
                          transparent 60%,
                          rgba(139, 92, 246, 0.05) 100%)`,
                        mixBlendMode: 'overlay',
                        pointerEvents: 'none',
                        opacity: hoveredButton === 'about' ? 1 : 0.5,
                        transition: 'opacity 0.3s ease',
                      }}
                    />
                    {/* Shimmer effect */}
                    {hoveredButton === 'about' && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(90deg, transparent 0%, rgba(236, 72, 153, 0.08) 50%, transparent 100%)',
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                    <User size={15} style={{ position: 'relative', zIndex: 1 }} />
                    <span style={{ position: 'relative', zIndex: 1 }}>Learn More</span>
                  </div>
                </Link>

                {/* Full Journey Button - Blue Accent */}
                <Link href="/journey">
                  <div
                    onMouseEnter={() => setHoveredButton('journey')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.875rem 1.75rem',
                      background: hoveredButton === 'journey'
                        ? `linear-gradient(135deg, rgba(59, 130, 246, 0.04), rgba(139, 92, 246, 0.03))`
                        : `linear-gradient(135deg, rgba(59, 130, 246, 0.03), rgba(139, 92, 246, 0.02))`,
                      backdropFilter: 'blur(100px) saturate(220%) brightness(1.08)',
                      WebkitBackdropFilter: 'blur(100px) saturate(220%) brightness(1.08)',
                      border: hoveredButton === 'journey' ? '1px solid rgba(59, 130, 246, 0.12)' : '1px solid rgba(59, 130, 246, 0.08)',
                      borderRadius: '20px',
                      color: 'var(--text-95)',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: hoveredButton === 'journey' ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                      overflow: 'hidden',
                      boxShadow: `
                        0 12px 48px var(--glass-15),
                        0 4px 16px var(--glass-10),
                        inset 0 1px 2px var(--glass-25),
                        inset 0 -1px 2px var(--glass-15)
                      `,
                      animation: hoveredButton === 'journey' ? 'buttonGlow 8s ease-in-out infinite' : 'none',
                    }}
                  >
                    {/* Refraction layer */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(135deg,
                          rgba(59, 130, 246, 0.08) 0%,
                          transparent 40%,
                          transparent 60%,
                          rgba(139, 92, 246, 0.05) 100%)`,
                        mixBlendMode: 'overlay',
                        pointerEvents: 'none',
                        opacity: hoveredButton === 'journey' ? 1 : 0.5,
                        transition: 'opacity 0.3s ease',
                      }}
                    />
                    {/* Shimmer effect */}
                    {hoveredButton === 'journey' && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.08) 50%, transparent 100%)',
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                    <Map size={15} style={{ position: 'relative', zIndex: 1 }} />
                    <span style={{ position: 'relative', zIndex: 1 }}>Full Journey</span>
                  </div>
                </Link>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: '100%',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, var(--text-15), transparent)',
                  margin: '2rem 0',
                }}
              />

              {/* Let's build something together */}
              <div style={{ textAlign: 'center' }}>
                <h3
                  style={{
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                    fontWeight: '300',
                    color: 'var(--text-95)',
                    marginBottom: '0.75rem',
                    lineHeight: '1.2',
                  }}
                >
                  Let's build something <span style={{ color: 'var(--text-95)', fontWeight: '400' }}>together</span>
                </h3>

                <p
                  style={{
                    fontSize: 'clamp(0.875rem, 1.5vw, 0.9375rem)',
                    color: 'var(--text-60)',
                    marginBottom: '1.5rem',
                    fontWeight: '300',
                    lineHeight: '1.5',
                  }}
                >
                  Tell me about your project
                </p>

                <ContactChat
                  onMessageSubmit={(message, intent) => {
                    setInitialMessage(message);
                    setChatOpen(true);
                  }}
                />
              </div>
            </div>
          </div>
          </div>
        </div>

      </section>

      {/* Chatbot Modal */}
      {chatOpen && (
        <Chatbot
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
          intentContext="collaboration"
          initialMessage={initialMessage}
        />
      )}
    </>
  );
}

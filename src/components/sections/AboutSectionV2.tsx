'use client';

import React from 'react';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Map, User, Plane, Users, Heart, Activity, Brain, Eye } from 'lucide-react';
import { ContactChat } from '../ContactChat';
import { Chatbot } from '../Chatbot';
import { useTheme } from '@/components/effects/ThemeProvider';

interface AboutSectionV2Props {
  className?: string;
  snapIndex?: number;
}

export default function AboutSectionV2({ className = '', snapIndex }: AboutSectionV2Props) {
  const { resolvedTheme } = useTheme();
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

  // SVG dynamic color helper (for project-specific colors that can't use CSS variables)
  const getThemedSvgColor = (r: number, g: number, b: number, alpha: number) =>
    resolvedTheme === 'light'
      ? `rgba(${r}, ${g}, ${b}, ${alpha * 0.7})`
      : `rgba(${r}, ${g}, ${b}, ${alpha})`;



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
      image: '/images/work/air-india-hero.jpg',
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
      image: '/images/work/psoriassist-hero.jpg',
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
      image: '/images/work/metamorphic-hero.jpg',
      brandColor: { r: 139, g: 92, b: 246 },
      year: '2023',
      metrics: [
        { icon: Sparkles, label: 'Exhibition', value: 'NID' },
        { icon: Eye, label: 'Experience', value: 'Live' }
      ],
      tags: ['TouchDesigner', 'Arduino', 'Psychedelic', 'Installation'],
      link: '/work/metamorphic-fractal-reflections',
    },
    {
      id: 'latent-space',
      title: 'Latent Space',
      category: 'Speculative Design Fiction',
      description: 'Narrative-driven experiences exploring consciousness technology through scroll-driven storytelling and speculative prototypes',
      image: '/images/work/latent-space-hero.jpg',
      brandColor: { r: 59, g: 130, b: 246 },
      year: '2024',
      metrics: [
        { icon: Brain, label: 'Narrative', value: '3-Act' },
        { icon: Sparkles, label: 'Tech', value: 'WebGL' }
      ],
      tags: ['Speculative Design', 'Narrative', 'WebGL', 'Ethics'],
      link: '/work/latent-space',
    },
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
      logoFile: 'ISB.svg',
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
      logoFile: 'JNAFAU.svg',
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
  }

  function FullScreenProjectCard({ project, index }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageHovered, setImageHovered] = useState(false);
    const brandRgb = `${project.brandColor.r}, ${project.brandColor.g}, ${project.brandColor.b}`;
    const isEven = index % 2 === 0;

    return (
      <div
        style={{
          height: '100vh',
          width: '100%',
          background: `linear-gradient(${isEven ? '135deg' : '225deg'}, rgba(${brandRgb}, 0.04) 0%, #0A0A0A 30%, #0A0A0A 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '4rem 1.5rem' : '4rem clamp(2rem, 5vw, 6rem)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle brand accent line at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: `linear-gradient(90deg, transparent 10%, rgba(${brandRgb}, 0.3) 50%, transparent 90%)`,
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : (isEven ? 'row' : 'row-reverse'),
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '2.5rem' : 'clamp(3rem, 5vw, 5rem)',
            maxWidth: '1400px',
            width: '100%',
          }}
        >
          {/* Image Container */}
          <div
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
            style={{
              position: 'relative',
              width: isMobile ? '100%' : '55%',
              height: isMobile ? '50vh' : '70vh',
              borderRadius: '20px',
              overflow: 'hidden',
              border: `1px solid rgba(${brandRgb}, 0.15)`,
              boxShadow: imageHovered
                ? `0 40px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(${brandRgb}, 0.12)`
                : `0 32px 64px rgba(0, 0, 0, 0.5)`,
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: imageHovered ? 'scale(1.01)' : 'scale(1)',
              flexShrink: 0,
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: imageHovered ? 'scale(1.05)' : 'scale(1)',
              }}
              quality={90}
              priority={index === 0}
            />

            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 50%, rgba(10, 10, 10, 0.5) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Year badge */}
            <div
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(10, 10, 10, 0.8)',
                border: '1px solid var(--text-10)',
                borderRadius: '8px',
                padding: '0.5rem 0.875rem',
                fontSize: '0.75rem',
                fontWeight: '500',
                color: 'var(--text-70)',
                letterSpacing: '0.05em',
              }}
            >
              {project.year}
            </div>

            {/* Metrics overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                background: 'rgba(10, 10, 10, 0.85)',
                border: '1px solid var(--text-10)',
                borderRadius: '14px',
                padding: '0.875rem 1.25rem',
                display: 'flex',
                gap: '1.5rem',
              }}
            >
              {project.metrics.map((metric, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <metric.icon size={14} style={{ color: `rgba(${brandRgb}, 0.9)` }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--text-80)' }}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              width: isMobile ? '100%' : '40%',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {/* Index + Category */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: '400',
                  color: 'var(--text-35)',
                  fontFamily: 'monospace',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span style={{ color: 'var(--text-20)', fontSize: '0.75rem' }}>—</span>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: `rgba(${brandRgb}, 0.8)`,
                }}
              >
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                fontWeight: '200',
                color: 'var(--text-95)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              {project.title}
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: 'clamp(0.9375rem, 1.25vw, 1.0625rem)',
                fontWeight: '300',
                lineHeight: '1.7',
                color: 'var(--text-60)',
                maxWidth: '480px',
                margin: 0,
              }}
            >
              {project.description}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: '400',
                    color: 'var(--text-50)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--text-08)',
                    borderRadius: '6px',
                    padding: '0.375rem 0.75rem',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href={project.link}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                width: 'fit-content',
                marginTop: '0.5rem',
                padding: '1rem 1.75rem',
                background: isHovered
                  ? `rgba(${brandRgb}, 0.15)`
                  : `rgba(${brandRgb}, 0.08)`,
                border: `1px solid rgba(${brandRgb}, ${isHovered ? 0.35 : 0.2})`,
                borderRadius: '14px',
                color: 'var(--text-95)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: isHovered
                  ? `0 12px 32px rgba(0, 0, 0, 0.4), 0 0 24px rgba(${brandRgb}, 0.15)`
                  : `0 8px 24px rgba(0, 0, 0, 0.3)`,
              }}
            >
              <span>View Case Study</span>
              <ArrowRight
                size={16}
                style={{
                  transition: 'transform 0.3s ease',
                  transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                }}
              />
            </Link>
          </div>
        </div>

        {/* Progress indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-30)',
            fontSize: '0.75rem',
            fontFamily: 'monospace',
          }}
        >
          <span style={{ color: `rgba(${brandRgb}, 0.7)` }}>{String(index + 1).padStart(2, '0')}</span>
          <span>/</span>
          <span>{String(featuredProjects.length).padStart(2, '0')}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
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
          fontFamily: 'Inter, sans-serif',
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
        </div>

        {/* Full-Screen Vertical Project Cards */}
        {featuredProjects.map((project, index) => (
          <FullScreenProjectCard
            key={project.id}
            project={project}
            index={index}
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
                linear-gradient(rgba(10, 10, 10, 0.95), rgba(10, 10, 10, 0.95)) padding-box,
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
                background: 'rgba(10, 10, 10, 0.35)',
                backdropFilter: 'blur(120px) saturate(200%) brightness(1.1)',
                WebkitBackdropFilter: 'blur(120px) saturate(200%) brightness(1.1)',
                borderRadius: '28px',
                padding: 'clamp(2.5rem, 5vw, 3.5rem)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.15),
                  0 8px 32px rgba(0, 0, 0, 0.4),
                  0 16px 64px rgba(0, 0, 0, 0.3),
                  0 0 40px rgba(59, 130, 246, 0.08)
                `,
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
                  background: 'rgba(255, 255, 255, 0.03)',
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
                linear-gradient(rgba(10, 10, 10, 0.95), rgba(10, 10, 10, 0.95)) padding-box,
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
                background: 'rgba(10, 10, 10, 0.35)',
                backdropFilter: 'blur(120px) saturate(200%) brightness(1.1)',
                WebkitBackdropFilter: 'blur(120px) saturate(200%) brightness(1.1)',
                borderRadius: '28px',
                padding: 'clamp(2.5rem, 5vw, 3rem)',
                border: `1px solid rgba(255, 255, 255, 0.12)`,
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.15),
                  0 8px 32px rgba(0, 0, 0, 0.4),
                  0 16px 64px rgba(0, 0, 0, 0.3),
                  0 0 40px rgba(59, 130, 246, 0.08)
                `,
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
                  { file: 'ISB.svg', alt: 'ISB' },
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
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: hoveredButton === 'about' ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                      overflow: 'hidden',
                      boxShadow: `
                        0 12px 48px rgba(0, 0, 0, 0.15),
                        0 4px 16px rgba(0, 0, 0, 0.10),
                        inset 0 1px 2px rgba(255, 255, 255, 0.25),
                        inset 0 -1px 2px rgba(0, 0, 0, 0.15)
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
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: hoveredButton === 'journey' ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                      overflow: 'hidden',
                      boxShadow: `
                        0 12px 48px rgba(0, 0, 0, 0.15),
                        0 4px 16px rgba(0, 0, 0, 0.10),
                        inset 0 1px 2px rgba(255, 255, 255, 0.25),
                        inset 0 -1px 2px rgba(0, 0, 0, 0.15)
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

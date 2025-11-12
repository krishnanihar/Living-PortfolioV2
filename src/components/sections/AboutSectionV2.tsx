'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Lightbulb, Trophy, Briefcase, Rocket, Users, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface AboutSectionV2Props {
  className?: string;
}

export default function AboutSectionV2({ className = '' }: AboutSectionV2Props) {
  const [mounted, setMounted] = useState(false);
  const [act1InView, setAct1InView] = useState(false);
  const [act2InView, setAct2InView] = useState(false);
  const [act4InView, setAct4InView] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);
  const [milestonesInView, setMilestonesInView] = useState<boolean[]>([false, false, false, false]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0 });
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

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
    const act4Observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setAct4InView(true),
      observerOptions
    );

    const act1El = document.getElementById('act-1-philosophy');
    const act2El = document.getElementById('act-2-journey');
    const act4El = document.getElementById('act-4-impact');

    if (act1El) { act1Observer.observe(act1El); observers.push(act1Observer); }
    if (act2El) { act2Observer.observe(act2El); observers.push(act2Observer); }
    if (act4El) { act4Observer.observe(act4El); observers.push(act4Observer); }

    // Milestone observers
    const milestoneObservers = [0, 1, 2, 3].map((idx) => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setMilestonesInView(prev => {
              const newState = [...prev];
              newState[idx] = true;
              return newState;
            });
          }
        },
        { threshold: 0.3, rootMargin: '-50px' }
      );
    });

    // Observe each milestone
    setTimeout(() => {
      milestoneObservers.forEach((observer, idx) => {
        const milestoneEl = document.getElementById(`milestone-${idx}`);
        if (milestoneEl) {
          observer.observe(milestoneEl);
          observers.push(observer);
        }
      });
    }, 100);

    return () => observers.forEach(o => o.disconnect());
  }, []);

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

  const projects = [
    {
      title: 'Air India',
      category: 'Enterprise Design Systems',
      description: 'Transforming 450+ daily operations across mobile app and IFE systems',
      link: '/work/air-india' as const,
      color: 'rgba(218, 14, 41, 0.15)',
      borderColor: 'rgba(218, 14, 41, 0.3)',
      orbColor: { r: 218, g: 14, b: 41 },
      status: 'live' as const,
      image: null, // Will use geometric pattern
      tags: ['React', 'Design System', 'Mobile', 'IFE'],
      metric: { icon: Users, label: '10K+ Active Users' },
      year: '2023-2024',
    },
    {
      title: 'PsoriAssist',
      category: 'Healthcare AI',
      description: '18-month research deep dive into AI-powered psoriasis management and patient care',
      link: '/work/psoriassist' as const,
      color: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
      orbColor: { r: 16, g: 185, b: 129 },
      status: 'research' as const,
      image: null,
      tags: ['AI/ML', 'Healthcare', 'iOS', 'Research'],
      metric: { icon: CheckCircle2, label: 'Hackathon Winner' },
      year: '2022-2024',
    },
    {
      title: 'Latent Space',
      category: 'Consciousness Exploration',
      description: 'Narrative-driven experiences exploring consciousness through interactive design',
      link: '/work/latent-space' as const,
      color: 'rgba(147, 51, 234, 0.15)',
      borderColor: 'rgba(147, 51, 234, 0.3)',
      orbColor: { r: 147, g: 51, b: 234 },
      status: 'completed' as const,
      image: null,
      tags: ['Speculative Design', 'Narrative', 'WebGL'],
      metric: { icon: ArrowRight, label: 'Immersive Experience' },
      year: '2024',
    },
    {
      title: 'Aviation Analytics',
      category: 'Real-time Operations',
      description: 'Real-time ops dashboard that reduced decision-making time from minutes to seconds',
      link: '/work/air-india' as const,
      color: 'rgba(59, 130, 246, 0.15)',
      borderColor: 'rgba(59, 130, 246, 0.3)',
      orbColor: { r: 59, g: 130, b: 246 },
      status: 'live' as const,
      image: null,
      tags: ['Data Visualization', 'Real-time', 'Operations', 'React'],
      metric: { icon: Users, label: '450+ Daily Users' },
      year: '2024',
    },
    {
      title: 'Pixel Radar',
      category: 'Design Systems',
      description: 'Figma plugin that audits design components against token systems',
      link: '/work/air-india' as const,
      color: 'rgba(59, 130, 246, 0.15)',
      borderColor: 'rgba(59, 130, 246, 0.3)',
      orbColor: { r: 59, g: 130, b: 246 },
      status: 'live' as const,
      image: null,
      tags: ['Figma Plugin', 'Design Tokens', 'QA Automation', 'JavaScript'],
      metric: { icon: CheckCircle2, label: '90% Review Time Reduction' },
      year: '2024',
    },
    {
      title: 'mythOS',
      category: 'AI Art Curation',
      description: 'AI art curator that sees patterns humans might miss through Gemini AI',
      link: '/work/mythos' as const,
      color: 'rgba(232, 121, 249, 0.15)',
      borderColor: 'rgba(232, 121, 249, 0.3)',
      orbColor: { r: 232, g: 121, b: 249 },
      status: 'completed' as const,
      image: '/projects/mythoscover1.png',
      tags: ['Gemini AI', 'Natural Language', 'AI Curation', 'Art History'],
      metric: { icon: ArrowRight, label: 'Generative Exhibitions' },
      year: '2024',
    },
    {
      title: 'Metamorphic Fractal Reflections',
      category: 'Immersive Installation',
      description: 'Psychedelic journey installation exploring consciousness through ego dissolution',
      link: '/work/metamorphic-fractal-reflections' as const,
      color: 'rgba(232, 121, 249, 0.15)',
      borderColor: 'rgba(232, 121, 249, 0.3)',
      orbColor: { r: 232, g: 121, b: 249 },
      status: 'live' as const,
      image: null,
      tags: ['TouchDesigner', 'Arduino', 'Psychedelic Design', 'Installation'],
      metric: { icon: CheckCircle2, label: 'NID Exhibition 2023' },
      year: '2023',
    },
    {
      title: 'Mobile UX Patterns',
      category: 'Mobile Design System',
      description: 'Comprehensive mobile design system with 40+ patterns for iOS/Android',
      link: '/work/air-india' as const,
      color: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
      orbColor: { r: 16, g: 185, b: 129 },
      status: 'live' as const,
      image: null,
      tags: ['Mobile Design', 'Design System', 'iOS', 'Android'],
      metric: { icon: CheckCircle2, label: '40+ Patterns' },
      year: '2023',
    },
  ];

  const journeyMilestones = [
    {
      year: '2020',
      title: 'The Awakening',
      hook: 'What if interfaces could understand consciousness?',
      event: 'Started exploring consciousness tech & speculative design',
      achievements: [
        'First experiments with design fiction',
        'Discovered Dunne & Raby\'s speculative design',
        'Built first narrative-driven prototypes'
      ],
      icon: Lightbulb,
      category: 'Origin',
      color: 'rgba(147, 51, 234, 0.2)',
      borderColor: 'rgba(147, 51, 234, 0.4)',
    },
    {
      year: '2022',
      title: 'The Breakthrough',
      hook: 'Two hackathons. Same weekend. Both won.',
      event: 'Won 2 hackathons simultaneously—5000 LOC in 48 hours',
      achievements: [
        '5000 lines of code in 48 hours',
        'Built PsoriAssist AI diagnostic system',
        'Created Mythos gaming platform MVP'
      ],
      metrics: [
        { label: 'Lines of Code', value: '5000+' },
        { label: 'Hackathons Won', value: '2' },
        { label: 'Sleep Hours', value: '4' }
      ],
      icon: Trophy,
      category: 'Achievement',
      color: 'rgba(251, 146, 60, 0.2)',
      borderColor: 'rgba(251, 146, 60, 0.4)',
    },
    {
      year: '2023',
      title: 'Enterprise Transformation',
      hook: 'From personal experiments to systems serving thousands.',
      event: 'Joined Air India DesignLAB—transforming enterprise systems',
      achievements: [
        'Designed multi-modal operations dashboard',
        'Built design system for 450+ daily operations',
        'Shipped features used by 10K+ users'
      ],
      metrics: [
        { label: 'Daily Operations', value: '450+' },
        { label: 'Active Users', value: '10K+' },
        { label: 'Team Size', value: '12' }
      ],
      icon: Briefcase,
      category: 'Professional',
      color: 'rgba(218, 14, 41, 0.2)',
      borderColor: 'rgba(218, 14, 41, 0.4)',
    },
    {
      year: '2024',
      title: 'Building at Scale',
      hook: 'Systems that breathe with millions of people.',
      event: 'Building systems that serve millions daily',
      achievements: [
        'Architecting consciousness-aware interfaces',
        'Shipping features to production weekly',
        'Mentoring next generation of designers'
      ],
      metrics: [
        { label: 'Users Served', value: 'Millions' },
        { label: 'Deployments/Week', value: '8+' },
        { label: 'System Uptime', value: '99.9%' }
      ],
      icon: Rocket,
      category: 'Current',
      color: 'rgba(218, 14, 41, 0.2)',
      borderColor: 'rgba(218, 14, 41, 0.4)',
    },
  ];

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

        @keyframes projectGlow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.1));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.15));
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

        /* Swiper custom styling */
        .swiper {
          width: 100%;
          padding: 0 !important;
        }

        .swiper-slide {
          height: auto;
          display: flex;
        }

        /* Custom navigation buttons */
        .custom-nav-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
          boxShadow: 0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .custom-nav-button:active {
          transform: scale(0.95);
        }

        .custom-nav-button.swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .custom-nav-button.swiper-button-disabled:hover {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transform: scale(1);
        }

        .swiper-pagination {
          position: static !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
        }

        .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          background: #FFFFFF !important;
          border: none;
          opacity: 0.5 !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .swiper-pagination-bullet:hover {
          opacity: 0.8 !important;
          transform: scale(1.2);
        }

        .swiper-pagination-bullet-active {
          background: #FFFFFF !important;
          opacity: 1 !important;
          width: 24px !important;
          border-radius: 4px !important;
        }

        /* Center/side card transitions */
        .swiper-slide {
          transition: all 0.3s ease;
          opacity: 0.6;
          transform: scale(0.95);
        }

        .swiper-slide-active {
          opacity: 1 !important;
          transform: scale(1.05) !important;
          z-index: 10;
        }

        .swiper-slide-prev,
        .swiper-slide-next {
          opacity: 0.7;
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
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6rem 1.5rem',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: '200',
                lineHeight: '1.2',
                letterSpacing: '-0.03em',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '2rem',
                opacity: act1InView && mounted ? 1 : 0,
                animation: act1InView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' : 'none',
              }}
            >
              Most interfaces <span style={{ fontStyle: 'italic', opacity: 0.6 }}>forget</span>.
              <br />
              They demand you remember their patterns, their flows, their logic.
            </h2>

            <p
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: '300',
                lineHeight: '1.4',
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '2rem',
                opacity: act1InView && mounted ? 1 : 0,
                animation: act1InView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' : 'none',
              }}
            >
              I build the <span style={{ color: '#DA0E29', fontWeight: '400' }}>opposite</span>.
            </p>

            <div
              style={{
                maxWidth: '800px',
                margin: '0 auto',
                opacity: act1InView && mounted ? 1 : 0,
                animation: act1InView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both' : 'none',
              }}
            >
              <p style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                fontWeight: '300',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.75)',
                marginBottom: '1rem',
              }}>
                Systems that <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: '400' }}>remember context</span>.
              </p>
              <p style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                fontWeight: '300',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.75)',
                marginBottom: '1rem',
              }}>
                Interfaces that <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: '400' }}>breathe with human rhythms</span>.
              </p>
              <p style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                fontWeight: '300',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.75)',
              }}>
                Design that respects the space between intention and interaction.
              </p>
            </div>

            {/* Breathing Orb */}
            <div
              style={{
                marginTop: '4rem',
                display: 'flex',
                justifyContent: 'center',
                opacity: act1InView && mounted ? 1 : 0,
                animation: act1InView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both' : 'none',
              }}
            >
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(218, 14, 41, 0.4) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 100%)',
                  filter: 'blur(40px)',
                  animation: 'breathe 4s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </div>

        {/* Act 2: The Journey - Enhanced Timeline */}
        <div
          id="act-2-journey"
          ref={timelineRef}
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '8rem 1.5rem',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', position: 'relative' }}>
            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h3
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: '300',
                  color: 'rgba(255, 255, 255, 0.95)',
                  marginBottom: '1rem',
                  opacity: act2InView && mounted ? 1 : 0,
                  animation: act2InView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' : 'none',
                }}
              >
                The Journey
              </h3>
              <p
                style={{
                  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                  fontWeight: '300',
                  color: 'rgba(255, 255, 255, 0.65)',
                  maxWidth: '600px',
                  margin: '0 auto',
                  opacity: act2InView && mounted ? 1 : 0,
                  animation: act2InView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' : 'none',
                }}
              >
                From speculative experiments to systems serving millions
              </p>
            </div>

            {/* Timeline Container */}
            <div className="timeline-container" style={{ position: 'relative' }}>
              {/* Milestones */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', position: 'relative', zIndex: 1 }}>
                {journeyMilestones.map((milestone, idx) => {
                  const Icon = milestone.icon;
                  const isInView = milestonesInView[idx] && mounted;
                  const isHovered = hoveredMilestone === idx;

                  return (
                    <div
                      key={idx}
                      id={`milestone-${idx}`}
                      onMouseEnter={() => setHoveredMilestone(idx)}
                      onMouseLeave={() => setHoveredMilestone(null)}
                      style={{
                        position: 'relative',
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? 'translateX(0)' : 'translateX(50px)',
                        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + idx * 0.15}s`,
                      }}
                    >
                      {/* Milestone Card */}
                      <div
                        className="milestone-card"
                        style={{
                          background: isHovered
                            ? 'rgba(10, 10, 10, 0.7)'
                            : 'rgba(10, 10, 10, 0.6)',
                          backdropFilter: 'blur(100px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(100px) saturate(180%)',
                          border: isHovered
                            ? `2px solid ${milestone.borderColor.replace('0.4', '0.8')}`
                            : '1px solid rgba(255, 255, 255, 0.06)',
                          borderRadius: '24px',
                          padding: 'clamp(2rem, 3vw, 2.5rem)',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: isHovered
                            ? `0px 8px 32px rgba(0, 0, 0, 0.5), 0px 0px 24px ${milestone.borderColor.replace('0.4', '0.12')}, 0px 0px 8px rgba(255, 255, 255, 0.02) inset`
                            : '0px 4px 20px rgba(0, 0, 0, 0.4), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {/* Category Badge */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            padding: '0.375rem 0.875rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '8px',
                            fontSize: '0.6875rem',
                            fontWeight: '500',
                            color: 'rgba(255, 255, 255, 0.5)',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {milestone.category}
                        </div>

                        {/* Header: Icon + Year + Title */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1.5rem' }}>
                          <div
                            style={{
                              width: '56px',
                              height: '56px',
                              borderRadius: '14px',
                              background: 'rgba(255, 255, 255, 0.02)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <Icon size={28} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                          </div>

                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: '1.75rem',
                                fontWeight: '600',
                                color: isHovered
                                  ? milestone.borderColor.replace(/[\d.]+\)$/, '1)')
                                  : 'rgba(255, 255, 255, 0.4)',
                                marginBottom: '0.5rem',
                                letterSpacing: '-0.01em',
                                transition: 'color 0.3s ease',
                              }}
                            >
                              {milestone.year}
                            </div>
                            <h4
                              style={{
                                fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)',
                                fontWeight: '400',
                                color: 'rgba(255, 255, 255, 0.95)',
                                marginBottom: '0.5rem',
                                lineHeight: '1.3',
                              }}
                            >
                              {milestone.title}
                            </h4>
                          </div>
                        </div>

                        {/* Hook Quote */}
                        <div
                          style={{
                            fontSize: 'clamp(1.0625rem, 1.75vw, 1.25rem)',
                            fontWeight: '300',
                            fontStyle: 'italic',
                            color: 'rgba(255, 255, 255, 0.65)',
                            marginBottom: '1.5rem',
                            lineHeight: '1.6',
                          }}
                        >
                          "{milestone.hook}"
                        </div>

                        {/* Event Description */}
                        <p
                          style={{
                            fontSize: 'clamp(1rem, 1.75vw, 1.125rem)',
                            fontWeight: '300',
                            color: 'rgba(255, 255, 255, 0.75)',
                            lineHeight: '1.7',
                            marginBottom: '1.5rem',
                          }}
                        >
                          {milestone.event}
                        </p>

                        {/* Achievements List */}
                        {milestone.achievements && milestone.achievements.length > 0 && (
                          <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                              {milestone.achievements.map((achievement, achIdx) => (
                                <div
                                  key={achIdx}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem',
                                    opacity: isInView ? 1 : 0,
                                    transform: isInView ? 'translateX(0)' : 'translateX(20px)',
                                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + achIdx * 0.1}s`,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: '4px',
                                      height: '4px',
                                      borderRadius: '50%',
                                      background: 'rgba(255, 255, 255, 0.3)',
                                      marginTop: '0.5rem',
                                      flexShrink: 0,
                                    }}
                                  />
                                  <span
                                    style={{
                                      fontSize: '0.9375rem',
                                      fontWeight: '300',
                                      color: 'rgba(255, 255, 255, 0.6)',
                                      lineHeight: '1.65',
                                    }}
                                  >
                                    {achievement}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Metrics Grid */}
                        {milestone.metrics && milestone.metrics.length > 0 && (
                          <div
                            className="metrics-grid"
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                              gap: '1.5rem',
                              marginTop: '2rem',
                              paddingTop: '1.5rem',
                              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                            }}
                          >
                            {milestone.metrics.map((metric, metricIdx) => (
                              <div
                                key={metricIdx}
                                style={{
                                  opacity: isInView ? 1 : 0,
                                  transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.7 + metricIdx * 0.1}s`,
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)',
                                    fontWeight: '500',
                                    color: isHovered
                                      ? milestone.borderColor.replace(/[\d.]+\)$/, '1)')
                                      : 'rgba(255, 255, 255, 0.9)',
                                    marginBottom: '0.375rem',
                                    lineHeight: '1.2',
                                    transition: 'color 0.3s ease',
                                  }}
                                >
                                  {metric.value}
                                </div>
                                <div
                                  style={{
                                    fontSize: '0.75rem',
                                    fontWeight: '400',
                                    color: 'rgba(255, 255, 255, 0.4)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                  }}
                                >
                                  {metric.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Act 4: The Impact */}
        <div
          id="act-4-impact"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '6rem 1.5rem',
          }}
        >
          <div style={{ maxWidth: '100vw', margin: '0 auto', width: '100%' }}>
            <h3
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '1.5rem',
                textAlign: 'center',
                opacity: act4InView && mounted ? 1 : 0,
                animation: act4InView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' : 'none',
              }}
            >
              What this looks like in practice
            </h3>

            {/* Swiper Carousel */}
            <div style={{ maxWidth: '100vw', margin: '4rem auto 0', padding: '0', overflow: 'visible' }}>
              <Swiper
                modules={[Navigation, Pagination]}
                centeredSlides={true}
                slidesPerView={'auto'}
                spaceBetween={32}
                loop={true}
                navigation={{
                  prevEl: '.custom-nav-prev',
                  nextEl: '.custom-nav-next',
                }}
                pagination={{
                  el: '.custom-pagination',
                  clickable: true,
                }}
                breakpoints={{
                  768: {
                    spaceBetween: 24,
                  },
                  1024: {
                    spaceBetween: 32,
                  },
                }}
                style={{ paddingBottom: '0' }}
              >
                {projects.map((project, idx) => {
                // Generate unique class name for each project
                const projectClassName = `project-card project-card-${project.title.toLowerCase().replace(/\s+/g, '-')}`;
                const MetricIcon = project.metric.icon;

                return (
                  <SwiperSlide key={idx} style={{ width: 'clamp(90vw, 600px, 700px)' }}>
                    <Link
                      href={project.link}
                      className={projectClassName}
                    onMouseEnter={(e) => {
                      setHoveredProject(idx);
                      const card = e.currentTarget;
                      card.addEventListener('mousemove', handleCardMouseMove);
                    }}
                    onMouseLeave={(e) => {
                      setHoveredProject(null);
                      setCardTilt({ rotateX: 0, rotateY: 0 });
                      const card = e.currentTarget;
                      card.removeEventListener('mousemove', handleCardMouseMove);
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(10, 10, 10, 0.6)',
                      backdropFilter: 'blur(100px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(100px) saturate(180%)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '20px',
                      textDecoration: 'none',
                      overflow: 'hidden',
                      boxShadow: hoveredProject === idx
                        ? `0px 20px 56px rgba(0, 0, 0, 0.7),
                           0px 0px 40px ${project.color.replace('0.15', '0.25')},
                           inset 0 1px 0 rgba(255, 255, 255, 0.03),
                           inset 0 -1px 0 rgba(0, 0, 0, 0.3)`
                        : `0px 12px 36px rgba(0, 0, 0, 0.5),
                           0px 0px 20px ${project.color.replace('0.15', '0.15')},
                           inset 0 1px 0 rgba(255, 255, 255, 0.02),
                           inset 0 -1px 0 rgba(0, 0, 0, 0.25)`,
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: hoveredProject === idx
                        ? `translateY(-10px) scale(1.01) rotateX(${cardTilt.rotateX}deg) rotateY(${cardTilt.rotateY}deg)`
                        : 'translateY(0) scale(1)',
                      opacity: act4InView && mounted ? 1 : 0,
                      animation: act4InView && mounted ? `fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + idx * 0.15}s both` : 'none',
                    }}
                  >
                    {/* Top: Image Area */}
                    <div
                      style={{
                        position: 'relative',
                        height: '200px',
                        background: `
                          radial-gradient(circle at 30% 30%, rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.35) 0%, rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.12) 50%, transparent 100%),
                          rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.08)
                        `,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >

                      {/* Shimmer effect on hover */}
                      {hoveredProject === idx && (
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmerSweep 2s linear infinite',
                          }}
                        />
                      )}

                      {/* Status Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          padding: '0.375rem 0.75rem',
                          background: project.status === 'live'
                            ? 'rgba(52, 211, 153, 0.2)'
                            : project.status === 'research'
                            ? 'rgba(251, 191, 36, 0.2)'
                            : 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: `1px solid ${
                            project.status === 'live'
                              ? 'rgba(52, 211, 153, 0.4)'
                              : project.status === 'research'
                              ? 'rgba(251, 191, 36, 0.4)'
                              : 'rgba(255, 255, 255, 0.2)'
                          }`,
                          borderRadius: '8px',
                          fontSize: '0.688rem',
                          fontWeight: '500',
                          color: project.status === 'live'
                            ? 'rgba(52, 211, 153, 1)'
                            : project.status === 'research'
                            ? 'rgba(251, 191, 36, 1)'
                            : 'rgba(255, 255, 255, 0.9)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          animation: project.status === 'live' ? 'statusPulse 2s ease-in-out infinite' : 'none',
                          zIndex: 2,
                        }}
                      >
                        {project.status === 'live' ? 'Live Now' : project.status === 'research' ? 'In Research' : 'Case Study'}
                      </div>

                      {/* Geometric pattern (since no images) */}
                      <svg
                        width="200"
                        height="200"
                        viewBox="0 0 200 200"
                        style={{
                          opacity: 0.4,
                          position: 'relative',
                          zIndex: 1,
                        }}
                      >
                        {idx === 0 && (
                          // Air India - circles pattern
                          <>
                            <circle cx="100" cy="100" r="60" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} strokeWidth="2" />
                            <circle cx="100" cy="100" r="40" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} strokeWidth="2" />
                            <circle cx="100" cy="100" r="20" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} />
                          </>
                        )}
                        {idx === 1 && (
                          // PsoriAssist - medical cross
                          <>
                            <rect x="85" y="50" width="30" height="100" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} rx="5" />
                            <rect x="50" y="85" width="100" height="30" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} rx="5" />
                          </>
                        )}
                        {idx === 2 && (
                          // Latent Space - hexagons
                          <>
                            <polygon points="100,40 130,55 130,85 100,100 70,85 70,55" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} strokeWidth="2" />
                            <polygon points="100,70 120,80 120,100 100,110 80,100 80,80" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} />
                          </>
                        )}
                        {idx === 3 && (
                          // Aviation Analytics - bar chart data visualization
                          <>
                            <rect x="40" y="120" width="20" height="50" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} rx="3" />
                            <rect x="70" y="90" width="20" height="80" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} rx="3" />
                            <rect x="100" y="60" width="20" height="110" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.7)`} rx="3" />
                            <rect x="130" y="80" width="20" height="90" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} rx="3" />
                            <rect x="160" y="100" width="20" height="70" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} rx="3" />
                            <line x1="30" y1="175" x2="190" y2="175" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.4)`} strokeWidth="2" />
                          </>
                        )}
                        {idx === 4 && (
                          // Pixel Radar - grid/pixel pattern
                          <>
                            <rect x="60" y="60" width="25" height="25" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} rx="2" />
                            <rect x="90" y="60" width="25" height="25" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} strokeWidth="2" rx="2" />
                            <rect x="120" y="60" width="25" height="25" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} rx="2" />
                            <rect x="60" y="90" width="25" height="25" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} strokeWidth="2" rx="2" />
                            <rect x="90" y="90" width="25" height="25" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.7)`} rx="2" />
                            <rect x="120" y="90" width="25" height="25" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} strokeWidth="2" rx="2" />
                            <rect x="60" y="120" width="25" height="25" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} rx="2" />
                            <rect x="90" y="120" width="25" height="25" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} strokeWidth="2" rx="2" />
                            <rect x="120" y="120" width="25" height="25" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} rx="2" />
                          </>
                        )}
                        {idx === 5 && (
                          // mythOS - gallery frames/art pattern
                          <>
                            <rect x="50" y="50" width="40" height="50" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} strokeWidth="3" rx="2" />
                            <rect x="110" y="50" width="40" height="50" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} strokeWidth="3" rx="2" />
                            <rect x="80" y="110" width="40" height="50" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.7)`} strokeWidth="3" rx="2" />
                            <circle cx="70" cy="75" r="8" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} />
                            <circle cx="130" cy="75" r="8" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} />
                            <circle cx="100" cy="135" r="8" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.7)`} />
                          </>
                        )}
                        {idx === 6 && (
                          // Metamorphic Fractal Reflections - kaleidoscope/fractal pattern
                          <>
                            <path d="M100,50 L120,80 L140,70 L130,100 L160,110 L130,130 L140,160 L100,150 L60,160 L70,130 L40,110 L70,100 L60,70 L80,80 Z" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} strokeWidth="2" />
                            <circle cx="100" cy="100" r="30" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} strokeWidth="2" />
                            <circle cx="100" cy="100" r="15" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.7)`} />
                            <line x1="100" y1="70" x2="100" y2="130" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.4)`} strokeWidth="2" />
                            <line x1="70" y1="100" x2="130" y2="100" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.4)`} strokeWidth="2" />
                          </>
                        )}
                        {idx === 7 && (
                          // Mobile UX Patterns - mobile device outline
                          <>
                            <rect x="70" y="40" width="60" height="120" rx="8" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} strokeWidth="3" />
                            <rect x="80" y="55" width="40" height="25" rx="4" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.4)`} />
                            <rect x="80" y="85" width="40" height="8" rx="2" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} />
                            <rect x="80" y="98" width="40" height="8" rx="2" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} />
                            <rect x="80" y="111" width="40" height="8" rx="2" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} />
                            <rect x="85" y="47" width="12" height="4" rx="2" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} />
                            <circle cx="100" cy="145" r="6" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} strokeWidth="2" />
                          </>
                        )}
                      </svg>
                    </div>

                    {/* Bottom: Content Area */}
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Category */}
                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          color: 'rgba(255, 255, 255, 0.6)',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {project.category}
                      </div>

                      {/* Title */}
                      <h4
                        style={{
                          fontSize: '1.375rem',
                          fontWeight: '400',
                          color: 'rgba(255, 255, 255, 0.95)',
                          marginBottom: '0.75rem',
                          lineHeight: '1.3',
                        }}
                      >
                        {project.title}
                      </h4>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: '300',
                          color: hoveredProject === idx ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.7)',
                          lineHeight: '1.6',
                          marginBottom: '1.25rem',
                          flex: 1,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          marginBottom: '1.25rem',
                        }}
                      >
                        {project.tags.slice(0, 4).map((tag, tagIdx) => (
                          <div
                            key={tagIdx}
                            style={{
                              padding: '0.25rem 0.625rem',
                              background: 'rgba(255, 255, 255, 0.04)',
                              backdropFilter: 'blur(60px) saturate(130%)',
                              WebkitBackdropFilter: 'blur(60px) saturate(130%)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              borderRadius: '8px',
                              fontSize: '0.688rem',
                              fontWeight: '300',
                              color: 'rgba(255, 255, 255, 0.75)',
                              opacity: hoveredProject === idx ? 1 : 0.8,
                              transform: hoveredProject === idx ? `translateY(-2px)` : 'translateY(0)',
                              transition: `all 0.3s ease ${tagIdx * 0.05}s`,
                            }}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>

                      {/* Footer: Metric + Year + Arrow */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '1rem',
                          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        {/* Metric */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <MetricIcon size={14} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: '300',
                              color: 'rgba(255, 255, 255, 0.6)',
                            }}
                          >
                            {project.metric.label}
                          </span>
                        </div>

                        {/* Year */}
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: '300',
                            color: 'rgba(255, 255, 255, 0.4)',
                          }}
                        >
                          {project.year}
                        </span>

                        {/* Arrow icon */}
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.03)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: hoveredProject === idx ? 'rotate(45deg) translateY(-4px)' : 'rotate(0deg)',
                            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          }}
                        >
                          <ArrowRight size={14} style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                  </SwiperSlide>
                );
              })}
              </Swiper>

              {/* Custom Navigation Controls Below Carousel */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '24px',
                  marginTop: '60px',
                  flexWrap: 'wrap',
                }}
              >
                {/* Previous Button */}
                <button
                  className="custom-nav-prev custom-nav-button"
                  aria-label="Previous slide"
                  style={{
                    width: 'clamp(48px, 10vw, 56px)',
                    height: 'clamp(48px, 10vw, 56px)',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    color: 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Pagination Dots */}
                <div className="custom-pagination swiper-pagination" />

                {/* Next Button */}
                <button
                  className="custom-nav-next custom-nav-button"
                  aria-label="Next slide"
                  style={{
                    width: 'clamp(48px, 10vw, 56px)',
                    height: 'clamp(48px, 10vw, 56px)',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    color: 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Closing: The Invitation */}
        <div
          style={{
            padding: '6rem 1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '3rem',
              }}
            >
              Want to build something that <span style={{ color: '#DA0E29', fontWeight: '400' }}>matters</span>?
            </p>

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Link
                href="/journey"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.2), rgba(218, 14, 41, 0.15))',
                  border: '1.5px solid rgba(218, 14, 41, 0.4)',
                  borderRadius: '15px',
                  color: 'rgba(255, 255, 255, 0.95)',
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  fontWeight: '500',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0px 8px 30px rgba(218, 14, 41, 0.25), 0px 0px 12px rgba(255, 255, 255, 0.03) inset',
                  backdropFilter: 'blur(100px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(218, 14, 41, 0.3), rgba(218, 14, 41, 0.2))';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(218, 14, 41, 0.2), rgba(218, 14, 41, 0.15))';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <span>Explore the Full Journey</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '15px',
                  color: 'rgba(255, 255, 255, 0.95)',
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  fontWeight: '400',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  backdropFilter: 'blur(100px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <Mail size={18} />
                <span>Let's Talk</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

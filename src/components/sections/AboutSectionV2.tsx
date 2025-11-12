'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Lightbulb, Trophy, Briefcase, Rocket, Users, CheckCircle2, ChevronLeft, ChevronRight, Sparkles, Layers } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ContactChat } from '../ContactChat';
import { Chatbot } from '../Chatbot';
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
    const act2El = document.getElementById('act-2-about');
    const act4El = document.getElementById('act-4-impact');

    if (act1El) { act1Observer.observe(act1El); observers.push(act1Observer); }
    if (act2El) { act2Observer.observe(act2El); observers.push(act2Observer); }
    if (act4El) { act4Observer.observe(act4El); observers.push(act4Observer); }

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

        @keyframes svgGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.15));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
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
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          color: rgba(255, 255, 255, 0.9) !important;
        }

        .custom-nav-prev:hover,
        .custom-nav-next:hover,
        .custom-nav-button:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          transform: scale(1.05) !important;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1) !important;
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
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
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

        /* Center/side card transitions - CSS-only approach */
        :global(.swiper-slide) {
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
          opacity: 0.7 !important;
        }

        /* Scale down all slides by default */
        :global(.swiper-slide) > * {
          transform: scale(0.90);
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Scale up active slide */
        :global(.swiper-slide-active) {
          opacity: 1 !important;
          z-index: 10 !important;
        }

        :global(.swiper-slide-active) > * {
          transform: scale(1.08);
        }

        /* Side slides slightly visible */
        :global(.swiper-slide-prev),
        :global(.swiper-slide-next) {
          opacity: 0.85 !important;
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

        {/* Act 2: About Me - Three Pillars */}
        <div
          id="act-2-about"
          ref={timelineRef}
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '8rem 1.5rem',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative' }}>
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
                About Me
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
                Designer, builder, and systems thinker
              </p>
            </div>

            {/* Three Pillars Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                marginBottom: '4rem',
              }}
            >
              {/* Right Now Card */}
              <div
                ref={pillar1Ref}
                style={{
                  position: 'relative',
                  background: 'rgba(10, 10, 10, 0.6)',
                  backdropFilter: 'blur(100px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(100px) saturate(180%)',
                  borderRadius: '28px',
                  padding: '2.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
                  opacity: pillar1InView && mounted ? 1 : 0,
                  transform: pillar1InView && mounted ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.95)',
                  transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02) translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.4)';
                  e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.5), 0px 0px 24px rgba(218, 14, 41, 0.1), 0px 0px 8px rgba(255, 255, 255, 0.02) inset';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), 0px 0px 8px rgba(255, 255, 255, 0.02) inset';
                }}
              >
                <Briefcase size={36} style={{ color: 'rgba(218, 14, 41, 0.9)', marginBottom: '1.5rem' }} />
                <h4
                  style={{
                    fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                    fontWeight: '500',
                    marginBottom: '1rem',
                    color: 'rgba(255, 255, 255, 0.95)',
                    lineHeight: '1.3',
                  }}
                >
                  Right Now
                </h4>
                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.7',
                    fontWeight: '300',
                    marginBottom: '1.5rem',
                  }}
                >
                  Building design systems at Air India. 450+ daily users. Aviation UX.
                </p>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: 'rgba(34, 197, 94, 0.15)',
                    color: 'rgba(34, 197, 94, 1)',
                    fontSize: '0.875rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    fontWeight: '500',
                  }}
                >
                  Open to opportunities
                </div>
              </div>

              {/* Belief Card */}
              <div
                ref={pillar2Ref}
                style={{
                  position: 'relative',
                  background: 'rgba(10, 10, 10, 0.6)',
                  backdropFilter: 'blur(100px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(100px) saturate(180%)',
                  borderRadius: '28px',
                  padding: '2.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
                  opacity: pillar2InView && mounted ? 1 : 0,
                  transform: pillar2InView && mounted ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.95)',
                  transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02) translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(147, 51, 234, 0.4)';
                  e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.5), 0px 0px 24px rgba(147, 51, 234, 0.1), 0px 0px 8px rgba(255, 255, 255, 0.02) inset';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), 0px 0px 8px rgba(255, 255, 255, 0.02) inset';
                }}
              >
                <Sparkles size={36} style={{ color: 'rgba(147, 51, 234, 0.9)', marginBottom: '1.5rem' }} />
                <h4
                  style={{
                    fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                    fontWeight: '500',
                    marginBottom: '1rem',
                    color: 'rgba(255, 255, 255, 0.95)',
                    lineHeight: '1.3',
                  }}
                >
                  Belief
                </h4>
                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.7',
                    fontWeight: '300',
                  }}
                >
                  Interfaces should breathe, remember, and evolve. Reduce time between thought and action.
                </p>
              </div>

              {/* How I Work Card */}
              <div
                ref={pillar3Ref}
                style={{
                  position: 'relative',
                  background: 'rgba(10, 10, 10, 0.6)',
                  backdropFilter: 'blur(100px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(100px) saturate(180%)',
                  borderRadius: '28px',
                  padding: '2.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
                  opacity: pillar3InView && mounted ? 1 : 0,
                  transform: pillar3InView && mounted ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.95)',
                  transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02) translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                  e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.5), 0px 0px 24px rgba(59, 130, 246, 0.1), 0px 0px 8px rgba(255, 255, 255, 0.02) inset';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), 0px 0px 8px rgba(255, 255, 255, 0.02) inset';
                }}
              >
                <Layers size={36} style={{ color: 'rgba(59, 130, 246, 0.9)', marginBottom: '1.5rem' }} />
                <h4
                  style={{
                    fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                    fontWeight: '500',
                    marginBottom: '1rem',
                    color: 'rgba(255, 255, 255, 0.95)',
                    lineHeight: '1.3',
                  }}
                >
                  How I Work
                </h4>
                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.7',
                    fontWeight: '300',
                  }}
                >
                  Systems thinking. Creative coding. Data-driven design. Prototyping first.
                </p>
              </div>
            </div>

            {/* Journey Teaser */}
            <div
              style={{
                textAlign: 'center',
                marginTop: '5rem',
                opacity: act2InView && mounted ? 1 : 0,
                transform: act2InView && mounted ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 1s',
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                  fontWeight: '300',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '1.5rem',
                  lineHeight: '1.7',
                }}
              >
                Curious about my journey from 2005 to today?
              </p>
              <Link
                href="/journey"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(218, 14, 41, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(218, 14, 41, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
                }}
              >
                Explore My Full Journey
                <ArrowRight size={18} />
              </Link>
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
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Animated SVG Background Mesh Gradient */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              opacity: 0.4,
              pointerEvents: 'none',
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="meshGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgba(147, 51, 234, 0.15)', stopOpacity: 1 }}>
                  <animate attributeName="stop-color" values="rgba(147, 51, 234, 0.15); rgba(218, 14, 41, 0.15); rgba(59, 130, 246, 0.15); rgba(147, 51, 234, 0.15)" dur="10s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" style={{ stopColor: 'rgba(218, 14, 41, 0.15)', stopOpacity: 1 }}>
                  <animate attributeName="stop-color" values="rgba(218, 14, 41, 0.15); rgba(59, 130, 246, 0.15); rgba(147, 51, 234, 0.15); rgba(218, 14, 41, 0.15)" dur="10s" repeatCount="indefinite" />
                </stop>
              </linearGradient>

              <radialGradient id="meshGrad2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style={{ stopColor: 'rgba(147, 51, 234, 0.2)', stopOpacity: 1 }}>
                  <animate attributeName="stop-color" values="rgba(147, 51, 234, 0.2); rgba(16, 185, 129, 0.2); rgba(232, 121, 249, 0.2); rgba(147, 51, 234, 0.2)" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
              </radialGradient>
            </defs>

            {/* Flowing mesh background */}
            <path d="M0,100 Q250,80 500,100 T1000,100 L1000,300 Q750,280 500,300 T0,300 Z" fill="url(#meshGrad1)" opacity="0.3">
              <animate attributeName="d" values="M0,100 Q250,80 500,100 T1000,100 L1000,300 Q750,280 500,300 T0,300 Z; M0,120 Q250,90 500,120 T1000,120 L1000,320 Q750,290 500,320 T0,320 Z; M0,100 Q250,80 500,100 T1000,100 L1000,300 Q750,280 500,300 T0,300 Z" dur="12s" repeatCount="indefinite" />
            </path>

            <circle cx="20%" cy="30%" r="150" fill="url(#meshGrad2)" opacity="0.4">
              <animate attributeName="cx" values="20%; 25%; 20%" dur="15s" repeatCount="indefinite" />
              <animate attributeName="cy" values="30%; 35%; 30%" dur="18s" repeatCount="indefinite" />
            </circle>

            <circle cx="80%" cy="70%" r="180" fill="url(#meshGrad2)" opacity="0.3">
              <animate attributeName="cx" values="80%; 75%; 80%" dur="20s" repeatCount="indefinite" />
              <animate attributeName="cy" values="70%; 65%; 70%" dur="16s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* Floating Geometric Accents */}
          <svg
            style={{
              position: 'absolute',
              top: '10%',
              left: '5%',
              width: '80px',
              height: '80px',
              zIndex: 0,
              opacity: 0.2,
              pointerEvents: 'none',
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="40,10 70,30 70,60 40,80 10,60 10,30" fill="none" stroke="rgba(147, 51, 234, 0.6)" strokeWidth="1.5">
              <animateTransform attributeName="transform" type="rotate" from="0 40 40" to="360 40 40" dur="30s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2; 0.5; 0.2" dur="6s" repeatCount="indefinite" />
            </polygon>
          </svg>

          <svg
            style={{
              position: 'absolute',
              top: '60%',
              right: '8%',
              width: '60px',
              height: '60px',
              zIndex: 0,
              opacity: 0.25,
              pointerEvents: 'none',
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="30" cy="30" r="25" fill="none" stroke="rgba(218, 14, 41, 0.5)" strokeWidth="1.5">
              <animate attributeName="r" values="25; 28; 25" dur="5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.25; 0.6; 0.25" dur="7s" repeatCount="indefinite" />
            </circle>
            <circle cx="30" cy="30" r="15" fill="none" stroke="rgba(218, 14, 41, 0.4)" strokeWidth="1">
              <animate attributeName="r" values="15; 18; 15" dur="4s" repeatCount="indefinite" />
            </circle>
          </svg>

          <svg
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '10%',
              width: '50px',
              height: '50px',
              zIndex: 0,
              opacity: 0.2,
              pointerEvents: 'none',
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="5" y1="5" x2="45" y2="45" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1.5">
              <animate attributeName="opacity" values="0.2; 0.5; 0.2" dur="8s" repeatCount="indefinite" />
            </line>
            <line x1="45" y1="5" x2="5" y2="45" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1.5">
              <animate attributeName="opacity" values="0.5; 0.2; 0.5" dur="8s" repeatCount="indefinite" />
            </line>
          </svg>

          <svg
            style={{
              position: 'absolute',
              top: '20%',
              right: '15%',
              width: '40px',
              height: '40px',
              zIndex: 0,
              opacity: 0.3,
              pointerEvents: 'none',
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="5" y="5" width="30" height="30" fill="none" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="1.5" rx="4">
              <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="25s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3; 0.6; 0.3" dur="5s" repeatCount="indefinite" />
            </rect>
          </svg>

          {/* Decorative Line Art Framing */}
          <svg
            style={{
              position: 'absolute',
              top: '50%',
              left: '2%',
              width: '30px',
              height: '200px',
              zIndex: 0,
              opacity: 0.15,
              pointerEvents: 'none',
              transform: 'translateY(-50%)',
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="15" y1="0" x2="15" y2="80" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="0" to="8" dur="2s" repeatCount="indefinite" />
            </line>
            <circle cx="15" cy="100" r="4" fill="rgba(255, 255, 255, 0.4)">
              <animate attributeName="opacity" values="0.4; 1; 0.4" dur="3s" repeatCount="indefinite" />
            </circle>
            <line x1="15" y1="120" x2="15" y2="200" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="0" to="8" dur="2s" repeatCount="indefinite" />
            </line>
          </svg>

          <svg
            style={{
              position: 'absolute',
              top: '50%',
              right: '2%',
              width: '30px',
              height: '200px',
              zIndex: 0,
              opacity: 0.15,
              pointerEvents: 'none',
              transform: 'translateY(-50%)',
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="15" y1="0" x2="15" y2="80" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="0" to="8" dur="2s" repeatCount="indefinite" />
            </line>
            <circle cx="15" cy="100" r="4" fill="rgba(255, 255, 255, 0.4)">
              <animate attributeName="opacity" values="0.4; 1; 0.4" dur="3s" repeatCount="indefinite" />
            </circle>
            <line x1="15" y1="120" x2="15" y2="200" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="0" to="8" dur="2s" repeatCount="indefinite" />
            </line>
          </svg>

          <div style={{ maxWidth: '100vw', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
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
            <div style={{ maxWidth: '100vw', margin: '4rem auto 0', padding: '0', overflow: 'visible', position: 'relative' }} className="carousel-container">
              {/* Ambient Light Rays - Spotlight Effect */}
              <svg
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '800px',
                  height: '800px',
                  zIndex: 0,
                  opacity: 0.15,
                  pointerEvents: 'none',
                  mixBlendMode: 'screen',
                }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="lightRayGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style={{ stopColor: 'rgba(255, 255, 255, 0.8)', stopOpacity: 1 }} />
                    <stop offset="40%" style={{ stopColor: 'rgba(147, 51, 234, 0.4)', stopOpacity: 0.5 }}>
                      <animate attributeName="stop-color" values="rgba(147, 51, 234, 0.4); rgba(218, 14, 41, 0.4); rgba(59, 130, 246, 0.4); rgba(147, 51, 234, 0.4)" dur="8s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
                  </radialGradient>
                </defs>

                <circle cx="400" cy="400" r="350" fill="url(#lightRayGrad)" opacity="0.6">
                  <animate attributeName="r" values="350; 380; 350" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6; 0.8; 0.6" dur="3s" repeatCount="indefinite" />
                </circle>

                {/* Light ray beams */}
                <g opacity="0.3">
                  <line x1="400" y1="400" x2="400" y2="50" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" opacity="0.4">
                    <animate attributeName="opacity" values="0.4; 0.7; 0.4" dur="3s" repeatCount="indefinite" />
                    <animateTransform attributeName="transform" type="rotate" from="0 400 400" to="360 400 400" dur="40s" repeatCount="indefinite" />
                  </line>
                  <line x1="400" y1="400" x2="600" y2="150" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" opacity="0.3">
                    <animate attributeName="opacity" values="0.3; 0.6; 0.3" dur="4s" repeatCount="indefinite" />
                    <animateTransform attributeName="transform" type="rotate" from="0 400 400" to="360 400 400" dur="35s" repeatCount="indefinite" />
                  </line>
                  <line x1="400" y1="400" x2="200" y2="150" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" opacity="0.3">
                    <animate attributeName="opacity" values="0.3; 0.6; 0.3" dur="5s" repeatCount="indefinite" />
                    <animateTransform attributeName="transform" type="rotate" from="0 400 400" to="360 400 400" dur="45s" repeatCount="indefinite" />
                  </line>
                </g>
              </svg>

              <Swiper
                modules={[Navigation, Pagination]}
                centeredSlides={true}
                slidesPerView={1.6}
                spaceBetween={30}
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
                    spaceBetween: 20,
                    slidesPerView: 1.3,
                  },
                  1024: {
                    spaceBetween: 30,
                    slidesPerView: 1.6,
                  },
                }}
                style={{ paddingBottom: '0' }}
              >
                {projects.map((project, idx) => {
                // Generate unique class name for each project
                const projectClassName = `project-card project-card-${project.title.toLowerCase().replace(/\s+/g, '-')}`;
                const MetricIcon = project.metric.icon;

                return (
                  <SwiperSlide key={idx}>
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
                      background: 'rgba(10, 10, 10, 0.85)',
                      backdropFilter: 'blur(100px) saturate(180%) brightness(0.95)',
                      WebkitBackdropFilter: 'blur(100px) saturate(180%) brightness(0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '20px',
                      textDecoration: 'none',
                      overflow: 'hidden',
                      boxShadow: hoveredProject === idx
                        ? `0px 20px 56px rgba(0, 0, 0, 0.7),
                           0px 0px 40px ${project.color.replace('0.15', '0.25')},
                           inset 0 2px 8px rgba(0, 0, 0, 0.5),
                           inset 0 1px 0 rgba(255, 255, 255, 0.03),
                           inset 0 -1px 0 rgba(0, 0, 0, 0.3)`
                        : `0px 12px 36px rgba(0, 0, 0, 0.5),
                           0px 0px 20px ${project.color.replace('0.15', '0.15')},
                           inset 0 2px 8px rgba(0, 0, 0, 0.5),
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
                        height: '380px',
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

                      {/* Geometric pattern with animations */}
                      <svg
                        width="280"
                        height="280"
                        viewBox="0 0 200 200"
                        style={{
                          opacity: hoveredProject === idx ? 0.6 : 0.4,
                          position: 'relative',
                          zIndex: 1,
                          transition: 'opacity 0.4s ease',
                          animation: hoveredProject === idx ? 'svgGlow 2s ease-in-out infinite' : 'none',
                        }}
                      >
                        {idx === 0 && (
                          // Air India - circles pattern with pulse
                          <>
                            <circle cx="100" cy="100" r="60" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} strokeWidth="2">
                              {hoveredProject === idx && (
                                <animate attributeName="r" values="60; 65; 60" dur="2s" repeatCount="indefinite" />
                              )}
                            </circle>
                            <circle cx="100" cy="100" r="40" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} strokeWidth="2">
                              {hoveredProject === idx && (
                                <animate attributeName="r" values="40; 43; 40" dur="2s" repeatCount="indefinite" />
                              )}
                            </circle>
                            <circle cx="100" cy="100" r="20" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`}>
                              {hoveredProject === idx && (
                                <>
                                  <animate attributeName="r" values="20; 23; 20" dur="2s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.6; 1; 0.6" dur="2s" repeatCount="indefinite" />
                                </>
                              )}
                            </circle>
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
                          // Latent Space - hexagons with rotation
                          <>
                            <polygon points="100,40 130,55 130,85 100,100 70,85 70,55" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} strokeWidth="2">
                              {hoveredProject === idx && (
                                <>
                                  <animateTransform attributeName="transform" type="rotate" from="0 100 70" to="360 100 70" dur="8s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.5; 0.9; 0.5" dur="3s" repeatCount="indefinite" />
                                </>
                              )}
                            </polygon>
                            <polygon points="100,70 120,80 120,100 100,110 80,100 80,80" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`}>
                              {hoveredProject === idx && (
                                <>
                                  <animateTransform attributeName="transform" type="rotate" from="360 100 95" to="0 100 95" dur="6s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.5; 1; 0.5" dur="2.5s" repeatCount="indefinite" />
                                </>
                              )}
                            </polygon>
                          </>
                        )}
                        {idx === 3 && (
                          // Aviation Analytics - bar chart with animated growth
                          <>
                            <rect x="40" y="120" width="20" height="50" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} rx="3">
                              {hoveredProject === idx && (
                                <animate attributeName="height" values="50; 55; 50" dur="2s" repeatCount="indefinite" />
                              )}
                            </rect>
                            <rect x="70" y="90" width="20" height="80" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} rx="3">
                              {hoveredProject === idx && (
                                <animate attributeName="height" values="80; 88; 80" dur="2.2s" repeatCount="indefinite" />
                              )}
                            </rect>
                            <rect x="100" y="60" width="20" height="110" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.7)`} rx="3">
                              {hoveredProject === idx && (
                                <animate attributeName="height" values="110; 120; 110" dur="2.4s" repeatCount="indefinite" />
                              )}
                            </rect>
                            <rect x="130" y="80" width="20" height="90" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} rx="3">
                              {hoveredProject === idx && (
                                <animate attributeName="height" values="90; 98; 90" dur="2.1s" repeatCount="indefinite" />
                              )}
                            </rect>
                            <rect x="160" y="100" width="20" height="70" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} rx="3">
                              {hoveredProject === idx && (
                                <animate attributeName="height" values="70; 76; 70" dur="2.3s" repeatCount="indefinite" />
                              )}
                            </rect>
                            <line x1="30" y1="175" x2="190" y2="175" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.4)`} strokeWidth="2">
                              {hoveredProject === idx && (
                                <animate attributeName="opacity" values="0.4; 0.8; 0.4" dur="2s" repeatCount="indefinite" />
                              )}
                            </line>
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
                          // mythOS - gallery frames with floating animation
                          <>
                            <rect x="50" y="50" width="40" height="50" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} strokeWidth="3" rx="2">
                              {hoveredProject === idx && (
                                <>
                                  <animate attributeName="y" values="50; 47; 50" dur="3s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.5; 0.9; 0.5" dur="3s" repeatCount="indefinite" />
                                </>
                              )}
                            </rect>
                            <rect x="110" y="50" width="40" height="50" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} strokeWidth="3" rx="2">
                              {hoveredProject === idx && (
                                <>
                                  <animate attributeName="y" values="50; 47; 50" dur="3.2s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.6; 1; 0.6" dur="3.2s" repeatCount="indefinite" />
                                </>
                              )}
                            </rect>
                            <rect x="80" y="110" width="40" height="50" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.7)`} strokeWidth="3" rx="2">
                              {hoveredProject === idx && (
                                <>
                                  <animate attributeName="y" values="110; 107; 110" dur="3.4s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.7; 1; 0.7" dur="3.4s" repeatCount="indefinite" />
                                </>
                              )}
                            </rect>
                            <circle cx="70" cy="75" r="8" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`}>
                              {hoveredProject === idx && (
                                <>
                                  <animate attributeName="r" values="8; 10; 8" dur="2s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.5; 1; 0.5" dur="2s" repeatCount="indefinite" />
                                </>
                              )}
                            </circle>
                            <circle cx="130" cy="75" r="8" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`}>
                              {hoveredProject === idx && (
                                <>
                                  <animate attributeName="r" values="8; 10; 8" dur="2.2s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.6; 1; 0.6" dur="2.2s" repeatCount="indefinite" />
                                </>
                              )}
                            </circle>
                            <circle cx="100" cy="135" r="8" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.7)`}>
                              {hoveredProject === idx && (
                                <>
                                  <animate attributeName="r" values="8; 10; 8" dur="2.4s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.7; 1; 0.7" dur="2.4s" repeatCount="indefinite" />
                                </>
                              )}
                            </circle>
                          </>
                        )}
                        {idx === 6 && (
                          // Metamorphic Fractal Reflections - kaleidoscope with rotation
                          <>
                            <path d="M100,50 L120,80 L140,70 L130,100 L160,110 L130,130 L140,160 L100,150 L60,160 L70,130 L40,110 L70,100 L60,70 L80,80 Z" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.6)`} strokeWidth="2">
                              {hoveredProject === idx && (
                                <>
                                  <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="10s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.6; 1; 0.6" dur="3s" repeatCount="indefinite" />
                                </>
                              )}
                            </path>
                            <circle cx="100" cy="100" r="30" fill="none" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.5)`} strokeWidth="2">
                              {hoveredProject === idx && (
                                <animate attributeName="r" values="30; 35; 30" dur="2.5s" repeatCount="indefinite" />
                              )}
                            </circle>
                            <circle cx="100" cy="100" r="15" fill={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.7)`}>
                              {hoveredProject === idx && (
                                <>
                                  <animate attributeName="r" values="15; 18; 15" dur="2s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.7; 1; 0.7" dur="2s" repeatCount="indefinite" />
                                </>
                              )}
                            </circle>
                            <line x1="100" y1="70" x2="100" y2="130" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.4)`} strokeWidth="2">
                              {hoveredProject === idx && (
                                <>
                                  <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="180 100 100" dur="4s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.4; 0.8; 0.4" dur="2s" repeatCount="indefinite" />
                                </>
                              )}
                            </line>
                            <line x1="70" y1="100" x2="130" y2="100" stroke={`rgba(${project.orbColor.r}, ${project.orbColor.g}, ${project.orbColor.b}, 0.4)`} strokeWidth="2">
                              {hoveredProject === idx && (
                                <>
                                  <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="180 100 100" dur="4s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0.4; 0.8; 0.4" dur="2s" repeatCount="indefinite" />
                                </>
                              )}
                            </line>
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
                          marginBottom: '1rem',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {project.description}
                      </p>

                      {/* Key Highlights */}
                      <div
                        style={{
                          marginBottom: '1.25rem',
                          paddingLeft: '0.5rem',
                        }}
                      >
                        <ul
                          style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                          }}
                        >
                          {idx === 0 && (
                            <>
                              <li style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                • Streamlined crew operations across 450+ flights daily
                              </li>
                              <li style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                • Reduced decision-making time from minutes to seconds
                              </li>
                            </>
                          )}
                          {idx === 1 && (
                            <>
                              <li style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                • 18 months of ethnographic research with dermatologists
                              </li>
                              <li style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                • AI-powered PASI scoring with 95% accuracy
                              </li>
                            </>
                          )}
                          {idx === 2 && (
                            <>
                              <li style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                • Scroll-driven narrative with three-act structure
                              </li>
                              <li style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                • Speculative design prototypes exploring consciousness
                              </li>
                            </>
                          )}
                          {idx === 3 && (
                            <>
                              <li style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                • Real-time data visualization for airline operations
                              </li>
                              <li style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                • Processing 10,000+ data points per minute
                              </li>
                            </>
                          )}
                          {idx === 4 && (
                            <>
                              <li style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                • Automated design token auditing system
                              </li>
                              <li style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                • Reduced QA review time by 90%
                              </li>
                            </>
                          )}
                          {idx === 5 && (
                            <>
                              <li style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                • AI-powered pattern recognition in art collections
                              </li>
                              <li style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                • Generates thematic exhibitions from natural language
                              </li>
                            </>
                          )}
                          {idx === 6 && (
                            <>
                              <li style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                • Interactive psychedelic experience installation
                              </li>
                              <li style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                • Real-time audio-reactive visuals with TouchDesigner
                              </li>
                            </>
                          )}
                          {idx === 7 && (
                            <>
                              <li style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                • 40+ production-ready mobile UI patterns
                              </li>
                              <li style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
                                • iOS and Android platform-specific components
                              </li>
                            </>
                          )}
                        </ul>
                      </div>

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
                className="carousel-navigation"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  marginTop: '32px',
                  flexWrap: 'nowrap',
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
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
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
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
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

              {/* View All Work Button */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '2rem',
                }}
              >
                <Link
                  href="/work"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 1.75rem',
                    background: 'rgba(10, 10, 10, 0.6)',
                    backdropFilter: 'blur(100px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(100px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '15px',
                    color: 'rgba(255, 255, 255, 0.95)',
                    textDecoration: 'none',
                    fontSize: '0.9375rem',
                    fontWeight: '400',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: `
                      inset 0 1px 0 rgba(255, 255, 255, 0.02),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.3),
                      0 8px 24px rgba(0, 0, 0, 0.6)
                    `,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `
                      inset 0 1px 0 rgba(255, 255, 255, 0.02),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.3),
                      0 12px 32px rgba(0, 0, 0, 0.7)
                    `;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(10, 10, 10, 0.6)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `
                      inset 0 1px 0 rgba(255, 255, 255, 0.02),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.3),
                      0 8px 24px rgba(0, 0, 0, 0.6)
                    `;
                  }}
                >
                  <span>View All Work</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Closing: Interactive Chat Invitation */}
        <div
          style={{
            padding: '6rem 1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Premium Glassmorphic Card */}
            <div
              style={{
                background: 'rgba(8, 8, 8, 0.9)',
                backdropFilter: 'blur(80px) saturate(180%)',
                WebkitBackdropFilter: 'blur(80px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '24px',
                padding: 'clamp(3rem, 5vw, 4rem) clamp(2rem, 4vw, 3rem)',
                boxShadow: `
                  0px 20px 48px rgba(0, 0, 0, 0.7),
                  0px 0px 1px rgba(255, 255, 255, 0.35) inset,
                  0px -1px 0px rgba(255, 255, 255, 0.1) inset
                `,
                textAlign: 'center',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: '300',
                  color: 'rgba(255, 255, 255, 0.95)',
                  marginBottom: '1rem',
                  lineHeight: '1.2',
                  letterSpacing: '-0.01em',
                }}
              >
                Let's build something <span style={{ color: '#DA0E29', fontWeight: '400' }}>together</span>
              </h2>

              <p
                style={{
                  fontSize: 'clamp(0.938rem, 1.75vw, 1rem)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '2.5rem',
                  fontWeight: '300',
                  letterSpacing: '0.01em',
                  lineHeight: '1.6',
                  maxWidth: '600px',
                  margin: '0 auto 2.5rem',
                }}
              >
                Tell me about your project, and let's explore how we can collaborate
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

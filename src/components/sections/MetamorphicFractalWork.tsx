'use client';

import React, { useState, useEffect, useRef } from 'react';

export function MetamorphicFractalWork() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [visibleElements, setVisibleElements] = useState(new Set<string>());

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

  // Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&display=swap');

        :root {
          --bg: #000;
          --fg: rgba(255,255,255,.95);
          --fg-dim: rgba(255,255,255,.70);
          --fg-soft: rgba(255,255,255,.50);
          --card: rgba(255,255,255,.02);
          --card-hover: rgba(255,255,255,.04);
          --border: rgba(255,255,255,.06);
          --glow: conic-gradient(from 0deg at 50% 50%, #ff007a 0deg, #ffb800 72deg, #60f 144deg, #0ff 216deg, #0fa 288deg, #ff007a 360deg);
          --accent: #b583ff;
          --radius: 20px;
          --shadow: 0 20px 40px rgba(0,0,0,.8);
          --max: 1200px;
        }

        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        /* CSS Reset and Isolation - Override global styles */
        .metamorphic-container * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .metamorphic-container {
          background: var(--bg) !important;
          color: var(--fg) !important;
          font-family: 'Inter', -apple-system, system-ui, sans-serif !important;
          font-weight: 300 !important;
          line-height: 1.7 !important;
          letter-spacing: 0.01em !important;
          -webkit-font-smoothing: antialiased !important;
          text-rendering: optimizeLegibility !important;
          overflow-x: hidden !important;
          min-height: 100vh !important;
          width: 100% !important;
          position: relative !important;
        }

        /* Override any global body/html styles that might interfere */
        body:has(.metamorphic-container) {
          background: var(--bg) !important;
          overflow-x: hidden !important;
        }

        .cursor {
          position: fixed;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          pointer-events: none;
          mix-blend-mode: screen;
          background: radial-gradient(closest-side, rgba(181,131,255,.15), rgba(0,0,0,0));
          filter: blur(30px) saturate(150%);
          opacity: .4;
          transition: opacity .3s ease;
          z-index: 9999;
        }

        .wrap {
          width: min(100%, var(--max));
          margin-inline: auto;
          padding: 0 24px;
        }

        header {
          position: relative;
          padding: 150px 24px 200px;
          overflow: hidden;
          background: radial-gradient(ellipse at top center, rgba(181,131,255,.08) 0%, transparent 50%);
          min-height: 100vh;
        }

        .title {
          font-family: 'Inter', -apple-system, sans-serif;
          font-weight: 200;
          letter-spacing: -0.03em;
          line-height: 1.05;
          font-size: clamp(2.5rem, 5vw + 1rem, 5.5rem);
          margin: 25px 0;
        }

        .kicker {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--fg-soft);
          margin-bottom: 15px;
        }

        .sub {
          max-width: 900px;
          color: var(--fg-dim);
          font-size: clamp(1rem, .6vw + .9rem, 1.15rem);
          font-weight: 300;
          margin: 30px 0;
          line-height: 1.8;
        }

        .meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 16px;
          margin-top: 30px;
        }

        .pill {
          border: 1px solid var(--border);
          background: var(--card);
          padding: 10px 16px;
          border-radius: 100px;
          color: var(--fg-dim);
          font-size: 0.875rem;
          font-weight: 300;
        }

        .pill strong {
          font-weight: 500;
        }

        .aura {
          position: relative;
          display: inline;
        }

        .aura::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: screen;
          filter: blur(8px) saturate(150%);
          background: var(--glow);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          opacity: .18;
          animation: hue 12s linear infinite;
        }

        @keyframes hue {
          to { filter: hue-rotate(360deg) blur(8px) saturate(150%); }
        }

        .cta {
          display: flex;
          gap: 16px;
          margin-top: 40px;
        }

        .btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          border-radius: 100px;
          border: 1px solid var(--border);
          color: var(--fg);
          text-decoration: none;
          font-weight: 400;
          font-size: 0.9rem;
          letter-spacing: 0.02em;
          transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
          background: var(--card);
          cursor: pointer;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 100px;
          background: linear-gradient(90deg,
            transparent,
            rgba(181, 131, 255, 0.3),
            rgba(0, 255, 255, 0.3),
            transparent
          );
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }

        .btn:hover::before {
          transform: translateX(100%);
        }

        .btn:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,.15);
          background: rgba(255,255,255,.04);
          box-shadow: 0 10px 30px rgba(181, 131, 255, 0.15);
        }

        .btn.primary {
          background: radial-gradient(100% 100% at 0% 0%, rgba(181,131,255,.15), transparent);
          border-color: rgba(181,131,255,.3);
        }

        .btn.primary::before {
          background: linear-gradient(90deg,
            transparent,
            rgba(255, 0, 122, 0.3),
            rgba(255, 184, 0, 0.3),
            rgba(0, 255, 255, 0.3),
            transparent
          );
        }

        .btn.primary:hover {
          background: radial-gradient(100% 100% at 0% 0%, rgba(181,131,255,.25), transparent);
          border-color: rgba(181,131,255,.5);
          box-shadow: 0 10px 40px rgba(181, 131, 255, 0.25);
        }

        .ribbon {
          position: absolute;
          inset: auto -20vw -50% -20vw;
          height: 60vh;
          background: radial-gradient(120% 60% at 50% 50%, rgba(181,131,255,.08), transparent 60%),
            conic-gradient(from 90deg at 50% 50%, rgba(255,0,122,.08), rgba(0,255,255,.06), rgba(0,255,170,.08), rgba(255,184,0,.08), rgba(255,0,122,.08));
          filter: blur(100px) saturate(130%);
          opacity: .5;
          pointer-events: none;
          transform: skewY(-8deg);
          animation: ribbonFlow 25s ease-in-out infinite;
        }

        @keyframes ribbonFlow {
          0%, 100% { transform: skewY(-8deg) scale(1) translateY(0); }
          50% { transform: skewY(-8deg) scale(1.05) translateY(-20px); }
        }

        /* Gradient transition from hero to experience */
        .gradient-transition {
          height: 200px;
          background: linear-gradient(to bottom,
            transparent 0%,
            rgba(181,131,255,.03) 30%,
            rgba(181,131,255,.05) 60%,
            rgba(0,0,0,0) 100%
          );
          margin-top: -100px;
          pointer-events: none;
        }

        section {
          padding: 160px 0;
        }

        section#experience {
          padding-top: 0;
          background: radial-gradient(ellipse at top center, rgba(181,131,255,.03) 0%, transparent 40%);
        }

        h2 {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: clamp(1.8rem, 2vw + 1rem, 2.5rem);
          font-weight: 200;
          letter-spacing: -0.02em;
          margin-bottom: 25px;
        }

        .lead {
          color: var(--fg-dim);
          max-width: 900px;
          margin-bottom: 40px;
          font-weight: 300;
          font-size: 1.05rem;
        }

        .video-wrap {
          position: relative;
          border-radius: var(--radius);
          overflow: hidden;
          background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01));
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
        }

        .video-veil {
          position: absolute;
          inset: 0;
          background: radial-gradient(100% 80% at 50% 0%, transparent, rgba(0,0,0,.4) 90%);
          pointer-events: none;
        }

        video {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 16/9;
          background: #000;
        }

        .caption {
          color: var(--fg-soft);
          font-size: 0.875rem;
          margin-top: 15px;
          font-weight: 300;
        }

        /* Process Section with Cards */
        .process-header {
          margin-bottom: 60px;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 30px;
        }

        @media (max-width: 1100px) {
          .process-grid {
            grid-template-columns: 1fr;
          }
        }

        .process-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .process-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: var(--radius);
          padding: 2px;
          background: linear-gradient(45deg,
            transparent,
            rgba(255, 0, 122, 0.4),
            rgba(255, 184, 0, 0.4),
            rgba(0, 255, 255, 0.4),
            rgba(102, 255, 0, 0.4),
            rgba(181, 131, 255, 0.4),
            rgba(255, 0, 122, 0.4),
            transparent
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: exclude;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s ease;
          animation: borderRotate 4s linear infinite paused;
        }

        .process-card:hover::before {
          opacity: 1;
          animation-play-state: running;
        }

        @keyframes borderRotate {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .process-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--radius);
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(181, 131, 255, 0.1) 0%,
            transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .process-card:hover::after {
          opacity: 1;
        }

        .process-card:hover {
          transform: translateY(-4px);
          background: var(--card-hover);
          box-shadow: 0 30px 60px rgba(0,0,0,.5),
                      0 0 40px rgba(181, 131, 255, 0.1);
        }

        .process-image {
          width: 100%;
          height: 250px;
          background: linear-gradient(135deg, rgba(181,131,255,.1), rgba(0,255,255,.05));
          overflow: hidden;
          position: relative;
        }

        .process-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(80%) brightness(0.9);
          transition: transform 0.4s ease, filter 0.4s ease;
        }

        .process-card:hover .process-image img {
          transform: scale(1.05);
          filter: saturate(100%) brightness(1);
        }

        .process-content {
          padding: 30px;
        }

        .process-number {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          color: var(--accent);
          margin-bottom: 12px;
          opacity: 0.7;
        }

        .process-card h3 {
          font-size: 1.3rem;
          font-weight: 400;
          letter-spacing: -0.01em;
          margin-bottom: 15px;
        }

        .process-card p {
          color: var(--fg-dim);
          font-weight: 300;
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .process-card a {
          color: var(--accent);
          text-decoration: none;
          font-weight: 400;
          transition: opacity 0.2s;
        }

        .process-card a:hover {
          opacity: 0.8;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(12,1fr);
          gap: 20px;
        }

        .card {
          grid-column: span 12;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: var(--card);
          padding: 28px;
          transition: all 0.3s ease;
          position: relative;
        }

        .card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: var(--radius);
          padding: 1px;
          background: conic-gradient(from var(--angle, 0deg),
            rgba(255, 0, 122, 0.5),
            rgba(255, 184, 0, 0.5),
            rgba(0, 255, 255, 0.5),
            rgba(181, 131, 255, 0.5),
            rgba(255, 0, 122, 0.5)
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: exclude;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .card:hover::before {
          opacity: 0.6;
          animation: borderSpin 3s linear infinite;
        }

        @keyframes borderSpin {
          from {
            --angle: 0deg;
          }
          to {
            --angle: 360deg;
          }
        }

        .card:hover {
          background: var(--card-hover);
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(0,0,0,.5),
                      0 0 30px rgba(181, 131, 255, 0.08);
        }

        @media (min-width: 720px) {
          .card {
            grid-column: span 6;
          }
        }

        .gallery {
          display: grid;
          grid-template-columns: repeat(12,1fr);
          gap: 20px;
        }

        .shot {
          grid-column: span 12;
          border-radius: var(--radius);
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--card);
          transition: all 0.3s ease;
          position: relative;
        }

        .shot::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: var(--radius);
          background: linear-gradient(90deg,
            rgba(255, 0, 122, 0.4),
            rgba(0, 255, 255, 0.4),
            rgba(181, 131, 255, 0.4),
            rgba(255, 184, 0, 0.4),
            rgba(255, 0, 122, 0.4)
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
          filter: blur(2px);
        }

        .shot:hover::before {
          opacity: 0.7;
          animation: shimmer 2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% {
            transform: translateX(-5%) scale(1);
          }
          50% {
            transform: translateX(5%) scale(1.02);
          }
        }

        @media(min-width:720px) {
          .shot {
            grid-column: span 6;
          }
        }

        .shot img {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 16/10;
          object-fit: cover;
          filter: saturate(90%);
          transition: transform 0.4s ease, filter 0.4s ease;
          position: relative;
          z-index: 1;
        }

        .shot:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 50px rgba(0,0,0,.6),
                      0 0 50px rgba(181, 131, 255, 0.15);
        }

        .shot:hover img {
          transform: scale(1.08);
          filter: saturate(110%);
        }

        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .chip {
          border: 1px solid var(--border);
          padding: 10px 18px;
          border-radius: 100px;
          background: var(--card);
          color: var(--fg-dim);
          font-size: 0.875rem;
          font-weight: 300;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .chip::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 100px;
          background: linear-gradient(90deg,
            transparent,
            rgba(181, 131, 255, 0.2),
            rgba(0, 255, 255, 0.2),
            transparent
          );
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .chip:hover::before {
          transform: translateX(100%);
        }

        .chip:hover {
          border-color: rgba(181, 131, 255, 0.3);
          transform: translateY(-2px);
          background: var(--card-hover);
          box-shadow: 0 5px 15px rgba(181, 131, 255, 0.1);
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

        footer {
          padding: 60px 24px 40px;
          border-top: 1px solid var(--border);
          text-align: center;
        }

        /* Psychedelic orbs */
        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.2;
          pointer-events: none;
          animation: float 25s ease-in-out infinite;
        }

        .orb1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #ff007a, transparent);
          top: 10%;
          right: -150px;
        }

        .orb2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #0ff, transparent);
          bottom: 20%;
          left: -100px;
          animation-delay: -8s;
        }

        .orb3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #ffb800, transparent);
          top: 50%;
          left: 30%;
          animation-delay: -16s;
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

        /* Section borders with gradient */
        .section-border {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.05), transparent);
          margin: 0 auto;
          max-width: var(--max);
        }

      `}</style>

      {/* Isolated Container */}
      <div className="metamorphic-container">

        {/* Cursor prism effect */}
        <div
          className="cursor"
          aria-hidden="true"
          style={{
            transform: `translate(${cursorPos.x - 150}px, ${cursorPos.y - 150}px)`
          }}
        />

        {/* Floating orbs */}
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />

        {/* Header */}
        <header>
          <div className="ribbon" aria-hidden="true" />
          <div className="wrap">
            <span className="kicker">Classroom Project · Immersive Installation</span>
            <h1 className="title">
              <span className="aura" data-text="Metamorphic Fractal Reflections">
                Metamorphic Fractal Reflections
              </span>
            </h1>
            <h2 style={{ fontWeight: 200, fontSize: 'clamp(1.2rem, 2vw + 0.5rem, 2rem)', marginTop: '-10px' }}>
              A Psychedelic Journey towards Ego Death
            </h2>
            <p className="sub">
              The participant steps into a bathroom, turns on the tap, and watches their reflection dissolve.
              Pulled through the mirror, they traverse a trippy multiverse of liquid color, pattern-creatures
              and structureless yet beautiful music, guided by a fading companion until reality calls them home.
            </p>
            <div className="meta" role="list">
              <span className="pill" role="listitem">Duration: <strong>Two months</strong></span>
              <span className="pill" role="listitem">
                Guide: Jignesh Khakar · Shoban Shah · Kaushal Sapre · Mochu · Suvani Suri · Arshad Pathan · Ravishekhar Aradhya
              </span>
              <span className="pill" role="listitem">
                Based on: Timothy Leary's <em>The Psychedelic Experience</em>
              </span>
              <span className="pill" role="listitem">Goal: Safe, accessible ego-dissolution themes</span>
            </div>
            <div className="cta">
              <a className="btn primary" href="#experience">Watch experience ▶</a>
              <a className="btn" href="#process">See process</a>
            </div>
          </div>
        </header>

        {/* Gradient transition */}
        <div className="gradient-transition" />

        <main>
          {/* Experience / Video */}
          <section id="experience">
            <div className="wrap">
              <h2 id="exp-title" className={`reveal ${visibleElements.has('exp-title') ? 'on' : ''}`}>
                Experience Film
              </h2>
              <p id="exp-lead" className={`lead reveal ${visibleElements.has('exp-lead') ? 'on' : ''}`}>
                A short capture of the installation and the mirror-portal moment.
              </p>
              <div id="exp-video" className={`video-wrap reveal ${visibleElements.has('exp-video') ? 'on' : ''}`}>
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
                    background: '#000',
                    borderRadius: 'var(--radius)'
                  }}
                />
                <div className="video-veil" aria-hidden="true" />
              </div>
              <div className="caption">
                Experience film showing the installation and mirror-portal interaction.
              </div>
            </div>
          </section>

          <div className="section-border" />

          {/* Concept */}
          <section id="concept">
            <div className="wrap">
              <h2 id="concept-title" className={`reveal ${visibleElements.has('concept-title') ? 'on' : ''}`}>
                Concept
              </h2>
              <div className="grid">
                <article id="concept-1" className={`card reveal ${visibleElements.has('concept-1') ? 'on' : ''}`}>
                  <p>
                    The viewers confront death-like states within an immersive environment. The design intentionally
                    mirrors bardo-like passages: loss of ordinary identity, surrender to sensory overload, and
                    re-emergence with insight. While intense, the aesthetic stays tender and humane, allowing
                    participants to form meaning without prescriptive narrative.
                  </p>
                </article>
                <article id="concept-2" className={`card reveal ${visibleElements.has('concept-2') ? 'on' : ''}`}>
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

          <div className="section-border" />

          {/* Process with Expanded Cards */}
          <section id="process">
            <div className="wrap">
              <div className="process-header">
                <h2>Process</h2>
                <p className="lead">
                  Eight stages of creation, from research to final testing.
                </p>
              </div>
              <div className="process-grid">
                {processSteps.map((step, index) => (
                  <div
                    key={index}
                    id={`step-${index}`}
                    className={`process-card reveal ${visibleElements.has(`step-${index}`) ? 'on' : ''}`}
                  >
                    <div className="process-image">
                      <img src={step.imageUrl} alt={step.title} />
                    </div>
                    <div className="process-content">
                      <span className="process-number">STAGE {String(index + 1).padStart(2, '0')}</span>
                      <h3>{step.title}</h3>
                      <p>
                        {step.description}
                        {step.hasLink && (
                          <>
                            <br/><br/>
                            <a href="#" rel="noopener">→ View MIRO Board</a>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="section-border" />

          {/* Visuals Gallery */}
          <section id="visuals">
            <div className="wrap">
              <h2 id="vis-title" className={`reveal ${visibleElements.has('vis-title') ? 'on' : ''}`}>
                Stills & Frames
              </h2>
              <p id="vis-lead" className={`lead reveal ${visibleElements.has('vis-lead') ? 'on' : ''}`}>
                Documentation stills and renders from the installation.
              </p>
              <div className="gallery">
                {[1, 2, 3, 4].map(num => (
                  <figure
                    key={num}
                    id={`shot-${num}`}
                    className={`shot reveal ${visibleElements.has(`shot-${num}`) ? 'on' : ''}`}
                  >
                    <img
                      src={`https://picsum.photos/1280/800?random=${num}`}
                      alt={`Fractal still ${num}`}
                    />
                  </figure>
                ))}
              </div>
            </div>
          </section>

          <div className="section-border" />

          {/* Tech Stack */}
          <section id="stack">
            <div className="wrap">
              <h2 id="tech-title" className={`reveal ${visibleElements.has('tech-title') ? 'on' : ''}`}>
                Tech Stack
              </h2>
              <div
                id="tech-chips"
                className={`chips reveal ${visibleElements.has('tech-chips') ? 'on' : ''}`}
                aria-label="Technologies used"
              >
                {techStack.map((tech, index) => (
                  <span key={index} className="chip">{tech}</span>
                ))}
              </div>
            </div>
          </section>

          <div className="section-border" />

          {/* Ethics */}
          <section id="ethics">
            <div className="wrap">
              <h2 id="ethics-title" className={`reveal ${visibleElements.has('ethics-title') ? 'on' : ''}`}>
                Notes on Ethics & Safety
              </h2>
              <div className="grid">
                <article id="ethics-1" className={`card reveal ${visibleElements.has('ethics-1') ? 'on' : ''}`}>
                  <p>
                    Inspired by <em>The Psychedelic Experience</em> (Leary et al.), the installation frames
                    ego-dissolution symbolically—no substances involved. The environment includes clear opt-out,
                    calming lights on exit, and staff-visible safety indicators.
                  </p>
                </article>
                <article id="ethics-2" className={`card reveal ${visibleElements.has('ethics-2') ? 'on' : ''}`}>
                  <p>
                    Accessibility: subtitles for audio sequences, path lighting, and a seated option near the mirror.
                    Motion intensity respects <code>prefers-reduced-motion</code>.
                  </p>
                </article>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <div className="wrap">
            <div style={{ color: 'var(--fg-soft)', fontSize: '0.875rem' }}>
              Metamorphic Fractal Reflections · 2024
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
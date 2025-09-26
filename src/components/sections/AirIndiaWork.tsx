'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface StatItem {
  value: string;
  label: string;
  target?: number;
}

interface ProjectCard {
  id: number;
  label: string;
  title: string;
  description: string;
  metric: string;
}

interface ProjectDetails {
  id: string;
  category: string;
  title: string;
  badge: string;
  description: string;
  contribution: {
    owned: string;
    collaborated: string;
  };
  outcome: string;
  link: string;
  isWinner?: boolean;
}

export function AirIndiaWork() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats: StatItem[] = [
    { value: '8', label: 'Key Projects', target: 8 },
    { value: '2', label: 'Hackathon Wins', target: 2 },
    { value: '↑', label: 'Review Speed' },
    { value: '↑', label: 'Consistency' },
  ];

  const impactCards: ProjectCard[] = [
    {
      id: 1,
      label: '01',
      title: 'Design Systems',
      description: 'Token architecture and Pixel Radar plugin for design consistency',
      metric: '↑ Review efficiency',
    },
    {
      id: 2,
      label: '02',
      title: 'Data Visualization',
      description: 'Narrative dashboards with progressive disclosure',
      metric: '↓ Decision time',
    },
    {
      id: 3,
      label: '03',
      title: 'Mobile Patterns',
      description: 'Unified UX library for iOS and Android',
      metric: '↓ Platform bugs',
    },
    {
      id: 4,
      label: '04',
      title: 'IFE Experience',
      description: 'In-flight entertainment with offline resilience',
      metric: '↑ User satisfaction',
    },
    {
      id: 5,
      label: '05',
      title: 'Team Culture',
      description: 'Liftoff program for skill progression',
      metric: '↑ Team velocity',
    },
    {
      id: 6,
      label: '06',
      title: 'Innovation',
      description: 'Hackathon wins now in production',
      metric: '→ Rapid validation',
    },
  ];

  const projects: ProjectDetails[] = [
    {
      id: 'pixel-radar',
      category: 'Design Systems',
      title: 'Pixel Radar',
      badge: 'Figma Plugin',
      description: 'Design drift was causing significant rework and inconsistent experiences across Air India\'s digital products. Teams struggled to maintain token compliance without manual reviews.',
      contribution: {
        owned: 'Plugin architecture, audit logic, token normalization algorithms',
        collaborated: 'Design team on token naming, engineering on feasibility',
      },
      outcome: 'Significantly improved review speed and consistency. Teams report fewer design-dev handoff issues.',
      link: '#',
    },
    {
      id: 'analytics',
      category: 'Data Visualization',
      title: 'Analytics Platform',
      badge: 'Dashboard',
      description: 'Operations teams were overwhelmed by data complexity. Decision-making slowed as stakeholders struggled to extract insights from traditional reports.',
      contribution: {
        owned: 'Information architecture, narrative flow, interaction patterns',
        collaborated: 'Data team on metrics, operations on workflows',
      },
      outcome: 'Reduced decision time to minute-scale. Clearer understanding and faster alignment.',
      link: '#',
    },
    {
      id: 'hackathon',
      category: 'Innovation Sprint',
      title: 'Internal Hackathon',
      badge: 'Winner',
      description: 'Annual internal innovation sprint to explore bold ideas outside normal constraints. Focus on customer pain points with rapid prototyping.',
      contribution: {
        owned: 'Concept development, rapid prototyping, presentation',
        collaborated: 'Cross-functional team on implementation strategy',
      },
      outcome: 'First place win. Prototype moved to production pipeline within 2 weeks.',
      link: '#',
      isWinner: true,
    },
  ];

  if (!isVisible) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-white/60">
          Loading case study...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <style jsx global>{`
        /* Air India Case Study Styles - Integrated with Portfolio Design System */

        .air-india-hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-16) 0 var(--space-12);
          position: relative;
        }

        .air-india-hero-content {
          text-align: center;
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-12);
        }

        .air-india-hero-title {
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 200;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin-bottom: var(--space-6);
          color: var(--text-primary);
        }

        .air-india-hero-title strong {
          font-weight: 700;
          background: linear-gradient(135deg, var(--brand-red), #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 40px rgba(var(--brand-red-rgb), 0.4));
        }

        .air-india-hero-desc {
          font-size: var(--space-4);
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto var(--space-12);
          line-height: 1.8;
        }

        .air-india-stats-container {
          display: flex;
          justify-content: center;
          margin-top: calc(var(--space-12) * -1);
          margin-bottom: var(--space-16);
          position: relative;
          z-index: 3;
          padding: 0 var(--space-12);
        }

        .air-india-stats-card {
          background: var(--surface-primary);
          backdrop-filter: blur(var(--blur-3xl)) saturate(180%);
          border: 1px solid var(--border-secondary);
          border-radius: var(--radius-3xl);
          padding: var(--space-12) var(--space-16);
          box-shadow: var(--shadow-2xl);
          position: relative;
          overflow: hidden;
        }

        .air-india-stats-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent,
            rgba(var(--brand-red-rgb), 0.6),
            transparent);
          animation: shimmer 6s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .air-india-stats-row {
          display: flex;
          gap: var(--space-12);
        }

        .air-india-stat {
          text-align: center;
          position: relative;
        }

        .air-india-stat::after {
          content: '';
          position: absolute;
          right: calc(var(--space-12) * -0.5);
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 50%;
          background: linear-gradient(to bottom, transparent, var(--border-primary), transparent);
        }

        .air-india-stat:last-child::after {
          display: none;
        }

        .air-india-stat-value {
          font-size: clamp(32px, 4vw, 40px);
          font-weight: 300;
          letter-spacing: -0.03em;
          display: block;
          margin-bottom: var(--space-2);
          color: var(--text-primary);
          transition: var(--duration-base) var(--ease-premium);
        }

        .air-india-stat:hover .air-india-stat-value {
          transform: translateY(-3px);
          text-shadow: 0 10px 30px rgba(var(--brand-red-rgb), 0.4);
        }

        .air-india-stat-label {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .air-india-section {
          padding: var(--space-12) 0;
          position: relative;
        }

        .air-india-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-12);
          position: relative;
          z-index: 2;
        }

        .air-india-section-header {
          text-align: center;
          margin-bottom: var(--space-12);
        }

        .air-india-section-title {
          font-size: clamp(32px, 4vw, 40px);
          font-weight: 300;
          letter-spacing: -0.03em;
          margin-bottom: var(--space-4);
          background: linear-gradient(180deg, var(--text-primary), var(--text-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .air-india-section-desc {
          font-size: 15px;
          color: var(--text-tertiary);
          font-weight: 400;
        }

        .air-india-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-6);
          margin-bottom: var(--space-12);
        }

        .air-india-card {
          padding: var(--space-12);
          background: var(--surface-primary);
          backdrop-filter: blur(var(--blur-xl));
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-2xl);
          transition: var(--duration-slow) var(--ease-premium);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .air-india-card::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: var(--radius-2xl);
          padding: 2px;
          background: linear-gradient(135deg, var(--brand-red), #6366f1);
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: exclude;
          mask-composite: exclude;
          opacity: 0;
          transition: var(--duration-slow) var(--ease-premium);
        }

        .air-india-card:hover {
          transform: translateY(-8px) scale(1);
          background: var(--surface-secondary);
          border-color: var(--border-secondary);
          box-shadow: var(--shadow-2xl);
        }

        .air-india-card:hover::after {
          opacity: 0.3;
        }

        .air-india-card-label {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--brand-red);
          margin-bottom: var(--space-4);
          opacity: 0.7;
        }

        .air-india-card-title {
          font-size: 24px;
          font-weight: 500;
          letter-spacing: -0.02em;
          margin-bottom: var(--space-4);
          transition: var(--duration-slow) var(--ease-premium);
        }

        .air-india-card:hover .air-india-card-title {
          color: var(--text-primary);
        }

        .air-india-card-desc {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: var(--space-6);
        }

        .air-india-card-metric {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(var(--brand-red-rgb), 0.08);
          border: 1px solid rgba(var(--brand-red-rgb), 0.2);
          border-radius: var(--radius-xl);
          font-size: 13px;
          font-weight: 600;
          color: var(--brand-red);
          transition: var(--duration-slow) var(--ease-premium);
        }

        .air-india-card:hover .air-india-card-metric {
          background: rgba(var(--brand-red-rgb), 0.12);
          transform: translateX(4px);
        }

        .air-india-project {
          background: var(--surface-primary);
          backdrop-filter: blur(var(--blur-2xl));
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-3xl);
          padding: var(--space-16);
          margin-bottom: var(--space-12);
          box-shadow: var(--shadow-xl);
          position: relative;
          overflow: hidden;
        }

        .air-india-project::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(var(--brand-red-rgb), 0.03) 0%, transparent 60%);
          opacity: 0;
          transition: var(--duration-slower) var(--ease-premium);
        }

        .air-india-project:hover::before {
          opacity: 1;
        }

        .air-india-project-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: var(--space-12);
        }

        .air-india-project-meta {
          flex: 1;
        }

        .air-india-project-label {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-tertiary);
          margin-bottom: var(--space-4);
        }

        .air-india-project-title {
          font-size: clamp(24px, 3.5vw, 32px);
          font-weight: 400;
          letter-spacing: -0.03em;
          margin-bottom: var(--space-4);
        }

        .air-india-project-desc {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: var(--space-12);
          font-size: var(--space-4);
        }

        .air-india-media-frame {
          width: 100%;
          aspect-ratio: 16 / 10;
          background: var(--surface-primary);
          backdrop-filter: blur(var(--blur-xl));
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-2xl);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: var(--space-12) 0;
          position: relative;
          overflow: hidden;
          transition: var(--duration-slow) var(--ease-premium);
        }

        .air-india-media-frame::after {
          content: '';
          position: absolute;
          inset: -100%;
          background: linear-gradient(
            135deg,
            transparent 40%,
            rgba(var(--brand-red-rgb), 0.08) 50%,
            transparent 60%
          );
          animation: mediaShimmer 5s infinite;
        }

        @keyframes mediaShimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .air-india-media-frame:hover {
          border-color: rgba(var(--brand-red-rgb), 0.15);
          box-shadow: 0 20px 60px rgba(var(--brand-red-rgb), 0.15);
        }

        .air-india-media-placeholder {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-tertiary);
          z-index: 1;
          font-weight: 600;
        }

        .air-india-role-block {
          padding: var(--space-6) var(--space-12);
          background: rgba(var(--brand-red-rgb), 0.05);
          backdrop-filter: blur(var(--blur-xl));
          border: 1px solid rgba(var(--brand-red-rgb), 0.12);
          border-left: 3px solid var(--brand-red);
          border-radius: var(--radius-2xl);
          margin: var(--space-12) 0;
          transition: var(--duration-slow) var(--ease-premium);
        }

        .air-india-role-block:hover {
          background: rgba(var(--brand-red-rgb), 0.08);
          box-shadow: -10px 0 40px rgba(var(--brand-red-rgb), 0.2);
        }

        .air-india-role-label {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--brand-red);
          margin-bottom: var(--space-4);
          font-weight: 700;
        }

        .air-india-role-text {
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-secondary);
        }

        .air-india-role-text strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .air-india-outcome {
          padding: var(--space-6) var(--space-12);
          background: rgba(52, 211, 153, 0.05);
          backdrop-filter: blur(var(--blur-xl));
          border: 1px solid rgba(52, 211, 153, 0.15);
          border-radius: var(--radius-2xl);
          margin: var(--space-12) 0;
          position: relative;
          transition: var(--duration-slow) var(--ease-premium);
        }

        .air-india-outcome:hover {
          background: rgba(52, 211, 153, 0.08);
          box-shadow: 0 0 40px rgba(52, 211, 153, 0.15);
        }

        .air-india-outcome-label {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #34d399;
          margin-bottom: var(--space-2);
          font-weight: 700;
        }

        .air-india-outcome-text {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.8;
        }

        .air-india-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          color: var(--text-secondary);
          text-decoration: none;
          position: relative;
          transition: var(--duration-slow) var(--ease-premium);
          font-weight: 500;
          padding: 4px 0;
        }

        .air-india-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--brand-red);
          transform: scaleX(0);
          transform-origin: left;
          transition: var(--duration-slow) var(--ease-premium);
        }

        .air-india-link::after {
          content: '→';
          transition: var(--duration-slow) var(--ease-premium);
        }

        .air-india-link:hover {
          color: var(--brand-red);
        }

        .air-india-link:hover::before {
          transform: scaleX(1);
        }

        .air-india-link:hover::after {
          transform: translateX(6px);
        }

        .air-india-section-divider {
          margin: var(--space-12) 0;
          padding: var(--space-12);
          background: var(--surface-primary);
          backdrop-filter: blur(var(--blur-xl));
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-3xl);
          text-align: center;
        }

        .air-india-section-divider h3 {
          font-size: 24px;
          font-weight: 400;
          letter-spacing: -0.02em;
          margin-bottom: var(--space-2);
        }

        .air-india-section-divider p {
          font-size: 15px;
          color: var(--text-tertiary);
        }

        .air-india-badge {
          display: inline-block;
          padding: 8px 16px;
          background: var(--surface-secondary);
          backdrop-filter: blur(var(--blur-xl));
          border: 1px solid var(--border-secondary);
          border-radius: var(--radius-xl);
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .air-india-badge.winner {
          background: rgba(251, 146, 60, 0.15);
          border-color: rgba(251, 146, 60, 0.3);
          color: #fb9260;
          box-shadow: 0 0 20px rgba(251, 146, 60, 0.15);
        }

        .air-india-footer {
          padding: var(--space-12) 0;
          text-align: center;
          border-top: 1px solid var(--border-primary);
        }

        .air-india-footer-meta {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-tertiary);
          opacity: 0.5;
        }

        .air-india-breadcrumb {
          padding: var(--space-6) 0;
          margin-bottom: var(--space-8);
        }

        .air-india-breadcrumb-link {
          font-size: 15px;
          color: var(--text-tertiary);
          text-decoration: none;
          transition: var(--duration-base) var(--ease-premium);
        }

        .air-india-breadcrumb-link:hover {
          color: var(--brand-red);
        }

        @media (max-width: 768px) {
          .air-india-stats-row {
            flex-direction: column;
            gap: var(--space-12);
          }

          .air-india-stat::after {
            display: none;
          }

          .air-india-grid {
            grid-template-columns: 1fr;
          }

          .air-india-hero-title {
            font-size: clamp(32px, 8vw, 48px);
          }

          .air-india-hero-content,
          .air-india-stats-container,
          .air-india-container {
            padding: 0 var(--space-4);
          }

          .air-india-stats-card {
            padding: var(--space-8) var(--space-6);
          }

          .air-india-project {
            padding: var(--space-8);
          }

          .air-india-project-header {
            flex-direction: column;
            gap: var(--space-4);
          }
        }
      `}</style>

      {/* Breadcrumb Navigation */}
      <div className="air-india-container">
        <div className="air-india-breadcrumb">
          <Link href="/work" className="air-india-breadcrumb-link">
            ← Back to Work
          </Link>
        </div>
      </div>

      {/* Hero */}
      <motion.header
        className="air-india-hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="air-india-hero-content">
          <h1 className="air-india-hero-title">
            I build <strong>systems</strong> that help teams ship better products, faster.
          </h1>
          <p className="air-india-hero-desc">
            Select work from Air India's digital transformation. Public-safe case study with sanitized examples and directional metrics.
          </p>
        </div>
      </motion.header>

      {/* Glass Stats */}
      <motion.section
        className="air-india-stats-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="air-india-stats-card">
          <div className="air-india-stats-row">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="air-india-stat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="air-india-stat-value">{stat.value}</span>
                <span className="air-india-stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Impact Grid */}
      <section className="air-india-section">
        <div className="air-india-container">
          <motion.div
            className="air-india-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <h2 className="air-india-section-title">Six Areas of Impact</h2>
            <p className="air-india-section-desc">Systems and innovation across Air India's digital transformation</p>
          </motion.div>

          <div className="air-india-grid">
            {impactCards.map((card, index) => (
              <motion.div
                key={card.id}
                className="air-india-card"
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <div className="air-india-card-label">{card.label}</div>
                <h3 className="air-india-card-title">{card.title}</h3>
                <p className="air-india-card-desc">{card.description}</p>
                <div className="air-india-card-metric">{card.metric}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="air-india-section">
        <div className="air-india-container">
          <motion.div
            className="air-india-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <h2 className="air-india-section-title">Project Details</h2>
            <p className="air-india-section-desc">Deep dives into key initiatives</p>
          </motion.div>

          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="air-india-project"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <div className="air-india-project-header">
                <div className="air-india-project-meta">
                  <div className="air-india-project-label">{project.category}</div>
                  <h3 className="air-india-project-title">{project.title}</h3>
                </div>
                <span className={`air-india-badge ${project.isWinner ? 'winner' : ''}`}>
                  {project.badge}
                </span>
              </div>

              <p className="air-india-project-desc">
                {project.description}
              </p>

              <div className="air-india-media-frame">
                <span className="air-india-media-placeholder">
                  {project.title} Demo
                </span>
              </div>

              <div className="air-india-role-block">
                <div className="air-india-role-label">My Contribution</div>
                <div className="air-india-role-text">
                  <strong>Owned:</strong> {project.contribution.owned}<br />
                  <strong>Collaborated:</strong> {project.contribution.collaborated}
                </div>
              </div>

              <div className="air-india-outcome">
                <div className="air-india-outcome-label">Outcome</div>
                <div className="air-india-outcome-text">
                  {project.outcome}
                </div>
              </div>

              <a href={project.link} className="air-india-link">
                View details
              </a>
            </motion.div>
          ))}

          {/* Innovation Sprint Divider */}
          <motion.div
            className="air-india-section-divider"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <h3>Innovation Sprints</h3>
            <p>48-hour hackathon wins now in production</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="air-india-footer">
        <div className="air-india-container">
          <div className="air-india-footer-meta">© 2024 Air India Case Study</div>
        </div>
      </footer>
    </div>
  );
}
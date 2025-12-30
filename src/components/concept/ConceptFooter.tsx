'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, User, Linkedin, Github, Mail } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContactChat } from '@/components/ContactChat';
import { Chatbot } from '@/components/Chatbot';

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ConceptFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    // Animate footer content on scroll into view
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 40%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      content.querySelectorAll('.fade-up'),
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  const organizations = [
    { file: 'nid.svg', alt: 'NID', name: 'NID Gandhinagar' },
    { file: 'ISB.jpeg', alt: 'ISB', name: 'ISB Hyderabad' },
    { file: 'infosys.svg', alt: 'Infosys', name: 'Infosys' },
    { file: 'air-india.svg', alt: 'Air India', name: 'Air India' },
  ];

  const socialLinks = [
    { id: 'linkedin', href: 'https://linkedin.com/in/krishnanihar', icon: Linkedin, label: 'LinkedIn' },
    { id: 'github', href: 'https://github.com/krishnanihar', icon: Github, label: 'GitHub' },
    { id: 'email', href: 'mailto:krishnanihar.s@gmail.com', icon: Mail, label: 'Email' },
  ];

  return (
    <>
      <footer
        ref={sectionRef}
        style={{
          position: 'relative',
          zIndex: 30,
          minHeight: '140vh', // Extra scroll room before fade triggers
          background: 'var(--glass-03)',
          backdropFilter: mounted ? 'blur(60px) saturate(180%)' : 'none',
          WebkitBackdropFilter: mounted ? 'blur(60px) saturate(180%)' : 'none',
          display: 'flex',
          alignItems: 'flex-start', // Content at top, empty space at bottom for scroll
          justifyContent: 'center',
          paddingTop: 'clamp(6rem, 15vh, 12rem)', // Push content down from very top
        }}
      >
        {/* Gradient overlay for depth */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(
                ellipse 80% 50% at 50% 0%,
                var(--glass-08) 0%,
                transparent 50%
              ),
              radial-gradient(
                ellipse 60% 40% at 80% 100%,
                var(--glass-05) 0%,
                transparent 40%
              )
            `,
            pointerEvents: 'none',
          }}
        />

        <div
          ref={contentRef}
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            padding: 'clamp(3rem, 6vh, 5rem) clamp(1.5rem, 4vw, 3rem) clamp(8rem, 20vh, 15rem)',
            textAlign: 'center',
          }}
        >
          {/* Main Statement */}
          <div className="fade-up" style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
            <h2
              style={{
                color: 'var(--text-95)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 300,
                lineHeight: 1.2,
                fontFamily: 'var(--font-space-grotesk)',
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}
            >
              Let's build{' '}
              <span style={{ fontWeight: 400, color: 'var(--text-60)' }}>
                something
              </span>
              <br />
              together.
            </h2>
            <p
              style={{
                color: 'var(--text-50)',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                fontWeight: 400,
                maxWidth: '480px',
                margin: '0 auto',
              }}
            >
              Tell me about your project
            </p>
          </div>

          {/* Contact Chat */}
          <div className="fade-up" style={{ marginBottom: 'clamp(3rem, 6vh, 4rem)' }}>
            <ContactChat
              onMessageSubmit={(message) => {
                setInitialMessage(message);
                setChatOpen(true);
              }}
            />
          </div>

          {/* Profile Section */}
          <div
            className="fade-up"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: 'clamp(2rem, 4vh, 3rem)',
              paddingTop: 'clamp(2rem, 4vh, 3rem)',
              borderTop: '1px solid var(--text-06)',
            }}
          >
            {/* Profile Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              {/* Profile Image */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: 'var(--glass-05)',
                  border: '2px solid var(--text-10)',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/images/profile/mypic.png"
                  alt="Krishna Nihar Sunkara"
                  width={56}
                  height={56}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Name & Role */}
              <div style={{ textAlign: 'left' }}>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    color: 'var(--text-95)',
                    marginBottom: '0.125rem',
                    fontFamily: 'var(--font-space-grotesk)',
                  }}
                >
                  Krishna Nihar Sunkara
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    color: 'var(--text-50)',
                  }}
                >
                  Product Designer at{' '}
                  <span style={{ color: '#DA0E29', fontWeight: 500 }}>Air India</span>
                </p>
              </div>
            </div>

            {/* Organization Logos */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {organizations.map((org) => (
                <div
                  key={org.file}
                  style={{
                    width: '44px',
                    height: '44px',
                    padding: '6px',
                    borderRadius: '10px',
                    background: 'var(--glass-04)',
                    backdropFilter: mounted ? 'blur(20px) saturate(120%)' : 'none',
                    border: '1px solid var(--text-06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title={org.name}
                >
                  <Image
                    src={`/logos/${org.file}`}
                    alt={org.alt}
                    width={32}
                    height={32}
                    style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                  />
                </div>
              ))}
            </div>

            {/* About Me CTA */}
            <Link href="/about" style={{ textDecoration: 'none' }}>
              <div
                onMouseEnter={() => setHoveredButton(true)}
                onMouseLeave={() => setHoveredButton(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: hoveredButton ? 'var(--glass-08)' : 'var(--glass-04)',
                  backdropFilter: mounted ? 'blur(20px)' : 'none',
                  border: '1px solid var(--text-08)',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: hoveredButton ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                <User size={16} style={{ color: 'var(--text-60)' }} />
                <span
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--text-85)',
                  }}
                >
                  About Me
                </span>
                <ArrowRight
                  size={14}
                  style={{
                    color: 'var(--text-50)',
                    transition: 'transform 0.3s ease',
                    transform: hoveredButton ? 'translateX(3px)' : 'translateX(0)',
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Bottom Bar */}
          <div
            className="fade-up"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {/* Social Links */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.id}
                    href={social.href}
                    target={social.id !== 'email' ? '_blank' : undefined}
                    rel={social.id !== 'email' ? 'noopener noreferrer' : undefined}
                    onMouseEnter={() => setHoveredSocial(social.id)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      color: hoveredSocial === social.id ? 'var(--text-95)' : 'var(--text-40)',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Icon size={14} />
                    <span>{social.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Copyright */}
            <p
              style={{
                color: 'var(--text-25)',
                fontSize: '0.75rem',
                fontWeight: 400,
              }}
            >
              © {new Date().getFullYear()} Krishna Nihar Sunkara
            </p>

            {/* Easter egg link */}
            <Link
              href="/work/living-organism"
              style={{
                color: 'var(--text-15)',
                fontSize: '0.6875rem',
                fontWeight: 400,
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                marginTop: '0.5rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-50)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-15)';
              }}
            >
              This site is alive
            </Link>
          </div>
        </div>
      </footer>

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

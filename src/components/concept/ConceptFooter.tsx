'use client';

import { useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ConceptFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
      content,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <footer
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 30,
        padding: 'clamp(4rem, 10vh, 8rem) 0',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div
        ref={contentRef}
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 4vw, 3rem)',
          textAlign: 'center',
        }}
      >
        {/* Main Statement */}
        <h2
          style={{
            color: 'var(--text-95)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 500,
            lineHeight: 1.2,
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            fontFamily: 'var(--font-space-grotesk)',
          }}
        >
          We design{' '}
          <em
            style={{
              fontFamily: 'var(--font-cormorant), Cormorant Garamond, Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--text-75)',
            }}
          >
            unconventional
          </em>
          <br style={{ display: 'none' }} className="md:block" />
          <span style={{ display: 'inline' }}> </span>
          solutions.
        </h2>

        {/* CTA Button */}
        <Link
          href="/work"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 2rem',
            backgroundColor: 'var(--glass-08)',
            color: 'var(--text-90)',
            border: '1px solid var(--text-15)',
            borderRadius: '12px',
            fontSize: '0.9375rem',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span>See All Work</span>
          <ArrowRight size={18} />
        </Link>

        {/* Footer Links */}
        <div
          style={{
            marginTop: 'clamp(4rem, 8vh, 6rem)',
            paddingTop: 'clamp(2rem, 4vh, 3rem)',
            borderTop: '1px solid var(--text-10)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
            className="md:flex-row"
          >
            {/* Copyright */}
            <p
              style={{
                color: 'var(--text-40)',
                fontSize: '0.875rem',
                fontWeight: 400,
              }}
            >
              &copy; {new Date().getFullYear()} Nihar. All rights reserved.
            </p>

            {/* Social Links */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              <Link
                href="https://linkedin.com/in/krishnanihar"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--text-60)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s ease',
                }}
              >
                LinkedIn
              </Link>
              <Link
                href="https://github.com/krishnanihar"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--text-60)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s ease',
                }}
              >
                GitHub
              </Link>
              <Link
                href="mailto:hello@nihar.design"
                style={{
                  color: 'var(--text-60)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s ease',
                }}
              >
                Email
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

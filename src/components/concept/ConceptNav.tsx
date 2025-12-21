'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function ConceptNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-5"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      <nav className="flex items-center justify-between max-w-[1920px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="otherlife-heading text-xl lg:text-2xl"
          style={{ color: 'var(--otherlife-text-primary)' }}
        >
          Nihar
        </Link>

        {/* Right side - Menu + Contact */}
        <div className="flex items-center gap-3">
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center w-12 h-12 rounded-lg"
            style={{
              backgroundColor: 'var(--otherlife-canvas)',
              border: '1px solid var(--otherlife-border-hover)',
            }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={20} style={{ color: 'var(--otherlife-text-primary)' }} />
            ) : (
              <Menu size={20} style={{ color: 'var(--otherlife-text-primary)' }} />
            )}
          </button>

          {/* Contact Button */}
          <Link
            href="/contact"
            className="otherlife-btn-primary hidden sm:flex items-center justify-center h-12 px-6 rounded-lg"
          >
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-20 z-40"
          style={{ backgroundColor: 'var(--otherlife-canvas)' }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <Link
              href="/work"
              className="otherlife-display text-3xl"
              onClick={() => setIsMenuOpen(false)}
            >
              Work
            </Link>
            <Link
              href="/about"
              className="otherlife-display text-3xl"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/journey"
              className="otherlife-display text-3xl"
              onClick={() => setIsMenuOpen(false)}
            >
              Journey
            </Link>
            <Link
              href="/contact"
              className="otherlife-btn-primary mt-8"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

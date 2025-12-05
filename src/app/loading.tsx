'use client';

export default function Loading() {
  return (
    <div className="loading-screen">
      {/* Main container */}
      <div className="loading-container">
        {/* Glassmorphic card */}
        <div className="loading-card">
          {/* Logo */}
          <div className="loading-logo">
            <svg
              width="48"
              height="48"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(180, 210, 240)" />
                  <stop offset="100%" stopColor="rgb(100, 150, 200)" />
                </linearGradient>
              </defs>
              <text
                x="50"
                y="65"
                fontSize="56"
                fontWeight="700"
                textAnchor="middle"
                fill="url(#logoGradient)"
                style={{ fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif' }}
              >
                K
              </text>
            </svg>
          </div>

          {/* Loading text */}
          <div className="loading-text" role="status" aria-live="polite">
            <span className="loading-gradient-text">Loading</span>
            <span className="loading-dots">
              <span className="loading-dot" style={{ animationDelay: '0s' }}>.</span>
              <span className="loading-dot" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="loading-dot" style={{ animationDelay: '0.4s' }}>.</span>
            </span>
          </div>

          {/* Accessibility */}
          <span className="sr-only">Loading, please wait</span>
        </div>

        {/* Floating particles (optional decorative elements) */}
        <div className="loading-particles" aria-hidden="true">
          <div className="loading-particle" style={{ left: '20%', top: '30%', animationDelay: '0s' }} />
          <div className="loading-particle" style={{ left: '80%', top: '25%', animationDelay: '1s' }} />
          <div className="loading-particle" style={{ left: '15%', top: '70%', animationDelay: '2s' }} />
          <div className="loading-particle" style={{ left: '85%', top: '75%', animationDelay: '1.5s' }} />
        </div>
      </div>

      <style jsx>{`
        .loading-screen {
          position: fixed;
          inset: 0;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .loading-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-card {
          position: relative;
          padding: 3rem 4rem;
          background: var(--glass-05);
          border: 1px solid var(--glass-08);
          border-radius: var(--radius-3xl, 24px);
          backdrop-filter: blur(48px) saturate(150%) brightness(1.1);
          -webkit-backdrop-filter: blur(48px) saturate(150%) brightness(1.1);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 2px 8px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          animation: loadingBreathing 3s ease-in-out infinite;
          overflow: hidden;
        }

        /* Shimmer border effect */
        .loading-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(180, 210, 240, 0.3),
            transparent
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: loadingShimmer 3s linear infinite;
          pointer-events: none;
        }

        .loading-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          animation: loadingPulse 2s ease-in-out infinite;
        }

        .loading-text {
          text-align: center;
          font-size: 1.125rem;
          font-weight: 500;
          color: var(--text-95);
          letter-spacing: 0.05em;
        }

        .loading-gradient-text {
          background: linear-gradient(
            90deg,
            var(--text-95),
            var(--text-60),
            var(--text-95)
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: loadingGradientShift 2s ease-in-out infinite;
        }

        .loading-dots {
          display: inline-block;
          margin-left: 0.25rem;
        }

        .loading-dot {
          display: inline-block;
          animation: loadingDotBounce 1.4s ease-in-out infinite;
          color: var(--text-60);
        }

        /* Floating particles */
        .loading-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .loading-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(
            circle,
            rgba(180, 210, 240, 0.6) 0%,
            rgba(180, 210, 240, 0) 70%
          );
          border-radius: 50%;
          animation: loadingParticleFloat 8s ease-in-out infinite;
        }

        /* Screen reader only */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        /* Animations */
        @keyframes loadingBreathing {
          0%, 100% {
            transform: scale(1);
            opacity: 0.95;
          }
          50% {
            transform: scale(1.02);
            opacity: 1;
          }
        }

        @keyframes loadingPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes loadingShimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes loadingGradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes loadingDotBounce {
          0%, 80%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          40% {
            opacity: 1;
            transform: translateY(-6px);
          }
        }

        @keyframes loadingParticleFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(10px, -20px) scale(1.2);
            opacity: 0.6;
          }
          50% {
            transform: translate(-5px, -40px) scale(0.8);
            opacity: 0.4;
          }
          75% {
            transform: translate(-15px, -20px) scale(1.1);
            opacity: 0.5;
          }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .loading-card {
            padding: 2.5rem 3rem;
            margin: 0 1rem;
          }

          .loading-logo svg {
            width: 40px;
            height: 40px;
          }

          .loading-text {
            font-size: 1rem;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .loading-card,
          .loading-logo,
          .loading-gradient-text,
          .loading-dot,
          .loading-particle,
          .loading-card::before {
            animation: none;
          }

          .loading-card {
            opacity: 1;
            transform: scale(1);
          }

          .loading-gradient-text {
            -webkit-text-fill-color: unset;
            background: none;
            color: var(--text-95);
          }
        }
      `}</style>
    </div>
  );
}

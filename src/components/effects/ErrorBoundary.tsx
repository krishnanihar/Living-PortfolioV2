'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      console.error('Portfolio Error Boundary:', error, errorInfo);
      // Here you would typically send to error monitoring service
      // like Sentry, LogRocket, or similar
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen bg-black flex items-center justify-center p-6"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Glass container */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="relative p-8 rounded-2xl glass-frosted noise-texture border border-white/10"
              >
                {/* Error icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.2,
                    type: 'spring',
                    stiffness: 300,
                    damping: 25
                  }}
                  className="flex justify-center mb-6"
                >
                  <div className="p-4 rounded-full bg-red-500/20 border border-red-500/30">
                    <AlertTriangle size={32} className="text-red-400" />
                  </div>
                </motion.div>

                {/* Error message */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-center mb-6"
                >
                  <h1 className="text-2xl font-light text-white/95 mb-3">
                    Something went wrong
                  </h1>
                  <p className="text-white/70 leading-relaxed">
                    We encountered an unexpected error while loading this part of the portfolio.
                    Don't worry, this has been logged and we'll look into it.
                  </p>
                </motion.div>

                {/* Error details (development only) */}
                {this.props.showDetails && process.env.NODE_ENV === 'development' && this.state.error && (
                  <motion.details
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20"
                  >
                    <summary className="text-red-400 font-medium cursor-pointer mb-3">
                      Technical Details
                    </summary>
                    <div className="text-xs font-mono text-red-300/80 space-y-2">
                      <div>
                        <strong>Error:</strong> {this.state.error.message}
                      </div>
                      {this.state.error.stack && (
                        <div>
                          <strong>Stack:</strong>
                          <pre className="mt-1 p-2 bg-black/30 rounded text-xs overflow-auto max-h-32">
                            {this.state.error.stack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </motion.details>
                )}

                {/* Action buttons */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <button
                    onClick={this.handleReload}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#DA0E29] hover:bg-[#DA0E29]/90 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <RefreshCw size={16} />
                    Try Again
                  </button>

                  <button
                    onClick={this.handleGoHome}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white/90 hover:text-white rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <Home size={16} />
                    Go Home
                  </button>
                </motion.div>

                {/* Ambient glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 rounded-3xl blur-xl -z-10" />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      );
    }

    return this.props.children;
  }
}

// Specialized error boundaries for different contexts
export function EffectsErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="text-white/60 text-sm p-2 text-center">
          Effects temporarily disabled
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export function NavigationErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
          <a href="/" className="text-white/90 font-medium">
            Portfolio
          </a>
        </nav>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export function ParticleErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary fallback={null}>
      {children}
    </ErrorBoundary>
  );
}
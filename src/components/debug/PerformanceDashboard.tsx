'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Eye, Settings } from 'lucide-react';
import { usePerformanceMonitor, useAdaptiveQuality, getDeviceCapabilities, performanceBudgets } from '@/lib/performance';
import { prefersReducedMotion } from '@/lib/utils';

interface PerformanceDashboardProps {
  className?: string;
}

export function PerformanceDashboard({ className = '' }: PerformanceDashboardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const metrics = usePerformanceMonitor();
  const { quality, shouldReduceEffects } = useAdaptiveQuality();
  const [deviceCapabilities] = useState(() => getDeviceCapabilities());

  // Show only in development
  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === 'development');
  }, []);

  // Hide if reduced motion is preferred
  if (prefersReducedMotion() || !isVisible) {
    return null;
  }

  const getPerformanceColor = (fps: number) => {
    if (fps >= performanceBudgets.targetFPS) return 'text-green-400';
    if (fps >= performanceBudgets.minFPS) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getQualityColor = (q: string) => {
    switch (q) {
      case 'high': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className={`fixed z-[9999] ${className}`}
          style={{ left: position.x, top: position.y }}
          onMouseDown={(e) => {
            const startX = e.clientX - position.x;
            const startY = e.clientY - position.y;

            const handleMouseMove = (e: MouseEvent) => {
              setPosition({
                x: e.clientX - startX,
                y: e.clientY - startY,
              });
            };

            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
        >
          <div className="w-64 p-3 bg-black/90 border border-white/20 rounded-lg backdrop-blur-xl shadow-2xl cursor-move select-none">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-[#DA0E29]" />
                <span className="text-white font-medium text-sm">Performance</span>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-white/60 hover:text-white/90 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Metrics */}
            <div className="space-y-3">
              {/* FPS */}
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-xs">FPS</span>
                <span className={`font-mono text-sm ${metrics ? getPerformanceColor(metrics.fps) : 'text-gray-400'}`}>
                  {metrics?.fps || '--'}
                </span>
              </div>

              {/* Frame Time */}
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-xs">Frame Time</span>
                <span className="text-white/90 font-mono text-sm">
                  {metrics?.frameTime ? `${metrics.frameTime}ms` : '--'}
                </span>
              </div>

              {/* Memory Usage */}
              {metrics?.memoryUsage && (
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-xs">Memory</span>
                  <span className={`font-mono text-sm ${
                    metrics.memoryUsage > 80 ? 'text-red-400' :
                    metrics.memoryUsage > 60 ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {metrics.memoryUsage}%
                  </span>
                </div>
              )}

              {/* Quality Level */}
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-xs">Quality</span>
                <div className="flex items-center gap-1">
                  <Zap size={12} className={getQualityColor(quality)} />
                  <span className={`font-mono text-sm capitalize ${getQualityColor(quality)}`}>
                    {quality}
                  </span>
                </div>
              </div>

              {/* Device Capabilities */}
              <div className="pt-2 border-t border-white/10">
                <div className="text-white/70 text-xs mb-2">Device</div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-xs">Mobile</span>
                    <span className={`text-xs ${deviceCapabilities.isMobile ? 'text-yellow-400' : 'text-green-400'}`}>
                      {deviceCapabilities.isMobile ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-xs">Backdrop Filter</span>
                    <span className={`text-xs ${deviceCapabilities.supportsBackdropFilter ? 'text-green-400' : 'text-red-400'}`}>
                      {deviceCapabilities.supportsBackdropFilter ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-xs">Hover</span>
                    <span className={`text-xs ${deviceCapabilities.supportsHover ? 'text-green-400' : 'text-yellow-400'}`}>
                      {deviceCapabilities.supportsHover ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance Status */}
              <div className="pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    metrics?.isPerformant ? 'bg-green-400' : 'bg-red-400'
                  }`} />
                  <span className="text-white/70 text-xs">
                    {metrics?.isPerformant ? 'Performant' : 'Performance Issues'}
                  </span>
                </div>

                {shouldReduceEffects && (
                  <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-400">
                    Effects reduced for performance
                  </div>
                )}
              </div>

              {/* Performance Tips */}
              {metrics && !metrics.isPerformant && (
                <div className="pt-2 border-t border-white/10">
                  <div className="text-white/70 text-xs mb-1">Optimization Tips:</div>
                  <div className="text-xs text-white/60 space-y-1">
                    {metrics.fps < 30 && <div>• Consider closing other tabs</div>}
                    {metrics.memoryUsage && metrics.memoryUsage > 80 && <div>• Memory usage is high</div>}
                    {!deviceCapabilities.supportsBackdropFilter && <div>• Glassmorphism disabled</div>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Toggle button to show/hide performance dashboard
export function PerformanceToggle() {
  const [showDashboard, setShowDashboard] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== 'development' || prefersReducedMotion()) {
    return null;
  }

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setShowDashboard(!showDashboard)}
        className="fixed bottom-6 right-6 z-[9998] w-12 h-12 bg-black/80 border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-black/90 transition-all duration-300 backdrop-blur-xl"
        title="Toggle Performance Dashboard"
      >
        <Settings size={16} />
      </motion.button>

      {showDashboard && <PerformanceDashboard />}
    </>
  );
}
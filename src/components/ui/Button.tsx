'use client';

import { forwardRef, ButtonHTMLAttributes, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMagneticEffect, useGlowEffect, transitions } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass' | 'premium';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  loadingText?: string;
  magnetic?: boolean;
  magneticStrength?: number;
  glowEffect?: boolean;
  shimmerEffect?: boolean;
  hapticFeedback?: boolean;
  rippleEffect?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    loadingText,
    disabled,
    magnetic = true,
    magneticStrength = 0.15,
    glowEffect = true,
    shimmerEffect = false,
    hapticFeedback = true,
    rippleEffect = true,
    children,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    // Exclude HTML drag events that conflict with Framer Motion
    onDrag,
    onDragEnd,
    onDragEnter,
    onDragExit,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
    // Exclude HTML animation events that conflict with Framer Motion
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    onTransitionStart,
    onTransitionEnd,
    ...props
  }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isPressed, setIsPressed] = useState(false);
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

    const { x, y, handleMouseMove: magneticMouseMove, handleMouseLeave: magneticMouseLeave } = useMagneticEffect(magneticStrength);
    const { x: glowX, y: glowY, opacity: glowOpacity, updateGlow, hideGlow } = useGlowEffect();

    const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current && glowEffect) {
        updateGlow(event.nativeEvent, buttonRef.current);
      }
      onMouseEnter?.(event);
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
      magneticMouseLeave();
      hideGlow();
      onMouseLeave?.(event);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current && magnetic && !prefersReducedMotion()) {
        magneticMouseMove(event.nativeEvent, buttonRef.current);
        if (glowEffect) {
          updateGlow(event.nativeEvent, buttonRef.current);
        }
      }
      onMouseMove?.(event);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return;

      // Haptic feedback
      if (hapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate(10);
      }

      // Ripple effect
      if (rippleEffect && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const newRipple = { id: Date.now(), x, y };

        setRipples(prev => [...prev, newRipple]);

        setTimeout(() => {
          setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 600);
      }

      // Press state
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);

      onClick?.(event);
    };

    const baseClasses = [
      'relative inline-flex items-center justify-center gap-2',
      'font-medium select-none cursor-pointer',
      'border border-transparent rounded-full overflow-hidden',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA0E29] focus-visible:ring-offset-2 focus-visible:ring-offset-black',
      'disabled:pointer-events-none disabled:opacity-50',
      'transform-gpu will-change-transform',
      'transition-all duration-300 ease-out',
      'group',
    ];

    const variants = {
      primary: [
        'bg-[#DA0E29] text-white border-[#DA0E29]',
        'hover:bg-[#DA0E29]/90 hover:shadow-2xl hover:shadow-[#DA0E29]/25',
        'active:bg-[#DA0E29]/95',
      ],
      secondary: [
        'glass-layer-2 text-white/90 border-white/12',
        'hover:glass-layer-3 hover:text-white/95 hover:border-white/20',
        'active:bg-white/15',
        '[data-theme="light"] &:text-black/90 [data-theme="light"] &:border-black/12',
        '[data-theme="light"] &:hover:text-black/95 [data-theme="light"] &:hover:border-black/20',
      ],
      ghost: [
        'bg-transparent text-white/70 border-transparent',
        'hover:bg-white/8 hover:text-white/90',
        'active:bg-white/12',
        '[data-theme="light"] &:text-black/70',
        '[data-theme="light"] &:hover:bg-black/8 [data-theme="light"] &:hover:text-black/90',
      ],
      glass: [
        'glass-frosted text-white/90 border-white/10',
        'hover:glass-chromatic hover:text-white/95 hover:border-white/20',
        'active:bg-white/15',
        '[data-theme="light"] &:text-black/90 [data-theme="light"] &:border-black/10',
        '[data-theme="light"] &:hover:text-black/95 [data-theme="light"] &:hover:border-black/20',
      ],
      premium: [
        'glass-frosted noise-texture text-white/95 border-white/15',
        'hover:bg-white/12 hover:border-white/25 hover:shadow-2xl',
        'active:bg-white/15',
        'shadow-lg backdrop-blur-xl',
        '[data-theme="light"] &:text-black/95 [data-theme="light"] &:border-black/15',
      ],
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm min-h-[36px] gap-1.5',
      md: 'px-6 py-3 text-base min-h-[44px] gap-2',
      lg: 'px-8 py-4 text-lg min-h-[52px] gap-2.5',
      xl: 'px-10 py-5 text-xl min-h-[60px] gap-3',
    };

    const classes = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      loading && 'pointer-events-none',
      className
    );

    // Motion component props
    const motionProps = magnetic && !prefersReducedMotion() ? { style: { x, y } } : {};

    return (
      <motion.button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={classes}
        disabled={disabled || loading}
        whileHover={!prefersReducedMotion() ? { scale: 1.02, y: -1 } : undefined}
        whileTap={!prefersReducedMotion() ? { scale: 0.98, y: 0 } : undefined}
        transition={transitions.spring}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        {...motionProps}
        {...props}
      >
        {/* Dynamic glow background */}
        {glowEffect && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: variant === 'primary'
                ? `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.15), transparent 60%)`
                : `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.1), transparent 70%)`,
              opacity: glowOpacity,
            }}
          />
        )}

        {/* Shimmer effect */}
        {shimmerEffect && variant === 'primary' && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut'
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Ripple effects */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="absolute bg-white/30 rounded-full pointer-events-none"
              initial={{
                width: 0,
                height: 0,
                x: ripple.x,
                y: ripple.y,
                opacity: 0.6,
              }}
              animate={{
                width: 200,
                height: 200,
                x: ripple.x - 100,
                y: ripple.y - 100,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' || size === 'xl' ? 18 : 16} />
                {loadingText && <span>{loadingText}</span>}
                {!loadingText && typeof children === 'string' && <span>{children}</span>}
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </span>

        {/* Press effect overlay */}
        {isPressed && (
          <motion.div
            className="absolute inset-0 bg-white/10 rounded-full"
            initial={{ opacity: 0.6, scale: 0.95 }}
            animate={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Enhanced shadow for premium variant */}
        {variant === 'premium' && (
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-[#DA0E29]/20 via-transparent to-[#DA0E29]/20 rounded-full blur-sm -z-10"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
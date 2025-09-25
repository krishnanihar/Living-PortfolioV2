import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    children,
    ...props
  }, ref) => {
    const baseClasses = [
      // Base styles
      'inline-flex items-center justify-center gap-2',
      'font-medium transition-all duration-base',
      'border border-transparent rounded-xl',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'select-none cursor-pointer',
      // Animation
      'transform transition-transform',
      'hover:scale-[1.02] active:scale-[0.98]',
    ];

    const variants = {
      primary: [
        'bg-brand-red text-white',
        'hover:bg-red-600 hover:shadow-lg',
        'active:bg-red-700',
        'shadow-sm',
      ],
      secondary: [
        'bg-white/5 text-white border-white/10',
        'hover:bg-white/10 hover:border-white/20',
        'active:bg-white/15',
        '[data-theme="light"] &:bg-black/5 [data-theme="light"] &:text-black [data-theme="light"] &:border-black/10',
        '[data-theme="light"] &:hover:bg-black/10 [data-theme="light"] &:hover:border-black/20',
      ],
      ghost: [
        'bg-transparent text-white/80',
        'hover:bg-white/5 hover:text-white',
        'active:bg-white/10',
        '[data-theme="light"] &:text-black/80',
        '[data-theme="light"] &:hover:bg-black/5 [data-theme="light"] &:hover:text-black',
        '[data-theme="light"] &:active:bg-black/10',
      ],
      glass: [
        'glass-effect backdrop-blur-lg',
        'text-white/90 border-white/10',
        'hover:bg-white/10 hover:border-white/20 hover:text-white',
        'active:bg-white/15',
        '[data-theme="light"] &:text-black/90 [data-theme="light"] &:border-black/10',
        '[data-theme="light"] &:hover:bg-black/10 [data-theme="light"] &:hover:text-black',
      ],
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm min-h-[32px]',
      md: 'px-4 py-2 text-base min-h-[40px]',
      lg: 'px-6 py-3 text-lg min-h-[48px]',
    };

    const classes = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      loading && 'pointer-events-none',
      className
    );

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
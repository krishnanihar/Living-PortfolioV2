import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant = 'default',
    padding = 'md',
    hover = false,
    children,
    ...props
  }, ref) => {
    const baseClasses = [
      'rounded-2xl',
      'transition-all duration-base ease-premium',
      'border',
    ];

    const variants = {
      default: [
        'bg-white/4 border-white/8',
        'backdrop-blur-md',
        '[data-theme="light"] &:bg-black/4 [data-theme="light"] &:border-black/8',
      ],
      glass: [
        'glass-effect',
        'shadow-lg',
      ],
      elevated: [
        'bg-white/6 border-white/10',
        'shadow-xl backdrop-blur-lg',
        '[data-theme="light"] &:bg-white/90 [data-theme="light"] &:border-black/10',
        '[data-theme="light"] &:shadow-xl',
      ],
      bordered: [
        'bg-transparent border-white/12',
        'hover:border-white/20',
        '[data-theme="light"] &:border-black/12',
        '[data-theme="light"] &:hover:border-black/20',
      ],
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
    };

    const hoverEffects = hover ? [
      'hover:scale-[1.02]',
      'hover:shadow-2xl',
      'hover:bg-white/8 hover:border-white/12',
      '[data-theme="light"] &:hover:bg-white/95 [data-theme="light"] &:hover:border-black/15',
      'cursor-pointer',
    ] : [];

    const classes = cn(
      baseClasses,
      variants[variant],
      paddings[padding],
      hoverEffects,
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card subcomponents
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-6', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-xl font-semibold leading-none tracking-tight',
        'text-white/95',
        '[data-theme="light"] &:text-black/95',
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        'text-sm leading-relaxed',
        'text-white/70',
        '[data-theme="light"] &:text-black/70',
        className
      )}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-6', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
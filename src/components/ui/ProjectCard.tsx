'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Project, ProjectCardProps } from '@/types/projects';
import { cn } from '@/lib/utils';

export function ProjectCard({
  project,
  className,
  onClick,
  variant = 'default',
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Status badge styling
  const getStatusStyles = (status: string) => {
    const styles = {
      live: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      shipped: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      concept: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      winner: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      development: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    };
    return styles[status as keyof typeof styles] || styles.development;
  };

  // Category accent color
  const getCategoryColor = (category: string) => {
    const colors = {
      system: '#3B82F6',
      mobile: '#10B981',
      ife: '#8B5CF6',
      hackathons: '#F59E0B',
      web: '#EF4444',
      research: '#6366F1',
    };
    return colors[category as keyof typeof colors] || colors.system;
  };

  const accentColor = getCategoryColor(project.category);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      <Card
        variant="glass"
        padding="lg"
        hover
        className={cn(
          'group relative overflow-hidden cursor-pointer',
          'border-l-2 border-l-transparent transition-all duration-300',
          'hover:border-l-current hover:scale-[1.02]',
          variant === 'featured' && 'ring-2 ring-brand-red/20',
          variant === 'compact' && 'p-4'
        )}
        style={{
          '--accent-color': accentColor,
          borderLeftColor: isHovered ? accentColor : 'transparent',
        } as React.CSSProperties}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick?.(project)}
      >
        {/* Top accent line animation */}
        <div
          className={cn(
            'absolute top-0 left-0 h-0.5 transition-all duration-300',
            'bg-current opacity-0 group-hover:opacity-100',
            isHovered ? 'w-full' : 'w-0'
          )}
          style={{ backgroundColor: accentColor }}
        />

        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className={cn(
                'text-lg font-semibold mb-2 transition-colors',
                'group-hover:text-white',
                '[data-theme="light"] &:group-hover:text-black'
              )}>
                {project.title}
              </CardTitle>
              <CardDescription className={cn(
                'text-sm font-medium transition-colors',
                'text-white/60 group-hover:text-white/80',
                '[data-theme="light"] &:text-black/60 [data-theme="light"] &:group-hover:text-black/80'
              )}>
                {project.company}
              </CardDescription>
            </div>

            {/* Status Badge */}
            <div className={cn(
              'px-2 py-1 rounded-md text-xs font-semibold border',
              'shrink-0 transition-all duration-200',
              getStatusStyles(project.status)
            )}>
              {project.status === 'winner' ? 'Winner' :
               project.status === 'live' ? 'Live' :
               project.status === 'shipped' ? 'Shipped' :
               project.status === 'concept' ? 'Concept' : 'In Dev'}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <p className={cn(
            'text-sm leading-relaxed transition-colors',
            'text-white/70 group-hover:text-white/90',
            '[data-theme="light"] &:text-black/70 [data-theme="light"] &:group-hover:text-black/90'
          )}>
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag.id}
                className={cn(
                  'px-2 py-1 text-xs font-medium rounded-md',
                  'bg-white/5 border border-white/10',
                  'transition-all duration-200',
                  'group-hover:bg-white/10 group-hover:border-white/20',
                  '[data-theme="light"] &:bg-black/5 [data-theme="light"] &:border-black/10',
                  '[data-theme="light"] &:group-hover:bg-black/10 [data-theme="light"] &:group-hover:border-black/20',
                  'text-white/80 group-hover:text-white',
                  '[data-theme="light"] &:text-black/80 [data-theme="light"] &:group-hover:text-black'
                )}
              >
                {tag.label}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className={cn(
                'px-2 py-1 text-xs font-medium text-white/60',
                '[data-theme="light"] &:text-black/60'
              )}>
                +{project.tags.length - 4} more
              </span>
            )}
          </div>

          {/* Metrics */}
          {project.metrics && (
            <div className="space-y-2">
              {project.metrics.users && (
                <div className={cn(
                  'flex items-center gap-2 text-xs',
                  'text-white/60 group-hover:text-white/80',
                  '[data-theme="light"] &:text-black/60 [data-theme="light"] &:group-hover:text-black/80'
                )}>
                  <span className="text-emerald-400">👥</span>
                  <span>{project.metrics.users}</span>
                </div>
              )}
              {project.metrics.improvement && (
                <div className={cn(
                  'flex items-center gap-2 text-xs',
                  'text-white/60 group-hover:text-white/80',
                  '[data-theme="light"] &:text-black/60 [data-theme="light"] &:group-hover:text-black/80'
                )}>
                  <span className="text-blue-400">📈</span>
                  <span>{project.metrics.improvement}</span>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 [data-theme='light']:border-black/10">
            <span className={cn(
              'text-xs font-semibold',
              'text-white/50 group-hover:text-white/70',
              '[data-theme="light"] &:text-black/50 [data-theme="light"] &:group-hover:text-black/70'
            )}>
              {project.meta.year}
            </span>

            {/* Hover reveal action */}
            <div className={cn(
              'opacity-0 group-hover:opacity-100 transition-all duration-300',
              'transform translate-y-2 group-hover:translate-y-0'
            )}>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick?.(project);
                }}
              >
                View Details →
              </Button>
            </div>
          </div>
        </CardContent>

        {/* Background gradient overlay on hover */}
        <div
          className={cn(
            'absolute inset-0 opacity-0 group-hover:opacity-100',
            'transition-opacity duration-300 pointer-events-none'
          )}
          style={{
            background: `linear-gradient(to bottom right, transparent, transparent, ${accentColor}20)`
          }}
        />
      </Card>
    </motion.div>
  );
}
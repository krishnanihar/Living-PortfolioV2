'use client';

import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { WorkGridProps, Project } from '@/types/projects';
import { cn } from '@/lib/utils';

export function WorkGrid({
  projects,
  activeFilter,
  className,
}: WorkGridProps) {
  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects.sort((a, b) => (a.order || 999) - (b.order || 999));
    }
    return projects
      .filter(project => project.category === activeFilter)
      .sort((a, b) => (a.order || 999) - (b.order || 999));
  }, [projects, activeFilter]);

  // Animation variants for staggered reveal
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const handleProjectClick = (project: Project) => {
    // Check if project has case study links
    const caseStudyLink = project.links?.find(link => link.type === 'case-study');

    if (caseStudyLink) {
      // Navigate to case study page
      window.location.href = caseStudyLink.url;
      return;
    }

    // Fallback: Log project click for future modal/detail page implementation
    console.log('Project clicked:', project.title);

    // Provide user feedback for accessibility
    const announcement = `Selected project: ${project.title} at ${project.company}`;

    // Create live region for screen readers
    let liveRegion = document.getElementById('project-announcement');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'project-announcement';
      liveRegion.className = 'sr-only';
      liveRegion.setAttribute('aria-live', 'polite');
      document.body.appendChild(liveRegion);
    }
    liveRegion.textContent = announcement;
  };

  if (filteredProjects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          'text-center py-16 px-8',
          className
        )}
      >
        <div className={cn(
          'max-w-md mx-auto space-y-4',
          'text-white/70 [data-theme="light"]:text-black/70'
        )}>
          <div className="text-4xl mb-4">🔍</div>
          <h3 className={cn(
            'text-xl font-semibold mb-2',
            'text-white/90 [data-theme="light"]:text-black/90'
          )}>
            No projects found
          </h3>
          <p className="text-sm leading-relaxed">
            Try selecting a different category filter to see more projects.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        'w-full max-w-7xl mx-auto px-6 py-8',
        className
      )}
    >
      {/* Results count */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'mb-8 text-center',
          'text-white/60 [data-theme="light"]:text-black/60'
        )}
      >
        <span className="text-sm font-medium">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          {activeFilter !== 'all' && (
            <> in{' '}
              <span className="capitalize font-semibold text-white/80 [data-theme='light']:text-black/80">
                {activeFilter}
              </span>
            </>
          )}
        </span>
      </motion.div>

      {/* Projects grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          'grid gap-6',
          // Responsive grid - mobile first
          'grid-cols-1',
          // Tablet
          'md:grid-cols-2',
          // Desktop
          'lg:grid-cols-2 xl:grid-cols-3',
          // Large screens
          '2xl:grid-cols-3'
        )}
        role="grid"
        aria-label={`${filteredProjects.length} projects ${activeFilter !== 'all' ? `in ${activeFilter} category` : ''}`}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
              layoutId={project.id}
              role="gridcell"
              aria-rowindex={Math.floor(index / 3) + 1}
              aria-colindex={(index % 3) + 1}
            >
              <ProjectCard
                project={project}
                onClick={handleProjectClick}
                variant={project.featured ? 'featured' : 'default'}
                className="h-full"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load more button (for future pagination) */}
      {filteredProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className={cn(
            'text-xs font-medium',
            'text-white/40 [data-theme="light"]:text-black/40'
          )}>
            Showing all available projects
          </div>
        </motion.div>
      )}

      {/* Screen reader live region */}
      <div
        id="grid-live-region"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {`Showing ${filteredProjects.length} projects ${activeFilter !== 'all' ? `in ${activeFilter} category` : ''}`}
      </div>
    </div>
  );
}

// Helper component for responsive grid debugging (dev only)
export function GridDebugger() {
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white p-2 rounded text-xs font-mono">
      <div className="block sm:hidden">XS</div>
      <div className="hidden sm:block md:hidden">SM</div>
      <div className="hidden md:block lg:hidden">MD</div>
      <div className="hidden lg:block xl:hidden">LG</div>
      <div className="hidden xl:block 2xl:hidden">XL</div>
      <div className="hidden 2xl:block">2XL</div>
    </div>
  );
}
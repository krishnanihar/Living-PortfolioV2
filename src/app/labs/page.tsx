'use client';

import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { labExperiments } from '@/data/labs-experiments';
import { ExternalLink } from 'lucide-react';

export default function LabsPage() {
  return (
    <>
      <PortfolioNavigation />

      <main className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-8xl font-extralight mb-6 text-[var(--text-primary)]">
              Nihar Labs
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light">
              {labExperiments.length} rapid experiments in AI, mobility, and new media.
            </p>
          </div>

          {/* Simple Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {labExperiments.map((exp) => {
              const link = exp.links.demo || exp.links.repo || exp.links.figma || '#';

              return (
                <a
                  key={exp.id}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-8 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06]
                             border border-white/[0.08] hover:border-white/[0.15]
                             transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-2xl font-light mb-3 text-[var(--text-primary)]
                                 group-hover:text-[var(--brand-red)] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-4 line-clamp-2 leading-relaxed">
                    {exp.oneLiner}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 rounded bg-white/[0.05] text-[var(--text-tertiary)]">
                      {exp.status}
                    </span>
                    <span className="px-2 py-1 rounded bg-white/[0.05] text-[var(--text-tertiary)]">
                      TRL {exp.trl}
                    </span>
                    <ExternalLink
                      size={14}
                      className="ml-auto text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </a>
              );
            })}
          </div>

        </div>
      </main>
    </>
  );
}

'use client';

import { ScrollytellingSection } from './ScrollytellingSection';
import { Icons } from './mythos-Icons';

interface ProcessStep {
  number: number;
  title: string;
  icon: keyof typeof Icons;
  description: string;
  example?: string | string[];
}

interface ProcessDiagramProps {
  steps: ProcessStep[];
}

export const ProcessDiagram = ({ steps }: ProcessDiagramProps) => {
  return (
    <div className="relative max-w-4xl mx-auto">
      {steps.map((step, index) => {
        const IconComponent = Icons[step.icon];
        const isLast = index === steps.length - 1;

        return (
          <div key={step.number} className="relative">
            <ScrollytellingSection
              animationType="fade-up"
              delay={index * 150}
              threshold={0.3}
            >
              <div className="relative">
                {/* Connecting line */}
                {!isLast && (
                  <div className="absolute left-8 top-24 w-0.5 h-16 bg-gradient-to-b from-[#DA0E29]/30 to-transparent" />
                )}

                {/* Step card */}
                <div className="relative bg-white/[.04] backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/[.06] transition-all duration-300">
                  {/* Number badge */}
                  <div className="absolute -left-4 -top-4 w-12 h-12 bg-[#DA0E29] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#DA0E29]/50">
                    {step.number}
                  </div>

                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-[#E0D8C8]">
                      <IconComponent className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed mb-4">
                        {step.description}
                      </p>

                      {/* Example */}
                      {step.example && (
                        <div className="bg-black/30 border border-white/5 rounded-lg p-4">
                          {Array.isArray(step.example) ? (
                            <ul className="space-y-1.5 text-sm text-white/60 font-mono">
                              {step.example.map((line, i) => (
                                <li key={i}>{line}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-white/60 font-mono">
                              {step.example}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollytellingSection>

            {/* Spacer between steps */}
            {!isLast && <div className="h-8" />}
          </div>
        );
      })}
    </div>
  );
};

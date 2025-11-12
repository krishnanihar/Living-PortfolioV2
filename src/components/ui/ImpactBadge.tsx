'use client';

import { Trophy, Zap, Beaker, DollarSign, CheckCircle } from 'lucide-react';
import { ProjectStatus } from '@/types/projects';

export interface ImpactBadgeProps {
  status: ProjectStatus;
  impactType?: 'winner' | 'revenue' | 'research' | 'production' | 'live';
  customLabel?: string;
  className?: string;
}

export function ImpactBadge({ status, impactType, customLabel, className }: ImpactBadgeProps) {
  const getImpactConfig = () => {
    // Determine impact type from status if not explicitly provided
    const type = impactType || getImpactTypeFromStatus(status);

    switch (type) {
      case 'winner':
        return {
          icon: Trophy,
          label: customLabel || 'Winner',
          gradient: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 140, 0, 0.1) 100%)',
          border: 'rgba(255, 215, 0, 0.3)',
          glow: '0 0 20px rgba(255, 215, 0, 0.2)',
          color: 'rgba(255, 215, 0, 0.9)',
        };
      case 'revenue':
        return {
          icon: DollarSign,
          label: customLabel || 'Revenue Generating',
          gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.1) 100%)',
          border: 'rgba(34, 197, 94, 0.3)',
          glow: '0 0 20px rgba(34, 197, 94, 0.2)',
          color: 'rgba(34, 197, 94, 0.9)',
        };
      case 'research':
        return {
          icon: Beaker,
          label: customLabel || 'Research Validated',
          gradient: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(126, 34, 206, 0.1) 100%)',
          border: 'rgba(147, 51, 234, 0.3)',
          glow: '0 0 20px rgba(147, 51, 234, 0.2)',
          color: 'rgba(147, 51, 234, 0.9)',
        };
      case 'production':
      case 'live':
      default:
        return {
          icon: Zap,
          label: customLabel || 'Live',
          gradient: 'linear-gradient(135deg, rgba(218, 14, 41, 0.2) 0%, rgba(185, 12, 35, 0.1) 100%)',
          border: 'rgba(218, 14, 41, 0.3)',
          glow: '0 0 20px rgba(218, 14, 41, 0.2)',
          color: 'rgba(218, 14, 41, 0.9)',
        };
    }
  };

  const config = getImpactConfig();
  const Icon = config.icon;

  return (
    <div
      className={className || ''}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.375rem 0.75rem',
        background: config.gradient,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${config.border}`,
        borderRadius: '8px',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: config.color,
        boxShadow: config.glow,
        transition: 'all 0.3s ease',
      }}
    >
      <Icon size={14} strokeWidth={2.5} />
      <span>{config.label}</span>
    </div>
  );
}

function getImpactTypeFromStatus(status: ProjectStatus): 'winner' | 'revenue' | 'research' | 'production' | 'live' {
  switch (status) {
    case 'winner':
      return 'winner';
    case 'live':
    case 'shipped':
      return 'live';
    case 'concept':
      return 'research';
    case 'development':
    default:
      return 'production';
  }
}

'use client';

interface HealthcareResearchIconProps {
  size?: number;
  className?: string;
}

export function HealthcareResearchIcon({
  size = 24,
  className = ''
}: HealthcareResearchIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ display: 'inline-block' }}
    >
      {/* ECG/Pulse line */}
      <path
        d="M2 12h3l2-4 2 8 2-4 2 0"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Brain/neural pattern */}
      <path
        d="M14 8c1.5 0 2.5 1 2.5 2.5c0 0.8-0.3 1.5-0.8 2 0.5 0.3 0.8 0.9 0.8 1.5 0 1.5-1 2.5-2.5 2.5s-2.5-1-2.5-2.5c0-0.6 0.3-1.2 0.8-1.5-0.5-0.5-0.8-1.2-0.8-2 0-1.5 1-2.5 2.5-2.5z"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.5}
      />

      {/* Medical cross circle */}
      <circle
        cx="19"
        cy="7"
        r="2.5"
        stroke="currentColor"
        strokeWidth={1.3}
        fill="none"
      />

      {/* Medical cross badge */}
      <path
        d="M19 6v2M18 7h2"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
      />
    </svg>
  );
}

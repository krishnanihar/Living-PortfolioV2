'use client';

interface SectionDividerProps {
  text?: string;
}

export function SectionDivider({ text }: SectionDividerProps) {
  return (
    <div style={{
      position: 'relative',
      padding: '4rem 1.5rem 2rem',
      background: 'var(--bg-primary)',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        {text && (
          <p style={{
            fontSize: '0.875rem',
            fontWeight: '300',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            opacity: 0.5,
          }}>
            {text}
          </p>
        )}

        {/* Horizontal line with glow */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
          boxShadow: '0 0 20px rgba(218, 14, 41, 0.1)',
        }} />
      </div>
    </div>
  );
}

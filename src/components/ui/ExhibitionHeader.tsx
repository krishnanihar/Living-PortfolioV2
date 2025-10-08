'use client';

import { Sparkles, Key, Heart, Calendar, Wand, Video, Eye } from 'lucide-react';

interface Exhibition {
  title: string;
  subtitle: string;
  statement: string;
  criteria: {
    motifs: string[];
    centuries: number[];
    mood: string;
    themes: string[];
  };
  reasoning: string;
}

interface ExhibitionHeaderProps {
  exhibition: Exhibition;
  onEnterImmersive: () => void;
  onClearExhibition: () => void;
  onCreateCapstone: () => void;
  isGeneratingCapstone: boolean;
  onGenerateDream: () => void;
  isGeneratingDream: boolean;
}

interface CriteriaItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | string[];
}

function CriteriaItem({ icon, label, value }: CriteriaItemProps) {
  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        color: 'var(--text-tertiary)',
        marginBottom: '0.25rem',
      }}>
        {icon}
        <span>{label}</span>
      </div>
      <p style={{
        fontWeight: '500',
        color: 'var(--text-secondary)',
      }}>
        {Array.isArray(value) ? value.join(', ') : value}
      </p>
    </div>
  );
}

interface ActionButtonProps {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function ActionButton({ onClick, disabled, icon, children }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '0.5rem 1.25rem',
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#FFFFFF',
        backgroundColor: 'var(--brand-red)',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        transition: 'background-color 0.2s',
        opacity: disabled ? 0.5 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = '#B80C23';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--brand-red)';
      }}
    >
      {disabled ? (
        <svg style={{ animation: 'spin 1s linear infinite', width: '1.25rem', height: '1.25rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon}
      <span>{children}</span>
    </button>
  );
}

export function ExhibitionHeader({
  exhibition,
  onEnterImmersive,
  onClearExhibition,
  onCreateCapstone,
  isGeneratingCapstone,
  onGenerateDream,
  isGeneratingDream,
}: ExhibitionHeaderProps) {
  const { title, subtitle, statement, criteria, reasoning } = exhibition;
  const isCreativeActionDisabled = isGeneratingCapstone || isGeneratingDream;

  return (
    <div style={{
      marginBottom: '3rem',
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
      backdropFilter: 'blur(24px)',
      border: '1px solid var(--border-secondary)',
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      overflow: 'hidden',
      animationDuration: '0.6s',
    }}
    className="animate-fade-in-up">
      <div style={{ padding: 'clamp(2rem, 5vw, 3rem)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(2rem, 5vw, 3rem)',
        }}>
          <div style={{ gridColumn: 'span 2' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
            }}>
              {title}
            </h2>
            <p style={{
              marginTop: '0.5rem',
              fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              fontStyle: 'italic',
            }}>
              {subtitle}
            </p>
            <p style={{
              marginTop: '1.5rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
            }}>
              {statement}
            </p>
            <p style={{
              marginTop: '1rem',
              fontSize: '0.875rem',
              color: 'var(--text-tertiary)',
              fontStyle: 'italic',
              borderLeft: '2px solid var(--border-secondary)',
              paddingLeft: '1rem',
            }}>
              {reasoning}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#FFFFFF',
              borderBottom: '1px solid var(--border-secondary)',
              paddingBottom: '0.5rem',
            }}>
              Mythos's Criteria
            </h3>
            <CriteriaItem
              icon={<Sparkles size={16} />}
              label="Motifs"
              value={criteria.motifs}
            />
            <CriteriaItem
              icon={<Key size={16} />}
              label="Themes"
              value={criteria.themes}
            />
            <CriteriaItem
              icon={<Heart size={16} />}
              label="Mood"
              value={criteria.mood}
            />
            <CriteriaItem
              icon={<Calendar size={16} />}
              label="Centuries"
              value={criteria.centuries.map(c => `${c}th`).join(', ')}
            />
          </div>
        </div>
      </div>
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '1rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <ActionButton
            onClick={onCreateCapstone}
            disabled={isCreativeActionDisabled}
            icon={<Wand size={20} />}
          >
            {isGeneratingCapstone ? "Creating..." : "Create a Capstone"}
          </ActionButton>
          <ActionButton
            onClick={onGenerateDream}
            disabled={isCreativeActionDisabled}
            icon={<Video size={20} />}
          >
            {isGeneratingDream ? "Dreaming..." : "Witness the Dream"}
          </ActionButton>
          <button
            onClick={onEnterImmersive}
            disabled={isCreativeActionDisabled}
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#FFFFFF',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: 'none',
              borderRadius: '4px',
              cursor: isCreativeActionDisabled ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background-color 0.2s',
              opacity: isCreativeActionDisabled ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isCreativeActionDisabled) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            }}
          >
            <Eye size={20} /> Enter Immersive Gallery
          </button>
        </div>
        <button
          onClick={onClearExhibition}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'var(--text-secondary)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            alignSelf: 'flex-start',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          }}
        >
          Clear Vision
        </button>
      </div>
    </div>
  );
}

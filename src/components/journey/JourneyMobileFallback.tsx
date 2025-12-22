'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCards } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { timelineMilestones, TimelineMilestone } from '@/data/timeline';
import { ChevronDown, ExternalLink } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

/**
 * Mobile Milestone Card
 */
function MobileCard({ milestone }: { milestone: TimelineMilestone }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        background: 'var(--glass-06)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        borderRadius: '24px',
        border: `1px solid ${milestone.brandColor}30`,
        overflow: 'hidden',
        boxShadow: `0 0 40px ${milestone.brandColor}15, 0 20px 40px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Cover */}
      <div
        style={{
          height: '140px',
          background: milestone.coverGradient
            ? `linear-gradient(135deg, ${milestone.coverGradient[0]}, ${milestone.coverGradient[1]})`
            : `linear-gradient(135deg, ${milestone.brandColor}, ${milestone.brandColor}cc)`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Year */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            padding: '5px 12px',
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            color: 'white',
          }}
        >
          {milestone.year}
        </div>

        {/* Logo/Icon */}
        {milestone.logoFile ? (
          <img
            src={`/logos/${milestone.logoFile}`}
            alt={milestone.organization || milestone.title}
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'contain',
              filter: 'brightness(0) invert(1)',
            }}
          />
        ) : (
          <div
            style={{
              width: '50px',
              height: '50px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
            }}
          >
            {milestone.icon === 'Sparkles' && '✨'}
            {milestone.icon === 'Code2' && '💻'}
            {milestone.icon === 'GraduationCap' && '🎓'}
            {milestone.icon === 'Briefcase' && '💼'}
            {milestone.icon === 'Brain' && '🧠'}
            {milestone.icon === 'Palette' && '🎨'}
            {milestone.icon === 'Zap' && '⚡'}
            {milestone.icon === 'MessageSquarePlus' && '💬'}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <h3
          style={{
            margin: '0 0 4px 0',
            fontSize: '20px',
            fontWeight: '600',
            color: 'var(--text-95)',
            fontFamily: 'var(--font-space-grotesk)',
          }}
        >
          {milestone.title}
        </h3>

        <p
          style={{
            margin: '0 0 12px 0',
            fontSize: '13px',
            color: 'var(--text-50)',
          }}
        >
          {milestone.subtitle}
        </p>

        {/* Hook */}
        {milestone.hook && (
          <p
            style={{
              margin: '0 0 16px 0',
              fontSize: '14px',
              color: milestone.brandColor,
              fontStyle: 'italic',
              lineHeight: 1.5,
            }}
          >
            {milestone.hook}
          </p>
        )}

        {/* Expandable content */}
        <div
          style={{
            maxHeight: isExpanded ? '500px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.4s ease',
          }}
        >
          <p
            style={{
              margin: '0 0 16px 0',
              fontSize: '14px',
              color: 'var(--text-70)',
              lineHeight: 1.6,
            }}
          >
            {milestone.description}
          </p>

          {/* Lesson */}
          {milestone.lesson && (
            <div
              style={{
                padding: '12px 16px',
                background: `${milestone.brandColor}15`,
                borderLeft: `3px solid ${milestone.brandColor}`,
                borderRadius: '0 10px 10px 0',
                marginBottom: '16px',
                fontSize: '13px',
                color: 'var(--text-80)',
                fontStyle: 'italic',
              }}
            >
              {milestone.lesson}
            </div>
          )}

          {/* Related work */}
          {milestone.relatedWork && (
            <a
              href={milestone.relatedWork}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                background: milestone.brandColor,
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              View Case Study
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginTop: '16px',
            marginBottom: '12px',
          }}
        >
          {milestone.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: '500',
                color: 'var(--text-60)',
                background: 'var(--glass-10)',
                borderRadius: '6px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            width: '100%',
            padding: '12px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '12px',
            color: 'var(--text-50)',
            marginTop: '8px',
          }}
        >
          {isExpanded ? 'Show less' : 'Read more'}
          <ChevronDown
            size={16}
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          />
        </button>
      </div>
    </div>
  );
}

/**
 * Journey Mobile Fallback
 * Swiper carousel for mobile devices
 */
export default function JourneyMobileFallback() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        paddingTop: '100px',
        paddingBottom: '60px',
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '40px',
          padding: '0 24px',
        }}
      >
        <h1
          style={{
            margin: '0 0 12px 0',
            fontSize: '32px',
            fontWeight: '600',
            color: 'var(--text-95)',
            fontFamily: 'var(--font-space-grotesk)',
          }}
        >
          My Journey
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: '15px',
            color: 'var(--text-50)',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          Swipe through the milestones
        </p>
      </div>

      {/* Progress indicator */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '24px',
        }}
      >
        {timelineMilestones.map((milestone, index) => (
          <button
            key={milestone.id}
            onClick={() => swiperRef.current?.slideTo(index)}
            style={{
              width: index === activeIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background:
                index === activeIndex ? milestone.brandColor : 'var(--glass-20)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Swiper */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        modules={[Pagination, EffectCards]}
        effect="cards"
        grabCursor
        centeredSlides
        slidesPerView={1}
        cardsEffect={{
          perSlideOffset: 8,
          perSlideRotate: 2,
          rotate: true,
          slideShadows: false,
        }}
        style={{
          padding: '20px',
          paddingBottom: '40px',
        }}
      >
        {timelineMilestones.map((milestone) => (
          <SwiperSlide
            key={milestone.id}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div style={{ maxWidth: '340px', width: '100%' }}>
              <MobileCard milestone={milestone} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Current milestone year */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        <span
          style={{
            padding: '8px 16px',
            background: 'var(--glass-08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '600',
            color: timelineMilestones[activeIndex]?.brandColor,
            fontFamily: 'var(--font-space-grotesk)',
          }}
        >
          {timelineMilestones[activeIndex]?.year}
        </span>
      </div>
    </div>
  );
}

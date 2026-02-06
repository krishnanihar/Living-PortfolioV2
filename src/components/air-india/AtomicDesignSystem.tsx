'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// =============================================================================
// TYPES & CONSTANTS
// =============================================================================

type Category = 'atoms' | 'molecules' | 'organisms' | 'templates' | 'pages';

interface AtomicDesignSystemProps {
  brandColor?: string;
}

const BRAND_RED = '#DA0E29';

const categories: { id: Category; label: string }[] = [
  { id: 'atoms', label: 'Atoms' },
  { id: 'molecules', label: 'Molecules' },
  { id: 'organisms', label: 'Organisms' },
  { id: 'templates', label: 'Templates' },
  { id: 'pages', label: 'Pages' },
];

// =============================================================================
// SIDEBAR ICONS (SVG)
// =============================================================================

function CategoryIcon({ category, isActive }: { category: Category; isActive: boolean }) {
  const color = isActive ? BRAND_RED : 'rgba(218, 14, 41, 0.35)';

  switch (category) {
    case 'atoms':
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="10" stroke={color} strokeWidth="2" />
          <circle cx="18" cy="18" r="4" fill={color} />
        </svg>
      );
    case 'molecules':
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="10" r="5" fill={color} />
          <circle cx="11" cy="24" r="4" fill={color} opacity={0.6} />
          <circle cx="25" cy="24" r="4" fill={color} opacity={0.6} />
          <line x1="16" y1="14" x2="12" y2="20" stroke={color} strokeWidth="1.5" />
          <line x1="20" y1="14" x2="24" y2="20" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case 'organisms':
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          {[0, 1, 2].map(row =>
            [0, 1, 2].map(col => (
              <circle
                key={`${row}-${col}`}
                cx={10 + col * 8}
                cy={10 + row * 8}
                r="3"
                fill={color}
                opacity={row === 1 && col === 1 ? 1 : 0.7}
              />
            ))
          )}
        </svg>
      );
    case 'templates':
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="6" y="8" width="10" height="8" rx="1" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
          <rect x="20" y="8" width="10" height="8" rx="1" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
          <rect x="6" y="20" width="24" height="8" rx="1" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
      );
    case 'pages':
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="8" y="4" width="20" height="28" rx="2" stroke={color} strokeWidth="1.5" />
          <line x1="12" y1="10" x2="24" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="15" x2="20" y2="15" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />
          <line x1="12" y1="20" x2="22" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={0.4} />
          <rect x="12" y="24" width="12" height="4" rx="1" fill={color} opacity={0.3} />
        </svg>
      );
  }
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function AtomicDesignSystem({ brandColor = '218, 14, 41' }: AtomicDesignSystemProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('atoms');
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('things');
  const [hoveredCard, setHoveredCard] = useState(false);
  const [copiedColor, setCopiedColor] = useState(false);
  const [hoveredTextStyle, setHoveredTextStyle] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(false);

  // Scroll-triggered auto-advance: cycle through all categories to hint interactivity
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const hasAutoAdvanced = useRef(false);
  const autoAdvanceTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!isInView || hasAutoAdvanced.current) return;
    hasAutoAdvanced.current = true;

    const sequence: { category: Category; delay: number }[] = [
      { category: 'molecules', delay: 1800 },
      { category: 'organisms', delay: 3800 },
      { category: 'templates', delay: 5800 },
      { category: 'pages', delay: 7800 },
    ];

    sequence.forEach(({ category, delay }) => {
      const timer = setTimeout(() => setActiveCategory(category), delay);
      autoAdvanceTimers.current.push(timer);
    });

    return () => autoAdvanceTimers.current.forEach(clearTimeout);
  }, [isInView]);

  const handleCopyColor = useCallback(() => {
    setCopiedColor(true);
    setTimeout(() => setCopiedColor(false), 1500);
  }, []);

  // ---------------------------------------------------------------------------
  // ATOMS
  // ---------------------------------------------------------------------------
  const renderAtoms = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: 'clamp(16px, 3vw, 32px)', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      {/* Text Style */}
      <div
        onMouseEnter={() => setHoveredTextStyle(true)}
        onMouseLeave={() => setHoveredTextStyle(false)}
        style={{ cursor: 'default' }}
      >
        <div style={{ fontSize: '13px', color: '#999', marginBottom: '8px', fontWeight: 400, transition: 'color 0.2s' }}>
          Text Style: Subheading- L
        </div>
        <motion.div
          animate={{ scale: hoveredTextStyle ? 1.01 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.4 }}
        >
          The quick brown fox jumps over the lazy dog, showcasing its agility and playfulness.
        </motion.div>
      </div>

      {/* Icon & Color row */}
      <div style={{ display: 'flex', gap: 'clamp(24px, 5vw, 64px)', alignItems: 'flex-start' }}>
        {/* Icon */}
        <div>
          <div style={{ fontSize: '13px', color: '#999', marginBottom: '12px' }}>Icon</div>
          <motion.div
            whileHover={{ scale: 1.08, boxShadow: '0 4px 16px rgba(218,14,41,0.15)' }}
            whileTap={{ scale: 0.92, rotate: 90 }}
            onMouseEnter={() => setHoveredIcon(true)}
            onMouseLeave={() => setHoveredIcon(false)}
            style={{
              width: '64px',
              height: '64px',
              background: hoveredIcon ? 'rgba(218,14,41,0.04)' : '#F5F5F5',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              transition: 'background 0.2s',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke={BRAND_RED} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>

        {/* Color */}
        <div>
          <div style={{ fontSize: '13px', color: '#999', marginBottom: '12px' }}>Color</div>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleCopyColor}
            style={{
              width: '120px',
              height: '64px',
              background: BRAND_RED,
              borderRadius: '8px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(218,14,41,0.25)',
            }}
          >
            <AnimatePresence>
              {copiedColor && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.35)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 600,
                    fontFamily: 'SF Mono, Monaco, Consolas, monospace',
                  }}
                >
                  #DA0E29
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );

  // ---------------------------------------------------------------------------
  // MOLECULES
  // ---------------------------------------------------------------------------
  const renderMolecules = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: 'clamp(16px, 3vw, 32px)', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      {/* Title Wrapper */}
      <div>
        <div style={{ fontSize: '13px', color: '#999', marginBottom: '8px' }}>Title Wrapper</div>
        <div style={{ fontSize: 'clamp(18px, 2.2vw, 22px)', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', lineHeight: 1.3 }}>
          The quick brown fox jumps over the lazy dog
        </div>
        <div style={{ fontSize: 'clamp(12px, 1.4vw, 14px)', color: '#666', lineHeight: 1.6 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor ultricies volutpat. Vestibulum volutpat consequat
        </div>
      </div>

      {/* Buttons */}
      <div>
        <div style={{ fontSize: '13px', color: '#999', marginBottom: '16px' }}>Buttons</div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Filled */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onMouseEnter={() => setHoveredButton('filled')}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              padding: '12px 24px',
              background: hoveredButton === 'filled' ? '#B80C22' : BRAND_RED,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.2s',
            }}
          >
            Learn More
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 3v8M3 7h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.button>

          {/* Outlined */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onMouseEnter={() => setHoveredButton('outlined')}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              padding: '12px 24px',
              background: hoveredButton === 'outlined' ? 'rgba(218,14,41,0.05)' : 'transparent',
              color: BRAND_RED,
              border: `2px solid ${BRAND_RED}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.2s',
            }}
          >
            Learn More
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 3v8M3 7h8" stroke={BRAND_RED} strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.button>

          {/* Text link */}
          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.96 }}
            onMouseEnter={() => setHoveredButton('text')}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              padding: '12px 0',
              background: 'transparent',
              color: BRAND_RED,
              border: 'none',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Learn More
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke={BRAND_RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );

  // ---------------------------------------------------------------------------
  // ORGANISMS
  // ---------------------------------------------------------------------------
  const renderOrganisms = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: 'clamp(16px, 3vw, 32px)', height: '100%' }}>
      <div style={{ fontSize: '13px', color: '#999', whiteSpace: 'nowrap' }}>Card UI</div>

      <motion.div
        onMouseEnter={() => setHoveredCard(true)}
        onMouseLeave={() => setHoveredCard(false)}
        animate={{ y: hoveredCard ? -6 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          width: 'clamp(220px, 30vw, 280px)',
          background: 'white',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: hoveredCard
            ? '0 16px 48px rgba(0,0,0,0.16)'
            : '0 4px 16px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.3s',
          flexShrink: 0,
        }}
      >
        {/* Image placeholder - Red Fort */}
        <div style={{
          height: '160px',
          background: 'linear-gradient(135deg, #D4856A 0%, #C9704F 30%, #B85C3D 60%, #A04830 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Sky wash */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: 'linear-gradient(180deg, rgba(135,180,220,0.5) 0%, transparent 100%)',
          }} />
          {/* Fort silhouette */}
          <svg
            viewBox="0 0 280 100"
            style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', opacity: 0.4 }}
            preserveAspectRatio="xMidYMax meet"
          >
            <path d="M0 100 L0 55 L20 55 L20 40 L25 35 L30 40 L30 55 L50 55 L50 40 L55 35 L60 40 L60 55 L80 55 L80 40 L85 35 L90 40 L90 55 L100 55 L100 30 L140 25 L180 30 L180 55 L190 55 L190 40 L195 35 L200 40 L200 55 L220 55 L220 40 L225 35 L230 40 L230 55 L250 55 L250 40 L255 35 L260 40 L260 55 L280 55 L280 100Z" fill="rgba(120,60,30,0.5)" />
          </svg>
        </div>

        {/* Content */}
        <div style={{ padding: '16px' }}>
          <div style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#1a1a1a',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '8px',
          }}>
            RED FORT AND LAL QILA
          </div>
          <div style={{
            fontSize: '11px',
            color: '#666',
            lineHeight: 1.6,
            marginBottom: '16px',
          }}>
            Step into the pages of history at Red Fort, Delhi. Marvel at the majestic Mughal architecture, soak in the rich culture, and witness the grandeur of India&apos;s glorious past. A must-visit for every history enthusiast!&quot;
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            style={{
              padding: '10px 20px',
              background: BRAND_RED,
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Buy Tickets
          </motion.button>
        </div>
      </motion.div>
    </div>
  );

  // ---------------------------------------------------------------------------
  // TEMPLATES
  // ---------------------------------------------------------------------------
  const carouselCards = [
    { id: 1, title: 'RED FORT AND LAL QILA', gradient: 'linear-gradient(135deg, #D4856A, #A04830)' },
    { id: 2, title: 'TAJ MAHAL', gradient: 'linear-gradient(135deg, #E8D5B7, #C9A96E)' },
    { id: 3, title: 'GATEWAY OF INDIA', gradient: 'linear-gradient(135deg, #87CEEB, #4682B4)' },
    { id: 4, title: 'HAWA MAHAL', gradient: 'linear-gradient(135deg, #F4A460, #CD853F)' },
    { id: 5, title: 'MEENAKSHI TEMPLE', gradient: 'linear-gradient(135deg, #98D8C8, #2E8B57)' },
  ];

  const cardDescription = 'Step into the pages of history at Red Fort, Delhi. Marvel at themajestic Mughal architecture, soak in the rich culture, and witnessthe grandeur of India\'s glorious past. A must-visit for everyhistory enthusiast!"';

  const renderTemplates = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: 'clamp(16px, 3vw, 32px)', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ fontSize: '13px', color: '#999', alignSelf: 'flex-start' }}>Card Carousel</div>

      {/* Carousel */}
      <div style={{ overflow: 'hidden', position: 'relative', width: '100%', alignSelf: 'stretch' }}>
        <motion.div
          animate={{ x: -carouselIndex * 220 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ display: 'flex', gap: '14px' }}
        >
          {carouselCards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -3 }}
              style={{
                width: '206px',
                flexShrink: 0,
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              }}
            >
              <div style={{ height: '110px', background: card.gradient }} />
              <div style={{ padding: '12px' }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#1a1a1a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '6px',
                }}>
                  {card.title}
                </div>
                <div style={{ fontSize: '10px', color: '#666', lineHeight: 1.5, marginBottom: '10px' }}>
                  {cardDescription}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.93 }}
                  style={{
                    padding: '7px 14px',
                    background: card.id % 2 === 0 ? 'transparent' : BRAND_RED,
                    color: card.id % 2 === 0 ? BRAND_RED : 'white',
                    border: card.id % 2 === 0 ? `1.5px solid ${BRAND_RED}` : 'none',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Buy Tickets
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Carousel indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          fontSize: '10px',
          fontWeight: 600,
          color: '#555',
          background: '#E0E0E0',
          padding: '2px 8px',
          borderRadius: '10px',
        }}>
          {carouselIndex + 1}/{carouselCards.length}
        </span>
        <div style={{ display: 'flex', gap: '5px' }}>
          {carouselCards.map((_, i) => (
            <motion.div
              key={i}
              onClick={() => setCarouselIndex(i)}
              whileHover={{ scale: 1.4 }}
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: i === carouselIndex ? '#555' : '#CDCDCD',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: '13px', color: '#aaa', marginLeft: '8px' }}>Carousel Indicator</span>
      </div>
    </div>
  );

  // ---------------------------------------------------------------------------
  // PAGES
  // ---------------------------------------------------------------------------
  const renderPages = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: 'clamp(16px, 3vw, 32px)', height: '100%' }}>
      {/* Phone mockup */}
      <div style={{
          width: '220px',
          height: '400px',
          borderRadius: '24px',
          overflow: 'hidden',
          border: `3px solid ${BRAND_RED}`,
          background: 'white',
          flexShrink: 0,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Status bar */}
          <div style={{
            height: '24px',
            background: 'linear-gradient(180deg, #4A90D9, #3A7BD5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            fontSize: '9px',
            fontWeight: 600,
            color: 'white',
            flexShrink: 0,
          }}>
            <span>9:41</span>
            <div style={{ display: 'flex', gap: '3px', alignItems: 'center', fontSize: '8px' }}>
              <span>&#9632;&#9632;&#9632;&#9632;</span>
              <svg width="14" height="8" viewBox="0 0 14 8" fill="white">
                <rect x="0" y="0" width="11" height="7" rx="1" stroke="white" strokeWidth="0.8" fill="none" />
                <rect x="1.5" y="1.5" width="8" height="4" rx="0.5" fill="white" />
                <rect x="11.5" y="2" width="1.5" height="3" rx="0.5" fill="white" />
              </svg>
            </div>
          </div>

          {/* Nav bar */}
          <div style={{
            height: '28px',
            background: 'linear-gradient(180deg, #3A7BD5, #2E6BBF)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px',
            gap: '6px',
            flexShrink: 0,
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M7 1.5L3 5l4 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'white' }}>Dubai</span>
          </div>

          {/* Scrollable content */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}>
            {/* Hero image - Burj Al Arab gradient */}
            <div style={{
              height: '110px',
              background: 'linear-gradient(180deg, #1A4F7A 0%, #2E7DA8 35%, #4AA3C7 65%, #7BC0DB 100%)',
              position: 'relative',
            }}>
              <svg viewBox="0 0 260 130" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMax meet">
                <path d="M155 130 L155 50 Q165 20 175 50 L175 130" fill="rgba(255,255,255,0.15)" />
                <rect x="0" y="110" width="260" height="20" fill="rgba(255,255,255,0.08)" />
              </svg>
            </div>

            <div style={{ padding: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: BRAND_RED, marginBottom: '4px' }}>
                A Dubai Masala Adventure
              </div>
              <div style={{ fontSize: '8px', color: '#666', lineHeight: 1.5, marginBottom: '8px' }}>
                Dubai, a city in the United Arab Emirates, known for luxury shopping, ultramodern architecture and a lively nightlife scene.
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid #E0E0E0', marginBottom: '8px' }}>
                {[
                  { id: 'things', label: 'Things to do' },
                  { id: 'food', label: 'Food to Eat' },
                  { id: 'shopping', label: 'Shopping' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: '5px 6px',
                      fontSize: '8px',
                      fontWeight: activeTab === tab.id ? 600 : 400,
                      color: activeTab === tab.id ? '#1a1a1a' : '#999',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: activeTab === tab.id ? '2px solid #1a1a1a' : '2px solid transparent',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Mini cards */}
              <div style={{ display: 'flex', gap: '6px', overflow: 'hidden' }}>
                <div style={{
                  width: '100px',
                  flexShrink: 0,
                  background: 'white',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                }}>
                  <div style={{ height: '50px', background: 'linear-gradient(135deg, #D4856A, #A04830)' }} />
                  <div style={{ padding: '5px' }}>
                    <div style={{ fontSize: '7px', fontWeight: 700, color: '#1a1a1a', textTransform: 'uppercase' }}>RED FORT</div>
                  </div>
                </div>
                <div style={{
                  width: '100px',
                  flexShrink: 0,
                  background: 'white',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                  opacity: 0.5,
                }}>
                  <div style={{ height: '50px', background: 'linear-gradient(135deg, #87CEEB, #4682B4)' }} />
                  <div style={{ padding: '5px' }}>
                    <div style={{ fontSize: '7px', fontWeight: 700, color: '#1a1a1a', textTransform: 'uppercase' }}>GATEWAY</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div style={{ fontSize: '13px', color: '#999' }}>Designed Page</div>
    </div>
  );

  // ---------------------------------------------------------------------------
  // CONTENT ROUTER
  // ---------------------------------------------------------------------------
  const contentRenderers: Record<Category, () => React.ReactNode> = {
    atoms: renderAtoms,
    molecules: renderMolecules,
    organisms: renderOrganisms,
    templates: renderTemplates,
    pages: renderPages,
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <div ref={containerRef}>
      {/* Main container */}
      <div style={{
        background: '#EDEDEC',
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex',
        height: '500px',
        border: '1px solid rgba(0,0,0,0.06)',
      }}>
        {/* Sidebar */}
        <div style={{
          width: '120px',
          flexShrink: 0,
          background: 'white',
          borderRadius: '14px',
          margin: '10px',
          padding: '12px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  padding: '10px 6px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '10px',
                  width: '100%',
                }}
              >
                <CategoryIcon category={cat.id} isActive={isActive} />
                <span style={{
                  fontSize: '10px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? BRAND_RED : 'rgba(218, 14, 41, 0.4)',
                  transition: 'color 0.2s',
                }}>
                  {cat.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Content area */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              style={{ height: '100%' }}
            >
              {contentRenderers[activeCategory]()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

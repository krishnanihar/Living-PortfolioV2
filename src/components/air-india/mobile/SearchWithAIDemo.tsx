'use client';

import React, { useState, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, Camera, ChevronDown, MapPin, Plane, Calendar, Sparkles, ArrowLeft, Star, Clock, ChevronRight } from 'lucide-react';

export interface DemoHandle {
  triggerAction: () => void;
  reset: () => void;
}

interface SearchWithAIDemoProps {
  brandColor?: string;
}

interface Destination {
  name: string;
  country: string;
  flag: string;
  description: string;
  image: string;
}

interface SearchResult {
  destination: string;
  bestTime: string;
  insight: string;
  flights: {
    airline: string;
    route: string;
    price: string;
    duration: string;
  }[];
}

// Images
const TAJ_MAHAL_IMG = 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=500&fit=crop';
const PARIS_IMG = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&h=200&fit=crop';
const BALI_IMG = 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&h=200&fit=crop';
const AGRA_FORT_IMG = 'https://images.unsplash.com/photo-1548013146-72479768bada?w=200&h=200&fit=crop';
const MEHTAB_BAGH_IMG = 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=200&h=200&fit=crop';
const FOOD_TOUR_IMG = 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=200&h=200&fit=crop';
const PETHA_IMG = 'https://images.unsplash.com/photo-1589988996570-b7e81f61ff0e?w=200&h=200&fit=crop';
const BEDAI_IMG = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&h=200&fit=crop';
const MUGHLAI_IMG = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&h=200&fit=crop';

/**
 * Search with AI Demo - Air India's AI-powered destination search
 * Matches Figma design exactly with iPhone device mockup
 */
// Device frame dimensions
const DEVICE_WIDTH = 375;
const DEVICE_HEIGHT = 812;
const BEZEL_WIDTH = 12;

export const SearchWithAIDemo = forwardRef<DemoHandle, SearchWithAIDemoProps>(function SearchWithAIDemo({ brandColor = '218, 14, 41' }, ref) {
  const [step, setStep] = useState<'search' | 'typing' | 'loading' | 'results'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [typedText, setTypedText] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const trendingDestinations: Destination[] = [
    {
      name: 'Taj Mahal',
      country: 'India',
      flag: '🇮🇳',
      description: "A wonder of the world carved as history's timeless jewel",
      image: TAJ_MAHAL_IMG,
    },
    {
      name: 'Paris',
      country: 'France',
      flag: '🇫🇷',
      description: "Wander the 'City of Light' where art and culture entwine",
      image: PARIS_IMG,
    },
    {
      name: 'Bali',
      country: 'Indonesia',
      flag: '🇮🇩',
      description: 'Indulge in the serenity of seas and spiritual traditions',
      image: BALI_IMG,
    },
  ];

  const quickSuggestions = [
    'Upcoming F1 racing events',
    'Dubai Shopping Festival',
    'Cricket World Cup matches',
  ];

  const searchResult: SearchResult = {
    destination: 'Taj Mahal, Agra',
    bestTime: 'Oct - Mar',
    insight: 'Monsoon tail-end, lush gardens, fewer crowds but occasional rain.',
    flights: [
      {
        airline: 'AI 251',
        route: 'BOM → AGR',
        price: '₹4,300',
        duration: '2h 25m',
      },
    ],
  };

  // Destination Detail Data
  const detailFlights = [
    { time: '10:05', arrival: '12:15', flight: 'AI 173', price: '₹8,450', duration: '2h 10m', stops: 'Non-stop' },
    { time: '14:30', arrival: '16:40', flight: 'AI 865', price: '₹7,890', duration: '2h 10m', stops: 'Non-stop' },
    { time: '19:15', arrival: '21:25', flight: 'AI 677', price: '₹9,200', duration: '2h 10m', stops: 'Non-stop' },
  ];

  const thingsToDo = [
    { name: 'Explore Agra Fort', desc: 'Magnificent red sandstone fort with stunning views of Taj Mahal', image: AGRA_FORT_IMG },
    { name: 'Mehtab Bagh Gardens', desc: 'Perfect sunset views and photography spot of Taj Mahal', image: MEHTAB_BAGH_IMG },
    { name: 'Local Food Tour', desc: 'Taste authentic Agra delicacies and street food', image: FOOD_TOUR_IMG },
  ];

  const foods = [
    { name: 'Petha', desc: 'Iconic sweet made from ash gourd (try at Panchi Petha)', image: PETHA_IMG },
    { name: 'Bedai with Jalebi', desc: 'Spicy fried bread with potato curry, paired with sweet jalebi', image: BEDAI_IMG },
    { name: 'Mughlai Curries', desc: 'Rich, aromatic dishes like chicken korma and mutton biryani', image: MUGHLAI_IMG },
  ];

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setStep('typing');

    // Simulate typing effect
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i <= query.length) {
        setTypedText(query.slice(0, i));
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setStep('loading');
          setTimeout(() => {
            setStep('results');
          }, 1500);
        }, 500);
      }
    }, 50);
  }, []);

  const resetDemo = useCallback(() => {
    setStep('search');
    setSearchQuery('');
    setTypedText('');
  }, []);

  useImperativeHandle(ref, () => ({
    triggerAction: () => handleSearch('Taj Mahal, Agra'),
    reset: () => resetDemo(),
  }), [handleSearch, resetDemo]);

  return (
    <div
      style={{
        width: DEVICE_WIDTH + BEZEL_WIDTH * 2,
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Simple Uniform Device Frame */}
      <div
        style={{
          position: 'relative',
          width: DEVICE_WIDTH + BEZEL_WIDTH * 2,
          height: DEVICE_HEIGHT + BEZEL_WIDTH * 2,
          background: '#1A1A1A',
          borderRadius: 40,
          padding: BEZEL_WIDTH,
        }}
      >
        {/* Screen Content */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#F7F8F8',
            borderRadius: 32,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Dynamic Island / Notch */}
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90px',
              height: '26px',
              background: '#1A1A1A',
              borderRadius: '20px',
              zIndex: 100,
            }}
          />

          {/* Status Bar */}
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: '24px',
              right: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 50,
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>9:41</span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
                <path d="M1 3.5C1 2.67 1.67 2 2.5 2H3.5C4.33 2 5 2.67 5 3.5V9.5C5 10.33 4.33 11 3.5 11H2.5C1.67 11 1 10.33 1 9.5V3.5Z" fill="#1A1A1A"/>
                <path d="M6 5.5C6 4.67 6.67 4 7.5 4H8.5C9.33 4 10 4.67 10 5.5V9.5C10 10.33 9.33 11 8.5 11H7.5C6.67 11 6 10.33 6 9.5V5.5Z" fill="#1A1A1A"/>
                <path d="M11 2.5C11 1.67 11.67 1 12.5 1H13.5C14.33 1 15 1.67 15 2.5V9.5C15 10.33 14.33 11 13.5 11H12.5C11.67 11 11 10.33 11 9.5V2.5Z" fill="#1A1A1A"/>
              </svg>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                <path d="M7.5 2C10.29 2 12.76 3.26 14.32 5.24C14.54 5.52 14.54 5.92 14.31 6.2C12.75 8.26 10.26 9.5 7.5 9.5C4.74 9.5 2.25 8.26 0.69 6.2C0.46 5.92 0.46 5.52 0.68 5.24C2.24 3.26 4.71 2 7.5 2Z" fill="#1A1A1A"/>
              </svg>
              <div style={{
                width: '24px',
                height: '11px',
                border: '1px solid #1A1A1A',
                borderRadius: '3px',
                position: 'relative',
                padding: '1px',
              }}>
                <div style={{
                  width: '80%',
                  height: '100%',
                  background: '#1A1A1A',
                  borderRadius: '1px',
                }} />
                <div style={{
                  position: 'absolute',
                  right: '-3px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '2px',
                  height: '5px',
                  background: '#1A1A1A',
                  borderRadius: '0 1px 1px 0',
                }} />
              </div>
            </div>
          </div>

          {/* Main Content - Full Scrollable Area */}
          <div
            ref={scrollContainerRef}
            onWheel={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop += e.deltaY;
              }
            }}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: 'auto',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
              background: '#F7F8F8',
              zIndex: 5,
              touchAction: 'pan-y',
            }}
          >
            {/* Header Image with Taj Mahal - Now scrolls */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 300,
                backgroundImage: `url("${TAJ_MAHAL_IMG}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
              }}
            >
              {/* Top gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '30%',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
                }}
              />
              {/* Bottom gradient fade to background */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(180deg, rgba(247,248,248,0) 0%, rgba(247,248,248,1) 100%)',
                }}
              />
              {/* Back Button - inside header */}
              <button
                onClick={resetDemo}
                style={{
                  position: 'absolute',
                  top: '52px',
                  left: '16px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(6px)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 20,
                }}
              >
                <ArrowLeft size={16} style={{ color: 'white' }} />
              </button>

              {/* AI Explorer Title & Location - inside header */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  right: 16,
                }}
              >
                <div
                  style={{
                    fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                    fontSize: '18px',
                    fontWeight: '500',
                    color: `rgb(${brandColor})`,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '4px',
                  }}
                >
                  AI Explorer
                </div>
                <div
                  style={{
                    fontFamily: "'SF Pro Text', -apple-system, sans-serif",
                    fontSize: '12px',
                    fontWeight: '400',
                    color: '#494E5C',
                    marginBottom: '8px',
                  }}
                >
                  Think Destination or Event — We'll Find You Flights
                </div>

                {/* From Location Pill */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 10px',
                    background: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: '400',
                  }}
                >
                  <MapPin size={11} />
                  From : Mumbai
                  <ChevronDown size={12} style={{ opacity: 0.8 }} />
                </div>
              </div>
            </div>

            {/* Content below header */}
            <div style={{ padding: '16px 16px 20px' }}>
            {/* Search Input with Red Border */}
            <div
              style={{
                position: 'relative',
                marginBottom: '12px',
              }}
            >
              {/* Blur border effect */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-2px',
                  borderRadius: '14px',
                  border: '2px solid #AF1C3C',
                  filter: 'blur(2px)',
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 12px',
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid #AF1C3C',
                  borderRadius: '12px',
                  boxShadow: 'inset -1px -1px 2px rgba(255, 255, 255, 0.55), inset 1px 1px 8px rgba(255, 255, 255, 0.55)',
                }}
              >
                <div style={{ flex: 1, fontSize: '14px', color: step === 'search' ? '#999' : '#25272C' }}>
                  {step === 'search' ? 'Type a race, festival, or city' : typedText}
                  {(step === 'typing' || step === 'loading') && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      style={{ marginLeft: '2px' }}
                    >
                      |
                    </motion.span>
                  )}
                </div>

                {/* Camera Icon */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50% 50% 50% 50%',
                    background: 'rgba(255, 255, 255, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 15px rgba(0, 0, 0, 0.05), inset 1px 1px 8px rgba(255, 255, 255, 0.55)',
                    marginRight: '8px',
                  }}
                >
                  <Camera size={20} style={{ color: '#494E5C' }} />
                </div>

                {/* Mic Icon with border */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.5)',
                    border: `1px solid rgb(${brandColor})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 15px rgba(0, 0, 0, 0.05), inset 1px 1px 8px rgba(255, 255, 255, 0.55)',
                  }}
                >
                  <Mic size={20} style={{ color: `rgb(${brandColor})` }} />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={() => handleSearch('Taj Mahal, Agra')}
              disabled={step !== 'search'}
              style={{
                width: '100%',
                padding: '14px 24px',
                background: `rgb(${brandColor})`,
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
                cursor: step === 'search' ? 'pointer' : 'default',
                opacity: step === 'search' ? 1 : 0.7,
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {step === 'loading' ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles size={18} />
                  </motion.div>
                  Searching with AI...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Search With AI
                </>
              )}
            </button>

            <AnimatePresence mode="wait">
              {step === 'search' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Quick Suggestions - Horizontal scroll */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '12px',
                      marginBottom: '16px',
                      overflowX: 'auto',
                      paddingBottom: '4px',
                    }}
                  >
                    {quickSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSearch(suggestion)}
                        style={{
                          padding: '10px 16px',
                          background: '#EDEEF1',
                          border: 'none',
                          borderRadius: '24px',
                          fontSize: '14px',
                          color: '#494E5C',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>

                  {/* Trending Section */}
                  <div>
                    <div
                      style={{
                        fontFamily: "'Nunito Sans', -apple-system, sans-serif",
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#25272C',
                        marginBottom: '8px',
                      }}
                    >
                      Trending
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {trendingDestinations.map((dest) => (
                        <button
                          key={dest.name}
                          onClick={() => handleSearch(`${dest.name}, ${dest.country}`)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 1px 15px rgba(0, 0, 0, 0.05), inset 1px 1px 8px rgba(255, 255, 255, 0.55)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            height: '88px',
                          }}
                        >
                          {/* Image Section */}
                          <div
                            style={{
                              width: '113px',
                              height: '88px',
                              background: `url(${dest.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              borderRadius: '12px',
                              border: '4px solid white',
                              flexShrink: 0,
                            }}
                          />
                          {/* Content Section */}
                          <div
                            style={{
                              flex: 1,
                              background: 'white',
                              height: '100%',
                              padding: '12px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              gap: '8px',
                            }}
                          >
                            {/* Title Row */}
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "'Nunito Sans', -apple-system, sans-serif",
                                  fontSize: '14px',
                                  fontWeight: '500',
                                  color: '#25272C',
                                }}
                              >
                                {dest.name}
                              </span>
                              {/* Country Chip */}
                              <span
                                style={{
                                  fontSize: '12px',
                                  color: '#494E5C',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  background: '#F7F8F8',
                                  padding: '2px 4px',
                                  borderRadius: '24px',
                                  border: '1px solid #EDEEF1',
                                  fontWeight: '400',
                                  boxShadow: '0 1px 15px rgba(0, 0, 0, 0.05), inset 1px 1px 8px rgba(255, 255, 255, 0.55)',
                                }}
                              >
                                <span style={{ fontSize: '12px' }}>{dest.flag}</span>
                                {dest.country}
                              </span>
                            </div>
                            {/* Description */}
                            <div
                              style={{
                                fontFamily: "'Nunito Sans', -apple-system, sans-serif",
                                fontSize: '12px',
                                fontWeight: '400',
                                color: '#494E5C',
                                lineHeight: 1.4,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                              }}
                            >
                              {dest.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'results' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Destination Title */}
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <h1
                      style={{
                        fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                        fontSize: '22px',
                        fontWeight: '600',
                        color: '#25272C',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        marginBottom: '6px',
                      }}
                    >
                      The Taj Mahal
                    </h1>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        background: '#F7F8F8',
                        borderRadius: '16px',
                        border: '1px solid #EDEEF1',
                        fontSize: '11px',
                        color: '#494E5C',
                      }}
                    >
                      <span>🇮🇳</span>
                      India
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "'Nunito Sans', -apple-system, sans-serif",
                      fontSize: '13px',
                      fontWeight: '400',
                      color: '#494E5C',
                      lineHeight: 1.6,
                      textAlign: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    Regarded as one of the 8 wonders of the world, this architectural marvel remains etched in the sands of history for all eternity.
                  </p>

                  {/* Travel Dates */}
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                    <div
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: 'white',
                        borderRadius: '10px',
                        border: '1px solid #EDEEF1',
                        boxShadow: '0 1px 15px rgba(0,0,0,0.05)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' }}>
                        <Calendar size={11} style={{ color: `rgb(${brandColor})` }} />
                        <span style={{ fontSize: '9px', color: '#494E5C', fontWeight: '500' }}>Departure</span>
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#25272C' }}>Sept 12, 2025</div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: 'white',
                        borderRadius: '10px',
                        border: '1px solid #EDEEF1',
                        boxShadow: '0 1px 15px rgba(0,0,0,0.05)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' }}>
                        <Calendar size={11} style={{ color: `rgb(${brandColor})` }} />
                        <span style={{ fontSize: '9px', color: '#494E5C', fontWeight: '500' }}>Return</span>
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#25272C' }}>Sept 15, 2025</div>
                    </div>
                  </div>

                  {/* Complete Your Travel Card */}
                  <div
                    style={{
                      padding: '14px',
                      background: `linear-gradient(135deg, rgb(${brandColor}), rgba(${brandColor}, 0.85))`,
                      borderRadius: '10px',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: 'white', marginBottom: '2px' }}>
                        Complete Your Travel
                      </div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)' }}>
                        Manage all hotel, activity bookings
                      </div>
                    </div>
                    <ChevronRight size={18} style={{ color: 'white' }} />
                  </div>

                  {/* Flight Details Section */}
                  <div style={{ marginBottom: '16px' }}>
                    <h2
                      style={{
                        fontFamily: "'Nunito Sans', -apple-system, sans-serif",
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#25272C',
                        marginBottom: '8px',
                      }}
                    >
                      Flight Details
                    </h2>

                    {/* Route */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginBottom: '10px',
                        padding: '6px 10px',
                        background: 'rgba(255,255,255,0.5)',
                        borderRadius: '6px',
                      }}
                    >
                      <MapPin size={12} style={{ color: '#494E5C' }} />
                      <span style={{ fontSize: '11px', color: '#494E5C' }}>
                        Delhi to Indira Gandhi International Airport
                      </span>
                    </div>

                    {/* Flight Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {detailFlights.map((flight, i) => (
                        <motion.div
                          key={flight.flight}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          style={{
                            padding: '10px',
                            background: 'white',
                            borderRadius: '10px',
                            border: '1px solid #EDEEF1',
                            boxShadow: '0 1px 15px rgba(0,0,0,0.05)',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                                <span style={{ fontSize: '14px', fontWeight: '600', color: '#25272C' }}>{flight.time}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                  <div style={{ width: '16px', height: '1px', background: '#D3D6DB' }} />
                                  <Plane size={10} style={{ color: '#494E5C', transform: 'rotate(45deg)' }} />
                                  <div style={{ width: '16px', height: '1px', background: '#D3D6DB' }} />
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: '600', color: '#25272C' }}>{flight.arrival}</span>
                              </div>
                              <div style={{ fontSize: '10px', color: '#494E5C' }}>
                                {flight.flight} · {flight.duration} · {flight.stops}
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '14px', fontWeight: '700', color: `rgb(${brandColor})` }}>
                                {flight.price}
                              </div>
                              <div style={{ fontSize: '9px', color: '#494E5C' }}>per person</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* View More Flights Button */}
                    <button
                      style={{
                        width: '100%',
                        marginTop: '10px',
                        padding: '12px',
                        background: `rgb(${brandColor})`,
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      View more Flights
                    </button>
                  </div>

                  {/* Must Try Section */}
                  <div
                    style={{
                      padding: '12px',
                      background: 'rgba(255,255,255,0.5)',
                      borderRadius: '10px',
                      marginBottom: '12px',
                      boxShadow: '0 1px 15px rgba(0,0,0,0.05), inset 1px 1px 8px rgba(255,255,255,0.55)',
                    }}
                  >
                    <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#25272C', marginBottom: '10px' }}>
                      Must Try
                    </h3>

                    {/* Top Things to Do */}
                    <div
                      style={{
                        padding: '10px',
                        background: 'rgba(255,255,255,0.5)',
                        borderRadius: '8px',
                        marginBottom: '10px',
                        boxShadow: '0 1px 15px rgba(0,0,0,0.05), inset 1px 1px 8px rgba(255,255,255,0.55)',
                      }}
                    >
                      <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#25272C', marginBottom: '8px' }}>
                        Top Things to Do
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {thingsToDo.map((item) => (
                          <div
                            key={item.name}
                            style={{
                              display: 'flex',
                              gap: '8px',
                              padding: '6px',
                              background: 'rgba(255,255,255,0.5)',
                              borderRadius: '6px',
                              boxShadow: '0 1px 15px rgba(0,0,0,0.05), inset 1px 1px 8px rgba(255,255,255,0.55)',
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{
                                width: 56,
                                height: 56,
                                borderRadius: '4px',
                                objectFit: 'cover',
                              }}
                            />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#25272C', marginBottom: '2px' }}>
                                {item.name}
                              </div>
                              <div style={{ fontSize: '10px', color: '#494E5C', lineHeight: 1.4 }}>
                                {item.desc}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Local Foods */}
                    <div
                      style={{
                        padding: '10px',
                        background: 'rgba(255,255,255,0.5)',
                        borderRadius: '8px',
                        boxShadow: '0 1px 15px rgba(0,0,0,0.05), inset 1px 1px 8px rgba(255,255,255,0.55)',
                      }}
                    >
                      <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#25272C', marginBottom: '8px' }}>
                        Local Foods to Try
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {foods.map((item) => (
                          <div
                            key={item.name}
                            style={{
                              display: 'flex',
                              gap: '8px',
                              padding: '6px',
                              background: 'rgba(255,255,255,0.5)',
                              borderRadius: '6px',
                              boxShadow: '0 1px 15px rgba(0,0,0,0.05), inset 1px 1px 8px rgba(255,255,255,0.55)',
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{
                                width: 56,
                                height: 56,
                                borderRadius: '4px',
                                objectFit: 'cover',
                              }}
                            />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: '#25272C', marginBottom: '2px' }}>
                                {item.name}
                              </div>
                              <div style={{ fontSize: '10px', color: '#494E5C', lineHeight: 1.4 }}>
                                {item.desc}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AI Discoveries Section */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
                      <Sparkles size={12} style={{ color: `rgb(${brandColor})` }} />
                      <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#25272C' }}>
                        AI Discoveries
                      </h3>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
                      {[
                        { title: 'The legendary Agra', rating: '4.8' },
                        { title: 'Fatehpur Sikri', rating: '4.6' },
                      ].map((item) => (
                        <div
                          key={item.title}
                          style={{
                            minWidth: '120px',
                            padding: '10px',
                            background: 'white',
                            borderRadius: '10px',
                            border: '1px solid #EDEEF1',
                            boxShadow: '0 1px 15px rgba(0,0,0,0.05)',
                          }}
                        >
                          <div
                            style={{
                              width: '100%',
                              height: '64px',
                              background: '#E5E5E5',
                              borderRadius: '6px',
                              marginBottom: '6px',
                            }}
                          />
                          <div style={{ fontSize: '11px', fontWeight: '600', color: '#25272C', marginBottom: '3px' }}>
                            {item.title}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Star size={9} fill="#FFB800" style={{ color: '#FFB800' }} />
                            <span style={{ fontSize: '9px', color: '#494E5C' }}>{item.rating}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nearby Section */}
                  <div style={{ marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#25272C', marginBottom: '8px' }}>
                      Nearby
                    </h3>
                    <div
                      style={{
                        padding: '10px',
                        background: 'white',
                        borderRadius: '10px',
                        border: '1px solid #EDEEF1',
                        boxShadow: '0 1px 15px rgba(0,0,0,0.05)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={12} style={{ color: '#494E5C' }} />
                        <span style={{ fontSize: '11px', color: '#494E5C' }}>
                          2h 45min from Delhi by train
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Getting There Section */}
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#25272C', marginBottom: '8px' }}>
                      Getting There & Around
                    </h3>
                    <div
                      style={{
                        width: '100%',
                        height: '100px',
                        background: '#E5E5E5',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#999',
                        fontSize: '11px',
                      }}
                    >
                      Map View
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: `rgb(${brandColor})`,
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginBottom: '12px',
                    }}
                  >
                    Send Enquiry to Deal
                  </button>

                  {/* Reset Button */}
                  <button
                    onClick={resetDemo}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'transparent',
                      border: `1px solid rgb(${brandColor})`,
                      borderRadius: '8px',
                      color: `rgb(${brandColor})`,
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                  >
                    Try Another Search
                  </button>

                  {/* Bottom spacing */}
                  <div style={{ height: '20px' }} />
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

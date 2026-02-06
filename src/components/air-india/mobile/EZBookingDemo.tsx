'use client';

import React, { useState, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Plane, ChevronDown, ChevronUp, Home, CreditCard, Search, User } from 'lucide-react';

export interface DemoHandle {
  triggerAction: () => void;
  reset: () => void;
}

interface EZBookingDemoProps {
  brandColor?: string;
}

// Figma asset URLs
const OCEAN_BG = 'https://www.figma.com/api/mcp/asset/293d2ef6-7944-4510-9fd9-f6eaabd39e72';
const EZ_LOGO = 'https://www.figma.com/api/mcp/asset/d56f96ba-6100-45af-b80a-d919864524a5';
const AI_AVATAR = 'https://www.figma.com/api/mcp/asset/a55373ce-c20b-4954-b8bd-38482fd3a9e4';
const ROUTE_IMG_1 = 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=154&h=80&fit=crop';
const ROUTE_IMG_2 = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=154&h=80&fit=crop';
const ROUTE_IMG_3 = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=154&h=80&fit=crop';

/**
 * eZ Booking Demo - Air India's AI-powered conversational booking
 * Red Dot Design Award 2024 winner
 * Patent-pending Agentic AI technology
 */
const DEVICE_WIDTH = 375;
const DEVICE_HEIGHT = 812;
const BEZEL_WIDTH = 12;

// Route recommendations matching Figma
const recommendations = [
  { from: 'COK', to: 'DEL', image: ROUTE_IMG_1 },
  { from: 'COK', to: 'MAA', image: ROUTE_IMG_2 },
  { from: 'COK', to: 'CDG', image: ROUTE_IMG_3 },
];

// Passengers for booking confirmation
const passengers = [
  { name: 'Vignesh Sharma', seat: '7B', type: 'Middle', price: 400 },
  { name: 'Pooja Vignesh', seat: '7A', type: 'Window', price: 400 },
  { name: 'Arjun Sharma', seat: '7C', type: 'Aisle', price: 400 },
];

export const EZBookingDemo = forwardRef<DemoHandle, EZBookingDemoProps>(function EZBookingDemo({ brandColor = '218, 14, 41' }, ref) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<'home' | 'booking'>('home');
  const [seatExpanded, setSeatExpanded] = useState(true);

  const handleSearch = useCallback(() => {
    setStep('booking');
    setTimeout(() => {
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  const resetDemo = useCallback(() => {
    setStep('home');
    setSeatExpanded(true);
  }, []);

  useImperativeHandle(ref, () => ({
    triggerAction: () => handleSearch(),
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
      {/* Device Frame */}
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
            borderRadius: 32,
            overflow: 'hidden',
            position: 'relative',
            background: '#F7F8F8',
          }}
        >
          <AnimatePresence mode="wait">
            {/* HOME SCREEN - Matching Figma node 7149-47304 */}
            {step === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                {/* Background layers */}
                <div style={{ position: 'absolute', inset: 0, background: '#f7f8f8' }} />
                <img
                  src={OCEAN_BG}
                  alt=""
                  style={{
                    position: 'absolute',
                    width: '465%',
                    height: '100%',
                    left: '-147%',
                    top: 0,
                    objectFit: 'cover',
                  }}
                />
                {/* Gradient overlays matching Figma */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.64) 0%, rgba(255, 255, 255, 0) 46.3%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 66.3%, rgba(0, 0, 0, 0.5) 100%)',
                  }}
                />

                {/* Status Bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 96,
                    borderBottom: '0.5px solid #D3D6DB',
                    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 96"><defs><linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="rgba(255,255,255,0.9)"/><stop offset="100%" stop-color="rgba(255,255,255,0.7)"/></linearGradient></defs><rect fill="url(#g)" width="375" height="96"/></svg>')}")`,
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                />

                {/* Header Bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 96,
                    left: 0,
                    right: 0,
                    height: 62,
                    background: 'white',
                    boxShadow: '0px 1px 3px rgba(30, 41, 59, 0.1), 0px 1px 2px rgba(30, 41, 59, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    zIndex: 10,
                  }}
                >
                  {/* Left - Menu + Logo */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#1C1213"/>
                    </svg>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{
                        fontFamily: "'Air India Variable', sans-serif",
                        fontWeight: 700,
                        fontSize: '18px',
                        background: 'linear-gradient(90deg, #DA0E29 0%, #B61032 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}>
                        Air India
                      </span>
                    </div>
                  </div>
                  {/* Right - Icons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="3.5" stroke="#1C1213" strokeWidth="1.2"/>
                      <path d="M5.5 19.5C5.5 16.5 8.5 14 12 14C15.5 14 18.5 16.5 18.5 19.5" stroke="#1C1213" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 2L10.5 6.5H15L11.5 9.5L13 14L9 11L5 14L6.5 9.5L3 6.5H7.5L9 2Z" fill="#DA0E29"/>
                    </svg>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" stroke="#1C1213" strokeWidth="1.2"/>
                    </svg>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="#1C1213" strokeWidth="1.2"/>
                      <circle cx="12" cy="10" r="3" stroke="#1C1213" strokeWidth="1.2"/>
                      <path d="M6.5 18.5C7.5 16 9.5 14.5 12 14.5C14.5 14.5 16.5 16 17.5 18.5" stroke="#1C1213" strokeWidth="1.2"/>
                    </svg>
                  </div>
                </div>

                {/* Main Content Area */}
                <div
                  ref={scrollContainerRef}
                  style={{
                    position: 'absolute',
                    top: 158,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {/* eZ BOOKING Logo */}
                  <img
                    src={EZ_LOGO}
                    alt="eZ BOOKING"
                    style={{
                      width: 145,
                      height: 21,
                      marginBottom: '16px',
                    }}
                  />

                  {/* Search Bar */}
                  <div
                    onClick={handleSearch}
                    style={{
                      width: '100%',
                      background: 'white',
                      borderRadius: '24px',
                      padding: '4px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0px 1px 3px rgba(30, 41, 59, 0.1), 0px 1px 2px rgba(30, 41, 59, 0.05)',
                      cursor: 'pointer',
                      marginBottom: '16px',
                    }}
                  >
                    <div style={{
                      flex: 1,
                      padding: '12px',
                      fontSize: '12px',
                      color: '#494E5C',
                      fontFamily: "'Nunito Sans', sans-serif",
                    }}>
                      Change the return date to 17th june
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {/* Mic button */}
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        border: '1px solid #DA0E29',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Mic size={16} style={{ color: '#DA0E29' }} />
                      </div>
                      {/* Send/Flight button */}
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: '#B61032',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="white"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations Chip */}
                  <div
                    style={{
                      background: 'rgba(28, 18, 19, 0.4)',
                      backdropFilter: 'blur(2px)',
                      WebkitBackdropFilter: 'blur(2px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '900px',
                      padding: '4px 8px',
                      marginBottom: '8px',
                    }}
                  >
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'white',
                      fontFamily: "'Nunito Sans', sans-serif",
                    }}>
                      Recommendations based on your past trips
                    </span>
                  </div>

                  {/* Route Cards */}
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    width: '100%',
                    overflowX: 'auto',
                    paddingBottom: '8px',
                  }}>
                    {recommendations.map((route) => (
                      <div
                        key={`${route.from}-${route.to}`}
                        onClick={handleSearch}
                        style={{
                          width: 154,
                          height: 122,
                          flexShrink: 0,
                          borderRadius: '8px',
                          overflow: 'hidden',
                          boxShadow: '0px 1px 3px rgba(30, 41, 59, 0.1), 0px 1px 2px rgba(30, 41, 59, 0.05)',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        {/* Image */}
                        <div
                          style={{
                            flex: 1,
                            backgroundImage: `url("${route.image}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                        {/* Route info */}
                        <div style={{
                          background: 'white',
                          padding: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}>
                          <span style={{
                            fontFamily: "'Air India Variable', sans-serif",
                            fontSize: '9px',
                            fontWeight: 700,
                            color: '#494E5C',
                            textTransform: 'uppercase',
                          }}>
                            {route.from}
                          </span>
                          <div style={{ flex: 1, height: '0.5px', background: '#D3D6DB' }} />
                          <div style={{ transform: 'rotate(90deg)' }}>
                            <Plane size={12} style={{ color: '#494E5C' }} />
                          </div>
                          <div style={{ flex: 1, height: '0.5px', background: '#D3D6DB' }} />
                          <span style={{
                            fontFamily: "'Air India Variable', sans-serif",
                            fontSize: '9px',
                            fontWeight: 700,
                            color: '#494E5C',
                            textTransform: 'uppercase',
                          }}>
                            {route.to}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom AI.g Branding */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <img
                    src={AI_AVATAR}
                    alt=""
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span style={{
                        fontFamily: "'Air India Variable', sans-serif",
                        fontSize: '12px',
                        fontWeight: 700,
                        color: 'white',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12px',
                      }}>
                        powered by
                      </span>
                      <span style={{
                        fontFamily: "'Air India Variable', sans-serif",
                        fontSize: '14px',
                        fontWeight: 700,
                        color: 'white',
                      }}>
                        AI.g
                      </span>
                    </div>
                    <span style={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      fontSize: '12px',
                      color: 'white',
                    }}>
                      Patent Pending
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* BOOKING CONFIRMATION SCREEN - Matching Figma node 7149-46576 */}
            {step === 'booking' && (
              <motion.div
                key="booking"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#F5F6F8',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Header with Route */}
                <div
                  style={{
                    background: 'white',
                    padding: '12px 16px',
                    paddingTop: '48px',
                  }}
                >
                  {/* Status bar space */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <button
                      onClick={resetDemo}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="#1C1213" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <span style={{ fontSize: '16px', fontWeight: 600, color: '#1C1213' }}>Booking</span>
                  </div>

                  {/* Route Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      background: `rgba(${brandColor}, 0.05)`,
                      borderRadius: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: '#1C1213' }}>DEL</div>
                        <div style={{ fontSize: '10px', color: '#777' }}>Delhi</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: 24, height: 1, background: '#D3D6DB' }} />
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#1C1213" strokeWidth="1.5"/>
                        </svg>
                        <div style={{ width: 24, height: 1, background: '#D3D6DB' }} />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: '#1C1213' }}>SFO</div>
                        <div style={{ fontSize: '10px', color: '#777' }}>San Francisco</div>
                      </div>
                    </div>
                  </div>

                  {/* Passenger Info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '12px',
                    padding: '8px 0',
                  }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: `rgba(${brandColor}, 0.1)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <User size={16} style={{ color: `rgb(${brandColor})` }} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#1C1213' }}>
                      Vignesh Sharma <span style={{ color: '#777' }}>+2</span>
                    </span>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div
                  ref={scrollContainerRef}
                  onWheel={(e) => {
                    e.stopPropagation();
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollTop += e.deltaY;
                    }
                  }}
                  style={{
                    flex: 1,
                    overflow: 'auto',
                    padding: '16px',
                  }}
                >
                  {/* Departure Section */}
                  <div
                    style={{
                      background: 'white',
                      borderRadius: '12px',
                      padding: '16px',
                      marginBottom: '12px',
                      boxShadow: '0px 1px 3px rgba(30, 41, 59, 0.1)',
                    }}
                  >
                    <div style={{ fontSize: '12px', color: '#777', marginBottom: '12px' }}>
                      Departure to SFO
                    </div>
                    {/* Flight Card */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: '8px',
                          background: `rgba(${brandColor}, 0.1)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Plane size={20} style={{ color: `rgb(${brandColor})`, transform: 'rotate(45deg)' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '16px', fontWeight: 700, color: '#1C1213' }}>AI 2516</span>
                          <span style={{ fontSize: '12px', color: '#777' }}>• Economy</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#777' }}>15h 30m • 1 stop</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: `rgb(${brandColor})` }}>INR 65,072</div>
                      </div>
                    </div>
                  </div>

                  {/* Return Section */}
                  <div
                    style={{
                      background: 'white',
                      borderRadius: '12px',
                      padding: '16px',
                      marginBottom: '12px',
                      boxShadow: '0px 1px 3px rgba(30, 41, 59, 0.1)',
                    }}
                  >
                    <div style={{ fontSize: '12px', color: '#777', marginBottom: '12px' }}>
                      Return to DEL
                    </div>
                    {/* Flight Card */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: '8px',
                          background: `rgba(${brandColor}, 0.1)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Plane size={20} style={{ color: `rgb(${brandColor})`, transform: 'rotate(-135deg)' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '16px', fontWeight: 700, color: '#1C1213' }}>AI 2516</span>
                          <span style={{ fontSize: '12px', color: '#777' }}>• Economy</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#777' }}>15h 30m • 1 stop</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: `rgb(${brandColor})` }}>INR 65,072</div>
                      </div>
                    </div>
                  </div>

                  {/* Seat Selection */}
                  <div
                    style={{
                      background: 'white',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      marginBottom: '12px',
                      boxShadow: '0px 1px 3px rgba(30, 41, 59, 0.1)',
                    }}
                  >
                    {/* Header */}
                    <div
                      onClick={() => setSeatExpanded(!seatExpanded)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M6 18V9.5C6 6.46 8.46 4 11.5 4C14.54 4 17 6.46 17 9.5V11H19V9.5C19 5.36 15.64 2 11.5 2C7.36 2 4 5.36 4 9.5V18H6Z" fill={`rgb(${brandColor})`}/>
                          <path d="M15 14H4V20C4 21.1 4.9 22 6 22H17V18H15V14Z" fill={`rgb(${brandColor})`}/>
                          <path d="M19 14H17V18H19C20.1 18 21 17.1 21 16C21 14.9 20.1 14 19 14Z" fill={`rgb(${brandColor})`}/>
                        </svg>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#1C1213' }}>Seat Selection</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: '#777' }}>DEL → SFO</span>
                        {seatExpanded ? <ChevronUp size={16} color="#777" /> : <ChevronDown size={16} color="#777" />}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {seatExpanded && (
                      <div style={{ padding: '0 16px 16px' }}>
                        {passengers.map((passenger, i) => (
                          <div
                            key={i}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '12px 0',
                              borderTop: i > 0 ? '1px solid #EDEEF1' : 'none',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div
                                style={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: '50%',
                                  background: '#EDEEF1',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  color: '#494E5C',
                                }}
                              >
                                {passenger.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span style={{ fontSize: '13px', color: '#1C1213' }}>{passenger.name}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <span style={{
                                fontSize: '12px',
                                color: '#494E5C',
                                background: '#F5F6F8',
                                padding: '4px 8px',
                                borderRadius: '4px',
                              }}>
                                {passenger.seat} ({passenger.type})
                              </span>
                              <span style={{ fontSize: '12px', fontWeight: 500, color: '#1C1213' }}>
                                INR {passenger.price}
                              </span>
                            </div>
                          </div>
                        ))}
                        <button
                          style={{
                            marginTop: '8px',
                            padding: '8px 16px',
                            background: 'transparent',
                            border: `1px solid rgb(${brandColor})`,
                            borderRadius: '8px',
                            color: `rgb(${brandColor})`,
                            fontSize: '12px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            width: '100%',
                          }}
                        >
                          Modify Seat
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Booking Summary */}
                  <div
                    style={{
                      background: 'white',
                      borderRadius: '12px',
                      padding: '16px',
                      marginBottom: '100px',
                      boxShadow: '0px 1px 3px rgba(30, 41, 59, 0.1)',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '16px',
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="4" width="20" height="16" rx="2" stroke={`rgb(${brandColor})`} strokeWidth="1.5"/>
                        <path d="M2 10H22" stroke={`rgb(${brandColor})`} strokeWidth="1.5"/>
                      </svg>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#1C1213' }}>Booking Summary</span>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}>
                        <span style={{ fontSize: '12px', color: '#777' }}>DEL → SFO (Round trip)</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '4px',
                      }}>
                        <span style={{ fontSize: '12px', color: '#494E5C' }}>Base Fare × 3</span>
                        <span style={{ fontSize: '12px', fontWeight: 500, color: '#1C1213' }}>INR 65,072</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '4px',
                      }}>
                        <span style={{ fontSize: '12px', color: '#494E5C' }}>Seat Selection × 3</span>
                        <span style={{ fontSize: '12px', fontWeight: 500, color: '#1C1213' }}>INR 100</span>
                      </div>
                    </div>

                    <div style={{
                      height: '1px',
                      background: '#EDEEF1',
                      margin: '12px 0',
                    }} />

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#1C1213' }}>Subtotal</span>
                      <span style={{ fontSize: '16px', fontWeight: 700, color: `rgb(${brandColor})` }}>INR 65,172</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'white',
                    borderTop: '1px solid #EDEEF1',
                    padding: '12px 16px',
                    paddingBottom: '28px',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                  }}>
                    <div>
                      <div style={{ fontSize: '10px', color: '#777' }}>Total (Round trip × 3)</div>
                      <div style={{ fontSize: '11px', color: '#777' }}>Including taxes & fees</div>
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: `rgb(${brandColor})` }}>
                      INR 1,30,414
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      style={{
                        flex: 1,
                        padding: '14px',
                        background: 'transparent',
                        border: '1px solid #D3D6DB',
                        borderRadius: '12px',
                        fontSize: '12px',
                        color: '#494E5C',
                        cursor: 'pointer',
                      }}
                    >
                      Booking details
                    </button>
                    <button
                      onClick={resetDemo}
                      style={{
                        flex: 2,
                        padding: '14px',
                        background: `rgb(${brandColor})`,
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      Confirm & pay
                    </button>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 28,
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: '8px',
                  }}
                >
                  <div
                    style={{
                      width: 134,
                      height: 5,
                      background: '#1C1213',
                      borderRadius: '100px',
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
});

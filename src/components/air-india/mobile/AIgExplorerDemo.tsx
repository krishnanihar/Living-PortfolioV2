'use client';

import React, { useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Mic, Send, Plus, X, Minus, RotateCcw, Heart, Plane } from 'lucide-react';

export interface DemoHandle {
  triggerAction: () => void;
  reset: () => void;
}

interface AIgExplorerDemoProps {
  brandColor?: string;
}

interface Message {
  id: number;
  type: 'user' | 'ai';
  text: string;
  timestamp: string;
  cardType?: 'flight-status' | 'destination' | null;
}

// AI.g Avatar image
const AI_AVATAR = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face';

// Destination images
const DUBAI_IMG = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=200&fit=crop';
const KOCHI_IMG = 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=200&fit=crop';
const FORT_KOCHI_IMG = 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=200&h=150&fit=crop';
const CHINESE_NETS_IMG = 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=200&h=150&fit=crop';

/**
 * AI.g Explorer Demo - Air India's Generative AI Virtual Agent
 * World's first airline Gen AI chatbot - Matches Figma design exactly
 * 7M+ queries handled, 97% automation rate
 */
const DEVICE_WIDTH = 375;
const DEVICE_HEIGHT = 812;
const BEZEL_WIDTH = 12;

// Topic data with responses
const topics = [
  {
    id: 'baggage',
    label: 'Baggage Allowance',
    icon: 'baggage',
    isNew: false,
    userQuery: "What's my baggage allowance for my Delhi to London flight?",
    aiResponse: "For your DEL-LHR flight on AI 111, your Business Class ticket includes:\n\n✈️ Cabin: 2 bags × 12kg each\n🧳 Check-in: 2 bags × 32kg each\n\nTotal: 88kg allowance. Would you like to add extra baggage? I can help with that too!",
    cardType: null,
  },
  {
    id: 'booking',
    label: 'Booking',
    icon: 'booking',
    isNew: false,
    userQuery: 'Can you help me change my seat to a window?',
    aiResponse: "I found your booking! You're currently in 12C (aisle). Available window seats:\n\n🪟 12A - Window, extra legroom\n🪟 14A - Window, near exit\n🪟 18A - Window, quiet zone\n\nWould you like me to move you to 12A with extra legroom? No additional charge for Business Class!",
    cardType: null,
  },
  {
    id: 'flight',
    label: 'Flight Status',
    icon: 'flight',
    isNew: true,
    userQuery: 'What is the status of my flight AI 915 to Dubai?',
    aiResponse: '',
    cardType: 'flight-status' as const,
  },
  {
    id: 'refund',
    label: 'Refund',
    icon: 'refund',
    isNew: false,
    userQuery: 'My flight was cancelled. Can I get a refund?',
    aiResponse: "I'm sorry about the cancellation. Here are your options:\n\n1️⃣ Full refund to original payment method (5-7 business days)\n2️⃣ Travel credit + 10% bonus for future booking\n3️⃣ Rebook on next available flight (no additional cost)\n\nI can process any of these immediately. Which would you prefer?",
    cardType: null,
  },
  {
    id: 'inspirations',
    label: 'Inspirations',
    icon: 'travel',
    isNew: false,
    userQuery: 'Tell me about Kochi as a travel destination',
    aiResponse: '',
    cardType: 'destination' as const,
  },
];

// Flight Status Card Component
function FlightStatusCard({ brandColor }: { brandColor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
    >
      {/* Hero Card with Dubai */}
      <div
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0px 1px 3px rgba(30, 41, 59, 0.1), 0px 1px 2px rgba(30, 41, 59, 0.05)',
        }}
      >
        {/* Hero Image */}
        <div
          style={{
            height: '110px',
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%), url("${DUBAI_IMG}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '12px',
          }}
        >
          <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '12px', fontWeight: '700', color: 'white' }}>
            Flight Status to
          </span>
          <span style={{ fontFamily: "'Air India Variable', sans-serif", fontSize: '18px', fontWeight: '700', color: 'white', textTransform: 'uppercase' }}>
            Dubai
          </span>
        </div>

        {/* Flight Info */}
        <div style={{ background: 'white', padding: '12px' }}>
          {/* Flight Number & Status */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '14px', height: '14px', background: `rgb(${brandColor})`, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plane size={8} style={{ color: 'white', transform: 'rotate(45deg)' }} />
              </div>
              <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '12px', fontWeight: '600', color: '#1C1213' }}>AI 915</span>
              <span style={{ color: '#D3D6DB' }}>|</span>
              <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '12px', fontWeight: '600', color: '#1C1213' }}>Airbus 308</span>
            </div>
            <div style={{ background: '#2AA646', padding: '4px 6px', borderRadius: '6px' }}>
              <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '12px', fontWeight: '700', color: 'white' }}>In Flight</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: '#EDEEF1', marginBottom: '12px' }} />

          {/* Departure */}
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '10px', fontWeight: '700', color: '#777', textTransform: 'uppercase', letterSpacing: '0.1px' }}>
              Departure
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span style={{ fontFamily: "'Air India Variable', sans-serif", fontSize: '18px', color: '#0E4688', textDecoration: 'line-through' }}>23:45</span>
              <span style={{ fontFamily: "'Air India Variable', sans-serif", fontSize: '18px', fontWeight: '700', color: `rgb(${brandColor})` }}>00:15</span>
              <div style={{ background: `rgb(${brandColor})`, padding: '4px 6px', borderRadius: '6px' }}>
                <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '12px', fontWeight: '700', color: 'white' }}>30min</span>
              </div>
            </div>
            <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '10px', fontWeight: '600', color: '#777', marginTop: '4px' }}>27 Oct 2023</div>
          </div>

          <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '14px', fontWeight: '700', color: '#1C1213', marginBottom: '4px' }}>
            Cochin International Airport (COK)
          </div>
          <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '12px', fontWeight: '700', color: '#777' }}>
            Terminal 3 | Gate A5
          </div>
        </div>
      </div>

      {/* Duration Badge */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: '#D1E3FF', padding: '4px 8px', borderRadius: '6px' }}>
          <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '12px', fontWeight: '600', color: '#1F2B34' }}>03 h 15 m</span>
        </div>
      </div>

      {/* Arrival Card */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '12px', boxShadow: '0px 1px 3px rgba(30, 41, 59, 0.1)' }}>
        <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '10px', fontWeight: '700', color: '#777', textTransform: 'uppercase' }}>
          Arrival
        </span>
        <div style={{ fontFamily: "'Air India Variable', sans-serif", fontSize: '18px', fontWeight: '700', color: '#0E4688', marginTop: '4px' }}>04:30</div>
        <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '10px', fontWeight: '600', color: '#777', marginTop: '4px' }}>28 Oct 2023</div>
        <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '14px', fontWeight: '700', color: '#1C1213', marginTop: '8px' }}>
          Dubai International Airport (DXB)
        </div>
        <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '12px', fontWeight: '700', color: '#777', marginTop: '4px' }}>
          Terminal 3 | Gate N/A
        </div>
      </div>

      {/* Additional Info Card */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '12px', boxShadow: '0px 1px 3px rgba(30, 41, 59, 0.1)' }}>
        <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '14px', color: '#000', marginBottom: '4px' }}>
          This flight is coming from:
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '12px', fontWeight: '700', color: '#1F2B34' }}>Mumbai</span>
          <div style={{ width: '14px', height: '14px', background: `rgb(${brandColor})`, borderRadius: '4px' }} />
          <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '12px', fontWeight: '700', color: '#1F2B34' }}>AI 915 | VT-ALF</span>
        </div>
        <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '12px', fontWeight: '600', color: '#626773', marginTop: '8px' }}>
          Expected arrival time at Delhi: 23:05 hrs
        </div>
        <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '12px', fontWeight: '600', color: '#626773' }}>
          Status: ON TIME
        </div>
        <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '12px', fontWeight: '600', color: '#626773', marginTop: '8px' }}>
          Last updated on 14 Oct 2023, 09:15:45
        </div>
      </div>
    </motion.div>
  );
}

// Food images for Kochi
const KERALA_SADYA_IMG = 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=200&h=150&fit=crop';
const APPAM_IMG = 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200&h=150&fit=crop';

// Shopping images for Kochi
const SPICE_MARKET_IMG = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=150&fit=crop';
const HANDICRAFTS_IMG = 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=200&h=150&fit=crop';

// Destination Inspiration Card Component
function DestinationCard({ brandColor }: { brandColor: string }) {
  const [activeTab, setActiveTab] = useState('things');

  const thingsToDo = [
    { name: 'Explore Fort Kochi', desc: 'Wander through the charming streets of Fort Kochi, known for its colonial architecture and vibrant art scene.', image: FORT_KOCHI_IMG },
    { name: 'Chinese Fishing Nets', desc: 'Head to the waterfront and watch the iconic Chinese fishing nets in action.', image: CHINESE_NETS_IMG },
  ];

  const foodToEat = [
    { name: 'Kerala Sadya', desc: 'Traditional vegetarian feast served on banana leaf with over 20 dishes including sambar and payasam.', image: KERALA_SADYA_IMG },
    { name: 'Appam & Stew', desc: 'Fluffy rice hoppers paired with creamy coconut-based vegetable or chicken stew.', image: APPAM_IMG },
  ];

  const shopping = [
    { name: 'Spice Markets', desc: 'Visit the aromatic spice markets of Mattancherry for cardamom, pepper, and cinnamon.', image: SPICE_MARKET_IMG },
    { name: 'Local Handicrafts', desc: 'Shop for traditional Kerala handicrafts, coir products, and handloom textiles.', image: HANDICRAFTS_IMG },
  ];

  const getActiveContent = () => {
    switch (activeTab) {
      case 'food':
        return foodToEat;
      case 'shopping':
        return shopping;
      default:
        return thingsToDo;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
    >
      {/* Hero Card */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '12px', boxShadow: '0px 1px 3px rgba(30, 41, 59, 0.1)' }}>
        {/* Hero Image */}
        <div
          style={{
            height: '144px',
            borderRadius: '12px',
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 26%, rgba(0,0,0,0.52) 100%), url("${KOCHI_IMG}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '12px',
            marginBottom: '8px',
          }}
        >
          <span style={{ fontFamily: "'Air India Variable', sans-serif", fontSize: '18px', fontWeight: '700', color: 'white', textTransform: 'uppercase' }}>
            Kochi
          </span>
        </div>

        {/* Description */}
        <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '16px', fontWeight: '400', color: '#626773', lineHeight: 1.4, margin: 0 }}>
          Kochi, also known as Cochin, is a vibrant city in southwestern India, famous for its rich history, diverse culture, and scenic landscapes.
        </p>
      </div>

      {/* Tab Bar */}
      <div style={{ background: '#F7F8F8', borderRadius: '4px', padding: '2px', display: 'flex' }}>
        {[
          { id: 'things', label: 'Things to Do' },
          { id: 'food', label: 'Food to Eat' },
          { id: 'shopping', label: 'Shopping' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '10px 12px',
              background: activeTab === tab.id ? 'white' : 'transparent',
              border: 'none',
              borderRadius: '4px',
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: '14px',
              fontWeight: activeTab === tab.id ? '700' : '400',
              color: activeTab === tab.id ? `rgb(${brandColor})` : '#494E5C',
              cursor: 'pointer',
              boxShadow: activeTab === tab.id ? '0px 1px 3px rgba(30, 41, 59, 0.1)' : 'none',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Activity Cards - Horizontal Scroll */}
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
        {getActiveContent().map((item) => (
          <div
            key={item.name}
            style={{
              minWidth: '200px',
              background: 'white',
              borderRadius: '16px',
              padding: '12px',
              boxShadow: '0px 1px 3px rgba(30, 41, 59, 0.1)',
              position: 'relative',
            }}
          >
            {/* Favorite Button */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(2px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Heart size={16} style={{ color: 'white' }} />
            </div>

            {/* Image */}
            <div
              style={{
                height: '130px',
                borderRadius: '10px',
                backgroundImage: `url("${item.image}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '8px',
              }}
            />

            {/* Content */}
            <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '16px', fontWeight: '600', color: '#383C42', marginBottom: '8px' }}>
              {item.name}
            </div>
            <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '14px', fontWeight: '400', color: '#626773', lineHeight: 1.4 }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export const AIgExplorerDemo = forwardRef<DemoHandle, AIgExplorerDemoProps>(function AIgExplorerDemo({ brandColor = '218, 14, 41' }, ref) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showCard, setShowCard] = useState<'flight-status' | 'destination' | null>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 100);
  }, []);

  const handleTopicClick = useCallback((topic: typeof topics[0]) => {
    if (isTyping) return;

    setSelectedTopic(topic.id);
    setShowCard(null);

    // Add user message
    const userMsg: Message = {
      id: Date.now(),
      type: 'user',
      text: topic.userQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    scrollToBottom();

    // Show typing indicator
    setTimeout(() => {
      setIsTyping(true);
      scrollToBottom();
    }, 300);

    // Add AI response
    setTimeout(() => {
      setIsTyping(false);

      if (topic.cardType) {
        // Show rich card
        setShowCard(topic.cardType);
        scrollToBottom();
      } else {
        // Show text response
        const aiMsg: Message = {
          id: Date.now() + 1,
          type: 'ai',
          text: topic.aiResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, aiMsg]);
        scrollToBottom();
      }
    }, 2000);
  }, [isTyping, scrollToBottom]);

  const resetDemo = useCallback(() => {
    setMessages([]);
    setSelectedTopic(null);
    setIsTyping(false);
    setShowCard(null);
  }, []);

  useImperativeHandle(ref, () => ({
    triggerAction: () => handleTopicClick(topics[2]),
    reset: () => resetDemo(),
  }), [handleTopicClick, resetDemo]);

  const hasConversation = messages.length > 0;

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
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F9F6EE 44.5%, #F8C1B4 100%)',
          }}
        >
          {/* Status Bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 54,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 20px',
              zIndex: 100,
            }}
          >
            {/* Time */}
            <div
              style={{
                fontFamily: "'SF Pro', -apple-system, sans-serif",
                fontSize: '17px',
                fontWeight: '600',
                color: '#000',
                width: '54px',
              }}
            >
              1:47
            </div>

            {/* Dynamic Island */}
            <div
              style={{
                width: '126px',
                height: '37px',
                background: '#000',
                borderRadius: '100px',
              }}
            />

            {/* Status Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                <rect x="0" y="8" width="3" height="4" rx="0.5" fill="#000"/>
                <rect x="4" y="5" width="3" height="7" rx="0.5" fill="#000"/>
                <rect x="8" y="3" width="3" height="9" rx="0.5" fill="#000"/>
                <rect x="12" y="0" width="3" height="12" rx="0.5" fill="#000"/>
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M8 2.5C10.5 2.5 12.7 3.5 14.3 5.1L15.7 3.7C13.7 1.7 11 0.5 8 0.5C5 0.5 2.3 1.7 0.3 3.7L1.7 5.1C3.3 3.5 5.5 2.5 8 2.5ZM8 6.5C9.4 6.5 10.7 7.1 11.6 8L13 6.6C11.7 5.3 9.9 4.5 8 4.5C6.1 4.5 4.3 5.3 3 6.6L4.4 8C5.3 7.1 6.6 6.5 8 6.5ZM8 10.5C8.8 10.5 9.5 10.8 10 11.3L8 13.5L6 11.3C6.5 10.8 7.2 10.5 8 10.5Z" fill="#000"/>
              </svg>
              <svg width="27" height="14" viewBox="0 0 27 14" fill="none">
                <rect x="0.5" y="0.5" width="23" height="13" rx="3" stroke="#000" strokeOpacity="0.35"/>
                <rect x="2" y="2" width="20" height="10" rx="2" fill="#000"/>
                <path d="M25 4.5V9.5C26 9 26.5 7.5 26.5 7C26.5 6.5 26 5 25 4.5Z" fill="#000" fillOpacity="0.4"/>
              </svg>
            </div>
          </div>

          {/* Main Scrollable Content */}
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
              top: 54,
              left: 0,
              right: 0,
              bottom: 90,
              overflow: 'auto',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
              padding: '0 24px',
              touchAction: 'pan-y',
            }}
          >
            {/* Header - AI.g Branding */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '2px',
                marginBottom: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid #FED9A0',
                  }}
                >
                  <img
                    src={AI_AVATAR}
                    alt="AI.g"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span
                    style={{
                      fontFamily: "'Air India Variable', sans-serif",
                      fontWeight: '700',
                      fontSize: '15px',
                      background: 'linear-gradient(90deg, #DA0E29 0%, #531251 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: '16px',
                    }}
                  >
                    Ask
                  </span>
                  <span
                    style={{
                      fontFamily: "'Air India Variable', sans-serif",
                      fontWeight: '700',
                      fontSize: '24px',
                      background: 'linear-gradient(90deg, #DA0E29 0%, #531251 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: '30px',
                    }}
                  >
                    AI.g
                  </span>
                </div>
              </div>

              {/* Header Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {hasConversation && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={resetDemo}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <RotateCcw size={14} style={{ color: `rgb(${brandColor})` }} />
                  </motion.div>
                )}
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Minus size={12} style={{ color: '#1C1213' }} />
                </div>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={14} style={{ color: '#1C1213' }} />
                </div>
              </div>
            </div>

            {/* Chat Content */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {/* Small Avatar */}
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '0.27px solid #FED9A0',
                  flexShrink: 0,
                }}
              >
                <img
                  src={AI_AVATAR}
                  alt="AI.g"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Message and Topics */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Welcome Message Card */}
                <div
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '12px',
                    boxShadow: '0px 1px 3px rgba(30, 41, 59, 0.1), 0px 1px 2px rgba(30, 41, 59, 0.05)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Nunito Sans', -apple-system, sans-serif",
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#383C42',
                      lineHeight: 1.4,
                      letterSpacing: '0.08px',
                      margin: 0,
                    }}
                  >
                    Greetings! I'm AI.g
                    <br />
                    I'm here to answer any questions you may have about travelling with Air India. Talk to me in English, French, German, or Hindi.
                    <br /><br />
                    Choose one of these popular topics or type your question below. You can also chat with me on WhatsApp:{' '}
                    <a
                      href="https://wa.me/919667034444?text=Hi"
                      style={{
                        color: '#2160C7',
                        textDecoration: 'underline',
                      }}
                    >
                      +91 96670 34444
                    </a>
                    .
                  </p>
                  <div
                    style={{
                      fontFamily: "'Nunito Sans', -apple-system, sans-serif",
                      fontSize: '10px',
                      fontWeight: '600',
                      color: '#828A99',
                      marginTop: '8px',
                      textAlign: 'right',
                    }}
                  >
                    02:01 PM
                  </div>
                </div>

                {/* Topic Chips */}
                <AnimatePresence>
                  {!hasConversation && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                    >
                      {topics.map((topic) => (
                        <motion.div
                          key={topic.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleTopicClick(topic)}
                          style={{
                            background: 'white',
                            border: topic.isNew ? '1px solid #5B092B' : '1px solid #D3D6DB',
                            borderRadius: '16px',
                            padding: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            transition: 'box-shadow 0.2s',
                          }}
                        >
                          {/* Icon */}
                          <div
                            style={{
                              width: '16px',
                              height: '16px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {topic.icon === 'baggage' && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <rect x="4" y="2" width="8" height="12" rx="1" stroke="#383C42" strokeWidth="1.2"/>
                                <path d="M6 2V1C6 0.5 6.5 0 7 0H9C9.5 0 10 0.5 10 1V2" stroke="#383C42" strokeWidth="1.2"/>
                                <line x1="6" y1="5" x2="10" y2="5" stroke="#383C42" strokeWidth="1.2"/>
                              </svg>
                            )}
                            {topic.icon === 'booking' && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <rect x="2" y="3" width="12" height="11" rx="1" stroke="#383C42" strokeWidth="1.2"/>
                                <path d="M5 1V4M11 1V4" stroke="#383C42" strokeWidth="1.2"/>
                                <line x1="2" y1="7" x2="14" y2="7" stroke="#383C42" strokeWidth="1.2"/>
                              </svg>
                            )}
                            {topic.icon === 'flight' && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 2L4 8L2 8L8 14L9 12L8 8L12 8L14 6L8 2Z" stroke="#383C42" strokeWidth="1.2" strokeLinejoin="round"/>
                              </svg>
                            )}
                            {topic.icon === 'refund' && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="6" stroke="#383C42" strokeWidth="1.2"/>
                                <path d="M8 4V9L5 11" stroke="#383C42" strokeWidth="1.2" strokeLinecap="round"/>
                              </svg>
                            )}
                            {topic.icon === 'travel' && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="6" stroke="#383C42" strokeWidth="1.2"/>
                                <ellipse cx="8" cy="8" rx="3" ry="6" stroke="#383C42" strokeWidth="1.2"/>
                                <line x1="2" y1="8" x2="14" y2="8" stroke="#383C42" strokeWidth="1.2"/>
                              </svg>
                            )}
                          </div>

                          {/* Label */}
                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span
                              style={{
                                fontFamily: "'Nunito Sans', -apple-system, sans-serif",
                                fontSize: '14px',
                                fontWeight: '700',
                                color: '#383C42',
                                lineHeight: 1.4,
                              }}
                            >
                              {topic.label}
                            </span>
                            {topic.isNew && (
                              <span
                                style={{
                                  background: `linear-gradient(90deg, rgb(${brandColor}) 0%, #531251 100%)`,
                                  color: 'white',
                                  fontFamily: "'Air India', sans-serif",
                                  fontSize: '8px',
                                  fontWeight: '700',
                                  padding: '2px 4px',
                                  borderRadius: '2px',
                                  letterSpacing: '0.032px',
                                }}
                              >
                                NEW
                              </span>
                            )}
                          </div>

                          <ChevronRight size={24} style={{ color: '#828A99' }} />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Conversation Messages */}
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        display: 'flex',
                        flexDirection: msg.type === 'user' ? 'row-reverse' : 'row',
                        gap: '8px',
                        marginLeft: msg.type === 'user' ? 'auto' : 0,
                        maxWidth: msg.type === 'user' ? '85%' : '100%',
                      }}
                    >
                      <div
                        style={{
                          padding: '12px',
                          borderRadius: msg.type === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                          background: msg.type === 'user' ? '#1A1A1A' : 'white',
                          color: msg.type === 'user' ? 'white' : '#383C42',
                          boxShadow: msg.type === 'ai' ? '0px 1px 3px rgba(30, 41, 59, 0.1)' : 'none',
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'Nunito Sans', -apple-system, sans-serif",
                            fontSize: '14px',
                            fontWeight: '400',
                            lineHeight: 1.5,
                            margin: 0,
                            whiteSpace: 'pre-line',
                          }}
                        >
                          {msg.text}
                        </p>
                        <div
                          style={{
                            fontFamily: "'Nunito Sans', -apple-system, sans-serif",
                            fontSize: '10px',
                            fontWeight: '600',
                            color: msg.type === 'user' ? 'rgba(255,255,255,0.5)' : '#828A99',
                            marginTop: '6px',
                            textAlign: 'right',
                          }}
                        >
                          {msg.timestamp}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{
                        background: 'white',
                        borderRadius: '16px 16px 16px 4px',
                        padding: '14px 18px',
                        boxShadow: '0px 1px 3px rgba(30, 41, 59, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        width: 'fit-content',
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: `rgb(${brandColor})`,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Rich Response Cards */}
                <AnimatePresence>
                  {showCard === 'flight-status' && <FlightStatusCard brandColor={brandColor} />}
                  {showCard === 'destination' && <DestinationCard brandColor={brandColor} />}
                </AnimatePresence>

                {/* Try Another Topic (after conversation) */}
                <AnimatePresence>
                  {hasConversation && !isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginTop: '8px',
                      }}
                    >
                      {topics
                        .filter((t) => t.id !== selectedTopic)
                        .slice(0, 3)
                        .map((topic) => (
                          <motion.button
                            key={topic.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleTopicClick(topic)}
                            style={{
                              padding: '8px 12px',
                              background: 'white',
                              border: '1px solid #D3D6DB',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '600',
                              color: '#383C42',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            {topic.label}
                            {topic.isNew && (
                              <span
                                style={{
                                  background: `linear-gradient(90deg, rgb(${brandColor}) 0%, #531251 100%)`,
                                  color: 'white',
                                  fontSize: '7px',
                                  fontWeight: '700',
                                  padding: '1px 3px',
                                  borderRadius: '2px',
                                }}
                              >
                                NEW
                              </span>
                            )}
                          </motion.button>
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={chatEndRef} style={{ height: '20px' }} />
              </div>
            </div>
          </div>

          {/* Bottom Input Area */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '90px',
              background: 'white',
              borderTop: '1px solid #D3D6DB',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={24} style={{ color: '#383C42' }} />
                </div>
                <span
                  style={{
                    fontFamily: "'Nunito Sans', -apple-system, sans-serif",
                    fontSize: '16px',
                    fontWeight: '400',
                    color: '#B0B5BF',
                    lineHeight: 1.4,
                  }}
                >
                  Ask anything...
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '0 16px' }}>
                <Mic size={24} style={{ color: '#383C42', cursor: 'pointer' }} />
                <Send size={24} style={{ color: `rgb(${brandColor})`, cursor: 'pointer' }} />
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                paddingBottom: '8px',
              }}
            >
              {['My Skills', 'T&C', 'Feedback'].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontFamily: "'Nunito Sans', -apple-system, sans-serif",
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#3174E0',
                    textDecoration: 'underline',
                    lineHeight: 1.4,
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

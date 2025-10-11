'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Camera, Activity, Settings, ChevronLeft,
  TrendingUp, Calendar, Heart, FileText, Award,
  Check, X, Info
} from 'lucide-react';

type Screen = 'home' | 'photo' | 'pasi' | 'meds' | 'mental' | 'triggers' | 'report' | 'settings';

export function PsoriAssistPhoneMockup() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [photoOpacity, setPhotoOpacity] = useState(50);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [medicationChecked, setMedicationChecked] = useState([false, false, false]);
  const [streak, setStreak] = useState(14);
  const [showPasiResult, setShowPasiResult] = useState(false);
  const [compareSlider, setCompareSlider] = useState(50);

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setShowPasiResult(true);
        setActiveScreen('pasi');
      }, 2000);
    }, 500);
  };

  const handleMedicationCheck = (index: number) => {
    const newChecked = [...medicationChecked];
    newChecked[index] = !newChecked[index];
    setMedicationChecked(newChecked);

    if (newChecked[index] && newChecked.every(c => c)) {
      setStreak(streak + 1);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '4rem 2rem',
      position: 'relative'
    }}>
      {/* iPhone 14 Pro Mockup Frame */}
      <div style={{
        width: '393px',
        height: '852px',
        backgroundColor: '#1a1a1a',
        borderRadius: '60px',
        padding: '14px',
        boxShadow: '0 40px 80px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Screen Container */}
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#0A0A0A',
          borderRadius: '48px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Status Bar */}
          <div style={{
            height: '54px',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, transparent 100%)',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            paddingTop: '8px'
          }}>
            <div style={{ fontSize: '15px', fontWeight: '600', color: 'white' }}>
              9:41
            </div>
            {/* Dynamic Island */}
            <div style={{
              width: '126px',
              height: '37px',
              backgroundColor: 'black',
              borderRadius: '20px',
              position: 'absolute',
              top: '11px',
              left: '50%',
              transform: 'translateX(-50%)'
            }} />
            <div style={{ fontSize: '15px', color: 'white', display: 'flex', gap: '6px' }}>
              <span>100%</span>
              <span>●</span>
            </div>
          </div>

          {/* Screen Content */}
          <div style={{
            position: 'absolute',
            inset: '54px 0 0 0',
            overflow: 'auto',
            paddingBottom: '90px'
          }}>
            <AnimatePresence mode="wait">
              {activeScreen === 'home' && <HomeScreen setActiveScreen={setActiveScreen} streak={streak} />}
              {activeScreen === 'photo' && (
                <PhotoScreen
                  setActiveScreen={setActiveScreen}
                  photoOpacity={photoOpacity}
                  setPhotoOpacity={setPhotoOpacity}
                  onCapture={handleCapture}
                  isCapturing={isCapturing}
                  isProcessing={isProcessing}
                />
              )}
              {activeScreen === 'pasi' && (
                <PasiResultScreen
                  setActiveScreen={setActiveScreen}
                  compareSlider={compareSlider}
                  setCompareSlider={setCompareSlider}
                />
              )}
              {activeScreen === 'meds' && (
                <MedicationScreen
                  setActiveScreen={setActiveScreen}
                  medicationChecked={medicationChecked}
                  onCheck={handleMedicationCheck}
                  streak={streak}
                />
              )}
              {activeScreen === 'mental' && <MentalHealthScreen setActiveScreen={setActiveScreen} />}
              {activeScreen === 'triggers' && <TriggerScreen setActiveScreen={setActiveScreen} />}
              {activeScreen === 'report' && <ReportScreen setActiveScreen={setActiveScreen} />}
              {activeScreen === 'settings' && <SettingsScreen setActiveScreen={setActiveScreen} />}
            </AnimatePresence>
          </div>

          {/* Tab Bar */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '90px',
            backgroundColor: 'rgba(20, 20, 20, 0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            padding: '12px 0 24px'
          }}>
            <TabBarItem
              icon={Home}
              label="Home"
              active={activeScreen === 'home'}
              onClick={() => setActiveScreen('home')}
            />
            <TabBarItem
              icon={Camera}
              label="Track"
              active={activeScreen === 'photo'}
              onClick={() => setActiveScreen('photo')}
            />
            <TabBarItem
              icon={Activity}
              label="Insights"
              active={activeScreen === 'triggers'}
              onClick={() => setActiveScreen('triggers')}
            />
            <TabBarItem
              icon={Settings}
              label="More"
              active={activeScreen === 'settings'}
              onClick={() => setActiveScreen('settings')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Screen Components

function HomeScreen({ setActiveScreen, streak }: { setActiveScreen: (s: Screen) => void; streak: number }) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '24px 20px' }}
    >
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)' }}>
          Welcome back, Alex
        </p>
      </div>

      {/* PASI Score Card */}
      <div style={{
        padding: '24px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.15), rgba(168, 85, 247, 0.15))',
        border: '1px solid rgba(74, 144, 226, 0.3)',
        marginBottom: '20px'
      }}>
        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
          Current PASI Score
        </div>
        <div style={{ fontSize: '48px', fontWeight: '700', color: 'rgb(74, 144, 226)', marginBottom: '12px' }}>
          12.4
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <TrendingUp size={16} color="rgb(80, 200, 120)" />
          <span style={{ fontSize: '14px', color: 'rgb(80, 200, 120)', fontWeight: '600' }}>
            ↓ 18% from last month
          </span>
        </div>
        {/* Mini Chart */}
        <div style={{ height: '60px', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
          {[65, 55, 58, 52, 48, 45, 42].map((height, i) => (
            <div key={i} style={{
              flex: 1,
              height: `${height}%`,
              backgroundColor: 'rgba(74, 144, 226, 0.5)',
              borderRadius: '4px 4px 0 0'
            }} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '12px' }}>
          Quick Actions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <QuickActionButton
            icon={Camera}
            label="Photo"
            color="74, 144, 226"
            onClick={() => setActiveScreen('photo')}
          />
          <QuickActionButton
            icon={Check}
            label="Meds"
            color="80, 200, 120"
            onClick={() => setActiveScreen('meds')}
          />
          <QuickActionButton
            icon={Heart}
            label="Check-in"
            color="236, 72, 153"
            onClick={() => setActiveScreen('mental')}
          />
        </div>
      </div>

      {/* Streak Card */}
      <div style={{
        padding: '20px',
        borderRadius: '20px',
        backgroundColor: 'rgba(80, 200, 120, 0.1)',
        border: '1px solid rgba(80, 200, 120, 0.2)',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>
              Current Streak
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: 'rgb(80, 200, 120)' }}>
              {streak} days
            </div>
          </div>
          <Award size={48} color="rgb(80, 200, 120)" />
        </div>
        <div style={{
          marginTop: '12px',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.5)',
          fontStyle: 'italic'
        }}>
          Keep it up! 16 days until your next milestone 🎉
        </div>
      </div>

      {/* Upcoming Appointment */}
      <div style={{
        padding: '20px',
        borderRadius: '20px',
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        border: '1px solid rgba(251, 191, 36, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Calendar size={20} color="rgb(251, 191, 36)" />
          <span style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>
            Upcoming Appointment
          </span>
        </div>
        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
          Dr. Sarah Johnson • Friday, Oct 25 at 2:30 PM
        </div>
        <button
          onClick={() => setActiveScreen('report')}
          style={{
            marginTop: '12px',
            padding: '10px 16px',
            borderRadius: '12px',
            backgroundColor: 'rgba(251, 191, 36, 0.2)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            color: 'rgb(251, 191, 36)',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Prepare Report →
        </button>
      </div>
    </motion.div>
  );
}

function PhotoScreen({
  setActiveScreen,
  photoOpacity,
  setPhotoOpacity,
  onCapture,
  isCapturing,
  isProcessing
}: {
  setActiveScreen: (s: Screen) => void;
  photoOpacity: number;
  setPhotoOpacity: (n: number) => void;
  onCapture: () => void;
  isCapturing: boolean;
  isProcessing: boolean;
}) {
  return (
    <motion.div
      key="photo"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.3 }}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <button
          onClick={() => setActiveScreen('home')}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={20} color="white" />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white' }}>
          Photo Tracking
        </h2>
      </div>

      {/* Camera View */}
      <div style={{
        flex: 1,
        position: 'relative',
        backgroundColor: '#000',
        overflow: 'hidden'
      }}>
        {isProcessing ? (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 50
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid rgba(74, 144, 226, 0.3)',
              borderTop: '4px solid rgb(74, 144, 226)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '16px'
            }} />
            <style>
              {`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}
            </style>
            <div style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>
              Analyzing Photo...
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
              AI PASI scoring in progress
            </div>
          </div>
        ) : (
          <>
            {/* Ghost Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(236, 72, 153, 0.2))',
              opacity: photoOpacity / 100
            }}>
              <div style={{
                position: 'absolute',
                top: '40%',
                left: '30%',
                width: '140px',
                height: '100px',
                borderRadius: '40% 60% 50% 50%',
                backgroundColor: 'rgba(255, 200, 200, 0.5)',
                filter: 'blur(6px)'
              }} />
            </div>

            {/* Current View */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <motion.div
                animate={{
                  scale: isCapturing ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 0.5 }}
                style={{
                  width: '140px',
                  height: '100px',
                  borderRadius: '40% 60% 50% 50%',
                  backgroundColor: 'rgba(255, 180, 180, 0.7)',
                  filter: 'blur(3px)'
                }}
              />
            </div>

            {/* 3x3 Grid */}
            <div style={{
              position: 'absolute',
              inset: '10%',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
              gap: '1px'
            }}>
              {[...Array(9)].map((_, i) => (
                <div key={i} style={{
                  border: '1px dashed rgba(74, 144, 226, 0.4)'
                }} />
              ))}
            </div>

            {/* Opacity Control */}
            <div style={{
              position: 'absolute',
              bottom: '120px',
              left: '20px',
              right: '20px',
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.8)'
              }}>
                <span>Ghost Opacity</span>
                <span>{photoOpacity}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                value={photoOpacity}
                onChange={(e) => setPhotoOpacity(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'rgb(74, 144, 226)'
                }}
              />
            </div>

            {/* Capture Button */}
            <div style={{
              position: 'absolute',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onCapture}
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  border: '4px solid rgba(74, 144, 226, 0.5)',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}
              />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

function PasiResultScreen({
  setActiveScreen,
  compareSlider,
  setCompareSlider
}: {
  setActiveScreen: (s: Screen) => void;
  compareSlider: number;
  setCompareSlider: (n: number) => void;
}) {
  return (
    <motion.div
      key="pasi"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '16px 20px 24px' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveScreen('home')}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={20} color="white" />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white' }}>
          PASI Results
        </h2>
      </div>

      {/* Overall Score */}
      <div style={{
        padding: '24px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(80, 200, 120, 0.15), rgba(74, 144, 226, 0.15))',
        border: '1px solid rgba(80, 200, 120, 0.3)',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
          Overall PASI Score
        </div>
        <div style={{ fontSize: '56px', fontWeight: '700', color: 'rgb(80, 200, 120)', marginBottom: '8px' }}>
          12.4
        </div>
        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
          Moderate Severity
        </div>
      </div>

      {/* Breakdown */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '12px' }}>
          Breakdown
        </h3>
        <div style={{ display: 'grid', gap: '10px' }}>
          {[
            { label: 'Erythema (Redness)', value: 2.8, color: '239, 68, 68' },
            { label: 'Scaling', value: 3.1, color: '251, 191, 36' },
            { label: 'Thickness', value: 2.5, color: '168, 85, 247' },
            { label: 'Area Affected', value: 18, color: '74, 144, 226', suffix: '%' }
          ].map((item, i) => (
            <div key={i} style={{
              padding: '14px',
              borderRadius: '14px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{item.label}</span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: `rgb(${item.color})` }}>
                  {item.value}{item.suffix || '/4.0'}
                </span>
              </div>
              <div style={{
                height: '4px',
                borderRadius: '2px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${item.suffix ? item.value : (item.value / 4) * 100}%`,
                  height: '100%',
                  backgroundColor: `rgb(${item.color})`
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Before/After Comparison */}
      <div style={{
        padding: '16px',
        borderRadius: '16px',
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', marginBottom: '12px' }}>
          Compare: {compareSlider < 50 ? 'Before' : 'After'}
        </div>
        <div style={{
          height: '160px',
          borderRadius: '12px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '12px'
        }}>
          {/* Before Image */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(236, 72, 153, 0.3))'
          }} />
          {/* After Image */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(80, 200, 120, 0.3), rgba(74, 144, 226, 0.3))',
            clipPath: `inset(0 ${100 - compareSlider}% 0 0)`
          }} />
          {/* Slider Line */}
          <div style={{
            position: 'absolute',
            left: `${compareSlider}%`,
            top: 0,
            bottom: 0,
            width: '2px',
            backgroundColor: 'white',
            boxShadow: '0 0 10px rgba(255,255,255,0.5)'
          }} />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={compareSlider}
          onChange={(e) => setCompareSlider(Number(e.target.value))}
          style={{
            width: '100%',
            accentColor: 'rgb(74, 144, 226)'
          }}
        />
      </div>
    </motion.div>
  );
}

function MedicationScreen({
  setActiveScreen,
  medicationChecked,
  onCheck,
  streak
}: {
  setActiveScreen: (s: Screen) => void;
  medicationChecked: boolean[];
  onCheck: (i: number) => void;
  streak: number;
}) {
  return (
    <motion.div
      key="meds"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '16px 20px 24px' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveScreen('home')}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={20} color="white" />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white' }}>
          Medications
        </h2>
      </div>

      {/* Streak Card */}
      <div style={{
        padding: '20px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(80, 200, 120, 0.15), rgba(74, 144, 226, 0.15))',
        border: '1px solid rgba(80, 200, 120, 0.3)',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <Award size={48} color="rgb(80, 200, 120)" style={{ margin: '0 auto 12px' }} />
        <div style={{ fontSize: '42px', fontWeight: '700', color: 'rgb(80, 200, 120)', marginBottom: '4px' }}>
          {streak} Days
        </div>
        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
          Current Streak
        </div>
        <div style={{
          marginTop: '12px',
          padding: '8px',
          borderRadius: '8px',
          backgroundColor: 'rgba(80, 200, 120, 0.2)',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.8)'
        }}>
          🎉 Next milestone: 30 days (16 days to go!)
        </div>
      </div>

      {/* Today's Schedule */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '12px' }}>
          Today's Schedule
        </h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          {[
            { time: '8:30 AM', name: 'Clobetasol Cream', area: 'Elbows & Knees', index: 0 },
            { time: '12:00 PM', name: 'Vitamin D Supplement', area: '1 capsule', index: 1 },
            { time: '9:00 PM', name: 'Clobetasol Cream', area: 'Elbows & Knees', index: 2 }
          ].map((med, i) => (
            <div key={i} style={{
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: medicationChecked[med.index]
                ? 'rgba(80, 200, 120, 0.1)'
                : 'rgba(255,255,255,0.05)',
              border: medicationChecked[med.index]
                ? '1px solid rgba(80, 200, 120, 0.3)'
                : '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer'
            }}
            onClick={() => onCheck(med.index)}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '2px solid ' + (medicationChecked[med.index] ? 'rgb(80, 200, 120)' : 'rgba(255,255,255,0.3)'),
                backgroundColor: medicationChecked[med.index] ? 'rgb(80, 200, 120)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {medicationChecked[med.index] && <Check size={16} color="white" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '15px', fontWeight: '600', color: 'white', marginBottom: '2px' }}>
                  {med.name}
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                  {med.time} • {med.area}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Heatmap */}
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '12px' }}>
          Last 4 Weeks
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {[...Array(28)].map((_, i) => {
            const intensity = Math.random();
            return (
              <div key={i} style={{
                aspectRatio: '1',
                borderRadius: '4px',
                backgroundColor: intensity > 0.3
                  ? `rgba(80, 200, 120, ${0.3 + intensity * 0.5})`
                  : 'rgba(255,255,255,0.1)'
              }} />
            );
          })}
        </div>
        <div style={{
          marginTop: '8px',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'center'
        }}>
          89% adherence rate this month
        </div>
      </div>
    </motion.div>
  );
}

function MentalHealthScreen({ setActiveScreen }: { setActiveScreen: (s: Screen) => void }) {
  return (
    <motion.div
      key="mental"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '16px 20px 24px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveScreen('home')}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={20} color="white" />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white' }}>
          Wellness Check-in
        </h2>
      </div>

      <div style={{
        padding: '20px',
        borderRadius: '20px',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        border: '1px solid rgba(236, 72, 153, 0.2)',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <Heart size={40} color="rgb(236, 72, 153)" style={{ margin: '0 auto 12px' }} />
        <div style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>
          PHQ-9 Depression Screening
        </div>
        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5' }}>
          Quick 9-question assessment to track your mental health. All responses are private.
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div style={{
          padding: '16px',
          borderRadius: '16px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '12px'
        }}>
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
            Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?
          </div>
          <div style={{ display: 'grid', gap: '8px' }}>
            {['Not at all', 'Several days', 'More than half', 'Nearly every day'].map((option) => (
              <div key={option} style={{
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: '14px',
                color: 'white',
                cursor: 'pointer'
              }}>
                {option}
              </div>
            ))}
          </div>
        </div>

        <div style={{
          padding: '14px',
          borderRadius: '14px',
          backgroundColor: 'rgba(74, 144, 226, 0.1)',
          border: '1px solid rgba(74, 144, 226, 0.2)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px'
        }}>
          <Info size={20} color="rgb(74, 144, 226)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.5' }}>
            Your responses help identify if you may benefit from additional support. Results are shared only with your permission.
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TriggerScreen({ setActiveScreen }: { setActiveScreen: (s: Screen) => void }) {
  return (
    <motion.div
      key="triggers"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '16px 20px 24px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveScreen('home')}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={20} color="white" />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white' }}>
          Trigger Insights
        </h2>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '12px' }}>
          Likely Triggers
        </h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          {[
            { trigger: 'High Stress', confidence: 87, color: '239, 68, 68' },
            { trigger: 'Cold Weather', confidence: 76, color: '74, 144, 226' },
            { trigger: 'Missed Applications', confidence: 64, color: '251, 191, 36' }
          ].map((item, i) => (
            <div key={i} style={{
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: 'white' }}>
                  {item.trigger}
                </span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: `rgb(${item.color})` }}>
                  {item.confidence}%
                </span>
              </div>
              <div style={{
                height: '6px',
                borderRadius: '3px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${item.confidence}%`,
                  height: '100%',
                  backgroundColor: `rgb(${item.color})`
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        padding: '20px',
        borderRadius: '20px',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        border: '1px solid rgba(168, 85, 247, 0.2)'
      }}>
        <div style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '12px' }}>
          Correlation Chart
        </div>
        <div style={{
          height: '180px',
          borderRadius: '12px',
          backgroundColor: 'rgba(0,0,0,0.3)',
          position: 'relative',
          padding: '20px'
        }}>
          {/* Simple scatter plot visualization */}
          <div style={{ position: 'relative', height: '100%' }}>
            {[...Array(20)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: `${Math.random() * 90}%`,
                bottom: `${Math.random() * 90}%`,
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'rgba(168, 85, 247, 0.6)'
              }} />
            ))}
          </div>
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '20px',
            right: '20px',
            height: '1px',
            backgroundColor: 'rgba(255,255,255,0.2)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '20px',
            top: '20px',
            width: '1px',
            backgroundColor: 'rgba(255,255,255,0.2)'
          }} />
        </div>
        <div style={{
          marginTop: '12px',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.6)',
          textAlign: 'center'
        }}>
          Stress Level vs PASI Score (r = 0.72, p &lt; 0.001)
        </div>
      </div>
    </motion.div>
  );
}

function ReportScreen({ setActiveScreen }: { setActiveScreen: (s: Screen) => void }) {
  return (
    <motion.div
      key="report"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '16px 20px 24px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveScreen('home')}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={20} color="white" />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white' }}>
          Provider Report
        </h2>
      </div>

      <div style={{
        padding: '20px',
        borderRadius: '20px',
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        border: '1px solid rgba(74, 144, 226, 0.2)',
        marginBottom: '20px'
      }}>
        <FileText size={40} color="rgb(74, 144, 226)" style={{ marginBottom: '12px' }} />
        <div style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>
          3-Month Summary Report
        </div>
        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
          Ready to share with Dr. Sarah Johnson
        </div>
        <div style={{
          padding: '12px',
          borderRadius: '12px',
          backgroundColor: 'rgba(0,0,0,0.3)',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.8)'
        }}>
          ✓ Photo progression (12 weeks)<br/>
          ✓ PASI trend chart<br/>
          ✓ Medication adherence (89%)<br/>
          ✓ Mental health screening<br/>
          ✓ Trigger analysis
        </div>
      </div>

      <div style={{
        height: '300px',
        borderRadius: '20px',
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '20px',
        marginBottom: '20px',
        overflow: 'hidden'
      }}>
        {/* PDF Preview Mockup */}
        <div style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
          PSORIASIS PROGRESS REPORT
        </div>
        <div style={{
          height: '2px',
          backgroundColor: 'rgba(74, 144, 226, 0.3)',
          marginBottom: '12px'
        }} />
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>
          Patient: Alex Thompson • Period: Jul 1 - Oct 1, 2024
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{
              aspectRatio: '1',
              borderRadius: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }} />
          ))}
        </div>
        <div style={{
          height: '80px',
          borderRadius: '8px',
          backgroundColor: 'rgba(74, 144, 226, 0.1)',
          border: '1px solid rgba(74, 144, 226, 0.2)',
          display: 'flex',
          alignItems: 'center',
          padding: '12px',
          gap: '8px'
        }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', height: '40px', gap: '2px' }}>
            {[70, 62, 58, 55, 50, 47, 45, 42].map((h, i) => (
              <div key={i} style={{
                flex: 1,
                height: `${h}%`,
                backgroundColor: 'rgba(74, 144, 226, 0.5)',
                borderRadius: '2px 2px 0 0'
              }} />
            ))}
          </div>
        </div>
      </div>

      <button
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: '16px',
          backgroundColor: 'rgb(74, 144, 226)',
          border: 'none',
          color: 'white',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          marginBottom: '12px'
        }}
      >
        Email to Provider
      </button>

      <button
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: '16px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'white',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        Export PDF
      </button>
    </motion.div>
  );
}

function SettingsScreen({ setActiveScreen }: { setActiveScreen: (s: Screen) => void }) {
  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '16px 20px 24px' }}
    >
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>
          Settings
        </h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
          Manage your account and preferences
        </p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        <SettingsSection title="Account">
          <SettingsItem label="Profile" value="Alex Thompson" />
          <SettingsItem label="Email" value="alex@example.com" />
          <SettingsItem label="Phone" value="+1 (555) 123-4567" />
        </SettingsSection>

        <SettingsSection title="Notifications">
          <SettingsItem label="Medication Reminders" value="On" />
          <SettingsItem label="Photo Reminders" value="Weekly" />
          <SettingsItem label="Provider Messages" value="On" />
        </SettingsSection>

        <SettingsSection title="Privacy & Data">
          <SettingsItem label="Data Sync" value="Enabled" />
          <SettingsItem label="Share with Provider" value="Automatic" />
          <SettingsItem label="Research Participation" value="Opt-in" />
        </SettingsSection>

        <SettingsSection title="About">
          <SettingsItem label="Version" value="1.0.0" />
          <SettingsItem label="Support" value="help@psoriassist.com" />
        </SettingsSection>
      </div>
    </motion.div>
  );
}

// Helper Components

function QuickActionButton({
  icon: Icon,
  label,
  color,
  onClick
}: {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        padding: '20px 16px',
        borderRadius: '20px',
        backgroundColor: `rgba(${color}, 0.1)`,
        border: `1px solid rgba(${color}, 0.2)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer'
      }}
    >
      <Icon size={32} color={`rgb(${color})`} />
      <span style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>
        {label}
      </span>
    </motion.button>
  );
}

function TabBarItem({
  icon: Icon,
  label,
  active,
  onClick
}: {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        minWidth: '60px'
      }}
    >
      <Icon
        size={24}
        color={active ? 'rgb(74, 144, 226)' : 'rgba(255,255,255,0.5)'}
      />
      <span style={{
        fontSize: '11px',
        fontWeight: active ? '600' : '400',
        color: active ? 'rgb(74, 144, 226)' : 'rgba(255,255,255,0.5)'
      }}>
        {label}
      </span>
    </button>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: 'rgba(255,255,255,0.6)',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {title}
      </h3>
      <div style={{
        borderRadius: '16px',
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden'
      }}>
        {children}
      </div>
    </div>
  );
}

function SettingsItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      padding: '16px',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span style={{ fontSize: '15px', color: 'white' }}>{label}</span>
      <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)' }}>{value}</span>
    </div>
  );
}

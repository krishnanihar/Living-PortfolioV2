import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Brain, Eye, Waves, Shield, Layers, Network, Mic, Timer, Sparkles, BarChart3, Cpu, Camera, Lock, Cloud, Heart, Zap } from "lucide-react";

// Types
interface ComponentProps {
  onInteract: () => void;
}

interface BrainWavesInteractiveProps {
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  selectedWave: string | null;
  setSelectedWave: (value: string | null) => void;
  onInteract: () => void;
}

const cx = (...cls: (string | boolean | undefined)[]) => cls.filter(Boolean).join(" ");

// ---------- Sleep Stages Interactive ----------
export const SleepStagesInteractive = ({ onInteract }: ComponentProps) => {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const [timeInStage, setTimeInStage] = useState({ wake: 5, n1: 5, n2: 45, n3: 25, rem: 20 });

  const stages = [
    {
      id: 'wake',
      name: "Wake",
      eeg: "Beta (13-30 Hz) dominant",
      characteristics: ["Full consciousness", "Muscle tone present", "Eye movements"],
      color: "from-blue-500/20",
    },
    {
      id: 'n1',
      name: "Stage N1",
      eeg: "Theta (4-8 Hz) emerging",
      characteristics: ["Hypnagogic hallucinations", "Muscle jerks", "Easy arousal"],
      color: "from-purple-500/20",
    },
    {
      id: 'n2',
      name: "Stage N2",
      eeg: "Sleep spindles & K-complexes",
      characteristics: ["Memory consolidation", "Temperature drops", "Reduced heart rate"],
      color: "from-indigo-500/20",
    },
    {
      id: 'n3',
      name: "Stage N3",
      eeg: "Delta (0.5-4 Hz) waves",
      characteristics: ["Growth hormone release", "Immune function", "Deep restoration"],
      color: "from-pink-500/20",
    },
    {
      id: 'rem',
      name: "REM Sleep",
      eeg: "Mixed frequency, theta dominant",
      characteristics: ["Vivid dreams", "Rapid eye movements", "Muscle atonia"],
      color: "from-orange-500/20",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* Stage distribution slider */}
      <div className="mb-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
        <h3 className="text-sm font-light text-white/60 mb-4">Adjust Sleep Stage Distribution</h3>
        <div className="space-y-4">
          {Object.entries(timeInStage).map(([stage, value]) => (
            <div key={stage} className="flex items-center gap-4">
              <span className="text-xs text-white/40 w-16 uppercase">{stage}</span>
              <input
                type="range"
                min="0"
                max="50"
                value={value}
                onChange={(e) => {
                  setTimeInStage(prev => ({ ...prev, [stage]: parseInt(e.target.value) }));
                  onInteract();
                }}
                className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) ${value * 2}%, rgba(255,255,255,0.1) ${value * 2}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
              <span className="text-xs text-white/60 w-12 text-right">{value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive stages grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stages.map((stage) => (
          <motion.div
            key={stage.id}
            onMouseEnter={() => setHoveredStage(stage.id)}
            onMouseLeave={() => setHoveredStage(null)}
            onClick={onInteract}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group cursor-pointer"
          >
            <div className={cx(
              "absolute inset-0 rounded-2xl opacity-50 transition-opacity duration-300",
              `bg-gradient-to-b ${stage.color} to-transparent`,
              hoveredStage === stage.id ? "opacity-100" : ""
            )} />

            <div className="relative p-6 h-full">
              <div className="text-2xl font-extralight text-white/80 mb-2">{stage.name}</div>
              <div className="text-3xl font-thin text-white/40 mb-3">
                {timeInStage[stage.id as keyof typeof timeInStage]}%
              </div>
              <p className="text-xs text-white/30 mb-4">{stage.eeg}</p>

              {hoveredStage === stage.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-1"
                >
                  {stage.characteristics.map((char, i) => (
                    <div key={i} className="text-xs text-white/50">• {char}</div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hypnogram visualization */}
      <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
        <h3 className="text-sm font-light text-white/60 mb-6">Typical Night Hypnogram</h3>
        <Hypnogram distribution={timeInStage} />
      </div>
    </motion.div>
  );
};

// ---------- Brain Waves Interactive ----------
export const BrainWavesInteractive = ({ isRecording, setIsRecording, selectedWave, setSelectedWave, onInteract }: BrainWavesInteractiveProps) => {
  const waves = [
    { id: 'delta', name: "Delta", freq: "0.5-4 Hz", power: 80, color: "#ef4444", purpose: "Deep sleep, healing" },
    { id: 'theta', name: "Theta", freq: "4-8 Hz", power: 60, color: "#f59e0b", purpose: "REM sleep, creativity" },
    { id: 'alpha', name: "Alpha", freq: "8-13 Hz", power: 40, color: "#10b981", purpose: "Relaxed wakefulness" },
    { id: 'beta', name: "Beta", freq: "13-30 Hz", power: 30, color: "#3b82f6", purpose: "Active thinking" },
    { id: 'gamma', name: "Gamma", freq: "30-100 Hz", power: 20, color: "#8b5cf6", purpose: "Consciousness binding" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Wave selector and details */}
        <div className="space-y-4">
          {waves.map((wave) => (
            <motion.div
              key={wave.id}
              onClick={() => {
                setSelectedWave(wave.id);
                onInteract();
              }}
              whileHover={{ x: 5 }}
              className={cx(
                "relative p-6 rounded-2xl cursor-pointer transition-all duration-300",
                selectedWave === wave.id
                  ? "bg-white/[0.04] border border-white/10"
                  : "bg-white/[0.01] border border-white/5 hover:bg-white/[0.02]"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-base font-light text-white/80">{wave.name} Wave</span>
                  <span className="text-xs text-white/40 ml-3">{wave.freq}</span>
                </div>
                <div className="text-xs text-white/30">{wave.purpose}</div>
              </div>

              {/* Power bar */}
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isRecording ? `${wave.power}%` : 0 }}
                  transition={{ duration: 1, delay: waves.indexOf(wave) * 0.1 }}
                  className="h-full rounded-full transition-all duration-500"
                  style={{ backgroundColor: wave.color }}
                />
              </div>

              {selectedWave === wave.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-white/5"
                >
                  <WaveformPattern frequency={wave.freq} color={wave.color} isActive={isRecording} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Live EEG visualization */}
        <div className="sticky top-6">
          <div className="relative rounded-2xl bg-white/[0.02] border border-white/5 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-light text-white/60">Live EEG Signal</h3>
              <button
                onClick={() => {
                  setIsRecording(!isRecording);
                  onInteract();
                }}
                className={cx(
                  "px-4 py-2 rounded-full text-xs font-light transition-all duration-300",
                  isRecording
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                )}
              >
                {isRecording ? '■ Stop Recording' : '● Start Recording'}
              </button>
            </div>

            <MultiChannelEEG isActive={isRecording} selectedWave={selectedWave} />

            {/* Stats */}
            {isRecording && (
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-xs text-white/40">Amplitude</div>
                  <div className="text-sm text-white/60">±50 µV</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-white/40">Sampling</div>
                  <div className="text-sm text-white/60">256 Hz</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-white/40">Quality</div>
                  <div className="text-sm text-white/60">98%</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ---------- Detection System Interactive ----------
export const DetectionSystemInteractive = ({ onInteract }: ComponentProps) => {
  const [activeDetector, setActiveDetector] = useState<string | null>(null);
  const [detectionRunning, setDetectionRunning] = useState(false);

  const detectors = [
    {
      id: 'spindles',
      name: "Sleep Spindles",
      icon: <Waves className="w-6 h-6" />,
      accuracy: 94,
      description: "12-14 Hz bursts lasting 0.5-2 seconds",
      detections: 127,
    },
    {
      id: 'kcomplexes',
      name: "K-Complexes",
      icon: <Activity className="w-6 h-6" />,
      accuracy: 89,
      description: "Large biphasic waves in N2 sleep",
      detections: 43,
    },
    {
      id: 'slowwaves',
      name: "Slow Waves",
      icon: <Brain className="w-6 h-6" />,
      accuracy: 92,
      description: "Delta waves characteristic of N3",
      detections: 89,
    },
    {
      id: 'rem',
      name: "REM Detection",
      icon: <Eye className="w-6 h-6" />,
      accuracy: 87,
      description: "Rapid eye movements with theta",
      detections: 31,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {detectors.map((detector) => (
          <motion.div
            key={detector.id}
            onClick={() => {
              setActiveDetector(detector.id);
              onInteract();
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cx(
              "relative p-8 rounded-2xl cursor-pointer transition-all duration-300",
              activeDetector === detector.id
                ? "bg-white/[0.04] border border-white/10"
                : "bg-white/[0.01] border border-white/5 hover:bg-white/[0.02]"
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-white/5 text-white/40">
                {detector.icon}
              </div>
              <div className="text-right">
                <div className="text-2xl font-extralight text-white/80">{detector.accuracy}%</div>
                <div className="text-xs text-white/30">accuracy</div>
              </div>
            </div>

            <h3 className="text-base font-light text-white/70 mb-2">{detector.name}</h3>
            <p className="text-xs text-white/40 mb-4">{detector.description}</p>

            {activeDetector === detector.id && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-white/5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50">Detections tonight:</span>
                  <span className="text-sm text-white/70">{detector.detections}</span>
                </div>
                <div className="mt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDetectionRunning(!detectionRunning);
                      onInteract();
                    }}
                    className="w-full px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-xs font-light"
                  >
                    {detectionRunning ? 'Stop Detection' : 'Run Detection'}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {detectionRunning && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          <DetectionVisualization />
        </motion.div>
      )}
    </motion.div>
  );
};

// ---------- Processing Pipeline Interactive ----------
export const ProcessingPipelineInteractive = ({ onInteract }: ComponentProps) => {
  const [activePipe, setActivePipe] = useState(0);

  const pipeline = [
    { name: "Signal Acquisition", desc: "4-channel EEG at 256 Hz", icon: <Activity className="w-5 h-5" /> },
    { name: "Preprocessing", desc: "Bandpass filter 0.5-45 Hz", icon: <Waves className="w-5 h-5" /> },
    { name: "Artifact Rejection", desc: "ICA-based cleaning", icon: <Shield className="w-5 h-5" /> },
    { name: "Feature Extraction", desc: "Wavelet decomposition", icon: <Layers className="w-5 h-5" /> },
    { name: "Classification", desc: "CNN-based staging", icon: <Brain className="w-5 h-5" /> },
    { name: "Event Detection", desc: "Template matching", icon: <Eye className="w-5 h-5" /> },
    { name: "Embedding", desc: "Latent space mapping", icon: <Network className="w-5 h-5" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="relative">
        {/* Pipeline flow */}
        {pipeline.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative mb-4"
          >
            {/* Connection line */}
            {i < pipeline.length - 1 && (
              <div className="absolute left-10 top-20 w-0.5 h-12 bg-gradient-to-b from-white/10 to-transparent" />
            )}

            <div
              onClick={() => {
                setActivePipe(i);
                onInteract();
              }}
              className={cx(
                "flex items-center gap-6 p-6 rounded-2xl cursor-pointer transition-all duration-300",
                activePipe === i
                  ? "bg-white/[0.03] border border-white/10 translate-x-2"
                  : "bg-white/[0.01] border border-white/5 hover:translate-x-1"
              )}
            >
              <div className={cx(
                "p-3 rounded-xl transition-colors",
                activePipe === i ? "bg-white/10 text-white/60" : "bg-white/5 text-white/30"
              )}>
                {step.icon}
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-light text-white/80 mb-1">{step.name}</h3>
                <p className="text-xs text-white/40">{step.desc}</p>
              </div>

              <div className={cx(
                "w-2 h-2 rounded-full transition-all duration-300",
                activePipe === i ? "bg-green-400 animate-pulse" : "bg-white/20"
              )} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Processing stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-2xl font-extralight text-white/60">2.4ms</div>
          <div className="text-xs text-white/30">Latency</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-2xl font-extralight text-white/60">98.2%</div>
          <div className="text-xs text-white/30">Uptime</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-2xl font-extralight text-white/60">0.01%</div>
          <div className="text-xs text-white/30">Error Rate</div>
        </div>
      </div>
    </motion.div>
  );
};

// ---------- Research Papers ----------
export const ResearchPapers = ({ onInteract }: ComponentProps) => {
  const [selectedPaper, setSelectedPaper] = useState<number | null>(null);

  const papers = [
    {
      title: "Contrastive Learning for Sleep EEG Embeddings",
      authors: "Zhang, Smith, Johnson",
      year: 2024,
      citations: 127,
      abstract: "We present a novel approach to creating meaningful embeddings from sleep EEG data...",
      tags: ["Machine Learning", "EEG", "Contrastive Learning"],
    },
    {
      title: "Real-time Dream Content Prediction from Neural Signals",
      authors: "Lee, Chen, Williams",
      year: 2024,
      citations: 89,
      abstract: "Using transformer architectures, we demonstrate the feasibility of predicting dream themes...",
      tags: ["Transformers", "Dream Analysis", "Real-time"],
    },
    {
      title: "Privacy-Preserving Neural Interfaces for Sleep",
      authors: "Kumar, Anderson, Thompson",
      year: 2024,
      citations: 203,
      abstract: "We propose a federated learning approach for sleep stage classification that maintains...",
      tags: ["Privacy", "Federated Learning", "Neural Interfaces"],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto"
    >
      <div className="space-y-4">
        {papers.map((paper, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => {
              setSelectedPaper(selectedPaper === i ? null : i);
              onInteract();
            }}
            className="relative p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-base font-light text-white/80 mb-1">{paper.title}</h3>
                <p className="text-xs text-white/40">{paper.authors} · {paper.year}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-extralight text-white/60">{paper.citations}</div>
                <div className="text-xs text-white/30">citations</div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {paper.tags.map((tag, j) => (
                <span key={j} className="px-2 py-1 rounded-full bg-white/[0.03] border border-white/5 text-xs text-white/40">
                  {tag}
                </span>
              ))}
            </div>

            {selectedPaper === i && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 pt-4 border-t border-white/5"
              >
                <p className="text-sm text-white/50 leading-relaxed mb-4">{paper.abstract}</p>
                <button className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-xs font-light">
                  Read Full Paper →
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ---------- Helper Components ----------
interface HypnogramProps {
  distribution: any;
}

export const Hypnogram = ({ distribution }: HypnogramProps) => (
  <svg className="w-full h-32" viewBox="0 0 800 100">
    <path
      d="M 0,80 L 100,80 L 150,60 L 200,40 L 250,20 L 300,40 L 350,60 L 400,80 L 450,60 L 500,40 L 550,20 L 600,40 L 650,60 L 700,80 L 800,80"
      fill="none"
      stroke="white"
      strokeOpacity="0.3"
      strokeWidth="2"
    />
  </svg>
);

interface WaveformPatternProps {
  frequency: string;
  color: string;
  isActive: boolean;
}

export const WaveformPattern = ({ frequency, color, isActive }: WaveformPatternProps) => (
  <svg className="w-full h-16" viewBox="0 0 200 50">
    <path
      d="M 0,25 Q 25,10 50,25 T 100,25 T 150,25 T 200,25"
      fill="none"
      stroke={color}
      strokeOpacity={isActive ? 0.6 : 0.2}
      strokeWidth="2"
    />
  </svg>
);

interface MultiChannelEEGProps {
  isActive: boolean;
  selectedWave: string | null;
}

export const MultiChannelEEG = ({ isActive, selectedWave }: MultiChannelEEGProps) => (
  <div className="space-y-2">
    {[1, 2, 3, 4].map((channel) => (
      <div key={channel} className="h-12 rounded bg-black/40 overflow-hidden flex items-center px-4">
        <span className="text-xs text-white/40 mr-4">CH{channel}</span>
        <div className="flex-1 h-6 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded animate-pulse" />
      </div>
    ))}
  </div>
);

export const DetectionVisualization = () => (
  <div className="h-32 rounded-xl bg-black/40 flex items-center justify-center">
    <p className="text-xs text-white/30">Detection visualization running...</p>
  </div>
);

interface ConceptVisualizationProps {
  concept: any;
}

export const ConceptVisualization = ({ concept }: ConceptVisualizationProps) => (
  <div className="w-full h-full rounded-2xl bg-white/[0.01] border border-white/5 flex items-center justify-center">
    <div className="text-8xl opacity-10">{concept.visual}</div>
  </div>
);
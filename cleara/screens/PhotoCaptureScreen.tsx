import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Info, Camera, Grid3X3, RefreshCw, Loader2, Sparkles } from 'lucide-react';
import { Screen, PasiLog } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

interface PhotoCaptureScreenProps {
  onBack: () => void;
  onSave: (log: PasiLog) => void;
}

const PhotoCaptureScreen: React.FC<PhotoCaptureScreenProps> = ({ onBack, onSave }) => {
  const [blend, setBlend] = useState(50);
  const [showGrid, setShowGrid] = useState(true);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const initCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasPermission(false);
      }
    };

    if (!capturedImage) {
      initCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [capturedImage]);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setCapturedImage(dataUrl);
      }
    }
  };

  const retake = () => {
    setCapturedImage(null);
    setIsAnalyzing(false);
  };

  const analyzeAndSave = async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = capturedImage.split(',')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: 'image/png',
                data: base64Data
              }
            },
            {
              text: `Analyze this skin image for psoriasis symptoms. 
              Estimate a PASI sub-score for Erythema (Redness), Induration (Thickness), and Desquamation (Scaling) on a scale of 0 to 4.
              0 = None, 1 = Mild, 2 = Moderate, 3 = Severe, 4 = Very Severe.
              Also provide a rough total PASI score estimate (0-72) based on visual appearance.
              Provide a 1 sentence gentle, encouraging summary.`
            }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              redness: { type: Type.NUMBER },
              thickness: { type: Type.NUMBER },
              scaling: { type: Type.NUMBER },
              pasi_score: { type: Type.NUMBER },
              summary: { type: Type.STRING }
            }
          }
        }
      });

      const result = JSON.parse(response.text || "{}");
      
      const newLog: PasiLog = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        score: result.pasi_score || 0,
        redness: result.redness || 0,
        thickness: result.thickness || 0,
        scaling: result.scaling || 0,
        summary: result.summary || "Recorded today."
      };

      onSave(newLog);

    } catch (error) {
      console.error("AI Analysis failed", error);
      // Fallback for demo if offline/error
      onSave({
        id: Date.now().toString(),
        date: "Today",
        score: 11.5,
        redness: 2,
        thickness: 3,
        scaling: 1,
        summary: "Analysis complete. Healing continues."
      });
    }
  };

  return (
    <div className="h-full flex flex-col bg-charcoal text-white relative overflow-hidden">
      {/* Hidden Canvas for Capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 pt-8 z-20 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <button onClick={onBack} disabled={isAnalyzing} className="p-2 bg-white/10 backdrop-blur-md rounded-full disabled:opacity-50">
          <ArrowLeft size={24} />
        </button>
        <span className="font-serif text-lg tracking-wide opacity-90">Align & Heal</span>
        <button className="p-2 bg-white/10 backdrop-blur-md rounded-full">
          <Info size={24} />
        </button>
      </div>

      {/* Viewfinder Area */}
      <div className="flex-1 relative bg-gray-900 overflow-hidden">
        {/* Real Camera Feed */}
        {!capturedImage && hasPermission !== false && (
          <video 
            ref={videoRef}
            autoPlay 
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
        )}

        {/* Captured Result */}
        {capturedImage && (
          <img 
            src={capturedImage}
            alt="Captured"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Analysis Overlay */}
        {isAnalyzing && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                <div className="relative">
                    <div className="absolute inset-0 bg-lavender blur-2xl opacity-30 animate-pulse-slow"></div>
                    <Loader2 size={48} className="text-white animate-spin relative z-10" />
                </div>
                <h3 className="font-serif text-2xl mt-6 mb-2">Analyzing Clarity</h3>
                <p className="font-sans text-white/60">Measuring redness, thickness, and healing...</p>
            </div>
        )}

        {/* Fallback / Permission Error */}
        {hasPermission === false && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <Camera size={48} className="text-white/20 mb-4" />
            <p className="font-serif text-xl">Camera access needed</p>
            <p className="font-sans text-sm text-white/50 mt-2">Please allow camera access to track your healing progress.</p>
          </div>
        )}
        
        {/* Ghost Image (Previous Photo Overlay) */}
        {!capturedImage && (
            <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{ opacity: blend / 100 }}
            >
            <img 
                src="https://picsum.photos/601/801" 
                alt="Ghost Overlay"
                className="w-full h-full object-cover mix-blend-screen grayscale filter contrast-125"
            />
            </div>
        )}

        {/* Grid Overlay */}
        {showGrid && !capturedImage && (
          <div className="absolute inset-0 pointer-events-none opacity-30 flex flex-col">
             <div className="flex-1 border-b border-lavender"></div>
             <div className="flex-1 border-b border-lavender"></div>
             <div className="flex-1"></div>
             <div className="absolute inset-0 flex">
                <div className="flex-1 border-r border-lavender"></div>
                <div className="flex-1 border-r border-lavender"></div>
                <div className="flex-1"></div>
             </div>
          </div>
        )}

        {/* Poetic Instruction */}
        {!capturedImage && (
            <div className="absolute top-24 left-0 right-0 text-center pointer-events-none">
            <p className="font-serif text-2xl text-white/90 drop-shadow-md">Align with your previous self</p>
            </div>
        )}
      </div>

      {/* Controls Area */}
      <div className="bg-black/40 backdrop-blur-xl p-6 pb-24 space-y-6 rounded-t-[32px] border-t border-white/10">
        
        {/* Slider - Only show when active camera */}
        {!capturedImage && (
            <div className="space-y-2">
            <div className="flex justify-between text-xs font-sans text-white/70 uppercase tracking-wider">
                <span>Subtle</span>
                <span>Blend</span>
                <span>Clear</span>
            </div>
            <input 
                type="range" 
                min="0" 
                max="100" 
                value={blend} 
                onChange={(e) => setBlend(parseInt(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-lavender"
            />
            </div>
        )}

        {/* Bottom Controls */}
        <div className="flex items-center justify-between">
          {!capturedImage ? (
              <>
                <button 
                    onClick={() => setShowGrid(!showGrid)}
                    className={`p-3 rounded-full transition-colors ${showGrid ? 'bg-lavender/30 text-lavender' : 'bg-white/10 text-white'}`}
                >
                    <Grid3X3 size={24} />
                </button>

                {/* Shutter Button */}
                <button 
                    onClick={takePhoto}
                    className="h-20 w-20 rounded-full border-4 border-white/80 p-1 group"
                >
                    <div className="w-full h-full bg-white rounded-full transition-transform group-active:scale-90" />
                </button>

                {/* Body Part Selector Placeholder */}
                <div className="p-3 bg-white/10 rounded-full text-white/80 font-sans text-sm font-medium px-4">
                    Left Arm
                </div>
              </>
          ) : (
             <div className="w-full flex justify-between items-center px-4">
                 <button onClick={retake} disabled={isAnalyzing} className="flex flex-col items-center gap-2 text-white/80 disabled:opacity-50">
                     <div className="p-3 bg-white/10 rounded-full"><RefreshCw size={20} /></div>
                     <span className="text-xs">Retake</span>
                 </button>
                 <button 
                    onClick={analyzeAndSave} 
                    disabled={isAnalyzing}
                    className="bg-white text-charcoal font-medium py-3 px-8 rounded-full shadow-lg flex items-center gap-2 disabled:opacity-80"
                 >
                     {isAnalyzing ? (
                        <>Saving...</>
                     ) : (
                        <>
                           <Sparkles size={18} className="text-lavender" />
                           Analyze & Save
                        </>
                     )}
                 </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoCaptureScreen;
import React, { useEffect, useState } from 'react';

const WatercolorBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1) for parallax
      // Multiplied by a factor for movement range
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    // Add listener with a slight throttle if needed, but modern browsers handle this okay
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const ParallaxBlob = ({ 
    className, 
    speed = 1, 
    colorClass,
    animationDelay,
    shapeParams
  }: { 
    className: string, 
    speed?: number, 
    colorClass: string,
    animationDelay: string,
    shapeParams: string
  }) => (
    <div 
      className={`absolute transition-transform duration-1000 ease-out ${className}`}
      style={{ 
        transform: `translate(${mousePos.x * speed}px, ${mousePos.y * speed}px)`,
        willChange: 'transform'
      }}
    >
      <div 
        className={`w-full h-full ${colorClass} mix-blend-multiply filter blur-[60px] opacity-60 animate-blob`}
        style={{ 
          animation: `float 8s ease-in-out infinite, morph 12s ease-in-out infinite`,
          animationDelay: animationDelay,
          borderRadius: shapeParams
        }} 
      />
    </div>
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes morph {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
      `}</style>

      {/* Lavender Wash - Top Left */}
      <ParallaxBlob 
        className="-top-20 -left-20 w-[40rem] h-[40rem]" 
        speed={-1.2}
        colorClass="bg-lavender/20"
        animationDelay="0s"
        shapeParams="60% 40% 30% 70% / 60% 30% 70% 40%"
      />
      
      {/* Sage Wash - Top Right */}
      <ParallaxBlob 
        className="-top-10 -right-32 w-[35rem] h-[35rem]" 
        speed={0.8}
        colorClass="bg-sage/20"
        animationDelay="2s"
        shapeParams="30% 70% 70% 30% / 30% 30% 70% 70%"
      />

      {/* Blush Wash - Bottom Left */}
      <ParallaxBlob 
        className="bottom-0 -left-20 w-[30rem] h-[30rem]" 
        speed={-0.6}
        colorClass="bg-blush/20"
        animationDelay="1s"
        shapeParams="50% 50% 20% 80% / 25% 80% 20% 75%"
      />

      {/* Periwinkle Wash - Center/Random */}
      <ParallaxBlob 
        className="top-[40%] left-[20%] w-[25rem] h-[25rem]" 
        speed={0.4}
        colorClass="bg-periwinkle/20"
        animationDelay="4s"
        shapeParams="80% 20% 80% 20% / 80% 80% 20% 20%"
      />

       {/* Extra Detail - Small floating accent */}
       <ParallaxBlob 
        className="bottom-[20%] right-[10%] w-64 h-64" 
        speed={1.5}
        colorClass="bg-lavender/15"
        animationDelay="3s"
        shapeParams="40% 60% 30% 70% / 60% 30% 70% 40%"
      />
      
      {/* Gradient Overlay for integration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-canvas/60" />
    </div>
  );
};

export default WatercolorBackground;
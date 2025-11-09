'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  duration?: number;
  className?: string;
  characters?: string;
  scrambleSpeed?: number;
}

const DEFAULT_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

/**
 * ScrambleText - Elegant text decoding animation
 * Creates a cryptographic decoding effect where characters scramble before revealing final text
 * Perfect for hero greetings and attention-grabbing headlines
 */
export function ScrambleText({
  text,
  duration = 1200,
  className = '',
  characters = DEFAULT_CHARACTERS,
  scrambleSpeed = 30,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.floor(duration / scrambleSpeed);
    const charsPerFrame = text.length / totalFrames;

    const interval = setInterval(() => {
      const revealedChars = Math.floor(frame * charsPerFrame);

      const scrambled = text.split('').map((char, index) => {
        // Skip spaces - don't scramble them
        if (char === ' ') return ' ';

        // Reveal character if it's time
        if (index < revealedChars) return char;

        // Otherwise show random character
        return characters[Math.floor(Math.random() * characters.length)];
      }).join('');

      setDisplayText(scrambled);

      frame++;

      if (frame >= totalFrames) {
        setDisplayText(text);
        setIsComplete(true);
        clearInterval(interval);
      }
    }, scrambleSpeed);

    return () => clearInterval(interval);
  }, [text, duration, characters, scrambleSpeed]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      aria-label={text}
      style={{
        fontVariantNumeric: 'tabular-nums', // Prevents layout shift during scramble
      }}
    >
      {displayText}
    </motion.span>
  );
}

export default ScrambleText;

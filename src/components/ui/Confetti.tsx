import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface ConfettiProps {
  isActive: boolean;
  onComplete?: () => void;
}
const colors = [
'#3B82F6',
'#10B981',
'#F59E0B',
'#EF4444',
'#8B5CF6',
'#EC4899'];

const randomBetween = (min: number, max: number) =>
Math.random() * (max - min) + min;
export const Confetti = ({ isActive, onComplete }: ConfettiProps) => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      color: string;
      delay: number;
      rotation: number;
      scale: number;
    }>>(
    []);
  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from(
        {
          length: 50
        },
        (_, i) => ({
          id: i,
          x: randomBetween(10, 90),
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: randomBetween(0, 0.3),
          rotation: randomBetween(-180, 180),
          scale: randomBetween(0.5, 1)
        })
      );
      setParticles(newParticles);
      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);
  return (
    <AnimatePresence>
      {particles.length > 0 &&
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {particles.map((particle) =>
        <motion.div
          key={particle.id}
          initial={{
            y: -20,
            x: `${particle.x}vw`,
            opacity: 1,
            rotate: 0,
            scale: particle.scale
          }}
          animate={{
            y: '110vh',
            rotate: particle.rotation,
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: randomBetween(2, 3),
            delay: particle.delay,
            ease: 'linear'
          }}
          className="absolute top-0"
          style={{
            left: `${particle.x}%`
          }}>

              <div
            className="w-3 h-3 rounded-sm"
            style={{
              backgroundColor: particle.color
            }} />

            </motion.div>
        )}
        </div>
      }
    </AnimatePresence>);

};
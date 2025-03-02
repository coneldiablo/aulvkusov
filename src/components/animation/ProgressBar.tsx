import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useReducedMotion } from '../../utils/animations';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  duration?: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = '#B45309', // amber-700
  height = 8,
  duration = 0.8,
  className = '',
}) => {
  const controls = useAnimation();
  const [prevValue, setPrevValue] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    // Animate from previous value to new value
    const percentage = (value / max) * 100;
    const prevPercentage = (prevValue / max) * 100;
    
    if (prefersReducedMotion) {
      // No animation for reduced motion preference
      controls.set({ width: `${percentage}%` });
    } else {
      controls.start({
        width: `${percentage}%`,
        transition: { 
          duration, 
          ease: [0.43, 0.13, 0.23, 0.96] 
        }
      });
    }
    
    setPrevValue(value);
  }, [value, max, controls, duration, prefersReducedMotion, prevValue]);
  
  return (
    <div 
      className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}
      style={{ height }}
    >
      <motion.div
        className="h-full"
        style={{ backgroundColor: color }}
        initial={{ width: '0%' }}
        animate={controls}
      />
    </div>
  );
};

export default ProgressBar;
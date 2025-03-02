import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../utils/animations';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  thickness?: number;
  duration?: number;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = '#B45309', // amber-700
  thickness = 3,
  duration = 1.5,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  const sizeMap = {
    sm: 24,
    md: 40,
    lg: 64,
  };
  
  const spinnerSize = sizeMap[size];
  
  // If user prefers reduced motion, use a simpler animation
  const spinTransition = prefersReducedMotion
    ? { 
        repeat: Infinity, 
        duration: 2,
        ease: "linear"
      }
    : { 
        repeat: Infinity, 
        duration, 
        ease: "linear"
      };
  
  return (
    <div className={className}>
      <motion.svg
        width={spinnerSize}
        height={spinnerSize}
        viewBox={`0 0 ${spinnerSize} ${spinnerSize}`}
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: 360 }}
        transition={spinTransition}
      >
        <motion.circle
          cx={spinnerSize / 2}
          cy={spinnerSize / 2}
          r={(spinnerSize - thickness) / 2}
          fill="none"
          stroke="rgba(0, 0, 0, 0.1)"
          strokeWidth={thickness}
        />
        <motion.circle
          cx={spinnerSize / 2}
          cy={spinnerSize / 2}
          r={(spinnerSize - thickness) / 2}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeDasharray={spinnerSize * 2}
          strokeDashoffset={spinnerSize * 0.75}
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
};

export default LoadingSpinner;
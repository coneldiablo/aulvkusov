import React from 'react';
import { motion } from 'framer-motion';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  
  const colorMap = {
    primary: 'text-amber-600',
    white: 'text-white',
    gray: 'text-gray-500',
  };
  
  const spinTransition = {
    repeat: Infinity,
    duration: 1.5,
    ease: "linear"
  };
  
  return (
    <div className={`${className}`}>
      <motion.div
        className={`rounded-full border-4 border-t-transparent ${sizeMap[size]} ${colorMap[color]}`}
        animate={{ rotate: 360 }}
        transition={spinTransition}
        style={{ borderTopColor: 'transparent' }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      />
    </div>
  );
};

export default Spinner;
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedShapeProps {
  type: 'circle' | 'square' | 'triangle' | 'polygon';
  size: number;
  color: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  rotate?: number;
  scale?: number;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedShape: React.FC<AnimatedShapeProps> = ({
  type,
  size,
  color,
  delay = 0,
  duration = 1,
  x = 0,
  y = 0,
  rotate = 0,
  scale = 1,
  opacity = 1,
  className = '',
  style = {},
}) => {
  const getShapeStyles = () => {
    const baseStyles: React.CSSProperties = {
      width: size,
      height: size,
      backgroundColor: color,
      ...style,
    };

    switch (type) {
      case 'circle':
        return {
          ...baseStyles,
          borderRadius: '50%',
        };
      case 'square':
        return {
          ...baseStyles,
        };
      case 'triangle':
        return {
          width: 0,
          height: 0,
          backgroundColor: 'transparent',
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid ${color}`,
          ...style,
        };
      case 'polygon':
        return {
          ...baseStyles,
          clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <motion.div
      className={className}
      style={getShapeStyles()}
      initial={{ 
        x: x - 50, 
        y: y - 50, 
        rotate: rotate - 90, 
        scale: 0, 
        opacity: 0 
      }}
      animate={{ 
        x, 
        y, 
        rotate, 
        scale, 
        opacity 
      }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.43, 0.13, 0.23, 0.96] 
      }}
    />
  );
};

export default AnimatedShape;
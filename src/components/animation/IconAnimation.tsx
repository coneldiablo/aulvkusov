import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../utils/animations';

interface IconAnimationProps {
  children: React.ReactNode;
  type?: 'pulse' | 'spin' | 'bounce' | 'shake';
  duration?: number;
  delay?: number;
  repeat?: number | 'infinity';
  className?: string;
}

const IconAnimation: React.FC<IconAnimationProps> = ({
  children,
  type = 'pulse',
  duration = 1.5,
  delay = 0,
  repeat = 'infinity',
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  // If user prefers reduced motion, render without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  
  // Animation variants based on type
  const getVariants = () => {
    switch (type) {
      case 'pulse':
        return {
          initial: { scale: 1 },
          animate: { 
            scale: [1, 1.1, 1],
            transition: { 
              duration, 
              repeat: repeat === 'infinity' ? Infinity : repeat,
              repeatDelay: 0.5,
              delay 
            }
          }
        };
      case 'spin':
        return {
          initial: { rotate: 0 },
          animate: { 
            rotate: 360,
            transition: { 
              duration, 
              repeat: repeat === 'infinity' ? Infinity : repeat,
              ease: "linear",
              delay 
            }
          }
        };
      case 'bounce':
        return {
          initial: { y: 0 },
          animate: { 
            y: [0, -10, 0],
            transition: { 
              duration, 
              repeat: repeat === 'infinity' ? Infinity : repeat,
              repeatDelay: 0.25,
              delay 
            }
          }
        };
      case 'shake':
        return {
          initial: { x: 0 },
          animate: { 
            x: [0, -5, 5, -5, 5, 0],
            transition: { 
              duration: duration / 2, 
              repeat: repeat === 'infinity' ? Infinity : repeat,
              repeatDelay: 2,
              delay 
            }
          }
        };
      default:
        return {
          initial: {},
          animate: {}
        };
    }
  };
  
  const variants = getVariants();
  
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default IconAnimation;
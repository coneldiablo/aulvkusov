import React from 'react';
import { motion } from 'framer-motion';
import { fadeInVariants, useReducedMotion, getReducedMotionVariants } from '../../utils/animations';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.3, 
  className = '' 
}) => {
  const prefersReducedMotion = useReducedMotion();
  const variants = getReducedMotionVariants(prefersReducedMotion, fadeInVariants);

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{
        delay,
        duration
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
import React from 'react';
import { motion } from 'framer-motion';
import { contentVariants, useScrollAnimation, useReducedMotion, getReducedMotionVariants } from '../../utils/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  threshold = 0.1,
  className = '' 
}) => {
  const [ref, isVisible] = useScrollAnimation(threshold);
  const prefersReducedMotion = useReducedMotion();
  const variants = getReducedMotionVariants(prefersReducedMotion, contentVariants);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
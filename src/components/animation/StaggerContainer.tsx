import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainerVariants, useReducedMotion, getReducedMotionVariants } from '../../utils/animations';

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

const StaggerContainer: React.FC<StaggerContainerProps> = ({ 
  children, 
  staggerDelay = 0.05,
  className = '' 
}) => {
  const prefersReducedMotion = useReducedMotion();
  const variants = getReducedMotionVariants(prefersReducedMotion, staggerContainerVariants);

  // Customize stagger delay
  const customVariants = {
    ...variants,
    animate: {
      ...variants.animate,
      transition: {
        ...variants.animate.transition,
        staggerChildren: staggerDelay
      }
    }
  };

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      variants={customVariants}
    >
      {children}
    </motion.div>
  );
};

export default StaggerContainer;
import React from 'react';
import { motion } from 'framer-motion';
import { pageTransitions, useReducedMotion, getReducedMotionVariants } from '../../utils/animations';

interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();
  const variants = getReducedMotionVariants(prefersReducedMotion, pageTransitions);

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants, useReducedMotion, getReducedMotionVariants } from '../../utils/animations';

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

const StaggerItem: React.FC<StaggerItemProps> = ({ 
  children, 
  className = '' 
}) => {
  const prefersReducedMotion = useReducedMotion();
  const variants = getReducedMotionVariants(prefersReducedMotion, itemVariants);

  return (
    <motion.div
      className={className}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default StaggerItem;
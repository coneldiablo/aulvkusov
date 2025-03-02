import React from 'react';
import { motion } from 'framer-motion';
import { cardVariants, useReducedMotion, getReducedMotionVariants } from '../../utils/animations';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  onClick,
  hover = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const variants = getReducedMotionVariants(prefersReducedMotion, cardVariants);

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      initial="initial"
      whileHover={hover ? "hover" : undefined}
      variants={variants}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
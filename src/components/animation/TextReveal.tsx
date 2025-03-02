import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../utils/animations';

interface TextRevealProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  className?: string;
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  tag = 'p',
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.03,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Split text into words
  const words = text.split(' ');
  
  // Variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    }),
  };
  
  // Variants for each word
  const wordVariants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };
  
  // If user prefers reduced motion, render text without animation
  if (prefersReducedMotion) {
    const Component = tag;
    return <Component className={className}>{text}</Component>;
  }
  
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TextReveal;
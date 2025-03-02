import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  type?: 'heading' | 'subheading' | 'body';
  color?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  type = 'heading',
  color = '#000000',
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.03,
  className = '',
  style = {},
}) => {
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
  
  const getTypeStyles = () => {
    switch (type) {
      case 'heading':
        return 'text-4xl font-bold';
      case 'subheading':
        return 'text-2xl font-semibold';
      case 'body':
        return 'text-base';
      default:
        return '';
    }
  };
  
  return (
    <motion.div
      className={`${getTypeStyles()} ${className}`}
      style={{ color, ...style }}
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

export default AnimatedText;
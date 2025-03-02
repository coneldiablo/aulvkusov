import React from 'react';
import { motion } from 'framer-motion';
import AnimatedShape from './AnimatedShape';
import AnimatedText from './AnimatedText';

interface AnimationCompositionProps {
  palette: {
    primary: string;
    secondary: string;
    accent1: string;
    accent2: string;
    accent3: string;
    background: string;
  };
  isPlaying: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const AnimationComposition: React.FC<AnimationCompositionProps> = ({
  palette,
  isPlaying,
  className = '',
  style = {},
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };
  
  return (
    <motion.div
      className={`relative w-full h-full ${className}`}
      style={{ background: palette.background, ...style }}
      variants={containerVariants}
      initial="hidden"
      animate={isPlaying ? "visible" : "hidden"}
    >
      {/* Background Elements */}
      <AnimatedShape
        type="circle"
        size={300}
        color={`${palette.accent2}20`}
        x={-50}
        y={100}
        delay={0.2}
        duration={1.5}
        className="absolute"
      />
      
      <AnimatedShape
        type="square"
        size={200}
        color={`${palette.accent3}15`}
        x={500}
        y={-30}
        rotate={45}
        delay={0.3}
        duration={1.8}
        className="absolute"
      />
      
      {/* Main Elements */}
      <AnimatedShape
        type="circle"
        size={120}
        color={palette.accent1}
        x={200}
        y={200}
        delay={0.5}
        duration={1}
        className="absolute"
      />
      
      <AnimatedShape
        type="square"
        size={100}
        color={palette.accent2}
        x={350}
        y={200}
        rotate={15}
        delay={0.7}
        duration={1.2}
        className="absolute"
      />
      
      <AnimatedShape
        type="triangle"
        size={120}
        color={palette.accent3}
        x={275}
        y={120}
        delay={0.9}
        duration={1.3}
        className="absolute"
      />
      
      <AnimatedShape
        type="polygon"
        size={80}
        color={palette.secondary}
        x={450}
        y={250}
        rotate={-15}
        delay={1.1}
        duration={1.4}
        className="absolute"
      />
      
      {/* Text Elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <AnimatedText
          text="DESIGN SYSTEM"
          type="heading"
          color={palette.primary}
          delay={1.3}
          duration={0.8}
          className="mb-2"
        />
        
        <AnimatedText
          text="Beautiful animations with harmony"
          type="subheading"
          color={palette.secondary}
          delay={1.5}
          duration={0.8}
        />
      </div>
    </motion.div>
  );
};

export default AnimationComposition;
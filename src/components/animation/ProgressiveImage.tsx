import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../utils/animations';

interface ProgressiveImageProps {
  src: string;
  placeholderSrc?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  placeholderSrc,
  alt,
  className = '',
  style = {},
}) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Skip animation if using the actual source already
    if (imgSrc === src) {
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setIsLoaded(true);
    };
  }, [src, imgSrc]);

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // If user prefers reduced motion, render image without animation
  if (prefersReducedMotion) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
      />
    );
  }

  return (
    <motion.img
      src={imgSrc}
      alt={alt}
      className={`${className} ${!isLoaded && placeholderSrc ? 'filter blur-sm' : 'filter blur-0'}`}
      style={{
        transition: 'filter 0.3s ease-out',
        ...style
      }}
      initial="hidden"
      animate={imgSrc === src ? "visible" : "hidden"}
      variants={imageVariants}
    />
  );
};

export default ProgressiveImage;
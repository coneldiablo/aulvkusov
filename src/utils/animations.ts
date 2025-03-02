import { useEffect, useState } from 'react';

// Animation timing constants
export const TIMING = {
  FAST: 200,
  MEDIUM: 300,
  SLOW: 500,
  STAGGER: 50
};

// Easing functions
export const EASING = {
  // Standard easing functions
  LINEAR: [0, 0, 1, 1],
  EASE_IN: [0.42, 0, 1, 1],
  EASE_OUT: [0, 0, 0.58, 1],
  EASE_IN_OUT: [0.42, 0, 0.58, 1],
  
  // Custom easing functions
  SPRING: [0.43, 0.13, 0.23, 0.96], // Bouncy spring effect
  BACK: [0.68, -0.55, 0.27, 1.55],  // Slight overshoot
  ANTICIPATE: [0.70, 0, 0.84, 0],   // Anticipation before action
};

// Page transition variants
export const pageTransitions = {
  initial: { 
    opacity: 0,
    y: 20
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.MEDIUM / 1000,
      ease: EASING.SPRING,
      when: "beforeChildren",
      staggerChildren: TIMING.STAGGER / 1000
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: TIMING.MEDIUM / 1000,
      ease: EASING.EASE_OUT
    }
  }
};

// Content reveal variants
export const contentVariants = {
  initial: { 
    opacity: 0,
    y: 20
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.MEDIUM / 1000,
      ease: EASING.SPRING
    }
  }
};

// Staggered children variants
export const staggerContainerVariants = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: {
      staggerChildren: TIMING.STAGGER / 1000
    }
  }
};

// Item variants for staggered animations
export const itemVariants = {
  initial: { 
    opacity: 0,
    y: 20
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.MEDIUM / 1000,
      ease: EASING.SPRING
    }
  }
};

// Button hover animation
export const buttonVariants = {
  initial: { 
    scale: 1 
  },
  hover: { 
    scale: 1.05,
    transition: {
      duration: TIMING.FAST / 1000,
      ease: EASING.SPRING
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      duration: TIMING.FAST / 1000,
      ease: EASING.SPRING
    }
  }
};

// Card hover animation
export const cardVariants = {
  initial: { 
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  },
  hover: { 
    scale: 1.02,
    y: -5,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: {
      duration: TIMING.MEDIUM / 1000,
      ease: EASING.SPRING
    }
  }
};

// Modal animation
export const modalVariants = {
  initial: { 
    opacity: 0,
    scale: 0.9
  },
  animate: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: TIMING.MEDIUM / 1000,
      ease: EASING.SPRING
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: TIMING.FAST / 1000,
      ease: EASING.EASE_OUT
    }
  }
};

// Backdrop animation
export const backdropVariants = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: {
      duration: TIMING.MEDIUM / 1000
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: TIMING.FAST / 1000
    }
  }
};

// Fade in animation
export const fadeInVariants = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: {
      duration: TIMING.MEDIUM / 1000,
      ease: EASING.EASE_OUT
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: TIMING.FAST / 1000,
      ease: EASING.EASE_IN
    }
  }
};

// Slide in from right
export const slideInRightVariants = {
  initial: { 
    x: '100%',
    opacity: 0
  },
  animate: { 
    x: 0,
    opacity: 1,
    transition: {
      duration: TIMING.MEDIUM / 1000,
      ease: EASING.SPRING
    }
  },
  exit: { 
    x: '100%',
    opacity: 0,
    transition: {
      duration: TIMING.MEDIUM / 1000,
      ease: EASING.EASE_IN
    }
  }
};

// Slide in from left
export const slideInLeftVariants = {
  initial: { 
    x: '-100%',
    opacity: 0
  },
  animate: { 
    x: 0,
    opacity: 1,
    transition: {
      duration: TIMING.MEDIUM / 1000,
      ease: EASING.SPRING
    }
  },
  exit: { 
    x: '-100%',
    opacity: 0,
    transition: {
      duration: TIMING.MEDIUM / 1000,
      ease: EASING.EASE_IN
    }
  }
};

// Scroll-triggered animation hook
export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref);
        }
      },
      { threshold }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, threshold]);

  return [setRef, isVisible] as const;
};

// Reduced motion preference hook
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

// Get animation variants based on reduced motion preference
export const getReducedMotionVariants = (prefersReducedMotion: boolean, variants: any) => {
  if (prefersReducedMotion) {
    // Simplified animations for reduced motion preference
    return {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: { duration: 0.1 }
      },
      exit: { 
        opacity: 0,
        transition: { duration: 0.1 }
      }
    };
  }
  
  return variants;
};
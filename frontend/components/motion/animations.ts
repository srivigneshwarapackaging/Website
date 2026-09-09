import { Variants } from 'framer-motion';

// 1. fadeInUp: Now with Type Safety and refined 3D entrance
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    scale: 0.95, 
    rotateX: 8 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    rotateX: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 1, 0.5, 1], // Power4 Out ease for smooth deceleration
    }
  }
};

// 2. staggerContainer: Optimized for fast-scrolling lists
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.12, // Slightly faster stagger for better UX
      delayChildren: 0.05 
    }
  }
};

// 3. scrollHover: The "Entrance Lift" effect for entire sections
export const scrollHover: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.98, 
    y: 30,
    filter: "blur(4px)" // Subtle blur for a depth-of-field effect on entry
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    } 
  }
};

// 4. cardHover: A reusable spring hover for your Product and About cards
export const cardHover = {
  hover: {
    y: -12,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};
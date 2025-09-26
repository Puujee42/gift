import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Keyframes for a continuous, gentle pulsing glow effect on the entire rose
const pulsingGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 10px #FF69B4) drop-shadow(0 0 25px #FF1493);
  }
  50% {
    filter: drop-shadow(0 0 15px #FF1493) drop-shadow(0 0 35px #FF1493);
  }
`;

// The container centers the rose and applies the continuous magical glow.
// ✅ It's now responsive and will scale down on smaller screens.
const RoseContainer = styled.div`
  margin-bottom: 2rem;
  animation: ${pulsingGlow} 4s infinite ease-in-out;

  /* On mobile, we reduce the size of the rose to better fit the screen. */
  @media (max-width: 768px) {
    transform: scale(0.8);
    margin-bottom: 1rem; // Reduce margin on mobile
  }
`;

// Animation variants for the SVG container, staggering the drawing of the rose's parts.
const svgVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.2, // Each part of the rose will draw one after the other
    },
  },
};

// Animation variants for each <path> to create the "magical drawing" effect.
const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

// Animation variants for the sparkles to twinkle infinitely.
const sparkleVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: [0, 1, 0], // Fades in and out
        transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
        }
    }
};

const GlowingRose = () => {
  return (
    <RoseContainer>
      <motion.svg
        width="150"
        height="150"
        viewBox="0 0 48 48" // Using a 48x48 viewbox for the rose design
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        // This adds a springy pulse on hover, like a magical flower reacting to touch
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        style={{ overflow: 'visible' }} // Allows sparkles to be seen outside the viewbox
      >
        {/* Define a gradient to give the rose petals a rich, magical color */}
        <defs>
            <linearGradient id="roseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFC0CB" /> 
                <stop offset="100%" stopColor="#FF69B4" /> 
            </linearGradient>
        </defs>

        {/* --- Rose Elements --- */}
        <motion.path
          d="M24 44 V 28" // The stem of the rose
          stroke="#90EE90" 
          strokeWidth="1.5"
          variants={pathVariants}
        />
        <motion.path
          d="M30 36 C 24 38, 26 30, 24 32" // A delicate leaf
          stroke="#90EE90" 
          strokeWidth="1.5"
          variants={pathVariants}
        />
        <motion.path
          d="M20 28 C 18 26, 26 26, 24 28 C 22 30, 30 30, 28 28" // Sepal (leaves at the base of the bloom)
          stroke="#3CB371" // A darker green
          strokeWidth="1.5"
          fill="#3CB371"
          variants={pathVariants}
        />
        {/* Multi-layered petals for a fuller, more beautiful rose bloom */}
        <motion.path
          d="M24 10 C 12 10, 12 28, 24 28 C 36 28, 36 10, 24 10 Z" // Outer petals
          fill="url(#roseGradient)"
          stroke="#FF1493"
          strokeWidth="0.5"
          variants={pathVariants}
        />
        <motion.path
          d="M24 14 C 18 14, 18 25, 24 25 C 30 25, 30 14, 24 14 Z" // Inner petals
          fill="url(#roseGradient)"
          stroke="#FF1493"
          strokeWidth="0.5"
          variants={pathVariants}
        />
         <motion.path
          d="M24 18 C 21 18, 21 23, 24 23 C 27 23, 27 18, 24 18 Z" // Core petals
          fill="#FFFFFF"
          stroke="#FF1493"
          strokeWidth="0.5"
          variants={pathVariants}
        />

        {/* --- Magical Sparkles --- */}
        <motion.path
            d="M 12 8 L 13 10 L 15 11 L 13 12 L 12 14 L 11 12 L 9 11 L 11 10 Z" // 4-point star
            fill="#FFD700"
            variants={{...sparkleVariants, visible: {...sparkleVariants.visible, transition: {...sparkleVariants.visible.transition, delay: 0.5 }}}}
            initial="hidden"
            animate="visible"
        />
        <motion.path
            d="M 38 15 L 39 17 L 41 18 L 39 19 L 38 21 L 37 19 L 35 18 L 37 17 Z"
            fill="#FFFFFF"
            variants={{...sparkleVariants, visible: {...sparkleVariants.visible, transition: {...sparkleVariants.visible.transition, delay: 1.0 }}}}
            initial="hidden"
            animate="visible"
        />
      </motion.svg>
    </RoseContainer>
  );
};

export default GlowingRose;
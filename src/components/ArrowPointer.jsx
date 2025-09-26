import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// The main wrapper for positioning and a continuous, gentle floating animation.
// A media query is added to scale it down on smaller screens.
const ArrowWrapper = styled(motion.div)`
  position: absolute;
  /* These will be controlled by props passed from the parent */
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  transform: ${({ rotate }) => `rotate(${rotate}deg)`};
  width: 150px;
  height: 100px;
  z-index: 9;
  
  /* ✅ Make it responsive! */
  @media (max-width: 768px) {
    // On mobile, we make the entire component smaller to fit better.
    transform: ${({ rotate }) => `rotate(${rotate}deg) scale(0.7)`};
    // We might need to adjust the origin if it looks off-center
    transform-origin: center center;
  }
`;

const Text = styled(motion.p)`
  position: absolute;
  top: 0;
  left: 20px; 
  font-family: ${({ theme }) => theme.fonts.secondary || 'cursive'};
  color: ${({ theme }) => theme.colors.primaryPink || '#FF69B4'};
  text-shadow: 0 0 8px ${({ theme }) => theme.colors.primaryPink || '#FFB6C1'};
  margin: 0;
  white-space: nowrap; // Prevents text from wrapping on scale
`;

const ArrowPointer = ({ position, rotation }) => {
  // --- Animation Variants ---
  // These animations will work perfectly on both desktop and mobile
  // because we are scaling the parent container.

  const wrapperVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 1.8, duration: 0.5 },
    },
    bounce: {
      y: [0, -8, 0], // A softer bounce to create a floating effect
      transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const drawVariant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: 'easeInOut', delay: 2.0 } },
  };

  const textVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 2.5 } },
  };

  return (
    <ArrowWrapper
      top={position.top}
      left={position.left}
      right={position.right}
      bottom={position.bottom}
      rotate={rotation}
      variants={wrapperVariants}
      initial="hidden"
      animate={["visible", "bounce"]} // Chain the animations
    >
      <Text variants={textVariant}>Энд дар…</Text>
      <motion.svg width="150" height="100" viewBox="0 0 150 100" fill="none" style={{ overflow: 'visible' }}>
        {/* A magical, swirling path */}
        <motion.path
          d="M 20 80 C 40 20, 100 20, 120 50"
          stroke="#FF69B4" // Hot Pink
          strokeWidth="2"
          variants={drawVariant}
        />
        {/* A more brilliant 8-pointed sparkle at the end of the trail */}
        <motion.g transform="translate(120, 50)">
            <motion.path
              d="M -8 0 H 8 M 0 -8 V 8" // Main cross sparkle
              stroke="#FFD700" // Gold sparkle
              strokeWidth="2"
              variants={drawVariant}
            />
            <motion.path
              d="M -6 -6 L 6 6 M -6 6 L 6 -6" // Diagonal cross sparkle
              stroke="#FFFFFF" // White highlight for more pop
              strokeWidth="1.5"
              variants={drawVariant}
            />
        </motion.g>
      </motion.svg>
    </ArrowWrapper>
  );
};

export default ArrowPointer;
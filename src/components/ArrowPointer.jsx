import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// The main wrapper for positioning and the continuous bounce animation
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
  z-index: 9; // Just below the crystal
`;

const Text = styled(motion.p)`
  position: absolute;
  top: 0;
  left: 35px;
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.glowCyan};
  text-shadow: 0 0 8px ${({ theme }) => theme.colors.glowCyan};
  margin: 0;
`;

const ArrowPointer = ({ position, rotation }) => {
  // --- Animation Variants ---

  // For the whole component: fade in and then start bouncing
  const wrapperVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 1.8, duration: 0.5 }, // Appears after the crystal
    },
    bounce: {
      y: [0, -10, 0],
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  // For the SVG path to "draw" itself
  const drawVariant = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 1, ease: 'easeInOut', delay: 2.0 } },
  };

  // For the text to fade in
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
      animate={["visible", "bounce"]} // Chain two animations
    >
      <Text variants={textVariant}>Click Me</Text>
      <motion.svg width="150" height="100" viewBox="0 0 150 100" fill="none">
        <motion.path
          d="M 20 80 Q 50 10 130 50" // A nice curve
          stroke="#00FFFF"
          strokeWidth="2"
          variants={drawVariant}
        />
        {/* The arrowhead */}
        <motion.path
          d="M 120 40 L 130 50 L 120 60"
          stroke="#00FFFF"
          strokeWidth="2"
          variants={drawVariant}
        />
      </motion.svg>
    </ArrowWrapper>
  );
};

export default ArrowPointer;
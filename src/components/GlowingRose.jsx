import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// This container will center the rose and apply a neon glow effect using a CSS filter.
const RoseContainer = styled.div`
  margin-bottom: 2rem;
  filter: drop-shadow(0 0 10px ${({ theme }) => theme.colors.primaryPink})
          drop-shadow(0 0 25px ${({ theme }) => theme.colors.accentNeon});
`;

// These are the animation variants for the SVG container.
// It will stagger the animation of its children (the paths of the rose).
const svgVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.2, // This will make each path draw one after the other
    },
  },
};

// These are the animation variants for each <path> in the SVG.
// This creates the "drawing" effect.
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

const GlowingRose = () => {
  return (
    <RoseContainer>
      <motion.svg
        width="150"
        height="150"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        // This part adds the continuous pulsing/breathing animation
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* We use motion.path to animate each part of the SVG */}
        <motion.path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
          stroke="#FF69B4"
          strokeWidth="0.5"
          variants={pathVariants}
        />
        <motion.path
          d="M12 17.61c-3.09 0-5.61-2.52-5.61-5.61 0-3.09 2.52-5.61 5.61-5.61s5.61 2.52 5.61 5.61c0 3.09-2.52 5.61-5.61 5.61zm0-9.22c-2.01 0-3.61 1.6-3.61 3.61s1.6 3.61 3.61 3.61 3.61-1.6 3.61-3.61-1.6-3.61-3.61-3.61z"
          stroke="#F400F4"
          strokeWidth="0.5"
          variants={pathVariants}
        />
        <motion.path
          d="M12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"
          stroke="#FFFFFF"
          strokeWidth="0.5"
          variants={pathVariants}
        />
      </motion.svg>
    </RoseContainer>
  );
};

export default GlowingRose;
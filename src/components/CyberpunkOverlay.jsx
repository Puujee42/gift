import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Keyframes for a gentle, magical sparkle effect on the text
const sparkleAnimation = keyframes`
  0%, 100% { 
    opacity: 1; 
    text-shadow: 0 0 6px #fff, 0 0 12px #FF69B4, 0 0 18px #FF69B4; 
  }
  50% { 
    opacity: 0.9; 
    text-shadow: 0 0 8px #fff, 0 0 16px #FF1493, 0 0 24px #FF1493; 
  }
`;

// A shared style for all corner decorations, now using an SVG for an elegant flourish
const CornerDecoration = styled(motion.div)`
  position: fixed;
  width: 60px;
  height: 60px;
  
  // Using a filter for a soft, magical glow
  filter: drop-shadow(0 0 5px ${({ theme }) => theme.colors.primaryPink || '#FFB6C1'});
`;

// Individual corner components with specific rotations for the flourish SVG
const TopLeftCorner = styled(CornerDecoration)`
  top: 20px;
  left: 20px;
`;

const TopRightCorner = styled(CornerDecoration)`
  top: 20px;
  right: 20px;
  transform: rotate(90deg);
`;

const BottomLeftCorner = styled(CornerDecoration)`
  bottom: 20px;
  left: 20px;
  transform: rotate(-90deg);
`;

const BottomRightCorner = styled(CornerDecoration)`
  bottom: 20px;
  right: 20px;
  transform: rotate(180deg);
`;

// The container for our sparkling welcome message
const EnchantedMessage = styled(motion.div)`
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${({ theme }) => theme.fonts.secondary || "'Great Vibes', cursive"};
  color: ${({ theme }) => theme.colors.primaryPink || '#FFC0CB'};
  letter-spacing: 2px;
  font-size: 1.5rem; // Slightly larger for better readability
  text-transform: none; // Changed from uppercase for a softer look
  animation: ${sparkleAnimation} 2.5s infinite linear;
`;

// This component provides the elegant, magical frame for the main view.
const CyberpunkOverlay = () => {
  // Animation variants for the corner containers to fade in
  const cornerContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 1, 
        delay: 1.5,
        when: "beforeChildren" // Ensure container is visible before the path draws
      } 
    },
  };

  // Animation variant for the SVG path to "draw" itself like magic
  const pathVariant = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1, 
      transition: { 
        duration: 1.5, 
        ease: 'easeInOut' 
      } 
    },
  };

  // Animation variants for the welcome text to appear gracefully
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 2 } },
  };
  
  // Reusable flourish component to avoid repeating the SVG code
  const Flourish = () => (
    <motion.svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <motion.path
          d="M 5 50 C 10 20, 20 10, 50 5"
          stroke="#FFB6C1"
          strokeWidth="2"
          strokeLinecap="round"
          variants={pathVariant}
        />
        <motion.path
          d="M 5 50 C 20 45, 45 20, 50 5"
          stroke="#FFFFFF"
          strokeWidth="0.5"
          strokeLinecap="round"
          variants={pathVariant}
        />
    </motion.svg>
  );

  return (
    <>
      <TopLeftCorner variants={cornerContainerVariants} initial="hidden" animate="visible"><Flourish /></TopLeftCorner>
      <TopRightCorner variants={cornerContainerVariants} initial="hidden" animate="visible"><Flourish /></TopRightCorner>
      <BottomLeftCorner variants={cornerContainerVariants} initial="hidden" animate="visible"><Flourish /></BottomLeftCorner>
      <BottomRightCorner variants={cornerContainerVariants} initial="hidden" animate="visible"><Flourish /></BottomRightCorner>
      
      <EnchantedMessage variants={messageVariants} initial="hidden" animate="visible">
        A Magical Celebration Awaits...
      </EnchantedMessage>
    </>
  );
};

export default CyberpunkOverlay;
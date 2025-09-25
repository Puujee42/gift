import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';

// Keyframes for the glitch effect on the text
const glitchAnimation = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-3px, 3px); }
  40% { transform: translate(-3px, -3px); }
  60% { transform: translate(3px, 3px); }
  80% { transform: translate(3px, -3px); }
  100% { transform: translate(0); }
`;

// A shared style for all corner brackets to avoid repetition
const CornerBracket = styled(motion.div)`
  position: fixed;
  width: 50px;
  height: 50px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.glowCyan};
  opacity: 0.7;
`;

// Individual corner components with their specific border properties
const TopLeftCorner = styled(CornerBracket)`
  top: 20px;
  left: 20px;
  border-width: 4px 0 0 4px;
`;

const TopRightCorner = styled(CornerBracket)`
  top: 20px;
  right: 20px;
  border-width: 4px 4px 0 0;
`;

const BottomLeftCorner = styled(CornerBracket)`
  bottom: 20px;
  left: 20px;
  border-width: 0 0 4px 4px;
`;

const BottomRightCorner = styled(CornerBracket)`
  bottom: 20px;
  right: 20px;
  border-width: 0 4px 4px 0;
`;

// The container for our glitching text
const GlitchContainer = styled(motion.div)`
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.glowCyan};
  letter-spacing: 3px;
  font-size: 0.9rem;
  text-transform: uppercase;

  &::before,
  &::after {
    content: 'CONNECTION: SECURE';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.darkPurple};
    overflow: hidden;
  }

  &::before {
    left: 3px;
    text-shadow: -2px 0 ${({ theme }) => theme.colors.primaryPink};
    animation: ${glitchAnimation} 2.5s infinite linear alternate-reverse;
  }

  &::after {
    left: -3px;
    text-shadow: -2px 0 ${({ theme }) => theme.colors.glowCyan};
    animation: ${glitchAnimation} 3s infinite linear alternate-reverse;
  }
`;

const CyberpunkOverlay = () => {
  // Animation variants for the corners to fade in
  const cornerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.7, transition: { duration: 1, delay: 1.5 } },
  };

  // Animation variants for the glitch text to fade in
  const glitchTextVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 2 } },
  };

  return (
    <>
      <TopLeftCorner variants={cornerVariants} initial="hidden" animate="visible" />
      <TopRightCorner variants={cornerVariants} initial="hidden" animate="visible" />
      <BottomLeftCorner variants={cornerVariants} initial="hidden" animate="visible" />
      <BottomRightCorner variants={cornerVariants} initial="hidden" animate="visible" />
      <GlitchContainer variants={glitchTextVariants} initial="hidden" animate="visible">
        CONNECTION: SECURE
      </GlitchContainer>
    </>
  );
};

export default CyberpunkOverlay;
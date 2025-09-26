import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import GlowingRose from './GlowingRose'; // Themed as a magical, glowing rose

// ✅ A new, magical keyframe animation to replace the cyberpunk flicker.
const sparklingGlowAnimation = keyframes`
  0%, 100% {
    text-shadow:
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 20px #FF69B4,
      0 0 30px #FF69B4,
      0 0 40px #FF69B4;
  }
  50% {
    text-shadow:
      0 0 10px #fff,
      0 0 20px #fff,
      0 0 30px #FF1493,
      0 0 40px #FF1493,
      0 0 50px #FF1493;
  }
`;

// This wrapper centers the content perfectly on any device.
const MessageWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  padding: 2rem;
`;

// ✅ The main title, now with a royal, elegant font and the new sparkle animation.
// The `clamp()` function makes the font size perfectly responsive.
const MainText = styled.h1`
  font-family: 'Great Vibes', cursive;
  font-size: clamp(3rem, 10vw, 7rem); // Scales beautifully from mobile to desktop
  font-weight: 500; // A softer weight for an elegant font
  color: ${({ theme }) => theme.colors.text || '#FFFFFF'};
  animation: ${sparklingGlowAnimation} 3s linear infinite;
`;

// ✅ The subtext, updated with a clean, readable font and softer styling.
const SubText = styled(motion.p)`
  font-size: clamp(1rem, 3vw, 1.5rem); // Also perfectly responsive
  font-family: ${({ theme }) => theme.fonts.secondary || 'cursive'};
  color: ${({ theme }) => theme.colors.primaryPink || '#FFB6C1'};
  margin-top: 1rem;
  letter-spacing: 0.1rem;
  text-transform: none; // No longer uppercase for a softer feel
`;

const RomanticMessage = () => {
  // These animation variants work perfectly for the new theme.
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
        delay: 0.5,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  return (
    <MessageWrapper
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* The beautiful GlowingRose component fits perfectly at the top. */}
      <motion.div variants={childVariants}>
        <GlowingRose />
      </motion.div>
      
      {/* ✅ The main title with new, princess-themed text. */}
      <motion.div variants={childVariants}>
        <MainText>A Royal Celebration</MainText>
      </motion.div>

      {/* ✅ The subtext with a new, enchanting message. */}
      <SubText variants={childVariants}>
        For a very special princess
      </SubText>
    </MessageWrapper>
  );
};

export default RomanticMessage;
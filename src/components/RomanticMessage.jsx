import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import GlowingRose from './GlowingRose'; // Themed as a magical, glowing rose

// A magical sparkle animation for romantic elegance
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

// Wrapper for centering everything beautifully
const MessageWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  padding: 2rem;
`;

// Main elegant animated text
const MainText = styled.h1`
  font-family: 'Great Vibes', cursive;
  font-size: clamp(3rem, 10vw, 7rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text || '#FFFFFF'};
  animation: ${sparklingGlowAnimation} 3s linear infinite;
`;

// Subtext styled with softness and readability
const SubText = styled(motion.p)`
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-family: ${({ theme }) => theme.fonts.secondary || 'cursive'};
  color: ${({ theme }) => theme.colors.primaryPink || '#FFB6C1'};
  margin-top: 1rem;
  letter-spacing: 0.1rem;
  text-transform: none;
`;

const GlowingLoveLetter = () => {
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
      {/* Magical glowing rose at the top */}
      <motion.div variants={childVariants}>
        <GlowingRose />
      </motion.div>

      {/* Romantic main message */}
      <motion.div variants={childVariants}>
        <MainText>Төрсөн өдрийн мэнд хүргье</MainText>
      </motion.div>

      {/* Beloved’s name with sparkling style */}
      <motion.div variants={childVariants}>
        <MainText>Лхамцоод</MainText>
      </motion.div>
    </MessageWrapper>
  );
};

export default GlowingLoveLetter;

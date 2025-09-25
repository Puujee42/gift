import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import GlowingRose from './GlowingRose'; // <-- 1. Import the new component

const flickerAnimation = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow:
      0 0 5px ${({ theme }) => theme.colors.text},
      0 0 10px ${({ theme }) => theme.colors.text},
      0 0 20px ${({ theme }) => theme.colors.accentNeon},
      0 0 40px ${({ theme }) => theme.colors.accentNeon},
      0 0 80px ${({ theme }) => theme.colors.accentNeon},
      0 0 90px ${({ theme }) => theme.colors.accentNeon};
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
`;

const MessageWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  padding: 2rem;
`;

const MainText = styled.h1`
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  animation: ${flickerAnimation} 2s linear infinite;
`;

const SubText = styled(motion.p)`
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.glowCyan};
  margin-top: 1rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`;

const RomanticMessage = () => {
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
      {/* 2. Place the GlowingRose component here */}
      {/* It's wrapped in a motion.div to be part of the stagger animation */}
      <motion.div variants={childVariants}>
        <GlowingRose />
      </motion.div>
      
      <motion.div variants={childVariants}>
        <MainText>LOVE IN THE NEON RAIN</MainText>
      </motion.div>

      <SubText variants={childVariants}>
        A Cyber-Romantic Tale
      </SubText>
    </MessageWrapper>
  );
};

export default RomanticMessage;
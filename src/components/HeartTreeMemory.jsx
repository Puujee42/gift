import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MemoryContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  background: rgba(26, 0, 26, 0.5);
  border: 1px solid ${({ theme }) => theme.colors.primaryPink};
  border-radius: 15px;
  backdrop-filter: blur(10px);
`;

const TextContainer = styled(motion.div)`
  max-width: 400px;
`;

const RomanticText = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 1.5rem;
  color: #fff;
  line-height: 1.6;
`;

// A heart shape we can reuse in our SVG
const HeartSymbol = () => (
  <motion.path
    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    fill="#FF69B4"
    stroke="#F400F4"
    strokeWidth="1"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, ease: 'backOut' }}
  />
);

const HeartTreeMemory = ({ text }) => {
  // --- Animation Orchestration ---
  const memoryVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delay: 0.5 } },
  };

  const svgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.8 } }, // Trunk grows, then branches
  };

  const drawVariant = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 2, ease: 'easeInOut' } },
  };

  return (
    <MemoryContainer variants={memoryVariants} initial="hidden" animate="visible">
      {/* The Tree SVG */}
      <motion.svg width="200" height="250" viewBox="0 0 100 125">
        <motion.g variants={svgVariants}>
          {/* Trunk */}
          <motion.path d="M 50 120 V 20" stroke="#fff" strokeWidth="2" variants={drawVariant} />
          {/* Branches */}
          <motion.path d="M 50 80 L 20 50" stroke="#fff" strokeWidth="2" variants={drawVariant} />
          <motion.path d="M 50 60 L 80 30" stroke="#fff" strokeWidth="2" variants={drawVariant} />
          <motion.path d="M 50 40 L 30 20" stroke="#fff" strokeWidth="2" variants={drawVariant} />
          
          {/* Heart Leaves - positioned at the end of branches */}
          {/* The delay ensures they only appear AFTER the branches have finished drawing */}
          <motion.g initial="hidden" animate="visible" transition={{ delay: 2.5 }}>
            <g transform="translate(12, 42) scale(0.7)"><HeartSymbol /></g>
            <g transform="translate(72, 22) scale(0.7)"><HeartSymbol /></g>
            <g transform="translate(22, 12) scale(0.7)"><HeartSymbol /></g>
            <g transform="translate(42, 2) scale(0.7)"><HeartSymbol /></g>
          </motion.g>
        </motion.g>
      </motion.svg>

      {/* The Romantic Text */}
      <TextContainer>
        <RomanticText
          // Animate in after the tree is fully grown
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          {text}
        </RomanticText>
      </TextContainer>
    </MemoryContainer>
  );
};

export default HeartTreeMemory;
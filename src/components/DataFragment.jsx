import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Keyframes for the intense data glitching effect
const glitchEffect = keyframes`
  0% { text-shadow: 0.05em 0 0 #00FFFF, -0.05em 0 0 #F400F4; clip-path: inset(0 0 0 0); }
  5% { clip-path: inset(0.5em 0 0.2em 0); }
  10% { clip-path: inset(0.8em 0 0.4em 0); }
  // ... (add more steps for a more complex glitch)
  100% { text-shadow: 0.05em 0 0 #00FFFF, -0.05em 0 0 #F400F4; clip-path: inset(0 0 0 0); }
`;

const FragmentWrapper = styled(motion.div)`
  position: absolute;
  top: ${({ top }) => top || 'auto'};
  left: ${({ left }) => left || 'auto'};
  right: ${({ right }) => right || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.text};
  -webkit-font-smoothing: antialiased;
`;

const GlitchedText = styled(motion.p)`
  font-size: 1.2rem;
  animation: ${glitchEffect} 1.5s infinite linear;
  color: ${({ theme }) => theme.colors.glowCyan};
`;

const RevealedText = styled(motion.p)`
  font-size: 1.2rem;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.primaryPink};
  text-shadow: 0 0 8px ${({ theme }) => theme.colors.primaryPink};
`;

const DataFragment = ({ children, top, left, right, bottom }) => {
  const [isDecrypted, setIsDecrypted] = useState(false);

  // The poem line split into individual characters for the typing animation
  const poemChars = Array.from(children);

  // Animation variants for the container of the revealed text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Time delay between each character appearing
        delayChildren: 0.2,
      },
    },
  };

  // Animation variants for each individual character
  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <FragmentWrapper
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      onClick={() => setIsDecrypted(true)}
      whileHover={{ scale: 1.1 }}
    >
      <AnimatePresence>
        {!isDecrypted ? (
          <GlitchedText
            key="glitch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
          >
            Click on me
          </GlitchedText>
        ) : (
          <RevealedText
            key="revealed"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {poemChars.map((char, index) => (
              <motion.span key={index} variants={charVariants}>
                {char}
              </motion.span>
            ))}
          </RevealedText>
        )}
      </AnimatePresence>
    </FragmentWrapper>
  );
};

export default DataFragment;
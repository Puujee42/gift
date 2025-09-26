import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// --- Styled Components with Responsive Media Queries ---

// The main wrapper for positioning the magical element.
// ✅ It now scales down on smaller screens to fit the mobile layout.
const WhisperWrapper = styled(motion.div)`
  position: absolute;
  top: ${({ top }) => top || 'auto'};
  left: ${({ left }) => left || 'auto'};
  right: ${({ right }) => right || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem; // Space between the orb and the text
  -webkit-font-smoothing: antialiased;

  /* On mobile, we scale the entire element down slightly. */
  @media (max-width: 768px) {
    transform: scale(0.9);
    transform-origin: left center; // Ensures it scales from its starting point
  }
`;

// The glowing orb of magic. No changes needed here as the parent scales it.
const MagicOrb = styled(motion.div)`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: radial-gradient(circle, #FFFFFF, #FFC0CB);
  box-shadow: 0 0 10px #FFB6C1, 0 0 20px #FF69B4;
`;

// The text that magically appears next to the orb on hover.
const HoverPrompt = styled(motion.p)`
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.secondary || 'cursive'};
  color: ${({ theme }) => theme.colors.primaryPink || '#FFB6C1'};
  text-shadow: 0 0 5px #FFF;
  white-space: nowrap; // Prevents the text from wrapping
`;

// The revealed secret message, with a responsive font size.
const SecretMessage = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.secondary || "'Great Vibes', cursive"};
  font-size: 1.5rem; 
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.primaryPink || '#FF69B4'};
  text-shadow: 0 0 8px ${({ theme }) => theme.colors.primaryPink || '#FF69B4'};
  white-space: nowrap;

  /* ✅ Make the revealed text slightly smaller on mobile for a better fit. */
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

// --- The Main Component ---

const DataFragment = ({ children, top, left, right, bottom }) => {
  const [isDecrypted, setIsDecrypted] = useState(false);

  const handleReveal = () => setIsDecrypted(true);

  const messageChars = Array.from(children);

  // Animation variants remain the same, they scale with the parent.
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  };

  const promptVariants = {
    initial: { opacity: 0, x: -10 },
    hover: { opacity: 1, x: 0 },
  };

  return (
    <WhisperWrapper
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      onClick={handleReveal}
      onTouchStart={handleReveal} // ✅ Added for better mobile touch support
      initial="initial"
      whileHover="hover" // Note: `whileHover` is ignored on touch devices. The tap/click will still work.
    >
      <AnimatePresence>
        {!isDecrypted ? (
          <motion.div
            key="enchanted-prompt"
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.4 } }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}
          >
            <MagicOrb
              animate={{
                scale: [1, 1.1, 1],
                y: [0, -5, 0],
                transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
            />
            <HoverPrompt variants={promptVariants} transition={{ ease: 'easeOut' }}>
              Reveal a secret...
            </HoverPrompt>
          </motion.div>
        ) : (
          <SecretMessage
            key="secret-message"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {messageChars.map((char, index) => (
              <motion.span key={index} variants={charVariants} style={{ display: 'inline-block' }}>
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </SecretMessage>
        )}
      </AnimatePresence>
    </WhisperWrapper>
  );
};

export default DataFragment;
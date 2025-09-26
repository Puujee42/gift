import {React, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// --- Styled Components with a Responsive Media Query ---

// The wrapper for positioning our magical, interactive spot.
// ✅ It's now responsive and scales down on smaller screens.
const Wrapper = styled(motion.div)`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  z-index: 20;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  /* On mobile, we scale down the entire element to keep it subtle and elegant. */
  @media (max-width: 768px) {
    transform: scale(0.8);
  }
`;

// The initial visual: a delicate, twinkling wisp of magic.
// No changes are needed here as the parent `Wrapper` handles scaling.
const MagicWisp = styled(motion.div)`
  width: 15px;
  height: 15px;
  
  // A filter creates a softer, more magical glow.
  filter: drop-shadow(0 0 8px #FFB6C1) 
          drop-shadow(0 0 15px ${({ theme }) => theme.colors.primaryPink || '#FF69B4'});
`;

// A container for the revealed heart, applying a beautiful, soft glow.
const HeartWrapper = styled(motion.div)`
  filter: drop-shadow(0 0 10px ${({ theme }) => theme.colors.primaryPink || '#FF69B4'})
          drop-shadow(0 0 20px ${({ theme }) => theme.colors.primaryPink || '#FF69B4'});
`;

// --- The Main Component ---

const StarlightMessenger = ({ top, left, right, bottom }) => {
  const [isOpen, setIsOpen] = useState(false);

  // A single handler for both click and touch events.
  const handleClick = () => {
    setIsOpen(true);
  };

  // --- Animation Variants (no changes needed) ---

  const wispVariants = {
    twinkle: {
      scale: [1, 1.3, 1],
      opacity: [0.8, 1, 0.8],
      transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
    },
    exit: { scale: [1, 1.5, 0], opacity: 0, transition: { duration: 0.4 } },
  };

  const heartVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: 'backOut', delay: 0.1 },
    },
  };

  return (
    <Wrapper 
      top={top} 
      left={left} 
      right={right} 
      bottom={bottom} 
      onClick={handleClick}
      // ✅ Added onTouchStart for better mobile and tablet support.
      onTouchStart={handleClick}
    >
      <AnimatePresence>
        {!isOpen ? (
          <MagicWisp key="wisp" variants={wispVariants} animate="twinkle" exit="exit">
            {/* Using an SVG for a more elegant, 4-point sparkle shape */}
            <svg width="15" height="15" viewBox="0 0 15 15" fill="#FFFFFF">
                <path d="M7.5 0 L9 6 L 15 7.5 L 9 9 L 7.5 15 L 6 9 L 0 7.5 L 6 6 Z" />
            </svg>
          </MagicWisp>
        ) : (
          <HeartWrapper
            key="heart"
            variants={heartVariants}
            initial="hidden"
            animate="visible"
          >
            {/* The revealed glowing, beating princess heart SVG */}
            <motion.svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="#FF69B4" // A softer, more romantic hot pink
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </motion.svg>
          </HeartWrapper>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default StarlightMessenger;
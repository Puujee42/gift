import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// --- Styled Components ---

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
`;

const Star = styled(motion.div)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 10px #fff, 0 0 20px ${({ theme }) => theme.colors.glowCyan};
`;

// A simple container for the heart, without any background or border
const HeartWrapper = styled(motion.div)`
  filter: drop-shadow(0 0 10px ${({ theme }) => theme.colors.accentNeon})
          drop-shadow(0 0 20px ${({ theme }) => theme.colors.accentNeon});
`;

// --- The Main Component ---

const StarlightMessenger = ({ top, left, right, bottom }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    // This component now only has one function: to open.
    setIsOpen(true);
  };

  // --- Animation Variants ---

  const starVariants = {
    twinkle: {
      scale: [1, 1.3, 1],
      opacity: [0.7, 1, 0.7],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
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
    <Wrapper top={top} left={left} right={right} bottom={bottom} onClick={handleClick}>
      <AnimatePresence>
        {!isOpen ? (
          <Star key="star" variants={starVariants} animate="twinkle" exit="exit" />
        ) : (
          <HeartWrapper
            key="heart"
            variants={heartVariants}
            initial="hidden"
            animate="visible"
          >
            {/* The revealed glowing, beating heart SVG */}
            <motion.svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="#F400F4"
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
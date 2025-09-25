import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// The wrapper is now the main clickable element.
const CrystalWrapper = styled(motion.div)`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
`;

// The frame is the visual part.
const CrystalFrame = styled(motion.div)`
  width: 100%;
  height: 100%;
  border: 2px solid ${({ theme }) => theme.colors.primaryPink};
  box-shadow: 0 0 15px ${({ theme }) => theme.colors.primaryPink},
              inset 0 0 15px ${({ theme }) => theme.colors.primaryPink};
`;

// The component is now much simpler. It just takes an 'onClick' prop.
const InteractiveCrystal = ({ top, left, right, bottom, onClick }) => {

  // Animation for the crystal itself appearing on the main screen.
  const frameVariants = {
    initial: { opacity: 0, scale: 0.5, rotate: 45 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: 'backOut', delay: 1.0 }, // Delay its appearance slightly
    },
    hover: {
      scale: 1.15, // A more pronounced hover effect
      boxShadow: "0 0 25px #FF69B4, inset 0 0 25px #FF69B4",
      transition: { type: 'spring', stiffness: 300 }
    }
  };

  return (
    // The onClick is now directly on the wrapper.
    <CrystalWrapper
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      onClick={onClick} 
      variants={frameVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <CrystalFrame />
    </CrystalWrapper>
  );
};

export default InteractiveCrystal;
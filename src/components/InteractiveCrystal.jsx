import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// The main wrapper for positioning and the primary animation variants.
// ✅ It's now responsive and scales down on smaller screens.
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

  /* On mobile, we scale down the entire crystal to fit the layout. */
  @media (max-width: 768px) {
    transform: scale(0.8);
  }
`;

// The outer frame of our crystal. It's a container for the facets.
const CrystalFrame = styled(motion.div)`
  position: relative; /* This allows us to position the inner facet absolutely. */
  width: 100%;
  height: 100%;
  border: 2px solid ${({ theme }) => theme.colors.primaryPink || '#FF69B4'};
  box-shadow: 0 0 15px ${({ theme }) => theme.colors.primaryPink || '#FF69B4'},
              inset 0 0 15px ${({ theme }) => theme.colors.primaryPink || '#FF69B4'};
`;

// A new inner div to create the illusion of a second, rotated facet.
const InnerFacet = styled(motion.div)`
  position: absolute;
  top: 15%;
  left: 15%;
  width: 70%;
  height: 70%;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.8);
`;


const InteractiveCrystal = ({ top, left, right, bottom, onClick }) => {

  // Animation for the entire crystal wrapper (outer part).
  const wrapperVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'backOut', delay: 1.0 },
    },
    hover: {
      scale: 1.15,
      rotate: -15, // Adds a slight tilt on hover for a more dynamic feel
      boxShadow: "0 0 25px #FF1493, inset 0 0 25px #FF1493",
      transition: { type: 'spring', stiffness: 300 }
    }
  };
  
  // A separate animation for the inner facet to make it feel magical.
  const innerFacetVariants = {
    initial: { opacity: 0, rotate: 0 },
    animate: {
      opacity: 1,
      rotate: 45, // Starts rotated
      transition: { duration: 1, delay: 1.2 }
    },
    hover: {
        rotate: 60, // Rotates further on hover, independently of the parent
        scale: 1.1,
        boxShadow: "inset 0 0 20px #FFFFFF",
    }
  };


  return (
    // The onClick is directly on the wrapper, which contains everything.
    <CrystalWrapper
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      onClick={onClick} 
      variants={wrapperVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <CrystalFrame>
        {/* The inner facet has its own variants for a more complex animation. */}
        <InnerFacet variants={innerFacetVariants} />
      </CrystalFrame>
    </CrystalWrapper>
  );
};

export default InteractiveCrystal;
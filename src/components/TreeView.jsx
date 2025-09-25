import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// A full-screen wrapper with a blurred background
const ViewWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(26, 0, 26, 0.85);
  backdrop-filter: blur(15px);
  z-index: 100;
`;

const TreeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

const RomanticText = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 2rem;
  color: #fff;
  line-height: 1.7;
  max-width: 500px;
  text-shadow: 0 0 10px #fff;
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 30px;
  left: 30px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.glowCyan};
  color: ${({ theme }) => theme.colors.glowCyan};
  font-family: ${({ theme }) => theme.fonts.secondary};
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
`;

// A reusable heart symbol for the leaves
const HeartSymbol = () => (
  <motion.path
    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    fill="#FF69B4"
    stroke="#F400F4"
    strokeWidth="0.5"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, ease: 'backOut' }}
  />
);

const TreeView = ({ onExit }) => {
  // Animation for the entire page
  const pageVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3, ease: 'easeIn' } }
  };

  // Animation for drawing the tree
  const svgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.5, delay: 0.5 } },
  };

  const drawVariant = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 2.5, ease: 'easeInOut' } },
  };

  return (
    <ViewWrapper variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <BackButton whileHover={{ scale: 1.1, color: '#fff', borderColor: '#fff' }} onClick={onExit}>
        &lt; RETURN
      </BackButton>

      <TreeContainer>
        {/* The BIG Tree SVG */}
        <motion.svg width="400" height="450" viewBox="0 0 200 225">
          <motion.g variants={svgVariants} initial="hidden" animate="visible">
            {/* Trunk */}
            <motion.path d="M 100 220 V 20" stroke="#fff" strokeWidth="3" variants={drawVariant} />
            {/* Branches */}
            <motion.path d="M 100 160 L 40 90" stroke="#fff" strokeWidth="3" variants={drawVariant} />
            <motion.path d="M 100 120 L 160 50" stroke="#fff" strokeWidth="3" variants={drawVariant} />
            <motion.path d="M 100 80 L 60 40" stroke="#fff" strokeWidth="3" variants={drawVariant} />
            <motion.path d="M 100 50 L 140 20" stroke="#fff" strokeWidth="3" variants={drawVariant} />
            
            {/* Heart Leaves - appear after the branches are drawn */}
            <motion.g initial="hidden" animate="visible" transition={{ delay: 3.0 }}>
              <g transform="translate(30, 80)"><HeartSymbol /></g>
              <g transform="translate(150, 40)"><HeartSymbol /></g>
              <g transform="translate(50, 30)"><HeartSymbol /></g>
              <g transform="translate(130, 10)"><HeartSymbol /></g>
              <g transform="translate(90, 0)"><HeartSymbol /></g>
            </motion.g>
          </motion.g>
        </motion.svg>

        {/* The Romantic Text */}
        <RomanticText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          Because with you, every moment grows into something beautiful and everlasting.
        </RomanticText>
      </TreeContainer>
    </ViewWrapper>
  );
};

export default TreeView;
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// --- ANIMATIONS AND STYLES ---

// 1. Keyframes for the heart's pulsing glow.
const pulsingGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 10px #ff5050) drop-shadow(0 0 25px #d40000);
  }
  50% {
    filter: drop-shadow(0 0 15px #d40000) drop-shadow(0 0 35px #d40000);
  }
`;

// 2. The main wrapper for positioning, interaction, and the glow.
const HeartWrapper = styled(motion.div)`
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
  
  /* Apply the continuous glow animation */
  animation: ${pulsingGlow} 4s infinite ease-in-out;

  @media (max-width: 768px) {
    transform: scale(0.8);
  }
`;

// --- MAIN COMPONENT: InteractiveHeart ---

const InteractiveCrystal = ({ top, left, right, bottom, onClick }) => {

  // 3. Define the animation variants for the SVG and its paths.
  const svgVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3, // Animate children in sequence.
      },
    },
  };

  // Variant for drawing the outline path.
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  // Variant for filling the heart after the outline is drawn.
  const fillVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 1,
            ease: 'linear'
        }
    }
  };
  
  // Variant for the twinkling sparkles.
  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (delay = 0) => ({
        opacity: [0, 1, 0],
        scale: 1,
        transition: {
            delay,
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
        }
    })
  };

  // Variants for the main wrapper's appearance and hover state.
  const wrapperVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'backOut', delay: 0.5 },
    },
    hover: {
      scale: 1.15,
      transition: { type: 'spring', stiffness: 300, damping: 15 }
    }
  };

  // The perfect heart SVG path data.
  const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

  return (
    <HeartWrapper
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
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24" // The heart path is designed for a 24x24 box.
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        style={{ overflow: 'visible' }}
      >
        <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff8a8a" /> 
                <stop offset="100%" stopColor="#ff5050" /> 
            </linearGradient>
        </defs>

        {/* --- Heart Elements (in drawing order) --- */}
        
        {/* 1. The Fill Layer (animates second) */}
        <motion.path
          d={heartPath}
          fill="url(#heartGradient)"
          stroke="none"
          variants={fillVariants}
        />

        {/* 2. The Outline Layer (animates first) */}
        <motion.path
          d={heartPath}
          fill="none"
          stroke="#FFFFFF" // A bright white outline
          strokeWidth="0.5"
          variants={pathVariants}
        />

        {/* --- Magical Sparkles --- */}
        <motion.path
            d="M 18 6 L 18.5 7.5 L 20 8 L 18.5 8.5 L 18 10 L 17.5 8.5 L 16 8 L 17.5 7.5 Z"
            fill="#FFFFFF"
            custom={0.5} // Custom delay
            variants={sparkleVariants}
        />
        <motion.path
            d="M 5 14 L 5.5 15.5 L 7 16 L 5.5 16.5 L 5 18 L 4.5 16.5 L 3 16 L 4.5 15.5 Z"
            fill="#FFD700"
            custom={1.0} // Custom delay
            variants={sparkleVariants}
        />
      </motion.svg>
    </HeartWrapper>
  );
};

export default InteractiveCrystal;
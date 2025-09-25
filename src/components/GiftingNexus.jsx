import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

// --- Styled Components ---

const NexusWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(26, 0, 26, 0.9);
  backdrop-filter: blur(20px);
  z-index: 100;
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
  z-index: 110;
`;

const GiftMessage = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 3rem;
  color: #fff;
  text-shadow: 0 0 20px #FF69B4, 0 0 10px #fff;
  max-width: 60%;
  text-align: center;
  position: absolute;
  z-index: 110;
  white-space: pre-wrap;
`;

// Typing animation
const CoolTypingAnimation = ({ text, delay = 0 }) => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: delay } }
  };
  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  return (
    <motion.span variants={containerVariants} initial="hidden" animate="visible">
      {Array.from(text).map((char, idx) => (
        <motion.span key={idx} variants={charVariants} style={{ display: 'inline-block' }}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// SVG gift icons

const CutePanda = () => (
  <motion.svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#fff" />
    <circle cx="30" cy="30" r="15" fill="#000" />
    <circle cx="70" cy="30" r="15" fill="#000" />
    <path d="M35 55 A 15 15 0 1 1 65 55" fill="none" stroke="#000" strokeWidth="3" />
    <ellipse cx="38" cy="50" rx="12" ry="18" fill="#000" />
    <ellipse cx="62" cy="50" rx="12" ry="18" fill="#000" />
    <circle cx="38" cy="50" r="4" fill="#fff" />
    <circle cx="62" cy="50" r="4" fill="#fff" />
    <path d="M45 75 A 5 5 0 1 1 55 75" fill="#FFB6C1" />
  </motion.svg>
);

const RomanticGift = () => (
  <motion.svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="40" width="60" height="40" fill="#FF69B4" />
    <rect x="45" y="20" width="10" height="60" fill="#00FFFF" />
    <path d="M50 15 l-3.5 -3.5 C41.5 6.5 35 8 35 15 c0 5 15 15 15 15 s15 -10 15 -15 c0 -7 -6.5 -8.5 -11.5 -3.5 L50 15 z" fill="#F400F4" />
  </motion.svg>
);

// --- Animation Variants ---

const drawVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: 'easeInOut' } }
};

// Infinite upward flying gifts variant
const giftFlyUpInfinite = (delay, xDrift = 0, height = 200, rotation = 0) => ({
  initial: { opacity: 0, scale: 0.5, x: 0, y: 0 },
  animate: {
    opacity: [0, 1, 1, 0],
    y: [0, -height * 0.8, -height, -height * 1.2],
    x: [0, xDrift * 0.6, xDrift, xDrift * 1.3],
    scale: [0.5, 1, 1, 1],
    rotate: [0, rotation, rotation, rotation],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 4,
      ease: "easeOut",
      delay,
      times: [0, 0.3, 0.8, 1],
    },
  },
});

// --- Main Component ---

const GiftingNexus = ({ onExit, message = "Happy Birthday!" }) => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const particlesInit = async (engine) => await loadSlim(engine);

  useEffect(() => {
    const timer = setTimeout(() => setIsBoxOpen(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const particlesOptions = {
    fullScreen: { enable: true, zIndex: 0 },
    particles: {
      number: { value: 50 },
      color: { value: ["#FF69B4", "#FFFFFF"] },
      shape: { type: ['circle', 'star'] },
      opacity: { value: { min: 0.5, max: 1 } },
      size: { value: { min: 1, max: 4 } },
      move: {
        enable: true,
        speed: 2,
        direction: 'bottom',
        straight: false,
        outModes: { default: 'out' }
      }
    },
    detectRetina: true
  };

  return (
    <NexusWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Particles id="tsparticles-gifting" init={particlesInit} options={particlesOptions} />
      <BackButton
        whileHover={{ scale: 1.1, color: '#fff', borderColor: '#fff' }}
        onClick={onExit}
      >
        &lt; RETURN
      </BackButton>

      <GiftMessage
        key="gift-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: isBoxOpen ? 1 : 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <CoolTypingAnimation text={message} delay={1.8} />
      </GiftMessage>

      <div
        style={{
          position: 'relative',
          width: 600,
          height: 600,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end', // box sticks to bottom center
          overflow: 'visible',
        }}
      >
        <motion.svg width="600" height="600" viewBox="0 0 200 200" style={{ zIndex: 2, position: 'absolute', bottom: 0 }}>
          {/* Box base */}
          <motion.g key="box-base">
            <motion.path d="M 40 160 L 40 100 L 160 100 L 160 160 Z" stroke="#FFFFFF" strokeWidth="2" variants={drawVariant} initial="hidden" animate="visible" />
            <motion.path d="M 40 100 L 70 70 L 190 70 L 160 100" stroke="#FFFFFF" strokeWidth="2" variants={drawVariant} initial="hidden" animate="visible" />
            <motion.path d="M 160 160 L 190 130 L 190 70" stroke="#FFFFFF" strokeWidth="2" variants={drawVariant} initial="hidden" animate="visible" />
          </motion.g>

          {/* Box lid */}
          <motion.g key="lid">
            <motion.path d="M 70 70 L 100 40 L 190 70" stroke="#FF69B4" strokeWidth="2" variants={drawVariant} initial="hidden" animate="visible" />
            <motion.path d="M 70 70 L 40 100" stroke="#FF69B4" strokeWidth="2" variants={drawVariant} initial="hidden" animate="visible" />
            <motion.path d="M 40 100 L 100 40" stroke="#FF69B4" strokeWidth="2" variants={drawVariant} initial="hidden" animate="visible" />
          </motion.g>

          {/* Gifts flying upwards infinitely */}
          {isBoxOpen && (
            <motion.g key="gifts">
              <motion.g {...giftFlyUpInfinite(0, 0, 150, 0)} style={{ originX: 0.5, originY: 1 }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#F400F4" />
              </motion.g>
              <motion.g {...giftFlyUpInfinite(0.8, -40, 200, -15)} style={{ originX: 0.5, originY: 1 }}>
                <CutePanda />
              </motion.g>
              <motion.g {...giftFlyUpInfinite(1.6, 40, 180, 15)} style={{ originX: 0.5, originY: 1 }}>
                <RomanticGift />
              </motion.g>
              <motion.g {...giftFlyUpInfinite(2.4, -60, 230, -30)} style={{ originX: 0.5, originY: 1 }}>
                <RomanticGift />
              </motion.g>
              <motion.g {...giftFlyUpInfinite(3.2, 60, 210, 30)} style={{ originX: 0.5, originY: 1 }}>
                <CutePanda />
              </motion.g>
            </motion.g>
          )}
        </motion.svg>
      </div>
    </NexusWrapper>
  );
};

export default GiftingNexus;

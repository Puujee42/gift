import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

// --- Styled Components with Responsive Media Queries ---

const NexusWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto; // Allow scrolling on small screens if content overflows
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle, rgba(255,182,193,0.9) 0%, rgba(255,105,180,0.9) 100%);
  backdrop-filter: blur(15px);
  z-index: 100;
  padding: 2rem 0; // Add padding for smaller screens
`;

const ParticleWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 20px; // Adjusted for smaller screens
  left: 20px;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.lightPink || '#FFB6C1'};
  color: ${({ theme }) => theme.colors.lightPink || '#FFB6C1'};
  font-family: ${({ theme }) => theme.fonts.secondary || 'cursive'};
  padding: 8px 16px; // Slightly smaller padding
  cursor: pointer;
  font-size: 0.9rem; // Slightly smaller font
  z-index: 110;
  border-radius: 20px;
`;

// This wrapper will change its layout from row (desktop) to column (mobile)
const MainContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 2;

  /* ✅ Responsive Change */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem; // Reduce gap for vertical layout
    transform: scale(0.9); // Scale down the entire content block
  }
`;

// This column of emojis will be hidden on mobile to keep the view clean
const SideEffectsColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  /* ✅ Responsive Change */
  @media (max-width: 768px) {
    display: none;
  }
`;

const FloatingItem = styled(motion.div)`
  font-size: 2.5rem;
  filter: drop-shadow(0 0 10px ${({ glow }) => glow || '#fff'});
`;

const BirthdayMessage = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.secondary || 'cursive'};
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 0 0 15px #fff;
  max-width: 60%;
  text-align: center;
  margin-top: 2rem;
  z-index: 2;
  line-height: 1.3;

  /* ✅ Responsive Change */
  @media (max-width: 768px) {
    font-size: 1.8rem;
    max-width: 90%; // Use more of the screen width
    margin-top: 1rem;
  }
`;

// Replaced inline styles with a styled-component for responsiveness
const AnimatedHeader = styled(motion.h2)`
  font-family: 'Great Vibes', cursive;
  font-size: 3rem;
  color: #FFFFFF;
  text-shadow: 0 0 10px #FF69B4;
  text-align: center;
  white-space: nowrap;

  /* ✅ Responsive Change */
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

// Typing / fade in effect for header
const CoolTypingAnimation = ({ text, delay }) => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
  };
  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.4 } },
  };
  return (
    <AnimatedHeader variants={containerVariants} initial="hidden" animate="visible">
      {Array.from(text).map((char, index) => (
        <motion.span key={index} variants={charVariants}>
          {char}
        </motion.span>
      ))}
    </AnimatedHeader>
  );
};

// --- Main Component ---

const BirthdayNexus = ({ onExit, message }) => {
  const particlesInit = async (engine) => await loadSlim(engine);
  const giftControls = useAnimation();

  useEffect(() => {
    giftControls.start({
      filter: ['drop-shadow(0 0 8px #FFD700)', 'drop-shadow(0 0 18px #FFD700)', 'drop-shadow(0 0 8px #FFD700)'],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    });
  }, [giftControls]);

  const particlesOptions = {
    fullScreen: { enable: false },
    particles: { number: { value: 40 }, color: { value: ['#FFFFFF', '#FFD700', '#FFB6C1'] }, shape: { type: 'star' }, opacity: { value: { min: 0.5, max: 1 } }, size: { value: { min: 1, max: 4 } }, move: { enable: true, speed: 1.5, direction: 'top', straight: true, outModes: { default: 'out' } } },
    detectRetina: true,
  };

  const pageVariants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.7 } }, exit: { opacity: 0, transition: { duration: 0.5 } } };
  const svgContainerVariants = { hidden: { opacity: 0, scale: 0.7 }, visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.4, delay: 0.5 } } };
  const drawVariant = { hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.2, ease: 'easeInOut' } } };
  const lidVariant = { hidden: { y: 0, rotate: 0 }, visible: { y: -40, rotate: -15, transition: { delay: 1.8, duration: 1.5, ease: 'easeOut' } } };
  const sparklesVariant = { hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1, delay: 2.2 } } };
  const textContainerVariants = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.05, delay: 4.5 } } };
  const charVariant = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

  return (
    <NexusWrapper variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <ParticleWrapper>
        <Particles id="tsparticles-confetti" init={particlesInit} options={particlesOptions} />
      </ParticleWrapper>

      <BackButton whileHover={{ scale: 1.1, color: '#fff', borderColor: '#fff' }} whileTap={{ scale: 0.9 }} onClick={onExit}>
        &lt; Return
      </BackButton>

      <MainContentWrapper>
        <SideEffectsColumn>
          <FloatingItem glow="#FF69B4" animate={{ y: [0, -20, 0], transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' } }}>💖</FloatingItem>
          <FloatingItem glow="#FFD700" animate={{ y: [0, -15, 0], x: [0, 10, 0], transition: { repeat: Infinity, duration: 5, ease: 'easeInOut' } }}>👑</FloatingItem>
        </SideEffectsColumn>

        <CoolTypingAnimation text="A Royal Gift" delay={2.5} />

        <motion.svg width="300" height="300" viewBox="0 0 150 150" variants={svgContainerVariants} initial="hidden" animate="visible" style={{ zIndex: 2, overflow: 'visible' }}>
          <motion.g animate={giftControls}>
            <motion.path d="M 35 120 V 90 H 115 V 120 Z" fill="#FFC0CB" stroke="#FF69B4" strokeWidth="2" variants={drawVariant} />
            <motion.path d="M 75 120 V 90" stroke="#FF69B4" strokeWidth="2" variants={drawVariant} />
            <motion.g variants={sparklesVariant}>
              <motion.path d="M75 80 L 78 86 L 84 87 L 79 91 L 81 97 L 75 94 L 69 97 L 71 91 L 66 87 L 72 86 Z" fill="#FFD700" />
              <motion.path d="M60 75 L 62 78 L 66 79 L 63 82 L 64 86 L 60 84 L 56 86 L 57 82 L 54 79 L 58 78 Z" fill="#FFFFFF" />
              <motion.path d="M90 70 L 92 73 L 96 74 L 93 77 L 94 81 L 90 79 L 86 81 L 87 77 L 84 74 L 88 73 Z" fill="#FFFFFF" />
            </motion.g>
            <motion.g variants={lidVariant}>
              <motion.path d="M 30 90 H 120 V 80 H 30 Z" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2" variants={drawVariant} />
              <motion.path d="M 75 90 C 65 70, 85 70, 75 90" fill="#FF69B4" variants={drawVariant} />
              <motion.path d="M 75 90 C 85 70, 65 70, 75 90" fill="#FF69B4" variants={drawVariant} />
            </motion.g>
          </motion.g>
        </motion.svg>

        <CoolTypingAnimation text="For a Princess" delay={3.5} />

        <SideEffectsColumn>
          <FloatingItem glow="#BA55D3" animate={{ y: [0, -20, 0], transition: { repeat: Infinity, duration: 4.2, ease: 'easeInOut' } }}>🏰</FloatingItem>
          <FloatingItem glow="#FFFFFF" animate={{ y: [0, -15, 0], x: [0, -10, 0], transition: { repeat: Infinity, duration: 5.2, ease: 'easeInOut' } }}>✨</FloatingItem>
        </SideEffectsColumn>
      </MainContentWrapper>

      <BirthdayMessage variants={textContainerVariants} initial="hidden" animate="visible">
        {Array.from(message).map((char, index) => (
          <motion.span key={index} variants={charVariant}>{char}</motion.span>
        ))}
      </BirthdayMessage>
    </NexusWrapper>
  );
};

export default BirthdayNexus;
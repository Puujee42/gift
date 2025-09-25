import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
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

const ParticleWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
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

const MainContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 2;
`;

const SideEffectsColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const FloatingItem = styled(motion.div)`
  font-size: 2.5rem;
  filter: drop-shadow(0 0 10px ${({ glow }) => glow || '#fff'});
`;

const BirthdayMessage = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 0 0 15px #fff;
  max-width: 60%;
  text-align: center;
  margin-top: 2rem;
  z-index: 2;
  line-height: 1.3;
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
    <motion.h2
      style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '2.5rem',
        color: '#FF69B4',
        textShadow: '0 0 10px #FF69B4',
        textAlign: 'center',
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.from(text).map((char, index) => (
        <motion.span key={index} variants={charVariants}>
          {char}
        </motion.span>
      ))}
    </motion.h2>
  );
};

// --- Main Component ---

const BirthdayNexus = ({ onExit, message }) => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  // Controls for cake glow / pulsation
  const cakeControls = useAnimation();

  useEffect(() => {
    // Start a gentle pulsing loop
    cakeControls.start({
      scale: [1, 1.03, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    });
  }, [cakeControls]);

  // Particle options including occasional heart bursts
  const particlesOptions = {
    fullScreen: { enable: false },
    particles: {
      number: { value: 120 },
      color: { value: ['#FF69B4', '#F400F4', '#00FFFF', '#FFFFFF'] },
      shape: { type: ['circle', 'heart'] },  // using 'heart' if supported
      opacity: { value: { min: 0.4, max: 1 } },
      size: { value: { min: 2, max: 6 } },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: true,
        drift: 0.3,
        outModes: { default: 'out' },
      },
      life: {
        duration: { sync: false, value: 4, max: 6 },
      },
    },
    detectRetina: true,
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.7 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const svgContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.8, delay: 0.5 } },
  };

  const drawVariant = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 1.5, ease: 'easeInOut' } },
  };

  const flameContainerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const flameVariant = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: { opacity: 1, scaleY: 1, transition: { duration: 0.4 } },
  };

  const textContainerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delay: 4.5 } },
  };

  const charVariant = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

  return (
    <NexusWrapper variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <ParticleWrapper>
        <Particles id="tsparticles-confetti" init={particlesInit} options={particlesOptions} />
      </ParticleWrapper>

      <BackButton
        whileHover={{ scale: 1.1, color: '#fff', borderColor: '#fff' }}
        whileTap={{ scale: 0.9 }}
        onClick={onExit}
      >
        &lt; RETURN
      </BackButton>

      <MainContentWrapper>
        {/* Left side effects */}
        <SideEffectsColumn>
          <FloatingItem
            glow="#FF69B4"
            variants={{
              animate: {
                y: [0, -20, 0],
                transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
              },
            }}
            initial="animate"
            animate="animate"
          >
            🎈
          </FloatingItem>
          <FloatingItem
            glow="#00FFFF"
            variants={{
              animate: {
                y: [0, -15, 0],
                x: [0, 10, 0],
                transition: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
              },
            }}
            initial="animate"
            animate="animate"
          >
            🌟
          </FloatingItem>
          <FloatingItem
            glow="#F400F4"
            variants={{
              animate: {
                y: [0, -25, 0],
                transition: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
              },
            }}
            initial="animate"
            animate="animate"
          >
            🎉
          </FloatingItem>
        </SideEffectsColumn>

        {/* Typing “Happy Birthday” on left */}
        <CoolTypingAnimation text="Happy Birthday" delay={2.5} />

        {/* Cake / SVG */}
        <motion.svg
          width="300"
          height="300"
          viewBox="0 0 150 150"
          variants={svgContainerVariants}
          initial="hidden"
          animate="visible"
          style={{ zIndex: 2 }}
        >
          <motion.g animate={cakeControls}>
            <motion.path
              d="M 20 130 H 130"
              stroke="#fff"
              strokeWidth="2"
              variants={drawVariant}
            />
            <motion.path
              d="M 30 110 H 120"
              stroke="#fff"
              strokeWidth="2"
              variants={drawVariant}
            />
            <motion.path
              d="M 40 90 H 110"
              stroke="#fff"
              strokeWidth="2"
              variants={drawVariant}
            />
          </motion.g>
          <motion.g>
            <motion.path
              d="M 55 90 V 70"
              stroke="#00FFFF"
              strokeWidth="2"
              variants={drawVariant}
            />
            <motion.path
              d="M 75 90 V 70"
              stroke="#00FFFF"
              strokeWidth="2"
              variants={drawVariant}
            />
            <motion.path
              d="M 95 90 V 70"
              stroke="#00FFFF"
              strokeWidth="2"
              variants={drawVariant}
            />
          </motion.g>
          <motion.g variants={flameContainerVariants}>
            <motion.path
              d="M 55 68 Q 52 60 55 55 Q 58 60 55 68 Z"
              fill="#FF69B4"
              variants={flameVariant}
            />
            <motion.path
              d="M 75 68 Q 72 60 75 55 Q 78 60 75 68 Z"
              fill="#FF69B4"
              variants={flameVariant}
            />
            <motion.path
              d="M 95 68 Q 92 60 95 55 Q 98 60 95 68 Z"
              fill="#FF69B4"
              variants={flameVariant}
            />
          </motion.g>
        </motion.svg>

        {/* Typing “Happy Birthday” on right */}
        <CoolTypingAnimation text="Happy Birthday" delay={2.5} />

        {/* Right side effects */}
        <SideEffectsColumn>
          <FloatingItem
            glow="#FF69B4"
            variants={{
              animate: {
                y: [0, -20, 0],
                transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
              },
            }}
            initial="animate"
            animate="animate"
          >
            🎈
          </FloatingItem>
          <FloatingItem
            glow="#00FFFF"
            variants={{
              animate: {
                y: [0, -15, 0],
                x: [0, -10, 0],
                transition: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
              },
            }}
            initial="animate"
            animate="animate"
          >
            🎉
          </FloatingItem>
          <FloatingItem
            glow="#FFD700"
            variants={{
              animate: {
                y: [0, -25, 0],
                transition: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
              },
            }}
            initial="animate"
            animate="animate"
          >
            🌟
          </FloatingItem>
        </SideEffectsColumn>
      </MainContentWrapper>

      {/* Final message */}
      <BirthdayMessage
        variants={textContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {Array.from(message).map((char, index) => (
          <motion.span key={index} variants={charVariant}>
            {char}
          </motion.span>
        ))}
      </BirthdayMessage>
    </NexusWrapper>
  );
};

export default BirthdayNexus;

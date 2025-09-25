import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
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
  background: radial-gradient(
    circle at center,
    rgba(40, 0, 40, 0.9),
    rgba(10, 0, 20, 0.95)
  );
  backdrop-filter: blur(25px);
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
  &:hover {
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.glowCyan};
  }
`;

const ConfessionText = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 2.2rem;
  color: #ffe4f8;
  text-shadow: 0 0 20px ${({ theme }) => theme.colors.primaryPink};
  max-width: 60%;
  text-align: center;
  margin-top: 2rem;
  z-index: 110;
  white-space: pre-wrap;
`;

// A single sakura petal with gradient fill and slight curvature
const SakuraPetal = ({ delay = 0, x = 0, y = 0, scale = 1, rotation = 0, colorStart = "#FFD0E8", colorEnd = "#FFB6C1" }) => {
  return (
    <motion.path
      d="M0 0 C 4 -2, 8 4, 0 12 C -8 4, -4 -2, 0 0"
      fill={`url(#petalGradient)`}
      stroke="rgba(255,200,220,0.8)"
      strokeWidth="0.3"
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, 30, 80, 120],
        x: [0, 5, -5, 0],
        rotate: [rotation, rotation + 10, rotation - 10, rotation + 20],
        scale: [0.5 * scale, scale, scale * 1.2, 0.8 * scale]
      }}
      transition={{
        delay,
        duration: 6 + Math.random() * 4,
        ease: 'easeInOut'
      }}
    />
  );
};

const FallingPetals = ({ count = 30, width = 200, height = 200 }) => {
  return (
    <motion.g>
      {Array.from({ length: count }).map((_, idx) => {
        const delay = Math.random() * 5;
        const x = Math.random() * width - width / 2;
        const y = Math.random() * height - height / 2;
        const scale = 0.7 + Math.random() * 0.6;
        const rotation = Math.random() * 360;
        return (
          <SakuraPetal
            key={idx}
            delay={delay}
            x={x}
            y={y}
            scale={scale}
            rotation={rotation}
          />
        );
      })}
    </motion.g>
  );
};

// Typing + scramble effect (same as yours, maybe small tweaks)
const CoolTypingAnimation = ({ text, delay = 0 }) => {
  const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#________";
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: delay } }
  };
  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  return (
    <motion.span variants={containerVariants} initial="hidden" animate="visible">
      {Array.from(text).map((char, idx) => {
        if (char === " ") {
          return <span key={idx}>&nbsp;</span>;
        }
        return (
          <motion.span
            key={idx}
            style={{ display: 'inline-block', position: 'relative' }}
          >
            {Array.from({ length: 4 }).map((_, i2) => (
              <motion.span
                key={i2}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  pointerEvents: 'none',
                  color: '#ddd'
                }}
                variants={{
                  hidden: { opacity: 1, y: 0 },
                  visible: {
                    opacity: 0,
                    y: -8,
                    transition: { delay: idx * 0.05 + i2 * 0.03, duration: 0.02 }
                  }
                }}
              >
                {scrambleChars[
                  Math.floor(Math.random() * scrambleChars.length)
                ]}
              </motion.span>
            ))}
            <motion.span variants={charVariants}>{char}</motion.span>
          </motion.span>
        );
      })}
    </motion.span>
  );
};

// --- Main Component ---

const SakuraNexus = ({ onExit, message }) => {
  const glowControls = useAnimation();

  useEffect(() => {
    glowControls.start({
      scale: [1, 1.1, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    });
  }, [glowControls]);

  const particlesInit = async engine => {
    await loadSlim(engine);
  };

  const particlesOptions = {
    fullScreen: { enable: true, zIndex: 0 },
    particles: {
      number: { value: 60 },
      shape: {
        type: 'char',
        character: {
          value: ['💮', '🌸', '🌺', '💖'],
          font: 'Arial',
          style: '',
          weight: '400'
        }
      },
      opacity: { value: { min: 0.3, max: 0.8 } },
      size: { value: { min: 10, max: 22 } },
      move: {
        enable: true,
        speed: 0.8,
        direction: 'bottom',
        straight: false,
        drift: { min: -0.4, max: 0.4 },
        outModes: { default: 'out' }
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'bubble' },
          onClick: { enable: true, mode: 'repulse' }
        },
        modes: {
          bubble: { distance: 180, size: 28, duration: 2, opacity: 1 },
          repulse: { distance: 100, duration: 0.4 }
        }
      }
    },
    detectRetina: true
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.6, ease: 'easeIn' } }
  };

  const svgContainerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.5, delay: 0.7 }
    }
  };

  const drawVariant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.6, ease: 'easeInOut' }
    }
  };

  return (
    <AnimatePresence>
      <NexusWrapper
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Particles id="tsparticles-sakura" init={particlesInit} options={particlesOptions} />

        <BackButton
          whileHover={{ scale: 1.15, color: '#fff', borderColor: '#fff' }}
          whileTap={{ scale: 0.9 }}
          onClick={onExit}
        >
          &lt; RETURN
        </BackButton>

        <motion.svg
          width="700"
          height="700"
          viewBox="0 0 200 200"
          style={{ zIndex: 2, overflow: 'visible' }}
          variants={svgContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Define gradient for petals */}
          <defs>
            <linearGradient id="petalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFD0E8" />
              <stop offset="100%" stopColor="#FFB6C1" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.g filter="url(#glow)">
            {/* Branch / trunk */}
            <motion.path
              d="M 100 200 Q 95 120 100 80"
              stroke="#FFB6C1"
              strokeWidth="4"
              variants={drawVariant}
            />
            <motion.path
              d="M 100 150 Q 60 140 30 80"
              stroke="#FFB6C1"
              strokeWidth="3"
              variants={drawVariant}
            />
            <motion.path
              d="M 100 120 Q 140 110 170 60"
              stroke="#FFB6C1"
              strokeWidth="3"
              variants={drawVariant}
            />
            <motion.path
              d="M 30 80 Q 20 60 10 40"
              stroke="#FFC0CB"
              strokeWidth="2"
              variants={drawVariant}
            />
            <motion.path
              d="M 30 80 Q 50 70 70 50"
              stroke="#FFC0CB"
              strokeWidth="2"
              variants={drawVariant}
            />
            <motion.path
              d="M 170 60 Q 180 40 190 30"
              stroke="#FFC0CB"
              strokeWidth="2"
              variants={drawVariant}
            />
            <motion.path
              d="M 100 80 Q 80 60 70 40"
              stroke="#FFC0CB"
              strokeWidth="2"
              variants={drawVariant}
            />
          </motion.g>

          <motion.g initial="hidden" animate="visible" transition={{ delay: 3 }}>
            {/* Heart blossoms / large decorative blossoms */}
            <motion.g animate={glowControls}>
              <motion.path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81
                14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="#FFC0CB"
                stroke="#FF69B4"
                strokeWidth="0.5"
                transform="translate(90, 15) scale(1.2)"
              />
              <motion.path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81
                14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="#FFE4F0"
                stroke="#FF69B4"
                strokeWidth="0.5"
                transform="translate(130, 30) scale(1.0)"
              />
              {/* more as desired… */}
            </motion.g>
          </motion.g>

          {/* Falling petals behind / around the tree */}
          <FallingPetals count={50} width={200} height={200} />
        </motion.svg>

        <ConfessionText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 4, duration: 1 } }}
        >
          <CoolTypingAnimation text={message} delay={4.2} />
        </ConfessionText>
      </NexusWrapper>
    </AnimatePresence>
  );
};

export default SakuraNexus;

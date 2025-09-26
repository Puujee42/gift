import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

// Styled components (you can keep your existing ones)
// NexusWrapper, BackButton, GiftMessage, GiftContainer, CoolTypingAnimation

// Red Rose SVG (unchanged)
const RedRose = ({ size = 80 }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M32 60 C20 60, 8 45, 8 32 C8 20, 20 8, 32 8 C44 8, 56 20, 56 32 C56 45, 44 60, 32 60 Z"
      fill="red"
      stroke="#800000"
      strokeWidth="2"
    />
    <motion.path
      d="M32 8 L32 0"
      stroke="#006400"
      strokeWidth="4"
    />
  </motion.svg>
);

// 🆕 Floating rose animation (infinite upward motion)
const roseFlyUp = {
  initial: {
    opacity: 0,
    scale: 0.5,
    y: 0,
  },
  animate: {
    opacity: [0, 1, 1, 0],
    y: [0, -250, -400],
    scale: [0.5, 1, 1.2],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

// 🎁 Box drawing animation
const drawVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: 'easeInOut' } }
};

// 🎁 Box lid opening animation
const lidOpenVariant = {
  hidden: { y: 0, rotate: 0 },
  visible: { y: -50, rotate: -25, transition: { delay: 2.0, duration: 1.5, ease: 'backOut' } }
};

const GiftingNexus = ({ onExit, message = "Happy Birthday, Princess!" }) => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [particlesOptions, setParticlesOptions] = useState({});

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setParticlesOptions({
      fullScreen: { enable: true, zIndex: 0 },
      particles: {
        number: { value: isMobile ? 25 : 50 },
        shape: { type: 'char', character: [{ value: ['💐', '✨', '🌹'] }] },
        opacity: { value: { min: 0.3, max: 0.8 } },
        size: { value: { min: 10, max: 25 } },
        move: {
          enable: true,
          speed: 2.5,
          direction: 'bottom',
          drift: { min: -0.1, max: 0.1 },
          straight: false,
          outModes: { default: 'out' }
        },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: 'bubble' } },
        modes: { bubble: { distance: 200, size: 30, duration: 2, opacity: 1 } }
      },
    });

    const timer = setTimeout(() => setIsBoxOpen(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <NexusWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Particles id="tsparticles-gifting" init={particlesInit} options={particlesOptions} />
      
      <BackButton whileHover={{ scale: 1.1, color: '#fff', borderColor: '#fff' }} onClick={onExit}>
        &lt; Back
      </BackButton>

      <AnimatePresence>
        {isBoxOpen && (
          <GiftMessage
            key="gift-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <CoolTypingAnimation text={message} delay={1.8} />
          </GiftMessage>
        )}
      </AnimatePresence>

      <GiftContainer>
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          style={{ zIndex: 2, position: 'absolute', bottom: 0, overflow: 'visible' }}
        >
          {/* 🎁 Box base */}
          <motion.g key="box-base">
            <motion.path
              d="M 50 180 V 130 H 150 V 180 Z"
              fill="#FFC0CB"
              stroke="#FF69B4"
              strokeWidth="2"
              variants={drawVariant}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d="M 100 180 V 130"
              stroke="#FFB6C1"
              strokeWidth="4"
              variants={drawVariant}
              initial="hidden"
              animate="visible"
            />
          </motion.g>

          {/* 🎁 Box lid */}
          <motion.g
            key="lid"
            variants={lidOpenVariant}
            initial="hidden"
            animate={isBoxOpen ? 'visible' : 'hidden'}
          >
            <path d="M 45 130 H 155 V 120 H 45 Z" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2" />
            <path d="M 100 120 C 85 100, 115 100, 100 120" fill="#FF69B4" />
            <path d="M 100 120 C 115 100, 85 100, 100 120" fill="#FF69B4" />
          </motion.g>

          {/* 🌹 Rose floating up into the sky */}
          {isBoxOpen && (
            <motion.g
              key="rose"
              transform="translate(100, 130)"
              variants={roseFlyUp}
              initial="initial"
              animate="animate"
            >
              <RedRose size={140} />
            </motion.g>
          )}
        </motion.svg>
      </GiftContainer>
    </NexusWrapper>
  );
};

export default GiftingNexus;

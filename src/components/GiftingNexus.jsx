import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

// --- Styled Components with Responsive Media Queries ---

const NexusWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto; // Allow scrolling on very small screens
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle, #ffefea 0%, #ffc0cb 100%);
  backdrop-filter: blur(15px);
  z-index: 100;
  padding: 1rem; // Add some padding for mobile
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 30px;
  left: 30px;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.primaryPink || '#FF69B4'};
  color: ${({ theme }) => theme.colors.primaryPink || '#FF69B4'};
  font-family: ${({ theme }) => theme.fonts.secondary || 'cursive'};
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  z-index: 110;
  border-radius: 25px;

  /* ✅ Responsive Change */
  @media (max-width: 768px) {
    top: 20px;
    left: 20px;
    font-size: 0.9rem;
    padding: 8px 16px;
  }
`;

const GiftMessage = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.secondary || "'Great Vibes', cursive"};
  font-size: 3rem;
  color: #fff;
  text-shadow: 0 0 20px #FF69B4, 0 0 10px #fff;
  max-width: 60%;
  text-align: center;
  position: absolute; // Keeps it layered on top
  top: 15%; // Position from the top
  z-index: 110;
  white-space: pre-wrap;

  /* ✅ Responsive Change */
  @media (max-width: 768px) {
    font-size: 2.2rem;
    max-width: 90%;
    top: 20%;
  }
`;

// ✅ New container to scale the gift box animation on mobile
const GiftContainer = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 5rem; // Push it down a bit to not overlap the message

  @media (max-width: 768px) {
    transform: scale(0.8);
    margin-top: 2rem;
  }
  @media (max-width: 480px) {
    transform: scale(0.7);
  }
`;

// Elegant typing animation (no changes needed)
const CoolTypingAnimation = ({ text, delay = 0 }) => {
  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: delay } } };
  const charVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } } };
  return ( <motion.span variants={containerVariants} initial="hidden" animate="visible"> {Array.from(text).map((char, idx) => ( <motion.span key={idx} variants={charVariants} style={{ display: 'inline-block' }}> {char === ' ' ? '\u00A0' : char} </motion.span> ))} </motion.span> );
};

// SVG Gifts (no changes needed)
const EnchantedCrown = () => ( <motion.svg width="80" height="80" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11 15H37V11C37 8.23858 34.7614 6 32 6H16C13.2386 6 11 8.23858 11 11V15Z" fill="#FFD700" stroke="#DAA520" strokeWidth="1"/> <path d="M4 42H44L40 20H8L4 42Z" fill="#FFD700" stroke="#DAA520" strokeWidth="1"/> <circle cx="24" cy="11" r="3" fill="#FF1493"/> </motion.svg> );
const SparklingGem = () => ( <motion.svg width="80" height="80" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M24 4L4 18L24 44L44 18L24 4Z" fill="#BA55D3" stroke="#9932CC" strokeWidth="1"/> <path d="M24 4L14 18L24 26L34 18L24 4Z" fill="#DDA0DD"/> </motion.svg> );

// Animation Variants (no changes needed)
const drawVariant = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: 'easeInOut' } } };
const lidOpenVariant = { hidden: { y: 0, rotate: 0 }, visible: { y: -50, rotate: -25, transition: { delay: 2.0, duration: 1.5, ease: 'backOut' } } };
const giftFlyUpInfinite = (delay, xDrift = 0, height = 200, rotation = 0) => ({ initial: { opacity: 0, scale: 0.5, y: 0 }, animate: { opacity: [0, 1, 1, 0], y: [0, -height], x: [0, xDrift], scale: [0.5, 1, 1, 0.5], rotate: [0, rotation], transition: { repeat: Infinity, duration: 5, ease: "easeOut", delay } } });

// --- Main Component ---

const GiftingNexus = ({ onExit, message = "Happy Birthday, Princess!" }) => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [particlesOptions, setParticlesOptions] = useState({});

  useEffect(() => {
    // Set particle density based on screen size for better performance
    const isMobile = window.innerWidth < 768;
    setParticlesOptions({
      fullScreen: { enable: true, zIndex: 0 },
      particles: {
        number: { value: isMobile ? 25 : 50 }, // Fewer particles on mobile
        shape: { type: 'char', character: [{ value: ['💖', '✨', '👑'] }] },
        opacity: { value: { min: 0.3, max: 0.8 } },
        size: { value: { min: 10, max: 25 } },
        move: { enable: true, speed: 2.5, direction: 'bottom', drift: { min: -0.1, max: 0.1 }, straight: false, outModes: { default: 'out' } },
      },
      interactivity: { events: { onHover: { enable: true, mode: 'bubble' } }, modes: { bubble: { distance: 200, size: 30, duration: 2, opacity: 1 } } },
    });

    const timer = setTimeout(() => setIsBoxOpen(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const particlesInit = useCallback(async (engine) => await loadSlim(engine), []);

  return (
    <NexusWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Particles id="tsparticles-gifting" init={particlesInit} options={particlesOptions} />
      <BackButton whileHover={{ scale: 1.1, color: '#fff', borderColor: '#fff' }} onClick={onExit}>
        &lt; Back
      </BackButton>

      <AnimatePresence>
        {isBoxOpen && (
          <GiftMessage key="gift-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
            <CoolTypingAnimation text={message} delay={1.8} />
          </GiftMessage>
        )}
      </AnimatePresence>

      <GiftContainer>
        <motion.svg width="100%" height="100%" viewBox="0 0 200 200" style={{ zIndex: 2, position: 'absolute', bottom: 0, overflow: 'visible' }}>
          <motion.g key="box-base">
            <motion.path d="M 50 180 V 130 H 150 V 180 Z" fill="#FFC0CB" stroke="#FF69B4" strokeWidth="2" variants={drawVariant} initial="hidden" animate="visible" />
            <motion.path d="M 100 180 V 130" stroke="#FFB6C1" strokeWidth="4" variants={drawVariant} initial="hidden" animate="visible" />
          </motion.g>
          <motion.g key="lid" variants={lidOpenVariant} initial="hidden" animate={isBoxOpen ? "visible" : "hidden"}>
            <path d="M 45 130 H 155 V 120 H 45 Z" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2" />
            <path d="M 100 120 C 85 100, 115 100, 100 120" fill="#FF69B4" />
            <path d="M 100 120 C 115 100, 85 100, 100 120" fill="#FF69B4" />
          </motion.g>
          {isBoxOpen && (
            <motion.g key="gifts" transform="translate(100, 130)">
              <motion.g {...giftFlyUpInfinite(0, 0, 180, 20)}><EnchantedCrown /></motion.g>
              <motion.g {...giftFlyUpInfinite(0.8, -40, 220, -15)}><SparklingGem /></motion.g>
              <motion.g {...giftFlyUpInfinite(1.6, 40, 200, 15)}><EnchantedCrown /></motion.g>
            </motion.g>
          )}
        </motion.svg>
      </GiftContainer>
    </NexusWrapper>
  );
};

export default GiftingNexus;
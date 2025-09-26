import {React, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
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
  background: radial-gradient(circle at center, #ffefea, #ffc0cb);
  backdrop-filter: blur(25px);
  z-index: 100;
  padding: 1rem; // Add padding for mobile
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

// ✅ This container will wrap the animation and text, scaling it down on mobile.
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    transform: scale(0.8);
  }
  @media (max-width: 480px) {
    transform: scale(0.7);
  }
`;

const ConfessionText = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.secondary || "'Great Vibes', cursive"};
  font-size: 2.8rem;
  color: #fff;
  text-shadow: 0 0 20px ${({ theme }) => theme.colors.primaryPink || '#FF69B4'};
  max-width: 600px; // Set a max-width for better wrapping on large screens
  text-align: center;
  margin-top: -2rem; // Pull text up closer to the castle
  z-index: 110;
  white-space: pre-wrap;

  /* ✅ Responsive Change */
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-top: -1rem;
  }
`;

// A single sparkle particle (no changes needed)
const SakuraPetal = ({ delay = 0, x = 0, y = 0, scale = 1, rotation = 0 }) => { return ( <motion.path d="M0 -5 L 1.5 -1.5 L 5 0 L 1.5 1.5 L 0 5 L -1.5 1.5 L -5 0 L -1.5 -1.5 Z" fill="url(#sparkleGradient)" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 1, 0], y: [y, y - 60], x: [x, x + Math.sin(delay) * 20], rotate: [rotation, rotation + 180], scale: [0, scale, 0] }} transition={{ delay, duration: 4 + Math.random() * 3, ease: 'circOut' }} /> ); };

// Generates a burst of sparkles (no changes needed)
const FallingPetals = ({ count = 30 }) => { return ( <motion.g initial="hidden" animate="visible" transition={{ delay: 2.5 }}> {Array.from({ length: count }).map((_, idx) => { const delay = Math.random() * 2; const x = Math.random() * 40 - 20; const y = 0; const scale = 0.5 + Math.random() * 0.8; const rotation = Math.random() * 360; return <SakuraPetal key={idx} delay={delay} x={x} y={y} scale={scale} rotation={rotation} />; })} </motion.g> ); };

// Elegant typing animation (no changes needed)
const CoolTypingAnimation = ({ text, delay = 0 }) => { const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: delay } } }; const charVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } } }; return ( <motion.span variants={containerVariants} initial="hidden" animate="visible"> {Array.from(text).map((char, idx) => ( <motion.span key={idx} style={{ display: 'inline-block' }} variants={charVariants}> {char === " " ? "\u00A0" : char} </motion.span> ))} </motion.span> ); };

// --- Main Component ---

const SakuraNexus = ({ onExit, message }) => {
  const glowControls = useAnimation();
  const [particlesOptions, setParticlesOptions] = useState({});

  useEffect(() => {
    glowControls.start({ filter: ['drop-shadow(0 0 8px #FFD700)','drop-shadow(0 0 20px #FFD700)','drop-shadow(0 0 8px #FFD700)'], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } });
    
    // ✅ Set particle density based on screen size
    const isMobile = window.innerWidth < 768;
    setParticlesOptions({
      fullScreen: { enable: true, zIndex: 0 },
      particles: {
        number: { value: isMobile ? 25 : 50 }, // Fewer particles on mobile
        shape: { type: 'char', character: { value: ['✨', '👑', '💖'] } },
        opacity: { value: { min: 0.4, max: 0.9 } },
        size: { value: { min: 12, max: 25 } },
        move: { enable: true, speed: 1.2, direction: 'top', straight: false, outModes: { default: 'out' } },
      },
      detectRetina: true
    });
  }, [glowControls]);
  
  const particlesInit = useCallback(async engine => await loadSlim(engine), []);

  const pageVariants = { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } }, exit: { opacity: 0, scale: 0.9, transition: { duration: 0.6, ease: 'easeIn' } } };
  const svgContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3, delay: 0.7 } } };
  const drawVariant = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 1.2, ease: 'easeInOut' } } };

  return (
    <AnimatePresence>
      <NexusWrapper variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Particles id="tsparticles-sakura" init={particlesInit} options={particlesOptions} />

        <BackButton whileHover={{ scale: 1.15, color: '#fff', borderColor: '#fff' }} whileTap={{ scale: 0.9 }} onClick={onExit}>
          &lt; Back
        </BackButton>
        
        <ContentContainer>
          <motion.svg width="700" height="700" viewBox="0 0 200 200" style={{ zIndex: 2, overflow: 'visible' }} variants={svgContainerVariants} initial="hidden" animate="visible">
            <defs>
              <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#FFD700" /></linearGradient>
              <linearGradient id="castleGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FFF0F5" /><stop offset="100%" stopColor="#FFC0CB" /></linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            
            <motion.g filter="url(#glow)">
              <motion.path d="M 50 180 L 50 110 L 70 110 L 70 90 L 55 90 L 55 70 L 75 50 L 90 70 V 90 H 110 V 70 L 125 50 L 145 70 V 90 L 130 90 V 110 H 150 L 150 180 Z" fill="url(#castleGradient)" stroke="#FF69B4" strokeWidth="2" variants={drawVariant} />
              <motion.path d="M 70 110 H 130" stroke="#FF69B4" strokeWidth="1" variants={drawVariant} />
              <motion.path d="M 100 65 L 100 40" stroke="#FFB6C1" strokeWidth="2" variants={drawVariant} />
              <motion.path d="M 100 40 L 115 50 L 100 50" fill="#FF69B4" variants={drawVariant} />
              <motion.path d="M 85 180 V 150 H 115 V 180 Z" fill="#DAA520" stroke="#B8860B" strokeWidth="1.5" variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { delay: 1.5, duration: 1 } } }}/>
            </motion.g>

            <g transform="translate(100, 150)"><FallingPetals count={50} /></g>

            <motion.g initial="hidden" animate="visible" transition={{ delay: 2.8 }}>
              <motion.g animate={glowControls}>
                   <motion.path d="M100 28 L 103 34 L 109 35 L 104 39 L 106 45 L 100 42 L 94 45 L 96 39 L 91 35 L 97 34 Z" fill="#FFD700" stroke="#FFFFFF" strokeWidth="0.5" />
              </motion.g>
            </motion.g>
          </motion.svg>

          <ConfessionText initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 3.5, duration: 1 } }}>
            <CoolTypingAnimation text={message} delay={3.7} />
          </ConfessionText>
        </ContentContainer>
      </NexusWrapper>
    </AnimatePresence>
  );
};

export default SakuraNexus;
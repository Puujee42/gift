import {React, useState} from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

// --- Styled Components (Midnight Royalty Theme) ---

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
  background: radial-gradient(circle at 50% 50%, #4a0e61 0%, #1a1a3a 100%);
  z-index: 100;
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 30px;
  left: 30px;
  background: rgba(224, 230, 241, 0.1);
  border: 1px solid #E0E6F1;
  color: #E0E6F1;
  font-family: 'Poppins', sans-serif;
  padding: 10px 20px;
  cursor: pointer;
  z-index: 110;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 15px rgba(224, 230, 241, 0.2);
`;

const TwinklingStars = ({ count = 150 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          width: `${1 + Math.random() * 3}px`,
          height: `${1 + Math.random() * 3}px`,
          background: '#FFFFFF',
          borderRadius: '50%',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          boxShadow: `0 0 ${3 + Math.random() * 5}px rgba(255, 255, 255, 0.8)`,
          zIndex: 1,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: [0, 1, 0.3, 1, 0],
          scale: [0.5, 1.5, 0.8, 1.2, 0.5],
        }}
        transition={{
          duration: 3 + Math.random() * 4,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: Math.random() * 5,
          ease: 'easeInOut',
        }}
      />
    ))}
  </>
);

const RoyalSparkle = ({ delay = 0, x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <motion.path
    d="M0 -5 L 1.5 -1.5 L 5 0 L 1.5 1.5 L 0 5 L -1.5 1.5 L -5 0 L -1.5 -1.5 Z"
    fill="#F0E68C"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      y: [y, y - 80 + Math.random() * 40],
      x: [x, x + Math.sin(delay) * 30 + Math.random() * 20],
      rotate: [rotation, rotation + 360 + Math.random() * 180],
      scale: [0, scale * 1.2, scale * 0.8, 0]
    }}
    transition={{ 
      delay, 
      duration: 4 + Math.random() * 5, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }}
  />
);

const EmergingSparkles = ({ count = 60 }) => (
  <motion.g initial="hidden" animate="visible" transition={{ delay: 1.5, staggerChildren: 0.1 }}>
    {Array.from({ length: count }).map((_, idx) => (
      <RoyalSparkle
        key={idx}
        delay={Math.random() * 2}
        x={Math.random() * 80 - 40}
        y={Math.random() * 40}
        scale={0.3 + Math.random() * 0.8}
        rotation={Math.random() * 360}
      />
    ))}
  </motion.g>
);

const SvgMessageReveal = ({ lines, delay = 0 }) => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: delay } }
  };
  const wordVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <motion.tspan variants={containerVariants} initial="hidden" animate="visible">
      {lines.map((line, lineIndex) => (
        <tspan key={lineIndex} x="58" dy={lineIndex === 0 ? 0 : '1.5em'}>
          {line.split(' ').map((word, wordIndex) => (
            <motion.tspan key={wordIndex} variants={wordVariants}>
              {word + ' '}
            </motion.tspan>
          ))}
        </tspan>
      ))}
    </motion.tspan>
  );
};

// --- Main Component ---

const SakuraNexus = ({ onExit, message }) => {
  const particlesInit = async (engine) => await loadSlim(engine);
  
  const particlesOptions = {
    fullScreen: { enable: true, zIndex: 0 },
    particles: {
      number: { value: 120 },
      shape: { type: ['star', 'circle', 'polygon'] },
      color: { value: ['#F0E68C', '#E0E6F1', '#FFFFFF', '#B19CD9'] },
      opacity: { value: { min: 0.2, max: 0.9 }, animation: { enable: true, speed: 1, sync: false } },
      size: { value: { min: 0.5, max: 4 }, animation: { enable: true, speed: 2 } },
      move: { 
        enable: true, 
        speed: { min: 0.2, max: 1.5 },
        direction: 'none',
        random: true,
        straight: false, 
        outModes: { default: 'out' },
        trail: { enable: true, length: 10, fillColor: { value: '#4a0e61' } }
      },
      links: {
        enable: true,
        distance: 120,
        color: { value: '#E0E6F1' },
        opacity: 0.3,
        width: 0.5,
        triangles: { enable: false }
      }
    },
    detectRetina: true,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'repulse' },
        onClick: { enable: true, mode: 'push' },
        resize: { enable: true }
      },
      modes: {
        repulse: { distance: 150, duration: 0.5, speed: 2 },
        push: { quantity: 3 },
        grab: { distance: 400, links: { opacity: 0.5 } }
      }
    },
    background: {
      color: { value: '#1a1a3a' },
      image: '',
      position: '50% 50%',
      repeat: 'no-repeat',
      size: 'cover'
    }
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
      transition: { duration: 1, ease: 'easeOut' },
      scale: [1, 1.02, 1],
    },
    exit: { opacity: 0, scale: 1, transition: { duration: 0.7, ease: 'easeIn' } }
  };

  const drawVariant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (delay = 0) => ({
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeInOut', delay }
    })
  };

  const maxCharsPerLine = 20;
  const words = message.split(' ');
  const messageLines = words.reduce((lines, word) => {
    if (lines.length === 0) lines.push('');
    let currentLine = lines[lines.length - 1];
    if ((currentLine + ' ' + word).length > maxCharsPerLine) {
      lines.push(word);
    } else {
      lines[lines.length - 1] += (currentLine ? ' ' : '') + word;
    }
    return lines;
  }, []);
  
  const signatureDelay = 1.8 + (messageLines.length * 0.15 * message.split(' ').length * 0.1);

  return (
    <AnimatePresence>
      <NexusWrapper 
        variants={pageVariants} 
        initial="initial" 
        animate={{ 
          ...pageVariants.animate, 
          scale: [1, 1.02, 1], 
          transition: { 
            ...pageVariants.animate.transition, 
            scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' } 
          } 
        }} 
        exit="exit"
      >
        <TwinklingStars count={150} />
        <Particles id="tsparticles-royal-letter" init={particlesInit} options={particlesOptions} />

        <BackButton whileHover={{ scale: 1.1, background: 'rgba(224, 230, 241, 0.2)' }} onClick={onExit}>
          &lt; Return to the Palace
        </BackButton>

        <motion.svg 
          width="700" 
          height="700" 
          viewBox="0 0 200 200" 
          style={{ zIndex: 2, overflow: 'visible' }} 
          initial="hidden" 
          animate="visible"
        >
          <defs>
            <linearGradient id="paperGradient">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FAFAFA" />
            </linearGradient>
            <filter id="glow"><feGaussianBlur stdDeviation="3.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          
          <motion.g filter="url(#glow)">
            {/* Open Letter Envelope */}
            <motion.path d="M 40 120 L 160 120 L 100 180 Z" fill="#3a3a5a" stroke="#E0E6F1" strokeWidth="1" variants={drawVariant} custom={0} />
            <motion.path d="M 40 120 L 100 60 L 160 120" fill="#2a2a4a" stroke="#E0E6F1" strokeWidth="1" variants={drawVariant} custom={0.2} />
            
            {/* ✅ LIFTED Paper: Animates to a higher Y position, appearing on top */}
            <motion.rect 
              x="50" 
              width="100" 
              height="100" 
              fill="url(#paperGradient)" 
              rx="2" 
              initial={{ y: 100, height: 0 }} 
              animate={{ y: 50, height: 100, transition: { delay: 0.8, duration: 1, ease: 'easeOut' } }} 
            />
            
            {/* ✅ MESSAGE RENDERED ON THE LIFTED LETTER */}
            <text
              y="65" // Adjusted to match the new paper position
              fontFamily="Dancing Script, cursive"
              fontSize="8.2px"
              fill="#1a1a3a"
              textAnchor="start"
              transform="rotate(-0.8 100 100)"
            >
              <SvgMessageReveal lines={messageLines} delay={1.8} />

              {/* Signature positioned at the bottom of the lifted paper */}
              <motion.tspan 
                x="95" 
                y="138" // Adjusted to match new paper position
                fontFamily="Parisienne, cursive" 
                fontSize="9.5px"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: signatureDelay }}
              >
                Forever Yours,
              </motion.tspan>
            </text>

          </motion.g>

          {/* ✅ Sparkles now burst from behind the lifted letter */}
          <g transform="translate(100, 80)">
            <EmergingSparkles count={60} />
          </g>
        </motion.svg>
      </NexusWrapper>
    </AnimatePresence>
  );
};

export default SakuraNexus;
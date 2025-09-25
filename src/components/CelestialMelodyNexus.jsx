import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
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
  justify-content: center;
  align-items: center;
  background-color: #0a0014;
  cursor: crosshair;
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

const InstructionText = styled(motion.p)`
  position: absolute;
  bottom: 5%;
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.5);
  z-index: 110;
`;

const Word = styled(motion.span)`
  position: absolute;
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  color: #fff;
  text-shadow: 0 0 15px #FF69B4;
  pointer-events: none;
`;

const FinalQuote = styled(motion.p)`
  position: absolute;
  font-family: 'Courier Prime', monospace;
  font-size: 2rem;
  color: #fff;
  text-shadow: 0 0 10px #fff, 0 0 20px #FF69B4;
  max-width: 40%;
  text-align: center;
  z-index: 100;
`;

// --- Main Component ---

const CelestialMelodyNexus = ({ onExit }) => {
  const [isHolding, setIsHolding] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const particlesInit = async (engine) => await loadSlim(engine);
  const particlesOptions = {
    particles: {
      number: { value: 100, density: { enable: true, area: 800 } },
      color: { value: "#FF69B4" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 2 },
      move: { enable: true, speed: 1 },
      links: { enable: true, distance: 150, color: "#FF69B4", opacity: 0.4, width: 1 },
    },
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.0 } },
    exit: { opacity: 0, transition: { duration: 0.7 } },
  };

  const words = ["Eternity", "Destiny", "Always", "Forever", "Soulmate", "Love"];
  const finalRomanticQuote = "Click on me and its what we are.";

  const handleMouseUp = () => {
    setIsHolding(false);
    setHasInteracted(true);
  };

  const containerSize = 800;
  const center = containerSize / 2;
  const radius = 250;

  return (
    <NexusWrapper
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onMouseDown={() => setIsHolding(true)}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Particles id="tsparticles-celestial" init={particlesInit} options={particlesOptions} />
      <BackButton whileHover={{ scale: 1.1, color: '#fff', borderColor: '#fff' }} onClick={onExit}>
        &lt; RETURN
      </BackButton>

      <AnimatePresence>
        {!isHolding && !hasInteracted && (
          <InstructionText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.0 }}
          >
            Click and hold to create a melody
          </InstructionText>
        )}
      </AnimatePresence>

      <motion.svg
        width={containerSize}
        height={containerSize}
        viewBox={`0 0 ${containerSize} ${containerSize}`}
        style={{ zIndex: 2, position: 'absolute' }}
      >
        {/* Only show the circles when NOT holding */}
        <AnimatePresence>
          {!isHolding && (
            <>
              <motion.circle
                key="center-circle"
                cx={center}
                cy={center}
                r="30"
                fill="#fff"
                animate={{
                  scale: 1,
                  filter: 'drop-shadow(0 0 10px #FF69B4)',
                }}
                initial={{ scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              />
              <motion.circle
                key="pulse1"
                cx={center}
                cy={center}
                r="40"
                stroke="#FF69B4"
                strokeWidth="2"
                fill="none"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: 3, opacity: [1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.circle
                key="pulse2"
                cx={center}
                cy={center}
                r="40"
                stroke="#00FFFF"
                strokeWidth="2"
                fill="none"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: 4, opacity: [1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', delay: 1.0 }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.svg>

      <div
        style={{
          position: 'relative',
          width: containerSize,
          height: containerSize,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence>
          {isHolding &&
            words.map((word, i) => {
              const angle = i * (2 * Math.PI) / words.length;
              const left = center + radius * Math.cos(angle) - 40;
              const top = center + radius * Math.sin(angle) - 15;
              return (
                <Word
                  key={word}
                  initial={{ opacity: 0, scale: 0.5, left: center, top: center }}
                  animate={{ opacity: 1, scale: 1, left, top }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: 'backOut' }}
                  style={{ left, top }}
                >
                  {word}
                </Word>
              );
            })}
        </AnimatePresence>

        <AnimatePresence>
          {!isHolding && hasInteracted && (
            <FinalQuote
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              {finalRomanticQuote}
            </FinalQuote>
          )}
        </AnimatePresence>
      </div>
    </NexusWrapper>
  );
};

export default CelestialMelodyNexus;

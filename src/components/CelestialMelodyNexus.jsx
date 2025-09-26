import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

// --- Styled Components with Responsive Media Queries ---

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
  background: radial-gradient(circle, #ffefea 0%, #ffc0cb 100%);
  cursor: pointer;
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

const InstructionText = styled(motion.p)`
  position: absolute;
  bottom: 5%;
  font-family: ${({ theme }) => theme.fonts.secondary || 'cursive'};
  font-size: 1.2rem;
  color: rgba(255, 105, 180, 0.7);
  z-index: 110;
  text-align: center;
  padding: 0 1rem;

  /* ✅ Responsive Change */
  @media (max-width: 768px) {
    font-size: 1rem;
    bottom: 8%;
  }
`;

const Word = styled(motion.span)`
  position: absolute;
  font-family: 'Great Vibes', cursive;
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 0 0 15px #FF69B4;
  pointer-events: none;
  white-space: nowrap;

  /* ✅ Responsive Change */
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const FinalQuote = styled(motion.p)`
  position: absolute;
  font-family: 'Great Vibes', cursive;
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 0 0 10px #fff, 0 0 20px #FF69B4;
  max-width: 50%;
  text-align: center;
  z-index: 100;

  /* ✅ Responsive Change */
  @media (max-width: 768px) {
    font-size: 2rem;
    max-width: 90%;
  }
`;

// ✅ This new container will scale the entire interactive element down on mobile
const CelestialContainer = styled.div`
  position: relative;
  width: 800px;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none; // The parent wrapper will handle clicks

  @media (max-width: 768px) {
    transform: scale(0.8);
  }
  @media (max-width: 480px) {
    transform: scale(0.6);
  }
`;


// --- Main Component ---

const CelestialMelodyNexus = ({ onExit }) => {
  const [isHolding, setIsHolding] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // ✅ State to hold responsive particle options
  const [particleOptions, setParticleOptions] = useState({});

  useEffect(() => {
    // Set particle density based on screen size for performance
    const isMobile = window.innerWidth < 768;
    setParticleOptions({
      fullScreen: { enable: true, zIndex: 0 },
      particles: {
        number: { value: isMobile ? 30 : 60 }, // Fewer particles on mobile
        color: { value: ["#FFFFFF", "#FFD700", "#FFB6C1"] },
        shape: { type: "star" },
        opacity: { value: {min: 0.4, max: 0.8} },
        size: { value: {min: 1, max: 3} },
        move: { enable: true, speed: 1, direction: "top", straight: true },
      },
    });
  }, []);


  const particlesInit = async (engine) => await loadSlim(engine);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.0 } },
    exit: { opacity: 0, transition: { duration: 0.7 } },
  };

  const words = ["Joy", "Laughter", "Dance", "Sing", "Dream", "Love"];
  const finalRomanticQuote = "May your life be filled with all of them.";

  const handleMouseUp = () => {
    setIsHolding(false);
    setHasInteracted(true);
  };
  
  // These values remain constant as they are relative to the 800x800 viewbox.
  // The scaling is handled by the parent `CelestialContainer`.
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
      onTouchStart={() => setIsHolding(true)} // ✅ Add touch events for mobile
      onTouchEnd={handleMouseUp}
    >
      <Particles id="tsparticles-celestial" init={particlesInit} options={particleOptions} />
      <BackButton whileHover={{ scale: 1.1, color: '#fff', borderColor: '#fff' }} onClick={onExit}>
        &lt; Back
      </BackButton>

      <AnimatePresence>
        {!isHolding && !hasInteracted && (
          <InstructionText initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 1.0 }}>
            Press and hold to play the music box
          </InstructionText>
        )}
      </AnimatePresence>
      
      {/* The responsive container now wraps both the SVG and the words div */}
      <CelestialContainer>
        <motion.svg width="100%" height="100%" viewBox={`0 0 ${containerSize} ${containerSize}`} style={{ zIndex: 2, position: 'absolute' }}>
          <AnimatePresence>
            {!isHolding && (
              <motion.g key="music-box" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, filter: 'drop-shadow(0 0 10px #FFB6C1)' }} exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }} transition={{ type: 'spring', stiffness: 200, damping: 10 }}>
                <path d="M320 420 H 480 V 380 H 320 Z" fill="#FFF0F5" stroke="#FFB6C1" strokeWidth="3"/>
                <path d="M310 380 H 490 L 480 370 H 320 Z" fill="#FFC0CB" stroke="#FFB6C1" strokeWidth="3"/>
                <circle cx="400" cy="400" r="10" fill="#FF69B4" stroke="#FFFFFF" strokeWidth="2"/>
              </motion.g>
            )}
          </AnimatePresence>
        </motion.svg>

        <AnimatePresence>
          {isHolding &&
            words.map((word, i) => {
              const angle = i * (2 * Math.PI) / words.length;
              const left = center + radius * Math.cos(angle) - 60; // Adjustments might be needed based on font size
              const top = center + radius * Math.sin(angle) - 20;
              return (
                <Word key={word} initial={{ opacity: 0, scale: 0.5, left: center, top: center }} animate={{ opacity: 1, scale: 1, left, top }} exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }} transition={{ duration: 0.8, delay: i * 0.1, ease: 'backOut' }} style={{ left, top }}>
                  {word}
                </Word>
              );
            })}
        </AnimatePresence>

        <AnimatePresence>
          {!isHolding && hasInteracted && (
            <FinalQuote initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: 'easeOut' }}>
              {finalRomanticQuote}
            </FinalQuote>
          )}
        </AnimatePresence>
      </CelestialContainer>
    </NexusWrapper>
  );
};

export default CelestialMelodyNexus;
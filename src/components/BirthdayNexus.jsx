import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

// --- Styled Components with an Ultra-Romantic, Ethereal Theme ---

const NexusWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; /* Prevent scrollbars from the floating items */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: 
    radial-gradient(circle at 20% 80%, rgba(255, 182, 193, 0.6) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(230, 224, 255, 0.6) 0%, transparent 50%),
    radial-gradient(circle, #E6E0FF 0%, #FFDDEE 50%, #FFE4E1 100%); /* Layered romantic glows */
  backdrop-filter: blur(15px); /* Softer blur for dreaminess */
  z-index: 100;
  padding: 1rem 0;
  box-shadow: inset 0 0 100px rgba(255, 182, 193, 0.3); /* Subtle inner glow */
`;

const ParticleWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 25px;
  left: 25px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 240, 245, 0.8);
  color: #FFF0F5;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  padding: 10px 20px;
  cursor: pointer;
  z-index: 110;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(255, 182, 193, 0.3);
  transition: all 0.3s ease;
`;

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; /* Reduced gap */
  z-index: 2;
  @media (max-width: 768px) {
    transform: scale(0.9);
  }
`;

const SideEffectsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 3;

  @media (max-width: 900px) {
    display: none; /* Hide on smaller screens for clarity */
  }
`;

const FloatingItem = styled(motion.div)`
  position: absolute;
  font-size: 2.5rem; /* Slightly larger for impact */
  text-shadow: 0 0 20px rgba(255, 182, 193, 0.8); /* Romantic pink glow */
  filter: drop-shadow(0 0 10px rgba(255, 240, 245, 0.6));
`;

const BirthdayMessage = styled(motion.p)`
  font-family: 'Dancing Script', cursive; /* More romantic, flowing font */
  font-weight: 400;
  font-size: 1.8rem; /* Slightly larger for elegance */
  color: #FFF0F5;
  text-shadow: 0 0 15px rgba(255, 182, 193, 0.8), 0 0 30px rgba(255, 240, 245, 0.5); /* Layered romantic shadows */
  max-width: 50%;
  text-align: center;
  margin-top: 1.5rem;
  z-index: 2;
  line-height: 1.6;
  letter-spacing: 1px; /* Subtle spacing for beauty */
  @media (max-width: 768px) {
    font-size: 1.4rem;
    max-width: 85%;
    margin-top: 1rem;
  }
`;

const AnimatedHeader = styled(motion.h2)`
  font-family: 'Parisienne', cursive; /* Elegant new font */
  font-size: 4.5rem;
  color: #FFFFFF;
  text-shadow: 
    0 0 20px #FFB6C1, 
    0 0 40px rgba(255, 182, 193, 0.5), 
    2px 2px 4px rgba(0, 0, 0, 0.1); /* Enhanced romantic glow */
  text-align: center;
  white-space: nowrap;
  margin-bottom: -1rem; /* Pull the cake closer */
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const CoolTypingAnimation = ({ text, delay }) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay
      }
    }
  };
  const charVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      skewX: 5, /* Subtle skew for whimsy */
      rotate: -5
    },
    visible: {
      opacity: 1,
      y: 0,
      skewX: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        rotate: { duration: 0.6 }
      }
    }
  };
  return (
    <AnimatedHeader variants={containerVariants} initial="hidden" animate="visible">
      {Array.from(text).map((char, index) => (
        <motion.span key={index} variants={charVariants}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </AnimatedHeader>
  );
};

// --- Main Component ---

const BirthdayNexus = ({ onExit, message }) => {
  const particlesInit = async (engine) => await loadSlim(engine);

  const particlesOptions = {
    fullScreen: { enable: false },
    particles: {
      number: { value: 40 }, // More particles for fuller romance
      color: { value: ['#FFB6C1', '#E6E0FF', '#FFE4E1', '#FFFFFF'] }, // Romantic pastel palette
      shape: {
        type: ['heart', 'circle', 'star'], // Mix of hearts, circles, and stars
      },
      opacity: { value: { min: 0.4, max: 0.9 } },
      size: { value: { min: 8, max: 25 } },
      move: {
        enable: true,
        speed: 0.8, // Slower for gentle float
        direction: 'top',
        straight: false,
        outModes: { default: 'out' },
        trail: {
          enable: true,
          fill: { color: '#FFB6C1' }, // Pink trails
          length: 8, // Longer trails for beauty
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'bubble',
        },
      },
      modes: {
        bubble: {
          distance: 150,
          size: 30,
          duration: 3,
          opacity: 0.8,
        },
      },
    },
    detectRetina: true,
  };

  // Enhanced Animation Variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] // Smoother ease for romance
      }
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };
  const svgContainerVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 80,
        delay: 1,
        rotate: { duration: 1 }
      }
    }
  };
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 2.5
      }
    }
  };
  const floatingItemVariant = (duration, delay) => ({
    initial: { y: '100vh', opacity: 0, scale: 0.5, rotate: 0 },
    animate: {
      y: '-20vh',
      opacity: [0, 0.8, 0.8, 0],
      scale: [0.5, 1.2, 1, 0.8], // Gentle scaling
      rotate: [0, 180, 360], // Soft rotation for whimsy
      transition: {
        duration,
        ease: 'easeInOut',
        repeat: Infinity,
        delay,
        rotate: { duration: 20, ease: 'linear' } // Slow rotation
      }
    },
  });

  // Message stagger animation
  const messageVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } };
  const messageCharVariant = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200 } } };

  return (
    <NexusWrapper variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <ParticleWrapper>
        <Particles id="tsparticles-hearts" init={particlesInit} options={particlesOptions} />
      </ParticleWrapper>

      <SideEffectsContainer>
        {/* Enhanced floating romantic elements with more variety */}
        <FloatingItem variants={floatingItemVariant(15, 0)} style={{ left: '5%', top: '10%' }}>💖</FloatingItem>
        <FloatingItem variants={floatingItemVariant(20, 5)} style={{ left: '15%', top: '20%' }}>🌹</FloatingItem> {/* Added rose */}
        <FloatingItem variants={floatingItemVariant(18, 8)} style={{ left: '20%', top: '40%' }}>✨</FloatingItem>
        <FloatingItem variants={floatingItemVariant(16, 3)} style={{ right: '5%', top: '15%' }}>💕</FloatingItem> {/* Added double heart */}
        <FloatingItem variants={floatingItemVariant(22, 6)} style={{ right: '15%', top: '30%' }}>🌸</FloatingItem>
        <FloatingItem variants={floatingItemVariant(17, 10)} style={{ right: '20%', top: '50%' }}>💍</FloatingItem> {/* Added ring for romance */}
        <FloatingItem variants={floatingItemVariant(19, 12)} style={{ left: '30%', top: '60%' }}>💋</FloatingItem> {/* Added kiss */}
        <FloatingItem variants={floatingItemVariant(14, 4)} style={{ right: '30%', top: '70%' }}>🌺</FloatingItem> {/* Added flower */}
      </SideEffectsContainer>

      <BackButton
        whileHover={{
          scale: 1.1,
          backgroundColor: 'rgba(255,255,255,0.25)',
          boxShadow: '0 6px 20px rgba(255, 182, 193, 0.4)'
        }}
        whileTap={{ scale: 0.9 }}
        onClick={onExit}
      >
        &lt; Back
      </BackButton>

      <MainContentWrapper>
        <CoolTypingAnimation text="Төрсөн өдрийн мэнд хүргье" delay={1.5} />

        <motion.svg
          width="350"
          height="350"
          viewBox="0 0 250 250"
          variants={svgContainerVariants}
          initial="hidden"
          animate="visible"
          style={{ zIndex: 2, overflow: 'visible' }}
        >
          <defs>
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#A78FAF" floodOpacity="0.4"/>
            </filter>
            <linearGradient id="frostingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FFF0F5" />
              <stop offset="100%" stopColor="#FFE4E1" /> {/* Smoother gradient */}
            </linearGradient>
            <linearGradient id="standGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F8F0C0" />
              <stop offset="100%" stopColor="#D8C0A8" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" /> {/* Softer glow */}
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {/* Added sparkle filter for extra beauty */}
            <filter id="sparkle" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="sparkleBlur" />
              <feMerge>
                <feMergeNode in="sparkleBlur" floodColor="#FFD700" floodOpacity="0.6" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#softShadow)">
            {/* Enhanced Cake Stand with subtle shine */}
            <path d="M 50 220 H 200 L 190 230 H 60 Z" fill="url(#standGradient)" stroke="#C8B098" strokeWidth="0.5" />
            <ellipse cx="125" cy="220" rx="75" ry="8" fill="url(#standGradient)" stroke="#C8B098" strokeWidth="0.5" />
            <motion.circle cx="125" cy="220" r="2" fill="#FFD700" filter="url(#sparkle)" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} /> {/* Shine spot */}
            
            {/* Enhanced Tiers & Icing with more romantic details */}
            <rect x="45" y="160" width="160" height="60" fill="url(#frostingGradient)" />
            <path d="M 45 160 C 55 175, 75 175, 85 160 C 95 175, 115 175, 125 160 C 135 175, 155 175, 165 160 C 175 175, 195 175, 205 160" fill="none" stroke="#FFF0F5" strokeWidth="4" filter="url(#glow)"/>
            <ellipse cx="125" cy="160" rx="80" ry="20" fill="url(#frostingGradient)" stroke="#FFDDEE" strokeWidth="0.5"/>
            
            <rect x="70" y="110" width="110" height="50" fill="url(#frostingGradient)" />
            <path d="M 70 110 C 78 122, 93 122, 100 110 C 108 122, 123 122, 130 110 C 138 122, 153 122, 160 110 C 168 122, 173 122, 180 110" fill="none" stroke="#FFF0F5" strokeWidth="3" filter="url(#glow)"/>
            <ellipse cx="125" cy="110" rx="55" ry="15" fill="url(#frostingGradient)" stroke="#FFDDEE" strokeWidth="0.5"/>

            <rect x="90" y="70" width="70" height="40" fill="url(#frostingGradient)" />
            <path d="M 90 70 C 97 80, 107 80, 112 70 C 117 80, 127 80, 132 70 C 137 80, 147 80, 152 70 C 157 80, 160 80, 160 70" fill="none" stroke="#FFF0F5" strokeWidth="2.5" filter="url(#glow)"/>
            <ellipse cx="125" cy="70" rx="35" ry="10" fill="url(#frostingGradient)" stroke="#FFDDEE" strokeWidth="0.5"/>

            {/* Enhanced Candles with flickering flames and sparkles */}
            {[105, 118, 131, 144].map((x, i) => (
              <g key={i}>
                <rect x={x} y="45" width="3" height="25" fill="#FFF0F5" stroke="#E6E0D4" strokeWidth="0.5" />
                <motion.path
                  d={`M ${x + 1.5} 45 Q ${x - 1.5} 40, ${x + 1.5} 35 Q ${x + 4.5} 40, ${x + 1.5} 45 Z`}
                  fill="#FFD700"
                  filter="url(#glow)"
                  animate={{
                    opacity: [0.8, 1, 0.9, 1, 0.85, 1],
                    scale: [1, 1.05, 1, 1.02, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                    delay: Math.random() * 0.5
                  }}
                />
              </g>
            ))}

            {/* Heart Topper */}
            <motion.path
              d="M125 55 Q115 45 125 35 Q135 45 125 55 Z"
              fill="#FFB6C1"
              stroke="#FFFFFF"
              strokeWidth="1"
              filter="url(#glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 2, type: 'spring' } }}
            />
          </g>
        </motion.svg>
        
        <motion.div variants={contentVariants} initial="hidden" animate="visible">
            <BirthdayMessage variants={messageVariants}>
                {Array.from(message).map((char, index) => (
                    <motion.span key={index} variants={messageCharVariant}>
                        {char}
                    </motion.span>
                ))}
            </BirthdayMessage>
        </motion.div>

      </MainContentWrapper>
    </NexusWrapper>
  );
};

export default BirthdayNexus;
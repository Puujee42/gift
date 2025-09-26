import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import Confetti from 'react-confetti';

// --- Styled Components for the "Constellation Creator" Game ---

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
  background: radial-gradient(circle, #2a0a4a 0%, #11011e 100%);
  cursor: none;
  transition: background 1s ease;
`;

const ParticleWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: all;
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
  box-shadow: 0 0 20px rgba(224, 230, 241, 0.3);
`;

const GameUI = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  color: #fff;
  text-shadow: 0 0 10px #b19cd9;
  z-index: 110;
  background: rgba(0, 0, 0, 0.3);
  padding: 15px 20px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(224, 230, 241, 0.2);
  text-align: center;
`;

const ChecklistItem = styled.div`
  opacity: ${({ found }) => (found ? 1 : 0.6)};
  text-decoration: ${({ found }) => (found ? 'line-through' : 'none')};
  color: ${({ isNext }) => (isNext ? '#F0E68C' : '#fff')};
  transition: all 0.3s ease;
`;

const FinalMessage = styled(motion.p)`
  position: absolute;
  font-family: 'Parisienne', cursive;
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 0 0 10px #fff, 0 0 20px #b19cd9, 0 0 40px #F0E68C;
  max-width: 60%;
  text-align: center;
  z-index: 100;
`;

const RomanticOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(255, 182, 193, 0.3) 0%, transparent 70%);
  z-index: 5;
  pointer-events: none;
`;

const FloatingHeart = styled(motion.div)`
  position: absolute;
  font-size: 1.5rem;
  color: #FFB6C1;
  text-shadow: 0 0 10px #FFB6C1;
  pointer-events: none;
  z-index: 6;
`;

const GameContainer = styled.div`
  position: relative;
  width: 900px;
  height: 900px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) { transform: scale(0.7); }
  @media (max-width: 480px) { transform: scale(0.5); }
`;

const StardustCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);
  return (
    <motion.div
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 999, pointerEvents: 'none' }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <div style={{
        position: 'absolute', top: -8, left: -8, width: 16, height: 16,
        background: 'radial-gradient(circle, #fff, #b19cd9)',
        borderRadius: '50%',
        boxShadow: '0 0 15px #fff, 0 0 25px #b19cd9, 0 0 40px #F0E68C'
      }} />
    </motion.div>
  );
};

const starData = [
  { id: 'Hope', x: 200, y: 300 }, { id: 'Dream', x: 400, y: 150 },
  { id: 'Love', x: 600, y: 300 }, { id: 'Future', x: 400, y: 450 }
];

// --- Main Constellation Creator Game ---

const CelestialMelodyNexus = ({ onExit }) => {
  const [gameState, setGameState] = useState('playing');
  const [foundStars, setFoundStars] = useState([]);
  const [lines, setLines] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hearts, setHearts] = useState([]);

  const particlesInit = async (engine) => await loadSlim(engine);

  const particlesOptions = {
    fullScreen: { enable: true, zIndex: 0 },
    particles: {
      number: { value: 100 },
      color: { value: ['#E0E6F1', '#F0E68C', '#B19CD9', '#FFFFFF'] },
      shape: { type: ['star', 'circle'] },
      opacity: { value: { min: 0.3, max: 0.9 }, animation: { enable: true, speed: 1, sync: false } },
      size: { value: { min: 1, max: 4 }, animation: { enable: true, speed: 2 } },
      move: { enable: true, speed: { min: 0.2, max: 1 }, random: true, outModes: { default: 'out' } },
      links: { enable: true, distance: 150, color: { value: '#F0E68C' }, opacity: 0.2, width: 0.5 }
    },
    detectRetina: true,
    interactivity: {
      events: {
        onHover: { enable: true, mode: ['repulse', 'bubble'] },
        onClick: { enable: true, mode: 'push' },
      },
      modes: {
        repulse: { distance: 100, duration: 0.5, speed: 1 },
        bubble: { distance: 200, size: 8, duration: 2, opacity: 0.8 },
        push: { quantity: 5 }
      }
    },
  };

  const handleStarClick = (star) => {
    if (gameState !== 'playing' || star.id !== starData[foundStars.length]?.id) return;
    const newFoundStars = [...foundStars, star];
    setFoundStars(newFoundStars);
    if (newFoundStars.length > 1) {
      const prevStar = newFoundStars[newFoundStars.length - 2];
      setLines([...lines, { x1: prevStar.x, y1: prevStar.y, x2: star.x, y2: star.y }]);
    }
  };

  useEffect(() => {
    if (foundStars.length === starData.length) {
      const firstStar = foundStars[0];
      const lastStar = foundStars[foundStars.length - 1];
      setLines(prev => [...prev, { x1: lastStar.x, y1: lastStar.y, x2: firstStar.x, y2: firstStar.y }]);
      setGameState('reveal');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 8000);
      const newHearts = Array.from({ length: 20 }).map(() => ({
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        delay: Math.random() * 2
      }));
      setHearts(newHearts);
    }
  }, [foundStars]);

  const heartVariants = {
    initial: { y: window.innerHeight + 50, opacity: 0, scale: 0.5 },
    animate: {
      y: -100, opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.8],
      transition: { duration: 5 + Math.random() * 3, ease: "linear" }
    }
  };
  
  const CelestialMuse = () => (
    <motion.g
      id="celestial-muse"
      initial={{ opacity: 0.3 }}
      animate={{ opacity: gameState === 'reveal' ? 1 : 0.3, scale: gameState === 'reveal' ? 1.1 : 1, transition: { duration: 2 } }}
    >
      <path d="M400 350 C 380 450, 420 450, 400 550" fill="none" stroke="url(#museGradient)" strokeWidth="3" />
      <circle cx="400" cy="320" r="20" fill="url(#museGradient)" />
      <motion.path
        d="M400 300 Q 385 285 400 270 Q 415 285 400 300"
        fill="#FFB6C1" stroke="#E0E6F1" strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: gameState === 'reveal' ? 1 : 0, transition: { delay: 2, type: 'spring' } }}
      />
      <defs>
        <linearGradient id="museGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E0E6F1" /><stop offset="100%" stopColor="#B19CD9" />
        </linearGradient>
      </defs>
    </motion.g>
  );

  return (
    <NexusWrapper 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <ParticleWrapper>
        <Particles id="tsparticles-constellation" init={particlesInit} options={particlesOptions} />
      </ParticleWrapper>

      <StardustCursor />
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} colors={['#F0E68C', '#E0E6F1', '#B19CD9', '#FFB6C1']} />}

      <AnimatePresence>
        {gameState === 'reveal' && (
          <RomanticOverlay
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 2, delay: 1, ease: "easeOut" } }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <BackButton whileHover={{ scale: 1.1 }} onClick={onExit}>&lt; Back</BackButton>
      
      <AnimatePresence>
        {gameState === 'playing' && (
          <GameUI initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Create Your Constellation:</div>
            {starData.map((star, index) => (
              <ChecklistItem key={star.id} found={foundStars.length > index} isNext={foundStars.length === index}>
                {foundStars.length > index ? '✦' : '✧'} Find the Star of {star.id}
              </ChecklistItem>
            ))}
          </GameUI>
        )}
        {gameState === 'reveal' && (
          <FinalMessage initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.5 } }}>
            May your future shine as brightly as the stars you've connected. Happy 18th Birthday! 💖
          </FinalMessage>
        )}
      </AnimatePresence>

      {hearts.map(heart => (
        <FloatingHeart
          key={heart.id}
          variants={heartVariants}
          initial="initial"
          animate="animate"
          transition={{ ...heartVariants.animate.transition, delay: heart.delay }}
          style={{ left: heart.x }}
        >
          💖
        </FloatingHeart>
      ))}
      
      <GameContainer>
        <motion.svg width="100%" height="100%" viewBox="0 0 800 800" style={{ zIndex: 2, position: 'absolute', overflow: 'visible' }}>
          <CelestialMuse />
          
          {lines.map((line, index) => (
            <motion.line
              key={index}
              x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              stroke="#F0E68C" strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, stroke: gameState === 'reveal' ? '#FFB6C1' : '#F0E68C', transition: { duration: 0.5 } }}
              style={{ filter: 'drop-shadow(0 0 5px #F0E68C)' }}
            />
          ))}

          {starData.map((star, index) => (
            <motion.g
              key={star.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: index * 0.2 } }}
              onClick={() => handleStarClick(star)}
              style={{ cursor: 'pointer' }}
              whileHover={{ scale: 1.5 }}
            >
              <motion.circle
                cx={star.x} cy={star.y} r="10" fill="#E0E6F1"
                animate={{
                  scale: foundStars.some(s => s.id === star.id) ? 1.5 : [1, 1.2, 1],
                  filter: foundStars.some(s => s.id === star.id) ? 'drop-shadow(0 0 15px #F0E68C)' : 'drop-shadow(0 0 5px #fff)',
                  fill: gameState === 'reveal' ? '#FFB6C1' : '#E0E6F1'
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
              />
              <motion.text
                  x={star.x} y={star.y - 20}
                  textAnchor="middle" fill="#fff" fontSize="14"
                  fontFamily="Poppins, sans-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: foundStars.length === index ? 1 : 0 }}
                  style={{ pointerEvents: 'none' }}
                >
                  {star.id}
              </motion.text>
            </motion.g>
          ))}
        </motion.svg>
      </GameContainer>
    </NexusWrapper>
  );
};

export default CelestialMelodyNexus;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

// --- Enhanced Styled Components with Ultra-Aesthetic, Alive Theme ---

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
  background: 
    radial-gradient(circle at 20% 80%, rgba(255, 182, 193, 0.7) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(230, 224, 255, 0.7) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(255, 105, 180, 0.4) 0%, transparent 70%),
    linear-gradient(45deg, #E6E0FF 0%, #FFDDEE 30%, #FFE4E1 70%, #E6E0FF 100%);
  backdrop-filter: blur(20px);
  z-index: 100;
  padding: 1rem 0;
  box-shadow: inset 0 0 150px rgba(255, 182, 193, 0.4), inset 0 0 300px rgba(230, 224, 255, 0.2);
  animation: breathe 8s ease-in-out infinite alternate;
  @keyframes breathe {
    0% { box-shadow: inset 0 0 150px rgba(255, 182, 193, 0.4), inset 0 0 300px rgba(230, 224, 255, 0.2); }
    100% { box-shadow: inset 0 0 200px rgba(255, 182, 193, 0.6), inset 0 0 400px rgba(230, 224, 255, 0.3); }
  }
  cursor: none;
`;

const ParticleWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: all;
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 25px;
  left: 25px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 182, 193, 0.2));
  border: 1px solid rgba(255, 240, 245, 0.9);
  color: #FFF0F5;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  padding: 12px 24px;
  cursor: pointer;
  z-index: 110;
  border-radius: 30px;
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 20px rgba(255, 182, 193, 0.4), 0 0 30px rgba(255, 105, 180, 0.2);
`;

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 2;
  pointer-events: none;
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  animation: float 6s ease-in-out infinite;
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
`;

const FloatingItem = styled(motion.div)`
  position: absolute;
  font-size: 2.8rem;
  text-shadow: 0 0 25px rgba(255, 182, 193, 0.9);
  filter: drop-shadow(0 0 15px rgba(255, 240, 245, 0.8));
  pointer-events: all;
  cursor: pointer;
`;

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <motion.div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 999 }}>
      <motion.div
        style={{ position: 'absolute', left: mousePosition.x - 12, top: mousePosition.y - 12, width: 24, height: 24, background: 'radial-gradient(circle, #FFB6C1, #FF69B4)', borderRadius: '50%' }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '14px' }}>💖</span>
      </motion.div>
    </motion.div>
  );
};

const AnimatedHeader = styled(motion.h2)`
  font-family: 'Parisienne', cursive;
  font-size: 4.8rem;
  color: #FFFFFF;
  text-shadow: 0 0 25px #FFB6C1, 0 0 50px rgba(255, 182, 193, 0.6);
  text-align: center;
  white-space: nowrap;
  margin-bottom: -1rem;
`;

const CoolTypingAnimation = ({ text, delay }) => {
  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: delay } } };
  const charVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 120 } } };
  return (
    <AnimatedHeader variants={containerVariants} initial="hidden" animate="visible">
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={charVariants}>{char === ' ' ? '\u00A0' : char}</motion.span>
      ))}
    </AnimatedHeader>
  );
};

const InteractiveMessage = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Dancing Script', cursive;
  font-size: 2.5rem;
  color: #FFF0F5;
  text-shadow: 0 0 20px rgba(255, 182, 193, 0.9);
  text-align: center;
  z-index: 4;
  pointer-events: none;
`;

const SoftMessage = styled(motion.p)`
  position: absolute;
  bottom: 15%;
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  color: rgba(255, 240, 245, 0.8);
  text-shadow: 0 0 10px rgba(255, 182, 193, 0.5);
  text-align: center;
  z-index: 4;
  pointer-events: none;
`;

const BirthdayMessage = styled(motion.p)`
  font-family: 'Dancing Script', cursive;
  font-weight: 400;
  font-size: 2.2rem;
  color: #FFF0F5;
  text-shadow: 0 0 20px rgba(255, 182, 193, 0.9);
  text-align: center;
  margin-top: 1rem;
  z-index: 5;
`;

// --- Enhanced Main Component ---

const BirthdayNexus = ({ onExit }) => {
  const particlesInit = async (engine) => await loadSlim(engine);
  const [isCakeClicked, setIsCakeClicked] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  
  const particlesOptions = { /* ...particles config remains the same... */ };

  const handleCakeClick = () => {
    if (!isCakeClicked) setIsCakeClicked(true);
    else if (!candlesBlown) setCandlesBlown(true);
  };

  return (
    <NexusWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <CustomCursor />
      <ParticleWrapper><Particles id="tsparticles-hearts" init={particlesInit} options={particlesOptions} /></ParticleWrapper>
      <SideEffectsContainer>
        <FloatingItem variants={{ initial: { y: '110vh' }, animate: { y: '-10vh', transition: { duration: 15, ease: 'linear', repeat: Infinity }}}} style={{ left: '10%', fontSize: '4rem' }} whileHover={{ scale: 1.5 }}>🎈</FloatingItem>
        <FloatingItem variants={{ initial: { y: '110vh' }, animate: { y: '-10vh', transition: { duration: 20, delay: 5, ease: 'linear', repeat: Infinity }}}} style={{ right: '10%', fontSize: '4rem' }} whileHover={{ scale: 1.5 }}>🎈</FloatingItem>
        <FloatingItem variants={{ initial: { y: '110vh' }, animate: { y: '-10vh', transition: { duration: 18, delay: 8, ease: 'linear', repeat: Infinity }}}} style={{ left: '25%', fontSize: '3rem' }} whileHover={{ scale: 1.5 }}>🎁</FloatingItem>
      </SideEffectsContainer>

      <BackButton whileHover={{ scale: 1.1 }} onClick={onExit}>&lt; Back</BackButton>

      <MainContentWrapper>
        <AnimatePresence>
          {!isCakeClicked && <CoolTypingAnimation text="Торт дээр дарна уу" delay={1.5} />}
        </AnimatePresence>

        <motion.div
          style={{ pointerEvents: 'all', cursor: 'pointer' }}
          onClick={handleCakeClick}
          whileHover={{ scale: 1.05, filter: 'drop-shadow(0 0 25px rgba(255,182,193,0.7))' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.svg width="350" height="350" viewBox="0 0 250 250" style={{ zIndex: 2, overflow: 'visible' }}>
            <defs>
              <filter id="softShadow"><feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#A78FAF" floodOpacity="0.4"/></filter>
              <linearGradient id="frostingGradient"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#FFE4E1" /></linearGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <g filter="url(#softShadow)">
              <rect x="45" y="160" width="160" height="60" fill="url(#frostingGradient)" />
              <ellipse cx="125" cy="160" rx="80" ry="20" fill="url(#frostingGradient)" />
              <rect x="70" y="110" width="110" height="50" fill="url(#frostingGradient)" />
              <ellipse cx="125" cy="110" rx="55" ry="15" fill="url(#frostingGradient)" />
              <rect x="90" y="70" width="70" height="40" fill="url(#frostingGradient)" />
              <ellipse cx="125" cy="70" rx="35" ry="10" fill="url(#frostingGradient)" />
              {[105, 118, 131, 144, 124.5].map((x, i) => (
                <g key={i}>
                  <rect x={x} y="45" width="3" height="25" fill="#FFF0F5" />
                  <motion.path
                    d={`M ${x + 1.5} 45 Q ${x - 1.5} 40, ${x + 1.5} 35 Q ${x + 4.5} 40, ${x + 1.5} 45 Z`}
                    fill="#FFD700" filter="url(#glow)"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: candlesBlown ? 0 : 1, scale: candlesBlown ? 0.5 : 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  />
                  {candlesBlown && <motion.path d={`M ${x+1.5} 45 C ${x-1.5} 35, ${x+4.5} 30, ${x+1.5} 25`} fill="none" stroke="rgba(200,200,200,0.5)" strokeWidth="1" initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0.7, 0], y: -20, transition: { duration: 2, delay: i * 0.1 } }} />}
                </g>
              ))}
            </g>
          </motion.svg>
        </motion.div>

        <AnimatePresence>
            {candlesBlown && (
                <BirthdayMessage initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition:{ delay: 1 } }}>
                    5 нас хүрсэнд нь баяр хүргье💖
                </BirthdayMessage>
            )}
        </AnimatePresence>

      </MainContentWrapper>

      <AnimatePresence>
        {isCakeClicked && !candlesBlown && (
          <InteractiveMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            хүслээ бод
          </InteractiveMessage>
        )}
        
      </AnimatePresence>
    </NexusWrapper>
  );
};

export default BirthdayNexus;
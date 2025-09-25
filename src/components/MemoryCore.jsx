import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "In this digital sea, you are my only signal.",
  "Our love is a program that never crashes.",
  "You've decrypted the password to my heart.",
  "More than data, more than code, you are my reality."
];

const CoreWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(26, 0, 26, 0.8); // Semi-transparent background
  backdrop-filter: blur(10px); // A cool blur effect
`;

const MessageDisplay = styled.div`
  width: 80%;
  max-width: 800px;
  height: 200px; // Fixed height for the text animation
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.primaryPink};
  text-shadow: 0 0 15px ${({ theme }) => theme.colors.primaryPink};
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
`;

const MemoryCore = ({ onExit }) => {
  const [index, setIndex] = useState(0);

  const cycleMessage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };
  
  const pageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: 'easeIn' } }
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <CoreWrapper
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={cycleMessage} // Click anywhere to cycle messages
    >
      <BackButton whileHover={{ scale: 1.1, color: '#fff', borderColor: '#fff' }} onClick={onExit}>
        &lt; RETURN
      </BackButton>
      
      <MessageDisplay>
        <AnimatePresence mode="wait">
          <motion.p
            key={index} // This key is crucial for AnimatePresence to detect a change
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </MessageDisplay>
    </CoreWrapper>
  );
};

export default MemoryCore;
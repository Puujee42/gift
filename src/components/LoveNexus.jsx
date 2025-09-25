import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- Styled Components (remain the same) ---
const NexusWrapper = styled(motion.div)`/* ... */`;
const BackButton = styled(motion.button)`/* ... */`;
const WordsContainer = styled(motion.div)`/* ... */`;
const AnimatedWord = styled(motion.h2)`/* ... */`;
const QuoteText = styled(motion.p)`/* ... */`;

// The component now accepts props for its content
const LoveNexus = ({ onExit, words, quote }) => {
  // --- Animation Variants (remain the same) ---
  const pageVariants = { /* ... */ };
  const wordsContainerVariants = { /* ... */ };
  const wordVariant = { /* ... */ };
  const quoteContainerVariants = { /* ... */ };
  const charVariant = { /* ... */ };

  return (
    <NexusWrapper variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <BackButton whileHover={{ scale: 1.1, color: '#fff', borderColor: '#fff' }} onClick={onExit}>
        &lt; RETURN
      </BackButton>

      {/* Animation 1: The words passed in via props fade in sequentially */}
      <WordsContainer variants={wordsContainerVariants} initial="hidden" animate="visible">
        {words.map(word => (
          <AnimatedWord key={word} variants={wordVariant}>{word}</AnimatedWord>
        ))}
      </WordsContainer>

      {/* Animation 2: A central pulsing "Love Core" SVG appears */}
      <motion.svg width="200" height="200" viewBox="0 0 200 200"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.7 }}
      >
        <motion.circle cx="100" cy="100" r="80" stroke="#F400F4" strokeWidth="2" fill="none"
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle cx="100" cy="100" r="50" stroke="#FF69B4" strokeWidth="2" fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </motion.svg>

      {/* Animation 3: The quote passed in via props types itself out */}
      <QuoteText variants={quoteContainerVariants} initial="hidden" animate="visible">
        {Array.from(quote).map((char, index) => (
          <motion.span key={index} variants={charVariant}>
            {char}
          </motion.span>
        ))}
      </QuoteText>
    </NexusWrapper>
  );
};

export default LoveNexus;
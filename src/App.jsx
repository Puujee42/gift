import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// --- Princess-Themed Component Imports ---
// Assuming these are the princess-themed components we've built.
import FallingHearts from './components/FallingHearts'; // A princess-themed particle background
import CyberpunkOverlay from './components/CyberpunkOverlay'; // Themed as "Enchanted Overlay"
import DataFragment from './components/DataFragment'; // Themed as "Whispering Spells"
import RomanticMessage from './components/RomanticMessage'; // Themed as "Royal Proclamation"
import StarlightMessenger from './components/StarlightMessenger'; // Themed as "Guiding Stars"
import BirthdayNexus from './components/BirthdayNexus';
import SakuraNexus from './components/SakuraNexus'; // Themed as "Enchanted Castle Nexus"
import CelestialMelodyNexus from './components/CelestialMelodyNexus'; // Themed as "Royal Ball Nexus"
import CrystalWithArrow from './components/CrystalWithArrow'; // Themed with hearts and magical trails
import GlowingLoveLetter from './components/RomanticMessage';

const AppContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(
    circle,
    rgba(255, 182, 193, 0.3) 0%, 
    ${({ theme }) => theme.colors.darkPurple || '#2a003a'} 70%
  );
  overflow: hidden;
`;

// --- Mobile Responsiveness Wrappers ---

// This new container will manage the main layout.
// On desktop, it's a blank canvas for absolute positioning.
// On mobile, it becomes a single-column flex container.
const MainDisplayArea = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem; // Adds space between the lockets on mobile
    padding-top: 5rem; // Pushes content down from the top edge
    overflow-y: auto; // Allows scrolling if content overflows
  }
`;

// This wrapper is for elements that should ONLY appear on larger screens
// to keep the mobile view clean and focused.
const DesktopOnly = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

// This wrapper ensures the main title resizes gracefully on smaller screens.
const MainMessageWrapper = styled.main`
  @media (max-width: 768px) {
    // Overrides the absolute positioning of the RomanticMessage for mobile
    position: relative !important; 
    top: auto !important;
    left: auto !important;
    width: 90%;
    order: -1; // Places the title at the top of the flex column
    margin-bottom: 1rem;
  }
`;


const nexusContent = {
  birthday: { id: 1, message: '5 нас хүрсэнд нь баяр хүргье💖' },
  sakura: { id: 2, message: 'Alles Gute zum Geburtstag! Ich hoffe, dein Tag wird so süß wie dein Lächeln.' },
  celestial: { id: 3, message: '' } 
};

function App() {
  const [activeView, setActiveView] = useState({ type: 'main', content: null });
  const exitToMain = () => setActiveView({ type: 'main', content: null });

  const mainViewVariants = {
    initial: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } }
  };

  return (
    <AppContainer>
      <AnimatePresence mode="wait">
        {activeView.type === 'main' && (
          <motion.div key="main-view" variants={mainViewVariants} initial="initial" exit="exit">
            <FallingHearts />
            <CyberpunkOverlay />

            <MainDisplayArea>
              {/* The main title is wrapped to be repositioned on mobile */}
              <MainMessageWrapper>
                <GlowingLoveLetter />
              </MainMessageWrapper>

              {/* --- INTERACTIVE LOCKETS --- */}
              {/* On mobile, these will now appear in a clean vertical line. */}
              <CrystalWithArrow
                position={{ bottom: '15%', left: '30%' }}
                onClick={() => setActiveView({ type: 'birthdayNexus', content: nexusContent.birthday })}
                arrowConfig={{ position: { bottom: '-80px', left: '80px' }, rotation: 190 }}
              />
              <CrystalWithArrow
                position={{ top: '20%', left: '15%' }}
                onClick={() => setActiveView({ type: 'sakuraNexus', content: nexusContent.sakura })}
                arrowConfig={{ position: { top: '-80px', left: '80px' }, rotation: 100 }}
              />
              <CrystalWithArrow
                position={{ bottom: '25%', right: '25%' }}
                onClick={() => setActiveView({ type: 'celestialMelodyNexus', content: nexusContent.celestial })}
                arrowConfig={{ position: { bottom: '-80px', right: '80px' }, rotation: 340 }}
              />

              {/* --- Decorative Elements (Hidden on Mobile) --- */}
              <DesktopOnly>
                <DataFragment top="35%" left="10%">A fairy tale in modern times,</DataFragment>
                
                <StarlightMessenger top="10%" left="50%" />
                <StarlightMessenger top="80%" left="85%" />
                <StarlightMessenger top="45%" left="40%" />
              </DesktopOnly>
            </MainDisplayArea>
          </motion.div>
        )}

        {/* --- View Rendering Logic (No changes needed here) --- */}
        {activeView.type === 'birthdayNexus' && (
          <BirthdayNexus key="birthday-nexus-view" onExit={exitToMain} message={activeView.content.message} />
        )}
        {activeView.type === 'sakuraNexus' && (
          <SakuraNexus key="sakura-nexus-view" onExit={exitToMain} message={activeView.content.message} />
        )}
        {activeView.type === 'celestialMelodyNexus' && (
          <CelestialMelodyNexus key="celestial-nexus-view" onExit={exitToMain} />
        )}
      </AnimatePresence>
    </AppContainer>
  );
}

export default App;
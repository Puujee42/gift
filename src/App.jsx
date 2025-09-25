import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ FIX: Removed the import for GiftingNexus as it's no longer used.
import FallingHearts from './components/FallingHearts';
import CyberpunkOverlay from './components/CyberpunkOverlay';
import DataFragment from './components/DataFragment';
import RomanticMessage from './components/RomanticMessage';
import StarlightMessenger from './components/StarlightMessenger';
import BirthdayNexus from './components/BirthdayNexus';
import SakuraNexus from './components/SakuraNexus';
import CelestialMelodyNexus from './components/CelestialMelodyNexus';
import CrystalWithArrow from './components/CrystalWithArrow';

const AppContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(
    circle,
    rgba(255, 105, 180, 0.2) 0%,
    ${({ theme }) => theme.colors.darkPurple} 70%
  );
  overflow: hidden;
`;

// ✅ FIX: Removed the 'gifting' content as it is no longer assigned to a crystal.
const nexusContent = {
  birthday: { id: 1, message: 'Happy Birthday, My Love. May all your wishes come true.' },
  sakura: { id: 2, message: 'Like the cherry blossom, my love for you is fleetingly beautiful, yet eternally true.' },
  celestial: { id: 3, message: '' } // This scene doesn't need a message, but we include it for consistency
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

            {/* --- CRYSTAL ROUTING --- */}
            {/* There are now 3 crystals, each with a unique destination */}
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

            <DataFragment top="35%" left="10%">Neon dreams in circuits bright,</DataFragment>
            <DataFragment top="65%" right="20%">Our love's the code that shines all night.</DataFragment>
            
            <StarlightMessenger top="10%" left="50%" />
            <StarlightMessenger top="80%" left="85%" />
            <StarlightMessenger top="45%" left="40%" />

            <main>
              <RomanticMessage />
            </main>
          </motion.div>
        )}

        {/* --- View Rendering Logic --- */}
        {activeView.type === 'birthdayNexus' && (
          <BirthdayNexus key="birthday-nexus-view" onExit={exitToMain} message={activeView.content.message} />
        )}
        {activeView.type === 'sakuraNexus' && (
          <SakuraNexus key="sakura-nexus-view" onExit={exitToMain} message={activeView.content.message} />
        )}
        {/* ✅ FIX: Removed the GiftingNexus rendering logic as it's no longer reachable. */}
        {activeView.type === 'celestialMelodyNexus' && (
          <CelestialMelodyNexus key="celestial-nexus-view" onExit={exitToMain} />
        )}
      </AnimatePresence>
    </AppContainer>
  );
}

export default App;
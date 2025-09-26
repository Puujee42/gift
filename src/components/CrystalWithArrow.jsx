import React from 'react';
import styled from 'styled-components';
import InteractiveCrystal from './InteractiveCrystal'; // Renders our Magical Heart Locket
import ArrowPointer from './ArrowPointer';       // Renders our Magical Wand Trail

// This container places the enchanted locket.
// ✅ It's now responsive: absolute on desktop, relative on mobile to fit in a flex layout.
const LocketPlacement = styled.div`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};

  /* On smaller screens, switch to relative positioning so it can be stacked in a column. */
  @media (max-width: 768px) {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
  }
`;

// The inner container creates a magical space for the locket and its guiding arrow.
// No changes are needed here, as the children components handle their own scaling.
const MagicContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CrystalWithArrow = ({ position, onClick, arrowConfig }) => {
  return (
    <LocketPlacement
      top={position.top}
      left={position.left}
      right={position.right}
      bottom={position.bottom}
    >
      <MagicContainer>
        {/* The clickable heart locket that holds a magical scene. */}
        {/* This component is already responsive. */}
        <InteractiveCrystal onClick={onClick} />
        
        {/* The sparkling wand trail that points to the magic within. */}
        {/* This component is also already responsive. */}
        <ArrowPointer
          position={arrowConfig.position}
          rotation={arrowConfig.rotation}
        />
      </MagicContainer>
    </LocketPlacement>
  );
};

export default CrystalWithArrow;
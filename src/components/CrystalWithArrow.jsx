
import React from 'react';
import styled from 'styled-components';
import InteractiveCrystal from './InteractiveCrystal';
import ArrowPointer from './ArrowPointer';

// This container will be positioned absolutely on the main page.
const Wrapper = styled.div`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
`;

// The inner container helps with relative positioning of the arrow.
const InnerContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

const CrystalWithArrow = ({ position, onClick, arrowConfig }) => {
  return (
    <Wrapper
      top={position.top}
      left={position.left}
      right={position.right}
      bottom={position.bottom}
    >
      <InnerContainer>
        <InteractiveCrystal onClick={onClick} />
        <ArrowPointer
          position={arrowConfig.position}
          rotation={arrowConfig.rotation}
        />
      </InnerContainer>
    </Wrapper>
  );
};

export default CrystalWithArrow;
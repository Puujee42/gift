import React from 'react';
import styled, { keyframes } from 'styled-components';

// This keyframe animation creates the "lub-dub" effect of a heartbeat.
const heartbeatAnimation = keyframes`
  0% { transform: scale(0.9); opacity: 0.5; }
  10% { transform: scale(1); opacity: 0.7; }
  20% { transform: scale(0.9); opacity: 0.5; }
  30% { transform: scale(1.1); opacity: 0.8; }
  40% { transform: scale(0.9); opacity: 0.5; }
  100% { transform: scale(0.9); opacity: 0.5; }
`;

const HeartbeatContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // A soft, central pink glow
  background: radial-gradient(
    circle,
    rgba(244, 0, 244, 0.3) 0%,
    transparent 60%
  );
  animation: ${heartbeatAnimation} 2.5s ease-in-out infinite;
  z-index: -3; // Place it at the very back
`;

const PulsingHeartbeat = () => {
  return <HeartbeatContainer />;
};

export default PulsingHeartbeat;
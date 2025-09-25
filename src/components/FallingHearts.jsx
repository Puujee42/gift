import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { styled } from 'styled-components';

const ParticlesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const FallingHearts = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    particles: {
      number: {
        value: 50, // More particles
      },
      shape: {
        type: 'char',
        character: [
          { value: ['💖', '✨'] }, // You can use emojis!
        ],
      },
      opacity: {
        value: { min: 0.3, max: 0.8 },
      },
      size: {
        value: { min: 10, max: 25 },
      },
      move: {
        enable: true,
        speed: 2.5,
        direction: 'bottom',
        drift: {
          min: -0.1,
          max: 0.1,
        },
        straight: false,
        outModes: {
          default: 'out',
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
            distance: 200,
            size: 30,
            duration: 2,
            opacity: 1,
          },
        },
      },
  };

  return (
    <ParticlesContainer>
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />
    </ParticlesContainer>
  );
};

export default FallingHearts;
import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primaryPink: '#FF69B4', // Hot Pink
    accentNeon: '#F400F4',   // Neon Magenta/Fuchsia
    glowCyan: '#00FFFF',      // Bright Cyan
    darkPurple: '#1a001a',   // Deep Purple Background
    text: '#FFFFFF',          // White
  },
  fonts: {
    primary: "'Orbitron', sans-serif", // A futuristic, cyberpunk-style font
    secondary: "'Courier Prime', monospace",
  },
};

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Courier+Prime&display=swap');

  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.darkPurple};
    font-family: ${({ theme }) => theme.fonts.primary};
    color: ${({ theme }) => theme.colors.text};
    overflow: hidden; /* Prevents scrollbars from appearing */
  }

  * {
    box-sizing: border-box;
  }
`;
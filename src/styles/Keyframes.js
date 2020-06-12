import { keyframes } from 'styled-components';

export const fadeImage = keyframes`
  0% {
    filter: brightness(100%);
  }
  100% {
    filter: brightness(50%);
  }
`;

import { createGlobalStyle } from 'styled-components';
import fontFaces from './font-faces';

const GlobalStyle = createGlobalStyle`
  ${fontFaces}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    &:visited {
      color: inherit;
    }
  }
  html {
    font-size: ${({ theme }) => theme.font.size};
    font-family: ${({ theme }) => theme.font.family};
  }
`

export default GlobalStyle;

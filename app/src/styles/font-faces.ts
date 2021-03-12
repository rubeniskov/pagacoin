import { css } from 'styled-components';
import myFontURL from '../../assets/fonts/Montserrat-Regular.ttf';


export const fontFaces = css`
  @font-face {
    font-family: 'Montserrat';
    src: url(${myFontURL}) format('ttf');
    font-weight: 100;
    font-style: normal;
  }
`;

export default fontFaces;

// Core
import styled, { keyframes } from 'styled-components';


const wideIn = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`

const LayoutAnimated = styled.div`
  transition: width 600ms, padding 600ms;
  overflow: hidden;
  flex-grow: 0;
  width: 100%;
  animation: 600ms ${wideIn} ease-in-out;
`

export default LayoutAnimated

// const wideIn = keyframes`
//   0% {
//     max-width: 0;
//   }
//   100% {
//     max-width: 100%;
//   }
// `

// const LayoutAnimated = styled.div`
//   animation: 1s ${wideIn} ease-in-out;

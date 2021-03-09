import React from 'react';
import styled, { keyframes } from 'styled-components';
import useAmountCounter from '../../hooks/useAmountCounter';

const fadeIn = keyframes`
  0% {
    r: 60px
  } 
  50% {
    r: 90px
  }
  100% {
    r: 60px
  }
`

const ripple = keyframes`
  0% {
    opacity: 0.4
  } 
  50% {
    opacity: 0.5
  }
  100% {
    opacity: 0.8
  }
`

const CreditCardSvgStyled = styled.svg`
  .base {
    fill:#05a9eb;
  }
  .bubble1 {
    fill:#37c6ff;
    animation: 3s ${fadeIn} ease-in-out infinite;
    clip-path: url(#base-clip);
  }
  .bubble2 {
    fill:#0089e9;
    animation: 3s ${fadeIn} ease-in-out infinite;
    clip-path: url(#base-clip);
  }
  .bubble3 {
    fill:#fff;
    opacity:0.5;
    clip-path: url(#base-clip);
    /* animation: 3s ${fadeIn} ease-in-out infinite; */
  }
  .ripple {
    fill:none;
    stroke:#d4f4fc;
    stroke-miterlimit:10;
    clip-path: url(#base-clip);
    animation: 3s ${ripple} ease-in-out infinite;
  }
  .text1 {
    fill: white;
    font-size: 14px;
    font-family: Verdana;
  }
  .amount1{
    fill: white;
    font-size: 24px;
    font-family: Verdana;
    text-anchor: end;
  }
  .amount2{
    fill: white;
    font-size: 14px;
    font-family: Verdana;
  }
  .text2 {
    fill: white;
    font-size: 24px;
    font-family: Verdana;
  }
  .text3 {
    fill: white;
    font-size: 12px;
    font-family: Verdana;
  }
  .text4 {
    fill: white;
    font-size: 12px;
    font-family: Verdana;
  }
  .text4 {
    fill: white;
    font-size: 12px;
    font-family: Verdana;
    font-weight: lighter;
    text-transform: uppercase;
    opacity: 0.8;
  }
`

const CreditCardSvg = ({
  id = 'ADFSF',
  name = 'Monica Belluchi',
  amount = 673432.56,
  hash = 'b31d032cfdcf47a399990a71e43c5d2a',
  dueDate = '02/13',
}) => {
  const { value, pad } = useAmountCounter(amount);
  
  return (
  <CreditCardSvgStyled xmlns="http://www.w3.org/2000/svg" height="256" width="406" viewBox="0 128 406 256">
    <clipPath id="base-clip">
      <rect y="128" width="406" height="256" rx="15"/>
    </clipPath>
    <rect className='base' y="128" width="406" height="256" rx="15"/>
    <circle id="bubble1" className='bubble1' cx="412" cy="123" r="123"/>
    <circle id="bubble2" className='bubble2' cx="125.5" cy="403" r="100.5"/>
    <circle className='bubble3' cx="30" cy="280" r="17"/>
    <circle className='bubble3' cx="50" cy="280" r="17"/>
    <circle className='ripple' cx="403.5" cy="384.5" r="100.5"/>
    <circle className='ripple' cx="403.5" cy="384.5" r="70.5"/>
    <circle className='ripple' cx="403.5" cy="384.5" r="39.5"/>
    <text className='text1' x="10" y="190">
      {name}
    </text>
    <text className='amount1' x={pad} y="220">
      ${value[0]}
    </text>
    <text className='amount2' x={pad} y="220">
      .{value[1]}
    </text>
    <text className='text3' x="150" y="260">
      {hash}
    </text>

    <text className='text4' x="15" y="330">
      DUE DATE
    </text>
    <text className='text1' x="15" y="350">
      {dueDate}
    </text>

    <text className='text4' x="180" y="330">
      CARD NUMBER
    </text>
    <text className='text1' x="180" y="350">
      {id}
    </text>
  </CreditCardSvgStyled>
)}

export default CreditCardSvg;

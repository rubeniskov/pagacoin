import React, { useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import clsx from 'clsx';
import CredictCardSvg from './CreditCardSvg';

const data = [{
  id: 'ADFSF1',
  name: 'Monica Belluchi 1',
  amount: parseFloat((Math.random() * 100000).toFixed(2)),
  hash: 'b31d032cfdcf47a399990a71e43c5d2a',
  dueDate: '02/13',
}, {
  id: 'ADFSF2',
  name: 'Monica Belluchi 2',
  amount: parseFloat((Math.random() * 100000).toFixed(2)),
  hash: 'b31d032cfdcf47a399990a71e43c5d2a',
  dueDate: '02/13',
}, {
  id: 'ADFSF3',
  name: 'Monica Belluchi 3',
  amount: parseFloat((Math.random() * 100000).toFixed(2)),
  hash: 'b31d032cfdcf47a399990a71e43c5d2a',
  dueDate: '02/13',
}, {
  id: 'ADFSF4',
  name: 'Monica Belluchi 4',
  amount: parseFloat((Math.random() * 100000).toFixed(2)),
  hash: 'b31d032cfdcf47a399990a71e43c5d2a',
  dueDate: '02/13',
}]


const slide = keyframes`
  0% {
    transform: translate(0, 0);
    z-index: 101;
  }
  20% {
    transform: scale(1.1) translate(0, 100%);
    z-index: 100;
  }
  50% {
    z-index: 100;
    transform: scale(0.97) translate(0, 0);
  }
`

const Container = styled.div`
  width: 100%;
  position: relative;
  height: 0;
  padding: 42%;
  margin-bottom: 1rem;
  > div {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    &.selected {
      animation: 2s ${slide} ease-in-out;
    }
  }
  svg {
    width: 100%;
  }
`



const CreditCardSlider = ({ 
  selectedIndex$ = 0
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleClick = useCallback(()=> {
    setSelectedIndex((data.length + selectedIndex + 1) % data.length);
  }, [selectedIndex]);
  
  const shifted = [
    data[(data.length + selectedIndex) % data.length], 
    data[(data.length + selectedIndex + 1) % data.length]];
  
  return (
    <Container onClick={handleClick}>
     <div key={shifted[1].id}>
        <CredictCardSvg {...shifted[1]}/>
      </div>
      <div key={shifted[0].id} className={clsx({selected: selectedIndex !== 0})}>
        <CredictCardSvg {...shifted[0]}/>
      </div>
    </Container>
  );
}

export default CreditCardSlider;

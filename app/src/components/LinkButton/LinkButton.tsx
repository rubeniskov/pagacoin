// Core
import React from 'react';
import styled from 'styled-components';
// Components
import { Link } from 'react-router-dom'

const AnchorLink = styled.a`
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.color.primary.darken};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.font.size};
  cursor: pointer;
  &:disabled {
    background-color: #a7a7a7;
    cursor: not-allowed;
  }
`

const LinkButton = (props) => <Link component={AnchorLink} {...props}/>

export default LinkButton;

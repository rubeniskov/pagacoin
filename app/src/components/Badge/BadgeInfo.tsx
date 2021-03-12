// Core
import React, { ButtonHTMLAttributes } from 'react';
import Button from '../Button';
import styled from 'styled-components';
import InfoBadgeLabel from './BadgeInfoLabel';
import InfoBadgeValue from './BadgeInfoValue';


const InfoBadgeContainer = styled(Button)`
    display: inline-block;
    border-radius: 50%;
    border: solid 1px #EFEFEF;
    padding: 0.5rem;
    width: 5rem;
    height: 5rem;
    background-color: transparent;
    outline: none;
    color: #757575;
    &:hover {
      border-color: ${({ theme }) => theme.color.primary.default}
    }
`

export type BadgeInfoProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string,
  value: string
} 

const BadgeInfo: React.FC<BadgeInfoProps> = ({ label, value, ...restProps }) => {
  return (
    <InfoBadgeContainer {...restProps}>
      <InfoBadgeValue>{value}</InfoBadgeValue>
      <InfoBadgeLabel>{label}</InfoBadgeLabel>
    </InfoBadgeContainer>
    
  ) 
}

export default BadgeInfo;

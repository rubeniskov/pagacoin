// Core
import React, { forwardRef, MouseEventHandler, useCallback } from 'react';
import styled from 'styled-components';
// Components
import BadgeInfo from '../Badge/BadgeInfo';
import UserForm from './UserForm';

const UserAvatar = styled.img`
  border-radius: 50%;
  width: 80%;
  margin: 0 10%;
  border: solid 2px ${({ theme }) => theme.color.primary.default};
  margin-bottom: 1rem;
`

const UserBadgeContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 0.5rem;
`

const UserBadgeItem = styled.div`
  
`

export type UserDetailsProps = {
  userId?: string,
  onBadgeClick: MouseEventHandler<MouseEvent>
}

const UserDetails: React.FC<UserDetailsProps> = forwardRef(({
  userId,
  onBadgeClick,
  style,
  ...restProps
}, ref) => {

  return (
    <div ref={ref} style={style}>
      <UserAvatar src="https://www.w3schools.com/w3images/avatar1.png" />
      <UserBadgeContainer>
        <UserBadgeItem>
          <BadgeInfo label="Wallets" value="10" onClick={onBadgeClick}/>
        </UserBadgeItem>
        <UserBadgeItem>
          <BadgeInfo label="Transactions" value="43" onClick={onBadgeClick}/>
        </UserBadgeItem>
        <UserBadgeItem>
          <BadgeInfo label="Balance" value="40" onClick={onBadgeClick}/>
        </UserBadgeItem>
      </UserBadgeContainer>
      <UserForm userId={userId} {...restProps}/>
    </div>
  );
})


export default UserDetails;

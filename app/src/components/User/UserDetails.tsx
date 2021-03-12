// Core
import React, { useCallback } from 'react';
import styled from 'styled-components';
// Components
import Button from '../Button';
import BadgeInfo from '../Badge/BadgeInfo';

import { FormControl, FormLabel, FormActions } from '../Form';

const UserAvatar = styled.img`
  border-radius: 50%;
  width: 80%;
  margin: 0 10%;
  border: solid 2px ${({ theme }) => theme.color.primary.default};
  margin-bottom: 1rem;
`

const Input = styled.input`
  width: ${(({ fit }) => fit ? '100%' : 'auto')};
  border-radius: 5px;
  padding: 0.5rem;
  border: none;
  background: #efefef;
  font-family: 'Montserrat',sans-serif;
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
  firstname: string,
  lastname: string,

  onBadgeClick: React.MouseEventHandler<MouseEvent>
}

const UserDetails: React.FC<UserDetailsProps> = ({
  firstname,
  lastname,
  onBadgeClick,
}) => {

  // const handleChange = useCallback(() => {

  // });

  return (
    <div>
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
      <FormControl>
        <FormLabel htmlFor="firstname">Firstname</FormLabel>
        <Input id="firstname" name="firstname" type="text" value={firstname} fit/>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="lastname">Lastname</FormLabel>
        <Input id="lastname" name="lastname" type="text" value={lastname} fit/>
      </FormControl>
      <FormActions>
        <Button fit>Update user</Button>
      </FormActions>
    </div>
  );
}


export default UserDetails;

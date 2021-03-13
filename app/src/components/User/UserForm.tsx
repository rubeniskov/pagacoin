// Core
import React, { useCallback, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
// Queris
import { GET_USER_BY_ID } from '../../apollo/queries'
// Mutations
import { CREATE_USER, UPDATE_USER } from '../../apollo/mutations'
// Components
import Button from '../Button';
import TextField from '../Field/TextField';

import { FormControl, FormLabel, FormActions } from '../Form';
import { BannerError } from '../Banner';

const UserAvatar = styled.img`
  border-radius: 50%;
  width: 80%;
  margin: 0 10%;
  border: solid 2px ${({ theme }) => theme.color.primary.default};
  margin-bottom: 1rem;
`

export type UserFormProps = {
  userId?: string,
}

const UserForm: React.FC<UserFormProps> = ({
  userId,
  onSuccess,
  onError
}) => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: ''
  });

  const { loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { userId },
    skip: !userId,
    onCompleted: ({ user }) => {
      setUser(user);
    }
  });

  const [createUser, createUserResult] = useMutation(CREATE_USER);
  const [updateUser, updateUserResult] = useMutation(UPDATE_USER);

  const handleSuccess = (data) => {
    if (typeof onSuccess === 'function') {
      onSuccess(data);
    }
  }

  const handleClick = useCallback(() => {
    if (userId) {
      console.log({userId, ...user});
      updateUser({
        variables: {userId, ...user}
      }).then(({ data: { updateUser }}) => {
        handleSuccess(updateUser);
      }, onError);
    } else {
      createUser({
        variables: user
      })
      .then(({ data: { createUser }}) => {
        handleSuccess(createUser);
      }, onError);
    }
  }, [userId, user]);


  const handleChange = useCallback((evt) => {
    // @ts-ignore
    setUser((user) => ({
      ...user,
      [evt.target.name]: evt.target.value
    }));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <BannerError error={error} />
      <FormControl>
        <FormLabel htmlFor="firstname">Firstname</FormLabel>
        <TextField 
          id="firstname" 
          name="firstname" 
          type="text" 
          onChange={handleChange} 
          value={user.firstname} 
          fit/>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="lastname">Lastname</FormLabel>
        <TextField 
          id="lastname" 
          name="lastname" 
          type="text" 
          onChange={handleChange} 
          value={user.lastname} 
          fit/>
      </FormControl>
      <FormActions>
        <Button fit onClick={handleClick} disabled={loading || !user.firstname || !user.lastname}>{userId ? 'Update' : 'Create' } user</Button>
      </FormActions>
    </>
  );
}


export default UserForm;

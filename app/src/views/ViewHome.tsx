import React from 'react';
import LinkButton from '../components/LinkButton';
import { gql, useMutation } from '@apollo/client';

const ADD_TODO = gql`
  mutation AddTodo($firstname: String, $lastname: String) {
    createUser(firstname: $firstname, lastname: $lastname) {
      firstname
      lastname
    }
  }
`;

const HomeView = () => {
  const [updateTodo] = useMutation(ADD_TODO);
  const handlePopulateClick = () => {
    updateTodo({ variables: { firstname: 'pepe', lastname: 'juas' } });
  }

  return (
    <div>
      <h1>Home</h1>
      <small>Welcome</small>
      <p>Initialize de database with default data</p>
      <LinkButton onClick={handlePopulateClick}>Initialize</LinkButton>
    </div>
  )
}

export default HomeView;

import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import Button from '../components/Button';
import { MOCK_DATA_POPULATE } from '../apollo/mutations';
import BannerError from '../components/Banner/BannerError';


const HomeCard = styled.div`
  padding: 6rem 0;
  text-align: center;
  button {
    margin-top: 3rem;
  }
`
const HomeView = () => {
  const [mockDataPopulate, { loading, error }] = useMutation(MOCK_DATA_POPULATE);
  const handlePopulateClick = () => {
    mockDataPopulate({ variables: { 
      
    } });
  }

  return (
    <div>
      <h1>Home</h1>
      <HomeCard>
        <p>Initialize the database with default data</p>
        {loading && <p>Executing population, please wait</p>}
        <BannerError error={error} />
        <Button disabled={loading} onClick={handlePopulateClick}>{loading ? 'Loading' : 'Initialize'}</Button>
      </HomeCard>
    </div>
  )
}

export default HomeView;

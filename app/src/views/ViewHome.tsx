import React from 'react';
import LinkButton from '../components/LinkButton';
import { useMutation } from '@apollo/client';
import Button from '../components/Button';
import { MOCK_DATA_POPULATE } from '../apollo/mutations';
import BannerError from '../components/Banner/BannerError';

const HomeView = () => {
  const [mockDataPopulate, { loading, error }] = useMutation(MOCK_DATA_POPULATE);
  const handlePopulateClick = () => {
    mockDataPopulate({ variables: { 
      
    } });
  }

  return (
    <div>
      <h1>Home</h1>
      <div style={{ padding: '1rem 0' }}>
        <p>Initialize the database with default data</p>
        {loading && <p>Executing population, please wait</p>}
        <BannerError error={error} />
        <Button disabled={loading} onClick={handlePopulateClick}>{loading ? 'Loading' : 'Initialize'}</Button>
      </div>
    </div>
  )
}

export default HomeView;

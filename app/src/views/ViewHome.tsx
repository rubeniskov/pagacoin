import React from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import Button from '../components/Button';
import { MOCK_DATA_POPULATE } from '../apollo/mutations';
import { MOCK_DATA_STATUS } from '../apollo/queries';
import BannerError from '../components/Banner/BannerError';


const HomeCard = styled.div`
  padding: 6rem 0;
  button {
    margin-top: 3rem;
  }
  ul {
    margin-left: 2rem;
  }
  p {
    margin: 1rem 0;
  }
`
const HomeView = () => {
  const statusResult = useQuery(MOCK_DATA_STATUS);
  const [mockDataPopulate, { loading, error }] = useMutation(MOCK_DATA_POPULATE);
  const handlePopulateClick = () => {
    mockDataPopulate({ 
      variables: { 
        
      },
      refetchQueries: [{
        query: MOCK_DATA_STATUS
      }]
    });
  }

  return (
    <div>
      <h1>Home</h1>
      <HomeCard>
        {!statusResult.loading && 
        <>
          <p>The current database has the following data</p>
          <ul>
            <li><b>{statusResult.data.mockDataStatus.statistics.users}</b> users</li>
            <li><b>{statusResult.data.mockDataStatus.statistics.wallets}</b> wallets</li>
            <li><b>{statusResult.data.mockDataStatus.statistics.transactions}</b> transactions</li>
          </ul>
          <p>if you like you can initialize the database with a default mock data</p>
        </>
        }
        {loading && <p>Executing population, please wait</p>}
        <BannerError error={error} />
        <Button disabled={loading} onClick={handlePopulateClick}>{loading ? 'Loading' : 'Initialize'}</Button>
      </HomeCard>
    </div>
  )
}

export default HomeView;

import React from 'react';
import UserDetails from '../components/User/UserDetails';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../apollo/queries';
import { useRouteMatch, generatePath, useHistory } from 'react-router';

const ViewUser: React.FC<any> = (props) => {
  const { push, location } = useHistory();
  const { path, params } = useRouteMatch() || {};
  const { userId } = params || {};
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userId },
    onCompleted: () => {
      console.log('yeah');
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.toString()}</p>;
  
  return <UserDetails {...data.user} onBadgeClick={(evt) => push(`${generatePath(path, params)}/wallets`)}/>
}

export default ViewUser;

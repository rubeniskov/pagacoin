import React from 'react';
import UserDetails from '../components/User/UserDetails';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../apollo/queries';
import { useRouteMatch, generatePath, useHistory } from 'react-router';

const ViewUser: React.FC<any> = (props) => {
  const { push, location } = useHistory();
  const { path, params } = useRouteMatch() || {};
  const { userId } = params || {};
  
  return <UserDetails  
    userId={userId === 'create' ? null : userId}
    onSuccess={({ id: userId  }) => push(generatePath(path, { userId }))}
    onBadgeClick={(evt) => push(`${generatePath(path, params)}/wallets`)}
  />
}

export default ViewUser;

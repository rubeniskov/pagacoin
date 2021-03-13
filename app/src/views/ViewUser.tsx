import React from 'react';
import UserDetails from '../components/User/UserDetails';
import { Sticky } from 'react-sticky';
import { useRouteMatch, generatePath, useHistory } from 'react-router';

const ViewUser: React.FC<any> = (props) => {
  const { push, location } = useHistory();
  const { path, params } = useRouteMatch() || {};
  const { userId } = params || {};
  
  return (
    <Sticky topOffset={80}>{({ style }) =>
      <UserDetails 
        style={style} 
        userId={userId === 'create' ? null : userId}
        onSuccess={({ id: userId  }) => push(generatePath(path, { userId }))}
        onBadgeClick={(evt) => push(`${generatePath(path, params)}/wallets`)}
      />}
    </Sticky>
  )
}

export default ViewUser;

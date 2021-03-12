import React, { useCallback, useRef } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import UserTable from '../components/User/UserTable';
// Queries
import { LIST_USERS } from '../apollo/queries';
// import WalletTable from '../components/Wallet/WalletTable';
// import TransactionTable from '../components/Transaction/TransactionTable';
// import TransactionsView from './Transactions';
import { useHistory } from 'react-router';
import LayoutAside from '../layouts/Aside';
import { useRouteMatch, matchPath } from 'react-router';
import useOutsideClick from '../hooks/useOutsideClick';


const Jumbo = styled.div`
  padding: 2rem;
`

const ViewUsers = () => {
  
  const layoutRef = useRef(null);
  const { push, location } = useHistory();
  const { path, isExact, ...rest } = useRouteMatch();

  const { loading, error, data } = useQuery(LIST_USERS);

  useOutsideClick(layoutRef, evt => {
    push(`${path}`);
  });
  
  const handleRowClick = useCallback((evt, row) => {
    push(`${path}/${row.id}`);
  }, [push, location]);

  const { params = {} } = matchPath(location.pathname, {
    path: `${path}/:userId`,
    exact: false,
    strict: false
  }) || {};

  
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.toString()}</p>;

  return (
    <div>
      <Jumbo>
        <h1>Users</h1>
        <small>Welcome</small>
      </Jumbo>
      <UserTable 
        onRowClick={handleRowClick} 
        data={data.users}
        selectedRow={params.userId}
      />
    </div>
  )
}

export default ViewUsers;

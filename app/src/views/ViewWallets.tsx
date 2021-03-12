import React, { useCallback, useRef } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import WalletTable from '../components/Wallet/WalletTable';
// Queries
import { LIST_WALLETS } from '../apollo/queries';
// import WalletTable from '../components/Wallet/WalletTable';
// import TransactionTable from '../components/Transaction/TransactionTable';
// import TransactionsView from './Transactions';
import { useHistory } from 'react-router';
import LayoutAside from '../layouts/Aside';
import { useRouteMatch, matchPath, generatePath } from 'react-router';
import useOutsideClick from '../hooks/useOutsideClick';


const Jumbo = styled.div`
  padding: 2rem;
`

const ViewWallets = () => {
  
  const layoutRef = useRef(null);
  const { push, location } = useHistory();
  const { path, isExact, params, ...rest } = useRouteMatch();

  console.log(params);
  
  const { loading, error, data } = useQuery(LIST_WALLETS, {
    variables: params
  });

  useOutsideClick(layoutRef, evt => {
    push(`${path}`);
  });
  
  const handleRowClick = useCallback((evt, row) => {
    push(`${generatePath(path, params)}/${row.id}`);
  }, [push, location]);

  const { params: { walletId } } = matchPath(location.pathname, {
    path: `${path}/:walletId`,
    exact: false,
    strict: false
  }) || { params: {} };

  
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.toString()}</p>;

  return (
    <div>
      <Jumbo>
        <h1>Wallets</h1>
        <small>Welcome</small>
      </Jumbo>
      <WalletTable 
        onRowClick={handleRowClick} 
        data={data.wallets}
        selectedRow={walletId}
      />
    </div>
  )
}

export default ViewWallets;

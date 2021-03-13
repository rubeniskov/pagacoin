// Core
import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
// Hooks
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { useRouteMatch, matchPath, generatePath } from 'react-router';
import useOutsideClick from '../hooks/useOutsideClick';
// Queries
import { LIST_WALLETS } from '../apollo/queries';
// Mutations
import { CREATE_WALLET } from '../apollo/mutations';
// Componets
import { Plus } from '@styled-icons/boxicons-regular';
import WalletTable from '../components/Wallet/WalletTable';
import Button from '../components/Button';

const Jumbo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    color: white;
    border-radius: 50%;
    svg {
      width: 1rem;
    }
  }
`

const ViewWallets = () => {
  
  const layoutRef = useRef(null);
  const { push, location } = useHistory();
  const { path, isExact, params, ...rest } = useRouteMatch();
  
  const { loading, error, data, refetch } = useQuery(LIST_WALLETS, {
    variables: params
  });

  const [createWallet] = useMutation(CREATE_WALLET, {
    variables: params,
  });

  // TODO
  useOutsideClick(layoutRef, () => {
    push(`${path}`);
  });
  
  const handleRowClick = useCallback((evt, row) => {
    push(`${generatePath(path, params)}/${row.id}`);
  }, [push, location]);

  const handleCreateWallet = useCallback(() => {
    createWallet()
      .then(({ data: { createWallet: { id } }}) => push(`${generatePath(path, params)}/${id}`))
      .then(() => refetch());
  }, [path, params]);

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
        {params && params.userId && <Button onClick={handleCreateWallet}><Plus /></Button>}
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

// Core
import React, { useCallback, useState } from 'react';
// Hooks
import { useQuery } from '@apollo/client';
import { useRouteMatch } from 'react-router';
// Queries
import { GET_WALLET_BY_ID, LIST_WALLETS } from '../apollo/queries';
// Components
import WalletDetails from '../components/Wallet/WalletDetails';
import { Sticky } from 'react-sticky';

const ViewWallet: React.FC<any> = () => {
  const { params: { walletId } } = useRouteMatch() || { params: { walletId: undefined }};

  
  const { loading, error, data } = useQuery(GET_WALLET_BY_ID, {
    variables: { walletId }
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.toString()}</p>;
  
  return (
    <Sticky topOffset={80}>
      {({ style }) => <WalletDetails 
          style={style}
          walletId={walletId}
        {...data.wallet}/>}
    </Sticky>
  )
}

export default ViewWallet;

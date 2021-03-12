// Core
import React, { useCallback, useState } from 'react';
// Hooks
import { useDebouncedCallback } from 'use-debounce';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { useRouteMatch } from 'react-router';
// Queries
import { GET_WALLET_BY_ID, LIST_WALLETS } from '../apollo/queries';
import { LIST_USERS } from '../apollo/queries';
// Mutations
import { CHARGE_WALLET_MONEY, TRANSFER_WALLET_MONEY } from '../apollo/mutations';
// Components
import WalletDetails from '../components/Wallet/WalletDetails';

const ViewWallet: React.FC<any> = () => {

  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState(null);
  const [recipientWalletId, setRecipientWalletId] = useState(null);

  const { params: { walletId } } = useRouteMatch() || { params: { walletId: undefined }};
  
  const [chargeWalletMoney] = useMutation(CHARGE_WALLET_MONEY, {
    variables: { walletId }
  });

  const [transferWalletMoney] = useMutation(TRANSFER_WALLET_MONEY, {
    variables: { walletId }
  });
  
  const { loading, error, data } = useQuery(GET_WALLET_BY_ID, {
    variables: { walletId }
  });

  const [searchUsers, recipientQuery] = useLazyQuery(LIST_USERS);
  const [listRecipientWallets, recipientWalletQuery] = useLazyQuery(LIST_WALLETS);

  const handleRecipientChange = useDebouncedCallback((evt) => {
    searchUsers({
      variables: { query: evt.target.value }
    });
  }, 200);

  const handleWalletChange = useDebouncedCallback((evt) => {
    listRecipientWallets({
      // variables: { userId: evt.target.value }
    });
  }, 200);

  const handleRecipientSelect = useCallback((evt, value) => {
    console.log(evt, value);
  }, []);

  const handleWalletSelect = useCallback((evt, value) => {
    console.log(evt, value);
  }, []);

  const handleAmountChange = useCallback((evt, value) => {
    setAmount(evt.target.value)
  }, []);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.toString()}</p>;
  
  return <WalletDetails 
    amount={amount}
    recipient={recipient}
    recipientWalletId={recipientWalletId}
    recipients={recipientQuery.data && recipientQuery.data.users}
    onRecipientChange={handleRecipientChange}
    onRecipientSelect={handleRecipientSelect}
    wallets={recipientWalletQuery.data && recipientWalletQuery.data.wallets}
    onWalletChange={handleWalletChange}
    onWalletSelect={handleWalletSelect}
    onAmountChange={handleAmountChange }
    onChargeMoney={() => chargeWalletMoney({ variables: { 
      amount: parseFloat(amount) 
    }})}
    onTransferMoney={() => transferWalletMoney({ variables: { 
      targetId: recipientWalletId, 
      amount: parseFloat(amount) 
    }})}
    {...data.wallet}/>
}

export default ViewWallet;

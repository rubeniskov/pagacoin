// Core
import React, { useState, useCallback, useEffect } from 'react'
import { useMutation, useLazyQuery } from '@apollo/client';
import { useDebouncedCallback } from 'use-debounce';
// Queries
import { LIST_USERS, LIST_WALLETS } from '../../apollo/queries';
// Mutations
import { TRANSFER_WALLET_MONEY } from '../../apollo/mutations';
// Components
import { FormControl, FormLabel, FormActions } from '../Form';
import Button from '../Button';
import TextField from '../Field/TextField';
import Autocomplete from '../Autocomplete';
import { BannerError } from '../Banner';

export type WalletTransferFormProps = {
  walletId: string,
  defaultAmount: number,
  formatValueRecipient?: (value: any) => string,
  formatValueRecipientWallet?: (value: any) => string
}

const WalletTransferForm: React.FC<WalletTransferFormProps> =  ({
  walletId,
  defaultAmount = 0,
  formatValueRecipient = ({ firstname, lastname }) => `${firstname} ${lastname}`,
  formatValueRecipientWallet = ({ id, balance }) => `#${id.slice(-6)} -> ${balance}€`
}) => {

  const [amount, setAmount] = useState(defaultAmount);
  const [recipient, setRecipient] = useState(''); 
  const [recipientWallet, setRecipientWallet] = useState(''); 
  const [recipientId, setRecipientId] = useState(null);
  const [recipientWalletId, setRecipientWalletId] = useState(null);

  const [searchUsers, recipientQuery] = useLazyQuery(LIST_USERS);
  const [listRecipientWallets, recipientWalletQuery] = useLazyQuery(LIST_WALLETS);

  const [transferWalletMoney, { loading, error }] = useMutation(TRANSFER_WALLET_MONEY, {
    onCompleted: () => {
      if (recipientWalletQuery && recipientWalletQuery.refetch) {
        recipientWalletQuery.refetch().then(() => {
          setRecipientWallet(formatValueRecipientWallet(recipientWalletQuery.data.wallets.find(({ id }) => id === recipientWalletId)));
        });
      }
    }
  });

  const debouncedSearchUsers = useDebouncedCallback((query) => {
    searchUsers({
      variables: { query: query }
    });
  }, 200);

  const debouncedListRecipientWallets = useDebouncedCallback((userId) => {
    listRecipientWallets({
      variables: {
        userId
      }
    });
  }, 200);

  useEffect(() => {
    if (recipientId) {
      debouncedListRecipientWallets(recipientId);
    } else {
      setRecipientWallet('');
      setRecipientWalletId(null);
    }
  }, [recipientId])

  const handleRecipientChange = useCallback((evt) => {
    debouncedSearchUsers(evt.target.value);
    setRecipient(evt.target.value);
    setRecipientWallet('');
    setRecipientWalletId(null);
  }, []);

  const handleAmountChange = useCallback((evt) => {
    setAmount(evt.target.value);
  }, []);

  const handleRecipientSelect = useCallback((evt, value) => { 
    setRecipient(formatValueRecipient(value))
    setRecipientId(value.id);
    setRecipientWallet('');
    setRecipientWalletId(null);
  }, []);

  const handleRecipientWalletSelect = useCallback((evt, value) => { 
    setRecipientWallet(formatValueRecipientWallet(value));
    setRecipientWalletId(value.id);
  }, []);

  const handleTransferMoneyClick = useCallback(() => {
    transferWalletMoney({
      variables: { 
        walletId, 
        targetId: recipientWalletId,
        amount: parseFloat(amount) 
      }
    });
  }, [walletId, recipientWalletId, amount]);

  return (
    <>  
      <BannerError error={error} />
      <FormControl>
        <FormLabel htmlFor="recipient">Recipient</FormLabel>
        <Autocomplete 
          id="recipient" 
          name="recipient" 
          type="text" 
          fit 
          value={recipient}
          disabled={loading}
          onChange={handleRecipientChange}
          suggestions={recipientQuery.data && recipientQuery.data.users}
          formatValue={formatValueRecipient}
          onSelect={handleRecipientSelect}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="wallet">Wallet</FormLabel>
        <Autocomplete 
          id="wallet" 
          name="wallet" 
          type="text" 
          disabled={loading||!recipientId}
          fit 
          value={recipientWallet}
          suggestions={recipientWalletQuery.data && recipientWalletQuery.data.wallets}
          formatValue={formatValueRecipientWallet}
          onSelect={handleRecipientWalletSelect}
          />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="amount">Amount</FormLabel>
        <TextField 
          id="amount" 
          name="amount" 
          type="number" 
          value={amount} 
          onChange={handleAmountChange}
          disabled={loading}
          fit 
          step=".01"/>
      </FormControl>
      <FormActions>
        <Button disabled={amount <= 0 || loading || !recipientId || !recipientWalletId} onClick={handleTransferMoneyClick} fit>Continue payment</Button>
      </FormActions>
    </>
  )
}

export default WalletTransferForm


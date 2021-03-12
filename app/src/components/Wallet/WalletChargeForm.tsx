// Core
import React, { useState, useCallback } from 'react'
import { useMutation } from '@apollo/client';
// Mutations
import { CHARGE_WALLET_MONEY } from '../../apollo/mutations';
// Components
import { FormControl, FormLabel, FormActions } from '../Form';
import Button from '../Button';
import TextField from '../Field/TextField';
import { BannerError, BannerLoading } from '../Banner';

export type WalletChargeFormProps = {
  walletId: string,
  defaultAmount: number
}

const WalletChargeForm: React.FC<WalletChargeFormProps> =  ({
  walletId,
  defaultAmount = 0
}) => {

  const [amount, setAmount] = useState(defaultAmount);

  const [chargeWalletMoney, { loading, error }] = useMutation(CHARGE_WALLET_MONEY);

  const handleAmountChange = useCallback((evt) => {
    setAmount(evt.target.value);
  }, []);

  const handleChargeMoneyClick = useCallback(() => {
    chargeWalletMoney({
      variables: { walletId, amount: parseFloat(amount) }
    });

  }, [walletId, amount]);

  return (
    <>  
      <BannerError error={error} />
      <FormControl>
        <FormLabel htmlFor="amount">Amount</FormLabel>
        <TextField 
          id="amount" 
          name="amount" 
          type="number" 
          value={amount} 
          onChange={handleAmountChange}
          fit 
          step=".01"/>
      </FormControl>
      <FormActions>
        <Button disabled={amount <= 0 || loading} onClick={handleChargeMoneyClick} fit>Continue payment</Button>
      </FormActions>
    </>
  )
}

export default WalletChargeForm


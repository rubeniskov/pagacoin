// Core
import React from 'react';
import styled from 'styled-components';
// Components
import { Tab, TabItem } from '../Tab';
import { FormControl, FormLabel, FormActions } from '../Form';
import Autocomplete from '../Autocomplete';
import TextField from '../Field/TextField';
import Button from '../Button';

const WalletPaymentContainer = styled.div`
  label {
    display: block;
  }
  input {
    
  }
`

const WalletPayment: React.FC<any> = ({
  amount,
  recipient,
  recipientWalletId,
  onChargeMoney,
  onTransferMoney,
  onRecipientChange,
  onRecipientSelect,
  onWalletChange,
  onWalletSelect,
  onAmountChange,
  recipients = [],
  wallets = [],
}) => {
  return (
    <WalletPaymentContainer>
      <Tab>
        <TabItem title="Send">
          <FormControl>
            <FormLabel htmlFor="recipient">Recipient</FormLabel>
            <Autocomplete 
              id="recipient" 
              name="recipient" 
              type="text" 
              fit 
              formatSuggestion={({ firstname, lastname }) => `${firstname} ${lastname}`}
              onChange={onRecipientChange}
              onSelect={onRecipientSelect}
              suggestions={recipients}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="wallet">Wallet</FormLabel>
            <Autocomplete 
              id="wallet" 
              name="wallet" 
              type="text" 
              value={recipientWalletId}
              fit 
              formatSuggestion={({ id, balance }) => `#${id.slice(-6)} -> ${balance}€`}
              onChange={onWalletChange}
              onSelect={onWalletSelect}
              suggestions={wallets}
              />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="amount">Amount</FormLabel>
            <TextField 
              id="amount" 
              name="amount" 
              type="number" 
              value={amount} 
              onChange={onAmountChange}
              fit 
              step=".01"/>
          </FormControl>
          <FormActions>
            <Button disabled={amount <= 0} onClick={onTransferMoney} fit>Continue payment</Button>
          </FormActions>
        </TabItem>
        <TabItem title="Charge">
          <FormControl>
            <FormLabel htmlFor="amount">Amount</FormLabel>
            <TextField 
              id="amount" 
              name="amount" 
              type="number" 
              value={amount} 
              onChange={onAmountChange}
              fit 
              step=".01"/>
          </FormControl>
          <FormActions>
            <Button disabled={amount <= 0} onClick={onChargeMoney} fit>Continue payment</Button>
          </FormActions>
        </TabItem>
      </Tab>
    </WalletPaymentContainer>
  )
}

export default WalletPayment;

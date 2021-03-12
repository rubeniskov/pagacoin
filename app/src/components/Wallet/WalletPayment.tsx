// Core
import React from 'react';
import styled from 'styled-components';
// Components
import { Tab, TabItem } from '../Tab';
import { FormControl, FormLabel, FormActions } from '../Form';
import Autocomplete from '../Autocomplete';
import TextField from '../Field/TextField';
import Button from '../Button';
import WalletChargeForm from './WalletChargeForm';
import WalletTransferForm from './WalletTransferForm';

const WalletPaymentContainer = styled.div`
  label {
    display: block;
  }
  input {
    
  }
`

const WalletPayment: React.FC<any> = ({
  walletId,
}) => {
  return (
    <WalletPaymentContainer>
      <Tab>
        <TabItem title="Send">
          <WalletTransferForm walletId={walletId}/>
        </TabItem>
        <TabItem title="Charge">
          <WalletChargeForm walletId={walletId}/>
        </TabItem>
      </Tab>
    </WalletPaymentContainer>
  )
}

export default WalletPayment;

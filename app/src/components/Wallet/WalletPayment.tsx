// Core
import React from 'react';
import styled from 'styled-components';
// Components
import { Tab, TabItem } from '../Tab';
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
  defaultAmount = 100,
}) => {
  return (
    <WalletPaymentContainer>
      <Tab>
        <TabItem title="Send">
          <WalletTransferForm walletId={walletId} defaultAmount={defaultAmount}/>
        </TabItem>
        <TabItem title="Charge">
          <WalletChargeForm walletId={walletId} defaultAmount={defaultAmount}/>
        </TabItem>
      </Tab>
    </WalletPaymentContainer>
  )
}

export default WalletPayment;

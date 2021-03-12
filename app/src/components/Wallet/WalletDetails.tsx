import React from 'react';
import CreditCard from '../CreditCard/CreditCardSvg';
import WalletPayment from './WalletPayment';

const WalletDetails = (props) => {
  return (
    <div> 
      <CreditCard style={{ width: '100%'}} {...props}/>
      <WalletPayment {...props}/>
    </div>
  );
}


export default WalletDetails;

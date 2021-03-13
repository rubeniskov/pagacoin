import React, { forwardRef } from 'react';
import CreditCard from '../CreditCard/CreditCardSvg';
import WalletPayment from './WalletPayment';

const WalletDetails = forwardRef(({style, ...restProps}, ref) => {
  return (
    <div ref={ref} style={style}> 
      <CreditCard style={{ width: '100%'}} {...restProps}/>
      <WalletPayment {...restProps}/>
    </div>
  );
})


export default WalletDetails;

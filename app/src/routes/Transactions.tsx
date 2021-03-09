import React from 'react';
import { useQuery, gql } from '@apollo/client';

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

import WalletDetails from '../components/Wallet/WalletDetails';
import TransactionRow from '../components/Transaction/TransactionRow';
import { connected } from 'process';

const data = [{
  id: "123451",
  type: '',
  target: 'anonym',
  date: 'Oct 30, 12:46 PM',
  status: 'Pending',
  receipt: '38492024.pdf',
  amount: '+ $20000'
}, {
  id: "123452",
  type: '',
  target: 'anonym',
  date: 'Oct 30, 12:46 PM',
  status: 'Pending',
  receipt: '38492024.pdf',
  amount: '+ $20000'
}, {
  id: "123453",
  type: '',
  target: 'anonym',
  date: 'Oct 30, 12:46 PM',
  status: 'Pending',
  receipt: '38492024.pdf',
  amount: '+ $20000'
}, {
  id: "123454",
  type: '',
  target: 'anonym',
  date: 'Oct 30, 12:46 PM',
  status: 'Pending',
  receipt: '38492024.pdf',
  amount: '+ $20000'
}];

const TransactionsRoute = () => {

  const { loading, error, data: dataFetch } = useQuery(EXCHANGE_RATES);

  console.log('dataFetch', dataFetch);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      Transactions
      <p>October 30, 2020</p>
      {data.map((row) => <TransactionRow key={row.id} {...row}/>)}
      <WalletDetails />
    </div>
  )
}

export default TransactionsRoute;

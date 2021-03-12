import React from 'react';
import { useQuery, gql } from '@apollo/client';

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    transactions {
      id,
      amount,
      status
    }
  }
`;

import TransactionRow from '../components/Transaction/TransactionRow';

const TransactionsView = () => {

  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.toString()}</p>;
  
  return (
    <div>
      <h1>Transactions</h1>
      <small>Check the lates transaction between all wallets</small>
      <p>October 30, 2020</p>
      {data.transactions.map((row) => <TransactionRow key={row.id} {...row}/>)}
    </div>
  )
}

export default TransactionsView;

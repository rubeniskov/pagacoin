import React from 'react';
import { useQuery, gql } from '@apollo/client';
import DataTable from '../DataTable';

const LIST_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id,
      source,
      target,
      amount,
      status,
      cdate,
    }
  }
`;

const TransactionTable = () => {
  const { loading, error, data } = useQuery(LIST_TRANSACTIONS);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.toString()}</p>;

  return <DataTable data={data.transactions} headers={['id', 'source', 'target', 'amount', 'status', 'cdate']} />
}

export default TransactionTable;

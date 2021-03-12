// Core
import React from 'react';
import moment from 'moment';
// Components
import DataTable from '../DataTable';

export const columns = [
  {
    name: 'Id',
    selector: 'id',
  },
  {
    name: 'Balance',
    selector: 'balance',
  },
  {
    name: 'Creation date',
    selector: 'cdate',
    formatValue: (v) => moment(Number(v)).format('DD/MM/YY h:m:s')
  },
];

const WalletTable: React.FC<any> = ({
  columns: columnDefs = columns,
  ...restProps
}) => {
  return <DataTable columns={columnDefs} {...restProps}/>
}

export default WalletTable;

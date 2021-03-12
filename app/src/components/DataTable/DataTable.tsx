import React, { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { DataTableProps } from './types';
import DataTableRow from './DataTableRow';

const Table = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  font-size: 12px;
  tr {
    border-bottom: 1px solid #f2f2f2;
  }

  th {
    font-family: Roboto-Bold;
    font-size: 14px;
    color: #333;
    line-height: 1.4;
    text-transform: uppercase;

    padding-top: 0.8rem;
    padding-bottom: 0.8rem;

    /* width: 225px; */
    padding-left: 1rem;
  }

  td {
    color: #999;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;

    /* width: 225px; */
    padding-left: 1rem;
  }

  
  &.selectable tbody {
    tr {
      cursor: pointer;
      user-select: none;
    }
    tr.selected td {
      background-color: ${({ theme }) => theme.color.primary.default};
      color: white;
    }
  }
`

const DataTable: React.FC<DataTableProps> = ({ 
  data = [], 
  columns = [], 
  key = columns[0].selector,
  onRowClick,
  selectedRow,
}) => {
  
  const handleRowClick = useCallback((evt) => {
    if (typeof onRowClick !== 'function') return;
    let target = evt.target;
    while (target && target.tagName !== 'TR') { 
      target = target.parentElement;
    }
    if (target && target.id) {
      onRowClick(evt, data.find((values) => target.id === values[key]));
    }
  }, [onRowClick, key]);
  
  const tableHeads = useMemo(() => columns.map(({ name }) => (<th key={name}>{name}</th>)), [columns]);

  const tableRows = useMemo(() => data.map((row, idx) => (<DataTableRow
    id={row[key]}
    key={row[key]}
    columns={columns}
    data={columns.map(({ selector }) => row[selector])}
    className={clsx({ 'selected': row[key] === selectedRow })}
  />)), [data, columns, selectedRow]);

  return (
    <Table className='selectable'>
      <thead>
        <tr>
          {tableHeads}
        </tr>
      </thead>
      <tbody onClick={handleRowClick}>
        {tableRows}
      </tbody>
    </Table>
  )
}

export default DataTable;

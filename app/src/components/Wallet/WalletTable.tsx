import React, { useCallback, useState, useMemo } from 'react';
import clsx from 'clsx';
import styled, { createGlobalStyle } from 'styled-components';

export type UserTableProps = {
  compact?: boolean,
}

const data = [
  [1, 'Bobby', 123],
  [2, 'Vanessa', 203],
  [3, 'Agustin', 24],
]


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const DataTable = styled.table`
  table-layout: fixed;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  tr {
    border-bottom: 1px solid #f2f2f2;
  }
  th {
    font-family: Roboto-Bold;
    font-size: 14px;
    color: #333;
    line-height: 1.4;
    text-transform: uppercase;

    padding-top: 21px;
    padding-bottom: 21px;

    /* width: 225px; */
    padding-left: 55px;
  }
  td {
    color: #999;
    padding-top: 21px;
    padding-bottom: 21px;

    padding-left: 55px;
  }

  
  &.selectable tbody {
    tr {
      cursor: pointer;
      user-select: none;
    }
    tr.selected td {
      background-color: #efefef;
    }
  }
`

// transform: translate(0px, 10%) scale(0.9);
// opacity: 0.1;

const UserTableRow: React.FC<any> = ({ data, ...restProps }) => {
  const tableColumns = useMemo(() => data.map((value) => <td key={`${data[0]}-${value}`}>{value}</td>), [data]);

  return (<tr key={data[0]} id={data[0]} {...restProps}>{tableColumns}</tr>)
}

const UserTable: React.FC<UserTableProps> = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = useCallback((e) => {
    let target = e.target;
    while (target && target.tagName !== 'TR') { 
      target = target.parentElement;
    }
    if (target && target.id) {
      setSelectedRow(target.id);
    }
  }, []);
  
  const tableRows = useMemo(() => data.map((row) => (<UserTableRow 
    data={row} 
    className={clsx({ 'selected': row[0]+'' === selectedRow })}
  />)), [data, selectedRow]);

  return (
    <>
    <GlobalStyle />
    <DataTable className='selectable'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody onClick={handleRowClick}>
        {tableRows}
      </tbody>
    </DataTable>
    </>
  )
}

export default UserTable;

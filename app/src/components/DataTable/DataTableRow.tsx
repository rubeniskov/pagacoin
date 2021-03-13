import React, { useMemo } from 'react';
import { DataTableRowProps } from './types';

const DataTableRow: React.FC<DataTableRowProps> = ({ id, data, columns, ...restProps }, idx) => {
  const tableColumns = useMemo(() => data.map((value, idx) => {
    const { formatValue = (v) => v} = columns[idx];
    return (<td key={`${id}-${value}-${idx}`}>{formatValue(value)}</td>)
  }), [data]);

  return (<tr key={data[0]} id={id} {...restProps}>{tableColumns}</tr>)
}

export default DataTableRow;

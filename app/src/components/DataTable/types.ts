import { MouseEvent } from 'react';

export type DataTabeColumnDefinition = {
  name: string,
  selector: string,
  formatValue?: (v: any) => any
}

export type DataTableRowProps = {
  id: string,
  data: Array<any>,
  columns: Array<DataTabeColumnDefinition>
}

export type DataTableProps = {
  key?: string,
  selectedRow: string,
  onRowClick: (evt: MouseEvent, selected: any) => void,
  data: Array<Record<string, any>>,
  columns: Array<DataTabeColumnDefinition>
}

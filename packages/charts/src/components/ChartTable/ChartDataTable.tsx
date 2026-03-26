import * as React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from 'react-magma-dom';

export interface ChartDataTableColumn {
  /** Header text for this column */
  header: string;
  /** Key to read from each row object */
  key: string;
}

export interface ChartDataTableProps {
  /** Column definitions (header + key). Defaults to Group / Value if omitted. */
  columns?: ChartDataTableColumn[];
  /** Array of data objects. Each object should have keys matching the column `key` values. */
  dataSet: Array<Record<string, React.ReactNode>>;
  /**
   * If true, the table uses inverse (dark) styling.
   * @default false
   */
  isInverse?: boolean;
}

function deriveColumns(
  dataSet: Array<Record<string, React.ReactNode>>
): ChartDataTableColumn[] {
  if (!dataSet.length) return [];
  return Object.keys(dataSet[0]).map(key => ({
    header: key.charAt(0).toUpperCase() + key.slice(1),
    key,
  }));
}

export function ChartDataTable({
  columns,
  dataSet,
  isInverse,
}: ChartDataTableProps) {
  const resolvedColumns = columns || deriveColumns(dataSet);
  return (
    <Table isInverse={isInverse}>
      <TableHead>
        <TableRow>
          {resolvedColumns.map(col => (
            <TableHeaderCell key={col.key}>{col.header}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {dataSet.map((row, index) => (
          <TableRow key={index}>
            {resolvedColumns.map(col => (
              <TableCell key={col.key}>{row[col.key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

import * as React from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableProps,
} from '../Table';

/**
 * @children required
 */
export interface DatagridProps extends TableProps {
  columns: string[];
  rows: string[][];
}

export const Datagrid = React.forwardRef<HTMLTableElement, DatagridProps>(
  (props, ref) => {
    const { columns, rows, ...other } = props;

    return (
      <Table {...other} ref={ref}>
        <TableHead>
          <TableRow>
            {columns.map((col, i) => (
              <TableHeaderCell key={`headercell${i}`}>{col}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={`row${i}`}>
              {row.map((cell, j) => (
                <TableCell key={`cell${i}_${j}`}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
);

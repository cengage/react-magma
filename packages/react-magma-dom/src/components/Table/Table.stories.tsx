import React from 'react';
import { Card } from '../Card';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TablePagination,
} from './';
import { magma } from '../../theme/magma';

export default {
  component: Table,
  title: 'Table',
};

const rows = [
  [
    '1 Lorem ipsum dolor sit amet consectetur',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '2 Lorem ipsum dolor sit amet',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '3 Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '4 Lorem ipsum dolor sit amet consectetur',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '5 Lorem ipsum dolor sit amet',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '6 Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '7  Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '8 Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '9 Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '10 Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '11 Lorem ipsum dolor sit amet consectetur',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '12 Lorem ipsum dolor sit amet',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '13 Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '14 Lorem ipsum dolor sit amet',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
];

const rowsPerPage = 10;
const rowsToShow = rows.slice(0, rowsPerPage);

export const Default = () => {
  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Column</TableHeaderCell>
            <TableHeaderCell>Column</TableHeaderCell>
            <TableHeaderCell>Column</TableHeaderCell>
            <TableHeaderCell>Column</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsToShow.map((row, i) => (
            <TableRow key={`row${i}`}>
              {row.map((cell, j) => (
                <TableCell key={`cell${i}_${j}`}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination count={rows.length} rowsPerPage={rowsPerPage} />
    </Card>
  );
};

export const Inverse = () => {
  return (
    <Card background={magma.colors.neutral} isInverse>
      <Table isInverse>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Column</TableHeaderCell>
            <TableHeaderCell>Column</TableHeaderCell>
            <TableHeaderCell>Column</TableHeaderCell>
            <TableHeaderCell>Column</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsToShow.map((row, i) => (
            <TableRow key={`row${i}`}>
              {row.map((cell, j) => (
                <TableCell key={`cell${i}_${j}`}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        count={rows.length}
        isInverse
        rowsPerPage={rowsPerPage}
      />
    </Card>
  );
};

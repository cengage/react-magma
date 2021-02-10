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
  [
    '15 Lorem ipsum dolor sit amet',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '16 Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '17 Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '18 Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '19 Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '20 Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '21 Lorem ipsum dolor sit amet consectetur',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '22 Lorem ipsum dolor sit amet',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    '23 Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
];

export const Default = () => {
  const [pageIndex, setPageIndex] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);

  function handleRowsPerPageChange(numberOfPages) {
    setRowsPerPage(numberOfPages);
    setPageIndex(0);
  }

  function handlePageChange(page) {
    setPageIndex(page);
  }

  const rowsToShow = rows.slice(
    pageIndex * rowsPerPage,
    pageIndex * rowsPerPage + rowsPerPage
  );

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
      <TablePagination
        count={rows.length}
        onChangeRowsPerPage={handleRowsPerPageChange}
        onChangePage={handlePageChange}
        page={pageIndex}
        rowsPerPage={rowsPerPage}
      />
    </Card>
  );
};

export const Inverse = () => {
  const page = 0;
  const rowsPerPage = 10;
  const rowsToShow = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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

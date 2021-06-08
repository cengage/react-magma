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
  TableProps,
  TableDensity,
  TableRowColor,
} from './';
import { magma } from '../../theme/magma';
import { Story, Meta } from '@storybook/react/types-6-0';

const rows = [
  [
    'Lorem ipsum dolor sit amet consectetur',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    'Lorem ipsum dolor sit amet',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
  [
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum',
  ],
];

const Template: Story<TableProps> = args => (
  <Card>
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Column</TableHeaderCell>
          <TableHeaderCell>Column</TableHeaderCell>
          <TableHeaderCell>Column</TableHeaderCell>
          <TableHeaderCell>Column</TableHeaderCell>
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
  </Card>
);

export default {
  title: 'Table',
  component: Table,
  argTypes: {
    density: {
      control: {
        type: 'select',
        options: TableDensity,
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  hasHoverStyles: false,
  hasVerticalBorders: false,
  hasZebraStripes: false,
};

const rowsLong = [
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

export const ControlledPagination = () => {
  const [pageIndex, setPageIndex] = React.useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);

  function handleRowsPerPageChange(numberOfRows) {
    setRowsPerPage(numberOfRows);
    setPageIndex(1);
  }

  function handlePageChange(_, page) {
    setPageIndex(page);
  }

  const rowsToShow = rowsLong.slice(
    (pageIndex - 1) * rowsPerPage,
    (pageIndex - 1) * rowsPerPage + rowsPerPage
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
        itemCount={rowsLong.length}
        onRowsPerPageChange={handleRowsPerPageChange}
        onPageChange={handlePageChange}
        page={pageIndex}
        rowsPerPage={rowsPerPage}
      />
    </Card>
  );
};

export const UncontrolledPagination = () => {
  const [pageIndex, setPageIndex] = React.useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);

  function handlePageChange(_, page) {
    setPageIndex(page);
  }

  function handleRowsPerPageChange(newNumberOfRows) {
    setRowsPerPage(newNumberOfRows);
  }

  const rowsToShow = rowsLong.slice(
    (pageIndex - 1) * rowsPerPage,
    (pageIndex - 1) * rowsPerPage + rowsPerPage
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
        itemCount={rowsLong.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Card>
  );
};

export const PaginationInverse = () => {
  const [pageIndex, setPageIndex] = React.useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);

  function handlePageChange(_, page) {
    setPageIndex(page);
  }

  const rowsToShow = rowsLong.slice(
    (pageIndex - 1) * rowsPerPage,
    (pageIndex - 1) * rowsPerPage + rowsPerPage
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
        itemCount={rowsLong.length}
        isInverse
        onPageChange={handlePageChange}
      />
    </Card>
  );
};

export const RowColors = () => {
  return (
    <Card>
      <Table hasHoverStyles hasZebraStripes>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Column</TableHeaderCell>
            <TableHeaderCell>Column</TableHeaderCell>
            <TableHeaderCell>Column</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow color={TableRowColor.success}>
            <TableCell>Lorem ipsum</TableCell>
            <TableCell>dolar sit</TableCell>
            <TableCell>amet</TableCell>
          </TableRow>
          <TableRow color={TableRowColor.danger}>
            <TableCell>Lorem ipsum</TableCell>
            <TableCell>dolar sit</TableCell>
            <TableCell>amet</TableCell>
          </TableRow>
          <TableRow color={TableRowColor.info}>
            <TableCell>Lorem ipsum</TableCell>
            <TableCell>dolar sit</TableCell>
            <TableCell>amet</TableCell>
          </TableRow>
          <TableRow color={TableRowColor.warning}>
            <TableCell>Lorem ipsum</TableCell>
            <TableCell>dolar sit</TableCell>
            <TableCell>amet</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lorem ipsum</TableCell>
            <TableCell>dolar sit</TableCell>
            <TableCell>amet</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lorem ipsum</TableCell>
            <TableCell>dolar sit</TableCell>
            <TableCell>amet</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export const RowColorsInverse = () => {
  return (
    <Card background={magma.colors.neutral} isInverse>
      <Table isInverse>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Column</TableHeaderCell>
            <TableHeaderCell>Column</TableHeaderCell>
            <TableHeaderCell>Column</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow color={TableRowColor.success}>
            <TableCell>Lorem ipsum</TableCell>
            <TableCell>dolar sit</TableCell>
            <TableCell>amet</TableCell>
          </TableRow>
          <TableRow color={TableRowColor.danger}>
            <TableCell>Lorem ipsum</TableCell>
            <TableCell>dolar sit</TableCell>
            <TableCell>amet</TableCell>
          </TableRow>
          <TableRow color={TableRowColor.info}>
            <TableCell>Lorem ipsum</TableCell>
            <TableCell>dolar sit</TableCell>
            <TableCell>amet</TableCell>
          </TableRow>
          <TableRow color={TableRowColor.warning}>
            <TableCell>Lorem ipsum</TableCell>
            <TableCell>dolar sit</TableCell>
            <TableCell>amet</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lorem ipsum</TableCell>
            <TableCell>dolar sit</TableCell>
            <TableCell>amet</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lorem ipsum</TableCell>
            <TableCell>dolar sit</TableCell>
            <TableCell>amet</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lorem ipsum</TableCell>
            <TableCell>dolar sit</TableCell>
            <TableCell>amet</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

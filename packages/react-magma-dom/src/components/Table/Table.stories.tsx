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
  TableSortDirection,
  TableCellAlign,
} from './';
import { magma } from '../../theme/magma';
import { Announce } from '../Announce';
import { VisuallyHidden } from '../VisuallyHidden';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownMenuItem,
} from '../Dropdown';
import { Select } from '../Select';
import { Combobox } from '../Combobox';

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
  <Card isInverse={args.isInverse}>
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
    minWidth: {
      control: {
        type: 'number',
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  hasHoverStyles: false,
  hasSquareCorners: false,
  hasVerticalBorders: false,
  hasZebraStripes: false,
  isInverse: false,
};

export const SquareCorners = args => {
  const pageIndex = 1;
  const rowsPerPage = 10;

  const rowsToShow = rowsLong.slice(
    (pageIndex - 1) * rowsPerPage,
    (pageIndex - 1) * rowsPerPage + rowsPerPage
  );

  return (
    <div style={{ background: magma.colors.primary600, padding: '20px' }}>
      <Table style={{ background: magma.colors.neutral100 }} {...args}>
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
    </div>
  );
};
SquareCorners.args = {
  hasSquareCorners: true,
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

export const ControlledPagination = args => {
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
    <Card isInverse={args.isInverse}>
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
        isInverse={args.isInverse}
        hasSquareCorners={args.hasSquareCorners}
      />
    </Card>
  );
};
ControlledPagination.args = {
  ...Default.args,
};

export const UncontrolledPagination = args => {
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
    <>
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
    </>
  );
};

export const PaginationWithSquareCorners = args => {
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
    <div style={{ background: magma.colors.primary600, padding: '20px' }}>
      <Table style={{ background: magma.colors.neutral100 }} {...args}>
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
        isInverse={args.isInverse}
        hasSquareCorners={args.hasSquareCorners}
      />
    </div>
  );
};
PaginationWithSquareCorners.args = {
  hasSquareCorners: true,
  hasHoverStyles: false,
  hasVerticalBorders: false,
  hasZebraStripes: false,
};

export const PaginationInverse = args => {
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
    <Card isInverse>
      <Table {...args} isInverse>
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
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Card>
  );
};
PaginationInverse.args = {
  ...Default.args,
  isInverse: true,
};

export const RowColors = args => {
  return (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Column</TableHeaderCell>
          <TableHeaderCell>Column</TableHeaderCell>
          <TableHeaderCell>Column</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
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
      </TableBody>
    </Table>
  );
};
RowColors.args = {
  ...Default.args,
  hasHoverStyles: true,
  hasZebraStripe: true,
};

export const RowColorsInverse = args => {
  return (
    <Card isInverse>
      <Table {...args}>
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
RowColorsInverse.args = {
  ...Default.args,
  isInverse: true,
};

export const Sortable = args => {
  const products = [
    { id: 1, name: 'Cheese', price: 5, stock: 20 },
    { id: 2, name: 'Milk', price: 5, stock: 32 },
    { id: 3, name: 'Yogurt', price: 3, stock: 12 },
    { id: 4, name: 'Heavy Cream', price: 10, stock: 9 },
    { id: 5, name: 'Butter', price: 2, stock: 99 },
    { id: 6, name: 'Sour Cream ', price: 5, stock: 86 },
  ];

  const [sortConfig, setSortConfig] = React.useState({
    key: 'name',
    direction: TableSortDirection.ascending,
    message: '',
  });

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...products];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === TableSortDirection.ascending ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === TableSortDirection.ascending ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [products, sortConfig]);

  const requestSort = key => {
    let direction = TableSortDirection.ascending;
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === TableSortDirection.ascending
    ) {
      direction = TableSortDirection.descending;
    }
    const message = `Table is sorted by ${key}, ${direction}`;
    setSortConfig({ key, direction, message });
  };

  return (
    <Card isInverse={args.isInverse}>
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableHeaderCell
              onSort={() => {
                requestSort('name');
              }}
              isSortable
              sortDirection={
                sortConfig.key === 'name'
                  ? sortConfig.direction
                  : TableSortDirection.none
              }
            >
              Name
            </TableHeaderCell>
            <TableHeaderCell
              onSort={() => {
                requestSort('price');
              }}
              isSortable
              align={TableCellAlign.right}
              sortDirection={
                sortConfig.key === 'price'
                  ? sortConfig.direction
                  : TableSortDirection.none
              }
            >
              Price
            </TableHeaderCell>
            <TableHeaderCell
              onSort={() => {
                requestSort('stock');
              }}
              isSortable
              align={TableCellAlign.right}
              sortDirection={
                sortConfig.key === 'stock'
                  ? sortConfig.direction
                  : TableSortDirection.none
              }
            >
              In Stock
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedItems.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell align={TableCellAlign.right}>${item.price}</TableCell>
              <TableCell align={TableCellAlign.right}>{item.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Announce>
        <VisuallyHidden>{sortConfig.message}</VisuallyHidden>
      </Announce>
    </Card>
  );
};

Sortable.args = {
  ...Default.args,
};

export const WithDropdown = args => {
  return (
    <Card isInverse={args.isInverse}>
      <Table maxWidth={500} {...args}>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Column</TableHeaderCell>
            <TableHeaderCell>Column</TableHeaderCell>
            <TableHeaderCell>Column</TableHeaderCell>
            <TableHeaderCell>Column</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Lorem ipsum dolor sit amet consectetur</TableCell>
            <TableCell>Lorem ipsum dolor sit amet consectetur</TableCell>
            <TableCell>Lorem ipsum dolor sit amet consectetur</TableCell>
            <TableCell>
              <Dropdown isInverse={args.isInverse}>
                <DropdownButton>Basic Dropdown</DropdownButton>
                <DropdownContent>
                  <DropdownMenuItem>Menu item 1</DropdownMenuItem>
                  <DropdownMenuItem>Menu item number two</DropdownMenuItem>
                  <DropdownMenuItem>Menu item number two</DropdownMenuItem>
                  <DropdownMenuItem>Menu item number two</DropdownMenuItem>
                  <DropdownMenuItem>Menu item number two</DropdownMenuItem>
                  <DropdownMenuItem>Menu item number two</DropdownMenuItem>
                  <DropdownMenuItem>Menu item number two</DropdownMenuItem>
                </DropdownContent>
              </Dropdown>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lorem ipsum dolor sit amet consectetur</TableCell>
            <TableCell>Lorem ipsum dolor sit amet consectetur</TableCell>
            <TableCell>Lorem ipsum dolor sit amet consectetur</TableCell>
            <TableCell>
              <Select
                labelText="Select Example"
                items={[
                  { label: 'Red', value: 'red' },
                  { label: 'Blue', value: 'blue' },
                  { label: 'Green', value: 'green' },
                  { label: 'Yellow', value: 'yellow' },
                ]}
                isInverse={args.isInverse}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lorem ipsum dolor sit amet consectetur</TableCell>
            <TableCell>Lorem ipsum dolor sit amet consectetur</TableCell>
            <TableCell>Lorem ipsum dolor sit amet consectetur</TableCell>
            <TableCell>
              <Combobox
                isMulti
                labelText="ComboBox Example"
                defaultItems={[
                  { label: 'Pink', value: 'pink' },
                  { label: 'Orange', value: 'orange' },
                  { label: 'Purple', value: 'purple' },
                ]}
                isInverse={args.isInverse}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};
WithDropdown.args = {
  ...Default.args,
};

export const AdjustableRowNumber = args => {
  function getTableRows() {
    const tableRows = [];
    for (let i = 0; i < args.numberRows; i++) {
      tableRows.push(
        <TableRow key={`row${i}`}>
          <TableCell key={`cell${i}-left`}>{i}</TableCell>
          <TableCell key={`cell${i}-middle`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</TableCell>
          <TableCell key={`cell${i}-right`}>Nullam bibendum diam vel felis consequat lacinia.</TableCell>
        </TableRow>
      );
    }
    return tableRows;
  };

  return (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Number</TableHeaderCell>
          <TableHeaderCell>Column</TableHeaderCell>
          <TableHeaderCell>Column</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {getTableRows()}
      </TableBody>
    </Table>
  );
};
AdjustableRowNumber.args = {
  numberRows: 300,
};

export const NoRowsPerPageControl = args => {
  const [pageIndex, setPageIndex] = React.useState<number>(1);
  const rowsPerPage = 5;

  function handlePageChange(_, page) {
    setPageIndex(page);
  }

  const rowsToShow = rowsLong.slice(
    (pageIndex - 1) * rowsPerPage,
    (pageIndex - 1) * rowsPerPage + rowsPerPage
  );

  return (
    <Card isInverse={args.isInverse}>
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
        page={pageIndex}
        rowsPerPage={rowsPerPage}
        isInverse={args.isInverse}
        hasSquareCorners={args.hasSquareCorners}
      />
    </Card>
  );
};
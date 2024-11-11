import React from 'react';
import { Datagrid } from '.';
import { Story, Meta } from '@storybook/react/types-6-0';
import { DatagridProps } from './Datagrid';
import {
  TablePaginationProps,
  TableRowColor,
  TableSortDirection,
  TableDensity,
} from '../Table';
import { usePagination } from '../Pagination/usePagination';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { magma } from '../../theme/magma';
import { Spacer, SpacerAxis } from '../Spacer';
import { Announce } from '../Announce';
import { VisuallyHidden } from '../VisuallyHidden';

const rowsForPagination = [
  {
    id: 1,
    col1: '1 Lorem ipsum dolor sit amet consectetur',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 1',
  },
  {
    id: 2,
    col1: '2 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 2',
  },
  {
    id: 3,
    col1: '3 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 3',
  },
  {
    id: 4,
    col1: '4 Lorem ipsum dolor sit amet consectetur',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 4',
  },
  {
    id: 5,
    col1: '5 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 5',
  },
  {
    id: 6,
    col1: '6 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 6',
  },
  {
    id: 7,
    col1: '7  Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 7',
  },
  {
    id: 8,
    col1: '8 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 8',
  },
  {
    id: 9,
    col1: '9 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 9',
  },
  {
    id: 10,
    col1: '10 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 10',
  },
  {
    id: 11,
    col1: '11 Lorem ipsum dolor sit amet consectetur',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 11',
  },
  {
    id: 12,
    col1: '12 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 12',
  },
  {
    id: 13,
    col1: '13 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 13',
  },
  {
    id: 14,
    col1: '14 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 14',
  },
  {
    id: 15,
    col1: '15 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 15',
  },
  {
    id: 16,
    col1: '16 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 16',
  },
  {
    id: 17,
    col1: '17 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 17',
  },
  {
    id: 18,
    col1: '18 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 18',
  },
  {
    id: 19,
    col1: '19 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 19',
  },
  {
    id: 20,
    col1: '20 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 20',
  },
  {
    id: 21,
    col1: '21 Lorem ipsum dolor sit amet consectetur',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 21',
  },
  {
    id: 22,
    col1: '22 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 22',
  },
  {
    id: 23,
    col1: '23 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 23',
  },
  {
    id: 24,
    col1: '24 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 24',
  },
  {
    id: 25,
    col1: '25 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row 25',
  },
];

const Template: Story<Omit<DatagridProps, 'selectedRows'>> = args => (
  <Datagrid {...args}>Sample Text</Datagrid>
);

const ControlledTemplate: Story<
  Omit<DatagridProps, 'defaultSelectedRows'>
> = args => {
  const [selectedRows, updatedSelectedRows] = React.useState<
    (string | number)[]
  >([1]);

  return (
    <Datagrid
      {...args}
      selectedRows={selectedRows}
      onSelectedRowsChange={updatedSelectedRows}
    >
      Sample Text
    </Datagrid>
  );
};

const ControlledPaginatedTemplate: Story<DatagridProps> = ({
  paginationProps,
  ...args
}) => {
  const [page, updatePage] = React.useState<number>(1);
  const [rowsPerPage, updateRowsPerPage] = React.useState<number>(5);

  function handlePageChange(_: React.SyntheticEvent, newPage: number) {
    window.confirm('Do you really want to update the page?')
      ? updatePage(newPage)
      : alert('Did not update page');
  }

  function handleRowsPerPageChange(newRowsPerPage: number) {
    window.confirm(
      `Do you really want to update the rows per page to ${newRowsPerPage}?`
    )
      ? updateRowsPerPage(newRowsPerPage)
      : alert('Did not update rows per page');
  }

  const passedInPaginationProps = {
    page,
    rowsPerPage,
    rowsPerPageValues: paginationProps.rowsPerPageValues,
    onPageChange: handlePageChange,
    onRowsPerPageChange: handleRowsPerPageChange,
  };

  return <Datagrid {...args} paginationProps={passedInPaginationProps} />;
};

export default {
  component: Datagrid,
  title: 'Datagrid',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    tableTitle: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

const columns = [
  { field: 'col1', header: 'Col 1' },
  { field: 'col2', header: 'Col 2' },
  { field: 'col3', header: 'Col 3' },
  { field: 'col4', header: 'Col 4' },
];

const coloredRows = [
  {
    id: 1,
    color: TableRowColor.danger,
    col1: 'Lorem ipsum dolor sit amet consectetur',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row danger',
  },
  {
    id: 2,
    color: TableRowColor.info,
    col1: 'Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row info',
  },
  {
    id: 3,
    color: TableRowColor.success,
    col1: 'Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
    rowName: 'Row success',
  },
];

const defaultArgs = {
  density: TableDensity.normal,
  columns: columns,
  rows: rowsForPagination,
  hasHoverStyles: false,
  hasSquareCorners: true,
  hasVerticalBorders: false,
  hasZebraStripes: false,
  isSelectable: false,
  isInverse: false,
  isSortableBySelected: false,
  paginationProps: {},
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs, tableTitle: 'Default' };

export const ColoredRows = Template.bind({});
ColoredRows.args = {
  ...defaultArgs,
  rows: coloredRows,
  tableTitle: 'Colored rows',
};

export const Selectable = Template.bind({});
Selectable.args = {
  ...defaultArgs,
  isSelectable: true,
  tableTitle: 'Selectable',
};

export const SelectableAndSortable: Story<DatagridProps> = ({
  paginationProps,
  ...args
}) => {
  const [sortConfig, setSortConfig] = React.useState({
    key: '',
    message: '',
  });
  const [selectedDirection, setSelectedDirection] = React.useState(
    TableSortDirection.none
  );
  const [priceDirection, setPriceDirection] = React.useState(
    TableSortDirection.none
  );
  const [stockDirection, setStockDirection] = React.useState(
    TableSortDirection.none
  );

  const requestSort = (key: string) => {
    let direction = TableSortDirection.ascending;

    if (key === 'name') {
      if (
        sortConfig?.key === key &&
        selectedDirection === TableSortDirection.ascending
      ) {
        direction = TableSortDirection.descending;
      }
      setSelectedDirection(direction);
      setPriceDirection(TableSortDirection.none);
      setStockDirection(TableSortDirection.none);
    } else if (key === 'price') {
      if (
        sortConfig?.key === key &&
        priceDirection === TableSortDirection.ascending
      ) {
        direction = TableSortDirection.descending;
      }
      setPriceDirection(direction);
      setSelectedDirection(TableSortDirection.none);
      setStockDirection(TableSortDirection.none);
    } else if (key === 'stock') {
      if (
        sortConfig?.key === key &&
        stockDirection === TableSortDirection.ascending
      ) {
        direction = TableSortDirection.descending;
      }
      setStockDirection(direction);
      setPriceDirection(TableSortDirection.none);
      setSelectedDirection(TableSortDirection.none);
    }

    const message = `Table is sorted by ${key}, ${direction}`;
    setSortConfig({ key, message });
  };

  const productColumns = [
    { field: 'name', header: 'Name' },
    {
      field: 'price',
      header: 'Price',
      isSortable: true,
      onSort: () => {
        requestSort('price');
      },
      sortDirection: priceDirection,
    },
    {
      field: 'stock',
      header: 'Stock',
      isSortable: true,
      onSort: () => {
        requestSort('stock');
      },
      sortDirection: stockDirection,
    },
  ];
  const products = [
    { id: 1, name: 'Cheese', price: 5, stock: 20, rowName: 'Cheese' },
    { id: 2, name: 'Milk', price: 5, stock: 32, rowName: 'Milk' },
    { id: 3, name: 'Yogurt', price: 3, stock: 12, rowName: 'Yogurt' },
    { id: 4, name: 'Heavy Cream', price: 10, stock: 9, rowName: 'Heavy Cream' },
    { id: 5, name: 'Butter', price: 2, stock: 99, rowName: 'Butter' },
    { id: 6, name: 'Sour Cream', price: 4, stock: 86, rowName: 'Sour Cream' },
  ];

  const [selectedItems, setSelectedItems] = React.useState([]);

  const sortedItems = React.useMemo(() => {
    if (sortConfig.key === 'name') {
      const selectedItemsToSort = products.filter(product =>
        selectedItems.includes(product.id)
      );
      const nonSelectedItems = products.filter(
        product => !selectedItems.includes(product.id)
      );
      let sortOrder = 0;
      if (sortConfig !== null) {
        if (selectedItemsToSort.length < 2) {
          sortOrder =
            selectedDirection === TableSortDirection.ascending ? -1 : 1;
        }
        selectedItemsToSort.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            sortOrder =
              selectedDirection === TableSortDirection.ascending ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            sortOrder =
              selectedDirection === TableSortDirection.ascending ? 1 : -1;
          }
          return sortOrder;
        });
      }
      if (selectedItemsToSort.length === 0) {
        return products;
      } else if (sortOrder === 1) {
        return selectedItemsToSort.concat(nonSelectedItems);
      } else {
        return nonSelectedItems.concat(selectedItemsToSort);
      }
    } else {
      let sortableItems = [...products];
      const direction =
        sortConfig.key === 'price' ? priceDirection : stockDirection;
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return direction === TableSortDirection.ascending ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return direction === TableSortDirection.ascending ? 1 : -1;
        }
        return 0;
      });
      return sortableItems;
    }
  }, [sortConfig]);

  function handleRowSelect(
    id: string | number,
    ev: React.ChangeEvent<HTMLInputElement>
  ) {
    if (ev.target.checked) {
      if (!selectedItems.includes(id)) {
        setSelectedItems([...selectedItems, id]);
      }
    } else if (!ev.target.checked) {
      setSelectedItems(selectedItems.filter(i => i !== id));
    }
  }

  function handleHeaderSelect(ev: React.ChangeEvent<HTMLInputElement>) {
    if (ev.target.checked && selectedItems.length === 0) {
      const checkedIds = [];
      products.filter(prod => checkedIds.push(prod.id));
      setSelectedItems(checkedIds);
    } else {
      setSelectedItems([]);
    }
  }

  return (
    <>
      <Datagrid
        {...args}
        rows={sortedItems}
        columns={productColumns}
        onSortBySelected={() => {
          requestSort('name');
        }}
        onRowSelect={handleRowSelect}
        onHeaderSelect={handleHeaderSelect}
        sortDirection={selectedDirection}
      />
      <Announce>
        <VisuallyHidden>{sortConfig.message}</VisuallyHidden>
      </Announce>
    </>
  );
};

SelectableAndSortable.args = {
  isSelectable: true,
  isSortableBySelected: true,
  tableTitle: 'Selectable and sortable',
};

export const ControlledSelectable = ControlledTemplate.bind({});
ControlledSelectable.args = {
  ...defaultArgs,
  isSelectable: true,
  tableTitle: 'Controlled selectable',
};

export const DisabledSelectableRow = Template.bind({});
DisabledSelectableRow.args = {
  ...defaultArgs,
  isSelectable: true,
  tableTitle: 'Disabled selectable row',
  rows: [
    ...defaultArgs.rows,
    {
      id: 4,
      col1: 'Lorem ipsum dolor',
      isSelectableDisabled: true,
      col2: 'Lorem ipsum dolor',
      col3: 'Lorem ipsum dolor',
      col4: 'Lorem ipsum',
    },
  ],
};

export const PaginationChangedDefaults = Template.bind({});
PaginationChangedDefaults.args = {
  ...defaultArgs,
  tableTitle: 'Pagination changed defaults',
  paginationProps: {
    defaultPage: 2,
    defaultRowsPerPage: 5,
    rowsPerPageValues: [5, 10, 20],
  },
};

export const ControlledPagination = ControlledPaginatedTemplate.bind({});
ControlledPagination.args = {
  ...defaultArgs,
  tableTitle: 'Controlled pagination',
  paginationProps: {
    rowsPerPageValues: [5, 10, 20],
  },
};

export const WithoutPagination = Template.bind({});
WithoutPagination.args = {
  ...defaultArgs,
  tableTitle: 'Without pagination',
  hasPagination: false,
};

const CustomPaginationComponent: React.FunctionComponent<
  TablePaginationProps
> = props => {
  const { itemCount, rowsPerPage, onPageChange } = props;
  const { page, pageButtons } = usePagination({
    count: itemCount / rowsPerPage,
    numberOfAdjacentPages: 0,
    numberOfEdgePages: 0,
    onPageChange,
  });

  const previousButton = pageButtons[0];
  const nextButton = pageButtons[pageButtons.length - 1];

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      You are on page {page}
      <Spacer axis={SpacerAxis.horizontal} size={magma.spaceScale.spacing05} />
      <ButtonGroup>
        <Button
          disabled={previousButton.disabled}
          onClick={previousButton.onClick}
        >
          Previous Page
        </Button>
        <Button disabled={nextButton.disabled} onClick={nextButton.onClick}>
          Next Page
        </Button>
      </ButtonGroup>
    </div>
  );
};

export const PaginationWithCustomComponent = Template.bind({});
PaginationWithCustomComponent.args = {
  ...defaultArgs,
  tableTitle: 'Pagination with custom component',
  components: {
    Pagination: CustomPaginationComponent,
  },
};

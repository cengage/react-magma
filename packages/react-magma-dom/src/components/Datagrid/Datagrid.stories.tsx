import React from 'react';

import { StoryObj, Meta, StoryFn } from '@storybook/react/types-6-0';

import { DatagridProps } from './Datagrid';
import { magma } from '../../theme/magma';
import { Announce } from '../Announce';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Card, CardBody } from '../Card';
import { usePagination } from '../Pagination/usePagination';
import { Spacer, SpacerAxis } from '../Spacer';
import {
  TableDensity,
  TablePaginationProps,
  TableRowColor,
  TableSortDirection,
} from '../Table';
import { VisuallyHidden } from '../VisuallyHidden';

import { Datagrid } from '.';

const rowsForPagination = [
  {
    id: 1,
    col1: '1 Emma Johnson',
    col2: 'Software Engineer',
    col3: 'Engineering',
    col4: 'San Francisco, CA',
    rowName: 'Emma Johnson',
  },
  {
    id: 2,
    col1: '2 Liam Chen',
    col2: 'Product Manager',
    col3: 'Product',
    col4: 'New York, NY',
    rowName: 'Liam Chen',
  },
  {
    id: 3,
    col1: '3 Olivia Martinez',
    col2: 'UX Designer',
    col3: 'Design',
    col4: 'Austin, TX',
    rowName: 'Olivia Martinez',
  },
  {
    id: 4,
    col1: '4 Noah Williams',
    col2: 'Data Analyst',
    col3: 'Analytics',
    col4: 'Seattle, WA',
    rowName: 'Noah Williams',
  },
  {
    id: 5,
    col1: '5 Ava Davis',
    col2: 'Marketing Manager',
    col3: 'Marketing',
    col4: 'Chicago, IL',
    rowName: 'Ava Davis',
  },
  {
    id: 6,
    col1: '6 Ethan Brown',
    col2: 'DevOps Engineer',
    col3: 'Engineering',
    col4: 'Boston, MA',
    rowName: 'Ethan Brown',
  },
  {
    id: 7,
    col1: '7 Sophia Garcia',
    col2: 'Sales Representative',
    col3: 'Sales',
    col4: 'Denver, CO',
    rowName: 'Sophia Garcia',
  },
  {
    id: 8,
    col1: '8 Mason Rodriguez',
    col2: 'HR Specialist',
    col3: 'Human Resources',
    col4: 'Portland, OR',
    rowName: 'Mason Rodriguez',
  },
  {
    id: 9,
    col1: '9 Isabella Wilson',
    col2: 'Frontend Developer',
    col3: 'Engineering',
    col4: 'Los Angeles, CA',
    rowName: 'Isabella Wilson',
  },
  {
    id: 10,
    col1: '10 Lucas Anderson',
    col2: 'Business Analyst',
    col3: 'Operations',
    col4: 'Atlanta, GA',
    rowName: 'Lucas Anderson',
  },
  {
    id: 11,
    col1: '11 Mia Thomas',
    col2: 'Content Strategist',
    col3: 'Marketing',
    col4: 'Miami, FL',
    rowName: 'Mia Thomas',
  },
  {
    id: 12,
    col1: '12 James Taylor',
    col2: 'Backend Developer',
    col3: 'Engineering',
    col4: 'Phoenix, AZ',
    rowName: 'James Taylor',
  },
  {
    id: 13,
    col1: '13 Charlotte Moore',
    col2: 'Quality Assurance',
    col3: 'Engineering',
    col4: 'Dallas, TX',
    rowName: 'Charlotte Moore',
  },
  {
    id: 14,
    col1: '14 Benjamin Jackson',
    col2: 'Account Executive',
    col3: 'Sales',
    col4: 'Philadelphia, PA',
    rowName: 'Benjamin Jackson',
  },
  {
    id: 15,
    col1: '15 Amelia Martin',
    col2: 'UI Designer',
    col3: 'Design',
    col4: 'San Diego, CA',
    rowName: 'Amelia Martin',
  },
  {
    id: 16,
    col1: '16 Elijah Lee',
    col2: 'Systems Administrator',
    col3: 'IT',
    col4: 'Minneapolis, MN',
    rowName: 'Elijah Lee',
  },
  {
    id: 17,
    col1: '17 Harper White',
    col2: 'Customer Success Manager',
    col3: 'Customer Support',
    col4: 'Nashville, TN',
    rowName: 'Harper White',
  },
  {
    id: 18,
    col1: '18 Alexander Harris',
    col2: 'Financial Analyst',
    col3: 'Finance',
    col4: 'Charlotte, NC',
    rowName: 'Alexander Harris',
  },
  {
    id: 19,
    col1: '19 Evelyn Clark',
    col2: 'Scrum Master',
    col3: 'Engineering',
    col4: 'Salt Lake City, UT',
    rowName: 'Evelyn Clark',
  },
  {
    id: 20,
    col1: '20 Michael Lewis',
    col2: 'Technical Writer',
    col3: 'Documentation',
    col4: 'Raleigh, NC',
    rowName: 'Michael Lewis',
  },
  {
    id: 21,
    col1: '21 Abigail Walker',
    col2: 'Brand Manager',
    col3: 'Marketing',
    col4: 'Columbus, OH',
    rowName: 'Abigail Walker',
  },
  {
    id: 22,
    col1: '22 Daniel Hall',
    col2: 'Security Engineer',
    col3: 'Engineering',
    col4: 'Indianapolis, IN',
    rowName: 'Daniel Hall',
  },
  {
    id: 23,
    col1: '23 Emily Allen',
    col2: 'Research Analyst',
    col3: 'Analytics',
    col4: 'San Jose, CA',
    rowName: 'Emily Allen',
  },
  {
    id: 24,
    col1: '24 Matthew Young',
    col2: 'Operations Manager',
    col3: 'Operations',
    col4: 'Detroit, MI',
    rowName: 'Matthew Young',
  },
  {
    id: 25,
    col1: '25 Elizabeth King',
    col2: 'Training Coordinator',
    col3: 'Human Resources',
    col4: 'Milwaukee, WI',
    rowName: 'Elizabeth King',
  },
];

const Template: StoryFn<Omit<DatagridProps, 'selectedRows'>> = args => (
  <Card isInverse={args.isInverse}>
    <CardBody>
      <Datagrid tableTitle="Basic usage table" {...args}>
        Sample Text
      </Datagrid>
    </CardBody>
  </Card>
);

const ControlledTemplate: StoryFn<
  Omit<DatagridProps, 'defaultSelectedRows'>
> = args => {
  const [selectedRows, updatedSelectedRows] = React.useState<
    (string | number)[]
  >([1]);

  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <Datagrid
          {...args}
          selectedRows={selectedRows}
          onSelectedRowsChange={updatedSelectedRows}
        >
          Sample Text
        </Datagrid>
      </CardBody>
    </Card>
  );
};

const ControlledPaginatedTemplate: StoryFn<DatagridProps> = ({
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

  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <Datagrid {...args} paginationProps={passedInPaginationProps} />
      </CardBody>
    </Card>
  );
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
    hasOutsideBorder: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

const columns = [
  { field: 'col1', header: 'Name' },
  { field: 'col2', header: 'Position' },
  { field: 'col3', header: 'Department' },
  { field: 'col4', header: 'Location' },
];

const coloredRows = [
  {
    id: 1,
    color: TableRowColor.danger,
    col1: '1 Emily Allen',
    col2: 'Research Analyst',
    col3: 'Analytics',
    col4: 'San Jose, CA',
    rowName: 'Row danger',
  },
  {
    id: 2,
    color: TableRowColor.info,
    col1: '2 Matthew Young',
    col2: 'Operations Manager',
    col3: 'Operations',
    col4: 'Detroit, MI',
    rowName: 'Row info',
  },
  {
    id: 3,
    color: TableRowColor.success,
    col1: '3 Elizabeth King',
    col2: 'Training Coordinator',
    col3: 'Human Resources',
    col4: 'Milwaukee, WI',
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

export const Default = {
  render: Template,

  args: {
    ...defaultArgs,
    tableTitle: 'Default',
  },
};

export const ColoredRows = {
  render: Template,

  args: {
    ...defaultArgs,
    rows: coloredRows,
    tableTitle: 'Colored rows',
  },
};

export const Selectable = {
  render: Template,

  args: {
    ...defaultArgs,
    isSelectable: true,
    tableTitle: 'Selectable',
  },
};

export const SelectableAndSortable: StoryObj<DatagridProps> = {
  render: ({ paginationProps, ...args }) => {
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

      if (key === 'selected') {
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
      {
        id: 4,
        name: 'Heavy Cream',
        price: 10,
        stock: 9,
        rowName: 'Heavy Cream',
      },
      { id: 5, name: 'Butter', price: 2, stock: 99, rowName: 'Butter' },
      { id: 6, name: 'Sour Cream', price: 4, stock: 86, rowName: 'Sour Cream' },
    ];

    const [selectedItems, setSelectedItems] = React.useState([]);

    const sortedItems = React.useMemo(() => {
      if (sortConfig.key === 'selected') {
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
            if (a.name < b.name) {
              sortOrder =
                selectedDirection === TableSortDirection.ascending ? -1 : 1;
            }
            if (a.name > b.name) {
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
        const sortableItems = [...products];
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
      <Card isInverse={args.isInverse}>
        <CardBody>
          <Datagrid
            {...args}
            rows={sortedItems}
            columns={productColumns}
            onSortBySelected={() => {
              requestSort('selected');
            }}
            onRowSelect={handleRowSelect}
            onHeaderSelect={handleHeaderSelect}
            sortDirection={selectedDirection}
          />
          <Announce>
            <VisuallyHidden>{sortConfig.message}</VisuallyHidden>
          </Announce>
        </CardBody>
      </Card>
    );
  },

  args: {
    isSelectable: true,
    isSortableBySelected: true,
    tableTitle: 'Selectable and sortable',
  },
};

export const ControlledSelectable = {
  render: ControlledTemplate,

  args: {
    ...defaultArgs,
    isSelectable: true,
    tableTitle: 'Controlled selectable',
  },
};

export const DisabledSelectableRow = {
  render: Template,

  args: {
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
  },
};

export const PaginationChangedDefaults = {
  render: Template,

  args: {
    ...defaultArgs,
    tableTitle: 'Pagination changed defaults',
    paginationProps: {
      defaultPage: 2,
      defaultRowsPerPage: 5,
      rowsPerPageValues: [5, 10, 20],
    },
  },
};

export const ControlledPagination = {
  render: ControlledPaginatedTemplate,

  args: {
    ...defaultArgs,
    tableTitle: 'Controlled pagination',
    paginationProps: {
      rowsPerPageValues: [5, 10, 20],
    },
  },
};

export const WithoutPagination = {
  render: Template,

  args: {
    ...defaultArgs,
    hasPagination: false,
    tableTitle: 'Without pagination',
  },
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

export const PaginationWithCustomComponent = {
  render: Template,

  args: {
    ...defaultArgs,
    tableTitle: 'Pagination with custom component',
    components: {
      Pagination: CustomPaginationComponent,
    },
  },
};

export const TitleTable = {
  render: Template,

  args: {
    ...defaultArgs,
    hasOutsideBorder: true,
    hasSquareCorners: false,
    tableTitle: <h1>Title table</h1>,
  },
};

const scrollableColumns = [
  { field: 'product', header: 'Product', style: { minWidth: '120px' } },
  { field: 'category', header: 'Category', style: { minWidth: '120px' } },
  { field: 'price', header: 'Price', style: { minWidth: '100px' } },
  { field: 'quantity', header: 'Quantity', style: { minWidth: '100px' } },
  { field: 'status', header: 'Status', style: { minWidth: '100px' } },
  { field: 'brand', header: 'Brand', style: { minWidth: '180px' } },
  { field: 'warehouse', header: 'Warehouse', style: { minWidth: '180px' } },
];

const scrollableRows = [
  {
    id: 1,
    product: 'Product A',
    category: 'Electronics',
    price: '$1,299.99',
    quantity: '150 units',
    status: 'In Stock',
    brand: 'Premium Quality Brand',
    warehouse: 'New York Warehouse',
    rowName: 'Product A',
  },
  {
    id: 2,
    product: 'Product B',
    category: 'Clothing',
    price: '$89.99',
    quantity: '500 units',
    status: 'In Stock',
    brand: 'Fashion Collection',
    warehouse: 'Los Angeles Warehouse',
    rowName: 'Product B',
  },
  {
    id: 3,
    product: 'Product C',
    category: 'Home & Garden',
    price: '$249.99',
    quantity: '75 units',
    status: 'Low Stock',
    brand: 'Outdoor Living',
    warehouse: 'Chicago Warehouse',
    rowName: 'Product C',
  },
  {
    id: 4,
    product: 'Product D',
    category: 'Sports',
    price: '$449.99',
    quantity: '200 units',
    status: 'In Stock',
    brand: 'Professional Series',
    warehouse: 'Miami Warehouse',
    rowName: 'Product D',
  },
  {
    id: 5,
    product: 'Product E',
    category: 'Books',
    price: '$29.99',
    quantity: '1000 units',
    status: 'In Stock',
    brand: 'Bestseller Edition',
    warehouse: 'Seattle Warehouse',
    rowName: 'Product E',
  },
];

export const ScrollableDatagrid = {
  render: (
    args: React.JSX.IntrinsicAttributes &
      (DatagridProps & React.RefAttributes<HTMLTableElement>)
  ) => {
    return (
      <div style={{ maxWidth: '500px' }}>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
          This datagrid is constrained to 500px width to demonstrate horizontal
          scrolling. When focused, screen reader users can use arrow keys to
          scroll.
        </p>
        <Card>
          <CardBody>
            <Datagrid {...args} />
          </CardBody>
        </Card>
      </div>
    );
  },

  args: {
    columns: scrollableColumns,
    rows: scrollableRows,
    tableTitle: 'Product Inventory',
    hasHoverStyles: true,
    hasOutsideBorder: true,
    hasZebraStripes: true,
    hasPagination: false,
    isSelectable: false,
  },

  parameters: {
    docs: {
      description: {
        story: `When a datagrid has horizontal overflow, it automatically becomes keyboard-focusable with \`tabindex="0"\` and receives \`role="region"\` with an accessible label indicating it is scrollable. This follows the USWDS pattern for accessible scrollable tables. Screen reader users will hear "Product Inventory (scrollable), region" when focusing the datagrid, and can use arrow keys to scroll horizontally.`,
      },
    },
  },
};

import React from "react";
import { Datagrid } from ".";
import { Story, Meta } from "@storybook/react/types-6-0";
import { DatagridProps } from "./Datagrid";
import { TableRowColor } from "../Table";
import {
  usePagination,
  UsePaginationControlled,
  UsePaginationProps,
} from "../Pagination/usePagination";

const rowsForPagination = [
  {
    id: 1,
    col1: "1 Lorem ipsum dolor sit amet consectetur",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 2,
    col1: "2 Lorem ipsum dolor sit amet",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 3,
    col1: "3 Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 4,
    col1: "4 Lorem ipsum dolor sit amet consectetur",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 5,
    col1: "5 Lorem ipsum dolor sit amet",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 6,
    col1: "6 Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 7,
    col1: "7  Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 8,
    col1: "8 Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 9,
    col1: "9 Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 10,
    col1: "10 Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 11,
    col1: "11 Lorem ipsum dolor sit amet consectetur",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 12,
    col1: "12 Lorem ipsum dolor sit amet",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 13,
    col1: "13 Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 14,
    col1: "14 Lorem ipsum dolor sit amet",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 15,
    col1: "15 Lorem ipsum dolor sit amet",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 16,
    col1: "16 Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 17,
    col1: "17 Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 18,
    col1: "18 Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 19,
    col1: "19 Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 20,
    col1: "20 Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 21,
    col1: "21 Lorem ipsum dolor sit amet consectetur",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 22,
    col1: "22 Lorem ipsum dolor sit amet",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 23,
    col1: "23 Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 24,
    col1: "24 Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 25,
    col1: "25 Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
];

const Template: Story<DatagridProps> = (args) => (
  <Datagrid {...args}>Sample Text</Datagrid>
);

const ControlledTemplate: Story<DatagridProps> = (args) => {
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

const PaginatedTemplate: Story<
  DatagridProps & { paginationProps: UsePaginationProps }
> = ({ paginationProps, ...args }) => {
  const pagination = usePagination(rowsForPagination.length, paginationProps);

  return (
    <Datagrid {...args} rows={rowsForPagination} pagination={pagination} />
  );
};

const ControlledPaginatedTemplate: Story<
  DatagridProps & { paginationProps: UsePaginationControlled }
> = ({ paginationProps, ...args }) => {
  const [page, updatePage] = React.useState<number>(0);
  const [rowsPerPage, updateRowsPerPage] = React.useState<number>(5);

  function handleChangePage(_, newPage: number) {
    window.confirm("Do you really want to update the page?")
      ? updatePage(newPage)
      : alert("Did not update page");
  }

  function handleChangeRowsPerPage(newRowsPerPage: number) {
    window.confirm(
      `Do you really want to update the rows per page to ${newRowsPerPage}?`
    )
      ? updateRowsPerPage(newRowsPerPage)
      : alert("Did not update rows per page");
  }

  const pagination = usePagination(rowsForPagination.length, {
    ...paginationProps,
    page,
    rowsPerPage,
    onChangePage: handleChangePage,
    onChangeRowsPerPage: handleChangeRowsPerPage,
  });

  return (
    <Datagrid
      {...args}
      rows={rowsForPagination}
      pagination={{ ...pagination, page, rowsPerPage }}
    />
  );
};

export default {
  component: Datagrid,
  title: "Datagrid",
  argTypes: {
    isInverse: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta;

const columns = [
  { field: "col1", header: "Col 1" },
  { field: "col2", header: "Col 2" },
  { field: "col3", header: "Col 3" },
  { field: "col4", header: "Col 4" },
];

const rows = [
  {
    id: 1,
    col1: "Lorem ipsum dolor sit amet consectetur",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 2,
    col1: "Lorem ipsum dolor sit amet",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 3,
    col1: "Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
];

const coloredRows = [
  {
    id: 1,
    color: TableRowColor.danger,
    col1: "Lorem ipsum dolor sit amet consectetur",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 2,
    color: TableRowColor.info,
    col1: "Lorem ipsum dolor sit amet",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 3,
    color: TableRowColor.success,
    col1: "Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
];

const defaultArgs = {
  columns: columns,
  rows: rows,
  hasHoverStyles: false,
  hasVerticalBorders: false,
  hasZebraStripes: false,
  isSelectable: false,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const ColoredRows = Template.bind({});
ColoredRows.args = {
  ...defaultArgs,
  rows: coloredRows,
};

export const Selectable = Template.bind({});
Selectable.args = { ...defaultArgs, isSelectable: true };

export const ControlledSelectable = ControlledTemplate.bind({});
ControlledSelectable.args = {
  ...defaultArgs,
  isSelectable: true,
};

export const DisabledSelectableRow = Template.bind({});
DisabledSelectableRow.args = {
  ...defaultArgs,
  isSelectable: true,
  rows: [
    ...defaultArgs.rows,
    {
      id: 4,
      col1: "Lorem ipsum dolor",
      isSelectableDisabled: true,
      col2: "Lorem ipsum dolor",
      col3: "Lorem ipsum dolor",
      col4: "Lorem ipsum",
    },
  ],
};

export const Pagination = PaginatedTemplate.bind({});
Pagination.args = { ...defaultArgs, rows: rowsForPagination };

export const PaginationChangedDefaults = PaginatedTemplate.bind({});
PaginationChangedDefaults.args = {
  ...defaultArgs,
  rows: rowsForPagination,
  paginationProps: {
    defaultPage: 2,
    defaultRowsPerPage: 5,
    rowsPerPageValues: [5, 10, 20],
  },
};

export const ControlledPagination = ControlledPaginatedTemplate.bind({});
ControlledPagination.args = {
  ...defaultArgs,
  rows: rowsForPagination,
  paginationProps: {
    rowsPerPageValues: [5, 10, 20],
  },
};

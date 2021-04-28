import React from "react";
import { Datagrid } from ".";
import { Story, Meta } from "@storybook/react/types-6-0";
import { DatagridProps } from "./Datagrid";
import { TableRowColor } from "../Table";

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

import React from 'react';
import { Datagrid } from '.';

export default {
  component: Datagrid,
  title: 'Datagrid',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
  },
};

const columns = ['Col 1', 'Col 2', 'Col 3', 'Col 4'];

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

export const Default = args => {
  return <Datagrid {...args}>Sample text</Datagrid>;
};

Default.args = {
  columns: columns,
  rows: rows,
  hasHoverStyles: false,
  hasVerticalBorders: false,
  hasZebraStripes: false,
  isSelectable: false,
};

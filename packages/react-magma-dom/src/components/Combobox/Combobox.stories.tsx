import React from 'react';
import { Combobox } from '.';
import { LabelPosition } from '../Label';

export default {
  component: Combobox,
  title: 'Combobox',
};

export const Default = () => {
  return (
    <Combobox
      defaultItems={[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
      ]}
      labelText="Example"
    />
  );
};

export const LeftAlignedLabel = () => {
  return (
    <Combobox
      defaultItems={[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
      ]}
      labelText="Example Left Label"
      labelPosition={LabelPosition.left}
    />
  );
};

export const Multi = () => {
  return (
    <Combobox
      isMulti
      defaultItems={[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
      ]}
      labelText="Multi"
    />
  );
};

export const MultiLeftAlignedLabel = () => {
  return (
    <Combobox
      isMulti
      defaultItems={[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
      ]}
      labelPosition={LabelPosition.left}
      labelText="Multi Left Label"
    />
  );
};

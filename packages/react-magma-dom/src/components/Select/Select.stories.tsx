import React from 'react';
import { Select } from './';
import { LabelPosition } from '../Label';

export default {
  component: Select,
  title: 'Select',
};

export const Default = () => {
  return (
    <Select
      items={[
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '60px',
      }}
    >
      <Select
        items={[
          { label: 'Red', value: 'red' },
          { label: 'Blue', value: 'blue' },
          { label: 'Green', value: 'green' },
        ]}
        labelText="Example Left Label"
        labelPosition={LabelPosition.left}
      />
    </div>
  );
};

export const Multi = () => {
  return (
    <Select
      isMulti
      items={[
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '60px',
      }}
    >
      <Select
        isMulti
        items={[
          { label: 'Red', value: 'red' },
          { label: 'Blue', value: 'blue' },
          { label: 'Green', value: 'green' },
        ]}
        labelPosition={LabelPosition.left}
        labelText="Multi Left Label"
      />
    </div>
  );
};

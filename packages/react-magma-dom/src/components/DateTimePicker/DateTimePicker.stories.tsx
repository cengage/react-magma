import React from 'react';

import { Meta } from '@storybook/react';

import { Button, magma } from '../..';
import { LabelPosition } from '../Label';

import { DateTimePicker } from '.';

const today: Date = new Date();

export default {
  component: DateTimePicker,
  title: 'DateTimePicker',
  argTypes: {
    minDate: {
      control: {
        type: 'date',
      },
    },
    isClearable: {
      control: {
        type: 'boolean',
      },
    },
    labelPosition: {
      control: {
        type: 'select',
        options: LabelPosition,
      },
    },
    labelWidth: {
      control: {
        type: 'number',
      },
    },
    defaultDate: {
      control: {
        type: 'date',
      },
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Default = args => {
  return <DateTimePicker {...args} />;
};

Default.args = {
  labelText: 'Date',
  minDate: today,
  errorMessage: '',
  helperMessage: '',
};

export const Inverse = args => {
  return (
    <div style={{ background: magma.colors.primary600, padding: '0 12px' }}>
      <br />
      <DateTimePicker {...args} />
      <br />
    </div>
  );
};

Inverse.args = {
  ...Default.args,
  isInverse: true,
};

export const ClearingTheDateAndTime = args => {
  const [chosenDate, setChosenDate] = React.useState<Date | null>(null);

  function handleDateChange(newChosenDate: Date | null) {
    setChosenDate(newChosenDate);
  }

  return (
    <div>
      <p>
        <strong>Chosen Date: </strong>
        {chosenDate && (
          <span>
            {`${
              chosenDate.getMonth() + 1
            }/${chosenDate.getDate()}/${chosenDate.getFullYear()}`}
          </span>
        )}
      </p>
      <DateTimePicker
        {...args}
        onDateChange={handleDateChange}
        onChange={() => {}}
        value={chosenDate}
        isClearable
      />
      <br />
      <Button onClick={() => handleDateChange(null)}>Clear Date</Button>
    </div>
  );
};

export function Example() {
  return (
    <DateTimePicker
      defaultDate={new Date(2025, 1, 0, 8, 20)}
      labelText="Selected Date"
      value={new Date(2000, 1, 0, 10, 30)}
    />
  );
}

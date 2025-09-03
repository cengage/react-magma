import React from 'react';

import { Meta } from '@storybook/react';
import { es } from 'date-fns/locale';

import { Button, defaultI18n, I18nContext, magma } from '../..';
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
    defaultValue: {
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
  const [chosenTime, setChosenTime] = React.useState<string | null>(null);

  function handleDateChange(newChosenDate: Date | null) {
    let newDate = newChosenDate;

    if (chosenTime && newChosenDate) {
      const [timePart, ampm] = chosenTime.split(' ');
      let [hours, minutes] = timePart.split(':').map(Number);

      if (ampm) {
        if (ampm.toLowerCase() === 'pm' && hours < 12) {
          hours += 12;
        }
        if (ampm.toLowerCase() === 'am' && hours === 12) {
          hours = 0;
        }
      }

      newDate = new Date(
        newChosenDate.getFullYear(),
        newChosenDate.getMonth(),
        newChosenDate.getDate(),
        hours,
        minutes
      );
    }

    setChosenDate(newDate);
  }

  function handleTimeChange(newChosenTime: string | null) {
    setChosenTime(newChosenTime);

    if (chosenDate && newChosenTime) {
      const [timePart, ampm] = newChosenTime.split(' ');
      let [hours, minutes] = timePart.split(':').map(Number);

      if (ampm) {
        if (ampm.toLowerCase() === 'pm' && hours < 12) {
          hours += 12;
        }
        if (ampm.toLowerCase() === 'am' && hours === 12) {
          hours = 0;
        }
      }

      const newDate = new Date(
        chosenDate.getFullYear(),
        chosenDate.getMonth(),
        chosenDate.getDate(),
        hours,
        minutes
      );
      setChosenDate(newDate);
    }
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
      <p>
        <strong>Chosen Time: </strong>
        {chosenTime && <span>{chosenTime}</span>}
      </p>
      <DateTimePicker
        {...args}
        onDateChange={handleDateChange}
        onTimeChange={handleTimeChange}
        value={chosenDate}
        isClearable
      />
      <br />
      <Button onClick={() => handleDateChange(null)}>
        Clear Date and Time
      </Button>
    </div>
  );
};

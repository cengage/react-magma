import React from 'react';

import { Meta } from '@storybook/react';
import { isValid } from 'date-fns';

import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';
import { LabelPosition } from '../Label';
import { getDateFromString, inDateRange } from './utils';
import { Button } from '../Button';

import { DatePicker } from '.';

const today: Date = new Date();

export default {
  component: DatePicker,
  title: 'DatePicker',
  argTypes: {
    minDate: {
      control: {
        type: 'date',
      },
    },
    maxDate: {
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
  },
} as Meta;

export const Default = {
  render: args => {
    return <DatePicker {...args} />;
  },

  args: {
    labelText: 'Date',
    minDate: today,
    errorMessage: '',
    helperMessage: '',
  },
};

export const NonDefaultFormats = () => {
  return (
    <>
      <I18nContext.Provider
        value={{
          ...defaultI18n,
          dateFormat: 'dd/MM/yyyy',
        }}
      >
        <DatePicker labelText="Date format: dd/MM/yyyy" />
      </I18nContext.Provider>
      <br />
      <I18nContext.Provider
        value={{
          ...defaultI18n,
          dateFormat: 'yyyy/MM/dd',
        }}
      >
        <DatePicker labelText="Date format: yyyy/MM/dd" />
      </I18nContext.Provider>
      <br />
      <I18nContext.Provider
        value={{
          ...defaultI18n,
          dateFormat: 'yyyy/dd/MM',
        }}
      >
        <DatePicker labelText="Date format: yyyy/dd/MM" />
      </I18nContext.Provider>
      <br />
      <I18nContext.Provider
        value={{
          ...defaultI18n,
          dateFormat: 'MMMM d, yyyy',
        }}
      >
        <DatePicker labelText="Date format: MMMM d, yyyy" />
      </I18nContext.Provider>
    </>
  );
};

export const Inverse = {
  render: args => {
    return (
      <div style={{ background: magma.colors.primary600, padding: '0 12px' }}>
        <br />
        <DatePicker {...args} />
        <br />
      </div>
    );
  },

  args: {
    ...Default.args,
    isInverse: true,
  },
};

export const ClearingTheDate = {
  render: args => {
    const [chosenDate, setChosenDate] = React.useState<Date | undefined>(
      undefined
    );

    function handleDateChange(newChosenDate: Date) {
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
        <DatePicker
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
  },
};

export const Events = {
  render: args => {
    const [chosenDate, setChosenDate] = React.useState<Date | undefined>(
      undefined
    );
    const [changedValue, setChangedValue] = React.useState<string | Date>('');

    function handleChange(
      value: string | Date,
      event: React.EventChangeHandler
    ) {
      setChangedValue(value);
    }

    function handleDateChange(newChosenDate: Date) {
      setChosenDate(newChosenDate);
    }

    function hasErrorMessage() {
      const convertedMinDate = getDateFromString(args.minDate);
      const convertedMaxDate = getDateFromString(args.maxDate);

      if (!chosenDate) {
        return;
      } else if (!inDateRange(chosenDate, convertedMinDate, convertedMaxDate)) {
        return `Please enter a date within the range ${args.minDate} - ${args.maxDate}`;
      } else if (!isValid(chosenDate)) {
        return 'Please enter a valid date';
      }

      return;
    }

    return (
      <>
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
          <strong>Changed Value: </strong>
          {changedValue && <span>{changedValue}</span>}
        </p>
        <DatePicker
          {...args}
          onDateChange={handleDateChange}
          onChange={handleChange}
          errorMessage={hasErrorMessage()}
        />
      </>
    );
  },

  args: {
    ...Default.args,
    minDate: '04/23/2024',
    maxDate: '04/20/2025',
  },
};

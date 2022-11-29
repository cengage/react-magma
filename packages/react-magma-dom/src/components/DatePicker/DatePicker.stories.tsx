import React from 'react';
import { DatePicker } from '.';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';
import { LabelPosition } from '../Label';
import { Meta } from '@storybook/react/types-6-0';

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

export const Default = args => {
  return <DatePicker {...args} />;
};

Default.args = {
  labelText: 'Date',
  minDate: today,
  errorMessage: '',
  helperMessage: '',
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

export const Inverse = args => {
  return (
    <div style={{ background: magma.colors.primary600, padding: '0 12px' }}>
      <br />
      <DatePicker {...args} />
      <br />
    </div>
  );
};

Inverse.args = {
  ...Default.args,
  isInverse: true,
};

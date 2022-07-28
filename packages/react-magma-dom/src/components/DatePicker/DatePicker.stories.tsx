import React from 'react';
import { DatePicker } from '.';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';

export default {
  component: DatePicker,
  title: 'DatePicker',
};

const today: Date = new Date();

export const Default = () => {
  return <DatePicker labelText="Date" minDate={today} />;
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
    </>
  );
};

export const Inverse = () => {
  return (
    <div style={{ background: magma.colors.primary600, padding: '0 12px' }}>
      <br />
      <DatePicker labelText="Date" isInverse minDate={today} />
      <br />
    </div>
  );
};

import * as React from 'react';

import { setMonth } from 'date-fns';
import { UseSelectState } from 'downshift';

import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { Select } from '../Select';
import { CalendarContext } from './CalendarContext';
import {
  CustomItemInterface,
  CustomSelectItem,
  getItemListMaxHeight,
  StyledSelect,
} from './CustomSelectItem';

export interface MonthPickerProps {
  currentMonth: string;
  isInverse?: boolean;
  monthContainerHeight?: number;
}

export const MonthPicker: React.FunctionComponent<MonthPickerProps> = props => {
  const { currentMonth, isInverse, monthContainerHeight } = props;
  const { focusedDate, onDateChange } = React.useContext(CalendarContext);
  const i18n = React.useContext(I18nContext);
  const monthsLabels = i18n.months.long;
  const theme = React.useContext(ThemeContext);
  const months = Object.values(monthsLabels).map((label, value) => ({
    label,
    value: value,
  }));

  const getMonthByLabel = (label: string) =>
    months.find(month => month.label === label);

  const getNumberMonthByLabel = (label: string) =>
    months.find(month => month.label === label)?.value;

  function onMonthChange(month: number) {
    onDateChange(setMonth(focusedDate, month), undefined, true);
  }

  const onSelectedItemChange = (
    changes: Partial<UseSelectState<CustomItemInterface>>
  ) => {
    const selectedMonthNumber = changes.selectedItem.value;
    if (selectedMonthNumber !== getNumberMonthByLabel(currentMonth)) {
      onMonthChange(selectedMonthNumber);
    }
  };

  return (
    <StyledSelect isInverse={isInverse} theme={theme}>
      <Select
        ariaLabelTriggerButton={`${currentMonth}. ${i18n.datePicker.selectMonth}`}
        labelText=""
        components={{
          Item: itemProps => (
            <CustomSelectItem
              currentValue={currentMonth}
              theme={theme}
              isInverse={isInverse}
              {...itemProps}
            />
          ),
        }}
        items={months}
        initialSelectedItem={getMonthByLabel(currentMonth)}
        itemListMaxHeight={getItemListMaxHeight(monthContainerHeight)}
        onSelectedItemChange={onSelectedItemChange}
        selectedItem={getMonthByLabel(currentMonth)}
        menuStyle={{ width: 170 }}
      />
    </StyledSelect>
  );
};

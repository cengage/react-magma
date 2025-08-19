import React from 'react';

import { getYear, setYear } from 'date-fns';
import { UseSelectState } from 'downshift';

import { CalendarContext } from './CalendarContext';
import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { Select } from '../Select';
import { CustomSelectItem, StyledSelect } from './CustomSelectItem';

interface YearPickerProps {
  currentYear: number;
  isInverse?: boolean;
  monthContainerHeight?: number;
}

export const YearPicker: React.FunctionComponent<YearPickerProps> = (
  props: YearPickerProps
) => {
  const { currentYear, isInverse, monthContainerHeight } = props;
  const { minDate, maxDate } = React.useContext(CalendarContext);
  const minYear = minDate ? getYear(minDate) : 1900;
  const maxYear = maxDate ? getYear(maxDate) : 2099;
  const stringCurrentYear = String(currentYear);
  const itemListMaxHeight = monthContainerHeight - 60;
  const theme = React.useContext(ThemeContext);
  const { focusedDate, onDateChange } = React.useContext(CalendarContext);
  const i18n = React.useContext(I18nContext);

  const visibleYears = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i
  );

  const years = visibleYears.map(year => ({
    label: String(year),
    value: year,
  }));

  const getYearByLabel = (label: string) =>
    visibleYears
      .map(year => ({ label: String(year), value: year }))
      .find(item => item.label === label);

  function onYearChange(year: number) {
    onDateChange(setYear(focusedDate, year), undefined, true);
  }

  const onSelectedItemChange = (
    changes: Partial<UseSelectState<{ label: string; value: number }>>
  ) => {
    const selectedYearNumber = changes.selectedItem?.value;
    const currentYearNumber = Number(currentYear);

    if (selectedYearNumber !== currentYearNumber) {
      onYearChange(selectedYearNumber);
    }
  };

  return (
    <StyledSelect isInverse={isInverse} theme={theme}>
      <Select
        ariaLabelTriggerButton={`${currentYear}. ${i18n.datePicker.selectYear}`}
        labelText=""
        components={{
          Item: itemProps => (
            <CustomSelectItem
              currentValue={stringCurrentYear}
              isInverse={isInverse}
              theme={theme}
              {...itemProps}
            />
          ),
        }}
        items={years}
        initialSelectedItem={getYearByLabel(stringCurrentYear)}
        itemListMaxHeight={itemListMaxHeight}
        onSelectedItemChange={onSelectedItemChange}
        selectedItem={getYearByLabel(stringCurrentYear)}
        menuStyle={{ width: 145 }}
      />
    </StyledSelect>
  );
};

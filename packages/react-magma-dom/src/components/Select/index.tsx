import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import ReactSelect, { Props as ReactSelectProps } from 'react-select';
import {
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove,
  getStyles,
  useSelectValue,
  getAriaLabel,
  BaseSelectProps
} from '../Select/shared';
import { SelectWrapper } from './SelectWrapper';

export interface SelectProps extends BaseSelectProps, ReactSelectProps {}

export const Select: React.FunctionComponent<SelectProps> = (
  props: SelectProps
) => {
  const [value, onChange] = useSelectValue(
    props.value,
    props.defaultValue,
    props.onChange
  );

  const {
    testId,
    labelText,
    errorMessage,
    helperMessage,
    isInverse,
    styles,
    ...other
  } = props;

  const ariaLabelText = getAriaLabel(labelText, errorMessage, helperMessage);

  const theme = React.useContext(ThemeContext);

  return (
    <SelectWrapper
      errorMessage={errorMessage}
      helperMessage={helperMessage}
      isInverse={isInverse}
      labelText={labelText}
      testId={testId}
    >
      <ReactSelect
        {...other}
        aria-label={ariaLabelText}
        classNamePrefix="magma"
        components={{
          ClearIndicator,
          DropdownIndicator,
          MultiValueRemove
        }}
        onChange={onChange}
        styles={getStyles(styles, theme, errorMessage, isInverse)}
        value={value}
      />
    </SelectWrapper>
  );
};

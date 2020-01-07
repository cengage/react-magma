import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { SelectWrapper } from '../Select/SelectWrapper';
import {
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove,
  getStyles,
  useSelectValue,
  getAriaLabel,
  BaseSelectProps,
  OptionType
} from '../Select/shared';
import ReactAsyncSelect, {
  Props as AsyncReactSelectProps
} from 'react-select/async';

export interface AsyncSelectProps
  extends BaseSelectProps,
    AsyncReactSelectProps<OptionType> {}

export const AsyncSelect: React.FunctionComponent<AsyncSelectProps> = (
  props: AsyncSelectProps
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
    inverse,
    styles,
    ...other
  } = props;

  const ariaLabelText = getAriaLabel(labelText, errorMessage, helperMessage);

  const theme = React.useContext(ThemeContext);

  return (
    <SelectWrapper
      errorMessage={errorMessage}
      helperMessage={helperMessage}
      inverse={inverse}
      labelText={labelText}
      testId={testId}
    >
      <ReactAsyncSelect
        {...other}
        aria-label={ariaLabelText}
        classNamePrefix="magma"
        components={{
          ClearIndicator,
          DropdownIndicator,
          MultiValueRemove
        }}
        onChange={onChange}
        styles={getStyles(styles, theme, errorMessage, inverse)}
        value={value}
      />
    </SelectWrapper>
  );
};

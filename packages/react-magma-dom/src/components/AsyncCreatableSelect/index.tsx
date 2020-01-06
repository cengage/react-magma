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
import ReactAsyncCreatableSelect, {
  Props as AsyncCreatableReactSelectProps
} from 'react-select/async-creatable';

export interface AsyncCreatableSelectProps
  extends BaseSelectProps,
    AsyncCreatableReactSelectProps<OptionType> {}

export const AsyncCreatableSelect: React.FunctionComponent<
  AsyncCreatableSelectProps
> = (props: AsyncCreatableSelectProps) => {
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
      <ReactAsyncCreatableSelect
        {...other}
        aria-label={ariaLabelText}
        classNamePrefix="magma"
        components={{
          ClearIndicator,
          DropdownIndicator,
          MultiValueRemove
        }}
        onChange={onChange}
        styles={getStyles(styles, theme, errorMessage)}
        value={value}
      />
    </SelectWrapper>
  );
};

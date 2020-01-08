import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { SelectWrapper } from '../Select/SelectWrapper';
import {
  getStyles,
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove,
  getAriaLabel,
  useSelectValue,
  BaseSelectProps,
  OptionType
} from '../Select/shared';
import ReactCreatableSelect, {
  Props as CreatableReactSelectProps
} from 'react-select/creatable';
export interface CreatableSelectProps
  extends BaseSelectProps,
    CreatableReactSelectProps<OptionType> {}

export const CreatableSelect: React.FunctionComponent<CreatableSelectProps> = (
  props: CreatableSelectProps
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
      isInverse={isInverse}
      labelText={labelText}
      testId={testId}
    >
      <ReactCreatableSelect
        {...other}
        aria-label={ariaLabelText}
        classNamePrefix="magma"
        components={{
          ClearIndicator,
          DropdownIndicator,
          MultiValueRemove
        }}
        onChange={onChange}
        isInverse={isInverse}
        styles={getStyles(styles, theme, errorMessage)}
        value={value}
      />
    </SelectWrapper>
  );
};

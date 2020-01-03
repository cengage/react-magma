import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  SelectProps,
  getStyles,
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove
} from '../Select';
import { SelectWrapper } from '../Select/SelectWrapper';
import { useSelectValue, Options } from '../Select/shared';
import ReactCreatableSelect from 'react-select/creatable';

export interface CreatableSelectProps extends SelectProps {
  allowCreateWhileLoading?: boolean;
  createOptionPosition?: 'first' | 'last';
  formatCreateLabel?: (value: string) => void;
  getNewOptionData?: (value: string, optionLabel: React.ReactNode) => Options;
  isLoading?: boolean;
  isValidNewOption?: (
    inputValue: string,
    selectValue: Options[],
    selectOptions: Options[]
  ) => boolean;
  onCreateOption?: (value: string) => void;
}

export const CreatableSelect: React.FunctionComponent<CreatableSelectProps> = (
  props: CreatableSelectProps
) => {
  const [value, onChange] = useSelectValue(
    props.value,
    props.defaultValue,
    props.onChange
  );

  const {
    allowCreateWhileLoading,
    createOptionPosition,
    defaultValue,
    formatCreateLabel,
    getNewOptionData,
    id,
    isLoading,
    isValidNewOption,
    testId,
    name,
    onCreateOption,
    onBlur,
    onFocus,
    onOpen,
    onClose,
    onInputChange,
    options,
    labelText,
    disabled,
    required,
    clearable,
    errorMessage,
    isInverse,
    multi,
    style
  } = props;

  const theme = React.useContext(ThemeContext);

  return (
    <SelectWrapper
      errorMessage={errorMessage}
      id={id}
      isInverse={isInverse}
      labelText={labelText}
      testId={testId}
    >
      <ReactCreatableSelect
        id={id}
        isInverse={isInverse}
        components={{
          ClearIndicator,
          DropdownIndicator,
          MultiValueRemove
        }}
        aria-label={labelText}
        name={name}
        defaultValue={defaultValue}
        value={value}
        options={options}
        required={required}
        isDisabled={disabled}
        isMulti={multi}
        isClearable={clearable}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        onInputChange={onInputChange}
        onMenuOpen={onOpen}
        onMenuClose={onClose}
        styles={getStyles(style, theme, errorMessage)}
        classNamePrefix="magma"
        allowCreateWhileLoading={allowCreateWhileLoading}
        createOptionPosition={createOptionPosition}
        formatCreateLabel={formatCreateLabel}
        getNewOptionData={getNewOptionData}
        isLoading={isLoading}
        isValidNewOption={isValidNewOption}
        onCreateOption={onCreateOption}
      />
    </SelectWrapper>
  );
};

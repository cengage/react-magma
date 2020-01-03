import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { Omit } from '../utils';
import {
  SelectProps,
  getStyles,
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove
} from '../Select';
import { SelectWrapper } from '../Select/SelectWrapper';
import { useSelectValue, Options } from '../Select/shared';
import ReactAsyncSelect from 'react-select/async';

export interface AsyncSelectProps extends Omit<SelectProps, 'options'> {
  cacheOptions?: boolean;
  defaultOptions?: Options[] | Options;
  loadOptions: (value: string) => Promise<any>;
}

export const AsyncSelect: React.FunctionComponent<AsyncSelectProps> = (
  props: AsyncSelectProps
) => {
  const [value, onChange] = useSelectValue(
    props.value,
    props.defaultValue,
    props.onChange
  );

  const {
    cacheOptions,
    defaultOptions,
    defaultValue,
    id,
    testId,
    name,
    labelText,
    loadOptions,
    disabled,
    onBlur,
    onFocus,
    onOpen,
    onClose,
    onInputChange,
    required,
    clearable,
    errorMessage,
    helperMessage,
    isInverse,
    multi,
    style
  } = props;

  return (
    <ThemeContext.Consumer>
      {theme => (
        <SelectWrapper
          errorMessage={errorMessage}
          helperMessage={helperMessage}
          id={id}
          isInverse={isInverse}
          labelText={labelText}
          testId={testId}
        >
          <ReactAsyncSelect
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
            cacheOptions={cacheOptions}
            loadOptions={loadOptions}
            defaultOptions={defaultOptions}
          />
        </SelectWrapper>
      )}
    </ThemeContext.Consumer>
  );
};

import * as React from 'react';
import { SelectCore, Options } from 'react-magma-core';
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
import { Async as ReactAsyncSelect } from 'react-select';

export interface AsyncSelectProps extends Omit<SelectProps, 'options'> {
  cacheOptions?: boolean;
  defaultOptions?: Options[] | Options;
  loadOptions: (value: string) => Promise<any>;
}

export const AsyncSelect: React.FunctionComponent<AsyncSelectProps> = (
  props: AsyncSelectProps
) => (
  <SelectCore
    defaultValue={props.defaultValue}
    value={props.value}
    onBlur={props.onBlur}
    onFocus={props.onFocus}
    onChange={props.onChange}
    onOpen={props.onOpen}
    onClose={props.onClose}
  >
    {({ value, onBlur, onFocus, onChange, onOpen, onClose }) => {
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
        required,
        clearable,
        errorMessage,
        helperMessage,
        inverse,
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
              inverse={inverse}
              labelText={labelText}
              testId={testId}
            >
              <ReactAsyncSelect
                id={id}
                inverse={inverse}
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
    }}
  </SelectCore>
);

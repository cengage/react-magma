import * as React from 'react';
import { SelectCore } from 'react-magma-core';
import { ThemeContext } from '../../theme/themeContext';
import {
  Options,
  SelectProps,
  getStyles,
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove
} from '../Select';
import { SelectWrapper } from '../Select/SelectWrapper';
import { Creatable as ReactCreatableSelect } from 'react-select';

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
        options,
        labelText,
        disabled,
        required,
        clearable,
        errorMessage,
        inverse,
        multi,
        style
      } = props;

      return (
        <ThemeContext.Consumer>
          {theme => (
            <SelectWrapper
              errorMessage={errorMessage}
              inverse={inverse}
              labelText={labelText}
              testId={testId}
            >
              <ReactCreatableSelect
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
                options={options}
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
                allowCreateWhileLoading={allowCreateWhileLoading}
                createOptionPosition={createOptionPosition}
                formatCreateLabel={formatCreateLabel}
                getNewOptionData={getNewOptionData}
                isLoading={isLoading}
                isValidNewOption={isValidNewOption}
                onCreateOption={onCreateOption}
              />
            </SelectWrapper>
          )}
        </ThemeContext.Consumer>
      );
    }}
  </SelectCore>
);

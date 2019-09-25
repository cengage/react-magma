import * as React from 'react';
import { SelectCore, Options } from 'react-magma-core';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { ThemeContext } from '../../theme/ThemeContext';

import ReactSelect, { components } from 'react-select';
import { SelectWrapper } from './SelectWrapper';

export interface SelectProps {
  id?: string;
  testId?: string;
  name: string;
  labelText: string;
  options: Options[];
  defaultValue?: Options[] | Options | null;
  value?: Options[] | Options | null;
  disabled?: boolean;
  required?: boolean;
  clearable?: boolean;
  errorMessage?: string;
  helperMessage?: string;
  inverse?: boolean;
  multi?: boolean;
  style?: ReactSelectStyles;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (option: Options) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onInputChange?: (value: string) => void;
}

interface ReactSelectStyles {
  control?: React.CSSProperties;
  dropdownIndicator?: React.CSSProperties;
  clearIndicator?: React.CSSProperties;
  indicatorSeparator?: React.CSSProperties;
  menu?: React.CSSProperties;
  multiValue?: React.CSSProperties;
  multiValueRemove?: React.CSSProperties;
  option?: React.CSSProperties;
}

export function getStyles(
  customStyles: ReactSelectStyles = {},
  theme: any,
  errorMessage?: string,
  inverse?: boolean
) {
  return {
    control: (styles, { isFocused, isDisabled }) => ({
      ...styles,
      backgroundColor: isDisabled
        ? theme.colors.neutral07
        : theme.colors.neutral08,
      borderColor: errorMessage ? theme.colors.danger : theme.colors.neutral04,
      borderRadius: '5px',
      boxShadow: errorMessage ? `0 0 0 1px ${theme.colors.neutral08}` : '0 0 0',
      color: theme.colors.neutral02,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      height: '37px',
      outline: isFocused
        ? inverse
          ? `2px dotted ${theme.colors.neutral08}`
          : `2px dotted ${theme.colors.pop02}`
        : '0',
      outlineOffset: '2px',
      padding: '0 8px 0 0',

      '&:hover': {
        borderColor: isFocused ? theme.colors.pop02 : theme.colors.neutral04
      },
      ...customStyles.control
    }),
    dropdownIndicator: styles => ({
      ...styles,
      color: theme.colors.neutral02,
      ...customStyles.dropdownIndicator
    }),
    clearIndicator: styles => ({
      ...styles,
      color: theme.colors.neutral03,

      '&:hover': {
        backgroundColor: theme.colors.neutral07
      },
      ...customStyles.clearIndicator
    }),
    indicatorSeparator: styles => ({
      display: 'none',
      ...customStyles.indicatorSeparator
    }),
    menu: styles => ({
      ...styles,
      background: theme.colors.neutral08,
      border: `1px solid ${theme.colors.neutral06}`,
      borderRadius: '3px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
      color: theme.colors.neutral02,
      zIndex: 999,
      ...customStyles.menu
    }),
    multiValue: styles => ({
      ...styles,
      backgroundColor: theme.colors.neutral06,
      color: theme.colors.neutral02,
      ...customStyles.multiValue
    }),
    multiValueRemove: styles => ({
      ...styles,
      backgroundColor: theme.colors.neutral06,
      color: theme.colors.neutral02,

      '&:hover': {
        backgroundColor: theme.colors.neutral05,
        color: theme.colors.neutral02
      },
      ...customStyles.multiValueRemove
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isFocused
        ? theme.colors.neutral06
        : isSelected
        ? theme.colors.neutral07
        : theme.colors.neutral08,
      color: theme.colors.neutral02,
      ...customStyles.option
    }),
    placeholder: styles => ({
      ...styles,
      color: theme.colors.neutral04
    }),
    singleValue: styles => ({
      ...styles,
      color: theme.colors.neutral02
    })
  };
}

export const ClearIndicator = props => {
  return (
    components.ClearIndicator && (
      <components.ClearIndicator {...props}>
        <CrossIcon size={12} />
      </components.ClearIndicator>
    )
  );
};

export const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon size={10} />
      </components.DropdownIndicator>
    )
  );
};

export const MultiValueRemove = props => {
  return (
    components.MultiValueRemove && (
      <components.MultiValueRemove {...props}>
        <CrossIcon size={8} />
      </components.MultiValueRemove>
    )
  );
};

export const Select: React.FunctionComponent<SelectProps> = (
  props: SelectProps
) => (
  <SelectCore
    defaultValue={props.defaultValue}
    value={props.value}
    onChange={props.onChange}
  >
    {({ value, onChange }) => {
      const {
        defaultValue,
        id,
        testId,
        name,
        labelText,
        options,
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
        inverse,
        multi,
        style
      } = props;

      const ariaLabelText =
        errorMessage || helperMessage
          ? `${labelText}, ${errorMessage ? errorMessage : helperMessage}`
          : labelText;

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
              <ReactSelect
                aria-label={ariaLabelText}
                classNamePrefix="magma"
                components={{
                  ClearIndicator,
                  DropdownIndicator,
                  MultiValueRemove
                }}
                defaultValue={defaultValue}
                id={id}
                inverse={inverse}
                isClearable={clearable}
                isDisabled={disabled}
                isMulti={multi}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                onInputChange={onInputChange}
                onMenuClose={onClose}
                onMenuOpen={onOpen}
                options={options}
                required={required}
                styles={getStyles(style, theme, errorMessage, inverse)}
                value={value}
              />
            </SelectWrapper>
          )}
        </ThemeContext.Consumer>
      );
    }}
  </SelectCore>
);

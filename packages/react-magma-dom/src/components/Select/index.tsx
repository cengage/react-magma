import * as React from 'react';
import styled from '@emotion/styled';
import { SelectCore } from 'react-magma-core';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { Label } from '../Label';
import { ThemeContext } from '../../theme/themeContext';

import ReactSelect, { components } from 'react-select';

interface Options {
  label: string;
  value: string;
}

export interface SelectProps {
  id?: string;
  testId?: string;
  name: string;
  labelText: string;
  options: Options[];
  defaultValue?: Options;
  disabled?: boolean;
  required?: boolean;
  clearable?: boolean;
  errorMessage?: string;
  inverse?: boolean;
  multi?: boolean;
  style?: ReactSelectStyles;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (option: Options) => void;
  onOpen?: () => void;
  onClose?: () => void;
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
  errorMessage?: string
) {
  return {
    control: (styles, { isFocused, isDisabled }) => ({
      ...styles,
      backgroundColor: isDisabled
        ? theme.colors.neutral07
        : theme.colors.neutral08,
      borderColor: isFocused
        ? theme.colors.pop03
        : errorMessage
        ? theme.colors.danger
        : theme.colors.neutral05,
      borderRadius: '5px',
      boxShadow: isFocused
        ? `0 0 0 1px ${theme.colors.pop03}`
        : errorMessage
        ? `0 0 0 1px ${theme.colors.danger}`
        : '0 0 0',
      color: theme.colors.neutral02,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      height: '37px',
      outline: '0',
      marginBottom: '10px',
      padding: '0 8px 0 0',

      '&:hover': {
        borderColor: isFocused ? theme.colors.pop03 : theme.colors.neutral05
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

const ClearIndicator = props => {
  return (
    components.ClearIndicator && (
      <components.ClearIndicator {...props}>
        <CrossIcon size={12} />
      </components.ClearIndicator>
    )
  );
};

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon size={10} />
      </components.DropdownIndicator>
    )
  );
};

const MultiValueRemove = props => {
  return (
    components.MultiValueRemove && (
      <components.MultiValueRemove {...props}>
        <CrossIcon size={8} />
      </components.MultiValueRemove>
    )
  );
};

const ErrorMessage = styled.div<{ inverse?: boolean }>`
  background: ${props => (props.inverse ? props.theme.colors.danger : 'none')};
  border-radius: 5px;
  color: ${props =>
    props.inverse ? props.theme.colors.neutral08 : props.theme.colors.danger};
  font-size: 13px;
  margin-top: 5px;
  padding: ${props => (props.inverse ? '5px 10px' : '0')};
`;

export const Select: React.FunctionComponent<SelectProps> = (
  props: SelectProps
) => (
  <SelectCore
    components={{ ClearIndicator, DropdownIndicator, MultiValueRemove }}
    defaultValue={props.defaultValue}
    onBlur={props.onBlur}
    onFocus={props.onFocus}
    onChange={props.onChange}
    onOpen={props.onOpen}
    onClose={props.onClose}
  >
    {({ defaultValue, onBlur, onFocus, onChange, onOpen, onClose }) => {
      const {
        id,
        testId,
        name,
        labelText,
        options,
        disabled,
        required,
        clearable,
        errorMessage,
        inverse,
        multi,
        style
      } = props;

      console.log('inverse', inverse);

      return (
        <ThemeContext.Consumer>
          {theme => (
            <div data-testid={testId}>
              <Label inverse={inverse}>{labelText}</Label>
              <ReactSelect
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
              />
              {errorMessage && (
                <ErrorMessage inverse={inverse} theme={theme}>
                  {errorMessage}
                </ErrorMessage>
              )}
            </div>
          )}
        </ThemeContext.Consumer>
      );
    }}
  </SelectCore>
);

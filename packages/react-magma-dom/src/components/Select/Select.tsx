import * as React from 'react';
import { SelectCore } from 'react-magma-core';
import { Icon } from '../Icon/Icon';
import { Label } from '../Label/Label';
import { magma } from '../../theme/magma';

import ReactSelect, { components } from 'react-select';

interface Options {
  label: string;
  value: string;
}

export interface SelectProps {
  id: string;
  name: string;
  labelText: string;
  options: Options[];
  defaultValue?: string | string[];
  disabled?: boolean;
  required?: boolean;
  clearable?: boolean;
  multi?: boolean;
  style?: ReactSelectStyles;
  handleBlur?: () => void;
  handleFocus?: () => void;
  handleChange?: () => void;
  handleOpen?: () => void;
  handleClose?: () => void;
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

export function getStyles(customStyles: ReactSelectStyles = {}) {
  return {
    control: (styles, { isFocused, isDisabled }) => ({
      ...styles,
      backgroundColor: isDisabled
        ? magma.colors.neutral07
        : magma.colors.neutral08,
      borderColor: isFocused ? magma.colors.success01 : magma.colors.neutral05,
      borderRadius: '3px',
      boxShadow: isFocused
        ? 'inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #9bca43'
        : 'inset 0 4px 5px #e6e6e6',
      color: magma.colors.neutral02,
      height: '35px',
      padding: '0 8px',

      '&:hover': {
        borderColor: isFocused ? magma.colors.success01 : magma.colors.neutral05
      },
      ...customStyles.control
    }),
    dropdownIndicator: (styles, { isFocused }) => ({
      ...styles,
      color: isFocused ? magma.colors.neutral04 : magma.colors.neutral05,
      ...customStyles.dropdownIndicator
    }),
    clearIndicator: (styles, { isFocused }) => ({
      ...styles,
      color: isFocused ? magma.colors.neutral04 : magma.colors.neutral05,

      '&:hover': {
        backgroundColor: magma.colors.neutral07
      },
      ...customStyles.clearIndicator
    }),
    indicatorSeparator: styles => ({
      display: 'none',
      ...customStyles.indicatorSeparator
    }),
    menu: styles => ({
      ...styles,
      border: `1px solid ${magma.colors.neutral06}`,
      borderRadius: '3px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
      zIndex: 999,
      ...customStyles.menu
    }),
    multiValue: styles => ({
      ...styles,
      backgroundColor: magma.colors.neutral07,
      color: magma.colors.neutral02,
      ...customStyles.multiValue
    }),
    multiValueRemove: styles => ({
      ...styles,
      backgroundColor: magma.colors.neutral06,
      color: magma.colors.neutral02,

      '&:hover': {
        backgroundColor: magma.colors.neutral05,
        color: magma.colors.neutral02
      },
      ...customStyles.multiValueRemove
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isFocused
        ? magma.colors.neutral06
        : isSelected
        ? magma.colors.neutral07
        : magma.colors.neutral08,
      color: magma.colors.neutral02,
      ...customStyles.option
    })
  };
}

const ClearIndicator = props => {
  return (
    components.ClearIndicator && (
      <components.ClearIndicator {...props}>
        <Icon size={12} type="cross" />
      </components.ClearIndicator>
    )
  );
};

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <Icon size={18} type="angle-down" />
      </components.DropdownIndicator>
    )
  );
};

const MultiValueRemove = props => {
  return (
    components.MultiValueRemove && (
      <components.MultiValueRemove {...props}>
        <Icon size={8} type="cross" />
      </components.MultiValueRemove>
    )
  );
};

export const Select: React.FunctionComponent<SelectProps> = (
  props: SelectProps
) => (
  <SelectCore
    components={{ ClearIndicator, DropdownIndicator, MultiValueRemove }}
    defaultValue={props.defaultValue}
    handleBlur={props.handleBlur}
    handleFocus={props.handleFocus}
    handleChange={props.handleChange}
    handleOpen={props.handleOpen}
    handleClose={props.handleClose}
  >
    {({
      defaultValue,
      handleBlur,
      handleFocus,
      handleChange,
      handleOpen,
      handleClose
    }) => {
      const {
        id,
        name,
        labelText,
        options,
        disabled,
        required,
        clearable,
        multi,
        style
      } = props;

      return (
        <div>
          <Label>{labelText}</Label>
          <ReactSelect
            id={id}
            components={{ ClearIndicator, DropdownIndicator, MultiValueRemove }}
            aria-label={labelText}
            name={name}
            defaultValue={defaultValue}
            options={options}
            required={required}
            isDisabled={disabled}
            isMulti={multi}
            isClearable={clearable}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={handleChange}
            onMenuOpen={handleOpen}
            onMenuClose={handleClose}
            styles={getStyles(style)}
          />
        </div>
      );
    }}
  </SelectCore>
);

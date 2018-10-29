import * as React from 'react';
import { SelectCore } from 'react-magma-core';

const styled = require('styled-components').default;
import { Icon } from '../Icon/Icon';
import { magma } from '../../theme/magma';

import ReactSelect, { components } from 'react-select';

const StyledLabel = styled.label`
  display: inline-block;
  font-weight: bold;
  margin-bottom: 5px;
  max-width: 100%;
`;

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
  handleBlur?: () => void;
  handleFocus?: () => void;
  handleChange?: () => void;
  handleOpen?: () => void;
  handleClose?: () => void;
}

const selectStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: magma.primary04,
    borderColor: isFocused ? magma.accent02 : magma.secondary05,
    borderRadius: '3px',
    boxShadow: isFocused
      ? 'inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #9bca43'
      : 'inset 0 4px 5px #e6e6e6',
    color: magma.primary01,
    height: '35px',
    padding: '0 8px',

    '&:hover': {
      borderColor: isFocused ? magma.accent02 : magma.secondary05
    }
  }),
  indicatorSeparator: styles => ({
    display: 'none'
  }),
  menu: styles => ({
    ...styles,
    border: `1px solid ${magma.secondary06}`,
    borderRadius: '3px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
    zIndex: 999
  }),
  multiValueRemove: styles => ({
    ...styles,
    backgroundColor: magma.limited03,
    color: magma.primary01,

    '&:hover': {
      backgroundColor: magma.secondary05,
      color: magma.primary01
    }
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isFocused
      ? magma.limited03
      : isSelected
        ? magma.primary03
        : magma.primary04,
    color: magma.primary01
  })
};

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <Icon color={magma.secondary05} size={18} type="angle-down" />
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

export const Select: React.SFC<SelectProps> = (
  props: SelectProps
): JSX.Element => (
  <SelectCore
    components={{ DropdownIndicator, MultiValueRemove }}
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
        multi
      } = props;

      return (
        <div>
          <StyledLabel htmlFor={id}>{labelText}</StyledLabel>
          <ReactSelect
            components={{ DropdownIndicator, MultiValueRemove }}
            id={id}
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
            styles={selectStyles}
          />
        </div>
      );
    }}
  </SelectCore>
);

export default Select;

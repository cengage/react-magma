import * as React from 'react';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { ThemeContext } from '../../theme/ThemeContext';

import ReactSelect, { components } from 'react-select';
import { useSelectValue, Options } from '../Select/shared';
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
  isInverse?: boolean;
  multi?: boolean;
  style?: ReactSelectStyles;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (option: Options[] | Options) => void;
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
  isInverse?: boolean
) {
  return {
    control: (styles, { isFocused, isDisabled }) => ({
      ...styles,
      backgroundColor: isDisabled
        ? theme.colors.neutral07
        : theme.colors.neutral08,
      borderColor: errorMessage ? theme.colors.danger : theme.colors.neutral03,
      borderRadius: '5px',
      boxShadow: errorMessage ? `0 0 0 1px ${theme.colors.neutral08}` : '0 0 0',
      color: theme.colors.neutral01,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      height: '37px',
      outline: isFocused
        ? isInverse
          ? `2px dotted ${theme.colors.neutral08}`
          : `2px dotted ${theme.colors.focus}`
        : '0',
      outlineOffset: '2px',
      padding: '0 8px 0 0',

      '&:hover': {
        borderColor: isFocused ? theme.colors.pop02 : theme.colors.neutral03
      },
      ...customStyles.control
    }),
    dropdownIndicator: styles => ({
      ...styles,
      color: theme.colors.neutral01,
      ...customStyles.dropdownIndicator
    }),
    clearIndicator: styles => ({
      ...styles,
      color: theme.colors.neutral02,

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
      color: theme.colors.neutral01,
      zIndex: 999,
      ...customStyles.menu
    }),
    multiValue: styles => ({
      ...styles,
      backgroundColor: theme.colors.neutral06,
      color: theme.colors.neutral01,
      ...customStyles.multiValue
    }),
    multiValueRemove: styles => ({
      ...styles,
      backgroundColor: theme.colors.neutral06,
      color: theme.colors.neutral01,

      '&:hover': {
        backgroundColor: theme.colors.neutral05,
        color: theme.colors.neutral01
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
      color: theme.colors.neutral01,
      ...customStyles.option
    }),
    placeholder: styles => ({
      ...styles,
      color: theme.colors.neutral03
    }),
    singleValue: styles => ({
      ...styles,
      color: theme.colors.neutral01
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
) => {
  const [value, onChange] = useSelectValue(
    props.value,
    props.defaultValue,
    props.onChange
  );

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
    isInverse,
    multi,
    style
  } = props;

  const ariaLabelText =
    errorMessage || helperMessage
      ? `${labelText}, ${errorMessage ? errorMessage : helperMessage}`
      : labelText;

  const theme = React.useContext(ThemeContext);

  return (
    <SelectWrapper
      errorMessage={errorMessage}
      helperMessage={helperMessage}
      id={id}
      isInverse={isInverse}
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
        isInverse={isInverse}
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
        styles={getStyles(style, theme, errorMessage, isInverse)}
        value={value}
      />
    </SelectWrapper>
  );
};

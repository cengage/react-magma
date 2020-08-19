import React from 'react';
import {
  Styles as ReactSelectStyles,
  ValueType,
  ActionMeta,
  components
} from 'react-select';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';

export interface BaseSelectProps {
  testId?: string;
  labelText: string;
  errorMessage?: React.ReactNode;
  helperMessage?: React.ReactNode;
  inverse?: boolean;
}

export interface OptionType {
  label: any;
  value: any;
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

export function getStyles(
  customStyles: ReactSelectStyles = {},
  theme: any,
  errorMessage?: React.ReactNode,
  inverse?: boolean
) {
  return {
    control: (styles, state) => {
      const custom =
        customStyles.control && customStyles.control(styles, state);
      return {
        ...styles,
        backgroundColor: state.isDisabled
          ? theme.colors.neutral07
          : theme.colors.neutral08,
        borderColor: errorMessage
          ? theme.colors.danger
          : theme.colors.neutral03,
        borderRadius: '5px',
        boxShadow: errorMessage
          ? `0 0 0 1px ${theme.colors.neutral08}`
          : '0 0 0',
        color: theme.colors.neutral01,
        cursor: state.isDisabled ? 'not-allowed' : 'pointer',
        height: '37px',
        outline: state.isFocused
          ? inverse
            ? `2px dotted ${theme.colors.focusInverse}`
            : `2px dotted ${theme.colors.focus}`
          : '0',
        outlineOffset: '2px',
        padding: '0 8px 0 0',

        '&:hover': {
          borderColor: state.isFocused
            ? theme.colors.pop02
            : theme.colors.neutral03
        },
        ...custom
      };
    },
    dropdownIndicator: (styles, state) => {
      const custom =
        customStyles.dropdownIndicator &&
        customStyles.dropdownIndicator(styles, state);
      return {
        ...styles,
        color: theme.colors.neutral01,
        ...custom
      };
    },
    clearIndicator: (styles, state) => {
      const custom =
        customStyles.clearIndicator &&
        customStyles.clearIndicator(styles, state);
      return {
        ...styles,
        color: theme.colors.neutral02,

        '&:hover': {
          backgroundColor: theme.colors.neutral07
        },
        ...custom
      };
    },
    indicatorSeparator: (styles, state) => {
      const custom =
        customStyles.indicatorSeparator &&
        customStyles.indicatorSeparator(styles, state);
      return {
        display: 'none',
        ...custom
      };
    },
    menu: (styles, state) => {
      const custom = customStyles.menu && customStyles.menu(styles, state);
      return {
        ...styles,
        background: theme.colors.neutral08,
        border: `1px solid ${theme.colors.neutral06}`,
        borderRadius: '3px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
        color: theme.colors.neutral01,
        zIndex: 999,
        ...custom
      };
    },
    multiValue: (styles, state) => {
      const custom =
        customStyles.multiValue && customStyles.multiValue(styles, state);
      return {
        ...styles,
        backgroundColor: theme.colors.neutral06,
        color: theme.colors.neutral01,
        ...custom
      };
    },
    multiValueRemove: (styles, state) => {
      const custom =
        customStyles.multiValueRemove &&
        customStyles.multiValueRemove(styles, state);
      return {
        ...styles,
        backgroundColor: theme.colors.neutral06,
        color: theme.colors.neutral01,

        '&:hover': {
          backgroundColor: theme.colors.neutral05,
          color: theme.colors.neutral01
        },
        ...custom
      };
    },
    option: (styles, state) => {
      const custom = customStyles.option && customStyles.option(styles, state);
      return {
        ...styles,
        backgroundColor: state.isFocused
          ? theme.colors.neutral06
          : state.isSelected
          ? theme.colors.neutral07
          : theme.colors.neutral08,
        color: theme.colors.neutral01,
        ...custom
      };
    },
    placeholder: (styles, state) => {
      const custom =
        customStyles.placeholder && customStyles.placeholder(styles, state);
      return {
        ...styles,
        color: theme.colors.neutral03,
        ...custom
      };
    },
    singleValue: (styles, state) => {
      const custom =
        customStyles.singleValue && customStyles.singleValue(styles, state);
      return {
        ...styles,
        color: theme.colors.neutral01,
        ...custom
      };
    }
  };
}

export function useSelectValue(
  newValue: ValueType<OptionType>,
  defaultValue: ValueType<OptionType>,
  onChange: (option: ValueType<OptionType>, action?: ActionMeta) => void
): [
  ValueType<OptionType>,
  (value: ValueType<OptionType>, action: ActionMeta) => void
] {
  const [value, setValue] = React.useState<ValueType<OptionType>>(
    defaultValue || newValue
  );

  React.useEffect(() => {
    setValue(newValue);
  }, [newValue]);

  function handleChange(
    changedValue: ValueType<OptionType>,
    action: ActionMeta
  ) {
    setValue(changedValue);
    onChange &&
      typeof onChange === 'function' &&
      onChange(changedValue, action);
  }

  return [value, handleChange];
}

export function getAriaLabel(
  labelText: string,
  errorMessage?: React.ReactNode,
  helperMessage?: React.ReactNode
) {
  return errorMessage || helperMessage
    ? `${labelText}, ${errorMessage ? errorMessage : helperMessage}`
    : labelText;
}

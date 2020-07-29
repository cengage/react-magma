import React from 'react';
import { baseInputStyles } from '../BaseInput';
import { defaultComponents, DownshiftComponents } from './components';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '@emotion/styled';
import {
  UseComboboxGetToggleButtonPropsOptions,
  UseComboboxGetComboboxPropsOptions,
  UseComboboxGetInputPropsOptions
} from 'downshift';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { ButtonShape, ButtonVariant } from '../Button';

const InputContainer = styled.div<{ theme?: any }>`
  align-items: center;
  border-radius: 5px 0 0 5px;
  border: 1px solid ${props => props.theme.colors.neutral03};
  display: flex;
  height: 37px;
  width: 100%;
`;

const StyledInput = styled.input`
  ${baseInputStyles}

  border: 0;
  height: 35px;
  margin-right: 8px;
`;

interface ComboboxInputProps<T> {
  children?: React.ReactNode | React.ReactNode[];
  customComponents?: DownshiftComponents;
  getComboboxProps: (options?: UseComboboxGetComboboxPropsOptions) => any;
  getInputProps: (options?: UseComboboxGetInputPropsOptions) => any;
  getToggleButtonProps: (
    options?: UseComboboxGetToggleButtonPropsOptions
  ) => any;
  isLoading?: boolean;
}

export function ComboboxInput<T>(props: ComboboxInputProps<T>) {
  const {
    children,
    customComponents,
    getComboboxProps,
    getInputProps,
    getToggleButtonProps,
    isLoading
  } = props;
  const theme = React.useContext(ThemeContext);

  const { DropdownIndicator, LoadingIndicator } = defaultComponents({
    ...customComponents
  });

  return (
    <div {...getComboboxProps()} style={{ display: 'flex' }}>
      <InputContainer theme={theme}>
        {children}
        <StyledInput {...getInputProps()} theme={theme} />
        {isLoading && <LoadingIndicator style={{ marginRight: '10px' }} />}
      </InputContainer>
      <DropdownIndicator
        {...getToggleButtonProps()}
        aria-label="toggle menu"
        icon={<CaretDownIcon size={10} />}
        shape={ButtonShape.rightCap}
        tabIndex={0}
        theme={theme}
        variant={ButtonVariant.link}
      />
    </div>
  );
}

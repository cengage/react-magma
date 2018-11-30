import * as React from 'react';
import { CheckboxCore } from 'react-magma-core';
import { Icon } from '../Icon/Icon';
const styled = require('styled-components').default;
import { magma } from '../../theme/magma';

export interface CheckboxProps {
  autoFocus?: boolean;
  color?: string;
  disabled?: boolean;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleFocus?: () => void;
  id: string;
  inverse?: boolean;
  labelText: string;
  required?: boolean;
  value?: string;
}

export interface CheckboxWrapperProps {
  checked?: boolean;
  color: string;
  disabled?: boolean;
  inverse?: boolean;
}

const StyledContainer = styled.div`
  align-items: baseline;
  display: flex;
  flex-wrap: nowrap;
  margin: 0 0 5px 10px;
`;

const StyledInput = styled.input`
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  position: absolute;
  overflow: hidden;
  top: auto;
  white-space: nowrap;
  width: 1px;
`;

const StyledLabel = styled.label`
  color: ${props => (props.inverse ? magma.colors.neutral08 : 'inherit')};
  margin: 0 0 0 10px;
`;

const StyledSpan = styled.span<CheckboxWrapperProps>`
  align-items: center;
  background: ${props => {
    if (props.inverse) {
      if (props.checked) {
        return magma.colors.neutral08;
      }
      return 'none';
    }
    if (props.disabled) {
      return magma.colors.neutral06;
    }
    if (props.checked) {
      return props.color;
    }
    return magma.colors.neutral08;
  }};
  border: 2px solid;
  border-color: ${props => {
    if (props.inverse) {
      if (props.disabled) {
        return magma.colors.disabledInverseText;
      }
      return magma.colors.neutral08;
    }
    if (props.disabled) {
      return magma.colors.neutral05;
    }
    return props.color;
  }};
  border-radius: 3px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  float: left;
  height: 20px;
  justify-content: center;
  margin: 2px 5px 0 -25px;
  transition: all 0.2s ease-out;
  width: 20px;

  svg {
    display: ${props => (props.disabled ? 'none' : 'block')};
    fill: ${props => (props.inverse ? props.color : magma.colors.neutral08)};
    opacity: ${props => (props.checked ? '1' : '0')};
    transition: all 0.2s ease-out;
  }
`;

export const Checkbox: React.FunctionComponent<CheckboxProps> = (
  props: CheckboxProps
): JSX.Element => (
  <CheckboxCore
    value={props.value}
    handleBlur={props.handleBlur}
    handleChange={props.handleChange}
    handleFocus={props.handleFocus}
  >
    {({ handleBlur, handleChange, handleFocus, value }) => {
      const {
        autoFocus,
        color,
        disabled,
        id,
        inverse,
        labelText,
        required
      } = props;

      return (
        <StyledContainer>
          <StyledInput
            autoFocus={autoFocus}
            id={id}
            disabled={disabled}
            required={required}
            type="checkbox"
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <StyledLabel htmlFor={id} inverse={inverse}>
            <StyledSpan
              checked={value}
              color={color ? color : magma.colors.primary}
              disabled={disabled}
              inverse={inverse}
            >
              <Icon size={12} type="checkmark" />
            </StyledSpan>
            {labelText}
          </StyledLabel>
        </StyledContainer>
      );
    }}
  </CheckboxCore>
);

export default Checkbox;

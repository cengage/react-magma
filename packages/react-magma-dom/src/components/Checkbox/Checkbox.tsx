import * as React from 'react';
import { CheckboxCore } from 'react-magma-core';
import { Icon } from '../Icon/Icon';
const styled = require('styled-components').default;
import { magma } from '../../theme/magma';

export interface CheckboxProps {
  autoFocus?: boolean;
  disabled?: boolean;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleFocus?: () => void;
  id: string;
  inline?: boolean;
  labelText: string;
  required?: boolean;
  value?: string;
}

export interface CheckboxWrapperProps {
  checked?: boolean;
}

const StyledContainer = styled.div`
  align-items: baseline;
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  flex-wrap: nowrap;
  margin: 0 0 5px;
`;

const StyledInput = styled.input`
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  position: absolute;
  overflow: hidden;
  top: auto;
  white-space: nowrap;
  width: 1px;

  + label svg {
    display: block;
    fill: #fff;
    opacity: 0;
    transition: all 0.1s ease-out;
  }

  &:checked + label svg {
    opacity: 1;
  }
`;

const StyledLabel = styled.label`
  margin: ${props => (props.inline ? '0 35px 0 10px' : '0 0 0 10px')};
`;

const StyledSpan = styled.span<CheckboxWrapperProps>`
  align-items: center;
  background: ${props => (props.checked ? '#006298' : '#fff')};
  border: 2px solid #006298;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  float: left;
  height: 20px;
  justify-content: center;
  margin: 2px 5px 0 -25px;
  transition: all 0.2s ease-out;
  width: 20px;
`;

const StyledIcon = styled(Icon)<CheckboxWrapperProps>`
  display: block;
  fill: #fff;
  opacity: ${props => (props.checked ? '1' : '0')};
  transition: all 0.2s ease-out;
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
      const { autoFocus, disabled, id, inline, labelText, required } = props;

      return (
        <StyledContainer inline={inline}>
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
          <StyledLabel htmlFor={id} inline={inline}>
            <StyledSpan checked={value}>
              <StyledIcon size={12} type="checkmark" />
            </StyledSpan>
            {labelText}
          </StyledLabel>
        </StyledContainer>
      );
    }}
  </CheckboxCore>
);

export default Checkbox;

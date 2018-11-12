import * as React from 'react';
import { InputCore } from 'react-magma-core';
const styled = require('styled-components').default;
import { Label } from '../Label/Label';
import { magma } from '../../theme/magma';

const StyledInput = styled.input`
  background: ${magma.primary04};
  border: 1px solid ${magma.secondary05};
  border-radius: 3px;
  box-shadow: inset 0 4px 5px #e6e6e6;
  color: ${magma.primary01};
  display: block;
  height: 35px;
  padding: 0 8px;
  font-size: 1rem;
  line-height: 1.25rem;
  width: 100%;

  &:focus {
    border-color: ${magma.accent02};
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #9bca43;
  }

  &[disabled] {
    background: ${magma.primary03};
    cursor: not-allowed;
  }
`;

enum Type {
  text,
  password,
  number
}

export interface InputProps {
  autoFocus?: boolean;
  disabled?: boolean;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleFocus?: () => void;
  id: string;
  labelText: string;
  placeholder?: string;
  required?: boolean;
  type?: Type;
  value?: string;
}

export const Input: React.SFC<InputProps> = (
  props: InputProps
): JSX.Element => (
  <InputCore
    value={props.value}
    handleBlur={props.handleBlur}
    handleChange={props.handleChange}
    handleFocus={props.handleFocus}
  >
    {({ handleBlur, handleChange, handleFocus, value }) => {
      const {
        autoFocus,
        id,
        disabled,
        labelText,
        placeholder,
        type,
        required
      } = props;

      return (
        <div>
          <Label htmlFor={id}>{labelText}</Label>
          <StyledInput
            autoFocus={autoFocus}
            id={id}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
            type={type ? type : 'text'}
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
          />
        </div>
      );
    }}
  </InputCore>
);

export default Input;

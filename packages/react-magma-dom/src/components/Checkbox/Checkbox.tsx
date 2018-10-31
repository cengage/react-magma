import * as React from 'react';
import { CheckboxCore } from 'react-magma-core';
const styled = require('styled-components').default;
// import { magma } from '../../theme/magma';

const StyledLabel = styled.label`
  display: inline-block;
  font-weight: bold;
  margin-bottom: 5px;
  max-width: 100%;
`;

const StyledInput = styled.input``;

export interface CheckboxProps {
  autoFocus?: boolean;
  disabled?: boolean;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleFocus?: () => void;
  id: string;
  labelText: string;
  required?: boolean;
  value?: string;
}

export const Checkbox: React.SFC<CheckboxProps> = (
  props: CheckboxProps
): JSX.Element => (
  <CheckboxCore
    value={props.value}
    handleBlur={props.handleBlur}
    handleChange={props.handleChange}
    handleFocus={props.handleFocus}
  >
    {({ handleBlur, handleChange, handleFocus, value }) => {
      const { autoFocus, id, disabled, labelText, required } = props;

      return (
        <div>
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
          <StyledLabel htmlFor={id}>{labelText}</StyledLabel>
        </div>
      );
    }}
  </CheckboxCore>
);

export default Checkbox;

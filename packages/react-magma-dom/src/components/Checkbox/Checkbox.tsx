import * as React from 'react';
import { CheckboxCore } from 'react-magma-core';
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

const StyledContainer = styled.div`
  align-items: baseline;
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  flex-wrap: nowrap;
  margin: 0 0 5px;
`;

const StyledInput = styled.input``;

const StyledLabel = styled.label`
  margin: ${props => (props.inline ? '0 20px 0 10px' : '0 0 0 10px')};
`;

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
      const { autoFocus, id, inline, disabled, labelText, required } = props;

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
            {labelText}
          </StyledLabel>
        </StyledContainer>
      );
    }}
  </CheckboxCore>
);

export default Checkbox;

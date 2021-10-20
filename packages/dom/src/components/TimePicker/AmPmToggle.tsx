import * as React from 'react';
import styled from '@emotion/styled';

interface AmPmToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

const StyledAmPmToggle = styled.button`
  background: none;
  border: 0;
  border-radius: 3px;
  margin-left: 3px;
  padding: 0 3px;

  &:focus {
    outline: 0;
    background: var(--colors-foundation);
    color: var(--colors-neutral08);
  }
`;

export const AmPmToggle = React.forwardRef<HTMLButtonElement, AmPmToggleProps>(
  (props, ref) => {
    const { children, ...other } = props;
    return (
      <StyledAmPmToggle
        {...other}
        data-testid="amPmTimeButton"
        ref={ref}
        type="button"
      >
        {children}
      </StyledAmPmToggle>
    );
  }
);

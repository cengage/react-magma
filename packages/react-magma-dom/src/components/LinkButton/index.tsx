import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

interface LinkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string;
  isInverse?: boolean;
}

const LinkButtonComponent = styled.button<LinkButtonProps>`
  background: none;
  border: 0;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.primary};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: inline;
  padding: 0;
  opacity: ${props => (props.disabled ? '.8' : '1')};
  text-decoration: underline;

  &:not([disabled]) {
    &:hover,
    &:focus {
      color: ${props =>
        props.isInverse
          ? props.theme.colors.neutral07
          : props.theme.colors.foundation02};
    }

    &:focus {
      outline: 2px dotted
        ${props =>
          props.isInverse
            ? props.theme.colors.neutral08
            : props.theme.colors.focus};
      outline-offset: 3px;
    }
  }
`;

export const LinkButton: React.FunctionComponent<LinkButtonProps> = ({
  children,
  testId,
  ...other
}: LinkButtonProps) => (
  <ThemeContext.Consumer>
    {theme => (
      <LinkButtonComponent {...other} data-testid={testId} theme={theme}>
        {children}
      </LinkButtonComponent>
    )}
  </ThemeContext.Consumer>
);

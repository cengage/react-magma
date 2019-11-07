import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

interface LinkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string;
  inverse?: boolean;
}

const LinkButtonComponent = styled.button<LinkButtonProps>`
  background: none;
  border: 0;
  color: ${props =>
    props.inverse ? props.theme.colors.neutral08 : props.theme.colors.primary};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: inline;
  padding: 0;
  opacity: ${props => (props.disabled ? '.8' : '1')};
  text-decoration: underline;

  &:not([disabled]) {
    &:hover,
    &:focus {
      color: ${props =>
        props.inverse
          ? props.theme.colors.neutral07
          : props.theme.colors.foundation01};
    }

    &:focus {
      outline: 2px dotted
        ${props =>
          props.inverse
            ? props.theme.colors.neutral08
            : props.theme.colors.pop02};
      outline-offset: 3px;
    }
  }
`;

export const LinkButton: React.FunctionComponent<LinkButtonProps> = ({
  children,
  testId,
  inverse,
  ...other
}: LinkButtonProps) => (
  <ThemeContext.Consumer>
    {theme => (
      <LinkButtonComponent
        {...other}
        data-testid={testId}
        inverse={inverse}
        theme={theme}
      >
        {children}
      </LinkButtonComponent>
    )}
  </ThemeContext.Consumer>
);

import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/themeContext';

interface LinkButtonProps {
  autoFocus?: boolean;
  className?: string;
  children?: React.ReactChild | React.ReactChild[];
  onClick?: () => void;
  disabled?: boolean;
  id?: string;
  testId?: string;
  inverse?: boolean;
  style?: React.CSSProperties;
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
      text-decoration: none;
    }

    &:focus {
      outline: 2px dotted ${props => props.theme.colors.pop03};
      outline-offset: 3px;
    }
  }
`;

export const LinkButton: React.FunctionComponent<LinkButtonProps> = ({
  autoFocus,
  className,
  children,
  disabled,
  onClick,
  id,
  testId,
  inverse,
  style
}: LinkButtonProps) => (
  <ThemeContext.Consumer>
    {theme =>
      theme && (
        <LinkButtonComponent
          id={id}
          data-testid={testId}
          className={className}
          autoFocus={autoFocus}
          onClick={onClick}
          disabled={disabled}
          inverse={inverse}
          style={style}
          theme={theme}
        >
          {children}
        </LinkButtonComponent>
      )
    }
  </ThemeContext.Consumer>
);

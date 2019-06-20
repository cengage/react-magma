import * as React from 'react';
import styled from '@emotion/styled';
import { Label } from '../Label';
import { ThemeContext } from '../../theme/themeContext';

interface SelectWrapperProps {
  children: React.ReactNode;
  errorMessage?: string;
  inverse?: boolean;
  labelText: string;
  testId?: string;
}

const ErrorMessage = styled.div<{ inverse?: boolean }>`
  background: ${props => (props.inverse ? props.theme.colors.danger : 'none')};
  border-radius: 5px;
  color: ${props =>
    props.inverse ? props.theme.colors.neutral08 : props.theme.colors.danger};
  font-size: 13px;
  margin-top: 5px;
  padding: ${props => (props.inverse ? '5px 10px' : '0')};
`;

export const SelectWrapper: React.FunctionComponent<SelectWrapperProps> = ({
  children,
  errorMessage,
  inverse,
  labelText,
  testId
}: SelectWrapperProps) => (
  <ThemeContext.Consumer>
    {theme => (
      <div data-testid={testId}>
        <Label inverse={inverse}>{labelText}</Label>
        {children}
        {errorMessage && (
          <ErrorMessage inverse={inverse} theme={theme}>
            {errorMessage}
          </ErrorMessage>
        )}
      </div>
    )}
  </ThemeContext.Consumer>
);

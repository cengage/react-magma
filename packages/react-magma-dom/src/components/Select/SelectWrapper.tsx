import * as React from 'react';
import { Label } from '../Label';
import { InputMessage } from '../Input/InputMessage';

interface SelectWrapperProps {
  children: React.ReactNode;
  errorMessage?: string;
  helperMessage?: string;
  inverse?: boolean;
  labelText: string;
  testId?: string;
}

export const SelectWrapper: React.FunctionComponent<SelectWrapperProps> = ({
  children,
  errorMessage,
  helperMessage,
  inverse,
  labelText,
  testId
}: SelectWrapperProps) => (
  <div data-testid={testId}>
    <Label inverse={inverse}>{labelText}</Label>
    {children}
    <InputMessage inverse={inverse} isError={!!errorMessage}>
      {(errorMessage || helperMessage) && (
        <>{errorMessage ? errorMessage : helperMessage}</>
      )}
    </InputMessage>
  </div>
);

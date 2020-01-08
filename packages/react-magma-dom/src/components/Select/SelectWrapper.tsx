import * as React from 'react';
import { Label } from '../Label';
import { InputMessage } from '../Input/InputMessage';

interface SelectWrapperProps {
  children: React.ReactNode;
  errorMessage?: string;
  helperMessage?: string;
  isInverse?: boolean;
  labelText: string;
  testId?: string;
}

export const SelectWrapper: React.FunctionComponent<SelectWrapperProps> = ({
  children,
  errorMessage,
  helperMessage,
  isInverse,
  labelText,
  testId
}: SelectWrapperProps) => (
  <div data-testid={testId}>
    <Label isInverse={isInverse}>{labelText}</Label>
    {children}
    <InputMessage isInverse={isInverse} isError={!!errorMessage}>
      {(errorMessage || helperMessage) && (
        <>{errorMessage ? errorMessage : helperMessage}</>
      )}
    </InputMessage>
  </div>
);

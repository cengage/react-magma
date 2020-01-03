import * as React from 'react';
import { Label } from '../Label';
import { InputMessage } from '../Input/InputMessage';

interface SelectWrapperProps {
  children: React.ReactNode;
  descriptionId?: string;
  errorMessage?: string;
  helperMessage?: string;
  id: string;
  isInverse?: boolean;
  labelText: string;
  testId?: string;
}

export const SelectWrapper: React.FunctionComponent<SelectWrapperProps> = ({
  children,
  descriptionId,
  errorMessage,
  helperMessage,
  id,
  isInverse,
  labelText,
  testId
}: SelectWrapperProps) => (
  <div data-testid={testId}>
    <Label isInverse={isInverse}>{labelText}</Label>
    {children}
    <InputMessage
      isInverse={isInverse}
      id={descriptionId}
      isError={!!errorMessage}
    >
      {(errorMessage || helperMessage) && (
        <>{errorMessage ? errorMessage : helperMessage}</>
      )}
    </InputMessage>
  </div>
);

import * as React from 'react';
import { Label } from '../Label';
import { InputMessage } from '../Input/InputMessage';

interface SelectWrapperProps {
  children: React.ReactNode;
  descriptionId?: string;
  errorMessage?: string;
  helperMessage?: string;
  id: string;
  inverse?: boolean;
  labelText: string;
  testId?: string;
}

export const SelectWrapper: React.FunctionComponent<SelectWrapperProps> = ({
  children,
  descriptionId,
  errorMessage,
  helperMessage,
  id,
  inverse,
  labelText,
  testId
}: SelectWrapperProps) => (
  <div data-testid={testId}>
    <Label inverse={inverse}>{labelText}</Label>
    {children}
    <InputMessage inverse={inverse} id={descriptionId} isError={!!errorMessage}>
      {(errorMessage || helperMessage) && (
        <>{errorMessage ? errorMessage : helperMessage}</>
      )}
    </InputMessage>
  </div>
);

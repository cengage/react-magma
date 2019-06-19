import * as React from 'react';
import { Label } from '../Label';
import { InputMessage } from '../Input/InputMessage';

interface SelectWrapperProps {
  children: React.ReactNode;
  descriptionId?: string;
  errorMessage?: string;
  id: string;
  inverse?: boolean;
  labelText: string;
  testId?: string;
}

export const SelectWrapper: React.FunctionComponent<SelectWrapperProps> = ({
  children,
  descriptionId,
  errorMessage,
  id,
  inverse,
  labelText,
  testId
}: SelectWrapperProps) => (
  <div data-testid={testId}>
    <Label htmlFor={id} inverse={inverse}>
      {labelText}
    </Label>
    {children}
    {errorMessage && (
      <InputMessage id={descriptionId} inverse={inverse} isError>
        {errorMessage}
      </InputMessage>
    )}
  </div>
);

import * as React from 'react';
import { Label, InputMessage } from 'react-magma-dom';

interface SelectWrapperProps {
  children: React.ReactNode;
  errorMessage?: React.ReactNode;
  helperMessage?: React.ReactNode;
  isInverse?: boolean;
  labelText: string;
  messageStyle?: React.CSSProperties;
  testId?: string;
}

export const SelectWrapper: React.FunctionComponent<SelectWrapperProps> = ({
  children,
  errorMessage,
  helperMessage,
  isInverse,
  labelText,
  messageStyle,
  testId
}: SelectWrapperProps) => (
  <div data-testid={testId}>
    <Label isInverse={isInverse}>{labelText}</Label>
    {children}
    <InputMessage
      isInverse={isInverse}
      hasError={!!errorMessage}
      style={messageStyle}
    >
      {(errorMessage || helperMessage) && (
        <>{errorMessage ? errorMessage : helperMessage}</>
      )}
    </InputMessage>
  </div>
);

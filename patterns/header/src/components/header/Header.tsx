import React, { HTMLAttributes, ReactChild } from 'react';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactChild;
  testId?: string;
}

export const Header = ({ children, testId }: HeaderProps) => {
  return <div data-testid={testId}>{children}</div>;
};

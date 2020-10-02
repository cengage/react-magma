import * as React from 'react';

export interface NavTabProps extends React.HTMLAttributes<HTMLAnchorElement> {
  testId?: string;
}

export const NavTab: React.FunctionComponent<NavTabProps> = React.forwardRef(
  ({ children, testId, ...other }: NavTabProps, ref: any) => {
    return (
      <li>
        <a {...other} ref={ref} data-testid={testId}>
          {children}
        </a>
      </li>
    );
  }
);

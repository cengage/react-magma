import * as React from 'react';

export interface NavTabsProps extends React.HTMLAttributes<HTMLElement> {
  testId?: string;
}

export const NavTabs: React.FunctionComponent<NavTabsProps> = React.forwardRef(
  ({ children, testId, ...other }: NavTabsProps, ref: any) => {
    return (
      <nav {...other} ref={ref} data-testid={testId}>
        <ul>{children}</ul>
      </nav>
    );
  }
);

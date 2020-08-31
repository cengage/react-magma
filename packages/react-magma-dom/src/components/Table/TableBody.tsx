import * as React from 'react';

export interface TableBodyProps extends React.HTMLAttributes<HTMLElement> {
  ref?: any;
  testId?: string;
}

export const TableBody: React.FunctionComponent<TableBodyProps> = React.forwardRef(
  ({ children, testId, ...other }: TableBodyProps, ref: any) => {
    return (
      <tbody {...other} ref={ref} data-testid={testId}>
        {children}
      </tbody>
    );
  }
);

import * as React from 'react';

export interface TableHeadProps extends React.HTMLAttributes<HTMLElement> {
  ref?: any;
  testId?: string;
}

export const TableHead: React.FunctionComponent<TableHeadProps> = React.forwardRef(
  ({ children, testId, ...other }: TableHeadProps, ref: any) => {
    return (
      <thead {...other} ref={ref} data-testid={testId}>
        {children}
      </thead>
    );
  }
);

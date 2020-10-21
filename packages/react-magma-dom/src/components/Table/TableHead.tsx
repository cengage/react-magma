import * as React from 'react';

export interface TableHeadProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  testId?: string;
}

export const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  TableHeadProps
>((props, ref) => {
  const { children, testId, ...other } = props;
  return (
    <thead {...other} ref={ref} data-testid={testId}>
      {children}
    </thead>
  );
});

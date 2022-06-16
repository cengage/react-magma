import * as React from 'react';

/**
 * @children required
 */
export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  /**
   * @internal
   */
  testId?: string;
}

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>((props, ref) => {
  const { children, testId, ...other } = props;
  return (
    <tbody {...other} ref={ref} data-testid={testId}>
      {children}
    </tbody>
  );
});

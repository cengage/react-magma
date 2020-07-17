import * as React from 'react';
import styled from '../../theme/styled';

export interface TableCellProps
  extends React.HTMLAttributes<HTMLTableCellElement> {
  ref?: any;
  testId?: string;
}

const StyledCell = styled.td`
  display: table-cell;
  padding: 10px 20px;
  text-align: left;
  vertical-align: inherit;
`;

export const TableCell: React.FunctionComponent<TableCellProps> = React.forwardRef(
  ({ children, testId, ...other }: TableCellProps, ref: any) => {
    return (
      <StyledCell {...other} ref={ref} data-testid={testId}>
        {children}
      </StyledCell>
    );
  }
);

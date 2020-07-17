import * as React from 'react';
import styled from '../../theme/styled';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  ref?: any;
  testId?: string;
}

const StyledTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  display: table;
  width: 100%;
`;

export const Table: React.FunctionComponent<TableProps> = React.forwardRef(
  ({ children, testId, ...other }: TableProps, ref: any) => {
    return (
      <StyledTable {...other} ref={ref} data-testid={testId}>
        {children}
      </StyledTable>
    );
  }
);

import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export interface TableHeaderCellProps
  extends React.HTMLAttributes<HTMLTableHeaderCellElement> {
  ref?: any;
  testId?: string;
}

const StyledTableHeaderCell = styled.th`
  background: ${props => props.theme.colors.neutral07};
  border-bottom: 2px solid ${props => props.theme.colors.neutral06};
  display: table-cell;
  font-weight: bold;
  padding: 15px 20px;
  text-align: left;
  vertical-align: inherit;
`;

const theme = React.useContext(ThemeContext);

export const TableHeaderCell: React.FunctionComponent<TableHeaderCellProps> = React.forwardRef(
  ({ children, testId, ...other }: TableHeaderCellProps, ref: any) => {
    return (
      <StyledTableHeaderCell
        {...other}
        ref={ref}
        data-testid={testId}
        theme={theme}
      >
        {children}
      </StyledTableHeaderCell>
    );
  }
);

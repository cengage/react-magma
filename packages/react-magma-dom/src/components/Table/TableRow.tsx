import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export interface TableRowProps extends React.HTMLAttributes<HTMLElement> {
  ref?: any;
  testId?: string;
}

const StyledTableRow = styled.tr`
  border-bottom: 1px solid ${props => props.theme.colors.neutral06};
  color: inherit;
  display: table-row;
  outline: 0;
  vertical-align: middle;

  &:last-of-type {
    border-bottom: 0;
  }
`;

const theme = React.useContext(ThemeContext);

export const TableRow: React.FunctionComponent<TableRowProps> = React.forwardRef(
  ({ children, testId, ...other }: TableRowProps, ref: any) => {
    return (
      <StyledTableRow {...other} ref={ref} data-testid={testId} theme={theme}>
        {children}
      </StyledTableRow>
    );
  }
);

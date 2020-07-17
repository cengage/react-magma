import * as React from 'react';
import styled from '../../theme/styled';
import { TableContext } from './';
import { ThemeContext } from '../../theme/ThemeContext';

export interface TableRowProps extends React.HTMLAttributes<HTMLElement> {
  ref?: any;
  testId?: string;
}

const StyledTableRow = styled.tr<{
  hasZebraStripes?: boolean;
}>`
  border-bottom: 1px solid ${props => props.theme.colors.neutral06};
  color: inherit;
  display: table-row;
  outline: 0;
  vertical-align: middle;

  &:nth-of-type(even) {
    background: ${props =>
      props.hasZebraStripes ? props.theme.colors.neutral07 : 'none'};
  }

  &:last-of-type {
    border-bottom: 0;
  }
`;

export const TableRow: React.FunctionComponent<TableRowProps> = React.forwardRef(
  ({ children, testId, ...other }: TableRowProps, ref: any) => {
    const theme = React.useContext(ThemeContext);
    const tableContext = React.useContext(TableContext);

    return (
      <StyledTableRow
        data-testid={testId}
        hasZebraStripes={tableContext.hasStripes}
        ref={ref}
        theme={theme}
      >
        {children}
      </StyledTableRow>
    );
  }
);

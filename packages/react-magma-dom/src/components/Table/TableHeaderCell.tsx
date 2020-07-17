import * as React from 'react';
import styled from '../../theme/styled';
import { TableContext, TableDensity } from './';
import { ThemeContext } from '../../theme/ThemeContext';

export interface TableHeaderCellProps
  extends React.HTMLAttributes<HTMLTableHeaderCellElement> {
  ref?: any;
  testId?: string;
}

const StyledTableHeaderCell = styled.th<{
  density?: TableDensity;
  hasVerticalBorders?: boolean;
  isInverse?: boolean;
}>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.neutral02
      : props.theme.colors.neutral07};
  border-bottom: 2px solid;
  border-right: ${props => (props.hasVerticalBorders ? '1px solid' : 0)};
  border-color: ${props =>
    props.isInverse ? 'rgba(255,255,255,0.4)' : props.theme.colors.neutral06};
  display: table-cell;
  font-weight: bold;
  padding: ${props => {
    switch (props.density) {
      case 'compact':
        return '5px 10px';
      case 'loose':
        return '20px 30px';
      default:
        return '10px 20px';
    }
  }};
  text-align: left;
  vertical-align: inherit;

  &:last-of-type {
    border-right: 0;
  }
`;

export const TableHeaderCell: React.FunctionComponent<TableHeaderCellProps> = React.forwardRef(
  ({ children, testId, ...other }: TableHeaderCellProps, ref: any) => {
    const theme = React.useContext(ThemeContext);
    const tableContext = React.useContext(TableContext);

    return (
      <StyledTableHeaderCell
        {...other}
        ref={ref}
        data-testid={testId}
        density={tableContext.paddingDensity}
        hasVerticalBorders={tableContext.hasVertBorders}
        isInverse={tableContext.isInverseContainer}
        theme={theme}
      >
        {children}
      </StyledTableHeaderCell>
    );
  }
);

import * as React from 'react';
import styled from '../../theme/styled';
import { TableContext, TableDensity } from './';
import { ThemeContext } from '../../theme/ThemeContext';

export interface TableCellProps
  extends React.HTMLAttributes<HTMLTableCellElement> {
  ref?: any;
  testId?: string;
}

const StyledCell = styled.td<{
  hasVerticalBorders?: boolean;
  density?: TableDensity;
  isInverse?: boolean;
}>`
  border-right: ${props => (props.hasVerticalBorders ? '1px solid' : 0)};
  border-color: ${props =>
    props.isInverse ? 'rgba(255,255,255,0.4)' : props.theme.colors.neutral06};
  display: table-cell;
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

export const TableCell: React.FunctionComponent<TableCellProps> = React.forwardRef(
  ({ children, testId, ...other }: TableCellProps, ref: any) => {
    const tableContext = React.useContext(TableContext);
    const theme = React.useContext(ThemeContext);

    return (
      <StyledCell
        {...other}
        ref={ref}
        data-testid={testId}
        density={tableContext.paddingDensity}
        hasVerticalBorders={tableContext.hasVertBorders}
        isInverse={tableContext.isInverseContainer}
        theme={theme}
      >
        {children}
      </StyledCell>
    );
  }
);

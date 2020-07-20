import * as React from 'react';
import styled from '../../theme/styled';
import { TableCellAlign, TableContext, TableDensity } from './';
import { ThemeContext } from '../../theme/ThemeContext';

export interface TableCellProps
  extends React.HTMLAttributes<HTMLTableCellElement> {
  align?: TableCellAlign;
  ref?: any;
  testId?: string;
}

const StyledCell = styled.td<{
  density?: TableDensity;
  hasVerticalBorders?: boolean;
  isInverse?: boolean;
  textAlign?: TableCellAlign;
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
  text-align: ${props => props.textAlign};
  vertical-align: inherit;

  &:last-of-type {
    border-right: 0;
  }
`;

export const TableCell: React.FunctionComponent<TableCellProps> = React.forwardRef(
  ({ align, children, testId, ...other }: TableCellProps, ref: any) => {
    const tableContext = React.useContext(TableContext);
    const theme = React.useContext(ThemeContext);

    return (
      <StyledCell
        {...other}
        data-testid={testId}
        density={tableContext.paddingDensity}
        hasVerticalBorders={tableContext.hasVertBorders}
        isInverse={tableContext.isInverseContainer}
        ref={ref}
        textAlign={align ? align : TableCellAlign.left}
        theme={theme}
      >
        {children}
      </StyledCell>
    );
  }
);

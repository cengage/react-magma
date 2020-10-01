import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  density?: TableDensity;
  hasHoverStyles?: boolean;
  hasVerticalBorders?: boolean;
  hasZebraStripes?: boolean;
  isInverse?: boolean;
  minWidth?: number;
  ref?: any;
  testId?: string;
}

export enum TableDensity {
  compact = 'compact',
  loose = 'loose',
  normal = 'normal', // default
}

export enum TableCellAlign {
  center = 'center',
  inherit = 'inherit',
  justify = 'justify',
  left = 'left', // default
  right = 'right',
}

export enum TableSortDirection {
  ascending = 'ascending',
  descending = 'descending',
  none = 'none', // default
}

interface TableContextInterface {
  density?: TableDensity;
  hasHoverStyles?: boolean;
  hasVerticalBorders?: boolean;
  hasZebraStripes?: boolean;
  isInverse?: boolean;
}

export const TableContext = React.createContext<TableContextInterface>({
  density: TableDensity.normal,
  hasHoverStyles: false,
  hasZebraStripes: false,
  hasVerticalBorders: false,
  isInverse: false,
});

const TableContainer = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table<{ isInverse?: boolean; minWidth: number }>`
  border-collapse: collapse;
  border-spacing: 0;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral01};
  display: table;
  min-width: ${props => props.minWidth}px;
  width: 100%;
`;

export const Table: React.FunctionComponent<TableProps> = React.forwardRef(
  (
    {
      children,
      density,
      hasHoverStyles,
      hasVerticalBorders,
      hasZebraStripes,
      isInverse,
      minWidth,
      testId,
      ...other
    }: TableProps,
    ref: any
  ) => {
    const theme = React.useContext(ThemeContext);

    return (
      <TableContext.Provider
        value={{
          hasHoverStyles,
          hasZebraStripes,
          hasVerticalBorders,
          isInverse,
          density,
        }}
      >
        <TableContainer>
          <StyledTable
            {...other}
            data-testid={testId}
            isInverse={isInverse}
            minWidth={minWidth || theme.breakpoints.small}
            ref={ref}
            theme={theme}
          >
            {children}
          </StyledTable>
        </TableContainer>
      </TableContext.Provider>
    );
  }
);

import * as React from 'react';
import styled from '../../theme/styled';
import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';

/**
 * @children required
 */
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /**
   * Relative padding of the table cells
   * @default TableDensity.normal
   */
  density?: TableDensity;
  /**
   * If true, row will be visually highlighted on hover
   */
  hasHoverStyles?: boolean;
  /**
   * If true, columns will have vertical borders
   */
  hasVerticalBorders?: boolean;
  /**
   * If true, every other row will have a background color
   */
  hasZebraStripes?: boolean;
  isInverse?: boolean;
  /**
   * @internal - used within DataGrid
   */
  isSelectable?: boolean;
  /**
   * @internal - used within DataGrid
   */
  isSortableBySelected?: boolean;
  /**
   * Minimum width for the table in pixels
   * @default 600
   */
  minWidth?: number;
  rowCount?: number;
  selectedItems?: Array<number>;
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

export enum TableRowColor {
  danger = 'danger',
  info = 'info',
  success = 'success',
  warning = 'warning',
}

interface TableContextInterface {
  density?: TableDensity;
  hasHoverStyles?: boolean;
  hasVerticalBorders?: boolean;
  hasZebraStripes?: boolean;
  isInverse?: boolean;
  isSelectable?: boolean;
  rowCount?: number;
  selectedItems?: Array<number>;
  isSortableBySelected?: boolean;
}

export const TableContext = React.createContext<TableContextInterface>({
  density: TableDensity.normal,
  hasHoverStyles: false,
  hasZebraStripes: false,
  hasVerticalBorders: false,
  isInverse: false,
  isSelectable: false,
  isSortableBySelected: false,
  rowCount: 0,
  selectedItems: [],
});

const TableContainer = styled.div`
  overflow-x: visible;
`;

const StyledTable = styled.table<{ isInverse?: boolean; minWidth: number }>`
  border-collapse: collapse;
  border-spacing: 0;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral};
  display: table;
  font-size: ${props => props.theme.typeScale.size03.fontSize};
  line-height: ${props => props.theme.typeScale.size03.lineHeight};
  min-width: ${props => props.minWidth}px;
  width: 100%;
`;

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (props, ref) => {
    const {
      children,
      density,
      hasHoverStyles,
      hasVerticalBorders,
      hasZebraStripes,
      isSelectable,
      minWidth,
      rowCount,
      selectedItems,
      testId,
      isSortableBySelected,
      ...other
    } = props;

    const theme = React.useContext(ThemeContext);

    const isInverse = useIsInverse(props.isInverse);

    return (
      <TableContext.Provider
        value={{
          density,
          hasHoverStyles,
          hasZebraStripes,
          hasVerticalBorders,
          isInverse: isInverse,
          isSelectable,
          isSortableBySelected,
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

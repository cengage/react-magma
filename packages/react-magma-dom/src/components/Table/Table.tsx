import * as React from 'react';
import styled from '../../theme/styled';
import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { transparentize } from 'polished';

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
   * If true, the table will have an outer border
   * @default false
   */
  hasOuterBorder?: boolean;
  /**
   * If true, the table will have square edges
   * @default false
   */
  hasSquareCorners?: boolean;
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
   * @internal
   */
  isSelectable?: boolean;
  /**
   * Minimum width for the table in pixels
   * @default 600
   */
  minWidth?: number;
  rowCount?: number;
  selectedItems?: Array<number>;
  /**
   * @internal
   */
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
}

export const TableContext = React.createContext<TableContextInterface>({
  density: TableDensity.normal,
  hasHoverStyles: false,
  hasZebraStripes: false,
  hasVerticalBorders: false,
  isInverse: false,
  isSelectable: false,
  rowCount: 0,
  selectedItems: [],
});

const TableContainer = styled.div<{ minWidth: number }>`
  overflow: ${props => (props.minWidth ? 'auto' : 'visible')};
`;

const StyledTable = styled.table<{
  hasOuterBorder?: boolean;
  hasSquareCorners?: boolean;
  isInverse?: boolean;
  minWidth: number;
}>`
  border-collapse: collapse;
  box-shadow: ${props =>
    props.hasOuterBorder
      ? `0 0 0 1px ${
          props.isInverse
            ? transparentize(0.6, props.theme.colors.neutral100)
            : props.theme.colors.neutral300
        }`
      : 0};
  border-radius: ${props =>
    props.hasSquareCorners ? 0 : props.theme.borderRadius};
  border-spacing: 0;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  display: table;
  font-size: ${props => props.theme.typeScale.size03.fontSize};
  line-height: ${props => props.theme.typeScale.size03.lineHeight};
  min-width: ${props => props.minWidth}px;
  overflow: ${props => (props.hasSquareCorners ? 'inherit' : 'hidden')};
  width: 100%;
`;

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (props, ref) => {
    const {
      children,
      density = TableDensity.normal,
      hasHoverStyles,
      hasOuterBorder,
      hasSquareCorners,
      hasVerticalBorders,
      hasZebraStripes,
      isSelectable,
      minWidth = 600,
      rowCount,
      selectedItems,
      testId,
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
        }}
      >
        <TableContainer minWidth={minWidth}>
          <StyledTable
            {...other}
            data-testid={testId}
            hasOuterBorder={hasOuterBorder}
            hasSquareCorners={hasSquareCorners}
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

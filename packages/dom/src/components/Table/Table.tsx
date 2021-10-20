import * as React from 'react';
import styled from '@emotion/styled';
import { useIsInverse } from '../../inverse';

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

const TableContainer = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table<{ isInverse?: boolean; minWidth: number }>`
  border-collapse: collapse;
  border-spacing: 0;
  color: ${props =>
    props.isInverse ? 'var(--colors-neutral08)' : 'var(--colors-neutral)'};
  display: table;
  font-size: var(--typeScale-size03-fontSize);
  line-height: var(--typeScale-size03-lineHeight);
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
      ...other
    } = props;

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
        <TableContainer>
          <StyledTable
            {...other}
            data-testid={testId}
            isInverse={isInverse}
            minWidth={minWidth || 'var(--breakpoints-small)'}
            ref={ref}
          >
            {children}
          </StyledTable>
        </TableContainer>
      </TableContext.Provider>
    );
  }
);

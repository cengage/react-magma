import * as React from 'react';

import styled from '@emotion/styled';
import { transparentize } from 'polished';

import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { headingMediumStyles } from '../Typography';

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
   * @default false
   */
  hasHoverStyles?: boolean;
  /**
   * If true, the table will have square edges
   * @default false
   */
  hasSquareCorners?: boolean;
  /**
   * If true, the table will have outer border
   * @default false
   */
  hasOutsideBorder?: boolean;
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
  /**
   * The title or caption of a table inside a <caption> HTML element that provides the table an accessible
   * description.
   * It can be a simple string or a React node, such as a heading element (e.g., <h1>, <h2>).
   */
  tableTitle?: React.ReactNode | string;
  /**
   * @internal
   */
  testId?: string;
  /**
   * @internal - used within DataGrid to handle data-grid styles
   */
  isDataGrid?: boolean;
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
  hasSquareCorners?: boolean;
  hasVerticalBorders?: boolean;
  hasZebraStripes?: boolean;
  isDataGrid?: boolean;
  isInverse?: boolean;
  isSelectable?: boolean;
  rowCount?: number;
  selectedItems?: Array<number>;
  isSortableBySelected?: boolean;
}

export const TableContext = React.createContext<TableContextInterface>({
  density: TableDensity.normal,
  hasHoverStyles: false,
  hasSquareCorners: false,
  hasZebraStripes: false,
  hasVerticalBorders: false,
  isDataGrid: false,
  isInverse: false,
  isSelectable: false,
  isSortableBySelected: false,
  rowCount: 0,
  selectedItems: [],
});

export const TableContainer = styled.div<{
  isInverse?: boolean;
  minWidth: number;
  tableOverFlow?: string;
}>`
  container-type: inline-size;
  container-name: tableContainer;

  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
  }
`;

export const TableWrapper = styled.div<{ minWidth: number }>`
  @container tableContainer (max-width: ${props => props.minWidth}px) {
    overflow: auto;
  }
`;

export const StyledTableTitle = styled.caption<{
  isInverse: boolean;
  isTitleNode: boolean;
}>`
  ${headingMediumStyles};
  margin-bottom: ${props =>
    props.isTitleNode || props.theme.spaceScale.spacing04};
  margin-top: ${props => props.isTitleNode || props.theme.spaceScale.spacing04};
  text-align: left;
`;

export const StyledTable = styled.table<{
  hasOutsideBorder?: boolean;
  hasSquareCorners?: boolean;
  isDataGrid?: boolean;
  isInverse?: boolean;
  minWidth: number;
}>`
  border-collapse: ${props =>
    props.hasOutsideBorder && !props.hasSquareCorners
      ? 'separate'
      : 'collapse'};
  border-spacing: 0;
  border: ${props =>
    props.hasOutsideBorder
      ? `1px solid ${
          props.isInverse
            ? transparentize(0.6, props.theme.colors.neutral100)
            : props.theme.colors.neutral300
        }`
      : 'none'};
  border-radius: ${props => {
    if (!props.hasSquareCorners) {
      if (props.isDataGrid) {
        return `${props.theme.borderRadius} ${props.theme.borderRadius} 0 0`;
      }
      return props.theme.borderRadius;
    }
    return '0';
  }};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  display: table;
  font-size: ${props => props.theme.typeScale.size03.fontSize};
  font-family: ${props => props.theme.bodyFont};
  line-height: ${props => props.theme.typeScale.size03.lineHeight};
  min-width: ${props => props.minWidth}px;
  width: 100%;
`;

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (props, ref) => {
    const {
      children,
      density = TableDensity.normal,
      hasHoverStyles,
      hasOutsideBorder,
      hasSquareCorners,
      hasVerticalBorders,
      hasZebraStripes,
      isSelectable,
      minWidth = 600,
      rowCount,
      selectedItems,
      tableTitle,
      testId,
      isSortableBySelected,
      isDataGrid,
      ...other
    } = props;

    const theme = React.useContext(ThemeContext);

    const isInverse = useIsInverse(props.isInverse);

    const tableWrapper = `table-wrapper-${testId}`;

    return (
      <TableContext.Provider
        value={{
          density,
          hasHoverStyles,
          hasSquareCorners,
          hasZebraStripes,
          hasVerticalBorders,
          isInverse: isInverse,
          isDataGrid: isDataGrid,
          isSelectable,
          isSortableBySelected,
          rowCount,
        }}
      >
        <TableContainer
          data-testid={tableWrapper}
          isInverse={isInverse}
          minWidth={minWidth}
          theme={theme}
          tabIndex={0}
        >
          <TableWrapper minWidth={minWidth}>
            <StyledTable
              {...other}
              data-testid={testId}
              hasOutsideBorder={hasOutsideBorder}
              hasSquareCorners={hasSquareCorners}
              isInverse={isInverse}
              isDataGrid={isDataGrid}
              minWidth={minWidth || theme.breakpoints.small}
              ref={ref}
              theme={theme}
            >
              {tableTitle && (
                <StyledTableTitle
                  data-testid={`${testId}-table-title`}
                  isInverse={isInverse}
                  isTitleNode={typeof tableTitle !== 'string'}
                  theme={theme}
                >
                  {tableTitle}
                </StyledTableTitle>
              )}
              {children}
            </StyledTable>
          </TableWrapper>
        </TableContainer>
      </TableContext.Provider>
    );
  }
);

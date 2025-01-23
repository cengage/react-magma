import * as React from 'react';
import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '@emotion/styled';

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
  hasSquareCorners?: boolean;
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
  hasSquareCorners: false,
  hasZebraStripes: false,
  hasVerticalBorders: false,
  isInverse: false,
  isSelectable: false,
  isSortableBySelected: false,
  rowCount: 0,
  selectedItems: [],
});

export const TableContainer = styled.div<{
  minWidth: number;
  isInverse?: boolean;
  tableOverFlow?: string;
}>`
  overflow: ${props => props.tableOverFlow};
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

export const StyledTable = styled.table<{
  hasSquareCorners?: boolean;
  isInverse?: boolean;
  minWidth: number;
}>`
  border-collapse: collapse;
  border-spacing: 0;
  border-radius: ${props =>
    props.hasSquareCorners ? '0' : props.theme.borderRadius};
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
      hasSquareCorners,
      hasVerticalBorders,
      hasZebraStripes,
      isSelectable,
      minWidth = 600,
      rowCount,
      selectedItems,
      testId,
      isSortableBySelected,
      ...other
    } = props;

    const theme = React.useContext(ThemeContext);

    const isInverse = useIsInverse(props.isInverse);

    const tableWrapper = `table-wrapper-${testId}`;

    const [tableOverFlow, setTableOverFlow] = React.useState<string>('visible');

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    const isBrowser = () => typeof window !== 'undefined';

    React.useEffect(() => {
      function handleResize() {
        setWindowWidth(window.innerWidth);
        if (window.innerWidth < minWidth && minWidth) {
          setTableOverFlow('auto');
        }

        if (window.innerWidth > minWidth) {
          setTableOverFlow('visible');
        }
      }

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    const handleTableOverFlow = isBrowser && tableOverFlow;

    return (
      <TableContext.Provider
        value={{
          density,
          hasHoverStyles,
          hasSquareCorners,
          hasZebraStripes,
          hasVerticalBorders,
          isInverse: isInverse,
          isSelectable,
          isSortableBySelected,
          rowCount,
        }}
      >
        <TableContainer
          data-testid={tableWrapper}
          isInverse={isInverse}
          minWidth={minWidth}
          tableOverFlow={handleTableOverFlow}
          theme={theme}
          tabIndex={0}
        >
          <StyledTable
            {...other}
            data-testid={testId}
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

import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { baseTableCellStyle, buildCellPaddingStyle } from './TableCell';
import {
  TableCellAlign,
  TableContext,
  TableDensity,
  TableSortDirection,
} from './Table';
import { ThemeContext } from '../../theme/ThemeContext';
import { SortDoubleArrowIcon, SouthIcon, NorthIcon } from 'react-magma-icons';

export interface TableHeaderCellProps
  extends React.HTMLAttributes<HTMLTableHeaderCellElement> {
  /**
   * Text alignment of the cell content. Right alignment should be used for numeric values
   * @default TableCellAlign.left
   */
  align?: TableCellAlign;
  /**
   * If true, the header will render a button for sorting
   */
  isSortable?: boolean;
  /**
   * Event that fires when clicking the table header cell sort button
   */
  onSort?: () => void;
  /**
   * Direction and range of data cells that are covered by the header cell
   * @default TableHeaderCellScope.col
   */
  scope?: TableHeaderCellScope;
  /**
   * Direction by which the column is sorted
   * @default TableSortDirection.none
   */
  sortDirection?: TableSortDirection;
  testId?: string;
  /**
   * Width of the component, set by CSS
   * @default auto
   */
  width?: string | number;
}

export enum TableHeaderCellScope {
  col = 'col',
  colgroup = 'colgroup',
  row = 'row',
  rowgroup = 'rowgroup',
}

const StyledTableHeaderCell = styled.th<{
  density?: TableDensity;
  hasVerticalBorders?: boolean;
  isInverse?: boolean;
  isSortable?: boolean;
  textAlign?: TableCellAlign;
  width?: string;
}>`
  background: ${props =>
    props.isInverse ? props.theme.colors.tint03 : props.theme.colors.neutral07};
  border-bottom: 2px solid;
  font-weight: bold;
  vertical-align: bottom;

  ${baseTableCellStyle}

  ${props =>
    props.isSortable &&
    css`
      padding: 0;
    `}

    ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}
`;

const SortButton = styled.button<{
  density?: TableDensity;
  isInverse?: boolean;
  textAlign?: TableCellAlign;
}>`
  align-items: flex-end;
  background: none;
  border: 0;
  color: inherit;
  display: flex;
  justify-content: ${props =>
    props.textAlign === TableCellAlign.right ? 'flex-end' : 'flex-start'};
  margin: 0;
  padding: ${props => buildCellPaddingStyle(props.density, props.theme)}};
  text-align: left;
  width: 100%;

  &:focus {
    outline: 2px dotted
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
    outline-offset: -2px;
  }

  &:hover,
  &:focus {
    background: ${props =>
      props.isInverse ? props.theme.colors.tint : props.theme.colors.neutral06};

    svg {
      fill: ${props =>
        props.isInverse
          ? props.theme.colors.neutral08
          : props.theme.colors.neutral};
    }
  }
`;

const IconWrapper = styled.span`
  padding-left: ${props => props.theme.spaceScale.spacing03};
  position: relative;
  top: ${props => props.theme.spaceScale.spacing02};
`;

export const TableHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>((props, ref) => {
  const {
    align,
    children,
    isSortable,
    onSort,
    scope,
    sortDirection,
    testId,
    width,
    ...other
  } = props;
  const { theme } = React.useContext(ThemeContext);
  const tableContext = React.useContext(TableContext);

  function handleSort() {
    onSort && typeof onSort === 'function' && onSort();
  }

  const SortIcon =
    sortDirection === TableSortDirection.ascending ? (
      <SouthIcon size={theme.iconSizes.small} />
    ) : sortDirection === TableSortDirection.descending ? (
      <NorthIcon size={theme.iconSizes.small} />
    ) : (
      <SortDoubleArrowIcon
        color={
          tableContext.isInverse
            ? theme.colors.neutral06
            : theme.colors.neutral04
        }
        size={theme.iconSizes.small}
      />
    );

  const widthString = typeof width === 'number' ? `${width}px` : width;

  return (
    <StyledTableHeaderCell
      {...other}
      data-testid={testId}
      density={tableContext.density}
      hasVerticalBorders={tableContext.hasVerticalBorders}
      isInverse={tableContext.isInverse}
      ref={ref}
      isSortable={isSortable}
      scope={scope || TableHeaderCellScope.col}
      textAlign={align || TableCellAlign.left}
      theme={theme}
      width={widthString}
    >
      {isSortable ? (
        <SortButton
          density={tableContext.density}
          isInverse={tableContext.isInverse}
          onClick={handleSort}
          textAlign={align || TableCellAlign.left}
          theme={theme}
        >
          <span>{children}</span>
          <IconWrapper theme={theme}>{SortIcon}</IconWrapper>
        </SortButton>
      ) : (
        <>{children}</>
      )}
    </StyledTableHeaderCell>
  );
});

TableHeaderCell.displayName = 'TableHeaderCell';

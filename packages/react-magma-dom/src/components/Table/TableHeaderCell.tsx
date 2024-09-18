import * as React from 'react';
import { css } from '@emotion/react';
import { baseTableCellStyle, buildCellPaddingStyle } from './TableCell';
import {
  TableCellAlign,
  TableContext,
  TableDensity,
  TableSortDirection,
} from './Table';
import { ThemeContext } from '../../theme/ThemeContext';
import { SortDoubleArrowIcon, SouthIcon, NorthIcon } from 'react-magma-icons';
import { transparentize } from 'polished';
import styled from '@emotion/styled';

export interface TableHeaderCellProps
  extends React.HTMLAttributes<HTMLTableHeaderCellElement> {
  /**
   * Text alignment of the cell content. Right alignment should be used for numeric values
   * @default TableCellAlign.left
   */
  align?: TableCellAlign;
  /**
   * @default false
   * If true, style as a row header rather than a column header
   */
  isRowHeader?: boolean;
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
  /**
   * @internal
   */
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

const typedStyled = styled as CreateStyled<ThemeInterface>;

const StyledTableHeaderCell = typedStyled.th<{
  density?: TableDensity;
  hasVerticalBorders?: boolean;
  isInverse?: boolean;
  isRowHeader?: boolean;
  isSortable?: boolean;
  textAlign?: TableCellAlign;
  width?: string;
}>`
  ${props => {
    return props.isRowHeader
      ? {}
      : {
          background: props.isInverse
            ? transparentize(0.93, props.theme.colors.neutral100)
            : props.theme.colors.neutral200,
          borderBottom: '2px solid',
          fontWeight: 'bold',
          verticalAlign: 'bottom',
        };
  }}

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

const SortButton = typedStyled.button<{
  density?: TableDensity;
  isInverse?: boolean;
  textAlign?: TableCellAlign;
}>`
  align-items: flex-end;
  background: none;
  border: 0;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  display: flex;
  justify-content: ${props =>
    props.textAlign === TableCellAlign.right ? 'flex-end' : 'flex-start'};
  margin: 0;
  padding: ${props => buildCellPaddingStyle(props.density, props.theme)};
  text-align: left;
  width: 100%;

  &:hover,
  &:focus {
    cursor: pointer;
    background: ${props =>
      props.isInverse
        ? transparentize(0.85, props.theme.colors.neutral100)
        : transparentize(0.93, props.theme.colors.neutral900)};

    svg {
      fill: ${props =>
        props.isInverse
          ? props.theme.colors.neutral100
          : props.theme.colors.neutral700};
    }
  }

  &:focus {
    outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
    outline-offset: -2px;
  }
`;

const IconWrapper = typedStyled.span`
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
    isRowHeader = false,
    isSortable,
    onSort,
    scope = isRowHeader ? TableHeaderCellScope.row : TableHeaderCellScope.col,
    sortDirection,
    testId,
    width,
    ...other
  } = props;
  const theme = React.useContext(ThemeContext);
  const tableContext = React.useContext(TableContext);

  function handleSort() {
    onSort && typeof onSort === 'function' && onSort();
  }

  const SortIcon =
    sortDirection === TableSortDirection.ascending ? (
      <NorthIcon size={theme.iconSizes.small} />
    ) : sortDirection === TableSortDirection.descending ? (
      <SouthIcon size={theme.iconSizes.small} />
    ) : (
      <SortDoubleArrowIcon
        color={
          tableContext.isInverse
            ? transparentize(0.3, theme.colors.neutral100)
            : theme.colors.neutral500
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
      isRowHeader={isRowHeader}
      isSortable={isSortable}
      scope={scope}
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

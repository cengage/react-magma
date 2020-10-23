import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { baseTableCellStyle, buildCellPaddingStyle } from './TableCell';
import {
  TableCellAlign,
  TableContext,
  TableDensity,
  TableSortDirection,
} from './';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  ArrowDoubleIcon,
  ArrowDown2Icon,
  ArrowUp2Icon,
} from 'react-magma-icons';

export interface TableHeaderCellProps
  extends React.HTMLAttributes<HTMLTableHeaderCellElement> {
  align?: any;
  isSortable?: boolean;
  onSort?: () => void;
  scope?: TableHeaderCellScope;
  sortDirection?: TableSortDirection;
  testId?: string;
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
  padding: ${props => buildCellPaddingStyle(props.density)}};
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
  padding-left: 8px;
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
  const theme = React.useContext(ThemeContext);
  const tableContext = React.useContext(TableContext);

  function handleSort() {
    onSort && typeof onSort === 'function' && onSort();
  }

  const SortIcon =
    sortDirection === TableSortDirection.ascending ? (
      <ArrowDown2Icon size={14} />
    ) : sortDirection === TableSortDirection.descending ? (
      <ArrowUp2Icon size={14} />
    ) : (
      <ArrowDoubleIcon
        color={
          tableContext.isInverse
            ? theme.colors.neutral06
            : theme.colors.neutral04
        }
        size={14}
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
          <IconWrapper>{SortIcon}</IconWrapper>
        </SortButton>
      ) : (
        <>{children}</>
      )}
    </StyledTableHeaderCell>
  );
});

TableHeaderCell.displayName = 'TableHeaderCell';

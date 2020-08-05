import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { baseTableCellStyle, buildCellPaddingStyle } from './TableCell';
import {
  TableCellAlign,
  TableContext,
  TableDensity,
  TableSortDirection
} from './';
import { ThemeContext } from '../../theme/ThemeContext';
import { ArrowDoubleIcon } from '../Icon/types/ArrowDoubleIcon';
import { ArrowDown2Icon } from '../Icon/types/ArrowDown2Icon';
import { ArrowUp2Icon } from '../Icon/types/ArrowUp2Icon';

export interface TableHeaderCellProps
  extends React.HTMLAttributes<HTMLTableHeaderCellElement> {
  align?: any;
  isSortable?: boolean;
  onSort?: () => void;
  ref?: any;
  sortDirection?: TableSortDirection;
  testId?: string;
}

const StyledTableHeaderCell = styled.th<{
  density?: TableDensity;
  hasVerticalBorders?: boolean;
  isInverse?: boolean;
  isSortable?: boolean;
  textAlign?: TableCellAlign;
}>`
  background: ${props =>
    props.isInverse ? props.theme.colors.tint02 : props.theme.colors.neutral07};
  border-bottom: 2px solid;
  font-weight: bold;
  vertical-align: bottom;

  ${baseTableCellStyle}

  ${props =>
    props.isSortable &&
    css`
      padding: 0;
    `}
`;

const SortButton = styled.button<{
  density?: TableDensity;
  isInverse?: boolean;
}>`
  align-items: flex-end;
  background: none;
  border: 0;
  color: inherit;
  display: flex;
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
      props.isInverse
        ? props.theme.colors.tint01
        : props.theme.colors.neutral06};

    svg {
      fill: ${props =>
        props.isInverse
          ? props.theme.colors.neutral08
          : props.theme.colors.neutral01};
    }
  }
`;

const IconWrapper = styled.span`
  padding-left: 10px;
`;

export const TableHeaderCell: React.FunctionComponent<TableHeaderCellProps> = React.forwardRef(
  (
    {
      align,
      children,
      isSortable,
      onSort,
      sortDirection,
      testId,
      ...other
    }: TableHeaderCellProps,
    ref: any
  ) => {
    const theme = React.useContext(ThemeContext);
    const tableContext = React.useContext(TableContext);

    function handleSort() {
      if (onSort && typeof onSort === 'function') {
        onSort();

        console.log('HANDLE SORT');
      }
    }

    const SortIcon =
      sortDirection === TableSortDirection.ascending ? (
        <ArrowUp2Icon size={14} />
      ) : sortDirection === TableSortDirection.descending ? (
        <ArrowDown2Icon size={14} />
      ) : (
        <ArrowDoubleIcon
          color={
            tableContext.isInverseContainer
              ? theme.colors.neutral06
              : theme.colors.neutral04
          }
          size={14}
        />
      );

    return (
      <StyledTableHeaderCell
        {...other}
        data-testid={testId}
        density={tableContext.paddingDensity}
        hasVerticalBorders={tableContext.hasVertBorders}
        isInverse={tableContext.isInverseContainer}
        ref={ref}
        isSortable={isSortable}
        textAlign={align ? align : TableCellAlign.left}
        theme={theme}
      >
        {isSortable ? (
          <SortButton
            density={tableContext.paddingDensity}
            isInverse={tableContext.isInverseContainer}
            onClick={handleSort}
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
  }
);

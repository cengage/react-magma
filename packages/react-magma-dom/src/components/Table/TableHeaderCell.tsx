import * as React from 'react';
import styled from '../../theme/styled';
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
  onSort?: any;
  ref?: any;
  sortDirection?: TableSortDirection;
  testId?: string;
}

export function buildCellPaddingStyle(density) {
  switch (density) {
    case 'compact':
      return '5px 10px';
    case 'loose':
      return '20px 30px';
    default:
      return '10px 20px';
  }
}

const StyledTableHeaderCell = styled.th<{
  density?: TableDensity;
  hasVerticalBorders?: boolean;
  isInverse?: boolean;
  isSortable?: boolean;
  textAlign?: TableCellAlign;
}>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.neutral02
      : props.theme.colors.neutral07};
  border-bottom: 2px solid;
  border-right: ${props => (props.hasVerticalBorders ? '1px solid' : 0)};
  border-color: ${props =>
    props.isInverse ? 'rgba(255,255,255,0.4)' : props.theme.colors.neutral06};
  display: table-cell;
  font-weight: bold;
  line-height: 26px;
  padding: ${props =>
    props.isSortable ? '0' : buildCellPaddingStyle(props.density)}};
  text-align: ${props => props.textAlign};
  vertical-align: inherit;
  white-space: nowrap;

  &:last-of-type {
    border-right: 0;
  }
`;

const SortButton = styled.button<{
  density?: TableDensity;
  isInverse?: boolean;
}>`
  background: none;
  border: 0;
  color: inherit;
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
        ? props.theme.colors.neutral01
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
            {children}
            <IconWrapper>{SortIcon}</IconWrapper>
          </SortButton>
        ) : (
          <>{children}</>
        )}
      </StyledTableHeaderCell>
    );
  }
);

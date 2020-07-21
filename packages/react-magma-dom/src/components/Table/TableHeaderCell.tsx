import * as React from 'react';
import styled from '../../theme/styled';
import {
  TableCellAlign,
  TableContext,
  TableDensity,
  TableSortDirection
} from './';
import { ThemeContext } from '../../theme/ThemeContext';
import { ArrowDown2Icon } from '../Icon/types/ArrowDown2Icon';
import { ArrowUp2Icon } from '../Icon/types/ArrowUp2Icon';

export interface TableHeaderCellProps
  extends React.HTMLAttributes<HTMLTableHeaderCellElement> {
  align?: any;
  ref?: any;
  sortable?: boolean;
  sortDirection?: TableSortDirection;
  testId?: string;
}

const StyledTableHeaderCell = styled.th<{
  density?: TableDensity;
  hasVerticalBorders?: boolean;
  isInverse?: boolean;
  sortable?: boolean;
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
  padding: ${props => {
    switch (props.density) {
      case 'compact':
        return '5px 10px';
      case 'loose':
        return '20px 30px';
      default:
        return '10px 20px';
    }
  }};
  text-align: ${props => props.textAlign};
  vertical-align: inherit;
  white-space: nowrap;

  &:last-of-type {
    border-right: 0;
  }
`;

const SortButton = styled.button`
  background: none;
  border: 0;
  margin: 0;
  padding: 0;
`;

const IconWrapper = styled.span`
  padding-left: 10px;
`;

export const TableHeaderCell: React.FunctionComponent<TableHeaderCellProps> = React.forwardRef(
  (
    {
      align,
      children,
      sortable,
      sortDirection,
      testId,
      ...other
    }: TableHeaderCellProps,
    ref: any
  ) => {
    const theme = React.useContext(ThemeContext);
    const tableContext = React.useContext(TableContext);

    const handleSort = () => {
      console.log('handle sort');

      if (tableContext.onSortBtnClick) {
        tableContext.onSortBtnClick();
      }
    };

    const SortIcon =
      sortDirection === TableSortDirection.ascending ? (
        <ArrowUp2Icon size={14} />
      ) : sortDirection === TableSortDirection.descending ? (
        <ArrowDown2Icon size={14} />
      ) : null;

    return (
      <StyledTableHeaderCell
        {...other}
        data-testid={testId}
        density={tableContext.paddingDensity}
        hasVerticalBorders={tableContext.hasVertBorders}
        isInverse={tableContext.isInverseContainer}
        ref={ref}
        textAlign={align ? align : TableCellAlign.left}
        theme={theme}
      >
        {sortable ? (
          <SortButton onClick={handleSort}>
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

import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import {
  TableContext,
  TableRowColor,
  TableCell,
  TableHeaderCell,
  TableCellAlign,
  TableDensity,
  TableSortDirection,
} from './';
import { ThemeContext } from '../../theme/ThemeContext';
import { Checkbox } from '../Checkbox';
import {
  IndeterminateCheckbox,
  IndeterminateCheckboxStatus,
} from '../IndeterminateCheckbox';
import { NorthIcon, SortDoubleArrowIcon, SouthIcon } from 'react-magma-icons';

/**
 * @children required
 */
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * The color scheme of the table row, giving contextual meaning to the content
   */
  color?: TableRowColor;
  headerRowStatus?: IndeterminateCheckboxStatus;
  isSelected?: boolean;
  isSelectableDisabled?: boolean;
  /**
   * Direction by which the column is sorted
   * @default TableSortDirection.none
   */
  sortDirection?: TableSortDirection;
  /**
   * Event that fires when clicking the table header cell sort button
   */
  onSort?: () => void;
  onHeaderRowSelect?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTableRowSelect?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowIndex?: number;
  testId?: string;
}

function buildTableRowBackground(props) {
  switch (props.color) {
    case 'success':
      return props.theme.colors.success;
    case 'warning':
      return props.theme.colors.pop04;
    case 'danger':
      return props.theme.colors.danger;
    case 'info':
      return props.theme.colors.primary;
    default:
      return 'inherit';
  }
}

function buildTableRowColor(props) {
  if (props.color === 'warning') {
    return props.theme.colors.neutral;
  }

  if (props.color) {
    return props.theme.colors.neutral08;
  }

  return 'inherit';
}

const StyledTableRow = styled.tr<{
  color?: string;
  hasHoverStyles?: boolean;
  hasZebraStripes?: boolean;
  isInverse?: boolean;
}>`
  border-bottom: 1px solid
    ${props =>
      props.isInverse
        ? props.theme.colors.tint04
        : props.theme.colors.neutral06};
  color: inherit;
  display: table-row;
  outline: 0;
  vertical-align: top;

  &:last-child {
    border-bottom: 0;
  }

  ${props =>
    !props.color &&
    css`
      &:nth-of-type(even) {
        background: ${props.hasZebraStripes
          ? props.isInverse
            ? props.theme.colors.tint
            : props.theme.colors.tone
          : 'none'};
      }
    `};

  ${props =>
    props.hasHoverStyles &&
    !props.color &&
    css`
    &:hover {
      background: ${
        props.isInverse ? props.theme.colors.tint02 : props.theme.colors.tone02
      };
    `}

  ${props =>
    props.color &&
    css`
      background: ${buildTableRowBackground(props)};
      color: ${buildTableRowColor(props)};
    `};
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
  margin: 0;
  text-align: left;
  width: 100%;
  flex: 1 1 auto;

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
    cursor: pointer;

    svg {
      fill: ${props =>
        props.isInverse
          ? props.theme.colors.neutral08
          : props.theme.colors.neutral};
    }
  }
`;

const SortIconWrapper = styled.span`
  position: relative;
  top: ${props => props.theme.spaceScale.spacing01};
`;

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (props, ref) => {
    const {
      children,
      headerRowStatus,
      isSelected,
      isSelectableDisabled,
      sortDirection,
      onHeaderRowSelect,
      onTableRowSelect,
      rowIndex,
      onSort,
      testId,
      ...other
    } = props;
    const theme = React.useContext(ThemeContext);
    const tableContext = React.useContext(TableContext);

    let isHeaderRow = false;

    React.Children.forEach(children, (child: any) => {
      if (child.type.displayName === 'TableHeaderCell') {
        isHeaderRow = true;
        return;
      }
    });

    function getIsCheckboxInverse() {
      if (props.color && props.color === TableRowColor.warning) {
        return false;
      }
      if (props.color && props.color !== TableRowColor.warning) {
        return true;
      }

      return tableContext.isInverse;
    }

    const [isHovering, setIsHovering] = React.useState(false);

    const handleMouseEnter = () => {
      if (tableContext.isSortableBySelected) setIsHovering(true);
    };

    const handleMouseLeave = () => {
      if (tableContext.isSortableBySelected) setIsHovering(false);
    };

    function handleSort() {
      onSort && typeof onSort === 'function' && onSort();
    }

    const SortIcon =
      sortDirection === TableSortDirection.ascending ? (
        <SouthIcon
          color={
            tableContext.isInverse
              ? theme.colors.neutral06
              : theme.colors.neutral04
          }
          size={theme.iconSizes.small}
          testId="sort-ascending"
        />
      ) : sortDirection === TableSortDirection.descending ? (
        <NorthIcon
          color={
            tableContext.isInverse
              ? theme.colors.neutral06
              : theme.colors.neutral04
          }
          size={theme.iconSizes.small}
          testId="sort-descending"
        />
      ) : (
        <SortDoubleArrowIcon
          color={
            tableContext.isInverse
              ? theme.colors.neutral06
              : theme.colors.neutral04
          }
          size={theme.iconSizes.small}
          testId="sort-none"
        />
      );

    return (
      <StyledTableRow
        {...other}
        data-testid={testId}
        hasHoverStyles={tableContext.hasHoverStyles && !isHeaderRow}
        hasZebraStripes={tableContext.hasZebraStripes}
        isInverse={tableContext.isInverse}
        ref={ref}
        theme={theme}
      >
        {tableContext.isSelectable && isHeaderRow && (
          <TableHeaderCell
            width={theme.spaceScale.spacing05}
            style={{ background: isHovering ? theme.colors.neutral06 : '' }}
          >
            <span style={{ display: 'flex', flexDirection: 'row' }}>
              <IndeterminateCheckbox
                status={headerRowStatus}
                isInverse={getIsCheckboxInverse()}
                labelStyle={{ padding: 0 }}
                labelText="Select all rows"
                isTextVisuallyHidden
                onChange={onHeaderRowSelect}
              />
              {tableContext.isSortableBySelected && (
                <SortButton
                  density={tableContext.density}
                  isInverse={tableContext.isInverse}
                  onClick={handleSort}
                  textAlign={TableCellAlign.left}
                  theme={theme}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  data-testid={`${testId || ''}-sort-button`}
                >
                  <SortIconWrapper theme={theme}>{SortIcon}</SortIconWrapper>
                </SortButton>
              )}
            </span>
          </TableHeaderCell>
        )}
        {tableContext.isSelectable && !isHeaderRow && (
          <TableCell
            width={theme.spaceScale.spacing05}
            style={{ verticalAlign: 'middle' }}
          >
            <Checkbox
              checked={isSelected}
              disabled={isSelectableDisabled}
              labelStyle={{ padding: 0 }}
              labelText={`Select row ${rowIndex} of ${tableContext.rowCount}`}
              isTextVisuallyHidden
              isInverse={getIsCheckboxInverse()}
              onChange={onTableRowSelect}
            />
          </TableCell>
        )}

        {children}
      </StyledTableRow>
    );
  }
);

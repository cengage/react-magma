import * as React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { NorthIcon, SortDoubleArrowIcon, SouthIcon } from 'react-magma-icons';

import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { Checkbox } from '../Checkbox';
import {
  IndeterminateCheckbox,
  IndeterminateCheckboxStatus,
} from '../IndeterminateCheckbox';

import {
  TableContext,
  TableRowColor,
  TableCell,
  TableHeaderCell,
  TableCellAlign,
  TableDensity,
  TableSortDirection,
} from './';

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
  /**
   * Unique name to be used to identify row for screenreaders
   */
  rowName?: string;
  /**
   * @internal
   */
  testId?: string;
}

function buildTableRowBackground(props) {
  if (props.isInverse) {
    switch (props.color) {
      case 'success':
        return props.theme.colors.success200;
      case 'warning':
        return props.theme.colors.warning200;
      case 'danger':
        return props.theme.colors.danger200;
      case 'info':
        return props.theme.colors.info200;
      default:
        return 'inherit';
    }
  }

  switch (props.color) {
    case 'success':
      return props.theme.colors.success;
    case 'warning':
      return props.theme.colors.warning;
    case 'danger':
      return props.theme.colors.danger;
    case 'info':
      return props.theme.colors.info;
    default:
      return 'inherit';
  }
}

function buildTableRowColor(props) {
  if (props.color && props.isInverse) {
    return props.theme.colors.neutral700;
  }
  if (props.color && !props.isInverse) {
    return props.theme.colors.neutral100;
  }

  return 'inherit';
}

const StyledTableRow = styled.tr<{
  color?: string;
  hasSquareCorners?: boolean;
  hasHoverStyles?: boolean;
  hasZebraStripes?: boolean;
  isInverse?: boolean;
}>`
  border-bottom: 1px solid
    ${props =>
      props.isInverse
        ? transparentize(0.6, props.theme.colors.neutral100)
        : props.theme.colors.neutral300};
  color: inherit;
  display: table-row;
  outline: 0;
  vertical-align: top;

  &:last-child {
    border-bottom: 0;
    td:first-child {
      border-radius: ${props =>
        props.hasSquareCorners ? '0' : `0 0 0 ${props.theme.borderRadius}`};
    }
    td:last-child {
      border-radius: ${props =>
        props.hasSquareCorners ? '0' : `0 0 ${props.theme.borderRadius} 0`};
    }
  }

  ${props =>
    !props.color &&
    css`
      &:nth-of-type(even) {
        background: ${props.hasZebraStripes
          ? props.isInverse
            ? transparentize(0.93, props.theme.colors.neutral100)
            : props.theme.colors.neutral200
          : 'none'};
      }
    `};

  ${props =>
    props.hasHoverStyles &&
    !props.color &&
    css`
    &:hover {
      background: ${
        props.isInverse
          ? transparentize(0.85, props.theme.colors.neutral100)
          : transparentize(0.93, props.theme.colors.neutral900)
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
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  margin: 0;
  text-align: left;
  width: 100%;
  flex: 1 1 auto;

  &:focus {
    outline: 2px solid
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
          ? props.theme.colors.neutral100
          : props.theme.colors.neutral700};
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
      rowName,
      onSort,
      testId,
      ...other
    } = props;
    const theme = React.useContext(ThemeContext);
    const tableContext = React.useContext(TableContext);
    const i18n = React.useContext(I18nContext);

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
        <NorthIcon
          color={
            tableContext.isInverse
              ? theme.colors.neutral100
              : theme.colors.neutral700
          }
          size={theme.iconSizes.small}
          testId="sort-ascending"
        />
      ) : sortDirection === TableSortDirection.descending ? (
        <SouthIcon
          color={
            tableContext.isInverse
              ? theme.colors.neutral100
              : theme.colors.neutral700
          }
          size={theme.iconSizes.small}
          testId="sort-descending"
        />
      ) : (
        <SortDoubleArrowIcon
          color={
            tableContext.isInverse
              ? transparentize(0.3, theme.colors.neutral100)
              : theme.colors.neutral500
          }
          size={theme.iconSizes.small}
          testId="sort-none"
        />
      );

    return (
      <StyledTableRow
        {...other}
        data-testid={testId}
        hasSquareCorners={tableContext.hasSquareCorners}
        hasHoverStyles={tableContext.hasHoverStyles && !isHeaderRow}
        hasZebraStripes={tableContext.hasZebraStripes}
        isInverse={tableContext.isInverse}
        ref={ref}
        theme={theme}
      >
        {tableContext.isSelectable && isHeaderRow && (
          <TableHeaderCell
            width={theme.spaceScale.spacing05}
            style={{
              background: isHovering
                ? transparentize(0.93, theme.colors.neutral900)
                : '',
            }}
          >
            <span style={{ display: 'flex', flexDirection: 'row' }}>
              <IndeterminateCheckbox
                status={headerRowStatus}
                isInverse={getIsCheckboxInverse()}
                labelStyle={{ padding: 0 }}
                labelText={
                  headerRowStatus === IndeterminateCheckboxStatus.unchecked
                    ? i18n.table.selectable.selectAllRowsAriaLabel
                    : i18n.table.selectable.deselectAllRowsAriaLabel
                }
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
                  aria-label={i18n.table.selectable.sortButtonAriaLabel}
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
              labelText={
                isSelected
                  ? `${i18n.table.selectable.deselectRowAriaLabel} ${
                      rowName || ''
                    }`
                  : `${i18n.table.selectable.selectRowAriaLabel} ${
                      rowName || ''
                    }`
              }
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

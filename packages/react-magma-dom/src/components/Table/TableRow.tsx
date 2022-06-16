import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { TableContext, TableRowColor, TableCell, TableHeaderCell } from './';
import { ThemeContext } from '../../theme/ThemeContext';
import { Checkbox } from '../Checkbox';
import {
  IndeterminateCheckbox,
  IndeterminateCheckboxStatus,
} from '../IndeterminateCheckbox';
import { transparentize } from 'polished';

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
  onHeaderRowSelect?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTableRowSelect?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowIndex?: number;
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

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (props, ref) => {
    const {
      children,
      headerRowStatus,
      isSelected,
      isSelectableDisabled,
      onHeaderRowSelect,
      onTableRowSelect,
      rowIndex,
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
          <TableHeaderCell width={theme.spaceScale.spacing05}>
            <IndeterminateCheckbox
              status={headerRowStatus}
              isInverse={getIsCheckboxInverse()}
              labelStyle={{ padding: 0 }}
              labelText="Select all rows"
              isTextVisuallyHidden
              onChange={onHeaderRowSelect}
            />
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

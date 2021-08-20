import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { TableContext, TableRowColor, TableCell, TableHeaderCell } from './';
import { ThemeContext } from '../../theme/ThemeContext';
import { Checkbox } from '../Checkbox';
import {
  IndeterminateCheckbox,
  IndeterminateCheckboxStatus,
} from '../IndeterminateCheckbox';

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

import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { TableContext, TableRowColor } from './';
import { ThemeContext } from '../../theme/ThemeContext';

/**
 * @children required
 */
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * The color scheme of the table row, giving contextual meaning to the content
   */
  color?: TableRowColor;
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
    const { children, testId, ...other } = props;
    const theme = React.useContext(ThemeContext);
    const tableContext = React.useContext(TableContext);

    let isHeaderRow = false;

    tableContext.hasHoverStyles &&
      React.Children.forEach(children, (child: any) => {
        if (child.type.displayName === 'TableHeaderCell') {
          isHeaderRow = true;
          return;
        }
      });

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
        {children}
      </StyledTableRow>
    );
  }
);

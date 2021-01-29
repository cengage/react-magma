import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { TableContext } from './';
import { ThemeContext } from '../../theme/ThemeContext';

/**
 * @children required
 */
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  color?: string; // TODO: change color prop to have type of TableRowColor instead of string
  testId?: string;
}

const StyledTableRow = styled.tr<{
  color?: string;
  hasHoverStyles?: boolean;
  hasZebraStripes?: boolean;
  isInverse?: boolean;
}>`
  border-bottom: 1px solid ${props => props.theme.colors.neutral06};
  color: inherit;
  display: table-row;
  outline: 0;
  vertical-align: top;

  &:nth-of-type(even) {
    background: ${props =>
      props.hasZebraStripes
        ? props.isInverse
          ? props.theme.colors.tint
          : props.theme.colors.tone
        : 'none'};
  }

  &:last-child {
    border-bottom: 0;
  }

  ${props =>
    props.hasHoverStyles &&
    css`
    &:hover {
      background: ${
        props.isInverse ? props.theme.colors.tint02 : props.theme.colors.tone02
      };
    `}

    background: ${props => (props.color ? props.color : 'inherit')};
`;

// TODO: set background color and color to the correct colors from the theme based on the `color` prop
// Make sure this works with zebra stripes, inverse and hover colors

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

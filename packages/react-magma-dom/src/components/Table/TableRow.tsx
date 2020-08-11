import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { TableContext } from './';
import { ThemeContext } from '../../theme/ThemeContext';

export interface TableRowProps extends React.HTMLAttributes<HTMLElement> {
  ref?: any;
  testId?: string;
}

const StyledTableRow = styled.tr<{
  hasHoverStyles?: boolean;
  hasZebraStripes?: boolean;
  isInverse?: boolean;
}>`
  border-bottom: 1px solid ${props => props.theme.colors.neutral06};
  color: inherit;
  display: table-row;
  outline: 0;
  vertical-align: middle;

  &:nth-of-type(even) {
    background: ${props =>
      props.hasZebraStripes
        ? props.isInverse
          ? props.theme.colors.tint01
          : props.theme.colors.tone01
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
`;

export const TableRow: React.FunctionComponent<TableRowProps> = React.forwardRef(
  ({ children, testId, ...other }: TableRowProps, ref: any) => {
    const theme = React.useContext(ThemeContext);
    const tableContext = React.useContext(TableContext);

    return (
      <StyledTableRow
        {...other}
        data-testid={testId}
        hasHoverStyles={tableContext.hasHoverStyle}
        hasZebraStripes={tableContext.hasStripes}
        isInverse={tableContext.isInverseContainer}
        ref={ref}
        theme={theme}
      >
        {children}
      </StyledTableRow>
    );
  }
);

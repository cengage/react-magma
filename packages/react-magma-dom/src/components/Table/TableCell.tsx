import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { TableCellAlign, TableContext, TableDensity } from './';
import { ThemeContext } from '../../theme/ThemeContext';

export interface TableCellProps
  extends React.HTMLAttributes<HTMLTableCellElement> {
  align?: TableCellAlign;
  testId?: string;
  width?: string | number;
}

export const baseTableCellStyle = props => css`
  border-right: ${props.hasVerticalBorders ? '1px solid' : 0};
  border-color: ${props.isInverse
    ? props.theme.colors.tint04
    : props.theme.colors.neutral06};
  display: table-cell;
  line-height: 24px;
  padding: ${buildCellPaddingStyle(props.density)};
  text-align: ${props.textAlign};

  &:last-of-type {
    border-right: 0;
  }
`;

export function buildCellPaddingStyle(density) {
  switch (density) {
    case 'compact':
      return '4px 8px';
    case 'loose':
      return '24px 36px';
    default:
      return '12px 16px';
  }
}

const StyledCell = styled.td<{
  density?: TableDensity;
  hasVerticalBorders?: boolean;
  isInverse?: boolean;
  textAlign?: TableCellAlign;
  width?: string;
}>`
  ${baseTableCellStyle}

  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}
`;

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  (props, ref) => {
    const { align, children, testId, width, ...other } = props;
    const tableContext = React.useContext(TableContext);
    const theme = React.useContext(ThemeContext);

    const widthString = typeof width === 'number' ? `${width}px` : width;

    return (
      <StyledCell
        {...other}
        data-testid={testId}
        density={tableContext.density}
        hasVerticalBorders={tableContext.hasVerticalBorders}
        isInverse={tableContext.isInverse}
        ref={ref}
        textAlign={align || TableCellAlign.left}
        theme={theme}
        width={widthString}
      >
        {children}
      </StyledCell>
    );
  }
);

TableCell.displayName = 'TableCell';

import * as React from 'react';
import { css } from '@emotion/core';
import { TableCellAlign, TableContext, TableDensity } from './Table';
import { ThemeContext } from '../../theme/ThemeContext';
import { transparentize } from 'polished';
import styled from '@emotion/styled';

export interface TableCellProps
  extends React.HTMLAttributes<HTMLTableCellElement> {
  /**
   * Text alignment of the cell content. Right alignment should be used for numeric values
   * @default TableCellAlign.left
   */
  align?: TableCellAlign;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Width of the component, set by CSS
   * @default auto
   */
  width?: string | number;
}

export const baseTableCellStyle = props => css`
  border-right: ${props.hasVerticalBorders ? '1px solid' : 0};
  border-color: ${props.isInverse
    ? transparentize(0.6, props.theme.colors.neutral100)
    : props.theme.colors.neutral300};
  display: table-cell;
  font-size: inherit;
  line-height: inherit;
  padding: ${buildCellPaddingStyle(props.density, props.theme)};
  text-align: ${props.textAlign};

  &:last-of-type {
    border-right: 0;
  }
`;

export function buildCellPaddingStyle(density, theme: any) {
  switch (density) {
    case 'compact':
      return `${theme.spaceScale.spacing02} ${theme.spaceScale.spacing03}`;
    case 'loose':
      return `${theme.spaceScale.spacing06} ${theme.spaceScale.spacing08}`;

    default:
      return `${theme.spaceScale.spacing04} ${theme.spaceScale.spacing05}`;
  }
}

const StyledCell = styled.td<{
  density?: TableDensity;
  hasVerticalBorders?: boolean;
  isInverse?: boolean;
  textAlign?: TableCellAlign;
  theme?: any;
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

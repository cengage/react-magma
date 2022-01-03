import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { TableCellAlign, TableContext, TableDensity } from './Table';

export interface TableCellProps
  extends React.HTMLAttributes<HTMLTableCellElement> {
  /**
   * Text alignment of the cell content. Right alignment should be used for numeric values
   * @default TableCellAlign.left
   */
  align?: TableCellAlign;
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
    ? 'var(--colors-tint04)'
    : 'var(--colors-neutral06)'};
  display: table-cell;
  font-size: inherit;
  line-height: inherit;
  padding: ${buildCellPaddingStyle(props.density)};
  text-align: ${props.textAlign};

  &:last-of-type {
    border-right: 0;
  }
`;

export function buildCellPaddingStyle(density) {
  switch (density) {
    case 'compact':
      return 'var(--spaceScale-spacing02) var(--spaceScale-spacing03)';
    case 'loose':
      return 'var(--spaceScale-spacing06) var(--spaceScale-spacing08)';

    default:
      return 'var(--spaceScale-spacing04) var(--spaceScale-spacing05)';
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
        width={widthString}
      >
        {children}
      </StyledCell>
    );
  }
);

TableCell.displayName = 'TableCell';

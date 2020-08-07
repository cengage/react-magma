import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { TableCellAlign, TableContext, TableDensity } from './';
import { ThemeContext } from '../../theme/ThemeContext';

export interface TableCellProps
  extends React.HTMLAttributes<HTMLTableCellElement> {
  align?: TableCellAlign;
  ref?: any;
  testId?: string;
  width?: string | number;
}

export const baseTableCellStyle = props => css`
  border-right: ${props.hasVerticalBorders ? '1px solid' : 0};
  border-color: ${props.isInverse
    ? props.theme.colors.tint03
    : props.theme.colors.neutral06};
  display: table-cell;
  line-height: 26px;
  padding: ${buildCellPaddingStyle(props.density)};
  text-align: ${props.textAlign};

  &:last-of-type {
    border-right: 0;
  }
`;

export function buildCellPaddingStyle(density) {
  switch (density) {
    case 'compact':
      return '5px 10px';
    case 'loose':
      return '20px 30px';
    default:
      return '10px 20px';
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

export const TableCell: React.FunctionComponent<TableCellProps> = React.forwardRef(
  ({ align, children, testId, width, ...other }: TableCellProps, ref: any) => {
    const tableContext = React.useContext(TableContext);
    const theme = React.useContext(ThemeContext);

    const widthString = typeof width === 'number' ? `${width}px` : width;

    return (
      <StyledCell
        {...other}
        data-testid={testId}
        density={tableContext.paddingDensity}
        hasVerticalBorders={tableContext.hasVertBorders}
        isInverse={tableContext.isInverseContainer}
        ref={ref}
        textAlign={align ? align : TableCellAlign.left}
        theme={theme}
        width={widthString}
      >
        {children}
      </StyledCell>
    );
  }
);

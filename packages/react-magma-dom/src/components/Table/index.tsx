import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  density?: TableDensity;
  hasHoverStyles?: boolean;
  hasVerticalBorders?: boolean;
  hasZebraStripes?: boolean;
  isInverse?: boolean;
  minWidth?: number;
  ref?: any;
  testId?: string;
}

export enum TableDensity {
  compact = 'compact',
  loose = 'loose',
  normal = 'normal' // default
}

export enum TableCellAlign {
  center = 'center',
  inherit = 'inherit',
  justify = 'justify',
  left = 'left', // default
  right = 'right'
}

export enum TableSortDirection {
  ascending = 'ascending',
  descending = 'descending',
  none = 'none' // default
}

interface TableContextInterface {
  paddingDensity?: TableDensity;
  hasHoverStyle?: boolean;
  hasVertBorders?: boolean;
  hasStripes?: boolean;
  isInverseContainer?: boolean;
}

export const TableContext = React.createContext<TableContextInterface>({
  paddingDensity: TableDensity.normal,
  hasHoverStyle: false,
  hasStripes: false,
  hasVertBorders: false,
  isInverseContainer: false
});

const TableContainer = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table<{ isInverse?: boolean; minWidth: number }>`
  border-collapse: collapse;
  border-spacing: 0;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral01};
  display: table;
  min-width: ${props => props.minWidth}px;
  width: 100%;
`;

export const Table: React.FunctionComponent<TableProps> = React.forwardRef(
  (
    {
      children,
      density,
      hasHoverStyles,
      hasVerticalBorders,
      hasZebraStripes,
      isInverse,
      minWidth,
      testId,
      ...other
    }: TableProps,
    ref: any
  ) => {
    const theme = React.useContext(ThemeContext);

    const [hasVertBorders, setHasVertBorders] = React.useState(
      Boolean(hasVerticalBorders)
    );

    React.useEffect(() => {
      setHasVertBorders(Boolean(hasVerticalBorders));
    }, [hasVerticalBorders]);

    const [hasStripes, setHasStripes] = React.useState(
      Boolean(hasZebraStripes)
    );

    React.useEffect(() => {
      setHasStripes(Boolean(hasZebraStripes));
    }, [hasZebraStripes]);

    const [hasHoverStyle, setHasHoverStyle] = React.useState(
      Boolean(hasHoverStyles)
    );

    React.useEffect(() => {
      setHasHoverStyle(Boolean(hasHoverStyles));
    }, [hasHoverStyles]);

    const [paddingDensity, setPaddingDensity] = React.useState(density);

    React.useEffect(() => {
      setPaddingDensity(density);
    }, [density]);

    React.useEffect(() => {
      setHasStripes(Boolean(hasZebraStripes));
    }, [hasZebraStripes]);

    const [isInverseContainer, setIsInverseContainer] = React.useState(
      isInverse
    );

    React.useEffect(() => {
      setIsInverseContainer(isInverse);
    }, [isInverse]);

    return (
      <TableContext.Provider
        value={{
          hasHoverStyle,
          hasStripes,
          hasVertBorders,
          isInverseContainer,
          paddingDensity
        }}
      >
        <TableContainer>
          <StyledTable
            {...other}
            data-testid={testId}
            isInverse={isInverse}
            minWidth={minWidth ? minWidth : theme.breakpoints.small}
            ref={ref}
            theme={theme}
          >
            {children}
          </StyledTable>
        </TableContainer>
      </TableContext.Provider>
    );
  }
);

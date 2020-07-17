import * as React from 'react';
import styled from '../../theme/styled';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  density?: TableDensity;
  hasVerticalBorders?: boolean;
  hasZebraStripes?: boolean;
  ref?: any;
  testId?: string;
}

export enum TableDensity {
  compact = 'compact',
  loose = 'loose',
  normal = 'normal' // default
}

interface TableContextInterface {
  paddingDensity?: TableDensity;
  hasVertBorders?: boolean;
  hasStripes?: boolean;
}

export const TableContext = React.createContext<TableContextInterface>({
  paddingDensity: TableDensity.normal,
  hasVertBorders: false,
  hasStripes: false
});

const StyledTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  display: table;
  width: 100%;
`;

export const Table: React.FunctionComponent<TableProps> = React.forwardRef(
  (
    {
      children,
      density,
      hasVerticalBorders,
      hasZebraStripes,
      testId,
      ...other
    }: TableProps,
    ref: any
  ) => {
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

    const [paddingDensity, setPaddingDensity] = React.useState(density);

    React.useEffect(() => {
      setPaddingDensity(density);
    }, [density]);

    return (
      <TableContext.Provider
        value={{ hasStripes, hasVertBorders, paddingDensity }}
      >
        <StyledTable {...other} ref={ref} data-testid={testId}>
          {children}
        </StyledTable>
      </TableContext.Provider>
    );
  }
);

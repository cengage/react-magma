import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

import { Card } from '../Card';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableHeaderCellScope,
} from '../Table';

export interface DataTableProps {
  data?: any;
}

const StyledTableHeaderCell = styled(TableHeaderCell)`
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  margin-top: 12px;
`;

export const DataTable = props => {
  const { data } = props;

  const theme = React.useContext(ThemeContext);

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableHeaderCell style={{ width: '160px' }} theme={theme} />
            <StyledTableHeaderCell theme={theme}>Jan</StyledTableHeaderCell>
            <StyledTableHeaderCell theme={theme}>Feb</StyledTableHeaderCell>
            <StyledTableHeaderCell theme={theme}>Mar</StyledTableHeaderCell>
            <StyledTableHeaderCell theme={theme}>April</StyledTableHeaderCell>
            <StyledTableHeaderCell theme={theme}>May</StyledTableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((dataset, i) => (
            <TableRow key={i}>
              <StyledTableHeaderCell
                scope={TableHeaderCellScope.row}
                style={{
                  borderRight: '2px solid #dfdfdf',
                  borderBottom: 0,
                }}
                theme={theme}
              >
                Team {i + 1}
              </StyledTableHeaderCell>
              <TableCell>${dataset[0].y * 10}k</TableCell>
              <TableCell>${dataset[1].y * 10}k</TableCell>
              <TableCell>${dataset[2].y * 10}k</TableCell>
              <TableCell>${dataset[3].y * 10}k</TableCell>
              <TableCell>${dataset[4].y * 10}k</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableHeaderCellScope,
} from 'react-magma-dom';

export interface DataTableProps {
  data?: any;
}

export const DataTable = props => {
  const { data } = props;

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell style={{ width: '160px' }} />
            <TableHeaderCell>Jan</TableHeaderCell>
            <TableHeaderCell>Feb</TableHeaderCell>
            <TableHeaderCell>Mar</TableHeaderCell>
            <TableHeaderCell>April</TableHeaderCell>
            <TableHeaderCell>May</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((dataset, i) => (
            <TableRow key={i}>
              <TableHeaderCell
                scope={TableHeaderCellScope.row}
                style={{
                  borderRight: '1px solid #dfdfdf',
                  borderBottom: 0,
                }}
              >
                Team {i + 1}
              </TableHeaderCell>
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

import React from 'react';
import { Card } from '../Card';
import { Table } from '.';
import { TableHead } from './TableHead';
import { TableRow } from './TableRow';
import { TableHeaderCell } from './TableHeaderCell';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';

export default {
  component: Table,
  title: 'Table',
};

export const Default = () => {
  return (
    <>
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Column</TableHeaderCell>
              <TableHeaderCell>Column</TableHeaderCell>
              <TableHeaderCell>Column</TableHeaderCell>
              <TableHeaderCell>Column</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow color="green">
              <TableCell>Lorem ipsum dolor sit amet consectetur</TableCell>
              <TableCell>Lorem ipsum dolor</TableCell>
              <TableCell>Lorem ipsum dolor</TableCell>
              <TableCell>Lorem ipsum</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lorem ipsum dolor sit amet</TableCell>
              <TableCell>Lorem ipsum dolor</TableCell>
              <TableCell>Lorem ipsum dolor</TableCell>
              <TableCell>Lorem ipsum</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

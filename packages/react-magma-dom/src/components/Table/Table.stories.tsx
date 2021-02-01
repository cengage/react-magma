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
  const rows = [
    [
      'Lorem ipsum dolor sit amet consectetur',
      'Lorem ipsum dolor',
      'Lorem ipsum dolor',
      'Lorem ipsum',
    ],
    [
      'Lorem ipsum dolor sit amet',
      'Lorem ipsum dolor',
      'Lorem ipsum dolor',
      'Lorem ipsum',
    ],
    [
      'Lorem ipsum dolor',
      'Lorem ipsum dolor',
      'Lorem ipsum dolor',
      'Lorem ipsum',
    ],
    [
      'Lorem ipsum dolor sit amet consectetur',
      'Lorem ipsum dolor',
      'Lorem ipsum dolor',
      'Lorem ipsum',
    ],
    [
      'Lorem ipsum dolor sit amet',
      'Lorem ipsum dolor',
      'Lorem ipsum dolor',
      'Lorem ipsum',
    ],
    [
      'Lorem ipsum dolor',
      'Lorem ipsum dolor',
      'Lorem ipsum dolor',
      'Lorem ipsum',
    ],
  ];

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
            {rows.map((row, i) => (
              <TableRow key={`row${i}`}>
                {row.map((cell, j) => (
                  <TableCell key={`cell${i}_${j}`}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

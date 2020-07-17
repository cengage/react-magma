import React from 'react';
import { Table } from '.';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableHead } from './TableHead';
import { TableHeaderCell } from './TableHeaderCell';
import { TableRow } from './TableRow';

import { magma } from '../../theme/magma';

import { render } from '@testing-library/react';

describe('Table', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Table testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render table with vertical borders', () => {
    const { getByText } = render(
      <Table hasVerticalBorders>
        <TableHead>
          <TableRow>
            <TableHeaderCell>heading 1</TableHeaderCell>
            <TableHeaderCell>heading 2</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>cell 1</TableCell>
            <TableCell>cell 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(getByText('cell 1')).toHaveStyleRule('border-right', '1px solid');
    expect(getByText('heading 1')).toHaveStyleRule('border-right', '1px solid');
  });

  it('should render table with zebra striping', () => {
    const { getByTestId } = render(
      <Table hasZebraStripes>
        <TableBody>
          <TableRow testId="row1">
            <TableCell>cell 1</TableCell>
            <TableCell>cell 2</TableCell>
          </TableRow>
          <TableRow testId="row2">
            <TableCell>cell 1</TableCell>
            <TableCell>cell 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(getByTestId('row2')).toHaveStyleRule(
      'background',
      magma.colors.neutral07,
      {
        target: ':nth-of-type(even)'
      }
    );
  });

  it('should render table with compact density ', () => {
    const { getByText } = render(
      <Table density="compact">
        <TableHead>
          <TableRow>
            <TableHeaderCell>heading 1</TableHeaderCell>
            <TableHeaderCell>heading 2</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>cell 1</TableCell>
            <TableCell>cell 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(getByText('cell 1')).toHaveStyleRule('padding', '5px 10px');
    expect(getByText('heading 1')).toHaveStyleRule('padding', '5px 10px');
  });

  it('should render table with loose density ', () => {
    const { getByText } = render(
      <Table density="loose">
        <TableHead>
          <TableRow>
            <TableHeaderCell>heading 1</TableHeaderCell>
            <TableHeaderCell>heading 2</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>cell 1</TableCell>
            <TableCell>cell 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(getByText('cell 1')).toHaveStyleRule('padding', '20px 30px');
    expect(getByText('heading 1')).toHaveStyleRule('padding', '20px 30px');
  });
});

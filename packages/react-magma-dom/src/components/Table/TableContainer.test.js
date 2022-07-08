import React from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '.';

import { magma } from '../../theme/magma';

import { render } from '@testing-library/react';
import { transparentize } from 'polished';

describe('Table', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Table testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render table with a border', () => {
    const { getByTestId } = render(
      <TableContainer hasOuterBorder testId="test-id">
        <Table>
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
      </TableContainer>
    );

    expect(getByTestId('test-id')).toHaveStyleRule(
      'box-shadow',
      `0 0 0 1px ${magma.colors.neutral300}`
    );
  });

  it('should render table with an inverse border', () => {
    const { getByTestId } = render(
      <TableContainer hasOuterBorder isInverse testId="test-id">
        <Table>
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
      </TableContainer>
    );

    expect(getByTestId('test-id')).toHaveStyleRule(
      'box-shadow',
      `0 0 0 1px ${transparentize(0.6, magma.colors.neutral100)}`
    );
  });

  it('should render table with a border radius', () => {
    const { getByTestId } = render(
      <TableContainer hasOuterBorder isInverse testId="test-id">
        <Table>
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
      </TableContainer>
    );

    expect(getByTestId('test-id')).toHaveStyleRule(
      'border-radius',
      magma.spaceScale.spacing03
    );
  });

  it('should render table without a border radius', () => {
    const { getByTestId } = render(
      <TableContainer
        hasOuterBorder
        hasSquareCorners
        isInverse
        testId="test-id"
      >
        <Table>
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
      </TableContainer>
    );

    expect(getByTestId('test-id')).toHaveStyleRule('border-radius', '0');
  });
});

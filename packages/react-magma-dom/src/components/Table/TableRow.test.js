import React from 'react';
import { Table, TableBody, TableCell, TableRow, TableRowColor } from '.';
import { render } from '@testing-library/react';
import { magma } from '../../theme/magma';

describe('Table Row', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Table>
        <TableBody>
          <TableRow testId={testId}>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  describe('colors', () => {
    it('should render a table row with success styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Table>
          <TableBody>
            <TableRow color={TableRowColor.success} testId={testId}>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        magma.colors.success
      );
      expect(getByTestId(testId)).toHaveStyleRule(
        'color',
        magma.colors.neutral100
      );
    });

    it('should render a table row with danger styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Table>
          <TableBody>
            <TableRow color={TableRowColor.danger} testId={testId}>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        magma.colors.danger
      );
      expect(getByTestId(testId)).toHaveStyleRule(
        'color',
        magma.colors.neutral100
      );
    });

    it('should render a table row with warning styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Table>
          <TableBody>
            <TableRow color={TableRowColor.warning} testId={testId}>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        magma.colors.warning
      );
      expect(getByTestId(testId)).toHaveStyleRule(
        'color',
        magma.colors.neutral100
      );
    });

    it('should render a table row with info styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Table>
          <TableBody>
            <TableRow color={TableRowColor.info} testId={testId}>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        magma.colors.info
      );
      expect(getByTestId(testId)).toHaveStyleRule(
        'color',
        magma.colors.neutral100
      );
    });
  });
});

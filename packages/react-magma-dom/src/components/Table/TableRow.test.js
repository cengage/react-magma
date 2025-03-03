import React from 'react';

import { render } from '@testing-library/react';

import { magma } from '../../theme/magma';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableRowColor,
  TableSortDirection,
  TableHeaderCell,
} from '.';

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

  describe('sortable', () => {
    it('should call onSort function when icon is clicked', () => {
      const testId = 'sortable-test-id';
      const onSortSpy = jest.fn();
      const { getByTestId } = render(
        <Table isSelectable isSortableBySelected>
          <TableHead>
            <TableRow
              testId={testId}
              sortDirection={TableSortDirection.none}
              onSort={onSortSpy}
            >
              <TableHeaderCell>heading 1</TableHeaderCell>
              <TableHeaderCell>heading 2</TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      );

      const sortButton = getByTestId('sortable-test-id-sort-button');
      sortButton.click();
      expect(onSortSpy).toHaveBeenCalled();
    });

    describe('should display the correct sort direction icon', () => {
      it('should show ascending', () => {
        const sortTestId = 'sort-ascending';
        const onSortFunc = jest.fn();
        const { getByTestId } = render(
          <Table isSelectable isSortableBySelected>
            <TableHead>
              <TableRow
                sortDirection={TableSortDirection.ascending}
                onSort={onSortFunc}
              >
                <TableHeaderCell>heading 1</TableHeaderCell>
                <TableHeaderCell>heading 2</TableHeaderCell>
              </TableRow>
            </TableHead>
          </Table>
        );
        expect(getByTestId(sortTestId)).toBeInTheDocument();
      });

      it('should show descending', () => {
        const sortTestId = 'sort-descending';
        const onSortFunc = jest.fn();
        const { getByTestId } = render(
          <Table isSelectable isSortableBySelected>
            <TableHead>
              <TableRow
                sortDirection={TableSortDirection.descending}
                onSort={onSortFunc}
              >
                <TableHeaderCell>heading 1</TableHeaderCell>
                <TableHeaderCell>heading 2</TableHeaderCell>
              </TableRow>
            </TableHead>
          </Table>
        );
        expect(getByTestId(sortTestId)).toBeInTheDocument();
      });

      it('should show double arrow', () => {
        const sortTestId = 'sort-none';
        const onSortFunc = jest.fn();
        const { getByTestId } = render(
          <Table isSelectable isSortableBySelected>
            <TableHead>
              <TableRow
                sortDirection={TableSortDirection.none}
                onSort={onSortFunc}
              >
                <TableHeaderCell>heading 1</TableHeaderCell>
                <TableHeaderCell>heading 2</TableHeaderCell>
              </TableRow>
            </TableHead>
          </Table>
        );
        expect(getByTestId(sortTestId)).toBeInTheDocument();
      });
    });
  });
});

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

  it('should have border bottom', () => {
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

    expect(getByTestId(testId)).toHaveStyleRule(
      'border-bottom',
      `1px solid ${magma.colors.neutral200}`
    );
  });

  it('should have border bottom when table row is inverse', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Table isInverse>
        <TableBody>
          <TableRow testId={testId}>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(getByTestId(testId)).toHaveStyleRule(
      'border-bottom',
      `1px solid ${magma.colors.neutral800}`
    );
  });

  it('should not have border bottom when table row has color', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Table>
        <TableBody>
          <TableRow testId={testId} color={TableRowColor.info}>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(getByTestId(testId)).toHaveStyle('border-bottom: 0');
  });

  it('should not have border bottom when table row has zebra stripe and does not have pagination', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Table hasZebraStripes hasTablePagination={false}>
        <TableBody>
          <TableRow testId={testId}>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(getByTestId(testId)).toHaveStyle('border-bottom: 0');
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
        magma.colors.neutral0
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
        magma.colors.neutral0
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
        magma.colors.yellow400
      );
      expect(getByTestId(testId)).toHaveStyleRule(
        'color',
        magma.colors.brand.navy
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
        magma.colors.neutral0
      );
    });

    it.each([
      [TableRowColor.success, magma.colors.green500, magma.colors.green1000],
      [TableRowColor.warning, magma.colors.yellow400, magma.colors.brand.navy],
      [TableRowColor.danger, magma.colors.red500, magma.colors.red1000],
      [TableRowColor.info, magma.colors.blue500, magma.colors.blue1000],
    ])(
      'should render an inverse %s row with the rebrand colors',
      (color, background, text) => {
        const { getByTestId } = render(
          <Table isInverse>
            <TableBody>
              <TableRow color={color} testId="inverse-row">
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        );

        expect(getByTestId('inverse-row')).toHaveStyleRule(
          'background',
          background
        );
        expect(getByTestId('inverse-row')).toHaveStyleRule('color', text);
      }
    );
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

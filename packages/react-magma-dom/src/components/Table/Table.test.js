import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '.';

import { magma } from '../../theme/magma';

import { act, render, fireEvent } from '@testing-library/react';
import { transparentize } from 'polished';

describe('Table', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Table testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render table with a border radius', () => {
    const { getByTestId } = render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell testId="heading-1">heading 1</TableHeaderCell>
            <TableHeaderCell testId="heading-2">heading 2</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow testId="table-row-2">
            <TableCell>cell 1</TableCell>
            <TableCell>cell 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(getByTestId('heading-1')).toHaveStyleRule(
      'border-radius',
      `${magma.borderRadius} 0 0 0`,
      { target: 'first-child' }
    );
    expect(getByTestId('heading-2')).toHaveStyleRule(
      'border-radius',
      `0 ${magma.borderRadius} 0 0`,

      { target: 'last-child' }
    );
    expect(getByTestId('table-row-2')).toHaveStyleRule(
      'border-radius',
      `0 0 0 ${magma.borderRadius}`,

      { target: 'first-child' }
    );
    expect(getByTestId('table-row-2')).toHaveStyleRule(
      'border-radius',
      `0 0 ${magma.borderRadius} 0`,
      { target: 'last-child' }
    );
  });

  it('should render table without a border radius', () => {
    const { getByTestId } = render(
      <Table hasSquareCorners>
        <TableHead>
          <TableRow>
            <TableHeaderCell testId="heading-1">heading 1</TableHeaderCell>
            <TableHeaderCell testId="heading-2">heading 2</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow testId="table-row-2">
            <TableCell>cell 1</TableCell>
            <TableCell>cell 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(getByTestId('heading-1')).toHaveStyleRule('border-radius', '0', {
      target: 'first-child',
    });
    expect(getByTestId('heading-2')).toHaveStyleRule(
      'border-radius',
      '0',

      { target: 'last-child' }
    );
    expect(getByTestId('table-row-2')).toHaveStyleRule(
      'border-radius',
      '0',

      { target: 'first-child' }
    );
    expect(getByTestId('table-row-2')).toHaveStyleRule('border-radius', '0', {
      target: 'last-child',
    });
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
      magma.colors.neutral200,
      {
        target: ':nth-of-type(even)',
      }
    );
  });

  it('should render table with hover styles', () => {
    const { getByTestId } = render(
      <Table hasHoverStyles>
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
      transparentize(0.93, magma.colors.neutral900),
      {
        target: ':hover',
      }
    );
  });

  it('should render table with compact density', () => {
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

    expect(getByText('cell 1')).toHaveStyleRule(
      'padding',
      `${magma.spaceScale.spacing02} ${magma.borderRadius}`
    );
    expect(getByText('heading 1')).toHaveStyleRule(
      'padding',
      `${magma.spaceScale.spacing02} ${magma.borderRadius}`
    );
  });

  it('should render table with loose density', () => {
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

    expect(getByText('cell 1')).toHaveStyleRule(
      'padding',
      `${magma.spaceScale.spacing06} ${magma.spaceScale.spacing08}`
    );
    expect(getByText('heading 1')).toHaveStyleRule(
      'padding',
      `${magma.spaceScale.spacing06} ${magma.spaceScale.spacing08}`
    );
  });

  it('should render table with inverse styles', () => {
    const { getByTestId, getByText } = render(
      <Table hasZebraStripes hasHoverStyles isInverse>
        <TableHead>
          <TableRow>
            <TableHeaderCell>heading 1</TableHeaderCell>
            <TableHeaderCell>heading 2</TableHeaderCell>
          </TableRow>
        </TableHead>
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

    expect(getByText('heading 1')).toHaveStyleRule(
      'background',
      transparentize(0.93, magma.colors.neutral100)
    );

    expect(getByTestId('row1')).toHaveStyleRule(
      'background',
      transparentize(0.85, magma.colors.neutral100),
      {
        target: ':hover',
      }
    );

    expect(getByTestId('row2')).toHaveStyleRule(
      'background',
      transparentize(0.93, magma.colors.neutral100),
      {
        target: ':nth-of-type(even)',
      }
    );
  });

  it('should render right aligned cells', () => {
    const { getByText, getByTestId } = render(
      <Table hasZebraStripes isInverse>
        <TableHead>
          <TableRow>
            <TableHeaderCell align="right" testId="heading1">
              heading 1
            </TableHeaderCell>
            <TableHeaderCell align="right" isSortable testId="heading2">
              heading 2
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="right">cell 1</TableCell>
            <TableCell>cell 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(getByTestId('heading1')).toHaveStyleRule('text-align', 'right');
    expect(getByText('cell 1')).toHaveStyleRule('text-align', 'right');
    expect(getByTestId('heading2').querySelector('button')).toHaveStyleRule(
      'justify-content',
      'flex-end'
    );
  });

  it('should render table cells with specified widths', () => {
    const { getByText } = render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell width={100}>heading 1</TableHeaderCell>
            <TableHeaderCell width="50%">heading 2</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell width={100}>cell 1</TableCell>
            <TableCell width="50%">cell 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(getByText('heading 1')).toHaveStyleRule('width', '100px');
    expect(getByText('cell 1')).toHaveStyleRule('width', '100px');
    expect(getByText('heading 2')).toHaveStyleRule('width', '50%');
    expect(getByText('cell 2')).toHaveStyleRule('width', '50%');
  });

  it('should render table header cells with specified scope', () => {
    const { getByText } = render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell scope="row">heading</TableHeaderCell>
          </TableRow>
        </TableHead>
      </Table>
    );

    expect(getByText('heading')).toHaveAttribute('scope', 'row');
  });

  it('should render sortable table header cells', () => {
    const onSortSpy = jest.fn();

    const { getByTestId, getByText } = render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell
              testId="header1"
              isSortable
              sortDirection="ascending"
              onSort={onSortSpy}
            >
              heading 1
            </TableHeaderCell>
            <TableHeaderCell testId="header2" isSortable onSort={onSortSpy}>
              heading 2
            </TableHeaderCell>
            <TableHeaderCell testId="header3">heading 3</TableHeaderCell>
          </TableRow>
        </TableHead>
      </Table>
    );

    expect(getByTestId('header1')).toHaveStyleRule('padding', '0');
    expect(getByTestId('header1').querySelector('button')).toBeInTheDocument();

    expect(getByTestId('header3')).toHaveStyleRule(
      'padding',
      `${magma.spaceScale.spacing04} ${magma.spaceScale.spacing05}`
    );
    expect(
      getByTestId('header3').querySelector('button')
    ).not.toBeInTheDocument();

    act(() => {
      expect(onSortSpy).not.toHaveBeenCalled();
    });

    fireEvent.click(getByText('heading 1'));

    act(() => {
      expect(onSortSpy).toHaveBeenCalled();
    });
  });

  it('should render sortable table header cells with inverse styles', () => {
    const { getByTestId } = render(
      <Table isInverse>
        <TableHead>
          <TableRow>
            <TableHeaderCell
              testId="header1"
              isSortable
              sortDirection="descending"
            >
              heading 1
            </TableHeaderCell>
          </TableRow>
        </TableHead>
      </Table>
    );

    const button = getByTestId('header1').querySelector('button');

    expect(button).toBeInTheDocument();

    expect(button).toHaveStyleRule(
      'outline',
      `2px solid ${magma.colors.focusInverse}`,
      {
        target: ':focus',
      }
    );

    expect(button).toHaveStyleRule(
      'background',
      transparentize(0.85, magma.colors.neutral100),
      {
        target: ':hover',
      }
    );
  });
});

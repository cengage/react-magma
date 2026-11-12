import React from 'react';

import { act, fireEvent, getByTestId, render } from '@testing-library/react';
import { transparentize } from 'polished';

import { magma } from '../../theme/magma';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '.';

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

  it('should render the regular table color tokens', () => {
    const { getByTestId } = render(
      <Table hasOutsideBorder hasVerticalBorders testId="table">
        <TableHead>
          <TableRow>
            <TableHeaderCell
              isSortable
              sortDirection="ascending"
              testId="active-header"
            >
              Active heading
            </TableHeaderCell>
            <TableHeaderCell isSortable testId="inactive-header">
              Inactive heading
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell testId="cell">cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(getByTestId('table')).toHaveStyleRule(
      'color',
      magma.colors.brand.navy
    );
    expect(getByTestId('active-header')).toHaveStyleRule(
      'background',
      magma.colors.neutral150
    );
    expect(getByTestId('active-header')).toHaveStyleRule(
      'border-color',
      magma.colors.neutral200
    );
    expect(getByTestId('active-header')).toHaveStyleRule(
      'font-size',
      magma.typeScale.size02.fontSize
    );
    expect(
      getByTestId('active-header').querySelector('button')
    ).toHaveStyleRule('color', magma.colors.brand.navy);
    expect(
      getByTestId('active-header').querySelector('button')
    ).toHaveStyleRule('font-size', magma.typeScale.size02.fontSize);
    expect(getByTestId('sort-ascending')).toHaveAttribute(
      'fill',
      magma.colors.brand.navy
    );
    expect(getByTestId('sort-ascending')).toHaveAttribute('width', '16');
    expect(getByTestId('sort-ascending')).toHaveAttribute('height', '16');
    expect(getByTestId('sort-none')).toHaveAttribute(
      'fill',
      magma.colors.neutral700
    );
    expect(getByTestId('sort-none')).toHaveAttribute('width', '16');
    expect(getByTestId('sort-none')).toHaveAttribute('height', '16');
    expect(getByTestId('cell')).toHaveStyleRule(
      'border-color',
      magma.colors.neutral200
    );
  });

  it('should render the inverse table color tokens', () => {
    const { getByTestId } = render(
      <Table hasOutsideBorder hasVerticalBorders isInverse testId="table">
        <TableHead>
          <TableRow>
            <TableHeaderCell isSortable testId="header">
              Heading
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell testId="cell">cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(getByTestId('header')).toHaveStyleRule(
      'background',
      magma.colors.neutral1000
    );
    expect(getByTestId('header')).toHaveStyleRule(
      'border-color',
      magma.colors.neutral800
    );
    expect(getByTestId('sort-none')).toHaveAttribute(
      'fill',
      magma.colors.neutral500
    );
    expect(getByTestId('cell')).toHaveStyleRule(
      'border-color',
      magma.colors.neutral800
    );
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
      magma.colors.neutral150,
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
      magma.colors.neutral100,
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
      magma.colors.neutral1000
    );

    expect(getByTestId('row1')).toHaveStyleRule(
      'background',
      magma.colors.neutral1000,
      {
        target: ':hover',
      }
    );

    expect(getByTestId('row2')).toHaveStyleRule(
      'background',
      magma.colors.neutral1000,
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

  describe('header cell width', () => {
    const expectNoTruncation = element => {
      expect(element).not.toHaveStyleRule('max-width', expect.anything());
      expect(element).not.toHaveStyleRule('overflow', expect.anything());
      expect(element).not.toHaveStyleRule('text-overflow', expect.anything());
      expect(element).not.toHaveStyleRule('white-space', expect.anything());
    };

    it('should not constrain or truncate header cells when width is not provided', () => {
      const { getByTestId, getByText } = render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell testId="header">Heading</TableHeaderCell>
              <TableHeaderCell isSortable testId="sortable-header">
                Sortable heading
              </TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      );

      ['header', 'sortable-header'].forEach(testId => {
        const header = getByTestId(testId);

        expect(header).not.toHaveStyleRule('width', expect.anything());
        expectNoTruncation(header);
      });

      expectNoTruncation(getByText('Sortable heading'));
    });

    it('should wrap header text instead of truncating it when width is provided', () => {
      const { getByTestId, getByText } = render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell testId="header" width={120}>
                Heading
              </TableHeaderCell>
              <TableHeaderCell isSortable testId="sortable-header" width="25%">
                Sortable heading
              </TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      );

      const header = getByTestId('header');

      expect(header).toHaveStyleRule('width', '120px');
      expectNoTruncation(header);

      const sortableHeader = getByTestId('sortable-header');

      expect(sortableHeader).toHaveStyleRule('width', '25%');
      expectNoTruncation(sortableHeader);
      expectNoTruncation(getByText('Sortable heading'));
    });

    it('should not truncate row header cells when width is provided', () => {
      const { getByText } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableHeaderCell isRowHeader width={120}>
                Row heading
              </TableHeaderCell>
              <TableCell>cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const rowHeader = getByText('Row heading');

      expect(rowHeader).toHaveStyleRule('width', '120px');
      expectNoTruncation(rowHeader);
    });
  });

  describe('header cell line-height', () => {
    it('should use the header type scale line-height for column header cells', () => {
      const { getByTestId } = render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell testId="header">Heading</TableHeaderCell>
              <TableHeaderCell isSortable testId="sortable-header">
                Sortable heading
              </TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(getByTestId('header')).toHaveStyleRule(
        'line-height',
        magma.typeScale.size02.lineHeight
      );
      expect(getByTestId('sortable-header')).toHaveStyleRule(
        'line-height',
        magma.typeScale.size02.lineHeight
      );
      expect(
        getByTestId('sortable-header').querySelector('button')
      ).toHaveStyleRule('line-height', magma.typeScale.size02.lineHeight);
    });

    it('should inherit the table line-height for row header cells', () => {
      const { getByText } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableHeaderCell isRowHeader>Row heading</TableHeaderCell>
              <TableCell>cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      expect(getByText('Row heading')).toHaveStyleRule(
        'line-height',
        'inherit'
      );
    });
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

  it('should display the title table', () => {
    const { getByText } = render(
      <Table tableTitle="Title table">
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

    const titleTable = getByText('Title table');

    expect(titleTable).toBeInTheDocument();
    expect(titleTable).toHaveStyle(`margin-top: ${magma.spaceScale.spacing04}`);
    expect(titleTable).toHaveStyle(
      `margin-bottom: ${magma.spaceScale.spacing04}`
    );
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
      transparentize(0.85, magma.colors.neutral0),
      {
        target: ':hover',
      }
    );
  });

  describe('Outer border', () => {
    it('should display the outer border when hasOutsideBorder is true and hasSquareCorners is false', () => {
      const testId = 'table-test';

      const { getByTestId } = render(
        <Table hasOutsideBorder testId={testId}>
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

      expect(getByTestId(testId)).toHaveStyle('border-collapse: separate');
      expect(getByTestId(testId)).toHaveStyle(
        `border: 1px solid ${magma.colors.neutral200}`
      );
      expect(getByTestId(testId)).toHaveStyle(
        `border-radius: ${magma.borderRadius}`
      );
    });

    it('should display the outer border when hasOutsideBorder is true and isInverse is true', () => {
      const testId = 'table-test';

      const { getByTestId } = render(
        <Table hasOutsideBorder isInverse testId={testId}>
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

      expect(getByTestId(testId)).toHaveStyleRule(
        'border-collapse',
        'separate'
      );
      expect(getByTestId(testId)).toHaveStyleRule(
        'border',
        `1px solid ${magma.colors.neutral800}`
      );
      expect(getByTestId(testId)).toHaveStyleRule(
        'border-radius',
        `${magma.borderRadius}`
      );
    });

    it('should not display the outer border when hasOutsideBorder is false and hasSquareCorners is true', () => {
      const testId = 'table-test';

      const { getByTestId } = render(
        <Table hasOutsideBorder={false} hasSquareCorners testId={testId}>
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

      expect(getByTestId(testId)).toHaveStyle('border-collapse: collapse');
      expect(getByTestId(testId)).toHaveStyle(`border: none`);
      expect(getByTestId(testId)).toHaveStyle(`border-radius: 0`);
    });
  });

  describe('TableHeaderCell rowSpan and colSpan', () => {
    it('should render with the correct rowSpan', () => {
      const { getByText } = render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell rowSpan={2}>Row Header</TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      );
      const th = getByText('Row Header').closest('th');
      expect(th).toHaveAttribute('rowspan', '2');
    });

    it('should render with the correct colSpan', () => {
      const { getByText } = render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell colSpan={3}>Col Header</TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      );
      const th = getByText('Col Header').closest('th');
      expect(th).toHaveAttribute('colspan', '3');
    });
  });
});

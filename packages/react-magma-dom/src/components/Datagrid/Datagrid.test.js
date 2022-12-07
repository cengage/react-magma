import { axe } from '../../../axe-helper';
import { Datagrid } from '.';
import { TableRowColor } from '../Table';
import { Button } from '../Button';
import { usePagination } from '../Pagination/usePagination';
import { render, fireEvent } from '@testing-library/react';
import { magma } from '../../theme/magma';

const columns = [
  { field: 'col1', header: 'Col 1' },
  { field: 'col2', header: 'Col 2' },
  { field: 'col3', header: 'Col 3' },
  { field: 'col4', header: 'Col 4' },
];

const rows = [
  {
    id: 1,
    col1: 'Lorem ipsum dolor sit amet consectetur',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 2,
    col1: 'Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 3,
    col1: 'Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
];

const rowsForPagination = [
  {
    id: 1,
    col1: '1 Lorem ipsum dolor sit amet consectetur',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 2,
    col1: '2 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 3,
    col1: '3 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 4,
    col1: '4 Lorem ipsum dolor sit amet consectetur',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 5,
    col1: '5 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 6,
    col1: '6 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 7,
    col1: '7  Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 8,
    col1: '8 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 9,
    col1: '9 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 10,
    col1: '10 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 11,
    col1: '11 Lorem ipsum dolor sit amet consectetur',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 12,
    col1: '12 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 13,
    col1: '13 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 14,
    col1: '14 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 15,
    col1: '15 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 16,
    col1: '16 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 17,
    col1: '17 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 18,
    col1: '18 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 19,
    col1: '19 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 20,
    col1: '20 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 21,
    col1: '21 Lorem ipsum dolor sit amet consectetur',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 22,
    col1: '22 Lorem ipsum dolor sit amet',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 23,
    col1: '23 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 24,
    col1: '24 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
  {
    id: 25,
    col1: '25 Lorem ipsum dolor',
    col2: 'Lorem ipsum dolor',
    col3: 'Lorem ipsum dolor',
    col4: 'Lorem ipsum',
  },
];

describe('Datagrid', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Datagrid columns={columns} rows={rows} testId={testId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should allow for colors to be passed to rows', () => {
    const coloredRows = [
      {
        ...rows[0],
        color: TableRowColor.danger,
      },
      rows[1],
      rows[2],
    ];
    const { getByText } = render(
      <Datagrid columns={columns} rows={coloredRows} />
    );

    const coloredRow = getByText(rows[0].col1).parentElement;

    expect(coloredRow).toHaveStyleRule('background', magma.colors.danger);
  });

  describe('selectable', () => {
    it('should allow for selectable rows', () => {
      const { container } = render(
        <Datagrid columns={columns} rows={rows} isSelectable />
      );

      const selectableRowCheckbox = container
        .querySelector('tbody')
        .firstChild.querySelector('input');

      expect(selectableRowCheckbox).toBeInTheDocument();
    });

    it('should allow the disabling of selecting a row', () => {
      const { container } = render(
        <Datagrid
          columns={columns}
          rows={[
            {
              id: 4,
              isSelectableDisabled: true,
              col1: 'Lorem ipsum dolor',
              col2: 'Lorem ipsum dolor',
              col3: 'Lorem ipsum dolor',
              col4: 'Lorem ipsum',
            },
            ...rows,
          ]}
          isSelectable
        />
      );

      const selectableRowCheckbox = container
        .querySelector('tbody')
        .firstChild.querySelector('input');

      expect(selectableRowCheckbox).toBeDisabled();
    });

    it('should call passed in onHeaderSelect function when header checkbox is clicked', () => {
      const onHeaderSelect = jest.fn();
      const { container } = render(
        <Datagrid
          columns={columns}
          rows={rows}
          isSelectable
          onHeaderSelect={onHeaderSelect}
        />
      );

      const headerCheckbox = container
        .querySelector('thead')
        .firstChild.querySelector('input');

      headerCheckbox.click();

      expect(onHeaderSelect).toHaveBeenCalled();
    });

    it('should call passed in onRowSelect function with the row id when a row checkbox is clicked', () => {
      const onRowSelect = jest.fn();
      const { container } = render(
        <Datagrid
          columns={columns}
          rows={rows}
          isSelectable
          onRowSelect={onRowSelect}
        />
      );

      const selectableRowCheckbox = container
        .querySelector('tbody')
        .firstChild.querySelector('input');

      selectableRowCheckbox.click();

      expect(onRowSelect).toHaveBeenCalledWith(rows[0].id, expect.any(Object));
    });

    it('should allow for the uncontrolled selection of a selectable row', () => {
      const { container } = render(
        <Datagrid columns={columns} rows={rows} isSelectable />
      );

      const selectableRowCheckbox = container
        .querySelector('tbody')
        .firstChild.querySelector('input');

      selectableRowCheckbox.click();

      expect(selectableRowCheckbox).toBeChecked();
    });

    it('should allow for the controlled selection of a selectable row', () => {
      const onSelectedRowsChange = jest.fn();
      const { container } = render(
        <Datagrid
          columns={columns}
          rows={rows}
          isSelectable
          selectedRows={[rows[0].id]}
          onSelectedRowsChange={onSelectedRowsChange}
        />
      );

      const selectableRowCheckbox = container
        .querySelector('tbody')
        .firstChild.querySelector('input');

      expect(selectableRowCheckbox).toBeChecked();

      selectableRowCheckbox.click();

      expect(onSelectedRowsChange).toHaveBeenCalledWith([]);
    });

    it('should change the header checkbox to an indeterminate state when some rows are selected', () => {
      const { container } = render(
        <Datagrid columns={columns} rows={rows} isSelectable />
      );

      const selectableRowCheckbox = container
        .querySelector('tbody')
        .firstChild.querySelector('input');

      selectableRowCheckbox.click();

      const headerCheckbox = container
        .querySelector('thead')
        .firstChild.querySelector('input');

      expect(headerCheckbox).toHaveProperty('indeterminate');
    });

    it('should change the header checkbox to n checked state when all rows are selected', () => {
      const { container } = render(
        <Datagrid
          columns={columns}
          rows={rows}
          isSelectable
          selectedRows={[rows[0].id, rows[1].id, rows[2].id]}
        />
      );

      const headerCheckbox = container
        .querySelector('thead')
        .firstChild.querySelector('input');

      expect(headerCheckbox).toBeChecked();
    });

    it('should change the header checkbox to a checked state when all non-disabled rows are selected', () => {
      const { container } = render(
        <Datagrid
          columns={columns}
          rows={[{ ...rows[0], isSelectableDisabled: true }, rows[1], rows[2]]}
          isSelectable
          selectedRows={[rows[1].id, rows[2].id]}
        />
      );

      const headerCheckbox = container
        .querySelector('thead')
        .firstChild.querySelector('input');

      expect(headerCheckbox).toBeChecked();
    });

    it('should select all rows when clicking on the header checkbox when no rows are selected in the uncontrolled state', () => {
      const { container } = render(
        <Datagrid columns={columns} rows={rows} isSelectable />
      );

      const headerCheckbox = container
        .querySelector('thead')
        .firstChild.querySelector('input');

      expect(headerCheckbox).not.toBeChecked();

      headerCheckbox.click();

      const selectableRowCheckbox = container
        .querySelector('tbody')
        .firstChild.querySelector('input');

      expect(headerCheckbox).toBeChecked();
      expect(selectableRowCheckbox).toBeChecked();
    });

    it('should select all non-disabled rows when clicking on the header checkbox when no rows are selected in the uncontrolled state', () => {
      const { container } = render(
        <Datagrid
          columns={columns}
          rows={[{ ...rows[0], isSelectableDisabled: true }, rows[1], rows[2]]}
          isSelectable
        />
      );

      const headerCheckbox = container
        .querySelector('thead')
        .firstChild.querySelector('input');

      expect(headerCheckbox).not.toBeChecked();

      headerCheckbox.click();

      const disabledRowCheckbox = container
        .querySelector('tbody')
        .firstChild.querySelector('input');

      const selectableRowCheckbox = container
        .querySelector('tbody')
        .children[1].querySelector('input');

      expect(headerCheckbox).toBeChecked();
      expect(disabledRowCheckbox).not.toBeChecked();
      expect(selectableRowCheckbox).toBeChecked();
    });

    it('should call the update selected rows function with all rows selected when clicking on the header checkbox when no rows are selected in the controlled state', () => {
      const onSelectedRowsChange = jest.fn();
      const { container } = render(
        <Datagrid
          columns={columns}
          rows={rows}
          isSelectable
          selectedRows={[]}
          onSelectedRowsChange={onSelectedRowsChange}
        />
      );

      const headerCheckbox = container
        .querySelector('thead')
        .firstChild.querySelector('input');

      expect(headerCheckbox).not.toBeChecked();

      headerCheckbox.click();

      expect(onSelectedRowsChange).toHaveBeenCalledWith([
        rows[0].id,
        rows[1].id,
        rows[2].id,
      ]);
    });

    it('should deselect all rows when clicking on the header checkbox when one or more rows are selected in the uncontrolled state', () => {
      const { container } = render(
        <Datagrid columns={columns} rows={rows} isSelectable />
      );

      const headerCheckbox = container
        .querySelector('thead')
        .firstChild.querySelector('input');

      const selectableRowCheckbox = container
        .querySelector('tbody')
        .firstChild.querySelector('input');

      selectableRowCheckbox.click();

      expect(headerCheckbox).toHaveProperty('indeterminate');

      headerCheckbox.click();

      expect(headerCheckbox).not.toBeChecked();
      expect(selectableRowCheckbox).not.toBeChecked();
    });

    it('should call the update selected rows function with an empty array when clicking on the header checkbox when one or more rows are selected in the controlled state', () => {
      const onSelectedRowsChange = jest.fn();
      const { container } = render(
        <Datagrid
          columns={columns}
          rows={rows}
          isSelectable
          selectedRows={[rows[0].id]}
          onSelectedRowsChange={onSelectedRowsChange}
        />
      );

      const headerCheckbox = container
        .querySelector('thead')
        .firstChild.querySelector('input');

      expect(headerCheckbox).toHaveProperty('indeterminate');

      headerCheckbox.click();

      expect(onSelectedRowsChange).toHaveBeenCalledWith([]);
    });

    it('should deselect all rows when clicking on the header checkbox when all rows are selected in the uncontrolled state', () => {
      const { container } = render(
        <Datagrid columns={columns} rows={[rows[0]]} isSelectable />
      );

      const headerCheckbox = container
        .querySelector('thead')
        .firstChild.querySelector('input');

      const selectableRowCheckbox = container
        .querySelector('tbody')
        .firstChild.querySelector('input');

      selectableRowCheckbox.click();

      expect(headerCheckbox).toBeChecked();

      headerCheckbox.click();

      expect(headerCheckbox).not.toBeChecked();
      expect(selectableRowCheckbox).not.toBeChecked();
    });

    it('should call the update selected rows function with an empty array when clicking on the header checkbox when all rows are selected in the controlled state', () => {
      const onSelectedRowsChange = jest.fn();
      const { container } = render(
        <Datagrid
          columns={columns}
          rows={[rows[0]]}
          isSelectable
          selectedRows={[rows[0].id]}
          onSelectedRowsChange={onSelectedRowsChange}
        />
      );

      const headerCheckbox = container
        .querySelector('thead')
        .firstChild.querySelector('input');

      expect(headerCheckbox).toBeChecked();

      headerCheckbox.click();

      expect(onSelectedRowsChange).toHaveBeenCalledWith([]);
    });
  });

  describe('selectable AND sortable', () => {
    it('should allow for selectable rows', () => {
      const { container } = render(
        <Datagrid
          columns={columns}
          rows={rows}
          isSelectable
          isSortableBySelected
        />
      );

      const selectableRowCheckbox = container
        .querySelector('tbody')
        .firstChild.querySelector('input');

      expect(selectableRowCheckbox).toBeInTheDocument();
    });

    it('should call passed in onHeaderSelect function when header checkbox is clicked', () => {
      const onHeaderSelect = jest.fn();
      const { container } = render(
        <Datagrid
          columns={columns}
          rows={rows}
          isSelectable
          isSortableBySelected
          onHeaderSelect={onHeaderSelect}
        />
      );

      const headerCheckbox = container
        .querySelector('thead')
        .firstChild.querySelector('input');

      headerCheckbox.click();

      expect(onHeaderSelect).toHaveBeenCalled();
    });

    it('should call passed in onRowSelect function with the row id when a row checkbox is clicked', () => {
      const onRowSelect = jest.fn();
      const { container } = render(
        <Datagrid
          columns={columns}
          rows={rows}
          isSelectable
          isSortableBySelected
          onRowSelect={onRowSelect}
        />
      );

      const selectableRowCheckbox = container
        .querySelector('tbody')
        .firstChild.querySelector('input');

      selectableRowCheckbox.click();

      expect(onRowSelect).toHaveBeenCalledWith(rows[0].id, expect.any(Object));
    });

    it('should call handleRowSort when the sort button is clicked', () => {
      const onSortBySelected = jest.fn();
      const onSelectedRowsChange = jest.fn();
      const { getByTestId } = render(
        <Datagrid
          columns={columns}
          rows={[rows[0]]}
          isSelectable
          isSortableBySelected
          selectedRows={[rows[0].id]}
          onSelectedRowsChange={onSelectedRowsChange}
          onSortBySelected={onSortBySelected}
        />
      );

      const sortButton = getByTestId('-sort-button');
      sortButton.click();

      expect(onSortBySelected).toHaveBeenCalled();
    });
  });

  describe('pagination', () => {
    it('should render pagination controls', () => {
      const pagination = {
        itemCount: rowsForPagination.length,
        page: 1,
        rowsPerPage: 10,
        rowsPerPageValues: [10, 20, 50, 100],
      };
      const { getByText, getByTestId } = render(
        <Datagrid
          columns={columns}
          rows={rowsForPagination}
          paginationProps={pagination}
        />
      );

      expect(
        getByText(pagination.rowsPerPage.toString(), { selector: 'div' })
      ).toBeInTheDocument();
      expect(
        getByText(
          `1-${pagination.rowsPerPage.toString()} of ${pagination.itemCount}`
        )
      ).toBeInTheDocument();
      expect(getByTestId('previousBtn')).toBeInTheDocument();
      expect(getByTestId('nextBtn')).toBeInTheDocument();
    });

    it('should not render pagination controls when pagination is turned off', () => {
      const { queryByTestId } = render(
        <Datagrid
          columns={columns}
          rows={rowsForPagination}
          hasPagination={false}
        />
      );
      expect(queryByTestId('previousBtn')).not.toBeInTheDocument();
      expect(queryByTestId('nextBtn')).not.toBeInTheDocument();
    });

    it('should call the on change the rows per page function', () => {
      const onRowsPerPageChange = jest.fn();
      const pagination = {
        itemCount: rowsForPagination.length,
        page: 1,
        rowsPerPage: 10,
        rowsPerPageValues: [10, 20, 50, 100],
        onRowsPerPageChange,
      };
      const { getByText, getByLabelText } = render(
        <Datagrid
          columns={columns}
          rows={rowsForPagination}
          paginationProps={pagination}
        />
      );

      fireEvent.click(getByText('Rows per page:', { selector: 'span' }));

      fireEvent.click(getByText(pagination.rowsPerPageValues[1].toString()));

      expect(onRowsPerPageChange).toBeCalledWith(
        pagination.rowsPerPageValues[1]
      );
    });

    it('should call the on change page function when clicking the next page button', () => {
      const onPageChange = jest.fn();
      const pagination = {
        itemCount: rowsForPagination.length,
        page: 1,
        rowsPerPage: 10,
        rowsPerPageValues: [10, 20, 50, 100],
        onPageChange,
      };
      const { getByText, getByTestId } = render(
        <Datagrid
          columns={columns}
          rows={rowsForPagination}
          paginationProps={pagination}
        />
      );

      fireEvent.click(getByTestId('nextBtn'));

      expect(onPageChange).toBeCalledWith(
        expect.any(Object),
        pagination.page + 1
      );
    });

    it('should call the on change page function when clicking the previous page button', () => {
      const onPageChange = jest.fn();
      const pagination = {
        itemCount: rowsForPagination.length,
        page: 2,
        rowsPerPage: 10,
        rowsPerPageValues: [10, 20, 50, 100],
        onPageChange,
      };
      const { getByTestId } = render(
        <Datagrid
          columns={columns}
          rows={rowsForPagination}
          paginationProps={pagination}
        />
      );

      fireEvent.click(getByTestId('previousBtn'));

      expect(onPageChange).toBeCalledWith(
        expect.any(Object),
        pagination.page - 1
      );
    });

    it('should render a custom pagination component', () => {
      const CustomPaginationComponent = props => {
        const { itemCount, rowsPerPage, onPageChange } = props;
        const { page, pageButtons } = usePagination({
          count: itemCount / rowsPerPage,
          numberOfAdjacentPages: 0,
          numberOfEdgePages: 0,
          onPageChange,
        });

        const previousButton = pageButtons[0];
        const nextButton = pageButtons[pageButtons.length - 1];

        return (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            You are on page {page}
            <Button
              disabled={previousButton.disabled}
              onClick={previousButton.onClick}
            >
              Previous Page
            </Button>
            <Button disabled={nextButton.disabled} onClick={nextButton.onClick}>
              Next Page
            </Button>
          </div>
        );
      };

      const { getByText } = render(
        <Datagrid
          columns={columns}
          rows={rowsForPagination}
          components={{ Pagination: CustomPaginationComponent }}
        />
      );

      expect(getByText(/you are on page 1/i)).toBeInTheDocument();
      expect(getByText(/previous page/i)).toBeInTheDocument();
      expect(getByText(/next page/i)).toBeInTheDocument();
    });
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Datagrid columns={columns} rows={rows} />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});

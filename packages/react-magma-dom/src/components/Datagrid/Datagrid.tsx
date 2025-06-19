import * as React from 'react';

import { useControlled } from '../../hooks/useControlled';
import { useDataPagination } from '../../hooks/useDataPagination';
import { XOR } from '../../utils';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableProps,
  TableHeaderCellProps,
  TableRowColor,
  TablePaginationProps,
  TableSortDirection,
} from '../Table';
import { defaultComponents } from './components';

export interface DatagridColumn extends TableHeaderCellProps {
  /**
   * Unique identifier for each column
   */
  field: string;
  /**
   * Header text for each column
   */
  header: string;
  /**
   * Set to true if you want the column to be the header for each row
   * @default false
   */
  isRowHeader?: boolean;
}

export interface DatagridRow {
  /**
   * Unique identifier for each row
   */
  id: string | number;
  /**
   * The color scheme of the table row, giving contextual meaning to the content
   */
  color?: TableRowColor;
  /**
   * If true, the select box will be disabled
   */
  isSelectableDisabled?: boolean;
  /**
   * Used to allow each unique column field as a key with the row content as the value
   */
  [key: string]: any;
}

export interface DatagridComponents {
  Pagination?: React.FunctionComponent<TablePaginationProps>;
}

export interface DatagridComponentsProps {
  pagination?: Partial<
    Omit<
      TablePaginationProps,
      'page' | 'defaultPage' | 'rowsPerPage' | 'defaultRowsPerPage'
    >
  >;
}

/**
 * @children required
 */
export interface BaseDatagridProps extends TableProps {
  /**
   * Column data to be displayed in the table header
   */
  columns: DatagridColumn[];
  /**
   * Custom components to replace internally used components with
   * @default { Pagination }
   */
  components?: DatagridComponents;
  /**
   * Props to be passed to the default components used internally to build the datagrid
   * @default {}
   */
  componentsProps?: DatagridComponentsProps;
  /**
   * Pass in false to turn off pagination
   * @default true
   */
  hasPagination?: boolean;
  /**
   * Row data to be displayed in each row in the table
   */
  rows: DatagridRow[];
  /**
   * Function called when the checkbox in the table header is clicked on
   */
  onHeaderSelect?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Function called when the checkbox in each table row is clicked on
   */
  onRowSelect?: (
    id: string | number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  /**
   * Function called when the rows selected in the table changes
   */
  onSelectedRowsChange?: (newSelectedRows: (string | number)[]) => void;
  /**
   * Pagination data used to create the pagination footer. Created using the usePagination hook.
   * @default {}
   */
  paginationProps?: Partial<TablePaginationProps>;
  /**
   * Function called when the sort button is clicked for selectable tables
   */
  onSortBySelected?: () => void;
  /**
   * Direction by which the selectable column is sorted
   * @default TableSortDirection.none
   */
  sortDirection?: TableSortDirection;
}

export interface ControlledSelectedRowsProps {
  /**
   * Array of rows that are selected in the table when component is controlled
   */
  selectedRows?: (string | number)[];
}

export interface UncontrolledSelectedRowsProps {
  /**
   * Array of rows that are selected in the table on render when component is uncontrolled
   */
  defaultSelectedRows?: (string | number)[];
}

export type DatagridSelectedRowsProps = XOR<
  ControlledSelectedRowsProps,
  UncontrolledSelectedRowsProps
>;

export type DatagridProps = BaseDatagridProps & DatagridSelectedRowsProps;

export const Datagrid = React.forwardRef<HTMLTableElement, DatagridProps>(
  (props, ref) => {
    const {
      columns,
      components: customComponents,
      componentsProps = {},
      defaultSelectedRows = [],
      onHeaderSelect,
      onRowSelect,
      onSelectedRowsChange,
      paginationProps = {},
      rows,
      selectedRows: selectedRowsProp,
      hasSquareCorners,
      hasOutsideBorder,
      hasPagination = true,
      onSortBySelected,
      sortDirection,
      ...other
    } = props;
    const [rowsToShow, setRowsToShow] = React.useState<DatagridRow[]>([]);
    const [selectedRows, updatedSelectedRows] = useControlled({
      controlled: selectedRowsProp,
      default: defaultSelectedRows,
    });

    const isControlled = !!selectedRowsProp;

    const {
      getPageItems,
      itemsPerPage: rowsPerPage,
      onItemsPerPageChange,
    } = useDataPagination({
      defaultItemsPerPage: paginationProps.defaultRowsPerPage,
      items: rows,
      itemsPerPage: paginationProps.rowsPerPage,
      onItemsPerPageChange: paginationProps.onRowsPerPageChange,
    });

    const [currentPage, setCurrentPage] = useControlled({
      controlled: paginationProps.page,
      default: paginationProps.defaultPage || 1,
    });

    React.useEffect(() => {
      setRowsToShow(rows);
    }, [rows]);

    React.useEffect(() => {
      setRowsToShow(hasPagination ? getPageItems(currentPage) : rows);
    }, [currentPage, rowsPerPage]);

    const { Pagination } = defaultComponents({
      ...customComponents,
    });

    const { defaultPage: _, ...passedOnPaginationProps } = paginationProps;

    passedOnPaginationProps.page = currentPage;
    passedOnPaginationProps.itemCount = rows.length;
    passedOnPaginationProps.rowsPerPage = rowsPerPage;
    passedOnPaginationProps.onRowsPerPageChange = onItemsPerPageChange;
    passedOnPaginationProps.onPageChange = React.useCallback(
      (event, newPage: number) => {
        if (!paginationProps.page) {
          setCurrentPage(newPage);
        }

        paginationProps.onPageChange &&
          typeof paginationProps.onPageChange === 'function' &&
          paginationProps.onPageChange(event, newPage);
      },
      [paginationProps.onPageChange]
    );

    const filteredRows = rowsToShow.filter(row => !row.isSelectableDisabled);

    const headerRowStatus =
      selectedRows.length === filteredRows.length
        ? IndeterminateCheckboxStatus.checked
        : selectedRows.length > 0
          ? IndeterminateCheckboxStatus.indeterminate
          : IndeterminateCheckboxStatus.unchecked;

    function handleRowSelect(
      id: string | number,
      event: React.ChangeEvent<HTMLInputElement>
    ) {
      const { checked } = event.target;
      const newSelectedRows = [...selectedRows];

      checked
        ? newSelectedRows.push(id)
        : newSelectedRows.splice(newSelectedRows.indexOf(id), 1);

      handleSelectedRowsChange(newSelectedRows);

      onRowSelect &&
        typeof onRowSelect === 'function' &&
        onRowSelect(id, event);
    }

    function handleHeaderSelect(event: React.ChangeEvent<HTMLInputElement>) {
      if (
        headerRowStatus === IndeterminateCheckboxStatus.indeterminate ||
        headerRowStatus === IndeterminateCheckboxStatus.checked
      ) {
        handleSelectedRowsChange([]);
      } else {
        handleSelectedRowsChange(filteredRows.map(row => row.id));
      }

      onHeaderSelect &&
        typeof onHeaderSelect === 'function' &&
        onHeaderSelect(event);
    }

    function handleSelectedRowsChange(newSelectedRows) {
      if (isControlled) {
        onSelectedRowsChange &&
          typeof onSelectedRowsChange === 'function' &&
          onSelectedRowsChange(newSelectedRows);
      } else {
        updatedSelectedRows(newSelectedRows);
      }
    }

    function handleRowSort() {
      onSortBySelected &&
        typeof onSortBySelected === 'function' &&
        onSortBySelected();
    }

    return (
      <>
        <Table
          hasOutsideBorder={hasOutsideBorder}
          hasSquareCorners={hasSquareCorners}
          hasTablePagination={hasPagination}
          {...other}
          ref={ref}
          aria-live="polite"
        >
          <TableHead>
            <TableRow
              headerRowStatus={headerRowStatus}
              onHeaderRowSelect={handleHeaderSelect}
              onSort={handleRowSort}
              sortDirection={sortDirection}
            >
              {columns.map(({ field, header, ...other }) => (
                <TableHeaderCell
                  key={`headercell${field}`}
                  {...other}
                  isRowHeader={false}
                >
                  {header}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rowsToShow.map(({ id, color, isSelectableDisabled, ...other }) => (
              <TableRow
                key={`row${id}`}
                color={color}
                isSelected={
                  selectedRows ? selectedRows.indexOf(id) > -1 : false
                }
                isSelectableDisabled={isSelectableDisabled}
                onTableRowSelect={event => handleRowSelect(id, event)}
                {...other}
              >
                {columns.map(({ field, isRowHeader }: DatagridColumn) => {
                  return isRowHeader ? (
                    <TableHeaderCell
                      key={`cell${field}`}
                      isRowHeader={isRowHeader}
                    >
                      {other[field]}
                    </TableHeaderCell>
                  ) : (
                    <TableCell key={`cell${field}`}>{other[field]}</TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {hasPagination && (
          <Pagination
            isInverse={props.isInverse}
            itemCount={rows.length}
            hasOutsideBorder={hasOutsideBorder}
            hasSquareCorners={hasSquareCorners}
            {...passedOnPaginationProps}
            {...componentsProps.pagination}
          />
        )}
      </>
    );
  }
);

import * as React from 'react';
import { TablePagination, TablePaginationProps } from '../Table';

export type SelectComponents<T> = {
  Pagination?: React.FunctionComponent<TablePaginationProps>;
};

export const DefaultPagination = props => {
  return <TablePagination {...props} />;
};

export function defaultComponents<T>(props: SelectComponents<T>) {
  return {
    Pagination: DefaultPagination,
    ...props,
  };
}

import React from 'react';
import { TablePagination } from '../Table';
import { DatagridComponents } from './Datagrid';

export const DefaultPagination = props => {
  return <TablePagination {...props} />;
};

export function defaultComponents<T>(components: DatagridComponents) {
  return {
    Pagination: DefaultPagination,
    ...components,
  };
}

import * as React from 'react';

import { NorthIcon, SortDoubleArrowIcon, SouthIcon } from 'react-magma-icons';

import { ThemeInterface } from '../../theme/magma';
import { TableSortDirection } from '../Table/Table';

interface TableSortIconParams {
  sortDirection: TableSortDirection;
  isInverse: boolean;
  theme: ThemeInterface;
}

export const getTableSortIcon = ({
  sortDirection,
  isInverse,
  theme,
}: TableSortIconParams) => {
  const sortIconColor = isInverse
    ? theme.colors.neutral0
    : theme.colors.brand.navy;

  const iconSize = theme.iconSizes.xSmall;

  switch (sortDirection) {
    case TableSortDirection.ascending:
      return (
        <NorthIcon
          color={sortIconColor}
          size={iconSize}
          testId="sort-ascending"
        />
      );

    case TableSortDirection.descending:
      return (
        <SouthIcon
          color={sortIconColor}
          size={iconSize}
          testId="sort-descending"
        />
      );

    default:
      return (
        <SortDoubleArrowIcon
          color={isInverse ? theme.colors.neutral500 : theme.colors.neutral700}
          size={iconSize}
          testId="sort-none"
        />
      );
  }
};

export function getAriaSort(
  sortDirection: TableSortDirection
): 'ascending' | 'descending' | 'none' {
  switch (sortDirection) {
    case TableSortDirection.ascending:
      return 'ascending';
    case TableSortDirection.descending:
      return 'descending';
    default:
      return 'none';
  }
}

export function getAriaSortLabel(sortDirection: TableSortDirection): string {
  switch (sortDirection) {
    case TableSortDirection.ascending:
      return 'ascending';
    case TableSortDirection.descending:
      return 'descending';
    default:
      return '';
  }
}

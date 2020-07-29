import React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { StyledCard, StyledList, StyledItem } from './shared';
import {
  UseSelectGetMenuPropsOptions,
  UseSelectGetItemPropsOptions
} from 'downshift';
import { DownshiftOption, instanceOfToBeCreatedItemObject } from '.';

interface ItemsListProps<T> {
  getItemProps: (
    options?: UseSelectGetItemPropsOptions<DownshiftOption<T>>
  ) => any;
  getMenuProps: (options?: UseSelectGetMenuPropsOptions) => any;
  highlightedIndex?: number;
  isOpen?: boolean;
  items: DownshiftOption<T>[];
  itemToString: (item: DownshiftOption<T>) => string;
}

export function ItemsList<T>(props: ItemsListProps<T>) {
  const {
    isOpen,
    getMenuProps,
    items,
    itemToString,
    highlightedIndex,
    getItemProps
  } = props;

  const theme = React.useContext(ThemeContext);

  const hasItems = items && items.length > 0;

  return (
    <StyledCard hasDropShadow isOpen={isOpen && hasItems}>
      <StyledList isOpen={isOpen} {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => {
            const itemString = instanceOfToBeCreatedItemObject(item)
              ? item.label
              : itemToString(item);
            return (
              <StyledItem
                key={`${itemString}${index}`}
                isFocused={highlightedIndex === index}
                {...getItemProps({ item, index })}
                theme={theme}
              >
                {itemString}
              </StyledItem>
            );
          })}
      </StyledList>
    </StyledCard>
  );
}

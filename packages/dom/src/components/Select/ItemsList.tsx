import React from 'react';
import { I18nContext } from '../../i18n';
import { StyledCard, StyledList, StyledItem } from './shared';
import {
  UseSelectGetMenuPropsOptions,
  UseSelectGetItemPropsOptions,
} from 'downshift';
import { instanceOfToBeCreatedItemObject } from '.';
import {
  defaultComponents,
  SelectComponents,
  ItemRenderOptions,
} from './components';
import styled from '@emotion/styled';
import { convertStyleValueToString } from '../../utils';

interface ItemsListProps<T> {
  customComponents?: SelectComponents<T>;
  getItemProps: (options?: UseSelectGetItemPropsOptions<T>) => any;
  getMenuProps: (options?: UseSelectGetMenuPropsOptions) => any;
  highlightedIndex?: number;
  isOpen?: boolean;
  items: T[];
  itemToString: (item: T) => string;
  maxHeight?: number | string;
  menuStyle?: React.CSSProperties;
}

const NoItemsMessage = styled.span`
  color: var(--colors-neutral04);
  display: block;
  padding-top: var(--spaceScale-spacing03);
  text-align: center;
`;

export function ItemsList<T>(props: ItemsListProps<T>) {
  const {
    customComponents,
    isOpen,
    getMenuProps,
    items,
    itemToString,
    highlightedIndex,
    getItemProps,
    maxHeight,
    menuStyle,
  } = props;

  const i18n = React.useContext(I18nContext);

  const hasItems = items && items.length > 0;

  const heightString = convertStyleValueToString(maxHeight);
  const { Item } = defaultComponents<T>({
    ...customComponents,
  });

  return (
    <StyledCard
      hasDropShadow
      isInverse={false}
      isOpen={isOpen}
      style={menuStyle}
    >
      <StyledList isOpen={isOpen} {...getMenuProps()} maxHeight={heightString}>
        {isOpen && hasItems ? (
          items.map((item, index) => {
            const itemString = instanceOfToBeCreatedItemObject(item)
              ? item.label
              : itemToString(item);

            const { ref, ...otherDownshiftItemProps } = getItemProps({
              item,
              index,
            });

            const key = `${itemString}${index}`;

            const itemProps: ItemRenderOptions<T> = {
              isFocused: highlightedIndex === index,
              itemRef: ref,
              item,
              itemString,
              key,
              ...otherDownshiftItemProps,
            };

            return <Item<T> {...itemProps} key={key} />;
          })
        ) : (
          <StyledItem tabIndex={-1}>
            <NoItemsMessage>
              {i18n.emptyItemsListText}
            </NoItemsMessage>
          </StyledItem>
        )}
      </StyledList>
    </StyledCard>
  );
}

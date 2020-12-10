import React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';
import { StyledCard, StyledList, StyledItem } from './shared';
import {
  UseSelectGetMenuPropsOptions,
  UseSelectGetItemPropsOptions,
} from 'downshift';
import { instanceOfToBeCreatedItemObject, ItemRenderOptions } from '.';
import styled from '../../theme/styled';

interface ItemsListProps<T> {
  getItemProps: (options?: UseSelectGetItemPropsOptions<T>) => any;
  getMenuProps: (options?: UseSelectGetMenuPropsOptions) => any;
  highlightedIndex?: number;
  isOpen?: boolean;
  items: T[];
  itemToString: (item: T) => string;
  menuStyle?: React.CSSProperties;
  renderItem?: (options: any) => React.ReactNode;
}

const NoItemsMessage = styled.span`
  color: ${props => props.theme.colors.neutral04};
  display: block;
  padding-top: ${props => props.theme.spaceScale.spacing03};
  text-align: center;
`;

function defaultRenderItem({ itemString, ...props }) {
  return <StyledItem {...props}>{itemString}</StyledItem>;
}

export function ItemsList<T>(props: ItemsListProps<T>) {
  const {
    isOpen,
    getMenuProps,
    items,
    itemToString,
    highlightedIndex,
    getItemProps,
    menuStyle,
    renderItem,
  } = props;

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const hasItems = items && items.length > 0;

  return (
    <StyledCard hasDropShadow isOpen={isOpen} style={menuStyle}>
      <StyledList isOpen={isOpen} {...getMenuProps()}>
        {isOpen && hasItems ? (
          items.map((item, index) => {
            const itemString = instanceOfToBeCreatedItemObject(item)
              ? item.label
              : itemToString(item);

            const itemProps: ItemRenderOptions<T> = {
              key: `${itemString}${index}`,
              isFocused: highlightedIndex === index,
              item,
              itemString,
              theme,
              ...getItemProps({ item, index }),
            };

            return renderItem && typeof renderItem === 'function'
              ? renderItem(itemProps)
              : defaultRenderItem(itemProps);
          })
        ) : (
          <StyledItem tabIndex={-1}>
            <NoItemsMessage theme={theme}>
              {i18n.emptyItemsListText}
            </NoItemsMessage>
          </StyledItem>
        )}
      </StyledList>
    </StyledCard>
  );
}

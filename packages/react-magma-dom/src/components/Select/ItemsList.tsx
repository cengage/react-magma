import React from 'react';

import styled from '@emotion/styled';
import { ReferenceType } from '@floating-ui/react-dom';
import { UseSelectPropGetters } from 'downshift';

import {
  defaultComponents,
  ItemRenderOptions,
  SelectComponents,
} from './components';
import { StyledCard, StyledItem, StyledList } from './shared';
import { findItemIndex, isItemDisabled } from './utils';
import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { convertStyleValueToString } from '../../utils';
import { CardBorderRadius, CardCornerTreatment } from '../Card';
import { Spinner } from '../Spinner';

import { instanceOfToBeCreatedItemObject } from '.';

interface ItemsListProps<T> {
  customComponents?: SelectComponents<T>;
  floatingElementStyles?: React.CSSProperties;
  getItemProps: UseSelectPropGetters<T>['getItemProps'];
  getMenuProps: UseSelectPropGetters<T>['getMenuProps'];
  highlightedIndex?: number;
  isInverse?: boolean;
  isItemDisabled?: (item: T, index: number) => boolean;
  isLoading?: boolean;
  isOpen?: boolean;
  items: T[];
  itemToString: (item: T) => string;
  itemToKey?: (item: T | null) => unknown;
  maxHeight?: number | string;
  menuStyle?: React.CSSProperties;
  setFloating?: (node: ReferenceType) => void;
  selectedItem?: T;
}

const NoItemsMessage = styled.span<{
  isInverse?: boolean;
}>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral0
      : props.theme.colors.neutral400};
  font-family: ${props => props.theme.bodyFont};
  display: block;
  padding-top: ${props => props.theme.spaceScale.spacing03};
  text-align: center;
`;

const LoadingWrapper = styled.span<{}>`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function ItemsList<T>(props: ItemsListProps<T>) {
  const {
    customComponents,
    floatingElementStyles,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    isInverse,
    isItemDisabled: itemDisabled = isItemDisabled,
    isLoading,
    isOpen,
    items,
    itemToString,
    itemToKey,
    maxHeight,
    menuStyle,
    setFloating,
    selectedItem,
    ...rest
  } = props;

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const setFloatingRef = React.useCallback(
    (node: Element | null) => {
      if (setFloating) {
        setFloating(isOpen ? node : null);
      }
    },
    [isOpen, setFloating]
  );

  const hasItems = items && items.length > 0;
  const selectedIndex = selectedItem
    ? findItemIndex(items, selectedItem, itemToString, undefined, itemToKey)
    : -1;

  const heightString = convertStyleValueToString(maxHeight);
  const { Item } = defaultComponents<T>({
    ...customComponents,
  });

  const LoadingIndicator = () => {
    return (
      <LoadingWrapper>
        <Spinner
          testId="itemsList-loadingIndicator"
          style={{ marginRight: theme.spaceScale.spacing02 }}
        />{' '}
        {i18n.combobox.loading}
      </LoadingWrapper>
    );
  };

  return (
    <div ref={setFloatingRef} style={{ ...floatingElementStyles, zIndex: '2' }}>
      <StyledCard
        borderRadius={CardBorderRadius.small}
        cornerTreatment={CardCornerTreatment.all}
        hasDropShadow
        isInverse={isInverse}
        isOpen={isOpen}
        style={menuStyle}
        theme={theme}
      >
        <StyledList
          isOpen={isOpen}
          maxHeight={heightString}
          role="listbox"
          onMouseLeave={() => {}}
          {...getMenuProps()}
          {...rest}
        >
          {isOpen && hasItems ? (
            items.map((item, index) => {
              const itemString = instanceOfToBeCreatedItemObject(item)
                ? item.label
                : itemToString(item);
              const isDisabled = itemDisabled(item, index);

              const { ref, ...otherDownshiftItemProps } = getItemProps({
                item,
                index,
              });

              const key = `${itemString}${index}`;
              const isSelected = index === selectedIndex;

              const itemProps: ItemRenderOptions<T> = {
                isFocused: highlightedIndex === index,
                isInverse,
                itemRef: ref,
                item,
                itemString,
                key,
                theme,
                isSelected,
                isDisabled: isDisabled,
                ...otherDownshiftItemProps,
                onMouseMove: () => {},
                role: 'option',
                'aria-selected': isSelected,
                'aria-label': isSelected
                  ? `${itemString} is selected`
                  : itemString,
              };

              return <Item<T> {...itemProps} key={key} />;
            })
          ) : (
            <StyledItem isInverse={isInverse} theme={theme} tabIndex={-1}>
              <NoItemsMessage theme={theme} isInverse={isInverse}>
                {isLoading ? <LoadingIndicator /> : i18n.emptyItemsListText}
              </NoItemsMessage>
            </StyledItem>
          )}
        </StyledList>
      </StyledCard>
    </div>
  );
}

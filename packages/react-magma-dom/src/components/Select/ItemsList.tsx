import styled from '@emotion/styled';
import { ReferenceType } from '@floating-ui/react-dom';
import {
  UseSelectGetItemPropsOptions,
  UseSelectGetMenuPropsOptions,
} from 'downshift';
import React from 'react';
import {
  instanceOfToBeCreatedItemObject,
} from '.';
import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { convertStyleValueToString } from '../../utils';
import { Spinner } from '../Spinner';
import {
  defaultComponents,
  ItemRenderOptions,
  SelectComponents,
} from './components';
import { StyledCard, StyledItem, StyledList } from './shared';
import { isItemDisabled } from './utils';

interface ItemsListProps<T> {
  customComponents?: SelectComponents<T>;
  floatingElementStyles?: React.CSSProperties;
  getItemProps: (options?: UseSelectGetItemPropsOptions<T>) => any;
  getMenuProps: (options?: UseSelectGetMenuPropsOptions) => any;
  highlightedIndex?: number;
  isInverse?: boolean;
  isLoading?: boolean;
  isOpen?: boolean;
  items: T[];
  itemToString: (item: T) => string;
  maxHeight?: number | string;
  menuStyle?: React.CSSProperties;
  setFloating?: (node: ReferenceType) => void;
  setHighlightedIndex?: (index: number) => void;
}

const NoItemsMessage = styled.span<{
  isInverse?: boolean;
}>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
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
    isLoading,
    isOpen,
    items,
    itemToString,
    maxHeight,
    menuStyle,
    setFloating,
    setHighlightedIndex,
  } = props;

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const hasItems = items && items.length > 0;

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

  function handleEscape(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      event.nativeEvent.stopImmediatePropagation();
    }
  }

  return (
    <div ref={setFloating} style={{ ...floatingElementStyles, zIndex: '2' }}>
      <StyledCard
        hasDropShadow
        isInverse={isInverse}
        isOpen={isOpen}
        onKeyDown={handleEscape}
        style={menuStyle}
        theme={theme}
      >
        <StyledList
          isOpen={isOpen}
          {...getMenuProps()}
          maxHeight={heightString}
        >
          {isOpen && hasItems ? (
            items.map((item, index) => {
              const itemString = instanceOfToBeCreatedItemObject(item)
                ? item.label
                : itemToString(item);
              const isDisabled = isItemDisabled(item)

              const { ref, ...otherDownshiftItemProps } = getItemProps({
                item,
                index,
                disabled: isDisabled,
              });

              const key = `${itemString}${index}`;

              const itemProps: ItemRenderOptions<T> = {
                isFocused: highlightedIndex === index,
                isInverse,
                itemRef: ref,
                item,
                itemString,
                key,
                theme,
                isDisabled: isDisabled,
                ...otherDownshiftItemProps,
              };

              if (isDisabled) {
                itemProps.onMouseEnter = () => {
                  setHighlightedIndex && setHighlightedIndex(-1);
                };
              }

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

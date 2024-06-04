import React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
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
import { convertStyleValueToString } from '../../utils';
import { Spinner } from '../Spinner';
import styled, { CreateStyled } from '@emotion/styled';
import { ThemeInterface } from '../../theme/magma';

interface ItemsListProps<T> {
  customComponents?: SelectComponents<T>;
  getItemProps: (options?: UseSelectGetItemPropsOptions<T>) => any;
  getMenuProps: (options?: UseSelectGetMenuPropsOptions) => any;
  highlightedIndex?: number;
  isOpen?: boolean;
  isInverse?: boolean;
  items: T[];
  itemToString: (item: T) => string;
  maxHeight?: number | string;
  menuStyle?: React.CSSProperties;
  isLoading?: boolean;
}

const typedStyled = styled as CreateStyled<ThemeInterface>;

const NoItemsMessage = typedStyled.span<{
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
    isOpen,
    isInverse,
    getMenuProps,
    isLoading,
    items,
    itemToString,
    highlightedIndex,
    getItemProps,
    maxHeight,
    menuStyle,
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
    <StyledCard
      hasDropShadow
      isInverse={isInverse}
      isOpen={isOpen}
      onKeyDown={handleEscape}
      style={menuStyle}
      theme={theme}
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
              isInverse,
              itemRef: ref,
              item,
              itemString,
              key,
              theme,
              ...otherDownshiftItemProps,
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
  );
}

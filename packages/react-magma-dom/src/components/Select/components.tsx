import * as React from 'react';
import { ArrowDropDownIcon, IconProps } from 'react-magma-icons';
import { ThemeInterface } from '../../theme/magma';
import { IconButton, IconButtonProps } from '../IconButton';
import { Spinner, SpinnerProps } from '../Spinner';
import { StyledItem } from './shared';

export type ItemRenderOptions<T> = {
  key: string;
  isFocused?: boolean;
  isInverse?: boolean;
  item: T;
  itemRef: React.Ref<HTMLLIElement>;
  itemString: string;
  theme: ThemeInterface;
  [key: string]: any;
};

export type SelectComponents<T> = {
  ClearIndicator?: React.FunctionComponent<IconButtonProps>;
  DropdownIndicator?: React.FunctionComponent<Partial<IconProps>>;
  LoadingIndicator?: React.FunctionComponent<SpinnerProps>;
  Item?: React.FunctionComponent<ItemRenderOptions<T>>;
};

export const DefaultClearIndicator = props => {
  return <IconButton testId="clearIndicator" {...props} />;
};

export const DefaultDropdownIndicator = props => {
  return (
    <ArrowDropDownIcon
      size={24}
      style={{ flexShrink: 0 }}
      testId="caretDown"
      {...props}
    />
  );
};

export const DefaultLoadingIndicator = props => {
  return <Spinner testId="loadingIndicator" {...props} />;
};

export function DefaultItem<T>({
  itemRef,
  itemString,
  isInverse,
  isDisabled,
  ...props
}: ItemRenderOptions<T>) {
  return (
    <StyledItem
      {...props}
      isInverse={isInverse}
      ref={itemRef}
      isDisabled={isDisabled}
      aria-disabled={isDisabled}
    >
      {itemString}
    </StyledItem>
  );
}

export function defaultComponents<T>(props: SelectComponents<T>) {
  return {
    ClearIndicator: DefaultClearIndicator,
    DropdownIndicator: DefaultDropdownIndicator,
    LoadingIndicator: DefaultLoadingIndicator,
    Item: DefaultItem,
    ...props,
  };
}

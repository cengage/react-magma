import * as React from 'react';
import { DownshiftSelectInterface } from '.';
import { useSelect } from 'downshift';

import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { Label } from '../Label';
import { ThemeContext } from '../../theme/ThemeContext';

import {
  SelectContainer,
  StyledButton,
  SelectText,
  StyledCard,
  StyledList,
  StyledItem
} from './shared';
import { defaultComponents } from './components';
import { CrossIcon, ButtonSize, ButtonVariant } from '../..';

export function Select<T>(props: DownshiftSelectInterface<T>) {
  const {
    components: customComponents,
    itemToString,
    items,
    labelText,
    isClearable,
    isDisabled
  } = props;
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    reset,
    openMenu
  } = useSelect(props);

  const theme = React.useContext(ThemeContext);
  const { ClearIndicator } = defaultComponents({ ...customComponents });

  function defaultHandleClearIndicatorClick(event: React.SyntheticEvent) {
    event.stopPropagation();

    reset();
  }

  return (
    <SelectContainer>
      <Label {...getLabelProps()}>{labelText}</Label>
      <StyledButton
        role="button"
        {...getToggleButtonProps({
          disabled: isDisabled,
          onKeyDown: event => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              openMenu();
            }
          }
        })}
        theme={theme}
        tabIndex={0}
      >
        <SelectText data-testid="selectedItemText">
          {itemToString(selectedItem) || 'Select...'}
        </SelectText>
        {isClearable && selectedItem && (
          <ClearIndicator
            aria-label="reset"
            icon={<CrossIcon size={10} />}
            onClick={defaultHandleClearIndicatorClick}
            size={ButtonSize.small}
            variant={ButtonVariant.link}
          />
        )}
        <CaretDownIcon size={10} testId="caretDown" />
      </StyledButton>
      <StyledCard hasDropShadow isOpen={isOpen}>
        <StyledList isOpen={isOpen} {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => {
              const itemString = itemToString(item);
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
    </SelectContainer>
  );
}

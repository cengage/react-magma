import * as React from 'react';
import { DownshiftSelectInterface } from '.';
import { useSelect } from 'downshift';

import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { Label } from '../Label';
import { ThemeContext } from '../../theme/ThemeContext';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { IconButton } from '../IconButton';
import { ButtonSize, ButtonVariant } from '../Button';

import {
  SelectContainer,
  StyledButton,
  SelectText,
  StyledCard,
  StyledList,
  StyledItem
} from './shared';

export const Select = (props: DownshiftSelectInterface) => {
  const { items, labelText, isClearable, isDisabled } = props;
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
          {selectedItem || 'Select...'}
        </SelectText>
        {isClearable && selectedItem && (
          <IconButton
            aria-label="reset"
            icon={<CrossIcon size={10} />}
            onClick={e => {
              e.stopPropagation();
              reset();
            }}
            size={ButtonSize.small}
            variant={ButtonVariant.link}
          />
        )}
        <CaretDownIcon size={10} testId="caretDown" />
      </StyledButton>
      <StyledCard hasDropShadow isOpen={isOpen}>
        <StyledList isOpen={isOpen} {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <StyledItem
                key={`${item}${index}`}
                isFocused={highlightedIndex === index}
                {...getItemProps({ item, index })}
                theme={theme}
              >
                {item}
              </StyledItem>
            ))}
        </StyledList>
      </StyledCard>
    </SelectContainer>
  );
};

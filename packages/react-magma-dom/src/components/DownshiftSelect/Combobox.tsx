import * as React from 'react';
import { DownshiftComboboxInterface } from '.';
import { useCombobox } from 'downshift';
import styled from '@emotion/styled';

import { baseInputStyles } from '../BaseInput';
import { ButtonShape, ButtonVariant, ButtonSize } from '../Button';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { Label } from '../Label';
import { IconButton } from '../IconButton';
import { ThemeContext } from '../../theme/ThemeContext';

import { SelectContainer, StyledCard, StyledList, StyledItem } from './shared';
import { Spinner } from '../Spinner';
import { CrossIcon } from '../Icon/types/CrossIcon';

const StyledInput = styled.input`
  ${baseInputStyles}

  border-radius: 5px 0 0 5px;
`;

const StyledIconButton = styled(IconButton)`
  border: 1px solid ${props => props.theme.colors.neutral03};
  border-left: 0;
  color: ${props => props.theme.colors.neutral01};
  margin: 0;
`;

export const Combobox = (props: DownshiftComboboxInterface) => {
  const {
    labelText,
    isClearable,
    isLoading,
    items,
    itemToString,
    onInputChange,
    onInputValueChange
  } = props;
  const [inputItems, setInputItems] = React.useState(items);
  const theme = React.useContext(ThemeContext);

  function defaultOnInputValueChange(changes) {
    setInputItems(
      items.filter(item =>
        itemToString(item)
          .toLowerCase()
          .startsWith(changes.inputValue.toLowerCase())
      )
    );
    onInputChange &&
      typeof onInputChange === 'function' &&
      onInputChange(changes);
  }

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    reset,
    selectedItem
  } = useCombobox({
    ...props,
    itemToString,
    items: inputItems,
    onInputValueChange:
      onInputValueChange && typeof onInputValueChange === 'function'
        ? changes => onInputValueChange(changes, setInputItems)
        : defaultOnInputValueChange
  });
  return (
    <SelectContainer>
      <Label {...getLabelProps()}>{labelText}</Label>
      <div {...getComboboxProps()} style={{ display: 'flex' }}>
        <StyledInput {...getInputProps()} theme={theme} />
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
        {isLoading ? (
          <Spinner />
        ) : (
          <StyledIconButton
            {...getToggleButtonProps()}
            aria-label="toggle menu"
            icon={<CaretDownIcon size={10} />}
            shape={ButtonShape.rightCap}
            theme={theme}
            variant={ButtonVariant.link}
          />
        )}
      </div>
      <StyledCard isOpen={isOpen} hasDropShadow>
        <StyledList isOpen={isOpen} {...getMenuProps()}>
          {inputItems.map((item, index) => {
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
};

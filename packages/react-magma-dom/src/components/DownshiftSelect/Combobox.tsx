import * as React from 'react';
import { DownshiftComboboxInterface } from '.';
import { useCombobox } from 'downshift';
import styled from '@emotion/styled';

import { baseInputStyles } from '../BaseInput';
import { ButtonShape, ButtonVariant } from '../Button';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { Label } from '../Label';
import { IconButton } from '../IconButton';
import { ThemeContext } from '../../theme/ThemeContext';

import { SelectContainer, StyledCard, StyledList, StyledItem } from './shared';

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
  const { items, labelText } = props;
  const [inputItems, setInputItems] = React.useState(items);
  const theme = React.useContext(ThemeContext);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps
  } = useCombobox({
    ...props,
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter(item =>
          item.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    }
  });
  return (
    <SelectContainer>
      <Label {...getLabelProps()}>{labelText}</Label>
      <div {...getComboboxProps()} style={{ display: 'flex' }}>
        <StyledInput {...getInputProps()} theme={theme} />
        <StyledIconButton
          {...getToggleButtonProps()}
          aria-label="toggle menu"
          icon={<CaretDownIcon size={10} />}
          shape={ButtonShape.rightCap}
          theme={theme}
          variant={ButtonVariant.link}
        />
      </div>
      <StyledCard isOpen={isOpen} hasDropShadow>
        <StyledList isOpen={isOpen} {...getMenuProps()}>
          {items.map((item, index) => (
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

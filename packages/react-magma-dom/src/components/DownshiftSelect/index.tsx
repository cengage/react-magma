import * as React from 'react';
import {
  useSelect,
  useCombobox,
  UseSelectProps,
  UseComboboxProps
} from 'downshift';
import { XOR } from '../../utils';
import styled from '../../theme/styled';

import { baseInputStyles } from '../BaseInput';
import { ButtonVariant, ButtonShape } from '../Button';
import { Card } from '../Card';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { IconButton } from '../IconButton';
import { Label } from '../Label';
import { ThemeContext } from '../../theme/ThemeContext';

export type DownshiftOption = string;

interface InternalSelectInterface {
  labelText: string;
}

export interface DownshiftSelectInterface
  extends UseSelectProps<DownshiftOption>,
    InternalSelectInterface {
  type?: 'select';
}

export interface DownshiftComboboxInterface
  extends UseComboboxProps<DownshiftOption>,
    InternalSelectInterface {
  type: 'combo';
}

export type SelectInterface = XOR<
  DownshiftSelectInterface,
  DownshiftComboboxInterface
>;

export function instanceOfCombobox(
  object: any
): object is DownshiftComboboxInterface {
  return 'type' in object && object.type === 'combo';
}

const SelectContainer = styled.div`
  position: relative;
`;

const StyledButton = styled.button`
  ${baseInputStyles}

  align-items: center;
  display: flex;
  text-align: left;
`;

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

const SelectText = styled.span`
  flex-grow: 1;
  padding-right: 10px;
`;

const StyledCard = styled(Card)<{}>`
  position: absolute;
  left: 5px;
  margin-top: 5px;
  padding: 10px 20px 0;
  right: 5px;
  z-index: 2;
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
`;

export const DownshiftSelect = (props: SelectInterface) => {
  const { items, labelText } = props;
  const [inputItems, setInputItems] = React.useState(items);
  const theme = React.useContext(ThemeContext);

  function renderSelect() {
    const {
      isOpen,
      selectedItem,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      highlightedIndex,
      getItemProps
    } = useSelect(props as DownshiftSelectInterface);
    return (
      <SelectContainer>
        <Label {...getLabelProps()}>{labelText}</Label>

        <StyledButton {...getToggleButtonProps()} theme={theme}>
          <SelectText>{selectedItem || 'Select...'}</SelectText>

          <CaretDownIcon size={10} testId="caretDown" />
        </StyledButton>
        {isOpen && (
          <StyledCard hasDropShadow>
            <StyledList {...getMenuProps()}>
              {items.map((item, index) => (
                <li
                  style={
                    highlightedIndex === index
                      ? { backgroundColor: '#bde4ff' }
                      : {}
                  }
                  key={`${item}${index}`}
                  {...getItemProps({ item, index })}
                >
                  {item}
                </li>
              ))}
            </StyledList>
          </StyledCard>
        )}
      </SelectContainer>
    );
  }

  function renderCombobox() {
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
        <Label {...getLabelProps()}>Choose an element:</Label>
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
        {isOpen && (
          <StyledCard hasDropShadow>
            <StyledList {...getMenuProps()}>
              {items.map((item, index) => (
                <li
                  style={
                    highlightedIndex === index
                      ? { backgroundColor: '#bde4ff' }
                      : {}
                  }
                  key={`${item}${index}`}
                  {...getItemProps({ item, index })}
                >
                  {item}
                </li>
              ))}
            </StyledList>
          </StyledCard>
        )}
      </SelectContainer>
    );
  }

  return instanceOfCombobox(props) ? renderCombobox() : renderSelect();
};

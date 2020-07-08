import * as React from 'react';
import { DownshiftSelectInterface } from '.';
import { useSelect } from 'downshift';
import styled from '../../theme/styled';

import { baseInputStyles } from '../BaseInput';
import { Card } from '../Card';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { Label } from '../Label';
import { ThemeContext } from '../../theme/ThemeContext';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { IconButton } from '../IconButton';
import { ButtonVariant } from '../Button';

const SelectContainer = styled.div`
  position: relative;
`;

const StyledButton = styled.div`
  ${baseInputStyles}

  align-items: center;
  display: flex;
  text-align: left;
`;

const SelectText = styled.span`
  flex-grow: 1;
  padding-right: 10px;
`;

const StyledCard = styled(Card)<{ isOpen?: boolean }>`
  position: absolute;
  left: 5px;
  margin-top: 5px;
  padding: 10px 20px 0;
  right: 5px;
  z-index: 2;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const StyledList = styled('ul')<{ isOpen?: boolean }>`
  list-style: none;
  margin: 0;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

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
            variant={ButtonVariant.link}
            icon={<CrossIcon size={10} />}
            onClick={e => {
              e.stopPropagation();
              reset();
            }}
          />
        )}
        <CaretDownIcon size={10} testId="caretDown" />
      </StyledButton>
      <StyledCard hasDropShadow isOpen={isOpen}>
        <StyledList isOpen={isOpen} {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
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
    </SelectContainer>
  );
};

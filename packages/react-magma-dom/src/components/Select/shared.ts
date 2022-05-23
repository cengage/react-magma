import styled from '../../theme/styled';

import { inputBaseStyles } from '../InputBase';
import { Card } from '../Card';

export const SelectContainer = styled.div`
  position: relative;
`;

export const StyledButton = styled.div`
  ${inputBaseStyles}
  align-items: center;
  display: flex;
  text-align: left;
`;

export const SelectText = styled.span`
  flex-grow: 1;
  padding: 0 8px 0 4px;
`;

export const StyledCard = styled(Card)<{
  isOpen?: boolean;
}>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  left: 4px;
  margin-top: 4px;
  padding: 4px 0 0;
  position: absolute;
  right: 4px;
  top: auto;
  z-index: 2;
`;

export const StyledList = styled('ul')<{ isOpen?: boolean; maxHeight: string }>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  list-style: none;
  margin: 0 0 4px;
  outline: none;
  padding: 0;
  max-height: ${props => props.maxHeight};
  overflow-y: auto;
`;

export const StyledItem = styled('li')<{ isFocused?: boolean }>`
  align-self: center;
  background: ${props =>
    props.isFocused ? props.theme.colors.neutral200 : 'transparent'};
  border: 2px solid;
  border-color: ${props =>
    props.isFocused ? props.theme.colors.focus : 'transparent'};
  cursor: default;
  line-height: 24px;
  margin: 0;
  padding: 8px 16px;
  &:hover {
    background: ${props =>
      props?.isFocused ? props?.theme?.colors?.neutral200 : 'transparent'};
    border-color: transparent;
  }
`;

export const SelectedItemsWrapper = styled.span`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  padding: 0 0 0 4px;
`;

export const SelectedItemButton = styled.button`
  align-self: center;
  background: ${props => props.theme.colors.neutral300};
  border-radius: 4px;
  border: 0;
  box-shadow: 0 0 0;
  display: flex;
  font-size: 12px;
  line-height: 16px;
  height: 24px;
  margin: 4px 2px 4px 4px;
  padding: ${props => props.theme.spaceScale.spacing02}
    ${props => props.theme.spaceScale.spacing02}
    ${props => props.theme.spaceScale.spacing02}
    ${props => props.theme.spaceScale.spacing03};
  position: relative;
  white-space: nowrap;
`;

export const IconWrapper = styled.span`
  padding-left: 12px;
`;

import styled from '../../theme/styled';

import { inputBaseStyles } from '../InputBase';
import { Card } from '../Card';
import { transparentize } from 'polished';

function buildListHoverColor(props) {
  if (props.isFocused) {
    if (props.isInverse) {
      return props.theme.colors.primary600;
    }
    return props.theme.colors.neutral200;
  }
  return 'transparent';
}

function buildListFocusColor(props) {
  if (props.isFocused) {
    if (props.isInverse) {
      return props.theme.colors.focusInverse;
    }
    return props.theme.colors.focus;
  }
  return 'transparent';
}

export const SelectContainer = styled('div')`
  position: relative;
`;

export const StyledButton = styled('div')`
  ${inputBaseStyles}
  align-items: center;
  display: flex;
  text-align: left;
`;

export const SelectText = styled('span')`
  flex-grow: 1;
  padding: 0 8px 0 4px;
`;

export const StyledCard = styled(Card)<{
  isOpen?: boolean;
  isInverse?: boolean;
}>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  background: ${props =>
    props.isInverse
      ? props.theme.colors.primary500
      : props.theme.colors.neutral100};
  border: 1x solid;
  border-color: ${props =>
    props.isInverse
      ? transparentize(0.5, props.theme.colors.tertiary)
      : props.theme.colors.neutral300};
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

export const StyledItem = styled('li')<{
  isInverse?: boolean;
  isFocused?: boolean;
}>`
  align-self: center;
  background: ${props => buildListHoverColor(props)};
  border: 2px solid;
  border-color: ${props => buildListFocusColor(props)};
  cursor: default;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  line-height: 24px;
  margin: 0;
  padding: 8px 16px;
  &:hover {
    background: ${props => buildListHoverColor(props)};
    border-color: transparent;
  }
`;

export const SelectedItemsWrapper = styled('span')`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  padding: 0 0 0 4px;
`;

function buildSelectedItemButtonBackground(props) {
  const { isInverse, disabled } = props;
  if (disabled) {
    if (isInverse) {
      return transparentize(0.7, props.theme.colors.neutral100);
    }
    return props.theme.colors.neutral300;
  }
  if (isInverse) {
    return props.theme.colors.tertiary;
  }
  return props.theme.colors.primary;
}

function buildSelectedItemButtonColor(props) {
  const { isInverse, disabled } = props;
  if (disabled) {
    if (isInverse) {
      return transparentize(0.6, props.theme.colors.neutral100);
    }
    return transparentize(0.4, props.theme.colors.neutral500);
  }
  if (isInverse) {
    return props.theme.colors.primary600;
  }
  return props.theme.colors.neutral100;
}

export const SelectedItemButton = styled('button')<{
  isInverse?: boolean;
  disabled?: boolean;
}>`
  align-self: center;
  background: ${props => buildSelectedItemButtonBackground(props)};
  border-radius: 4px;
  border: 0;
  box-shadow: 0 0 0;
  color: ${props => buildSelectedItemButtonColor(props)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
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

export const IconWrapper = styled('span')`
  padding-left: 12px;
`;

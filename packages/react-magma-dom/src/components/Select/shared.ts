import { inputBaseStyles } from '../InputBase';
import { Card } from '../Card';
import { transparentize } from 'polished';
import styled, { CreateStyled } from '@emotion/styled';
import { css } from '@emotion/core';
import { ThemeInterface } from '../../theme/magma';

const typedStyled = styled as CreateStyled<ThemeInterface>;

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

export const SelectContainer = styled.div`
  position: relative;
`;

export const StyledButton = styled.div`
  ${inputBaseStyles}
  align-items: center;
  display: flex;
  text-align: left;
`;

export const SelectText = styled.span<{
  isClearable?: boolean;
  isShowPlaceholder?: boolean;
  isInverse?: boolean;
  isDisabled?: boolean;
  theme?: ThemeInterface;
}>`
  padding-left: 4px;
  padding-right: ${props => (props.isClearable ? '2.5em' : '1.5em')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => {
    if (props.isShowPlaceholder) {
      return props.isInverse
        ? transparentize(0.3, props.theme.colors.neutral100)
        : props.theme.colors.neutral500;
    }
  }};
  ${props =>
    props.isDisabled &&
    props.isShowPlaceholder &&
    css`
      opacity: ${props.isInverse ? 0.4 : 0.6};
    `}
`;

export const StyledCard = typedStyled(Card)<{
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
  margin: 2px 0;
  padding: 4px 0 0;
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

export const StyledItem = typedStyled('li')<{
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

export const SelectedItemsWrapper = styled.span`
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

export const SelectedItemButton = typedStyled.button<{
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
  min-width: 0%;
  outline-offset: 2px;
  &:focus {
    outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
  }
`;

export const IconWrapper = styled.span`
  padding-left: 12px;
`;

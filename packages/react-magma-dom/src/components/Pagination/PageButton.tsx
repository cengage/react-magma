import * as React from 'react';
import { Button, ButtonColor, ButtonProps } from '../Button';
import { BuildBackground, BuildBorder, hoverBorder } from './Pagination';
import { darken } from 'polished';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export interface PaginationProps extends ButtonProps {
  isSelected?: boolean;
}

function typeSize(props) {
  if (props.size === 'large') {
    return `${props.theme.typeScale.size05.fontSize}`;
  }
  return `${props.theme.typeScale.size02.fontSize}`;
}

function buttonSize(props) {
  switch (props.size) {
    case 'large':
      return `${props.theme.spaceScale.spacing11}`;
    default:
      return `${props.theme.spaceScale.spacing09}`;
  }
}

function typeColor(props) {
  switch (props.color) {
    case 'primary':
      if (props.isInverse) {
        return `${props.theme.colors.neutral}`;
      }
      return `${props.theme.colors.neutral08}`;
    default:
      if (props.isInverse) {
        return `${props.theme.colors.neutral08}`;
      }
      return `inherit`;
  }
}

function boxShadowColor(props) {
  if (props.color === 'primary') {
    if (props.isInverse) {
      return `-${props.theme.spaceScale.spacing01} 0 0 ${props.theme.colors.neutral08}`;
    }
    return `-${props.theme.spaceScale.spacing01} 0 0 ${props.theme.colors.primary}`;
  }
}

function hoverBoxShadowColor(props) {
  if (props.color === 'primary') {
    if (props.isInverse) {
      return `-${props.theme.spaceScale.spacing01} 0 0 ${props.theme.colors.neutral08}`;
    }
    return `-${props.theme.spaceScale.spacing01} 0 0 ${darken(
      0.1,
      props.theme.colors.primary
    )}`;
  }
}

const StyledPageButton = styled(Button)`
  background: ${BuildBackground};
  border: none;
  border-top: ${BuildBorder};
  border-right: ${BuildBorder};
  border-bottom: ${BuildBorder};
  border-radius: 0;
  box-shadow: ${boxShadowColor};
  color: ${typeColor};
  font-size: ${typeSize} !important;
  height: ${buttonSize};
  margin: 0;
  min-width: 0;
  padding: 0;
  width: ${buttonSize};
  &:active {
    background: ${props =>
      props.isInverse
        ? props.theme.colors.neutral08
        : darken(0.1, props.theme.colors.primary)} !important;
    border-color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral08
        : darken(0.1, props.theme.colors.primary)} !important;
    box-shadow: -2px 0 0
      ${props =>
        props.isInverse
          ? props.theme.colors.neutral08
          : darken(0.1, props.theme.colors.primary)} !important;
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral
        : props.theme.colors.neutral08} !important;
  }
  &:focus {
    border-color: ${hoverBorder};
    box-shadow: ${hoverBoxShadowColor};
    outline: 0 !important;
    outline-offset: 0;
    overflow: visible;
    z-index: 1;
  }
  &:focus:before {
    content: '';
    border: ${props => props.theme.spaceScale.spacing01} solid
      ${props => props.theme.colors.focus};
    border-style: dotted;
    height: calc(100% + 14px);
    left: -7px;
    position: absolute;
    top: -7px;
    width: calc(100% + 14px);
  }
`;

export const PageButton = React.forwardRef<HTMLButtonElement, PaginationProps>(
  (props, ref) => {
    const { children, isSelected, ...other } = props;
    const theme = React.useContext(ThemeContext);

    return (
      <StyledPageButton
        ref={ref}
        {...other}
        color={isSelected ? ButtonColor.primary : ButtonColor.secondary}
        theme={theme}
      >
        {children}
      </StyledPageButton>
    );
  }
);

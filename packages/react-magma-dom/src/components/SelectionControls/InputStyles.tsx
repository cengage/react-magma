import { css } from '@emotion/core';

export const DisplayInputStyles = css`
  align-items: center;
  border: 2px solid;
  display: flex;
  height: 20px;
  flex-shrink: 0;
  justify-content: center;
  margin: 2px 10px 0 10px;
  position: relative;
  transition: all 0.2s ease-out;
  width: 20px;

  &:before,
  &:after {
    // focus and active states
    content: '';
    position: absolute;
  }

  &:after {
    // active state
    border-radius: 50%;
    height: 40px;
    left: -12px;
    opacity: 0;
    padding: 50%;
    top: -12px;
    transform: scale(1);
    transition: opacity 1s, transform 0.5s;
    width: 40px;
  }
`;

export const DisplayInputActiveStyles = css`
  opacity: 0.4;
  transform: scale(0);
  transition: transform 0s;
`;

export function buildDisplayInputActiveBackground(props) {
  return props.isInverse
    ? props.theme.colors.neutral08
    : props.color
    ? props.color
    : props.theme.colors.primary;
}

export function buildDisplayInputBorderColor(props) {
  if (props.isInverse) {
    if (props.disabled) {
      return props.theme.colors.disabledInverseText;
    }
    return props.theme.colors.neutral08;
  }
  if (props.hasError) {
    return props.theme.colors.danger;
  }
  if (props.disabled) {
    return props.theme.colors.neutral05;
  }
  if (!props.checked && !props.isIndeterminate) {
    return props.theme.colors.neutral02;
  }
  return props.color ? props.color : props.theme.colors.primary;
}

export function buildDisplayInputFocusStyles(props) {
  return css`
    height: 30px;
    position: absolute;
    width: 30px;
    outline: 2px dotted
      ${props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
    top: -7px;
    left: -7px;
  `;
}

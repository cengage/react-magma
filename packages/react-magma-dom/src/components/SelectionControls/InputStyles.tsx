import { css } from '@emotion/core';

export const DisplayInputStyles = css`
  align-items: center;
  display: flex;
  height: 24px;
  flex-shrink: 0;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease-out;
  width: 24px;

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
    left: -10px;
    opacity: 0;
    padding: 50%;
    top: -10px;
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
  if (props.hasError) {
    if (props.isInverse) {
      return props.theme.colors.dangerInverse;
    }
    return props.theme.colors.danger;
  }
  return 'transparent';
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
    top: -5px;
    left: -5px;
  `;
}

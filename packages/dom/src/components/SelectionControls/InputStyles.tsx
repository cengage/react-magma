import { css } from '@emotion/react';

export const DisplayInputStyles = props => css`
  align-items: center;
  display: flex;
  height: var(--spaceScale-spacing06);
  flex-shrink: 0;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease-out;
  width: var(--spaceScale-spacing06);

  &:before,
  &:after {
    // focus and active states
    content: '';
    position: absolute;
  }

  &:after {
    // active state
    border-radius: 50%;
    height: var(--spaceScale-spacing09);
    left: calc(var(--spaceScale-spacing03) * -1);
    opacity: 0;
    padding: 50%;
    top: calc(var(--spaceScale-spacing03) * -1);
    transform: scale(1);
    transition: opacity 1s, transform 0.5s;
    width: var(--spaceScale-spacing09);
  }
`;

export const DisplayInputActiveStyles = css`
  opacity: 0.4;
  transform: scale(0);
  transition: transform 0s;
`;

export function buildDisplayInputActiveBackground(props) {
  return props.isInverse
    ? 'var(--colors-neutral08)'
    : props.color
    ? props.color
    : 'var(--colors-primary)';
}

export function buildDisplayInputBorderColor(props) {
  if (props.hasError) {
    if (props.isInverse) {
      return 'var(--colors-dangerInverse)';
    }
    return 'var(--colors-danger)';
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
        ? 'var(--colors-focusInverse)'
        : 'var(--colors-focus)'};
  `;
}

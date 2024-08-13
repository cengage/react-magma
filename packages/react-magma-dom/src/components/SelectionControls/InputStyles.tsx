import { css } from '@emotion/react';

export const DisplayInputStyles = props => css`
  align-items: center;
  display: flex;
  height: ${props.theme.spaceScale.spacing06};
  flex-shrink: 0;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease-out;
  width: ${props.theme.spaceScale.spacing06};

  &:before,
  &:after {
    // focus and active states
    content: '';
    position: absolute;
  }

  &:after {
    // active state
    border-radius: 50%;
    height: ${props.theme.spaceScale.spacing09};
    left: -${props.theme.spaceScale.spacing03};
    opacity: 0;
    padding: 50%;
    top: -${props.theme.spaceScale.spacing03};
    transform: scale(1);
    transition: opacity 1s, transform 0.5s;
    width: ${props.theme.spaceScale.spacing09};
  }
`;

export const DisplayInputActiveStyles = css`
  opacity: 0.4;
  transform: scale(0);
  transition: transform 0s;
`;

export function buildDisplayInputActiveBackground(props) {
  return props.isInverse
    ? props.theme.colors.neutral100
    : props.color
    ? props.color
    : props.theme.colors.primary;
}

export function buildDisplayInputBorderColor(props) {
  if (props.hasError) {
    if (props.isInverse) {
      return props.theme.colors.danger200;
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
    outline: 2px solid
      ${props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
  `;
}

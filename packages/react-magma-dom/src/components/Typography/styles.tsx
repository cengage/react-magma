import { css } from '@emotion/core';

import { TypographyColor } from '../Typography';

export const colorStyles = props => css`
color: ${
  props.isInverse
    ? props.theme.colors.neutral08
    : props.typeStyle === 'expressive'
    ? props.theme.colors.foundation02
    : props.theme.colors.neutral01
};

${props.color === TypographyColor.danger &&
  !props.isInverse &&
  css`
    color: ${props.theme.colors.danger};
  `}

${props.color === TypographyColor.success &&
  !props.isInverse &&
  css`
    color: ${props.theme.colors.success01};
  `}

${props.color === TypographyColor.subdued &&
  !props.isInverse &&
  css`
    color: ${props.theme.colors.neutral03};
  `}

${props.color === TypographyColor.subdued &&
  props.isInverse &&
  css`
    color: ${props.theme.colors.focusInverse};
  `}`;

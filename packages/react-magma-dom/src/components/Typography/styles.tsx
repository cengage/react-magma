import { css } from '@emotion/core';

import { TypographyColor, TypographyContextVariant } from '../Typography';

export function getBodyFontFamily(props) {
  switch (props.contextVariant) {
    case TypographyContextVariant.expressive:
      return props.theme.bodyExpressiveFont;
    case TypographyContextVariant.narrative:
      return props.theme.bodyNarrativeFont;
    default:
      return props.theme.bodyFont;
  }
}

export const colorStyles = props => css`
  color: ${props.isInverse
    ? props.theme.colors.neutral08
    : props.contextVariant === 'expressive'
    ? props.theme.colors.foundation02
    : props.theme.colors.neutral};

  ${props.color === TypographyColor.danger &&
  !props.isInverse &&
  css`
    color: ${props.theme.colors.danger};
  `}

  ${props.color === TypographyColor.success &&
  !props.isInverse &&
  css`
    color: ${props.theme.colors.success};
  `}

${props.color === TypographyColor.subdued &&
  !props.isInverse &&
  css`
    color: ${props.theme.colors.neutral03};
  `}

  ${props.color === TypographyColor.danger &&
  props.isInverse &&
  css`
    color: ${props.theme.colors.dangerInverse};
  `}

  ${props.color === TypographyColor.success &&
  props.isInverse &&
  css`
    color: ${props.theme.colors.successInverse};
  `}

${props.color === TypographyColor.subdued &&
  props.isInverse &&
  css`
    color: ${props.theme.colors.focusInverse};
  `}
`;

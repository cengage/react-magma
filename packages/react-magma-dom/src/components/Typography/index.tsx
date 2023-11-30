import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';

export interface TypographyProps<T = HTMLParagraphElement>
  extends React.HTMLAttributes<T> {
  as?: string;
  children?: any;
  color?: TypographyColor;
  contextVariant?: TypographyContextVariant;
  element?: string;
  isInverse?: boolean;
  noMargins?: boolean;
  ref?: any;
  /**
   * @internal
   */
  testId?: string;
  theme?: any;
  visualStyle?: TypographyVisualStyle;
}

export enum TypographyColor {
  danger = 'danger',
  default = 'default', // default
  success = 'success',
  subdued = 'subdued',
}

export enum TypographyContextVariant {
  default = 'default', // default - productive
  expressive = 'expressive',
  narrative = 'narrative',
}

export enum TypographyVisualStyle {
  heading2XLarge = 'heading2XLarge',
  headingXLarge = 'headingXLarge',
  headingLarge = 'headingLarge',
  headingMedium = 'headingMedium',
  headingSmall = 'headingSmall',
  headingXSmall = 'headingXSmall',
  heading2XSmall = 'heading2XSmall',
  bodyLarge = 'bodyLarge',
  bodyMedium = 'bodyMedium',
  bodySmall = 'bodySmall',
  bodyXSmall = 'bodyXSmall',
}

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
    ? props.theme.colors.neutral100
    : props.contextVariant === 'expressive'
    ? props.theme.colors.primary600
    : props.theme.colors.neutral700};

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
    color: ${props.theme.colors.neutral500};
  `}

  ${props.color === TypographyColor.danger &&
  props.isInverse &&
  css`
    color: ${props.theme.colors.danger200};
  `}

  ${props.color === TypographyColor.success &&
  props.isInverse &&
  css`
    color: ${props.theme.colors.success200};
  `}

${props.color === TypographyColor.subdued &&
  props.isInverse &&
  css`
    color: ${props.theme.colors.neutral100};
    opacity: 0.7;
  `}
`;

const baseParagraphStyles = props => css`
  ${colorStyles(props)}
  font-family: ${getBodyFontFamily(props)};
  font-weight: normal;
`;

export const paragraphLargeStyles = props => css`
  ${baseParagraphStyles(props)}

  margin: ${props.noMargins ? '0' : `${props.theme.spaceScale.spacing06} 0`};

  font-size: ${props.theme.typographyVisualStyles.bodyLarge.mobile.fontSize};
  line-height: ${props.theme.typographyVisualStyles.bodyLarge.mobile
    .lineHeight};

  @media (min-width: ${props.theme.breakpoints.small}px) {
    font-size: ${props.theme.typographyVisualStyles.bodyLarge.desktop.fontSize};
    line-height: ${props.theme.typographyVisualStyles.bodyLarge.desktop
      .lineHeight};
  }

  ${props.contextVariant === TypographyContextVariant.expressive &&
  css`
    font-size: ${props.theme.typographyExpressiveVisualStyles.bodyLarge.mobile
      .fontSize};
    line-height: ${props.theme.typographyExpressiveVisualStyles.bodyLarge.mobile
      .lineHeight};

    @media (min-width: ${props.theme.breakpoints.small}px) {
      font-size: ${props.theme.typographyExpressiveVisualStyles.bodyLarge
        .desktop.fontSize};
      line-height: ${props.theme.typographyExpressiveVisualStyles.bodyLarge
        .desktop.lineHeight};
    }
  `};
`;

export const paragraphMediumStyles = props => css`
  ${baseParagraphStyles(props)}

  font-size: ${props.theme.typographyVisualStyles.bodyMedium.mobile.fontSize};
  line-height: ${props.theme.typographyVisualStyles.bodyMedium.mobile
    .lineHeight};
  margin: ${props.noMargins ? '0' : `${props.theme.spaceScale.spacing06} 0`};

  @media (min-width: ${props.theme.breakpoints.small}px) {
    font-size: ${props.theme.typographyVisualStyles.bodyMedium.desktop
      .fontSize};
    line-height: ${props.theme.typographyVisualStyles.bodyMedium.desktop
      .lineHeight};
  }
`;

export const paragraphSmallStyles = props => css`
  ${baseParagraphStyles(props)}

  font-size: ${props.theme.typographyVisualStyles.bodySmall.mobile.fontSize};
  letter-spacing: ${props.theme.typographyVisualStyles.bodySmall.mobile
    .letterSpacing};
  line-height: ${props.theme.typographyVisualStyles.bodySmall.mobile
    .lineHeight};
  margin: ${props.noMargins ? '0' : `${props.theme.spaceScale.spacing05} 0`};

  @media (min-width: ${props.theme.breakpoints.small}px) {
    font-size: ${props.theme.typographyVisualStyles.bodySmall.desktop.fontSize};
    letter-spacing: ${props.theme.typographyVisualStyles.bodySmall.desktop
      .letterSpacing};
    line-height: ${props.theme.typographyVisualStyles.bodySmall.desktop
      .lineHeight};
  }
`;

export const paragraphXSmallStyles = props => css`
  ${baseParagraphStyles(props)}

  font-size: ${props.theme.typographyVisualStyles.bodyXSmall.mobile.fontSize};
  letter-spacing: ${props.theme.typographyVisualStyles.bodyXSmall.mobile
    .letterSpacing};
  line-height: ${props.theme.typographyVisualStyles.bodyXSmall.mobile
    .lineHeight};
  margin: ${props.noMargins ? '0' : `${props.theme.spaceScale.spacing03} 0`};

  @media (min-width: ${props.theme.breakpoints.small}px) {
    font-size: ${props.theme.typographyVisualStyles.bodyXSmall.desktop
      .fontSize};
    letter-spacing: ${props.theme.typographyVisualStyles.bodyXSmall.desktop
      .letterSpacing};
    line-height: ${props.theme.typographyVisualStyles.bodyXSmall.desktop
      .lineHeight};
  }
`;

function getHeadingFontFamily(props) {
  switch (props.contextVariant) {
    case TypographyContextVariant.expressive:
      return props.theme.headingExpressiveFont;
    case TypographyContextVariant.narrative:
      return props.theme.headingNarrativeFont;
    default:
      return props.theme.headingFont;
  }
}

const baseHeadingStyles = props => css`
  border-bottom: 2px solid transparent;
  font-family: ${getHeadingFontFamily(props)};
  padding: 0;

  &:focus {
    border-bottom: 2px solid
      ${props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
    outline: 0;
    transition: border 0.1s linear;
  }

  ${colorStyles(props)}
`;

export const heading2XLargeStyles = props => css`
  ${baseHeadingStyles(props)}

  ${props.contextVariant === 'expressive' &&
  css`
    font-size: ${props.theme.typographyExpressiveVisualStyles.heading2XLarge
      .mobile.fontSize};
    font-weight: ${props.theme.typographyExpressiveVisualStyles.heading2XLarge
      .fontWeight};
    line-height: ${props.theme.typographyExpressiveVisualStyles.heading2XLarge
      .mobile.lineHeight};

    @media (min-width: ${props.theme.breakpoints.small}px) {
      font-size: ${props.theme.typographyExpressiveVisualStyles.heading2XLarge
        .desktop.fontSize};
      line-height: ${props.theme.typographyExpressiveVisualStyles.headingXLarge
        .lineHeight.lineHeight};
    }
  `};
`;

export const headingXLargeStyles = props => css`
  ${baseHeadingStyles(props)}

  font-size: ${props.theme.typographyVisualStyles.headingXLarge.mobile
    .fontSize};
  font-weight: ${props.theme.typographyVisualStyles.headingXLarge.fontWeight};
  line-height: ${props.theme.typographyVisualStyles.headingXLarge.mobile
    .lineHeight};
  margin: ${props.noMargins ? 0 : `0 0 ${props.theme.spaceScale.spacing05}`};

  @media (min-width: ${props.theme.breakpoints.small}px) {
    font-size: ${props.theme.typographyVisualStyles.headingXLarge.desktop
      .fontSize};
    line-height: ${props.theme.typographyVisualStyles.headingXLarge.desktop
      .lineHeight};
  }

  ${props.contextVariant === 'expressive' &&
  css`
    font-size: ${props.theme.typographyExpressiveVisualStyles.headingXLarge
      .mobile.fontSize};
    font-weight: ${props.theme.typographyExpressiveVisualStyles.headingXLarge
      .fontWeight};
    line-height: ${props.theme.typographyExpressiveVisualStyles.headingXLarge
      .lineHeight.lineHeight};

    @media (min-width: ${props.theme.breakpoints.small}px) {
      font-size: ${props.theme.typographyExpressiveVisualStyles.headingXLarge
        .desktop.fontSize};
      line-height: ${props.theme.typographyExpressiveVisualStyles.headingXLarge
        .desktop.lineHeight};
    }
  `};

  ${props.contextVariant === 'narrative' &&
  css`
    font-size: ${props.theme.typographyNarrativeVisualStyles.headingXLarge
      .mobile.fontSize};
    font-weight: ${props.theme.typographyNarrativeVisualStyles.headingXLarge
      .fontWeight};
    line-height: ${props.theme.typographyNarrativeVisualStyles.headingXLarge
      .mobile.lineHeight};
    @media (min-width: ${props.theme.breakpoints.small}px) {
      font-size: ${props.theme.typographyNarrativeVisualStyles.headingXLarge
        .desktop.fontSize};
      line-height: ${props.theme.typographyNarrativeVisualStyles.headingXLarge
        .desktop.lineHeight};
    }
  `};
`;

export const headingLargeStyles = props => css`
  ${baseHeadingStyles(props)}

  font-size: ${props.theme.typographyVisualStyles.headingLarge.mobile.fontSize};
  font-weight: ${props.theme.typographyVisualStyles.headingLarge.fontWeight};
  line-height: ${props.theme.typographyVisualStyles.headingLarge.mobile
    .lineHeight};
  margin: ${props.noMargins
    ? 0
    : `${props.theme.spaceScale.spacing10} 0 ${props.theme.spaceScale.spacing05}`};

  @media (min-width: ${props.theme.breakpoints.small}px) {
    font-size: ${props.theme.typographyVisualStyles.headingLarge.desktop
      .fontSize};
    line-height: ${props.theme.typographyVisualStyles.headingLarge.desktop
      .lineHeight};
  }

  ${props.contextVariant === 'expressive' &&
  css`
    font-size: ${props.theme.typographyExpressiveVisualStyles.headingLarge
      .mobile.fontSize};
    font-weight: ${props.theme.typographyExpressiveVisualStyles.headingLarge
      .fontWeight};
    line-height: ${props.theme.typographyExpressiveVisualStyles.headingLarge
      .mobile.lineHeight};

    @media (min-width: ${props.theme.breakpoints.small}px) {
      font-size: ${props.theme.typographyExpressiveVisualStyles.headingLarge
        .desktop.fontSize};
      line-height: ${props.theme.typographyExpressiveVisualStyles.headingLarge
        .desktop.lineHeight};
    }
  `};

  ${props.contextVariant === 'narrative' &&
  css`
    font-size: ${props.theme.typographyNarrativeVisualStyles.headingLarge.mobile
      .fontSize};
    font-weight: ${props.theme.typographyNarrativeVisualStyles.headingLarge
      .fontWeight};
    line-height: ${props.theme.typographyNarrativeVisualStyles.headingLarge
      .mobile.lineHeight};
    @media (min-width: ${props.theme.breakpoints.small}px) {
      font-size: ${props.theme.typographyNarrativeVisualStyles.headingLarge
        .desktop.fontSize};
      line-height: ${props.theme.typographyNarrativeVisualStyles.headingLarge
        .desktop.lineHeight};
    }
  `};
`;

export const headingMediumStyles = props => css`
  ${baseHeadingStyles(props)};

  font-size: ${props.theme.typographyVisualStyles.headingMedium.mobile
    .fontSize};
  font-weight: ${props.theme.typographyVisualStyles.headingMedium.fontWeight};
  line-height: ${props.theme.typographyVisualStyles.headingMedium.mobile
    .lineHeight};
  margin: ${props.noMargins
    ? 0
    : `${props.theme.spaceScale.spacing09} 0 ${props.theme.spaceScale.spacing05}`};

  @media (min-width: ${props.theme.breakpoints.small}px) {
    font-size: ${props.theme.typographyVisualStyles.headingMedium.desktop
      .fontSize};
    line-height: ${props.theme.typographyVisualStyles.headingMedium.desktop
      .lineHeight};
  }

  ${props.contextVariant === 'expressive' &&
  css`
    font-size: ${props.theme.typographyExpressiveVisualStyles.headingMedium
      .mobile.fontSize};
    font-weight: ${props.theme.typographyExpressiveVisualStyles.headingMedium
      .fontWeight};
    line-height: ${props.theme.typographyExpressiveVisualStyles.headingMedium
      .mobile.lineHeight};

    @media (min-width: ${props.theme.breakpoints.small}px) {
      font-size: ${props.theme.typographyExpressiveVisualStyles.headingMedium
        .desktop.fontSize};
      font-weight: ${props.theme.typographyExpressiveVisualStyles.headingSmall
        .fontWeight};
      line-height: ${props.theme.typographyExpressiveVisualStyles.headingMedium
        .desktop.lineHeight};
    }
  `};

  ${props.contextVariant === 'narrative' &&
  css`
    font-size: ${props.theme.typographyNarrativeVisualStyles.headingMedium
      .mobile.fontSize};
    font-weight: ${props.theme.typographyNarrativeVisualStyles.headingMedium
      .fontWeight};
    line-height: ${props.theme.typographyNarrativeVisualStyles.headingMedium
      .mobile.lineHeight};
    @media (min-width: ${props.theme.breakpoints.small}px) {
      font-size: ${props.theme.typographyNarrativeVisualStyles.headingMedium
        .desktop.fontSize};
      line-height: ${props.theme.typographyNarrativeVisualStyles.headingMedium
        .desktop.lineHeight};
    }
  `};
`;

export const headingSmallStyles = props => css`
  ${baseHeadingStyles(props)}

  font-size: ${props.theme.typographyVisualStyles.headingSmall.mobile.fontSize};
  font-weight: ${props.theme.typographyVisualStyles.headingSmall.fontWeight};
  line-height: ${props.theme.typographyVisualStyles.headingSmall.mobile
    .lineHeight};
  margin: ${props.noMargins
    ? 0
    : `${props.theme.spaceScale.spacing08} 0 ${props.theme.spaceScale.spacing05}`};

  @media (min-width: ${props.theme.breakpoints.small}px) {
    font-size: ${props.theme.typographyVisualStyles.headingSmall.desktop
      .fontSize};
    line-height: ${props.theme.typographyVisualStyles.headingSmall.desktop
      .lineHeight};
  }
  ${props.contextVariant === 'expressive' &&
  css`
    font-size: ${props.theme.typographyExpressiveVisualStyles.headingSmall
      .mobile.fontSize};
    font-weight: ${props.theme.typographyExpressiveVisualStyles.headingSmall
      .fontWeight};
    line-height: ${props.theme.typographyExpressiveVisualStyles.headingSmall
      .mobile.lineHeight};

    @media (min-width: ${props.theme.breakpoints.small}px) {
      font-size: ${props.theme.typographyExpressiveVisualStyles.headingSmall
        .desktop.fontSize};
      line-height: ${props.theme.typographyExpressiveVisualStyles.headingSmall
        .desktop.lineHeight};
    }
  `};

  ${props.contextVariant === 'narrative' &&
  css`
    font-size: ${props.theme.typographyNarrativeVisualStyles.headingSmall.mobile
      .fontSize};
    font-weight: ${props.theme.typographyNarrativeVisualStyles.headingSmall
      .fontWeight};
    line-height: ${props.theme.typographyNarrativeVisualStyles.headingSmall
      .mobile.lineHeight};
    @media (min-width: ${props.theme.breakpoints.small}px) {
      font-size: ${props.theme.typographyNarrativeVisualStyles.headingSmall
        .desktop.fontSize};
      line-height: ${props.theme.typographyNarrativeVisualStyles.headingSmall
        .desktop.lineHeight};
    }
  `};
`;

export const headingXSmallStyles = props => css`
  ${baseHeadingStyles(props)}

  font-size: ${props.theme.typographyVisualStyles.headingXSmall.mobile
    .fontSize};
  font-weight: ${props.theme.typographyVisualStyles.headingXSmall.fontWeight};
  line-height: ${props.theme.typographyVisualStyles.headingXSmall.mobile
    .lineHeight};
  margin: ${props.noMargins
    ? 0
    : `${props.theme.spaceScale.spacing06} 0 ${props.theme.spaceScale.spacing05}`};

  @media (min-width: ${props.theme.breakpoints.small}px) {
    font-size: ${props.theme.typographyVisualStyles.headingXSmall.desktop
      .fontSize};
    line-height: ${props.theme.typographyVisualStyles.headingXSmall.desktop
      .lineHeight};
  }

  ${props.contextVariant === 'expressive' &&
  css`
    font-size: ${props.theme.typographyExpressiveVisualStyles.headingXSmall
      .mobile.fontSize};
    font-weight: ${props.theme.typographyExpressiveVisualStyles.headingXSmall
      .fontWeight};
    line-height: ${props.theme.typographyExpressiveVisualStyles.headingXSmall
      .mobile.lineHeight};

    @media (min-width: ${props.theme.breakpoints.small}px) {
      font-size: ${props.theme.typographyExpressiveVisualStyles.headingXSmall
        .desktop.fontSize};
      line-height: ${props.theme.typographyExpressiveVisualStyles.headingXSmall
        .desktop.lineHeight};
    }
  `};

  ${props.contextVariant === 'narrative' &&
  css`
    font-size: ${props.theme.typographyNarrativeVisualStyles.headingXSmall
      .mobile.fontSize};
    font-weight: ${props.theme.typographyNarrativeVisualStyles.headingXSmall
      .fontWeight};
    line-height: ${props.theme.typographyNarrativeVisualStyles.headingXSmall
      .mobile.lineHeight};
    @media (min-width: ${props.theme.breakpoints.small}px) {
      font-size: ${props.theme.typographyNarrativeVisualStyles.headingXSmall
        .desktop.fontSize};
      line-height: ${props.theme.typographyNarrativeVisualStyles.headingXSmall
        .desktop.lineHeight};
    }
  `};
`;

export const heading2XSmallStyles = props => css`
  ${baseHeadingStyles(props)}

  font-size: ${props.theme.typographyVisualStyles.heading2XSmall.mobile
    .fontSize};
  font-weight: ${props.theme.typographyVisualStyles.heading2XSmall.fontWeight};
  letter-spacing: ${props.theme.typographyVisualStyles.heading2XSmall.mobile
    .letterSpacing};
  line-height: ${props.theme.typographyVisualStyles.heading2XSmall.mobile
    .lineHeight};
  text-transform: uppercase;
  margin: ${props.noMargins
    ? 0
    : `${props.theme.spaceScale.spacing06} 0 ${props.theme.spaceScale.spacing03}`};

  @media (min-width: ${props.theme.breakpoints.small}px) {
    font-size: ${props.theme.typographyVisualStyles.heading2XSmall.desktop
      .fontSize};
    letter-spacing: ${props.theme.typographyVisualStyles.heading2XSmall.desktop
      .letterSpacing};
    line-height: ${props.theme.typographyVisualStyles.heading2XSmall.desktop
      .lineHeight};
  }

  ${props.contextVariant === 'expressive' &&
  css`
    font-size: ${props.theme.typographyExpressiveVisualStyles.heading2XSmall
      .mobile.fontSize};
    font-weight: ${props.theme.typographyExpressiveVisualStyles.heading2XSmall
      .fontWeight};
    letter-spacing: ${props.theme.typographyExpressiveVisualStyles
      .heading2XSmall.mobile.letterSpacing};
    line-height: ${props.theme.typographyExpressiveVisualStyles.heading2XSmall
      .mobile.lineHeight};
    text-transform: none;

    @media (min-width: ${props.theme.breakpoints.small}px) {
      font-size: ${props.theme.typographyExpressiveVisualStyles.heading2XSmall
        .desktop.fontSize};
      letter-spacing: ${props.theme.typographyExpressiveVisualStyles
        .heading2XSmall.desktop.letterSpacing};
      line-height: ${props.theme.typographyExpressiveVisualStyles.heading2XSmall
        .desktop.lineHeight};
    }
  `};

  ${props.contextVariant === 'narrative' &&
  css`
    font-size: ${props.theme.typographyNarrativeVisualStyles.heading2XSmall
      .mobile.fontSize};
    font-weight: ${props.theme.typographyNarrativeVisualStyles.heading2XSmall
      .fontWeight};
    letter-spacing: ${props.theme.typographyNarrativeVisualStyles.heading2XSmall
      .mobile.letterSpacing};
    line-height: ${props.theme.typographyNarrativeVisualStyles.heading2XSmall
      .mobile.lineHeight};
    @media (min-width: ${props.theme.breakpoints.small}px) {
      font-size: ${props.theme.typographyNarrativeVisualStyles.heading2XSmall
        .desktop.fontSize};
      letter-spacing: ${props.theme.typographyNarrativeVisualStyles
        .heading2XSmall.desktop.letterSpacing};
      line-height: ${props.theme.typographyNarrativeVisualStyles.heading2XSmall
        .desktop.lineHeight};
    }
  `};
`;

function getTypographyStyles(props) {
  switch (props.visualStyle) {
    case TypographyVisualStyle.heading2XLarge:
      return heading2XLargeStyles(props);
    case TypographyVisualStyle.headingXLarge:
      return headingXLargeStyles(props);
    case TypographyVisualStyle.headingLarge:
      return headingLargeStyles(props);
    case TypographyVisualStyle.headingMedium:
      return headingMediumStyles(props);
    case TypographyVisualStyle.headingSmall:
      return headingSmallStyles(props);
    case TypographyVisualStyle.headingXSmall:
      return headingXSmallStyles(props);
    case TypographyVisualStyle.heading2XSmall:
      return heading2XSmallStyles(props);
    case TypographyVisualStyle.bodyLarge:
      return paragraphLargeStyles(props);
    case TypographyVisualStyle.bodyMedium:
      return paragraphMediumStyles(props);
    case TypographyVisualStyle.bodySmall:
      return paragraphSmallStyles(props);
    case TypographyVisualStyle.bodyXSmall:
      return paragraphXSmallStyles(props);
    default:
      return headingLargeStyles(props);
  }
}

export const TypographyComponent = styled.p<TypographyProps>`
  ${props => getTypographyStyles(props)}
`;

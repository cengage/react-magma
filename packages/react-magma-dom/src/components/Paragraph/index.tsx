import * as React from 'react';
import { css } from '@emotion/core';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  TypographyVariant,
  TypographyColor,
  TypographyTypeStyle
} from '../Typography';
import { colorStyles } from '../Typography/styles';

import {
  HeadingXLargeComponent,
  HeadingLargeComponent,
  HeadingMediumComponent,
  HeadingSmallComponent,
  HeadingXSmallComponent,
  HeadingXXSmallComponent
} from '../Heading/styles';

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: string;
  children?: any;
  color?: TypographyColor;
  isInverse?: boolean;
  noMargins?: boolean;
  ref?: any;
  testId?: string;
  theme?: any;
  typeStyle?: TypographyTypeStyle;
  variant?: TypographyVariant;
}

function getBodyFontFamily(props) {
  switch (props.typeStyle) {
    case TypographyTypeStyle.expressive:
      return props.theme.bodyExpressiveFont;
    case TypographyTypeStyle.narrative:
      return props.theme.bodyNarrativeFont;
    default:
      return props.theme.bodyFont;
  }
}

export const ParagraphComponent = styled.p<ParagraphProps>`
  ${colorStyles};
  font-family: ${getBodyFontFamily};
  font-weight: normal;

  ${props =>
    props.variant === TypographyVariant.bodyLarge &&
    props.typeStyle !== TypographyTypeStyle.expressive &&
    css`
      font-size: ${props.theme.typographyVariants.bodyLarge.mobile.fontSize};
      line-height: ${props.theme.typographyVariants.bodyLarge.mobile
        .lineHeight};
      margin: ${props.noMargins ? '0' : '0 0 24px'};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyVariants.bodyLarge.desktop.fontSize};
        line-height: ${props.theme.typographyVariants.bodyLarge.desktop
          .lineHeight};
      }
    `};

  ${props =>
    props.variant === TypographyVariant.bodyLarge &&
    props.typeStyle === TypographyTypeStyle.expressive &&
    css`
      font-size: ${props.theme.typographyExpressiveVariants.bodyLarge.mobile
        .fontSize};
      line-height: ${props.theme.typographyExpressiveVariants.bodyLarge.mobile
        .lineHeight};
      margin: ${props.noMargins ? '0' : '0 0 24px'};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyExpressiveVariants.bodyLarge.desktop
          .fontSize};
        line-height: ${props.theme.typographyExpressiveVariants.bodyLarge
          .desktop.lineHeight};
      }
    `};

  ${props =>
    props.variant === TypographyVariant.bodyMedium &&
    css`
      font-size: ${props.theme.typographyVariants.bodyMedium.mobile.fontSize};
      line-height: ${props.theme.typographyVariants.bodyMedium.mobile
        .lineHeight};
      margin: ${props.noMargins ? '0' : '0 0 24px'};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyVariants.bodyMedium.desktop
          .fontSize};
        line-height: ${props.theme.typographyVariants.bodyMedium.desktop
          .lineHeight};
      }
    `};

  ${props =>
    props.variant === TypographyVariant.bodySmall &&
    css`
      font-size: ${props.theme.typographyVariants.bodySmall.mobile.fontSize};
      line-height: ${props.theme.typographyVariants.bodySmall.mobile
        .lineHeight};
      margin: ${props.noMargins ? '0' : '0 0 16px'};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyVariants.bodySmall.desktop.fontSize};
        line-height: ${props.theme.typographyVariants.bodySmall.desktop
          .lineHeight};
      }
    `};

  ${props =>
    props.variant === TypographyVariant.bodyXSmall &&
    css`
      font-size: ${props.theme.typographyVariants.bodyXSmall.mobile.fontSize};
      line-height: ${props.theme.typographyVariants.bodyXSmall.mobile
        .lineHeight};
      margin: ${props.noMargins ? '0' : '0 0 8px'};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyVariants.bodyXSmall.desktop
          .fontSize};
        line-height: ${props.theme.typographyVariants.bodyXSmall.desktop
          .lineHeight};
      }
    `};
`;

export const Paragraph: React.FunctionComponent<ParagraphProps> = React.forwardRef(
  (
    { color, testId, typeStyle, variant, children, ...other }: ParagraphProps,
    ref: any
  ) => {
    const theme = React.useContext(ThemeContext);

    const variantComponents = {
      headingXLarge: HeadingXLargeComponent,
      headingLarge: HeadingLargeComponent,
      headingMedium: HeadingMediumComponent,
      headingSmall: HeadingSmallComponent,
      headingXSmall: HeadingXSmallComponent,
      headingXXSmall: HeadingXXSmallComponent,
      bodyLarge: ParagraphComponent,
      bodyMedium: ParagraphComponent,
      bodySmall: ParagraphComponent,
      bodyXSmall: ParagraphComponent
    };

    const PComponent = variant
      ? variantComponents[variant]
      : variantComponents[TypographyVariant.bodyMedium];

    return (
      <PComponent
        {...other}
        as="p"
        data-testid={testId}
        color={color || TypographyColor.default}
        ref={ref}
        theme={theme}
        typeStyle={typeStyle || TypographyTypeStyle.default}
        variant={variant || TypographyVariant.bodyMedium}
      >
        {children}
      </PComponent>
    );
  }
);

import * as React from 'react';
import { css } from '@emotion/core';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  TypographySize,
  TypographyColor,
  TypographyVariant
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
  variant?: TypographyVariant;
  size?: TypographySize;
}

function getBodyFontFamily(props) {
  switch (props.variant) {
    case TypographyVariant.expressive:
      return props.theme.bodyExpressiveFont;
    case TypographyVariant.narrative:
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
    props.size === TypographySize.bodyLarge &&
    css`
      margin: ${props.noMargins ? '0' : '0 0 24px'};
    `};

  ${props =>
    props.size === TypographySize.bodyLarge &&
    props.variant !== TypographyVariant.expressive &&
    css`
      font-size: ${props.theme.typographySizes.bodyLarge.mobile.fontSize};
      line-height: ${props.theme.typographySizes.bodyLarge.mobile.lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographySizes.bodyLarge.desktop.fontSize};
        line-height: ${props.theme.typographySizes.bodyLarge.desktop
          .lineHeight};
      }
    `};

  ${props =>
    props.size === TypographySize.bodyLarge &&
    props.variant === TypographyVariant.expressive &&
    css`
      font-size: ${props.theme.typographyExpressiveSizes.bodyLarge.mobile
        .fontSize};
      line-height: ${props.theme.typographyExpressiveSizes.bodyLarge.mobile
        .lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyExpressiveSizes.bodyLarge.desktop
          .fontSize};
        line-height: ${props.theme.typographyExpressiveSizes.bodyLarge.desktop
          .lineHeight};
      }
    `};

  ${props =>
    props.size === TypographySize.bodyMedium &&
    css`
      font-size: ${props.theme.typographySizes.bodyMedium.mobile.fontSize};
      line-height: ${props.theme.typographySizes.bodyMedium.mobile.lineHeight};
      margin: ${props.noMargins ? '0' : '0 0 24px'};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographySizes.bodyMedium.desktop.fontSize};
        line-height: ${props.theme.typographySizes.bodyMedium.desktop
          .lineHeight};
      }
    `};

  ${props =>
    props.size === TypographySize.bodySmall &&
    css`
      font-size: ${props.theme.typographySizes.bodySmall.mobile.fontSize};
      line-height: ${props.theme.typographySizes.bodySmall.mobile.lineHeight};
      margin: ${props.noMargins ? '0' : '0 0 16px'};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographySizes.bodySmall.desktop.fontSize};
        line-height: ${props.theme.typographySizes.bodySmall.desktop
          .lineHeight};
      }
    `};

  ${props =>
    props.size === TypographySize.bodyXSmall &&
    css`
      font-size: ${props.theme.typographySizes.bodyXSmall.mobile.fontSize};
      line-height: ${props.theme.typographySizes.bodyXSmall.mobile.lineHeight};
      margin: ${props.noMargins ? '0' : '0 0 8px'};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographySizes.bodyXSmall.desktop.fontSize};
        line-height: ${props.theme.typographySizes.bodyXSmall.desktop
          .lineHeight};
      }
    `};
`;

export const Paragraph: React.FunctionComponent<ParagraphProps> = React.forwardRef(
  (
    { color, testId, variant, size, children, ...other }: ParagraphProps,
    ref: any
  ) => {
    const theme = React.useContext(ThemeContext);

    const sizeComponents = {
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

    const PComponent = size
      ? sizeComponents[size]
      : sizeComponents[TypographySize.bodyMedium];

    return (
      <PComponent
        {...other}
        as="p"
        data-testid={testId}
        color={color || TypographyColor.default}
        ref={ref}
        theme={theme}
        variant={variant || TypographyVariant.default}
        size={size || TypographySize.bodyMedium}
      >
        {children}
      </PComponent>
    );
  }
);

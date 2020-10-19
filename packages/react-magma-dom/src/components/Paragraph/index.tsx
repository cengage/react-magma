import * as React from 'react';
import { css } from '@emotion/core';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  TypographyVisualStyle,
  TypographyColor,
  TypographyContextVariant,
} from '../Typography';
import { colorStyles, getBodyFontFamily } from '../Typography/styles';

import {
  HeadingXLargeComponent,
  HeadingLargeComponent,
  HeadingMediumComponent,
  HeadingSmallComponent,
  HeadingXSmallComponent,
  Heading2XSmallComponent,
} from '../Heading/styles';

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: string;
  children?: any;
  color?: TypographyColor;
  contextVariant?: TypographyContextVariant;
  isInverse?: boolean;
  noMargins?: boolean;
  ref?: any;
  testId?: string;
  theme?: any;
  visualStyle?: TypographyVisualStyle;
}

export const ParagraphComponent = styled.p<ParagraphProps>`
  ${colorStyles};
  font-family: ${getBodyFontFamily};
  font-weight: normal;

  ${props =>
    props.visualStyle === TypographyVisualStyle.bodyLarge &&
    css`
      margin: ${props.noMargins ? '0' : '24px 0'};
    `};

  ${props =>
    props.visualStyle === TypographyVisualStyle.bodyLarge &&
    props.contextVariant !== TypographyContextVariant.expressive &&
    css`
      font-size: ${props.theme.typographyVisualStyles.bodyLarge.mobile
        .fontSize};
      line-height: ${props.theme.typographyVisualStyles.bodyLarge.mobile
        .lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyVisualStyles.bodyLarge.desktop
          .fontSize};
        line-height: ${props.theme.typographyVisualStyles.bodyLarge.desktop
          .lineHeight};
      }
    `};

  ${props =>
    props.visualStyle === TypographyVisualStyle.bodyLarge &&
    props.contextVariant === TypographyContextVariant.expressive &&
    css`
      font-size: ${props.theme.typographyExpressiveVisualStyles.bodyLarge.mobile
        .fontSize};
      line-height: ${props.theme.typographyExpressiveVisualStyles.bodyLarge
        .mobile.lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyExpressiveVisualStyles.bodyLarge
          .desktop.fontSize};
        line-height: ${props.theme.typographyExpressiveVisualStyles.bodyLarge
          .desktop.lineHeight};
      }
    `};

  ${props =>
    props.visualStyle === TypographyVisualStyle.bodyMedium &&
    css`
      font-size: ${props.theme.typographyVisualStyles.bodyMedium.mobile
        .fontSize};
      line-height: ${props.theme.typographyVisualStyles.bodyMedium.mobile
        .lineHeight};
      margin: ${props.noMargins ? '0' : '24px 0'};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyVisualStyles.bodyMedium.desktop
          .fontSize};
        line-height: ${props.theme.typographyVisualStyles.bodyMedium.desktop
          .lineHeight};
      }
    `};

  ${props =>
    props.visualStyle === TypographyVisualStyle.bodySmall &&
    css`
      font-size: ${props.theme.typographyVisualStyles.bodySmall.mobile
        .fontSize};
      line-height: ${props.theme.typographyVisualStyles.bodySmall.mobile
        .lineHeight};
      margin: ${props.noMargins ? '0' : '16px 0'};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyVisualStyles.bodySmall.desktop
          .fontSize};
        line-height: ${props.theme.typographyVisualStyles.bodySmall.desktop
          .lineHeight};
      }
    `};

  ${props =>
    props.visualStyle === TypographyVisualStyle.bodyXSmall &&
    css`
      font-size: ${props.theme.typographyVisualStyles.bodyXSmall.mobile
        .fontSize};
      line-height: ${props.theme.typographyVisualStyles.bodyXSmall.mobile
        .lineHeight};
      margin: ${props.noMargins ? '0' : '8px 0'};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyVisualStyles.bodyXSmall.desktop
          .fontSize};
        line-height: ${props.theme.typographyVisualStyles.bodyXSmall.desktop
          .lineHeight};
      }
    `};
`;

export const Paragraph: React.FunctionComponent<ParagraphProps> = React.forwardRef(
  (
    {
      color,
      contextVariant,
      testId,
      visualStyle,
      children,
      ...other
    }: ParagraphProps,
    ref: any
  ) => {
    const theme = React.useContext(ThemeContext);

    const visualStyleComponents = {
      headingXLarge: HeadingXLargeComponent,
      headingLarge: HeadingLargeComponent,
      headingMedium: HeadingMediumComponent,
      headingSmall: HeadingSmallComponent,
      headingXSmall: HeadingXSmallComponent,
      heading2XSmall: Heading2XSmallComponent,
      bodyLarge: ParagraphComponent,
      bodyMedium: ParagraphComponent,
      bodySmall: ParagraphComponent,
      bodyXSmall: ParagraphComponent,
    };

    const PComponent = visualStyle
      ? visualStyleComponents[visualStyle]
      : visualStyleComponents[TypographyVisualStyle.bodyMedium];

    return (
      <PComponent
        {...other}
        as="p"
        contextVariant={contextVariant || TypographyContextVariant.default}
        color={color || TypographyColor.default}
        data-testid={testId}
        ref={ref}
        theme={theme}
        visualStyle={visualStyle || TypographyVisualStyle.bodyMedium}
      >
        {children}
      </PComponent>
    );
  }
);

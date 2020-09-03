import { css } from '@emotion/core';
import styled from '../../theme/styled';

import { colorStyles } from '../Typography/styles';

import {
  TypographyVariant,
  TypographyColor,
  TypographyTypeStyle
} from '../Typography';

export interface StyledHeadingProps {
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

function getHeadingFontFamily(props) {
  switch (props.typeStyle) {
    case TypographyTypeStyle.expressive:
      return props.theme.headingExpressiveFont;
    case TypographyTypeStyle.narrative:
      return props.theme.headingNarrativeFont;
    default:
      return props.theme.headingFont;
  }
}

const baseHeadingStyles = props => css`
  border-bottom: 2px solid transparent;
  font-family: ${getHeadingFontFamily(props)};
  font-weight: ${props.typeStyle === 'narrative' ? 700 : 600};
  padding: 0;

  &:focus {
    border-bottom: 2px dotted
      ${props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
    outline: 0;
    transition: border 0.1s linear;
  }

  ${colorStyles(props)}
`;

export const HeadingXLargeComponent = styled.h1<StyledHeadingProps>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographyVariants.headingXLarge.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographyVariants.headingXLarge.mobile.lineHeight};
  margin: ${props => (props.noMargins ? 0 : '0 0 16px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVariants.headingXLarge.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVariants.headingXLarge.desktop.lineHeight};
  }

  ${props =>
    props.typeStyle === 'expressive' &&
    css`
      font-size: ${props.theme.typographyExpressiveVariants.headingXLarge.mobile
        .fontSize};
      line-height: ${props.theme.typographyExpressiveVariants.headingXLarge
        .mobile.lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyExpressiveVariants.headingXLarge
          .desktop.fontSize};
        line-height: ${props.theme.typographyExpressiveVariants.headingXLarge
          .desktop.lineHeight};
      }
    `};
`;

export const HeadingLargeComponent = styled.h2<StyledHeadingProps>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographyVariants.headingLarge.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographyVariants.headingLarge.mobile.lineHeight};
  margin: ${props => (props.noMargins ? 0 : '48px 0 16px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVariants.headingLarge.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVariants.headingLarge.desktop.lineHeight};
  }

  ${props =>
    props.typeStyle === 'expressive' &&
    css`
      font-weight: 300;
      font-size: ${props.theme.typographyExpressiveVariants.headingLarge.mobile
        .fontSize};
      line-height: ${props.theme.typographyExpressiveVariants.headingLarge
        .mobile.lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyExpressiveVariants.headingLarge
          .desktop.fontSize};
        line-height: ${props.theme.typographyExpressiveVariants.headingLarge
          .desktop.lineHeight};
      }
    `};
`;

export const HeadingMediumComponent = styled.h3<StyledHeadingProps>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographyVariants.headingMedium.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographyVariants.headingMedium.mobile.lineHeight};
  margin: ${props => (props.noMargins ? 0 : '40px 0 16px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVariants.headingMedium.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVariants.headingMedium.desktop.lineHeight};
  }

  ${props =>
    props.typeStyle === 'expressive' &&
    css`
      font-weight: 300;
      font-size: ${props.theme.typographyExpressiveVariants.headingMedium.mobile
        .fontSize};
      line-height: ${props.theme.typographyExpressiveVariants.headingMedium
        .mobile.lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyExpressiveVariants.headingMedium
          .desktop.fontSize};
        line-height: ${props.theme.typographyExpressiveVariants.headingMedium
          .desktop.lineHeight};
      }
    `};
`;

export const HeadingSmallComponent = styled.h4<StyledHeadingProps>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographyVariants.headingSmall.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographyVariants.headingSmall.mobile.lineHeight};
  margin: ${props => (props.noMargins ? 0 : '32px 0 16px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVariants.headingSmall.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVariants.headingSmall.desktop.lineHeight};
  }

  ${props =>
    props.typeStyle === 'expressive' &&
    css`
      font-weight: 300;
      font-size: ${props.theme.typographyExpressiveVariants.headingSmall.mobile
        .fontSize};
      line-height: ${props.theme.typographyExpressiveVariants.headingSmall
        .mobile.lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyExpressiveVariants.headingSmall
          .desktop.fontSize};
        line-height: ${props.theme.typographyExpressiveVariants.headingSmall
          .desktop.lineHeight};
      }
    `};
`;

export const HeadingXSmallComponent = styled.h5<StyledHeadingProps>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographyVariants.headingXSmall.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographyVariants.headingXSmall.mobile.lineHeight};
  margin: ${props => (props.noMargins ? 0 : '24px 0 16px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVariants.headingXSmall.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVariants.headingXSmall.desktop.lineHeight};
  }

  ${props =>
    props.typeStyle === 'expressive' &&
    css`
      font-weight: 300;
      font-size: ${props.theme.typographyExpressiveVariants.headingXSmall.mobile
        .fontSize};
      line-height: ${props.theme.typographyExpressiveVariants.headingXSmall
        .mobile.lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyExpressiveVariants.headingXSmall
          .desktop.fontSize};
        line-height: ${props.theme.typographyExpressiveVariants.headingXSmall
          .desktop.lineHeight};
      }
    `};
`;

export const HeadingXXSmallComponent = styled.h6<StyledHeadingProps>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographyVariants.headingXXSmall.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographyVariants.headingXXSmall.mobile.lineHeight};
  font-weight: bold;
  text-transform: uppercase;
  margin: ${props => (props.noMargins ? 0 : '24px 0 8px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVariants.headingXXSmall.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVariants.headingXXSmall.desktop.lineHeight};
  }

  ${props =>
    props.typeStyle === 'expressive' &&
    css`
      font-weight: bold;
      font-size: ${props.theme.typographyExpressiveVariants.headingXXSmall
        .mobile.fontSize};
      line-height: ${props.theme.typographyExpressiveVariants.headingXXSmall
        .mobile.lineHeight};
    `};
`;

import { css } from '@emotion/core';
import styled from '../../theme/styled';

import { colorStyles } from '../Typography/styles';

import {
  TypographySize,
  TypographyColor,
  TypographyVariant
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
  variant?: TypographyVariant;
  size?: TypographySize;
}

function getHeadingFontFamily(props) {
  switch (props.variant) {
    case TypographyVariant.expressive:
      return props.theme.headingExpressiveFont;
    case TypographyVariant.narrative:
      return props.theme.headingNarrativeFont;
    default:
      return props.theme.headingFont;
  }
}

const baseHeadingStyles = props => css`
  border-bottom: 2px solid transparent;
  font-family: ${getHeadingFontFamily(props)};
  font-weight: ${props.variant === 'narrative' ? 700 : 600};
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
    props.theme.typographySizes.headingXLarge.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographySizes.headingXLarge.mobile.lineHeight};
  margin: ${props => (props.noMargins ? 0 : '0 0 16px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographySizes.headingXLarge.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographySizes.headingXLarge.desktop.lineHeight};
  }

  ${props =>
    props.variant === 'expressive' &&
    css`
      font-size: ${props.theme.typographyExpressiveSizes.headingXLarge.mobile
        .fontSize};
      line-height: ${props.theme.typographyExpressiveSizes.headingXLarge.mobile
        .lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyExpressiveSizes.headingXLarge.desktop
          .fontSize};
        line-height: ${props.theme.typographyExpressiveSizes.headingXLarge
          .desktop.lineHeight};
      }
    `};
`;

export const HeadingLargeComponent = styled.h2<StyledHeadingProps>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographySizes.headingLarge.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographySizes.headingLarge.mobile.lineHeight};
  margin: ${props => (props.noMargins ? 0 : '48px 0 16px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographySizes.headingLarge.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographySizes.headingLarge.desktop.lineHeight};
  }

  ${props =>
    props.variant === 'expressive' &&
    css`
      font-weight: 300;
      font-size: ${props.theme.typographyExpressiveSizes.headingLarge.mobile
        .fontSize};
      line-height: ${props.theme.typographyExpressiveSizes.headingLarge.mobile
        .lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyExpressiveSizes.headingLarge.desktop
          .fontSize};
        line-height: ${props.theme.typographyExpressiveSizes.headingLarge
          .desktop.lineHeight};
      }
    `};
`;

export const HeadingMediumComponent = styled.h3<StyledHeadingProps>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographySizes.headingMedium.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographySizes.headingMedium.mobile.lineHeight};
  margin: ${props => (props.noMargins ? 0 : '40px 0 16px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographySizes.headingMedium.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographySizes.headingMedium.desktop.lineHeight};
  }

  ${props =>
    props.variant === 'expressive' &&
    css`
      font-weight: 300;
      font-size: ${props.theme.typographyExpressiveSizes.headingMedium.mobile
        .fontSize};
      line-height: ${props.theme.typographyExpressiveSizes.headingMedium.mobile
        .lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyExpressiveSizes.headingMedium.desktop
          .fontSize};
        line-height: ${props.theme.typographyExpressiveSizes.headingMedium
          .desktop.lineHeight};
      }
    `};
`;

export const HeadingSmallComponent = styled.h4<StyledHeadingProps>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographySizes.headingSmall.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographySizes.headingSmall.mobile.lineHeight};
  margin: ${props => (props.noMargins ? 0 : '32px 0 16px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographySizes.headingSmall.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographySizes.headingSmall.desktop.lineHeight};
  }

  ${props =>
    props.variant === 'expressive' &&
    css`
      font-weight: 300;
      font-size: ${props.theme.typographyExpressiveSizes.headingSmall.mobile
        .fontSize};
      line-height: ${props.theme.typographyExpressiveSizes.headingSmall.mobile
        .lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyExpressiveSizes.headingSmall.desktop
          .fontSize};
        line-height: ${props.theme.typographyExpressiveSizes.headingSmall
          .desktop.lineHeight};
      }
    `};
`;

export const HeadingXSmallComponent = styled.h5<StyledHeadingProps>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographySizes.headingXSmall.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographySizes.headingXSmall.mobile.lineHeight};
  margin: ${props => (props.noMargins ? 0 : '24px 0 16px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographySizes.headingXSmall.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographySizes.headingXSmall.desktop.lineHeight};
  }

  ${props =>
    props.variant === 'expressive' &&
    css`
      font-weight: 300;
      font-size: ${props.theme.typographyExpressiveSizes.headingXSmall.mobile
        .fontSize};
      line-height: ${props.theme.typographyExpressiveSizes.headingXSmall.mobile
        .lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyExpressiveSizes.headingXSmall.desktop
          .fontSize};
        line-height: ${props.theme.typographyExpressiveSizes.headingXSmall
          .desktop.lineHeight};
      }
    `};
`;

export const HeadingXXSmallComponent = styled.h6<StyledHeadingProps>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographySizes.headingXXSmall.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographySizes.headingXXSmall.mobile.lineHeight};
  font-weight: bold;
  text-transform: uppercase;
  margin: ${props => (props.noMargins ? 0 : '24px 0 8px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographySizes.headingXXSmall.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographySizes.headingXXSmall.desktop.lineHeight};
  }

  ${props =>
    props.variant === 'expressive' &&
    css`
      font-weight: bold;
      font-size: ${props.theme.typographyExpressiveSizes.headingXXSmall.mobile
        .fontSize};
      line-height: ${props.theme.typographyExpressiveSizes.headingXXSmall.mobile
        .lineHeight};
    `};
`;

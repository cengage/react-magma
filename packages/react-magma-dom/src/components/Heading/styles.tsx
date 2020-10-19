import { css } from '@emotion/core';
import styled from '../../theme/styled';

import { colorStyles } from '../Typography/styles';

import {
  TypographyVisualStyle,
  TypographyColor,
  TypographyContextVariant,
} from '../Typography';

export interface StyledHeadingProps {
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
    props.theme.typographyVisualStyles.headingXLarge.mobile.fontSize};
  font-weight: ${props =>
    props.theme.typographyVisualStyles.headingXLarge.fontWeight};
  line-height: ${props =>
    props.theme.typographyVisualStyles.headingXLarge.mobile.lineHeight};
  margin: ${props => (props.noMargins ? 0 : '0 0 16px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVisualStyles.headingXLarge.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVisualStyles.headingXLarge.desktop.lineHeight};
  }

  ${props =>
    props.contextVariant === 'expressive' &&
    css`
      font-size: ${props.theme.typographyExpressiveVisualStyles.headingXLarge
        .mobile.fontSize};
      font-weight: ${props.theme.typographyExpressiveVisualStyles.headingXLarge
        .fontWeight};
      line-height: ${props.theme.typographyExpressiveVisualStyles.headingXLarge
        .mobile.lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyExpressiveVisualStyles.headingXLarge
          .desktop.fontSize};
        line-height: ${props.theme.typographyExpressiveVisualStyles
          .headingXLarge.desktop.lineHeight};
      }
    `};

  ${props =>
    props.contextVariant === 'narrative' &&
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

export const HeadingLargeComponent = styled.h2<StyledHeadingProps>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographyVisualStyles.headingLarge.mobile.fontSize};
  font-weight: ${props =>
    props.theme.typographyVisualStyles.headingLarge.fontWeight};
  line-height: ${props =>
    props.theme.typographyVisualStyles.headingLarge.mobile.lineHeight};
  margin: ${props => (props.noMargins ? 0 : '48px 0 16px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVisualStyles.headingLarge.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVisualStyles.headingLarge.desktop.lineHeight};
  }

  ${props =>
    props.contextVariant === 'expressive' &&
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

  ${props =>
    props.contextVariant === 'narrative' &&
    css`
      font-size: ${props.theme.typographyNarrativeVisualStyles.headingLarge
        .mobile.fontSize};
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

export const HeadingMediumComponent = styled.h3<StyledHeadingProps>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographyVisualStyles.headingMedium.mobile.fontSize};
  font-weight: ${props =>
    props.theme.typographyVisualStyles.headingMedium.fontWeight};
  line-height: ${props =>
    props.theme.typographyVisualStyles.headingMedium.mobile.lineHeight};
  margin: ${props => (props.noMargins ? 0 : '40px 0 16px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVisualStyles.headingMedium.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVisualStyles.headingMedium.desktop.lineHeight};
  }

  ${props =>
    props.contextVariant === 'expressive' &&
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
        line-height: ${props.theme.typographyExpressiveVisualStyles
          .headingMedium.desktop.lineHeight};
      }
    `};

  ${props =>
    props.contextVariant === 'narrative' &&
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

export const HeadingSmallComponent = styled.h4<StyledHeadingProps>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographyVisualStyles.headingSmall.mobile.fontSize};
  font-weight: ${props =>
    props.theme.typographyVisualStyles.headingSmall.fontWeight};
  line-height: ${props =>
    props.theme.typographyVisualStyles.headingSmall.mobile.lineHeight};
  margin: ${props => (props.noMargins ? 0 : '32px 0 16px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVisualStyles.headingSmall.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVisualStyles.headingSmall.desktop.lineHeight};
  }

  ${props =>
    props.contextVariant === 'expressive' &&
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

  ${props =>
    props.contextVariant === 'narrative' &&
    css`
      font-size: ${props.theme.typographyNarrativeVisualStyles.headingSmall
        .mobile.fontSize};
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

export const HeadingXSmallComponent = styled.h5<StyledHeadingProps>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographyVisualStyles.headingXSmall.mobile.fontSize};
  font-weight: ${props =>
    props.theme.typographyVisualStyles.headingXSmall.fontWeight};
  line-height: ${props =>
    props.theme.typographyVisualStyles.headingXSmall.mobile.lineHeight};
  margin: ${props => (props.noMargins ? 0 : '24px 0 16px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVisualStyles.headingXSmall.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVisualStyles.headingXSmall.desktop.lineHeight};
  }

  ${props =>
    props.contextVariant === 'expressive' &&
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
        line-height: ${props.theme.typographyExpressiveVisualStyles
          .headingXSmall.desktop.lineHeight};
      }
    `};

  ${props =>
    props.contextVariant === 'narrative' &&
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

export const Heading2XSmallComponent = styled.h6<StyledHeadingProps>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographyVisualStyles.heading2XSmall.mobile.fontSize};
  font-weight: ${props =>
    props.theme.typographyVisualStyles.heading2XSmall.fontWeight};
  line-height: ${props =>
    props.theme.typographyVisualStyles.heading2XSmall.mobile.lineHeight};
  text-transform: uppercase;
  margin: ${props => (props.noMargins ? 0 : '24px 0 8px')};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVisualStyles.heading2XSmall.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVisualStyles.heading2XSmall.desktop.lineHeight};
  }

  ${props =>
    props.contextVariant === 'expressive' &&
    css`
      font-size: ${props.theme.typographyExpressiveVisualStyles.heading2XSmall
        .mobile.fontSize};
      font-weight: ${props.theme.typographyExpressiveVisualStyles.heading2XSmall
        .fontWeight};
      line-height: ${props.theme.typographyExpressiveVisualStyles.heading2XSmall
        .mobile.lineHeight};
    `};

  ${props =>
    props.contextVariant === 'narrative' &&
    css`
      font-size: ${props.theme.typographyNarrativeVisualStyles.heading2XSmall
        .mobile.fontSize};
      font-weight: ${props.theme.typographyNarrativeVisualStyles.heading2XSmall
        .fontWeight};
      line-height: ${props.theme.typographyNarrativeVisualStyles.heading2XSmall
        .mobile.lineHeight};
      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.typographyNarrativeVisualStyles.heading2XSmall
          .desktop.fontSize};
        line-height: ${props.theme.typographyNarrativeVisualStyles
          .heading2XSmall.desktop.lineHeight};
      }
    `};
`;

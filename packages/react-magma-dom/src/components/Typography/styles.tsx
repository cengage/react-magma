import { css } from '@emotion/core';
import styled from '../../theme/styled';

const colorStyles = props => css`

color: ${
  props.isInverse
    ? props.theme.colors.neutral08
    : props.typeStyle === 'expressive'
    ? props.theme.colors.foundation02
    : props.theme.colors.neutral01
};

${props.color === 'danger' &&
  !props.isInverse &&
  css`
    color: ${props.theme.colors.danger};
  `}

${props.color === 'success' &&
  !props.isInverse &&
  css`
    color: ${props.theme.colors.success01};
  `}

${props.color === 'subdued' &&
  !props.isInverse &&
  css`
    color: ${props.theme.colors.neutral03};
  `}

${props.color === 'subdued' &&
  props.isInverse &&
  css`
    color: ${props.theme.colors.focusInverse};
  `}`;

const baseBodyStyles = props => css`
  font-family: ${props.typeStyle === 'narrative'
    ? props.theme.narrativeFont
    : props.theme.bodyFont};
  margin: 0;

  ${colorStyles(props)}
`;

const baseHeadingStyles = props => css`
  border-bottom: 2px solid transparent;
  font-family: ${props.typeStyle === 'narrative'
    ? props.theme.narrativeFont
    : props.theme.headingFont};
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

export const HeadingXLargeComponent = styled.h1<{
  as?: string;
  hasMargins?: boolean;
  typeStyle?: any;
}>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographyVariants.headingXLarge.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographyVariants.headingXLarge.mobile.lineHeight};
  margin: ${props => (props.hasMargins ? '0 0 16px' : 0)};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVariants.headingXLarge.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVariants.headingXLarge.desktop.lineHeight};
  }

  ${props =>
    props.typeStyle === 'expressive' &&
    css`
      font-size: ${props.theme.expressiveTypographyVariants.headingXLarge.mobile
        .fontSize};
      line-height: ${props.theme.expressiveTypographyVariants.headingXLarge
        .mobile.lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.expressiveTypographyVariants.headingXLarge
          .desktop.fontSize};
        line-height: ${props.theme.expressiveTypographyVariants.headingXLarge
          .desktop.lineHeight};
      }
    `};
`;

export const HeadingLargeComponent = styled.h2<{
  as?: string;
  hasMargins?: boolean;
  typeStyle?: any;
}>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographyVariants.headingLarge.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographyVariants.headingLarge.mobile.lineHeight};
  margin: ${props => (props.hasMargins ? '48px 0 16px' : 0)};

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
      font-size: ${props.theme.expressiveTypographyVariants.headingLarge.mobile
        .fontSize};
      line-height: ${props.theme.expressiveTypographyVariants.headingLarge
        .mobile.lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.expressiveTypographyVariants.headingLarge
          .desktop.fontSize};
        line-height: ${props.theme.expressiveTypographyVariants.headingLarge
          .desktop.lineHeight};
      }
    `};
`;

export const HeadingMediumComponent = styled.h3<{
  as?: string;
  hasMargins?: boolean;
  typeStyle?: any;
}>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographyVariants.headingMedium.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographyVariants.headingMedium.mobile.lineHeight};
  margin: ${props => (props.hasMargins ? '40px 0 16px' : 0)};

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
      font-size: ${props.theme.expressiveTypographyVariants.headingMedium.mobile
        .fontSize};
      line-height: ${props.theme.expressiveTypographyVariants.headingMedium
        .mobile.lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.expressiveTypographyVariants.headingMedium
          .desktop.fontSize};
        line-height: ${props.theme.expressiveTypographyVariants.headingMedium
          .desktop.lineHeight};
      }
    `};
`;

export const HeadingSmallComponent = styled.h4<{
  as?: string;
  hasMargins?: boolean;
  typeStyle?: any;
}>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographyVariants.headingSmall.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographyVariants.headingSmall.mobile.lineHeight};
  margin: ${props => (props.hasMargins ? '32px 0 16px' : 0)};

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
      font-size: ${props.theme.expressiveTypographyVariants.headingSmall.mobile
        .fontSize};
      line-height: ${props.theme.expressiveTypographyVariants.headingSmall
        .mobile.lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.expressiveTypographyVariants.headingSmall
          .desktop.fontSize};
        line-height: ${props.theme.expressiveTypographyVariants.headingSmall
          .desktop.lineHeight};
      }
    `};
`;

export const HeadingXSmallComponent = styled.h5<{
  as?: string;
  hasMargins?: boolean;
  typeStyle?: any;
}>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographyVariants.headingXSmall.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographyVariants.headingXSmall.mobile.lineHeight};
  margin: ${props => (props.hasMargins ? '24px 0 12px' : 0)};

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
      font-size: ${props.theme.expressiveTypographyVariants.headingXSmall.mobile
        .fontSize};
      line-height: ${props.theme.expressiveTypographyVariants.headingXSmall
        .mobile.lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: ${props.theme.expressiveTypographyVariants.headingXSmall
          .desktop.fontSize};
        line-height: ${props.theme.expressiveTypographyVariants.headingXSmall
          .desktop.lineHeight};
      }
    `};
`;

export const HeadingXXSmallComponent = styled.h6<{
  as?: string;
  hasMargins?: boolean;
  typeStyle?: any;
}>`
  ${props => baseHeadingStyles(props)}

  font-size: ${props =>
    props.theme.typographyVariants.headingXXSmall.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographyVariants.headingXXSmall.mobile.lineHeight};
  font-weight: bold;
  text-transform: uppercase;
  margin: ${props => (props.hasMargins ? '24px 0 8px' : 0)};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVariants.headingXXSmall.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVariants.headingXXSmall.desktop.lineHeight};
  }

  ${props =>
    props.typeStyle === 'expressive' &&
    css`
      font-size: 16px;
      font-weight: bold;
      line-height: 24px;
    `};
`;

export const BodyLargeComponent = styled.p<{
  as?: string;
  hasMargins?: boolean;
  typeStyle?: any;
}>`
  ${props => baseBodyStyles(props)}

  font-size: ${props =>
    props.theme.typographyVariants.bodyLarge.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographyVariants.bodyLarge.mobile.lineHeight};
  margin: ${props => (props.hasMargins ? '0 0 24px' : 0)};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVariants.bodyLarge.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVariants.bodyLarge.desktop.lineHeight};
  }

  ${props =>
    props.typeStyle === 'expressive' &&
    css`
      font-size: ${props.theme.expressiveTypographyVariants.bodyLarge.mobile
        .fontSize};
      line-height: ${props.theme.expressiveTypographyVariants.bodyLarge.mobile
        .lineHeight};

      @media (min-width: ${props.theme.breakpoints.small}px) {
        ont-size: ${props.theme.expressiveTypographyVariants.bodyLarge.desktop
          .fontSize};
        line-height: ${props.theme.expressiveTypographyVariants.bodyLarge
          .desktop.lineHeight};
      }
    `};
`;

export const BodyMediumComponent = styled.p<{
  as?: string;
  hasMargins?: boolean;
}>`
  ${props => baseBodyStyles(props)}

  font-size: ${props =>
    props.theme.typographyVariants.bodyMedium.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographyVariants.bodyMedium.mobile.lineHeight};
  margin: ${props => (props.hasMargins ? '0 0 24px' : 0)};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVariants.bodyMedium.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVariants.bodyMedium.desktop.lineHeight};
  }
`;

export const BodySmallComponent = styled.p<{
  as?: string;
  hasMargins?: boolean;
}>`
  ${props => baseBodyStyles(props)}

  font-size: ${props =>
    props.theme.typographyVariants.bodySmall.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographyVariants.bodySmall.mobile.lineHeight};
  letter-spacing: 0.16px;
  margin: ${props => (props.hasMargins ? '0 0 16px' : 0)};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVariants.bodySmall.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVariants.bodySmall.desktop.lineHeight};
  }
`;

export const BodyXSmallComponent = styled.p<{
  as?: string;
  hasMargins?: boolean;
}>`
  ${props => baseBodyStyles(props)}

  font-size: ${props =>
    props.theme.typographyVariants.bodyXSmall.mobile.fontSize};
  line-height: ${props =>
    props.theme.typographyVariants.bodyXSmall.mobile.lineHeight};
  letter-spacing: 0.32px;
  line-height: 16px;
  margin: ${props => (props.hasMargins ? '0 0 8px' : 0)};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props =>
      props.theme.typographyVariants.bodyXSmall.desktop.fontSize};
    line-height: ${props =>
      props.theme.typographyVariants.bodyXSmall.desktop.lineHeight};
  }
`;

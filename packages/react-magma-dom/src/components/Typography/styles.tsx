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
  font-family: ${props.theme.bodyFont};
  margin: 0;

  ${colorStyles(props)}
`;

const baseHeadingStyles = props => css`
  border-bottom: 2px solid transparent;
  font-family: ${props.theme.headingFont};
  font-weight: 600;
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

  font-size: 28px;
  line-height: 40px;
  margin: ${props => (props.hasMargins ? '0 0 16px' : 0)};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: 32px;
    line-height: 40px;
  }

  ${props =>
    props.typeStyle === 'expressive' &&
    css`
      font-size: 32px;
      line-height: 40px;

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: 48px;
        line-height: 56px;
      }
    `};
`;

export const HeadingLargeComponent = styled.h2<{
  as?: string;
  hasMargins?: boolean;
  typeStyle?: any;
}>`
  ${props => baseHeadingStyles(props)}

  font-size: 24px;
  line-height: 32px;
  margin: ${props => (props.hasMargins ? '48px 0 16px' : 0)};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: 28px;
    line-height: 40px;
  }

  ${props =>
    props.typeStyle === 'expressive' &&
    css`
      font-size: 28px;
      font-weight: 300;
      line-height: 40px;

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: 36px;
        line-height: 48px;
      }
    `};
`;

export const HeadingMediumComponent = styled.h3<{
  as?: string;
  hasMargins?: boolean;
  typeStyle?: any;
}>`
  ${props => baseHeadingStyles(props)}

  font-size: 20px;
  line-height: 32px;
  margin: ${props => (props.hasMargins ? '40px 0 16px' : 0)};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: 24px;
  }

  ${props =>
    props.typeStyle === 'expressive' &&
    css`
      font-size: 24px;
      font-weight: 300;
      line-height: 32px;

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: 28px;
        line-height: 40px;
      }
    `};
`;

export const HeadingSmallComponent = styled.h4<{
  as?: string;
  hasMargins?: boolean;
  typeStyle?: any;
}>`
  ${props => baseHeadingStyles(props)}

  font-size: 18px;
  line-height: 32px;
  margin: ${props => (props.hasMargins ? '32px 0 16px' : 0)};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: 20px;
    line-height: 32px;
  }

  ${props =>
    props.typeStyle === 'expressive' &&
    css`
      font-size: 20px;
      font-weight: 300;
      line-height: 32px;

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: 24px;
      }
    `};
`;

export const HeadingXSmallComponent = styled.h5<{
  as?: string;
  hasMargins?: boolean;
  typeStyle?: any;
}>`
  ${props => baseHeadingStyles(props)}

  font-size: 18px;
  line-height: 32px;
  margin: ${props => (props.hasMargins ? '24px 0 12px' : 0)};

  ${props =>
    props.typeStyle === 'expressive' &&
    css`
      font-size: 18px;
      font-weight: 300;
      line-height: 32px;

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: 20px;
      }
    `};
`;

export const HeadingXXSmallComponent = styled.h6<{
  as?: string;
  hasMargins?: boolean;
  typeStyle?: any;
}>`
  ${props => baseHeadingStyles(props)}

  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
  text-transform: uppercase;
  margin: ${props => (props.hasMargins ? '24px 0 8px' : 0)};

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

  font-size: 18px;
  line-height: 32px;
  margin: ${props => (props.hasMargins ? '0 0 24px' : 0)};

  @media (min-width: ${props => props.theme.breakpoints.small}px) {
    font-size: 20px;
    line-height: 32px;
  }

  ${props =>
    props.typeStyle === 'expressive' &&
    css`
      font-size: 20px;
      line-height: 32px;

      @media (min-width: ${props.theme.breakpoints.small}px) {
        font-size: 24px;
      }
    `};
`;

export const BodyMediumComponent = styled.p<{
  as?: string;
  hasMargins?: boolean;
}>`
  ${props => baseBodyStyles(props)}

  font-size: 16px;
  line-height: 24px;
  margin: ${props => (props.hasMargins ? '0 0 24px' : 0)};
`;

export const BodySmallComponent = styled.p<{
  as?: string;
  hasMargins?: boolean;
}>`
  ${props => baseBodyStyles(props)}

  font-size: 14px;
  letter-spacing: 0.16px;
  line-height: 20px;
  margin: ${props => (props.hasMargins ? '0 0 16px' : 0)};
`;

export const BodyXSmallComponent = styled.p<{
  as?: string;
  hasMargins?: boolean;
}>`
  ${props => baseBodyStyles(props)}

  font-size: 12px;
  letter-spacing: 0.32px;
  line-height: 16px;
  margin: ${props => (props.hasMargins ? '0 0 8px' : 0)};
`;

import { css } from '@emotion/core';
import styled from '../../theme/styled';

const colorStyles = props => css`

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
  color: ${props.isInverse
    ? props.theme.colors.neutral08
    : props.theme.colors.neutral01};
  font-family: ${props.theme.bodyFont};
  margin: 0;

  ${colorStyles(props)}
`;

const baseHeadingStyles = props => css`
  border-bottom: 2px solid transparent;
  color: ${props.isInverse
    ? props.theme.colors.neutral08
    : props.theme.colors.neutral01};
  font-family: ${props.theme.headingFont};
  font-weight: 600;

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

export const baseExpressiveHeadingStyles = props => css`
  border-bottom: 2px solid transparent;
  color: ${props.isInverse
    ? props.theme.colors.neutral08
    : props.theme.colors.foundation02};
  font-family: ${props.theme.headingFont};

  &:focus {
    border-bottom: 2px dotted
      ${props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
    outline: 0;
    transition: border 0.1s linear;
  }
`;

export const HeadingXLargeComponent = styled.h1<{ hasMargins?: boolean }>`
  ${props => baseHeadingStyles(props)}

  font-size: 32px;
  line-height: 40px;
  margin: ${props => (props.hasMargins ? '0 0 16px' : 0)};
`;

export const HeadingLargeComponent = styled.h2<{ hasMargins?: boolean }>`
  ${props => baseHeadingStyles(props)}

  font-size: 28px;
  line-height: 40px;
  margin: ${props => (props.hasMargins ? '48px 0 16px' : 0)};
`;

export const HeadingMediumComponent = styled.h3<{ hasMargins?: boolean }>`
  ${props => baseHeadingStyles(props)}

  font-size: 24px;
  line-height: 32px;
  margin: ${props => (props.hasMargins ? '40px 0 16px' : 0)};
`;

export const HeadingSmallComponent = styled.h4<{ hasMargins?: boolean }>`
  ${props => baseHeadingStyles(props)}

  font-size: 20px;
  line-height: 32px;
  margin: ${props => (props.hasMargins ? '32px 0 16px' : 0)};
`;

export const HeadingXSmallComponent = styled.h5<{ hasMargins?: boolean }>`
  ${props => baseHeadingStyles(props)}

  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
  text-transform: uppercase;
  margin: ${props => (props.hasMargins ? '42px 0 12px' : 0)};
`;

export const BodyLargeComponent = styled.p<{ hasMargins?: boolean }>`
  ${props => baseBodyStyles(props)}

  font-size: 20px;
  line-height: 32px;
  margin: ${props => (props.hasMargins ? '0 0 24px' : 0)};
`;

export const BodyMediumComponent = styled.p<{ hasMargins?: boolean }>`
  ${props => baseBodyStyles(props)}

  font-size: 16px;
  line-height: 24px;
  margin: ${props => (props.hasMargins ? '0 0 24px' : 0)};
`;

export const BodySmallComponent = styled.p<{ hasMargins?: boolean }>`
  ${props => baseBodyStyles(props)}

  font-size: 14px;
  letter-spacing: 0.16px;
  line-height: 20px;
  margin: ${props => (props.hasMargins ? '0 0 16px' : 0)};
`;

export const BodyXSmallComponent = styled.p<{ hasMargins?: boolean }>`
  ${props => baseBodyStyles(props)}

  font-size: 12px;
  letter-spacing: 0.32px;
  line-height: 16px;
  margin: ${props => (props.hasMargins ? '0 0 8px' : 0)};
`;

import { css } from '@emotion/core';
import styled from '../../theme/styled';

export const baseBodyStyles = props => css`
  color: ${props.isInverse
    ? props.theme.colors.neutral08
    : props.theme.colors.neutral01};
  font-family: ${props.theme.bodyFont};
  margin: 0;
`;

export const baseHeadingStyles = props => css`
  border-bottom: 2px solid transparent;
  color: ${props.isInverse
    ? props.theme.colors.neutral08
    : props.theme.colors.neutral01};
  font-family: ${props.theme.headingFont};
  font-weight: 600;
  margin: 0;

  &:focus {
    border-bottom: 2px dotted
      ${props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
    outline: 0;
    transition: border 0.1s linear;
  }
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

export const HeadingXLargeComponent = styled.h1`
  ${props => baseHeadingStyles(props)}

  font-size: 32px;
  line-height: 40px;
`;

export const HeadingLargeComponent = styled.h2`
  ${props => baseHeadingStyles(props)}

  font-size: 28px;
  line-height: 40px;
`;

export const HeadingMediumComponent = styled.h3`
  ${props => baseHeadingStyles(props)}

  font-size: 24px;
  line-height: 32px;
`;

export const HeadingSmallComponent = styled.h4`
  ${props => baseHeadingStyles(props)}

  font-size: 20px;
  line-height: 32px;
`;

export const HeadingXSmallComponent = styled.h5`
  ${props => baseHeadingStyles(props)}

  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
  text-transform: uppercase;
`;

export const BodyLargeComponent = styled.h4`
  ${props => baseBodyStyles(props)}

  font-size: 20px;
  line-height: 32px;
`;

export const BodyMediumComponent = styled.h4`
  ${props => baseBodyStyles(props)}

  font-size: 16px;
  line-height: 24px;
`;

export const BodySmallComponent = styled.h4`
  ${props => baseBodyStyles(props)}

  font-size: 14px;
  letter-spacing: 0.16px;
  line-height: 20px;
`;

export const BodyXSmallComponent = styled.h4`
  ${props => baseBodyStyles(props)}

  font-size: 12px;
  letter-spacing: 0.32px;
  line-height: 16px;
`;

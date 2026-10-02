import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';

import { ThemeInterface } from '../../theme/magma';

export function getIconBackground(props: {
  isDanger?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}): string {
  if (props.isInverse) {
    return props.isDanger
      ? props.theme.colors.red500
      : props.theme.colors.brand.skyBlue;
  }

  return props.isDanger
    ? props.theme.colors.red100
    : props.theme.colors.neutral200;
}

export function getIllustrationIconColor(props: {
  isDanger?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}): string {
  if (props.isInverse) {
    return props.isDanger
      ? props.theme.colors.red1000
      : props.theme.colors.brand.navy;
  }

  return props.isDanger
    ? props.theme.colors.red600
    : props.theme.colors.brand.navy;
}

export const StyledEmptyState = styled('div', {
  shouldForwardProp: isPropValid,
})<{
  theme: ThemeInterface;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spaceScale.spacing05};
  margin: 0 auto;
  max-width: 450px;
  min-width: 240px;
  font-family: ${props => props.theme.bodyFont};
  text-align: center;
`;

export const StyledIconContainer = styled('div', {
  shouldForwardProp: isPropValid,
})<{
  isDanger?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${props => props.theme.spaceScale.spacing10};
  height: ${props => props.theme.spaceScale.spacing10};
  background: ${props => getIconBackground(props)};
  border-radius: 50%;
  color: ${props => getIllustrationIconColor(props)};

  svg {
    width: ${props => props.theme.spaceScale.spacing07};
    height: ${props => props.theme.spaceScale.spacing07};
  }
`;

export const StyledHeader = styled.div<{ theme: ThemeInterface }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spaceScale.spacing03};
  width: 100%;
`;

export const StyledActions = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  && > * {
    justify-content: center;
  }
`;

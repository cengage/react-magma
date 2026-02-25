import styled from '@emotion/styled';

import { ThemeInterface } from '../../theme/magma';

export function getIconBackground(props: {
  isDanger?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}): string {
  if (props.isInverse) {
    return props.isDanger
      ? props.theme.colors.danger700
      : props.theme.colors.primary500;
  }

  return props.isDanger
    ? props.theme.colors.danger100
    : props.theme.colors.primary100;
}

export function getIconColor(props: {
  isDanger?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}): string {
  if (props.isInverse) {
    return props.theme.colors.neutral100;
  }

  return props.isDanger
    ? props.theme.colors.danger500
    : props.theme.colors.primary500;
}

export const StyledEmptyState = styled.div<{
  isInverse?: boolean;
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

export const StyledIconContainer = styled.div<{
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
  color: ${props => getIconColor(props)};

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

import styled from '@emotion/styled';
import { transparentize } from 'polished';

import { ThemeInterface } from '../../../theme/magma';
import { inputWrapperStyles } from '../../InputBase';

export const InputsContainer = styled.div<{
  hasError?: boolean;
  isInverse?: boolean;
}>`
  ${inputWrapperStyles};
  height: ${props => props.theme.spaceScale.spacing09};
  padding: ${props => props.theme.spaceScale.spacing03};
  width: 100%;
  font-family: ${props => props.theme.bodyFont};
  position: relative;
`;

const getDividerColor = (
  isInverse: boolean,
  isFocused: boolean,
  theme: ThemeInterface
): string => {
  if (isInverse) {
    return isFocused
      ? theme.colors.neutral100
      : transparentize(0.3, theme.colors.neutral100);
  }

  return isFocused ? theme.colors.neutral700 : theme.colors.neutral500;
};

export const Divider = styled.span<{
  theme: ThemeInterface;
  isInverse?: boolean;
  isFocused?: boolean;
}>`
  display: inline-block;
  margin: 0 2px;
  position: relative;
  top: -1px;
  color: ${props =>
    getDividerColor(props.isInverse, props.isFocused, props.theme)};
`;

export const IconWrapper = styled.div<{ theme: ThemeInterface }>`
  position: absolute;
  right: ${props => props.theme.spaceScale.spacing03};
  top: 50%;
  transform: translateY(-50%);
`;

export const IsClearableContainer = styled.span<{ theme: ThemeInterface }>`
  position: absolute;
  right: ${props => props.theme.spaceScale.spacing09};
  top: 50%;
  transform: translateY(-50%);
`;

export const DateFieldInputContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  min-width: 230px;
`;

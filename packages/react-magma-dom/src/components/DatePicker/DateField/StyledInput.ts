import styled from '@emotion/styled';
import { transparentize } from 'polished';

import { ThemeInterface } from '../../../theme/magma';
import { inputWrapperStyles } from '../../InputBase';

export const StyledInput = styled.input<{
  isFocused?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  padding: 0;
  border: 0;
  text-align: center;
  background: transparent;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  -moz-appearance: textfield;

  &:focus {
    outline: 0;
    background: ${props =>
      props.isInverse
        ? props.theme.colors.tertiary
        : props.theme.colors.primary};
    border-bottom: 3px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.info200
          : props.theme.colors.info500};
    background: ${props =>
      props.isInverse
        ? props.theme.colors.info700
        : transparentize(0.4, props.theme.colors.info200)};

    &::placeholder {
      color: ${props =>
        props.isInverse
          ? props.theme.colors.neutral100
          : props.theme.colors.neutral700};
    }
  }

  &::placeholder {
    color: ${props =>
      props.isInverse
        ? transparentize(0.3, props.theme.colors.neutral100)
        : props.theme.colors.neutral500};
  }

  ${props =>
    props.isFocused &&
    `&::placeholder {
          color: ${
            props.isInverse
              ? props.theme.colors.neutral100
              : props.theme.colors.neutral700
          };
        }
      `}
`;

export const InputsContainer = styled.div<{
  hasError?: boolean;
  isInverse?: boolean;
}>`
  ${inputWrapperStyles};
  min-width: 220px;
  height: ${props => props.theme.spaceScale.spacing09};
  padding: ${props => props.theme.spaceScale.spacing03};
  width: 100%;
  font-family: ${props => props.theme.bodyFont};
  position: relative;
`;

const getDividerColor = (
  isInverse: boolean,
  isFocused: boolean,
  isNotEmptyDate: boolean,
  theme: ThemeInterface
): string => {
  if (isInverse) {
    return isFocused || isNotEmptyDate
      ? theme.colors.neutral100
      : transparentize(0.3, theme.colors.neutral100);
  }
  return isFocused || isNotEmptyDate
    ? theme.colors.neutral700
    : theme.colors.neutral500;
};

export const Divider = styled.span<{
  theme: ThemeInterface;
  isInverse?: boolean;
  isFocused?: boolean;
  isNotEmptyDate: boolean;
}>`
  display: inline-block;
  margin: 0 2px;
  position: relative;
  top: -1px;
  color: ${props =>
    getDividerColor(
      props.isInverse,
      props.isFocused,
      props.isNotEmptyDate,
      props.theme
    )};
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
`;

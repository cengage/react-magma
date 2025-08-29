import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';

export const StyledSelect = styled.div<{ isInverse: boolean; theme: Theme }>`
  div > div {
    border: none;
    background: ${props =>
      props.isInverse
        ? props.theme.colors.primary500
        : props.theme.colors.neutral100};
    &:focus-within {
      outline: 2px solid
        ${props =>
          props.isInverse
            ? props.theme.colors.focusInverse
            : props.theme.colors.focus};
      outline-offset: ${props => props.theme.spaceScale.spacing01};
    }

    select {
      padding: ${props => props.theme.spaceScale.spacing03};
      &:hover,
      &:focus {
        background: ${props =>
          props.isInverse
            ? transparentize(0.3, props.theme.colors.primary700)
            : transparentize(0.95, props.theme.colors.neutral900)};
        cursor: pointer !important;
      }
    }

    svg {
      display: none;
    }
  }
`;

import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';

export const StyledSelect = styled.div<{ isInverse: boolean; theme: Theme }>`
  div > div {
    border: none;
    background: ${props =>
      props.isInverse
        ? props.theme.colors.neutral1100
        : props.theme.colors.neutral0};
    &:focus-within {
      outline: 2px solid
        ${props =>
          props.isInverse
            ? props.theme.colors.focusInverse
            : props.theme.colors.focus};
      outline-offset: 0;
    }

    select {
      padding: ${props => props.theme.spaceScale.spacing03};
      &:hover,
      &:focus {
        background: ${props =>
          props.isInverse
            ? transparentize(0.5, props.theme.colors.neutral900)
            : props.theme.colors.neutral200};
        cursor: pointer !important;
      }
    }

    svg {
      display: none;
    }
  }
`;

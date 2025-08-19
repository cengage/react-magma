import React from 'react';

import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { CheckIcon } from 'react-magma-icons';

export interface CustomItemInterface {
  label: string;
  value: number;
}

export const StyledSelect = styled.div<{ isInverse: boolean; theme: Theme }>`
  div:focus {
    outline-offset: ${props => props.theme.spaceScale.spacing01};
    background: ${props =>
      props.isInverse ? `rgba(0, 0, 0, 0.3)` : 'rgba(0, 0, 0, 0.05)'};
  }

  [role='button'] {
    background: ${props =>
      props.isInverse
        ? props.theme.colors.primary500
        : props.theme.colors.neutral100};
    border: none;
    padding: 0;

    svg {
      height: 0;
      width: 0;
      }

    &:hover {
      background: ${props =>
        props.isInverse ? `rgba(0, 0, 0, 0.3)` : 'rgba(0, 0, 0, 0.05)'};
      }
    }

    span {
      padding: ${props => props.theme.spaceScale.spacing03};
    }

    label {
      margin: 0;
    }

    ul[role='listbox'] {
      scrollbar-color: ${props =>
        props.isInverse ? 'rgba(0, 0, 0, 0.4) rgba(0, 0, 0, 0.2)' : 'auto'};

      li {
        margin: 0;
      }
    }
  }
`;

export const IconWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.theme.spaceScale.spacing08};
`;

export const CustomStyledItem = styled.li<{
  theme: Theme;
  isFocused?: boolean;
  isInverse?: boolean;
}>`
  display: flex;
  align-items: center;
  line-height: ${props => props.theme.typeScale.size03.lineHeight};
  padding: ${props => props.theme.spaceScale.spacing03}
    ${props => props.theme.spaceScale.spacing05};
  font-weight: 400;
  background: ${props => getItemBackground(props.isFocused, props.isInverse)};
`;

function getItemBackground(isFocused: boolean, isInverse: boolean) {
  if (!isFocused) return 'transparent';
  return isInverse ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)';
}

export const getItemListMaxHeight = (monthContainerHeight: number) => {
  return monthContainerHeight - 60;
};

export const CustomSelectItem = props => {
  const { itemRef, isFocused, currentValue, item, theme, ...other } = props;

  return (
    <CustomStyledItem
      isInverse={props.isInverse}
      isFocused={isFocused}
      ref={itemRef}
      theme={theme}
      {...other}
    >
      <IconWrapper theme={theme}>
        {item.label === currentValue && <CheckIcon size={24} />}
      </IconWrapper>
      {item.label}
    </CustomStyledItem>
  );
};

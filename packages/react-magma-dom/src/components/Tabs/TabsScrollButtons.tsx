import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExpandLessIcon,
  ExpandMoreIcon,
} from 'react-magma-icons';

import { TabsOrientation } from './shared';
import { I18nContext } from '../../i18n';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';

export interface ScrollButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
  buttonVisible?: boolean;
  isInverse?: boolean;
  orientation?: TabsOrientation;
  theme?: ThemeInterface;
}

const StyledScrollButton = styled.button<ScrollButtonProps>`
  align-items: center;
  border: 0;
  box-sizing: border-box;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral0
      : props.theme.colors.brand.navy};
  cursor: pointer;
  display: ${props => (props.buttonVisible ? 'flex' : 'none')};
  justify-content: center;
  outline-offset: 0;
  position: absolute;
  -webkit-appearance: none;
  z-index: 2;

  bottom: 0;
  top: 0;
  width: 40px;

  &:focus {
    outline-offset: -2px;
  }

  &:hover {
    background: ${props =>
      props.isInverse
        ? props.theme.colors.neutral900
        : props.theme.colors.neutral200};
  }

  ${props =>
    props.orientation === 'vertical' &&
    css`
      left: 0;
      height: 40px;
      right: 0;
      width: 100%;
    `}
`;

const StyledButtonPrev = styled(StyledScrollButton)<ScrollButtonProps>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.neutral1100
      : props.theme.colors.neutral0};
  border-right: 1px solid
    ${props =>
      props.isInverse
        ? props.theme.colors.neutral800
        : props.theme.colors.neutral200};
  left: 0;

  ${props =>
    props.orientation === 'vertical' &&
    css`
      bottom: auto;
    `}
`;

const StyledButtonNext = styled(StyledScrollButton)<ScrollButtonProps>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.neutral1100
      : props.theme.colors.neutral0};
  border-left: 1px solid
    ${props =>
      props.isInverse
        ? props.theme.colors.neutral800
        : props.theme.colors.neutral200};
  right: 0;

  ${props =>
    props.orientation === 'vertical' &&
    css`
      top: auto;
    `}
`;

export const ButtonPrev = React.forwardRef<
  HTMLButtonElement,
  ScrollButtonProps
>((props, ref) => {
  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  return (
    <StyledButtonPrev
      aria-label={i18n.tabs.previousButtonLabel}
      backgroundColor={props.backgroundColor}
      buttonVisible={props.buttonVisible}
      data-testid="buttonPrev"
      isInverse={props.isInverse}
      onClick={props.onClick}
      orientation={props.orientation}
      ref={ref}
      theme={props.theme}
    >
      {props.orientation === TabsOrientation.vertical ? (
        <ExpandLessIcon size={theme.iconSizes.small} />
      ) : (
        <ChevronLeftIcon size={theme.iconSizes.small} />
      )}
    </StyledButtonPrev>
  );
});

export const ButtonNext = React.forwardRef<
  HTMLButtonElement,
  ScrollButtonProps
>((props, ref) => {
  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  return (
    <StyledButtonNext
      aria-label={i18n.tabs.nextButtonLabel}
      backgroundColor={props.backgroundColor}
      buttonVisible={props.buttonVisible}
      data-testid="buttonNext"
      isInverse={props.isInverse}
      onClick={props.onClick}
      orientation={props.orientation}
      ref={ref}
      theme={props.theme}
    >
      {props.orientation === TabsOrientation.vertical ? (
        <ExpandMoreIcon size={theme.iconSizes.small} />
      ) : (
        <ChevronRightIcon size={theme.iconSizes.small} />
      )}
    </StyledButtonNext>
  );
});

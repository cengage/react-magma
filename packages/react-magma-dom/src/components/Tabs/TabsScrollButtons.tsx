import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { transparentize } from 'polished';
import { TabsOrientation } from './shared';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';

import {
  ArrowBackIosIcon,
  ExpandLessIcon,
  ExpandMoreIcon,
  ArrowForwardIosIcon,
} from 'react-magma-icons';

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
  backdrop-filter: blur(1px);
  border: 0;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral};
  cursor: pointer;
  display: ${props => (props.buttonVisible ? 'flex' : 'none')};
  justify-content: center;
  outline-offset: 0;
  position: absolute;
  -webkit-appearance: none;
  z-index: 2;

  bottom: 0;
  top: 0;
  width: 44px;

  ${props =>
    props.orientation === 'vertical' &&
    css`
      left: 0;
      height: 44px;
      right: 0;
      width: 100%;
    `}
`;

const StyledButtonPrev = styled(StyledScrollButton)<ScrollButtonProps>`
  background: ${props => `linear-gradient(
      90deg,
      ${props.backgroundColor} 0%,
      ${transparentize(0.5, props.backgroundColor)} 100%
    )`};
  left: 0;

  ${props =>
    props.orientation === 'vertical' &&
    css`
      background: ${`linear-gradient(
          ${props.backgroundColor} 0%,
          ${transparentize(0.5, props.backgroundColor)} 100%
        )`};

      bottom: auto;
    `}
`;

const StyledButtonNext = styled(StyledScrollButton)<{
  backgroundColor?: string;
  orientation?: TabsOrientation;
}>`
  background: ${props => `linear-gradient(
        90deg,
        ${transparentize(0.5, props.backgroundColor)} 0%,
        ${props.backgroundColor} 100%
      )`};
  right: 0;

  ${props =>
    props.orientation === 'vertical' &&
    css`
      background: linear-gradient(
        ${transparentize(0.5, props.backgroundColor)} 0%,
        ${props.backgroundColor} 100%
      );
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
        <ArrowBackIosIcon size={theme.iconSizes.small} />
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
        <ArrowForwardIosIcon size={theme.iconSizes.small} />
      )}
    </StyledButtonNext>
  );
});

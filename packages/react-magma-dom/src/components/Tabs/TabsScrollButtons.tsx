import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { transparentize } from 'polished';
import { TabsOrientation } from './shared';
import { ThemeInterface } from '../../theme/magma';

import {
  AngleRightIcon,
  AngleLeftIcon,
  AngleUpIcon,
  AngleDownIcon,
} from 'react-magma-icons';

export interface ScrollButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
  buttonVisible?: boolean;
  isInverse?: boolean;
  orientation?: TabsOrientation;
  ref?: any;
  theme?: ThemeInterface;
}

const StyledScrollButton = styled.button<ScrollButtonProps>`
  align-items: center;
  backdrop-filter: blur(1px);
  border: 0;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral01};
  cursor: pointer;
  display: ${props => (props.buttonVisible ? 'flex' : 'none')};
  justify-content: center;
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
  ref?: any;
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

export const ButtonPrev: React.FunctionComponent<ScrollButtonProps> = React.forwardRef(
  (props: ScrollButtonProps, ref: any) => {
    return (
      <StyledButtonPrev
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
          <AngleUpIcon size={16} />
        ) : (
          <AngleLeftIcon size={16} />
        )}
      </StyledButtonPrev>
    );
  }
);

export const ButtonNext: React.FunctionComponent<ScrollButtonProps> = React.forwardRef(
  (props: ScrollButtonProps, ref: any) => {
    return (
      <StyledButtonNext
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
          <AngleDownIcon size={16} />
        ) : (
          <AngleRightIcon size={16} />
        )}
      </StyledButtonNext>
    );
  }
);

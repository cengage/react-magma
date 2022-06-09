import * as React from 'react';
import styled from '../../theme/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { css } from '@emotion/core';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  ButtonTextTransform,
} from '../Button';

export enum ButtonGroupAlignment {
  left = 'left', // default
  center = 'center',
  right = 'right',
  apart = 'apart',
  fill = 'fill',
}

export enum ButtonGroupOrientation {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

/**
 * @children required
 */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alignment of the dropdown content
   * @default `ButtonGroupAlignment.left`
   */
  alignment?: ButtonGroupAlignment;
  /**
   * The color of all the buttons in the group
   * @default ButtonColor.primary
   */
  color?: ButtonColor;
  /**
   * Determines if the buttons are displayed vertically or horizontally
   * @default ButtonGroupOrientation.horizontal
   */
  orientation?: ButtonGroupOrientation;
  /**
   * The variant of all the buttons in the group
   * @default ButtonVariant.solid
   */
  variant?: ButtonVariant;
  /**
   * The relative size of all the buttons in the group
   * @default ButtonSize.medium
   */
  size?: ButtonSize;
  /**
   * Whether or not the buttons in the group are spaced out
   * @default false
   */
  noSpace?: boolean;
  isInverse?: boolean;
  testId?: string;
  /**
   * Determines whether all the buttons in the group appear in all-caps
   * @default ButtonTextTransform.uppercase
   */
  textTransform?: ButtonTextTransform;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export interface ButtonGroupContextInterface {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  textTransform?: ButtonTextTransform;
  isInverse?: boolean;
}

export const ButtonGroupContext =
  React.createContext<ButtonGroupContextInterface>({});

function buildButtonMargin(props) {
  if (props.noSpace) {
    return '0';
  }
  if (props.orientation === ButtonGroupOrientation.horizontal) {
    return `0 ${props.theme.spaceScale.spacing02}`;
  }
  if (props.orientation === ButtonGroupOrientation.vertical) {
    return `${props.theme.spaceScale.spacing02} 0`;
  }
}

function buildButtonAlignment(props) {
  if (props.alignment === ButtonGroupAlignment.right) {
    return 'end';
  }
  if (props.alignment === ButtonGroupAlignment.center) {
    return 'center';
  }
  if (
    props.alignment === ButtonGroupAlignment.apart &&
    props.orientation === ButtonGroupOrientation.horizontal
  ) {
    return 'space-between';
  }
  if (props.alignment === ButtonGroupAlignment.fill) {
    return 'stretch';
  }
  return 'start';
}

function buildNoSpaceBorderColor(props) {
  if (props.isInverse) {
    if (props.color === 'secondary') {
      return props.theme.colors.tertiary;
    }
    return props.theme.colors.neutral100;
  }
  if (props.color === 'secondary') {
    return props.theme.colors.primary;
  }
  return props.theme.colors.neutral100;
}

const StyledButtonGroup = styled.div<{
  orientation?: ButtonGroupOrientation;
  alignment?: ButtonGroupAlignment;
  noSpace?: Boolean;
  color?: ButtonColor;
  isInverse?: Boolean;
}>`
  display: flex;
  justify-content: ${props => buildButtonAlignment(props)};
  flex-direction: ${props =>
    props.orientation === ButtonGroupOrientation.vertical ? 'column' : 'row'};

  ${props =>
    props.orientation === ButtonGroupOrientation.vertical &&
    css`
      align-items: ${buildButtonAlignment(props)};
    `}

  > button {
    margin: ${props => buildButtonMargin(props)};
    flex: ${props =>
      props.alignment === ButtonGroupAlignment.fill &&
      props.orientation === ButtonGroupOrientation.horizontal
        ? '1'
        : 'none'};

    ${props =>
      props.orientation === ButtonGroupOrientation.horizontal &&
      css`
        &:first-of-type {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      `}

    ${props =>
      props.orientation === ButtonGroupOrientation.vertical &&
      css`
        &:first-of-type {
          margin-top: 0;
        }
        &:last-child {
          margin-bottom: 0;
        }
      `}

    ${props =>
      props.noSpace &&
      props.orientation === ButtonGroupOrientation.horizontal &&
      props.alignment !== ButtonGroupAlignment.apart &&
      css`
        &:first-of-type:not(:only-of-type) {
          border-radius: ${props.theme.borderRadius} 0 0
            ${props.theme.borderRadius};
        }
        &:nth-of-type(2) {
          border-left: 1px solid ${buildNoSpaceBorderColor(props)};
        }
        &:not(:first-of-type) {
          border-radius: 0;
          border-right: 1px solid ${buildNoSpaceBorderColor(props)};
        }
        &:last-child:not(:only-of-type) {
          border-radius: 0 ${props.theme.borderRadius}
            ${props.theme.borderRadius} 0;
        }
      `}
  }
`;

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (props, ref) => {
    const {
      children,
      variant,
      color,
      size,
      textTransform,
      isInverse,
      testId,
      ...rest
    } = props;
    const context = { variant, color, size, textTransform, isInverse };
    const theme = React.useContext(ThemeContext);

    return (
      <StyledButtonGroup
        color={color}
        isInverse={isInverse}
        {...rest}
        theme={theme}
        ref={ref}
        data-testid={props.testId}
      >
        <ButtonGroupContext.Provider value={context}>
          {children}
        </ButtonGroupContext.Provider>
      </StyledButtonGroup>
    );
  }
);

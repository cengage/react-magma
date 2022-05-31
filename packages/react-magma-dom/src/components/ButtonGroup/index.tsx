import * as React from 'react';
import styled from '../../theme/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { css } from '@emotion/core';

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
   * Determines if the buttons are displayed vertically or horizontally
   * @default ButtonGroupOrientation.horizontal
   */
  orientation?: ButtonGroupOrientation;
  /**
   * Whether no space should be added
   * @default false
   */
  noSpace?: boolean;
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

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
  if (props.alignment === ButtonGroupAlignment.apart && props.orientation === ButtonGroupOrientation.horizontal) {
    return 'space-between';
  }
  if (props.alignment === ButtonGroupAlignment.fill) {
    return 'stretch';
  }
  return 'start';
}

const StyledButtonGroup = styled.div<{
  orientation?: ButtonGroupOrientation;
  alignment?: ButtonGroupAlignment;
  noSpace?: Boolean;
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
      props.alignment === ButtonGroupAlignment.fill && props.orientation === ButtonGroupOrientation.horizontal ? '1' : 'none'};

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
        // border-right: 1px solid white;
        margin-right: 1px;

        &:first-of-type {
          border-radius: ${props.theme.borderRadius} 0 0
            ${props.theme.borderRadius};
        }
        &:not(:first-of-type) {
          border-radius: 0;
        }
        &:last-child {
          border-radius: 0 ${props.theme.borderRadius}
            ${props.theme.borderRadius} 0;
          // border-right: 0;
        }
      `}
  }
`;

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (props, ref) => {
    const { children, testId, ...rest } = props;
    const theme = React.useContext(ThemeContext);

    return (
      <StyledButtonGroup
        {...rest}
        theme={theme}
        ref={ref}
        data-testid={props.testId}
      >
        {children}
      </StyledButtonGroup>
    );
  }
);

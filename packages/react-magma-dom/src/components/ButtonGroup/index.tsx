import * as React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';

import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
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
  horizontal = 'horizontal', // default
  vertical = 'vertical',
}

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @children required
   */
  children: React.ReactNode;
  /**
   * Alignment of the dropdown content
   * @default ButtonGroupAlignment.left
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
  /**
   * @internal
   */
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

interface StyledButtonGroupProps {
  alignment?: ButtonGroupAlignment;
  color?: ButtonColor;
  isInverse?: boolean;
  noSpace?: boolean;
  orientation?: ButtonGroupOrientation;
  variant?: ButtonVariant;
  theme: ThemeInterface;
}

function buildButtonMargin(props: StyledButtonGroupProps): string {
  if (props.noSpace) {
    return '0';
  }
  if (props.orientation === ButtonGroupOrientation.horizontal) {
    return `0 ${props.theme.spaceScale.spacing02}`;
  }
  if (props.orientation === ButtonGroupOrientation.vertical) {
    return `0 0 ${props.theme.spaceScale.spacing03}`;
  }

  return `0 ${props.theme.spaceScale.spacing02}`;
}

function buildButtonAlignment(props: StyledButtonGroupProps): string {
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

function buildNoSpaceBorderColor(props: StyledButtonGroupProps): string {
  if (props.isInverse) {
    if (props.color === ButtonColor.secondary) {
      return props.theme.colors.tertiary;
    }
    if (props.color === ButtonColor.subtle) {
      return transparentize(0.8, props.theme.colors.neutral300);
    }

    return props.theme.colors.neutral100;
  }
  if (props.color === ButtonColor.secondary) {
    return props.theme.colors.primary300;
  }
  if (props.color === ButtonColor.subtle) {
    return props.theme.colors.neutral300;
  }

  return props.theme.colors.neutral100;
}

function buildFlex(props: StyledButtonGroupProps): string {
  return props.alignment === ButtonGroupAlignment.fill &&
    props.orientation === ButtonGroupOrientation.horizontal
    ? '1'
    : 'none';
}

function buildBorderRight(props: StyledButtonGroupProps): string {
  return props.color === ButtonColor.secondary ||
    props.color === ButtonColor.subtle
    ? '0'
    : `1px solid ${props.theme.colors.neutral100}`;
}

const buildNoSpaceButtonStyles = (
  props: StyledButtonGroupProps,
  selector: string = ''
) => {
  const selectorWrapper = (styles: string) =>
    selector ? `${selector} { ${styles} }` : styles;

  return css`
    &:first-child:not(:only-child) {
      ${selectorWrapper(`
        border-radius: ${props.theme.borderRadius} 0 0 ${props.theme.borderRadius};
        border-right: 0;
      `)}
    }
    &:nth-child(2) {
      ${selectorWrapper(`
        border-left: 1px solid ${buildNoSpaceBorderColor(props)};
      `)}
    }
    &:not(:first-child) {
      ${selectorWrapper(`
        border-radius: 0;
        border-right: ${buildBorderRight(props)};
      `)}
    }
    &:not(:first-child)&:not(:last-child) {
      ${selectorWrapper(`
        border-right: 0;
      `)}
    }
    &:last-child:not(:only-child) {
      ${selectorWrapper(`
        border-radius: 0 ${props.theme.borderRadius} ${props.theme.borderRadius} 0;
        border-right: 1px solid ${buildNoSpaceBorderColor(props)};
      `)}
    }
  `;
};

const buildHorizontalMarginReset = () => css`
  &:first-child:not(:only-child) {
    > button {
      margin-left: 0;
    }
  }

  &:last-child:not(:only-child) {
    > button {
      margin-right: 0;
    }
  }
`;

const buildVerticalMarginReset = () => css`
  &:first-child:not(:only-child) {
    > button {
      margin-top: 0;
    }
  }

  &:last-child:not(:only-child) {
    > button {
      margin-bottom: 0;
    }
  }
`;

function shouldApplyNoSpaceStyles(props: StyledButtonGroupProps): boolean {
  return (
    props.noSpace &&
    props.orientation === ButtonGroupOrientation.horizontal &&
    props.variant === ButtonVariant.solid &&
    props.alignment !== ButtonGroupAlignment.apart
  );
}

const StyledButtonGroup = styled.div<StyledButtonGroupProps>`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: ${props => buildButtonAlignment(props)};
  flex-direction: ${props =>
    props.orientation === ButtonGroupOrientation.vertical ? 'column' : 'row'};
  flex-wrap: wrap;

  ${props =>
    props.orientation === ButtonGroupOrientation.vertical &&
    css`
      align-items: ${buildButtonAlignment(props)};
    `}

  ${props =>
    props.orientation === ButtonGroupOrientation.horizontal &&
    css`
      row-gap: ${props.theme.spaceScale.spacing03};
    `}

  > li > div {
    margin: ${props => buildButtonMargin(props)};
    flex: ${props => buildFlex(props)};
    div > button,
    button {
      // Split buttons
      &:nth-child(2) {
        width: 40px;
      }
      width: ${props =>
        props.alignment === ButtonGroupAlignment.fill ? '100%' : ''};
    }
  }

  > li > button {
    margin: ${props => buildButtonMargin(props)};
    flex: ${props => buildFlex(props)};

    // Only apply width 100% to buttons that are NOT icon-only buttons
    ${props =>
      props.alignment === ButtonGroupAlignment.fill &&
      css`
        &:not([aria-label]):not([title]) {
          width: 100%;
        }
        &[aria-label]:empty,
        &[title]:empty {
          width: auto;
          flex: none;
        }
        // Check if button has only icon content (no text)
        &:has(svg):not(:has(:not(svg))) {
          width: auto;
          flex: none;
        }
      `}
  }

  > li {
    ${props =>
      props.orientation === ButtonGroupOrientation.horizontal &&
      buildHorizontalMarginReset()}

    ${props =>
      props.orientation === ButtonGroupOrientation.vertical &&
      buildVerticalMarginReset()}

    ${props =>
      shouldApplyNoSpaceStyles(props) &&
      buildNoSpaceButtonStyles(props, 'button')};

    ${props =>
      shouldApplyNoSpaceStyles(props) &&
      css`
        > div {
          ${buildNoSpaceButtonStyles(props, 'button')}
        }
      `};
  }

  // Styles for ToggleButtonGroup
  > li > button {
    ${props =>
      shouldApplyNoSpaceStyles(props) && buildNoSpaceButtonStyles(props)};
  }
`;

const StyledButtonItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
  display: contents;
`;

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (props, ref) => {
    const {
      alignment,
      children,
      color,
      isInverse,
      orientation,
      noSpace,
      size,
      testId,
      textTransform,
      variant,
      ...rest
    } = props;
    const context = { variant, color, size, textTransform, isInverse };
    const theme = React.useContext(ThemeContext);

    const wrappedChildren = React.Children.map(children, child => (
      <StyledButtonItem>{child}</StyledButtonItem>
    ));

    return (
      <StyledButtonGroup
        alignment={alignment || ButtonGroupAlignment.left}
        color={color || ButtonColor.primary}
        isInverse={isInverse}
        orientation={orientation || ButtonGroupOrientation.horizontal}
        noSpace={noSpace}
        variant={variant || ButtonVariant.solid}
        theme={theme}
        ref={ref}
        data-testid={testId}
        {...rest}
        as={'ul'}
        role="list"
      >
        <ButtonGroupContext.Provider value={context}>
          {wrappedChildren}
        </ButtonGroupContext.Provider>
      </StyledButtonGroup>
    );
  }
);

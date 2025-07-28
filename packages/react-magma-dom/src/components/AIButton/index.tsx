import * as React from 'react';

import { IconProps } from 'react-magma-icons';

import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { resolveProps, XOR } from '../../utils';
import { ButtonGroupContext } from '../ButtonGroup';
import { StyledAIButton } from '../StyledAIButton';

export enum AIButtonVariant {
  variantA = 1, //default
  variantB = 2,
}

export enum AIButtonShape {
  fill = 'fill', //default
  leftCap = 'leftCap',
  rightCap = 'rightCap',
  round = 'round',
}

export enum AIButtonSize {
  large = 'large',
  medium = 'medium', //default
  small = 'small',
}

export enum AIButtonTextTransform {
  uppercase = 'uppercase', //default
  none = 'none',
}

export enum AIButtonType {
  button = 'button',
  submit = 'submit',
  reset = 'reset',
}

export interface AIButtonStyles {
  /**
   * Set the button to display full-width.
   * @default false
   */
  isFullWidth?: boolean;
  isInverse?: boolean;
  /**
   * Defines the border radius
   * @default AIButtonShape.fill
   */
  shape?: AIButtonShape;
  /**
   *  Set the button to a loading state
   * @default false
   */
  isLoading?: boolean;
  /**
   * The relative size of the button
   * @default AIButtonSize.medium
   */
  size?: AIButtonSize;
  /**
   * Determines whether the button appears in all-caps
   * @default AIButtonTextTransform.uppercase
   */
  textTransform?: AIButtonTextTransform;
  /**
   * The variant of the button
   * @default AIButtonVariant.primary
   */
  variant?: AIButtonVariant;
}

export interface BaseAIButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    AIButtonStyles {
  /**
   * @internal
   */
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
  /**
   * The type attribute of the button
   * ButtonType.button
   */
  type?: AIButtonType;
  /**
   * Sets the color for the left side of the button gradient.
   */
  leftColor?: string;
  /**
   * Sets the color for the right side of the button gradient.
   */
  rightColor?: string;
  /**
   * Sets the gradient color when the button is hovered.
   */
  hoverColor?: string;
  /**
   * Sets the gradient color when the button is pressed (active).
   */
  pressedColor?: string;
  /**
   * Enables gradient animation for the button background.
   * @default false
   */
  isAnimated?: boolean;
}

export interface ContentAIButtonProps extends BaseAIButtonProps {
  /**
   * The content of the component
   */
  children: React.ReactChild | React.ReactChild[];
  /**
   * Icon to display on the right side within the component
   */
  trailingIcon?: React.ReactElement<IconProps>;
  /**
   * Leading icon to display on the left side within the component
   */
  leadingIcon?: boolean | React.ReactElement<IconProps>;
}

export interface IconOnlyAIButtonProps extends BaseAIButtonProps {
  /**
   * Icon to display on the right side within the component
   */
  leadingIcon?: true | React.ReactElement<IconProps>;
  /**
   * The text the screen reader will announce. Required for icon-only buttons
   */
  'aria-label': string;
  children?: never;
}

export type AIButtonProps = XOR<ContentAIButtonProps, IconOnlyAIButtonProps>;

export const AIButton = React.forwardRef<HTMLButtonElement, AIButtonProps>(
  (props, ref) => {
    const contextProps = React.useContext(ButtonGroupContext);
    const resolvedProps = resolveProps(contextProps, props);
    const { variant, shape, size, testId, textTransform, ...rest } =
      resolvedProps;
    const isInverse = useIsInverse(resolvedProps.isInverse);

    return (
      <StyledAIButton
        {...rest}
        ref={ref}
        isInverse={isInverse}
        shape={shape || AIButtonShape.fill}
        size={size || AIButtonSize.medium}
        testId={testId}
        textTransform={textTransform || AIButtonTextTransform.uppercase}
        variant={variant || AIButtonVariant.variantA}
      >
        {resolvedProps.children}
      </StyledAIButton>
    );
  }
);

import * as React from 'react';
import { StyledButton } from '../StyledButton';
import styled from '@emotion/styled';
import { IconProps } from '../Icon/utils';
import { Omit } from '../utils';

export enum EnumButtonVariant {
  solid = 'solid', //default
  outline = 'outline',
  link = 'link'
}

export enum EnumButtonColor {
  primary = 'primary', //default
  secondary = 'secondary',
  success = 'success',
  danger = 'danger',
  marketing = 'marketing'
}

export enum EnumButtonShape {
  fill = 'fill', //default
  leftCap = 'leftCap',
  rightCap = 'rightCap',
  round = 'round' // default for icon only buttons
}

export enum EnumButtonSize {
  large = 'large',
  medium = 'medium', //default
  small = 'small'
}

export enum EnumButtonTextTransform {
  uppercase = 'uppercase', //default
  none = 'none'
}

export enum EnumButtonIconPosition {
  left = 'left',
  right = 'right'
}

export enum EnumButtonType {
  button = 'button',
  submit = 'submit',
  reset = 'reset'
}

export interface ButtonStyles {
  block?: boolean;
  color?: EnumButtonColor;
  inverse?: boolean;
  shape?: EnumButtonShape;
  size?: EnumButtonSize;
  textTransform?: EnumButtonTextTransform;
  variant?: EnumButtonVariant;
}

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  autoFocus?: boolean;
  testId?: string;
  ref?: any;
  theme?: any;
  type?: EnumButtonType;
}

export type ButtonProps = BaseButtonProps & ButtonStyles;

export interface IconOnlyButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ReactElement<IconProps>;
  'aria-label': string;
}

interface IconTextButtonProps extends ButtonProps {
  icon: React.ReactElement<IconProps>;
  children: React.ReactChild | React.ReactChild[];
  iconPosition?: EnumButtonIconPosition;
}

export type MergedButtonProps =
  | ButtonProps
  | IconTextButtonProps
  | IconOnlyButtonProps;

export interface SpanProps {
  size?: EnumButtonSize;
}

const SpanTextLeft = styled.span<SpanProps>`
  padding-right: ${props => (props.size === 'large' ? '15px' : '10px')};
`;

const SpanTextRight = styled.span<SpanProps>`
  padding-left: ${props => (props.size === 'large' ? '15px' : '10px')};
`;

function getIconSize(size) {
  switch (size) {
    case 'large':
      return 24;
    case 'small':
      return 14;
    default:
      return 18;
  }
}

function getIconWithTextSize(size) {
  switch (size) {
    case 'large':
      return 20;
    case 'small':
      return 12;
    default:
      return 16;
  }
}

function instanceOfIconText(object: any): object is IconTextButtonProps {
  return 'icon' in object && 'children' in object;
}

function instanceOfIconOnly(object: any): object is IconOnlyButtonProps {
  return 'icon' in object && !('children' in object);
}

export const Button: React.FunctionComponent<
  MergedButtonProps
> = React.forwardRef((props: MergedButtonProps, ref: any) => {
  let icon;
  let iconPosition;
  let children;
  const {
    inverse,
    block,
    color,
    testId,
    shape,
    size,
    variant,
    textTransform,
    ...other
  } = props;

  if (instanceOfIconOnly(props)) {
    icon = props.icon;
  } else if (instanceOfIconText(props)) {
    icon = props.icon;
    iconPosition = props.iconPosition;
    children = props.children;
  } else {
    children = props.children;
  }

  if (icon && children) {
    return (
      <StyledButton
        {...other}
        testId={testId}
        ref={ref}
        block={block}
        color={color ? color : EnumButtonColor.primary}
        inverse={inverse}
        shape={shape ? shape : EnumButtonShape.fill}
        size={size ? size : EnumButtonSize.medium}
        textTransform={
          textTransform ? textTransform : EnumButtonTextTransform.uppercase
        }
        variant={variant ? variant : EnumButtonVariant.solid}
      >
        {iconPosition === EnumButtonIconPosition.right && (
          <SpanTextLeft size={size}>{children} </SpanTextLeft>
        )}
        {React.Children.only(
          React.cloneElement(icon, { size: getIconWithTextSize(size) })
        )}
        {iconPosition !== EnumButtonIconPosition.right && (
          <SpanTextRight size={size}>{children}</SpanTextRight>
        )}
      </StyledButton>
    );
  } else if (icon && !children) {
    return (
      <StyledButton
        {...other}
        testId={testId}
        ref={ref}
        color={color ? color : EnumButtonColor.primary}
        iconOnly
        inverse={inverse}
        shape={shape ? shape : EnumButtonShape.round}
        size={size ? size : EnumButtonSize.medium}
        variant={variant ? variant : EnumButtonVariant.solid}
      >
        {React.Children.only(
          React.cloneElement(icon, { size: getIconSize(size) })
        )}
      </StyledButton>
    );
  }

  return (
    <StyledButton
      {...other}
      testId={testId}
      ref={ref}
      block={block}
      color={color ? color : EnumButtonColor.primary}
      inverse={inverse}
      shape={shape ? shape : EnumButtonShape.fill}
      size={size ? size : EnumButtonSize.medium}
      textTransform={
        textTransform ? textTransform : EnumButtonTextTransform.uppercase
      }
      variant={variant ? variant : EnumButtonVariant.solid}
    >
      {children}
    </StyledButton>
  );
});

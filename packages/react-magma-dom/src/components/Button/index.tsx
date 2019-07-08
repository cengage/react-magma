import * as React from 'react';
import { StyledButton } from '../StyledButton';
import styled from '@emotion/styled';
import { IconProps } from '../Icon/utils';
import { Omit } from '../utils';

export enum IButtonVariant {
  solid = 'solid', //default
  outline = 'outline',
  link = 'link'
}

export enum IButtonColor {
  primary = 'primary', //default
  secondary = 'secondary',
  success = 'success',
  danger = 'danger',
  marketing = 'marketing'
}

export enum IButtonShape {
  fill = 'fill', //default
  leftCap = 'leftCap',
  rightCap = 'rightCap',
  round = 'round' // default for icon only buttons
}

export enum IButtonSize {
  large = 'large',
  medium = 'medium', //default
  small = 'small'
}

export enum IButtonTextTransform {
  uppercase = 'uppercase', //default
  none = 'none'
}

export enum IButtonIconPosition {
  left = 'left',
  right = 'right'
}

export enum IButtonType {
  button = 'button',
  submit = 'submit',
  reset = 'reset'
}

export interface ButtonStyles {
  block?: boolean;
  color?: IButtonColor;
  inverse?: boolean;
  shape?: IButtonShape;
  size?: IButtonSize;
  textTransform?: IButtonTextTransform;
  type?: IButtonType;
  variant?: IButtonVariant;
}

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ariaExpanded?: boolean;
  ariaLabel?: string;
  as?: any;
  autoFocus?: boolean;
  href?: string;
  testId?: string;
  ref?: any;
  theme?: any;
  to?: string;
}

export type ButtonProps = BaseButtonProps & ButtonStyles;

export interface IconOnlyButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ReactElement<IconProps>;
  ariaLabel: string;
}

interface IconTextButtonProps extends ButtonProps {
  icon: React.ReactElement<IconProps>;
  children: React.ReactChild | React.ReactChild[];
  iconPosition?: IButtonIconPosition;
}

export type MergedButtonProps =
  | ButtonProps
  | IconTextButtonProps
  | IconOnlyButtonProps;

export interface SpanProps {
  size?: IButtonSize;
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
    ariaExpanded,
    ariaLabel,
    as,
    inverse,
    block,
    color,
    href,
    testId,
    shape,
    size,
    variant,
    textTransform,
    to,
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
        ariaLabel={ariaLabel}
        ariaExpanded={ariaExpanded}
        as={as}
        block={block}
        color={color ? color : IButtonColor.primary}
        inverse={inverse}
        href={href}
        shape={shape ? shape : IButtonShape.fill}
        size={size ? size : IButtonSize.medium}
        textTransform={
          textTransform ? textTransform : IButtonTextTransform.uppercase
        }
        to={to}
        variant={variant ? variant : IButtonVariant.solid}
      >
        {iconPosition === IButtonIconPosition.right && (
          <SpanTextLeft size={size}>{children} </SpanTextLeft>
        )}
        {React.Children.only(
          React.cloneElement(icon, { size: getIconWithTextSize(size) })
        )}
        {iconPosition !== IButtonIconPosition.right && (
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
        ariaExpanded={ariaExpanded}
        ariaLabel={ariaLabel}
        as={as}
        color={color ? color : IButtonColor.primary}
        iconOnly
        inverse={inverse}
        href={href}
        shape={shape ? shape : IButtonShape.round}
        size={size ? size : IButtonSize.medium}
        to={to}
        variant={variant ? variant : IButtonVariant.solid}
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
      as={as}
      ariaExpanded={ariaExpanded}
      ariaLabel={ariaLabel}
      block={block}
      color={color ? color : IButtonColor.primary}
      href={href}
      inverse={inverse}
      shape={shape ? shape : IButtonShape.fill}
      size={size ? size : IButtonSize.medium}
      textTransform={
        textTransform ? textTransform : IButtonTextTransform.uppercase
      }
      to={to}
      variant={variant ? variant : IButtonVariant.solid}
    >
      {children}
    </StyledButton>
  );
});

import * as React from 'react';
import { ButtonCore } from 'react-magma-core';
import {
  StyledButton,
  ButtonProps,
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonTextTransform,
  ButtonVariant,
  ButtonIconPostition
} from '../StyledButton';
import styled from '@emotion/styled';
import { IconProps } from '../Icon/utils';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface IconOnlyButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ReactElement<IconProps>;
  ariaLabel: string;
}

interface IconTextButtonProps extends ButtonProps {
  icon: React.ReactElement<IconProps>;
  children: React.ReactChild | React.ReactChild[];
  iconPosition?: ButtonIconPostition;
}

export type MergedButtonProps =
  | ButtonProps
  | IconTextButtonProps
  | IconOnlyButtonProps;

export interface SpanProps {
  size?: ButtonSize;
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

export const Button: React.FunctionComponent<MergedButtonProps> = (
  props: MergedButtonProps
) => (
  <ButtonCore onClick={props.onClick}>
    {({ onClick }) => {
      let icon;
      let iconPosition;
      let ariaLabel;
      let children;
      const {
        as,
        autoFocus,
        disabled,
        inverse,
        block,
        color,
        shape,
        size,
        style,
        variant,
        textTransform,
        to
      } = props;

      if (instanceOfIconOnly(props)) {
        icon = props.icon;
        ariaLabel = props.ariaLabel;
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
            as={as}
            autoFocus={autoFocus}
            onClick={onClick}
            block={block}
            color={color ? color : ButtonColor.primary}
            disabled={disabled}
            inverse={inverse}
            shape={shape ? shape : ButtonShape.fill}
            size={size ? size : ButtonSize.medium}
            style={style}
            textTransform={
              textTransform ? textTransform : ButtonTextTransform.uppercase
            }
            to={to}
            variant={variant ? variant : ButtonVariant.solid}
          >
            {iconPosition === ButtonIconPostition.right && (
              <SpanTextLeft size={size}>{children} </SpanTextLeft>
            )}
            {React.Children.only(
              React.cloneElement(icon, { size: getIconWithTextSize(size) })
            )}
            {iconPosition !== ButtonIconPostition.right && (
              <SpanTextRight size={size}>{children}</SpanTextRight>
            )}
          </StyledButton>
        );
      } else if (icon && !children) {
        return (
          <StyledButton
            ariaLabel={ariaLabel}
            as={as}
            autoFocus={autoFocus}
            onClick={onClick}
            color={color ? color : ButtonColor.primary}
            disabled={disabled}
            iconOnly
            inverse={inverse}
            shape={shape ? shape : ButtonShape.round}
            size={size ? size : ButtonSize.medium}
            style={style}
            to={to}
            variant={variant ? variant : ButtonVariant.solid}
          >
            {React.Children.only(
              React.cloneElement(icon, { size: getIconSize(size) })
            )}
          </StyledButton>
        );
      }

      return (
        <StyledButton
          as={as}
          autoFocus={autoFocus}
          onClick={onClick}
          block={block}
          color={color ? color : ButtonColor.primary}
          disabled={disabled}
          inverse={inverse}
          shape={shape ? shape : ButtonShape.fill}
          size={size ? size : ButtonSize.medium}
          style={style}
          textTransform={
            textTransform ? textTransform : ButtonTextTransform.uppercase
          }
          to={to}
          variant={variant ? variant : ButtonVariant.solid}
        >
          {children}
        </StyledButton>
      );
    }}
  </ButtonCore>
);

import * as React from 'react';
import { ButtonCore } from 'react-magma-core';
import {
  ButtonProps,
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  ButtonShape,
  StyledButton,
  ButtonTextTransform
} from '../StyledButton';
import { Icon } from '../Icon';
import styled from '@emotion/styled';

enum ButtonTextPostition {
  left = 'left',
  right = 'right'
}

export type IconOnlyButtonProps = ButtonProps & {
  icon: string;
  children: null;
  ariaLabel: string;
  textPosition?: ButtonTextPostition;
};

interface IconTextButtonProps extends ButtonProps {
  icon: string;
  ariaLabel?: string;
  textPosition?: ButtonTextPostition;
}

export type IconButtonProps = IconOnlyButtonProps | IconTextButtonProps;

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

export const IconButton: React.FunctionComponent<IconButtonProps> = (
  props: IconButtonProps
) => (
  <ButtonCore onClick={props.onClick}>
    {({ onClick }) => {
      const {
        as,
        autoFocus,
        ariaExpanded,
        ariaLabel,
        children,
        disabled,
        href,
        icon,
        iconOnly,
        inverse,
        block,
        color,
        ref,
        shape,
        size,
        style,
        variant,
        textTransform,
        textPosition,
        to
      } = props;

      if (!iconOnly) {
        return (
          <StyledButton
            as={as}
            autoFocus={autoFocus}
            ariaExpanded={ariaExpanded}
            onClick={onClick}
            href={href}
            block={block}
            color={color ? color : ButtonColor.primary}
            disabled={disabled}
            inverse={inverse}
            ref={ref}
            shape={shape ? shape : ButtonShape.fill}
            size={size ? size : ButtonSize.medium}
            style={style}
            textTransform={
              textTransform ? textTransform : ButtonTextTransform.uppercase
            }
            to={to}
            variant={variant ? variant : ButtonVariant.solid}
          >
            {textPosition === ButtonTextPostition.left && (
              <SpanTextLeft size={size}>{children} </SpanTextLeft>
            )}
            <Icon size={getIconWithTextSize(size)} type={icon} />
            {textPosition !== ButtonTextPostition.left && (
              <SpanTextRight size={size}>{children}</SpanTextRight>
            )}
          </StyledButton>
        );
      }

      return (
        <StyledButton
          ariaExpanded={ariaExpanded}
          ariaLabel="hello2"
          as={as}
          autoFocus={autoFocus}
          onClick={onClick}
          color={color ? color : ButtonColor.primary}
          disabled={disabled}
          href={href}
          iconOnly
          inverse={inverse}
          ref={ref}
          shape={shape ? shape : ButtonShape.round}
          size={size ? size : ButtonSize.medium}
          style={style}
          to={to}
          variant={variant ? variant : ButtonVariant.solid}
        >
          <Icon size={getIconSize(size)} type={icon} />
        </StyledButton>
      );
    }}
  </ButtonCore>
);

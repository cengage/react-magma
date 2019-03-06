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
        ariaLabel,
        children,
        disabled,
        href,
        iconOnly,
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

      if (!iconOnly) {
        return (
          <StyledButton
            as={as}
            autoFocus={autoFocus}
            onClick={onClick}
            href={href}
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
      }

      return (
        <StyledButton
          ariaLabel={ariaLabel}
          as={as}
          autoFocus={autoFocus}
          onClick={onClick}
          color={color ? color : ButtonColor.primary}
          disabled={disabled}
          href={href}
          iconOnly
          inverse={inverse}
          shape={shape ? shape : ButtonShape.round}
          size={size ? size : ButtonSize.medium}
          style={style}
          to={to}
          variant={variant ? variant : ButtonVariant.solid}
        >
          {children}
        </StyledButton>
      );
    }}
  </ButtonCore>
);

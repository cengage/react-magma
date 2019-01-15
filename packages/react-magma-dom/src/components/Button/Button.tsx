import * as React from 'react';
import { ButtonCore } from 'react-magma-core';
import {
  StyledButton,
  ButtonProps,
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonTextTransform,
  ButtonVariant
} from './StyledButton';

export const Button: React.FunctionComponent<ButtonProps> = (
  props: ButtonProps
) => (
  <ButtonCore handleClick={props.handleClick}>
    {({ handleClick }) => {
      const {
        as,
        autoFocus,
        block,
        children,
        color,
        disabled,
        inverse,
        href,
        shape,
        size,
        style,
        textTransform,
        to,
        variant
      } = props;

      return (
        <StyledButton
          as={as}
          autoFocus={autoFocus}
          handleClick={handleClick}
          block={block}
          color={color ? color : ButtonColor.primary}
          disabled={disabled}
          href={href}
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

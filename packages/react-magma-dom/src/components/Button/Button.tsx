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
        autoFocus,
        block,
        children,
        disabled,
        inverse,
        color,
        shape,
        size,
        style,
        textTransform,
        variant
      } = props;

      return (
        <StyledButton
          autoFocus={autoFocus}
          handleClick={handleClick}
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
          variant={variant ? variant : ButtonVariant.solid}
        >
          {children}
        </StyledButton>
      );
    }}
  </ButtonCore>
);

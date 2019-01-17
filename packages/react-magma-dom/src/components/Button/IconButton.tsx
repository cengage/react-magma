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
} from './StyledButton';
import { Icon } from '../Icon/Icon';
import { styled } from '../../theme/styled-components';

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

const StyledIconButton = styled(StyledButton)`
  border-radius: ${props => {
    switch (props.shape) {
      case 'fill':
        return '5px';
      case 'leftCap':
        return '5px 0 0 5px';
      case 'rightCap':
        return '0 5px 5px 0';
      default:
        return '100%';
    }
  }};
  display: inline-flex;
  justify-content: center;
  line-height: 1;
  min-width: 0;
  padding: 0;

  height: ${props => {
    switch (props.size) {
      case 'large':
        return '44px';
      case 'small':
        return '28px';
      default:
        return '37px';
    }
  }};

  width: ${props => {
    switch (props.size) {
      case 'large':
        return '44px';
      case 'small':
        return '28px';
      default:
        return '37px';
    }
  }};
`;

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
  <ButtonCore handleClick={props.handleClick}>
    {({ handleClick }) => {
      const {
        autoFocus,
        ariaLabel,
        children,
        disabled,
        icon,
        iconOnly,
        inverse,
        block,
        color,
        shape,
        size,
        style,
        variant,
        textTransform,
        textPosition
      } = props;

      if (!iconOnly) {
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
        <StyledIconButton
          ariaLabel={ariaLabel}
          autoFocus={autoFocus}
          handleClick={handleClick}
          color={color ? color : ButtonColor.primary}
          disabled={disabled}
          inverse={inverse}
          shape={shape ? shape : ButtonShape.round}
          size={size ? size : ButtonSize.medium}
          style={style}
          variant={variant ? variant : ButtonVariant.solid}
        >
          <Icon size={getIconSize(size)} type={icon} />
        </StyledIconButton>
      );
    }}
  </ButtonCore>
);

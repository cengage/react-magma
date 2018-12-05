import * as React from 'react';
import { ButtonCore } from 'react-magma-core';
import { ButtonProps, ButtonSize, StyledButton } from './Button';
import { Icon } from '../Icon/Icon';
const styled = require('styled-components').default;

enum ButtonTextPostition {
  left = 'left',
  right = 'right'
}

export interface IconButtonProps extends ButtonProps {
  icon: string;
  textPosition?: ButtonTextPostition;
}

export interface SpanProps {
  size?: ButtonSize;
}

const StyledIconButton = styled(StyledButton)<IconButtonProps>`
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
): JSX.Element => (
  <ButtonCore handleClick={props.handleClick}>
    {({ handleClick }) => {
      const {
        autoFocus,
        children,
        disabled,
        icon,
        inverse,
        block,
        color,
        shape,
        size,
        variant,
        textTransform,
        textPosition
      } = props;

      if (textPosition) {
        return (
          <StyledButton
            autoFocus={autoFocus}
            onClick={handleClick}
            block={block}
            color={color ? color : 'primary'}
            disabled={disabled}
            inverse={inverse}
            shape={shape ? shape : 'fill'}
            size={size ? size : 'medium'}
            textTransform={textTransform ? textTransform : 'uppercase'}
            variant={variant ? variant : 'solid'}
          >
            {textPosition === ButtonTextPostition.left && (
              <SpanTextLeft size={size}>{children} </SpanTextLeft>
            )}
            <Icon size={getIconWithTextSize(size)} type={icon} />
            {textPosition === ButtonTextPostition.right && (
              <SpanTextRight size={size}>{children}</SpanTextRight>
            )}
          </StyledButton>
        );
      }

      return (
        <StyledIconButton
          aria-label={children}
          autoFocus={autoFocus}
          onClick={handleClick}
          color={color ? color : 'primary'}
          disabled={disabled}
          inverse={inverse}
          shape={shape ? shape : 'round'}
          size={size ? size : 'medium'}
          variant={variant ? variant : 'solid'}
        >
          <Icon size={getIconSize(size)} type={icon} />
        </StyledIconButton>
      );
    }}
  </ButtonCore>
);

export default IconButton;

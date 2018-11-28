import * as React from 'react';
import { ButtonCore } from 'react-magma-core';
import { ButtonProps, StyledButton } from './Button';
import { Icon } from '../Icon/Icon';
import styled from 'styled-components';

enum ButtonTextPostition {
  left = 'left',
  right = 'right'
}

export interface IconButtonProps extends ButtonProps {
  icon: string;
  label?: string;
  textPosition?: ButtonTextPostition;
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

const SpanTextLeft = styled.span`
  padding-right: 10px;
`;

const SpanTextRight = styled.span`
  padding-left: 10px;
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

export const IconButton: React.FunctionComponent<IconButtonProps> = (
  props: IconButtonProps
): JSX.Element => (
  <ButtonCore handleClick={props.handleClick}>
    {({ handleClick }) => {
      const {
        autoFocus,
        label,
        disabled,
        icon,
        inverse,
        color,
        shape,
        size,
        type,
        textTransform,
        textPosition
      } = props;

      if (textPosition) {
        return (
          <StyledButton
            autoFocus={autoFocus}
            onClick={handleClick}
            color={color ? color : 'primary'}
            disabled={disabled}
            inverse={inverse}
            shape={shape ? shape : 'fill'}
            size={size ? size : 'medium'}
            textTransform={textTransform ? textTransform : 'uppercase'}
            type={type ? type : 'solid'}
          >
            {textPosition === ButtonTextPostition.left && (
              <SpanTextLeft>{label} </SpanTextLeft>
            )}
            <Icon size={16} type={icon} />
            {textPosition === ButtonTextPostition.right && (
              <SpanTextRight>{label}</SpanTextRight>
            )}
          </StyledButton>
        );
      }

      return (
        <StyledIconButton
          aria-label={label}
          autoFocus={autoFocus}
          onClick={handleClick}
          color={color ? color : 'primary'}
          disabled={disabled}
          inverse={inverse}
          shape={shape ? shape : 'round'}
          size={size ? size : 'medium'}
          type={type ? type : 'solid'}
        >
          <Icon size={getIconSize(size ? size : 'medium')} type={icon} />
        </StyledIconButton>
      );
    }}
  </ButtonCore>
);

export default IconButton;

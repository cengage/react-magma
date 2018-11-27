import * as React from 'react';
import { ButtonCore } from 'react-magma-core';
import { Button, ButtonProps, ButtonSize, StyledButton } from './Button';
import { Icon } from '../Icon/Icon';
import styled from 'styled-components';
import { magma } from '../../theme/magma';

enum ButtonTextPostition {
  'left',
  'right'
}

export interface IconButtonProps extends ButtonProps {
  icon: string;
  label?: string;
  iconSize?: string;
  round?: boolean;
  textPosition?: ButtonTextPostition;
}

const StyledIconButton = styled(StyledButton)<IconButtonProps>`
  border-radius: ${props => (props.round === false ? '5px' : '100%')};
  display: inline-flex;
  justify-content: center;
  line-height: 1;
  min-width: 0;
  padding: 0;

  height: ${props => {
    switch (props.iconSize) {
      case 'large':
        return '44px';
      case 'small':
        return '28px';
      default:
        return '37px';
    }
  }};

  width: ${props => {
    switch (props.iconSize) {
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
  switch (size.toString()) {
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
        allCaps,
        color,
        shape,
        size,
        type,
        iconSize,
        round,
        textPosition
      } = props;

      if (textPosition) {
        const textPositionString = textPosition.toString();

        return (
          <StyledButton
            allCaps={allCaps}
            autoFocus={autoFocus}
            onClick={handleClick}
            color={color ? color : 'primary'}
            disabled={disabled}
            inverse={inverse}
            shape={shape ? shape : 'fill'}
            size={size ? size : 'medium'}
            type={type ? type : 'solid'}
          >
            {textPositionString === 'left' && (
              <SpanTextLeft>{label}</SpanTextLeft>
            )}
            <Icon size={16} type={icon} />
            {textPositionString === 'right' && (
              <SpanTextRight>{label}</SpanTextRight>
            )}
          </StyledButton>
        );
      }

      return (
        <StyledIconButton
          allCaps={allCaps}
          aria-label={label}
          autoFocus={autoFocus}
          handleClick={handleClick}
          color={color ? color : 'primary'}
          disabled={disabled}
          inverse={inverse}
          iconSize={size ? size : 'medium'}
          round={round}
          type={type ? type : 'solid'}
        >
          <Icon size={getIconSize(size ? size : 'medium')} type={icon} />
        </StyledIconButton>
      );
    }}
  </ButtonCore>
);

export default IconButton;

import * as React from 'react';
import { ButtonCore } from 'react-magma-core';
import { Button, ButtonProps, StyledButton } from './Button';
import { Icon } from '../Icon/Icon';
import styled from 'styled-components';
import { magma } from '../../theme/magma';

export interface IconButtonProps extends ButtonProps {
  icon?: string;
  label?: string;
  textPosition?: string;
}

const StyledIconButton = styled(StyledButton)`
  border-radius: 100%;
  display: inline-flex;
  height: 37px;
  justify-content: center;
  line-height: 1;
  min-width: 0;
  padding: 0;
  width: 37px;
`;

export const IconButton: React.FunctionComponent<IconButtonProps> = (
  props: IconButtonProps
): JSX.Element => (
  <ButtonCore handleClick={props.handleClick}>
    {({ handleClick }) => {
      const {
        autoFocus,
        text,
        disabled,
        inverse,
        allCaps,
        color,
        shape,
        type
      } = props;

      return (
        <StyledIconButton
          allCaps={allCaps}
          aria-label={text}
          autoFocus={autoFocus}
          handleClick={handleClick}
          color={color}
          disabled={disabled}
          inverse={inverse}
          type={type}
        >
          <Icon size={16} type="cross" />
        </StyledIconButton>
      );
    }}
  </ButtonCore>
);

export default IconButton;

import React from 'react';
import styled from '@emotion/styled';
import { Button } from '../Button';
import { ButtonColor, ButtonVariant } from '../StyledButton';

export interface SkipLinkProps {
  buttonText?: string;
  color?: ButtonColor;
  inverse?: boolean;
  positionLeft?: number;
  positionTop?: number;
  targetID: string;
  variant?: ButtonVariant;
}

const handleClick = (targetID, e) => {
  e.preventDefault();
  const targetAnchor = document.getElementById(targetID);

  if (!targetAnchor) {
    return;
  }

  const targetHeading = targetAnchor.getElementsByTagName('h1')[0];

  if (targetHeading) {
    targetHeading.setAttribute('tabIndex', '-1');
    targetHeading.focus();
    return;
  }
  targetAnchor.focus();
};

const ButtonContainer = styled.span<{
  positionLeft: number;
  positionTop: number;
}>`
  button {
    display: none;

    @media (min-width: 1024px) {
      display: inline-block;
      left: -9999px;
      position: fixed;
      top: -9999px;

      &:not(:disabled):focus {
        left: ${props => props.positionLeft}px;
        top: ${props => props.positionTop}px;
        z-index: 3;
      }
    }
  }
`;

export const SkipLink: React.FunctionComponent<SkipLinkProps> = ({
  buttonText,
  color,
  inverse,
  positionLeft,
  positionTop,
  targetID,
  variant
}: SkipLinkProps) => {
  return (
    <ButtonContainer
      positionLeft={positionLeft ? positionLeft : 10}
      positionTop={positionTop ? positionTop : 10}
    >
      <Button
        color={color ? color : ButtonColor.primary}
        inverse={inverse}
        onClick={e => {
          handleClick(targetID, e);
        }}
        variant={variant ? variant : ButtonVariant.solid}
      >
        {buttonText ? buttonText : 'Skip Navigation'}
      </Button>
    </ButtonContainer>
  );
};

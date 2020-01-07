import * as React from 'react';
import styled from '../../theme/styled';
import { ButtonColor, ButtonVariant } from '../Button';
import { HyperLink, HyperLinkProps } from '../HyperLink';

export const TARGET_ID = 'reactMagmaMainContent';

export interface SkipLinkProps extends HyperLinkProps {
  buttonText?: string;
  color?: ButtonColor;
  testId?: string;
  variant?: ButtonVariant;
}

const handleClick = e => {
  e.preventDefault();

  const targetAnchor = document.getElementById(TARGET_ID);

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

const StyledSkipLink = styled(HyperLink)<{
  positionLeft: number;
  positionTop: number;
}>`
    left: -9999px;
    position: fixed;
    top: -9999px;

    &:focus {
      left: ${props => props.positionLeft}px;
      top: ${props => props.positionTop}px;
      z-index: 3;
    }
  }
`;

export const SkipLink: React.FunctionComponent<SkipLinkProps> = ({
  buttonText,
  color,
  positionLeft,
  positionTop,
  testId,
  variant,
  ...other
}: SkipLinkProps) => {
  return (
    <StyledSkipLink
      {...other}
      color={color ? color : ButtonColor.primary}
      testId={testId}
      onClick={e => {
        handleClick(e);
      }}
      positionLeft={positionLeft ? positionLeft : 10}
      positionTop={positionTop ? positionTop : 10}
      styledAs="Button"
      to={`#${TARGET_ID}`}
      variant={variant ? variant : ButtonVariant.solid}
    >
      {buttonText ? buttonText : 'Skip Navigation'}
    </StyledSkipLink>
  );
};

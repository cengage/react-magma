import * as React from 'react';
import styled from '../../theme/styled';
import { ButtonColor, ButtonVariant } from '../Button';
import { Hyperlink, HyperlinkProps } from '../Hyperlink';
import { I18nContext } from '../../i18n';

export const TARGET_ID = 'reactMagmaMainContent';

export interface SkipLinkProps extends HyperlinkProps {
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

const StyledSkipLink = styled(Hyperlink)<{
  positionLeft: number;
  positionTop: number;
}>`
    left: -9999px;
    position: fixed;
    top: -9999px;

    &:focus {
      left: ${props => props.positionLeft}px;
      top: ${props => props.positionTop}px;
      z-index: 99999;
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
  const i18n = React.useContext(I18nContext);

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
      {buttonText ? buttonText : i18n.skipLink.buttonText}
    </StyledSkipLink>
  );
};

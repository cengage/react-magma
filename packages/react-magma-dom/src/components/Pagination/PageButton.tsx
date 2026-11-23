import * as React from 'react';

import styled from '@emotion/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import {
  Button,
  ButtonColor,
  ButtonProps,
  ButtonShape,
  ButtonVariant,
} from '../Button';

export interface PageButtonProps extends ButtonProps {
  isSelected?: boolean;
}

export function pageButtonTypeSize(props) {
  if (props.size === 'large') {
    return `${props.theme.typeScale.size03.fontSize}`;
  }

  return `${props.theme.typeScale.size02.fontSize}`;
}

export function pageButtonTypeLineHeight(props) {
  if (props.size === 'large') {
    return `${props.theme.typeScale.size03.lineHeight}`;
  }

  return `${props.theme.typeScale.size02.lineHeight}`;
}

export function pageButtonTypeLetterSpacing(props) {
  if (props.size === 'large') {
    return `${props.theme.typeScale.size03.letterSpacing}`;
  }

  return `${props.theme.typeScale.size02.letterSpacing}`;
}

function buttonSize(props) {
  switch (props.size) {
    case 'large':
      return `${props.theme.spaceScale.spacing11}`;
    default:
      return `${props.theme.spaceScale.spacing09}`;
  }
}

const StyledPageButton = styled(Button)`
  font-size: ${pageButtonTypeSize} !important;
  height: ${buttonSize};
  letter-spacing: ${pageButtonTypeLetterSpacing};
  line-height: ${pageButtonTypeLineHeight};
  margin: 0;
  min-width: 0;
  padding: 0;
  width: ${buttonSize};
  &:focus:before {
    content: '';
    height: calc(100% + 14px);
    left: -7px;
    position: absolute;
    top: -7px;
    width: calc(100% + 14px);
  }
  &:focus {
    z-index: 1;
  }
`;

export const PageButton = React.forwardRef<HTMLButtonElement, PageButtonProps>(
  (props, ref) => {
    const { children, isInverse, isSelected, ...other } = props;
    const theme = React.useContext(ThemeContext);

    return (
      <StyledPageButton
        ref={ref}
        {...other}
        color={isSelected ? ButtonColor.primary : ButtonColor.subtle}
        theme={theme}
        isInverse={isInverse}
        shape={ButtonShape.round}
        variant={isSelected ? ButtonVariant.solid : ButtonVariant.link}
      >
        {children}
      </StyledPageButton>
    );
  }
);

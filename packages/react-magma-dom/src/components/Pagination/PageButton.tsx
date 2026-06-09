import * as React from 'react';

import styled from '@emotion/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { Button, ButtonColor, ButtonProps, ButtonVariant } from '../Button';

export interface PageButtonProps extends ButtonProps {
  isSelected?: boolean;
}

export function pageButtonTypeSize(props) {
  if (props.size === 'large') {
    return `${props.theme.typeScale.size05.fontSize}`;
  }

  return `${props.theme.typeScale.size03.fontSize}`;
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
  border-radius: 0;
  font-size: ${pageButtonTypeSize} !important;
  height: ${buttonSize};
  margin: 0 0 0 -1px;
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
        color={isSelected ? ButtonColor.primary : ButtonColor.secondary}
        theme={theme}
        isInverse={isInverse}
        variant={ButtonVariant.solid}
      >
        {children}
      </StyledPageButton>
    );
  }
);

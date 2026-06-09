import * as React from 'react';

import styled from '@emotion/styled';
import { transparentize } from 'polished';

import { DropdownContext } from './Dropdown';
import { ThemeContext } from '../../theme/ThemeContext';

export interface DropdownHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @children required
   */
  children: React.ReactNode;
  /**
   * @internal
   */
  testId?: string;
}

const StyledDiv = styled.div<{ isInverse?: boolean }>`
  color: ${props =>
    props.isInverse
      ? transparentize(0.3, props.theme.colors.neutral100)
      : props.theme.colors.neutral500};
  font-size: ${props => props.theme.typeScale.size01.fontSize};
  font-weight: ${props =>
    props.theme.typographyVisualStyles.heading2XSmall.fontWeight};
  font-family: ${props => props.theme.bodyFont};
  letter-spacing: ${props => props.theme.typeScale.size01.letterSpacing};
  line-height: ${props => props.theme.typeScale.size01.lineHeight};
  margin: 0;
  padding: ${props =>
    `${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing05} ${props.theme.spaceScale.spacing02}`};
  text-transform: uppercase;
`;

export const DropdownHeader = React.forwardRef<
  HTMLDivElement,
  DropdownHeaderProps
>((props, ref) => {
  const { children, testId, ...other } = props;

  const theme = React.useContext(ThemeContext);
  const context = React.useContext(DropdownContext);

  return (
    <StyledDiv
      {...other}
      data-testid={testId}
      isInverse={context.isInverse}
      theme={theme}
    >
      {children}
    </StyledDiv>
  );
});

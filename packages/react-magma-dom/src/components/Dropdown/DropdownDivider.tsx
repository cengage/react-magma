import * as React from 'react';
import { DropdownContext } from './Dropdown';
import { ThemeContext } from '../../theme/ThemeContext';
import { transparentize } from 'polished';
import styled, { CreateStyled } from '@emotion/styled';
import { ThemeInterface } from '../../theme/magma';

export interface DropdownDividerProps
  extends React.HTMLAttributes<HTMLHRElement> {
  isInverse?: boolean;
  /**
   * @internal
   */
  testId?: string;
}

const typedStyled = styled as CreateStyled<ThemeInterface>;

const StyledHr = typedStyled.hr<{
  isInverse?: boolean;
}>`
  background: ${props =>
    props.isInverse
      ? transparentize(0.6, props.theme.colors.neutral100)
      : props.theme.colors.neutral300};
  border: 0;
  height: 1px;
  margin: ${props => props.theme.spaceScale.spacing02} 0;
`;

export const DropdownDivider: React.FunctionComponent<DropdownDividerProps> = (
  props: DropdownDividerProps
) => {
  const { testId, ...other } = props;

  const theme = React.useContext(ThemeContext);
  const context = React.useContext(DropdownContext);

  return (
    <StyledHr
      {...other}
      data-testid={testId}
      isInverse={context.isInverse}
      theme={theme}
    />
  );
};

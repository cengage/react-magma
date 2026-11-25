import * as React from 'react';

import styled from '@emotion/styled';

import { DropdownContext } from './Dropdown';
import { ThemeContext } from '../../theme/ThemeContext';

export interface DropdownDividerProps
  extends React.HTMLAttributes<HTMLHRElement> {
  isInverse?: boolean;
  /**
   * @internal
   */
  testId?: string;
}

const StyledHr = styled.hr<{
  isInverse?: boolean;
}>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.neutral800
      : props.theme.colors.neutral200};
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

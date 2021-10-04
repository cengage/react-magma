import * as React from 'react';
import styled from '@emotion/styled';

export interface DropdownDividerProps
  extends React.HTMLAttributes<HTMLHRElement> {
  testId?: string;
}

const StyledHr = styled.hr`
  background: var(--colors-neutral06);
  border: 0;
  height: 1px;
  margin: var(--spaceScale-spacing02) 0;
`;

export const DropdownDivider: React.FunctionComponent<DropdownDividerProps> = (
  props: DropdownDividerProps
) => {
  const { testId, ...other } = props;

  return <StyledHr {...other} data-testid={testId}/>;
};

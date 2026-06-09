import * as React from 'react';

import styled from '@emotion/styled';

import { HiddenStyles } from '../../utils/UtilityStyles';

export interface VisuallyHiddenProps
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

const VisuallyHiddenDiv = styled.div`
  ${HiddenStyles}
`;

export const VisuallyHidden: React.FunctionComponent<
  VisuallyHiddenProps
> = props => {
  const { children, testId, ...other } = props;

  return (
    <VisuallyHiddenDiv {...other} data-testid={testId}>
      {children}
    </VisuallyHiddenDiv>
  );
};

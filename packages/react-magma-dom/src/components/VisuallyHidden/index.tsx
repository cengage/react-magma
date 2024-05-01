import * as React from 'react';
import { HiddenStyles } from '../../utils/UtilityStyles';
import styled from '@emotion/styled';

/**
 * @children required
 */
export interface VisuallyHiddenProps
  extends React.HTMLAttributes<HTMLDivElement> {
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

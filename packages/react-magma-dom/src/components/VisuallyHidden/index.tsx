import * as React from 'react';
import styled from '../../theme/styled';
import { HiddenStyles } from '../../utils/UtilityStyles';

export interface VisuallyHiddenProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
}

const VisuallyHiddenDiv = styled.div`
  ${HiddenStyles}
`;

export const VisuallyHidden: React.FunctionComponent<VisuallyHiddenProps> = ({
  children,
  testId,
  ...other
}: VisuallyHiddenProps) => (
  <VisuallyHiddenDiv {...other} data-testid={testId}>
    {children}
  </VisuallyHiddenDiv>
);

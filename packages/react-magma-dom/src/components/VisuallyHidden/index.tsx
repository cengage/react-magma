import * as React from 'react';
import styled from '../../theme/styled';
import { HiddenStyles } from '../UtilityStyles';

export interface VisuallyHiddenProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const VisuallyHiddenDiv = styled.div`
  ${HiddenStyles}
`;

export const VisuallyHidden: React.FunctionComponent<VisuallyHiddenProps> = ({
  children,
  ...other
}: VisuallyHiddenProps) => (
  <VisuallyHiddenDiv {...other}>{children}</VisuallyHiddenDiv>
);

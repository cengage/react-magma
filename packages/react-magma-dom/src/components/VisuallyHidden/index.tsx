import * as React from 'react';
import styled from '@emotion/styled';
import { HiddenStyles } from '../UtilityStyles';

export interface VisuallyHiddenProps {
  children: React.ReactChild | React.ReactChild[];
}

const VisuallyHiddenDiv = styled.div`
  ${HiddenStyles}
`;

export const VisuallyHidden: React.FunctionComponent<VisuallyHiddenProps> = ({
  children
}: VisuallyHiddenProps) => <VisuallyHiddenDiv>{children}</VisuallyHiddenDiv>;

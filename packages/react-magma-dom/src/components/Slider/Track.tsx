import styled from '@emotion/styled';
import { ProgressBar } from '../ProgressBar';
import * as React from 'react';

export const Track = styled(ProgressBar)`
  position: absolute;
  width: ${props => (props.width ? props.width : '100%')};
`;

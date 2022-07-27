import styled from '@emotion/styled';
import { ProgressBar } from '../ProgressBar';

export const Track = styled(ProgressBar)`
  position: absolute;
  width: ${props => (props.width || '100%')};
`;

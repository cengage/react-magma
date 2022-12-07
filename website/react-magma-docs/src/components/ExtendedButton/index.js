import { Button } from 'react-magma-dom';
import styled from '@emotion/styled';

const StyledButton = styled(Button)`
  && {
    background: purple;

    &&:hover,
    &&:focus {
      background: green;
    }
  }
`;

export function ExtendedButton() {
  return <StyledButton>Demo button</StyledButton>;
}

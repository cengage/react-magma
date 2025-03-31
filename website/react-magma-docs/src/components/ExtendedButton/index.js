import React from 'react';

import styled from '@emotion/styled';
import { Button } from 'react-magma-dom';

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

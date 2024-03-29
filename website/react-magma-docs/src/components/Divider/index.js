import React from 'react';
import styled from '@emotion/styled';
import { magma, useIsInverse } from 'react-magma-dom';

const StyledHr = styled('hr')`
  background: ${props =>
    props.isInverse ? magma.colors.borderInverse : magma.colors.border};
  border: none;
  height: 1px;
  margin: ${magma.spaceScale.spacing12} 0 ${magma.spaceScale.spacing09};
  padding: 0;
`;

export const Divider = () => {
  const isInverse = useIsInverse();

  return <StyledHr isInverse={isInverse} />;
};

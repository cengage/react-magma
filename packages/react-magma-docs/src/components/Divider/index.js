import React from 'react';
import styled from '@emotion/styled';
import { magma } from 'react-magma-dom';

const HR = styled.hr`
  background: ${magma.colors.neutral06};
  border: none;
  height: 1px;
  margin: ${magma.spaceScale.spacing09}; 0;
  padding: 0;
`;

export const Divider = () => <HR />;

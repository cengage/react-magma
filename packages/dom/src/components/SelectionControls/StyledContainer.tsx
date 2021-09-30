import * as React from 'react';
import styled from '@emotion/styled';

export interface ContainerProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export const StyledContainer = styled.div<ContainerProps>`
  align-items: baseline;
  display: flex;
  flex-wrap: nowrap;
  position: relative;
`;

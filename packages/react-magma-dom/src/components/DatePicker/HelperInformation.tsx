import * as React from 'react';
import styled from '@emotion/styled';

const HelperInformationContainer = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: 2;
  text-align: left;
  overflow: auto;
  background: rgb(255, 255, 255);
  border-width: 1px;
  border-style: solid;
  border-color: rgb(219, 219, 219);
  border-image: initial;
  border-radius: 2px;
  padding: 22px;
  margin: 33px;
`;

export const HelperInformation: React.FunctionComponent<{}> = () => (
  <HelperInformationContainer>Sup</HelperInformationContainer>
);

import * as React from 'react';
import styled from '@emotion/styled';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { ThemeProvider } from 'emotion-theming';

import { magma } from '../../theme/magma';

export interface DemoProps {
  style?: React.CSSProperties;
  theme?: any;
}

const DemoComponent = styled.div<DemoProps>`
  border: 1px solid;
  border-color: ${props => props.theme.colors.primary};
  padding: 20px;
  margin: 20px auto;
`;

function renderDemo(props) {
  const { style, theme } = props;

  return (
    <ThemeProvider theme={theme ? theme : magma}>
      <DemoComponent style={style}>
        <Heading level={1}>Hello world</Heading>
        <p>Lorem ipsum dolar sit amet..</p>
        <Button>Button</Button>
      </DemoComponent>
    </ThemeProvider>
  );
}

export const Demo: React.FunctionComponent<DemoProps> = (props: DemoProps) =>
  renderDemo(props);

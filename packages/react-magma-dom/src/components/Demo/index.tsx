import React from 'react';
import styled from '@emotion/styled';
import { Button } from '../Button';
import { ButtonColor } from '../StyledButton';
import { Checkbox } from '../Checkbox';
import { Heading } from '../Heading';
import { Input } from '../Input';
import { Toggle } from '../Toggle';

import { withTheme, ThemeProvider } from 'emotion-theming';

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

// class Demo extends React.Component {
//   render() {
//     return (
//       <DemoComponent>
//         <Heading level={1}>Hello world</Heading>
//         <p>Lorem ipsum dolar sit amet..</p>
//         <Button>Button</Button>
//       </DemoComponent>
//     )
//   }
// }

// export default withTheme(Demo);

function renderDemo(props) {
  const { style, theme } = props;

  return (
    <DemoComponent style={style}>
      <Heading level={1}>Hello world!</Heading>
      <Heading level={2}>Hello again?</Heading>
      <p>Lorem ipsum dolar sit amet...</p>
      <Input id="demoInput" labelText="Input" />
      <Input id="demoInput2" labelText="Input 2" />
      <Checkbox id="demoCheck" labelText="Checkbox" />
      <Checkbox id="demoCheck2" labelText="Checkbox 2" />
      <Toggle id="demoToggle" labelText="Toggle" />
      <Toggle id="demoToggle2" labelText="Toggle 2" />
      <Button>Button</Button>
      <Button>Button 2</Button> <br />
      <Button color={ButtonColor.secondary}>Button</Button>
      <Button color={ButtonColor.secondary}>Button 2</Button>
      <br />
      <Button color={ButtonColor.success}>Button</Button>
      <Button color={ButtonColor.success}>Button 2</Button>
      <br />
      <Button color={ButtonColor.danger}>Button</Button>
      <Button color={ButtonColor.danger}>Button 2</Button>
      <br />
    </DemoComponent>
  );
}

export const Demo: React.FunctionComponent<DemoProps> = (props: DemoProps) =>
  renderDemo(props);

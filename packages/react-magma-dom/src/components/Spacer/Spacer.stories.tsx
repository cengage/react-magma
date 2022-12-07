import { Spacer, SpacerProps, SpacerAxis } from './';
import { Card, CardBody } from '../Card';
import { Button } from '../Button';
import { Story, Meta } from '@storybook/react/types-6-0';
import { magma } from '../../theme/magma';

const Template: Story<SpacerProps> = args => <Spacer {...args} />;

export default {
  title: 'Spacer',
  component: Spacer,
  argTypes: {
    axis: {
      control: {
        type: 'select',
        options: SpacerAxis,
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  size: magma.spaceScale.spacing07,
};

export const ExampleWithContent = Template.bind({});
ExampleWithContent.args = {
  ...Default.args,
};

ExampleWithContent.decorators = [
  Story => (
    <Card>
      <CardBody>
        <Button>Button 1</Button>
        <Story />
        <Button>Button 2</Button>
      </CardBody>
    </Card>
  ),
];

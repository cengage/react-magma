import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import { Button } from '../Button';
import { Card, CardBody } from '../Card';
import { LabelPosition } from '../Label';
import { Paragraph } from '../Paragraph';

import { TimePicker, TimePickerProps } from '.';

const Template: Story<TimePickerProps> = args => (
  <TimePicker {...args} labelText="Time Due" />
);

export default {
  component: TimePicker,
  title: 'TimePicker',
  argTypes: {
    errorMessage: {
      control: {
        type: 'text',
      },
    },
    helperMessage: {
      control: {
        type: 'text',
      },
    },
    labelPosition: {
      control: {
        type: 'select',
        options: LabelPosition,
      },
    },
    labelWidth: {
      control: {
        type: 'number',
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {};

export const Error = Template.bind({});
Error.args = {
  errorMessage: 'Please correct this error',
};

export const Inverse = Template.bind({});
Inverse.args = {
  isInverse: true,
};
Inverse.decorators = [
  Story => (
    <Card isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];

export const Events = () => {
  const [timeValue, setTimeValue] = React.useState<string | undefined>('');
  const [onChangeCalledTimes, setOnChangeCalledTimes] = React.useState(0);

  function handleOnChange(value) {
    setTimeValue(value);
    setOnChangeCalledTimes(onChangeCalledTimes + 1);
  }

  return (
    <>
      <Paragraph noMargins>
        <strong>Time Value:</strong> {timeValue}
      </Paragraph>
      <Paragraph>onChange called {onChangeCalledTimes} times</Paragraph>

      <TimePicker labelText="Time Due" onChange={handleOnChange} />
      <br />
      <Button onClick={() => setTimeValue(undefined)}>Clear Time</Button>
    </>
  );
};

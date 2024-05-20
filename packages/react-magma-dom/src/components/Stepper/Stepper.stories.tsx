import React from 'react';
import { Stepper, StepperProps, Step, StepStatus } from './';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'Stepper',
  component: Stepper,
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    active: {
      control: {
        type: 'number',
      },
    },
  },
} as Meta;

const Template: Story<StepperProps> = args => {
  return (
    <Stepper {...args}>
      <Step label="First Step" description="Summary One">
        Step One
      </Step>
      <Step label="Second Step" description="Summary Two">
        Step Two
      </Step>
      <Step
        label="Third Step"
        stepStatus={StepStatus.error}
        description="Summary Three"
      >
        Step Three
      </Step>
      <Step label="Fourth Step" description="Summary Four">
        Step Four
      </Step>
    </Stepper>
  );
};

export const Default = Template.bind({});
Default.args = {};

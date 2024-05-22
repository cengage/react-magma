import React from 'react';
import { Button } from '../Button';
import { Stepper, StepperProps, Step } from './';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Container } from '../Container';

export default {
  title: 'Stepper',
  component: Stepper,
  decorators: [
    (Story, context) => (
      <Container isInverse={context.args.isInverse} style={{ padding: '20px' }}>
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    customDescriptionLabel: {
      control: {
        type: 'text',
      },
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    isLabelVisuallyHidden: {
      control: {
        type: 'boolean',
      },
    },
    isDescriptionVisuallyHidden: {
      control: {
        type: 'boolean',
      },
    },
    summaryLabel: {
      control: {
        type: 'boolean',
      },
    },
    // currentStep: {
    //   control: {
    //     type: 'number',
    //   },
    // },
  },
} as Meta;

const Template: Story<StepperProps> = args => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const handleOnNext = () => {
    if (currentStep !== 4) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleOnPrevious = () => {
    if (currentStep !== 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <Stepper currentStep={currentStep} {...args}>
        <Step label="First Step" secondaryLabel="Summary One">
          Step Content One
        </Step>
        <Step label="Second Step" secondaryLabel="Summary Two">
          Step Content Two
        </Step>
        <Step label="Third Step" secondaryLabel="Summary Three">
          Step Content Three
        </Step>
        <Step label="Fourth Step" {...args} secondaryLabel="Summary Four">
          Step Content Four
        </Step>
      </Stepper>
      <Container style={{ padding: '20px 0' }}>
        <Button onClick={handleOnPrevious}>Previous</Button>
        <Button onClick={handleOnNext}>Next</Button>
      </Container>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithError = Template.bind({
  hasError: true,
});
Default.args = {};

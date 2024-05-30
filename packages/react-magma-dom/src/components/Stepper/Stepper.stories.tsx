import React from 'react';
import { Button } from '../Button';
import { Stepper, StepperProps, Step, BreakPointStyle } from './';
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
    breakpointType: {
      control: {
        type: 'select',
        options: BreakPointStyle,
      },
    },
    completedStepDescription: {
      control: {
        type: 'text',
      },
    },
    stepDescriptionLabel: {
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
    isSummaryView: {
      control: {
        type: 'boolean',
      },
    },
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
      <Stepper
        breakpoint={800}
        breakpointStyle={BreakPointStyle.summary}
        currentStep={currentStep}
        {...args}
      >
        <Step label="First Step" secondaryLabel="Description One">
          Step Content One
        </Step>
        <Step label="Second Step" secondaryLabel="Description Two">
          Step Content Two
        </Step>
        <Step label="Third Step" secondaryLabel="Description Three">
          Step Content Three
        </Step>
        <Step label="Fourth Step" secondaryLabel="Description Four">
          Step Content Four
        </Step>
      </Stepper>
      <Container style={{ padding: '20px 0' }}>
        <Button onClick={handleOnPrevious}>Previous</Button>
        <Button onClick={handleOnNext}>
          {currentStep >= 4 ? 'Finish' : 'Next'}
        </Button>
      </Container>
    </>
  );
};

const ErrorTemplate: Story<StepperProps> = args => {
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
      <Stepper currentStep={2} {...args}>
        <Step label="First Step" secondaryLabel="Description One">
          Step Content One
        </Step>
        <Step label="Second Step" secondaryLabel="Description Two">
          Step Content Two
        </Step>
        <Step label="Third Step" hasError secondaryLabel="Description Three">
          Step Content Three
        </Step>
        <Step label="Fourth Step" secondaryLabel="Description Four">
          Step Content Four
        </Step>
      </Stepper>
      <Container style={{ padding: '20px 0' }}>
        <Button disabled onClick={handleOnPrevious}>
          Previous
        </Button>
        <Button disabled onClick={handleOnNext}>
          {currentStep >= 4 ? 'Finish' : 'Next'}
        </Button>
      </Container>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  stepDescriptionLabel: null,
  isInverse: false,
  isLabelVisuallyHidden: false,
  isSummaryView: false,
};

export const WithError = ErrorTemplate.bind({});
Default.args = {};

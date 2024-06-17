import React from 'react';
import { Button } from '../Button';
import { Stepper, StepperProps, Step, StepperLayout } from './';
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
    breakpoint: {
      control: {
        type: 'number',
      },
    },
    breakpointLayout: {
      control: {
        type: 'select',
        options: StepperLayout,
      },
    },
    layout: {
      control: {
        type: 'select',
        options: StepperLayout,
      },
    },
    completionLabel: {
      control: {
        type: 'text',
      },
    },
    customStepLabel: {
      control: {
        type: 'text',
      },
    },
    isInverse: {
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
  const handleFinish = () => {
    if (currentStep === 4) {
      setCurrentStep(0);
    }
  };

  return (
    <>
      <Stepper currentStep={currentStep} {...args}>
        <Step label="First Step" secondaryLabel="Description One" />
        <Step label="Second Step" secondaryLabel="Description Two" />
        <Step label="Third Step" secondaryLabel="Description Three" />
        <Step label="Fourth Step" secondaryLabel="Description Four" />
      </Stepper>

      <Container
        style={{
          background: args.isInverse ? '#1A1E51' : '#F5F5F5',
          borderRadius: '6px',
          margin: '20px 0 0',
          padding: '20px',
        }}
      >
        {currentStep === 0 && <div>Step Content One</div>}
        {currentStep === 1 && <div>Step Content Two</div>}
        {currentStep === 2 && <div>Step Content Three</div>}
        {currentStep === 3 && <div>Step Content Four</div>}
        {currentStep === 4 && <div>Steps Completed</div>}
      </Container>

      <Container style={{ padding: '20px 0' }}>
        <Button style={{ marginRight: '4px' }} onClick={handleOnPrevious}>
          Previous
        </Button>
        <Button onClick={currentStep >= 4 ? handleFinish : handleOnNext}>
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
      <Container
        style={{
          background: args.isInverse ? '#1A1E51' : '#F5F5F5',
          borderRadius: '6px',
          margin: '20px 0 0',
          padding: '20px',
        }}
      >
        <div>Step Content Three</div>
      </Container>

      <Container style={{ padding: '20px 0' }}>
        <Button
          disabled
          style={{ marginRight: '4px' }}
          onClick={handleOnPrevious}
        >
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
Default.args = {};

export const WithError = ErrorTemplate.bind({});
Default.args = {};

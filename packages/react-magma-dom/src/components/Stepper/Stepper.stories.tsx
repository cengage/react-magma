import React from 'react';
import { Button } from '../Button';
import { Stepper, StepperProps, Step, StepperLayout } from './';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Container } from '../Container';
import { ButtonGroup } from '../ButtonGroup';
import { InputType } from '../InputBase';
import { Input } from '../Input';
import { Flex, FlexAlignItems, FlexBehavior, FlexJustify } from '../Flex';
import { LabelPosition } from '../Label';

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
    stepLabel: {
      control: {
        type: 'text',
      },
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    testId: {
      control: {
        type: 'text',
      },
    },
    ariaLabel: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

const Template: Story<StepperProps> = args => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const [numberOfSteps, setNumberOfSteps] = React.useState(4);

  const handleOnNext = () => {
    if (currentStep <= numberOfSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleOnPrevious = () => {
    if (currentStep !== 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleFinish = () => {
    if (currentStep === numberOfSteps) {
      setCurrentStep(0);
    }
  };

  const handleOnChange = event => {
    if (numberOfSteps > 0) {
      return setNumberOfSteps(Number(event.target.value));
    } else {
      return setNumberOfSteps(1);
    }
  };

  const step = [...Array(numberOfSteps)].map((_, i) => {
    ++i;
    return (
      <Step
        key={i}
        testId={`Step ${i}`}
        label={`Step ${i}`}
        secondaryLabel={`Description area in secondaryLabel component ${i}`}
      />
    );
  });

  return (
    <>
      <Stepper currentStep={currentStep} {...args}>
        {step}
      </Stepper>

      <Container
        style={{
          background: args.isInverse ? '#1A1E51' : '#F5F5F5',
          borderRadius: '6px',
          margin: '20px 0 0',
          padding: '20px',
        }}
      >
        <div>
          {currentStep < numberOfSteps
            ? `Step Content ${currentStep + 1}`
            : `Steps Completed`}
        </div>
      </Container>

      <Flex
        behavior={FlexBehavior.container}
        alignItems={FlexAlignItems.center}
        justify={FlexJustify.spaceBetween}
        style={{ paddingTop: '20px' }}
      >
        <Flex behavior={FlexBehavior.item}>
          <Input
            labelPosition={LabelPosition.left}
            labelText="Step Amount"
            value={numberOfSteps}
            min={2}
            max={20}
            onChange={handleOnChange}
            type={InputType.number}
          />
        </Flex>
        <Flex behavior={FlexBehavior.item}>
          <ButtonGroup>
            <Button onClick={handleOnPrevious} disabled={currentStep === 0}>
              Previous
            </Button>
            <Button
              onClick={
                currentStep < numberOfSteps ? handleOnNext : handleFinish
              }
            >
              {currentStep < numberOfSteps ? 'Next' : 'Finish'}
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </>
  );
};

const ErrorTemplate: Story<StepperProps> = args => {
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
        <ButtonGroup>
          <Button disabled>Previous</Button>
          <Button disabled>Next</Button>
        </ButtonGroup>
      </Container>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  ariaLabel: 'progress',
};

export const WithError = ErrorTemplate.bind({});
WithError.args = {};

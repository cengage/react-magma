import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Container } from '../Container';
import { Flex, FlexBehavior, FlexJustify } from '../Flex';
import { Input } from '../Input';
import { InputType } from '../InputBase';
import { LabelPosition } from '../Label';
import { ResponsiveStepperContainer } from './ResponsiveStepperContainer';
import { Dropdown, DropdownButton, DropdownContent } from '../Dropdown';

import {
  Stepper,
  StepperProps,
  Step,
  StepperLayout,
  StepperOrientation,
} from './';

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
      control: 'number',
    },
    breakpointLayout: {
      control: {
        type: 'select',
        options: StepperLayout,
        defaultValue: StepperLayout.hideLabels,
      },
    },
    breakpointOrientation: {
      control: {
        type: 'select',
        options: StepperOrientation,
        defaultValue: StepperOrientation.horizontal,
      },
    },
    layout: {
      control: {
        type: 'select',
        options: StepperLayout,
        defaultValue: StepperLayout.showLabels,
      },
    },
    completionLabel: {
      control: 'text',
    },
    stepLabel: {
      control: 'text',
    },
    isInverse: {
      control: 'boolean',
      defaultValue: false,
    },
    orientation: {
      control: {
        type: 'select',
        options: StepperOrientation,
        defaultValue: StepperOrientation.horizontal,
      },
    },
    testId: {
      control: 'text',
    },
    ariaLabel: {
      control: 'text',
      defaultValue: 'progress',
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
        testId={`Item ${i}`}
        label={`Item ${i}`}
        secondaryLabel={`Description area in secondaryLabel component ${i}`}
      />
    );
  });

  return (
    <ResponsiveStepperContainer
      currentStep={currentStep}
      steps={step}
      {...args}
    >
      <Container
        style={{
          background: args.isInverse ? '#1A1E51' : '#F5F5F5',
          borderRadius: '6px',
          padding: '20px',
          width: '100%',
          flex: 10,
        }}
      >
        <div>
          {currentStep < numberOfSteps
            ? `Item Content ${currentStep + 1}`
            : `Items Completed`}
        </div>
      </Container>

      <Flex
        behavior={FlexBehavior.both}
        justify={FlexJustify.spaceBetween}
        style={{ paddingTop: '20px', flex: 1 }}
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
    </ResponsiveStepperContainer>
  );
};

const InsideDropdownTemplate: Story<StepperProps> = args => {
  return (
    <Dropdown>
      <DropdownButton>Stepper</DropdownButton>
      <DropdownContent
        style={{
          maxHeight: 'fit-content',
          padding: '1em',
        }}
      >
        <ResponsiveStepperContainer
          currentStep={2}
          {...args}
          steps={[
            <Step key={0} label="First Item" secondaryLabel="Description One">
              Item Content One
            </Step>,
            <Step key={1} label="Second Item" secondaryLabel="Description Two">
              Item Content Two
            </Step>,
            <Step key={2} label="Third Item" secondaryLabel="Description Three">
              Item Content Three
            </Step>,
            <Step key={3} label="Fourth Item" secondaryLabel="Description Four">
              Item Content Four
            </Step>,
            <Step key={4} label="Fifth Item" secondaryLabel="Description Five">
              Item Content Five
            </Step>,
          ]}
        />
      </DropdownContent>
    </Dropdown>
  );
};

const RealisticLabels: Story<StepperProps> = args => {
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
    if (currentStep >= 4) {
      setCurrentStep(0);
    }
  };

  return (
    <ResponsiveStepperContainer
      currentStep={currentStep}
      {...args}
      steps={[
        <Step
          key={0}
          label="Fenway seating"
          secondaryLabel="Select an area in the ball park"
          testId="fenway0"
        />,
        <Step
          key={1}
          label="Guest information"
          secondaryLabel="Please fill out the registration form for your party"
          testId="fenway1"
        />,
        <Step
          key={2}
          label="Yankees fans?"
          secondaryLabel="An additional surcharge may be applicable"
          testId="fenway2"
        />,
        <Step
          key={3}
          label="MBTA and parking information"
          secondaryLabel="Suggested methods of transportation"
          testId="fenway3"
        />,
      ]}
    >
      <Container
        style={{
          background: args.isInverse ? '#1A1E51' : '#F5F5F5',
          borderRadius: '6px',
          padding: '20px',
          width: '100%',
          flex: 10,
        }}
      >
        {currentStep === 0 && <div>Fenway seating Content</div>}
        {currentStep === 1 && <div>Guest information Content</div>}
        {currentStep === 2 && <div>Yankees fans? Content</div>}
        {currentStep === 3 && <div>MBTA and parking information Content</div>}
        {currentStep === 4 && <div>Steps completed</div>}
      </Container>

      <Flex
        behavior={FlexBehavior.item}
        style={{ padding: '20px 0', alignSelf: 'flex-end' }}
      >
        <ButtonGroup>
          <Button disabled={currentStep === 0} onClick={handleOnPrevious}>
            Previous
          </Button>
          <Button onClick={currentStep >= 4 ? handleFinish : handleOnNext}>
            {currentStep >= 4 ? 'Finish' : 'Next'}
          </Button>
        </ButtonGroup>
      </Flex>
    </ResponsiveStepperContainer>
  );
};

const ErrorTemplate: Story<StepperProps> = args => {
  return (
    <ResponsiveStepperContainer
      currentStep={2}
      {...args}
      steps={[
        <Step key={0} label="First Item" secondaryLabel="Description One">
          Item Content One
        </Step>,
        <Step key={1} label="Second Item" secondaryLabel="Description Two">
          Item Content Two
        </Step>,
        <Step
          key={2}
          label="Third Item"
          hasError
          secondaryLabel="Description Three"
        >
          Item Content Three
        </Step>,
        <Step key={3} label="Fourth Item" secondaryLabel="Description Four">
          Item Content Four
        </Step>,
      ]}
    >
      <Container
        style={{
          background: args.isInverse ? '#1A1E51' : '#F5F5F5',
          borderRadius: '6px',
          padding: '20px',
          width: '100%',
          flex: 10,
        }}
      >
        <div>Item Content Three</div>
      </Container>

      <Flex
        behavior={FlexBehavior.item}
        style={{ padding: '20px 0', alignSelf: 'flex-end' }}
      >
        <ButtonGroup>
          <Button disabled>Previous</Button>
          <Button disabled>Next</Button>
        </ButtonGroup>
      </Flex>
    </ResponsiveStepperContainer>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Vertical = Template.bind({});
Vertical.args = {
  ...Default.args,
  orientation: StepperOrientation.vertical,
};

export const InsideDropdown = InsideDropdownTemplate.bind({});
InsideDropdown.args = {
  ...Default.args,
  orientation: StepperOrientation.vertical,
};

export const RealWorldExample = RealisticLabels.bind({});
RealWorldExample.args = {
  stepLabel: 'Module',
};

export const WithError = ErrorTemplate.bind({});
WithError.args = {};

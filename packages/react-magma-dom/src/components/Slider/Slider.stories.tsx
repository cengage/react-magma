import React from 'react';
import { ProgressBarDirection } from '../ProgressBar';
import { Slider, SliderProps, SliderType } from './Slider';
import { Card, CardBody } from '../Card';

export default {
  component: Slider,
  title: 'Slider',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    allowCross: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    hasTooltip: {
      control: {
        type: 'boolean',
      },
    },
    min: {
      control: {
        type: 'number',
      },
    },
    max: {
      control: {
        type: 'number',
      },
    },
    steps: {
      control: {
        type: 'number',
      },
    },
  },
};

export const Default = (args: SliderProps) => {
  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <Slider {...args} />
      </CardBody>
    </Card>
  );
};
Default.args = {
  isInverse: false,
  count: 1,
  defaultValue: 0,
  max: 500,
  min: -500,
  width: 150,
  hasTooltip: true,
};

export const Marks = (args: SliderProps) => {
  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <Slider
          {...args}
          count={1}
          defaultValue={0}
          max={4}
          min={0}
          marks={[
            {
              percentage: 0,
              label: '0',
              dimensions: {
                height: 0,
                width: 0,
                x: 0,
                y: 0,
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                toJSON: () => {},
              },
            },
            {
              percentage: 25,
              label: '25%',
              dimensions: {
                height: 0,
                width: 0,
                x: 0,
                y: 0,
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                toJSON: () => {},
              },
            },
            {
              percentage: 50,
              label: '50%',
              dimensions: {
                height: 0,
                width: 0,
                x: 0,
                y: 0,
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                toJSON: () => {},
              },
            },
            {
              percentage: 75,
              label: '75%',
              dimensions: {
                height: 0,
                width: 0,
                x: 0,
                y: 0,
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                toJSON: () => {},
              },
            },
            {
              percentage: 100,
              label: '100%',
              dimensions: {
                height: 0,
                width: 0,
                x: 0,
                y: 0,
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                toJSON: () => {},
              },
            },
          ]}
        />
      </CardBody>
    </Card>
  );
};

export const MarksVertical = (args: SliderProps) => {
  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <Slider
          {...args}
          count={1}
          defaultValue={0}
          direction={ProgressBarDirection.vertical}
          height={400}
          max={4}
          min={0}
          marks={[
            { percentage: 0, label: '0' },
            { percentage: 25, label: '25%' },
            { percentage: 50, label: '50%' },
            { percentage: 75, label: '75%' },
            { percentage: 100, label: '100%' },
          ]}
        />
      </CardBody>
    </Card>
  );
};

export const Disabled = (args: SliderProps) => {
  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <Slider
          {...args}
          count={1}
          defaultValue={0}
          disabled
          max={500}
          min={-500}
          // steps={250}
        />
      </CardBody>
    </Card>
  );
};

export const Range = (args: SliderProps) => {
  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <Slider
          {...args}
          count={2}
          defaultValue={[-250, 250]}
          max={500}
          min={-500}
          steps={250}
        />
      </CardBody>
    </Card>
  );
};

export const Multiple = (args: SliderProps) => {
  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <Slider
          {...args}
          count={5}
          defaultValue={[-500, -250, 0, 250, 500]}
          max={500}
          min={-500}
          steps={50}
        />
      </CardBody>
    </Card>
  );
};

export const StepArray = (args: SliderProps) => {
  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <Slider
          {...args}
          count={1}
          defaultValue={0}
          max={500}
          min={-500}
          steps={[-500, -400, -300, 0, 100, 200, 300, 500]}
        />
      </CardBody>
    </Card>
  );
};

export const Two = (args: SliderProps) => {
  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <Slider
          hasTooltip
          type={SliderType.range}
          min={0}
          max={500}
          width={500}
          {...args}
        />
      </CardBody>
    </Card>
  );
};

export const Three = (args: SliderProps) => {
  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <Slider hasTooltip min={-2} max={2} width={500} steps={1} {...args}>
          {/* <Marker percentage={0}>-2</Marker>
        <Marker percentage={25}>-1</Marker>
        <Marker percentage={50}>0</Marker>
        <Marker percentage={75}>1</Marker>
        <Marker percentage={100}>2</Marker> */}
        </Slider>
      </CardBody>
    </Card>
  );
};

export const Vertical = (args: SliderProps) => {
  return (
    <Card isInverse={args.isInverse}>
      <CardBody>
        <Slider
          {...args}
          height={200}
          max={10}
          min={0}
          direction={ProgressBarDirection.vertical}
        />
      </CardBody>
    </Card>
  );
};

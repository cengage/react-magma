import React from 'react';
import { Card, CardBody } from '../Card';
import { ProgressBar, ProgressBarProps } from '.';
import { Story, Meta } from '@storybook/react/types-6-0';
import { magma } from '../../theme/magma';
import { Button } from '../Button';

const Template: Story<ProgressBarProps> = args => <ProgressBar {...args} />;

export default {
  title: 'ProgressBar',
  component: ProgressBar,
  argTypes: {
    color: {
      control: {
        type: 'text',
      },
    },
    height: {
      control: {
        type: 'text',
      },
    },
    isAnimated: {
      control: {
        type: 'boolean',
      },
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    isLabelVisible: {
      control: {
        type: 'boolean',
      },
    },
    percentage: {
      control: {
        type: 'number',
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  percentage: 25,
  isInverse: false,
};

export const Inverse = Template.bind({});
Inverse.args = {
  ...Default.args,
  isInverse: true,
};

export const CustomColor = args => {
  const [colorIndex, setColorIndex] = React.useState(0);
  const [color, setColor] = React.useState(null);
  const [inverseColor, setInverseColor] = React.useState(null);

  React.useEffect(() => {
    setColor(magma.chartColors[colorIndex]);
    setInverseColor(magma.chartColorsInverse[colorIndex]);
  }, [colorIndex]);

  function changeBarColor() {
    if (colorIndex < 11) {
      setColorIndex(colorIndex + 1);
    } else if (colorIndex === 11) {
      setColorIndex(0);
    }
  }

  return (
    <>
      <Card>
        <CardBody>
          <ProgressBar {...args} color={color} />
        </CardBody>
      </Card>
      <br />
      <Card isInverse>
        <CardBody>
          <ProgressBar {...args} color={inverseColor} isInverse />
        </CardBody>
      </Card>
      <br />
      <Button onClick={changeBarColor}>Next Color</Button>
      <br />
      <br />
      <Card>
        <CardBody>
          <ProgressBar {...args} />
        </CardBody>
      </Card>
    </>
  );
};
CustomColor.args = {
  percentage: 50,
  isInverse: false,
  height: '20',
  color: '#711E6E',
};

CustomColor.parameters = { controls: { exclude: ['isInverse'] } };

Inverse.decorators = [
  Story => (
    <Card isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];

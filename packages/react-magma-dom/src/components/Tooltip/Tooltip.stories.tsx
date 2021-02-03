import React from 'react';
import {
  Tooltip,
  TooltipProps,
  TooltipPosition,
  EnumTooltipPosition,
} from './index';
import { Button, ButtonSize } from '../Button';
import { magma } from '../../theme/magma';
import { Story, Meta } from '@storybook/react/types-6-0';

const Template: Story<TooltipProps> = args => (
  <div
    style={{
      padding: '80px',
      textAlign: 'center',
      background: args.isInverse
        ? magma.colors.neutral
        : magma.colors.neutral08,
    }}
  >
    <Tooltip {...args}>
      <Button isInverse={args.isInverse} size={ButtonSize.small}>
        Tooltip Trigger
      </Button>
    </Tooltip>
  </div>
);

export default {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {},
} as Meta;

export const Default = Template.bind({});
Default.args = {
  content: 'Lorem ipsum dolar sit amet. Vel molestie no, ut vim.',
};

export const Bottom = Template.bind({});
Bottom.args = {
  position: TooltipPosition.bottom,
  content: 'Lorem ipsum dolar',
};

export const Left = Template.bind({});
Left.args = {
  position: EnumTooltipPosition.left,
  content: 'Lorem ipsum dolar sit amet. Vel molestie no, ut vim.',
};

export const Right = Template.bind({});
Right.args = {
  position: TooltipPosition.right,
  content: 'Lorem ipsum dolar',
};

export const Inverse = Template.bind({});
Inverse.args = {
  content: 'Lorem ipsum dolar',
  isInverse: true,
};

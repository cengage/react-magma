import React from 'react';
import { Tooltip, TooltipProps, EnumTooltipPosition } from '../index';
import { Button, ButtonSize } from '../../Button';
import { Story, Meta } from '@storybook/react/types-6-0';

const Template: Story<TooltipProps> = args => (
  <div style={{ padding: '150px', textAlign: 'center' }}>
    <Tooltip {...args}>
      <Button size={ButtonSize.small}>Tooltip Trigger</Button>
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
  position: EnumTooltipPosition.bottom,
  content: 'Lorem ipsum dolar sit amet. Vel molestie no, ut vim.',
};

export const Left = Template.bind({});
Left.args = {
  position: EnumTooltipPosition.left,
  content: 'Lorem ipsum dolar sit amet. Vel molestie no, ut vim.',
};

export const Right = Template.bind({});
Right.args = {
  position: EnumTooltipPosition.right,
  content: 'Lorem ipsum dolar sit amet. Vel molestie no, ut vim.',
};

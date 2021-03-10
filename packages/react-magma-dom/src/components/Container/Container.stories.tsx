import React from 'react';
import { Container, ContainerProps } from './';
import { Story } from '@storybook/react/types-6-0';

export default {
  component: Container,
  title: 'Container',
};

const Template: Story<ContainerProps> = args => (
  <Container {...args}>{args.children}</Container>
);

export const Default = Template.bind({});
Default.args = {
  children: <p>Container content goes here</p>,
  isInverse: false,
};

export const Inverse = Template.bind({});
Inverse.args = {
  ...Default.args,
  isInverse: true,
};

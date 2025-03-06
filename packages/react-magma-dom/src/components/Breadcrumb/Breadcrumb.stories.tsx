import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import { magma } from '../../theme/magma';
import { Card, CardBody } from '../Card';

import { Breadcrumb, BreadcrumbItem, BreadcrumbProps } from '.';

const Template: Story<BreadcrumbProps> = args => (
  <Breadcrumb {...args}>
    <BreadcrumbItem to="#">Home</BreadcrumbItem>
    <BreadcrumbItem to="#">Library</BreadcrumbItem>
    <BreadcrumbItem>Data</BreadcrumbItem>
  </Breadcrumb>
);

export default {
  title: 'Breadcrumb',
  component: Breadcrumb,
} as Meta;

export const Default = Template.bind({});
Default.args = {
  isInverse: false,
};

export const Inverse = Template.bind({});
Inverse.args = {
  ...Default.args,
  isInverse: true,
};
Inverse.decorators = [
  Story => (
    <Card background={magma.colors.primary600} isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];

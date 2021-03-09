import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbProps } from '.';
import { Story, Meta } from '@storybook/react/types-6-0';

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

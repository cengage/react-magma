import React from 'react';
import { Card } from '../Card';
import { CardBody } from '../Card/CardBody';
import { Pagination, PageButtonSize } from '.';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PaginationProps } from './Pagination';

const Template: Story<PaginationProps> = args => <Pagination {...args} />;

export default {
  title: 'Pagination',
  component: Pagination,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: PageButtonSize,
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  count: 10,
  isInverse: false,
};

export const DefaultSelected = Template.bind({});
DefaultSelected.args = {
  ...Default.args,
  defaultPage: 2,
};

export const AdjacentPages = Template.bind({});
AdjacentPages.args = {
  ...Default.args,
  count: 11,
  defaultPage: 6,
  numberOfAdjacentPages: 2,
};

export const EdgePages = Template.bind({});
EdgePages.args = {
  ...Default.args,
  count: 11,
  defaultPage: 6,
  numberOfEdgePages: 2,
};

export const Size = Template.bind({});
Size.args = {
  ...Default.args,
  size: PageButtonSize.large,
};

export const Inverse = Template.bind({});
Inverse.args = {
  ...Default.args,
  isInverse: true,
};

Inverse.decorators = [
  Story => (
    <Card isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];

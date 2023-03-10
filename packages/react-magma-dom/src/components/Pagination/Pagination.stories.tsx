import React from 'react';
import { Container } from '../Container';
import { Pagination, PageButtonSize } from '.';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PaginationProps } from './Pagination';

const Template: Story<PaginationProps> = args => <Pagination {...args} />;

export default {
  title: 'Pagination',
  component: Pagination,
  decorators: [
    (Story, context) => (
      <Container isInverse={context.args.isInverse} style={{ padding: '20px' }}>
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    size: {
      control: {
        type: 'select',
        options: PageButtonSize,
      },
    },
    hidePreviousButton: {
      control: {
        type: 'boolean',
      },
    },
    hideNextButton: {
      control: {
        type: 'boolean',
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

export const SimplePagination = Template.bind({});
SimplePagination.args = {
  ...Default.args,
  simple: true,
  defaultPage: 4,
};

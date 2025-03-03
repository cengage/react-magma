import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import { Container } from '../Container';
import { PaginationProps, PaginationType } from './Pagination';

import { Pagination, PageButtonSize } from '.';

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
    type: {
      control: {
        type: 'select',
        options: PaginationType,
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
    showFirstButton: {
      control: {
        type: 'boolean',
      },
    },
    showLastButton: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  count: 10,
  hidePreviousButton: false,
  hideNextButton: false,
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
  type: PaginationType.simple,
  count: 4,
  defaultPage: 2,
};

export const SimplePaginationOnPageChange = () => {
  const [page, setPage] = React.useState(1);
  function handleChange(_, pageNumber) {
    setPage(pageNumber);
  }
  return (
    <>
      <p>onPageChange result: {page}</p>
      <Pagination
        onPageChange={handleChange}
        page={page}
        count={4}
        type={PaginationType.simple}
      />
    </>
  );
};

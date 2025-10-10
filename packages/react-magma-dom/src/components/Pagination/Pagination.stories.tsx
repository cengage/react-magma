import React from 'react';

import { StoryFn, Meta } from '@storybook/react';

import { Container } from '../Container';
import { PaginationProps, PaginationType } from './Pagination';

import { Pagination, PageButtonSize } from '.';

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
    page: {
      control: {
        type: 'number',
      },
    },
    defaultPage: {
      control: {
        type: 'number',
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

export const Default = {
  args: {
    count: 10,
    hidePreviousButton: false,
    hideNextButton: false,
    isInverse: false,
    disabled: false,
  },
};

export const DefaultSelected = {
  args: {
    ...Default.args,
    defaultPage: 2,
  },
};

export const AdjacentPages = {
  args: {
    ...Default.args,
    count: 11,
    defaultPage: 6,
    numberOfAdjacentPages: 2,
  },
};

export const EdgePages = {
  args: {
    ...Default.args,
    count: 11,
    defaultPage: 6,
    numberOfEdgePages: 2,
  },
};

export const Size = {
  args: {
    ...Default.args,
    size: PageButtonSize.large,
  },
};

export const SimplePagination = {
  args: {
    ...Default.args,
    type: PaginationType.simple,
    count: 4,
  },

  parameters: {
    controls: { exclude: ['showFirstButton', 'showLastButton', 'size'] },
  },
};

export const SimplePaginationOnPageChange = {
  render: (args: Partial<PaginationProps>) => {
    const [page, setPage] = React.useState<number>(Number(args.page));

    function handleChange(_, pageNumber: number) {
      setPage(pageNumber);
    }

    return (
      <>
        <p>onPageChange result: {page}</p>
        <Pagination
          {...args}
          onPageChange={handleChange}
          page={page}
          count={args.count}
        />
      </>
    );
  },

  args: {
    ...Default.args,
    type: PaginationType.simple,
    page: 3,
    count: 4,
  },

  parameters: {
    controls: { exclude: ['showFirstButton', 'showLastButton', 'size'] },
  },
};

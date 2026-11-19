import React from 'react';

import { Meta } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/preview-api';

import { Container } from '../Container';
import { PaginationProps, PaginationType } from './Pagination';

import { Pagination, PageButtonSize } from '.';

function PaginationStory(args: PaginationProps) {
  const [, updateArgs] = useArgs();

  function handlePageChange(event: React.SyntheticEvent, page: number) {
    updateArgs({ page });
    args.onPageChange?.(event, page);
  }

  return <Pagination {...args} onPageChange={handlePageChange} />;
}

export default {
  title: 'Pagination',
  component: Pagination,
  render: PaginationStory,
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
    enablePageJump: {
      control: {
        type: 'boolean',
      },
    },
    type: {
      control: { type: 'select' },
      options: Object.values(PaginationType),
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
      control: { type: 'select' },
      options: Object.values(PageButtonSize),
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
    enablePageJump: false,
  },
};

export const DefaultSelected = {
  args: {
    ...Default.args,
    defaultPage: 2,
  },
};

export const LargePageCount = {
  args: {
    ...Default.args,
    count: 1000,
    defaultPage: 500,
    enablePageJump: false,
  },
};

export const PageJump = {
  args: {
    ...Default.args,
    count: 20,
    defaultPage: 10,
    enablePageJump: true,
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
    controls: {
      exclude: ['enablePageJump', 'showFirstButton', 'showLastButton', 'size'],
    },
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
    controls: {
      exclude: ['enablePageJump', 'showFirstButton', 'showLastButton', 'size'],
    },
  },
};

import React from 'react';

import { StoryFn, Meta } from '@storybook/react';
import {
  SearchIcon,
  FolderOpenIcon,
  ErrorIcon,
  AddIcon,
  NotificationsIcon,
} from 'react-magma-icons';

import { magma } from '../../theme/magma';
import { Card, CardBody } from '../Card';
import { Search } from '../Search';
import { Tag } from '../Tag';

import { EmptyState, EmptyStateProps } from '.';

const Template: StoryFn<EmptyStateProps> = args => {
  // Automatically show dark background when isInverse is toggled
  if (args.isInverse) {
    return (
      <Card background={magma.colors.primary600} isInverse>
        <CardBody>
          <EmptyState {...args} />
        </CardBody>
      </Card>
    );
  }

  return <EmptyState {...args} />;
};

export default {
  title: 'EmptyState',
  component: EmptyState,
  argTypes: {
    illustration: {
      control: { type: 'select' },
      options: [
        'SearchIcon',
        'FolderOpenIcon',
        'ErrorIcon',
        'AddIcon',
        'NotificationsIcon',
        'None',
      ],
      mapping: {
        SearchIcon: <SearchIcon />,
        FolderOpenIcon: <FolderOpenIcon />,
        ErrorIcon: <ErrorIcon />,
        AddIcon: <AddIcon />,
        NotificationsIcon: <NotificationsIcon />,
        None: undefined,
      },
    },
    isDanger: {
      control: { type: 'boolean' },
    },
    isInverse: {
      control: { type: 'boolean' },
    },
    isLoading: {
      control: { type: 'boolean' },
    },
  },
} as Meta;

export const Default = {
  render: Template,

  args: {
    illustration: <SearchIcon />,
    title: 'No results found',
    body: 'Try adjusting your search or filter criteria to find what you are looking for.',
    primaryAction: {
      label: 'Search Again',
      onClick: () => console.log('Primary action clicked'),
    },
    secondaryAction: {
      label: 'Clear Filters',
      onClick: () => console.log('Secondary action clicked'),
    },
    tertiaryAction: {
      label: 'Browse All Courses',
      onClick: () => console.log('Tertiary action clicked'),
    },
  },
};

export const DangerMode = {
  render: Template,

  args: {
    illustration: <ErrorIcon />,
    title: 'Something went wrong',
    body: 'We encountered an error while processing your request. Please try again.',
    isDanger: true,
    primaryAction: {
      label: 'Try Again',
      onClick: () => console.log('Retry clicked'),
    },
    secondaryAction: {
      label: 'Contact Support',
      onClick: () => console.log('Contact clicked'),
    },
  },
};

export const WithoutIllustration = {
  render: Template,

  args: {
    title: 'No items yet',
    body: 'Start by creating your first item.',
    primaryAction: {
      label: 'Create Item',
      onClick: () => console.log('Create clicked'),
    },
  },
};

export const WithoutButtons = {
  render: Template,

  args: {
    illustration: <FolderOpenIcon />,
    title: 'This folder is empty',
    body: 'Upload files or create subfolders to get started.',
  },
};

export const TitleOnly = {
  render: Template,

  args: {
    illustration: <NotificationsIcon />,
    title: 'No notifications',
  },
};

export const PrimaryActionOnly = {
  render: Template,

  args: {
    illustration: <AddIcon />,
    title: 'Get started',
    body: 'Create your first project to begin.',
    primaryAction: {
      label: 'Create Project',
      onClick: () => console.log('Create clicked'),
    },
  },
};

export const SecondaryActionOnly = {
  render: Template,

  args: {
    illustration: <SearchIcon />,
    title: 'No matches',
    body: 'We could not find any matching results.',
    secondaryAction: {
      label: 'View All Items',
      onClick: () => console.log('View all clicked'),
    },
  },
};

export const TertiaryActionOnly = {
  render: Template,

  args: {
    illustration: <SearchIcon />,
    title: 'No courses found',
    body: 'Your search did not match any available courses.',
    tertiaryAction: {
      label: 'Browse All Courses',
      onClick: () => console.log('Browse clicked'),
    },
  },
};

export const AllThreeButtons = {
  render: Template,

  args: {
    illustration: <SearchIcon />,
    title: 'No results found',
    body: 'We could not find anything matching your search. Try different keywords or browse our catalog.',
    primaryAction: {
      label: 'Search Again',
      onClick: () => console.log('Search clicked'),
    },
    secondaryAction: {
      label: 'Clear Filters',
      onClick: () => console.log('Clear clicked'),
    },
    tertiaryAction: {
      label: 'Browse All Courses',
      onClick: () => console.log('Browse clicked'),
    },
  },
};

export const WithContentSlot = {
  render: () => (
    <EmptyState
      illustration={<SearchIcon />}
      title="No results found"
      body="Try a different search term or browse by category."
    >
      <Search
        isClearable
        onSearch={value => console.log('Search:', value)}
        placeholder="Search courses..."
      />
    </EmptyState>
  ),
};

export const Inverse = {
  render: Template,

  args: {
    ...Default.args,
    isInverse: true,
  },
};

export const InverseDanger = {
  render: Template,

  args: {
    ...DangerMode.args,
    isInverse: true,
  },
};

export const Minimal = {
  render: Template,

  args: {
    title: 'Nothing here',
  },
};

export const CustomChildren = {
  render: () => (
    <EmptyState
      illustration={<SearchIcon />}
      title="No courses found"
      body="Try browsing by category instead."
      tertiaryAction={{
        label: 'Browse All Courses',
        onClick: () => console.log('Browse clicked'),
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
        }}
      >
        <Tag onClick={() => console.log('Biology')}>Biology</Tag>
        <Tag onClick={() => console.log('Chemistry')}>Chemistry</Tag>
        <Tag onClick={() => console.log('Physics')}>Physics</Tag>
        <Tag onClick={() => console.log('Mathematics')}>Mathematics</Tag>
        <Tag onClick={() => console.log('Computer Science')}>
          Computer Science
        </Tag>
      </div>
    </EmptyState>
  ),
};

export const Loading = {
  render: Template,

  args: {
    isLoading: true,
  },
};

export const LoadingDanger = {
  render: Template,

  args: {
    isLoading: true,
    isDanger: true,
  },
};

export const LoadingInverse = {
  render: Template,

  args: {
    isLoading: true,
    isInverse: true,
  },
};

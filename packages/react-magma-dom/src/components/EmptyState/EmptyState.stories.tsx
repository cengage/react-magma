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

import { EmptyState, EmptyStateProps, EmptyStateIllustrationSize } from '.';

const Template: StoryFn<EmptyStateProps> = args => <EmptyState {...args} />;

export default {
  title: 'EmptyState',
  component: EmptyState,
  argTypes: {
    illustrationSize: {
      control: { type: 'select' },
      options: Object.values(EmptyStateIllustrationSize),
    },
    vertical: {
      control: { type: 'boolean' },
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
      label: 'Clear Filters',
      onClick: () => console.log('Primary action clicked'),
    },
    secondaryAction: {
      label: 'Learn More',
      onClick: () => console.log('Secondary action clicked'),
    },
  },
};

export const Horizontal = {
  render: Template,

  args: {
    ...Default.args,
    vertical: false,
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

export const DangerHorizontal = {
  render: Template,

  args: {
    ...DangerMode.args,
    vertical: false,
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

export const IllustrationSizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {Object.values(EmptyStateIllustrationSize).map(size => (
        <EmptyState
          key={size}
          illustration={<SearchIcon />}
          illustrationSize={size}
          title={`Size: ${size}`}
          body={`Illustration size set to "${size}"`}
        />
      ))}
    </div>
  ),
};

export const Inverse = {
  render: Template,

  args: {
    ...Default.args,
    isInverse: true,
  },

  decorators: [
    Story => (
      <Card background={magma.colors.primary600} isInverse>
        <CardBody>
          <Story />
        </CardBody>
      </Card>
    ),
  ],
};

export const InverseDanger = {
  render: Template,

  args: {
    ...DangerMode.args,
    isInverse: true,
  },

  decorators: [
    Story => (
      <Card background={magma.colors.primary600} isInverse>
        <CardBody>
          <Story />
        </CardBody>
      </Card>
    ),
  ],
};

export const InverseHorizontal = {
  render: Template,

  args: {
    ...Default.args,
    isInverse: true,
    vertical: false,
  },

  decorators: [
    Story => (
      <Card background={magma.colors.primary600} isInverse>
        <CardBody>
          <Story />
        </CardBody>
      </Card>
    ),
  ],
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
      title="Custom content below"
      body="You can add any custom content as children."
    >
      <div
        style={{
          marginTop: '16px',
          padding: '16px',
          background: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <p style={{ margin: 0 }}>This is custom content passed as children.</p>
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

  decorators: [
    Story => (
      <Card background={magma.colors.primary600} isInverse>
        <CardBody>
          <Story />
        </CardBody>
      </Card>
    ),
  ],
};

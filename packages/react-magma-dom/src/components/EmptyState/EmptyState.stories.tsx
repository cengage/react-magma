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
import { Button, ButtonColor, ButtonVariant } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
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
    icon: {
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
    icon: <SearchIcon />,
    title: 'No results found',
    description:
      'Try adjusting your search or filter criteria to find what you are looking for.',
    actions: (
      <ButtonGroup>
        <Button color={ButtonColor.primary}>Search Again</Button>
        <Button color={ButtonColor.secondary}>Clear Filters</Button>
        <Button color={ButtonColor.primary} variant={ButtonVariant.link}>
          Browse All Courses
        </Button>
      </ButtonGroup>
    ),
  },
};

export const DangerMode = {
  render: Template,

  args: {
    icon: <ErrorIcon />,
    title: 'Something went wrong',
    description:
      'We encountered an error while processing your request. Please try again.',
    isDanger: true,
    actions: (
      <ButtonGroup>
        <Button color={ButtonColor.primary}>Try Again</Button>
        <Button color={ButtonColor.secondary}>Contact Support</Button>
      </ButtonGroup>
    ),
  },
};

export const WithoutIcon = {
  render: Template,

  args: {
    title: 'No items yet',
    description: 'Start by creating your first item.',
    actions: <Button color={ButtonColor.primary}>Create Item</Button>,
  },
};

export const WithoutActions = {
  render: Template,

  args: {
    icon: <FolderOpenIcon />,
    title: 'This folder is empty',
    description: 'Upload files or create subfolders to get started.',
  },
};

export const TitleOnly = {
  render: Template,

  args: {
    icon: <NotificationsIcon />,
    title: 'No notifications',
  },
};

export const PrimaryActionOnly = {
  render: Template,

  args: {
    icon: <AddIcon />,
    title: 'Get started',
    description: 'Create your first project to begin.',
    actions: <Button color={ButtonColor.primary}>Create Project</Button>,
  },
};

export const SecondaryActionOnly = {
  render: Template,

  args: {
    icon: <SearchIcon />,
    title: 'No matches',
    description: 'We could not find any matching results.',
    actions: <Button color={ButtonColor.secondary}>View All Items</Button>,
  },
};

export const TertiaryActionOnly = {
  render: Template,

  args: {
    icon: <SearchIcon />,
    title: 'No courses found',
    description: 'Your search did not match any available courses.',
    actions: (
      <Button color={ButtonColor.primary} variant={ButtonVariant.link}>
        Browse All Courses
      </Button>
    ),
  },
};

export const AllThreeButtons = {
  render: Template,

  args: {
    icon: <SearchIcon />,
    title: 'No results found',
    description:
      'We could not find anything matching your search. Try different keywords or browse our catalog.',
    actions: (
      <ButtonGroup>
        <Button color={ButtonColor.primary}>Search Again</Button>
        <Button color={ButtonColor.secondary}>Clear Filters</Button>
        <Button color={ButtonColor.primary} variant={ButtonVariant.link}>
          Browse All Courses
        </Button>
      </ButtonGroup>
    ),
  },
};

export const WithAdditionalContent = {
  render: () => (
    <EmptyState
      icon={<SearchIcon />}
      title="No results found"
      description="Try a different search term or browse by category."
      additionalContent={<Search isClearable placeholder="Search courses..." />}
    />
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
      icon={<SearchIcon />}
      title="No courses found"
      description="Try browsing by category instead."
      actions={
        <Button color={ButtonColor.primary} variant={ButtonVariant.link}>
          Browse All Courses
        </Button>
      }
      additionalContent={
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center',
          }}
        >
          <Tag>Biology</Tag>
          <Tag>Chemistry</Tag>
          <Tag>Physics</Tag>
          <Tag>Mathematics</Tag>
          <Tag>Computer Science</Tag>
        </div>
      }
    />
  ),
};

export const CustomGraphic = {
  render: () => (
    <EmptyState
      customGraphic={
        <svg
          viewBox="0 0 200 150"
          width="200"
          height="150"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="200" height="150" rx="0" fill="#E0E0E0" />
          <text
            x="100"
            y="80"
            textAnchor="middle"
            fill="#616161"
            fontSize="16"
            fontFamily="sans-serif"
          >
            Graphic
          </text>
        </svg>
      }
      title="No courses found"
      description="Try browsing by category instead."
      actions={<Button color={ButtonColor.primary}>Browse Courses</Button>}
    />
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

import React from 'react';

import { Meta, StoryFn } from '@storybook/react-webpack5';
import {
  AccountCircleIcon,
  AppsIcon,
  AssignmentIcon,
  AutoFixHighIcon,
  BarChartIcon,
  BookmarksIcon,
  CategoryIcon,
  FaceIcon,
  FormatListBulletedIcon,
  GradeIcon,
  HelpOutlineIcon,
  HomeIcon,
  InsertDriveFileIcon,
  LogoutIcon,
  ManageAccountsIcon,
  MenuBookIcon,
  PeopleIcon,
  ReportIcon,
  SearchIcon,
  SchoolIcon,
  SettingsIcon,
} from 'react-magma-icons';

import { magma } from '../../theme/magma';
import { BadgeColor } from '../Badge';
import {
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonTextTransform,
  ButtonVariant,
} from '../Button';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownDropDirection,
  DropdownMenuItem,
} from '../Dropdown';
import { ToggleButton } from '../ToggleButton';
import { ToggleButtonGroup } from '../ToggleButtonGroup';

import {
  LeftPanelNavigation,
  LeftPanelNavigationFooterRenderProps,
  LeftPanelNavigationIconColor,
  LeftPanelNavigationItem,
  LeftPanelNavigationProps,
} from '.';

const cengageLogo = require('./Cengage.svg');
const cengageLogoSrc =
  typeof cengageLogo === 'string' ? cengageLogo : cengageLogo.default;
const exploreLogo = require('./ExploreIcon.svg');
const exploreLogoSrc =
  typeof exploreLogo === 'string' ? exploreLogo : exploreLogo.default;
const mindTapLogo = require('./MindTap.svg');
const mindTapLogoSrc =
  typeof mindTapLogo === 'string' ? mindTapLogo : mindTapLogo.default;

const topLevelIconColors: LeftPanelNavigationIconColor[] = [
  'primary500',
  'info500',
  'success500',
  'warning500',
  'danger500',
];

const mindTapItems: LeftPanelNavigationItem[] = [
  {
    id: 'dashboard',
    icon: <HomeIcon />,
    label: 'Dashboard',
    to: '#dashboard',
  },
  {
    id: 'learning-path',
    icon: <AssignmentIcon />,
    label: 'Learning Path',
    to: '#learning-path',
  },
  {
    id: 'course-settings',
    icon: <SettingsIcon />,
    label: 'Course Settings',
    to: '#course-settings',
  },
  {
    id: 'gradebook',
    icon: <BarChartIcon />,
    label: 'Gradebook',
    to: '#gradebook',
  },
  {
    dividerBefore: true,
    id: 'more-tools',
    icon: <AppsIcon />,
    label: 'More Tools',
    to: '#more-tools',
  },
  {
    id: 'support',
    icon: <HelpOutlineIcon />,
    label: 'Support',
    to: '#support',
  },
];

const exploreItems: LeftPanelNavigationItem[] = [
  {
    id: 'explore-home',
    label: 'Home',
    to: '#explore-home',
  },
  {
    id: 'explore-course-content',
    label: 'Course Content',
    items: [
      {
        id: 'explore-search',
        icon: <SearchIcon />,
        label: 'Search',
        to: '#explore-search',
      },
      {
        id: 'explore-content',
        icon: <FormatListBulletedIcon />,
        label: 'Content',
        to: '#explore-content',
      },
      {
        id: 'explore-content-studio',
        icon: <AutoFixHighIcon />,
        label: 'Content Studio',
        to: '#explore-content-studio',
      },
      {
        id: 'explore-notes-bookmarks',
        icon: <BookmarksIcon />,
        label: 'Notes & Bookmarks',
        to: '#explore-notes-bookmarks',
      },
      {
        id: 'explore-launch-ebook',
        icon: <MenuBookIcon />,
        label: 'Launch eBook',
        to: '#explore-launch-ebook',
      },
    ],
  },
  {
    id: 'explore-class',
    label: 'Class',
    items: [
      {
        id: 'explore-assignments',
        icon: <AssignmentIcon />,
        label: 'Assignments',
        to: '#explore-assignments',
      },
      {
        id: 'explore-gradebook',
        icon: <GradeIcon />,
        label: 'Gradebook',
        to: '#explore-gradebook',
      },
      {
        id: 'explore-reports',
        icon: <ReportIcon />,
        label: 'Reports',
        to: '#explore-reports',
      },
      {
        id: 'explore-students',
        icon: <PeopleIcon />,
        label: 'Students',
        to: '#explore-students',
      },
    ],
  },
];

function getLink(
  number: number,
  hasIcon: boolean = false
): LeftPanelNavigationItem {
  return {
    id: `link-${number}`,
    label: `Link ${number}`,
    to: `#link-${number}`,
    ...(hasIcon && { icon: <InsertDriveFileIcon /> }),
  };
}

function getNavigationItems({
  hasAddons = false,
  hasTopLevelIcons = false,
  hasSecondLevelIcons = false,
  hasTopLevelIconColors = false,
}: {
  hasAddons?: boolean;
  hasTopLevelIcons?: boolean;
  hasTopLevelIconColors?: boolean;
  hasSecondLevelIcons?: boolean;
} = {}): LeftPanelNavigationItem[] {
  const getCategoryIcon = (index: number) =>
    hasTopLevelIcons
      ? {
          icon: <CategoryIcon />,
          ...(hasTopLevelIconColors && {
            iconColor: topLevelIconColors[index],
          }),
        }
      : {};
  const getLinkIcon = (index: number) =>
    hasTopLevelIcons
      ? {
          icon: <InsertDriveFileIcon />,
          ...(hasTopLevelIconColors && {
            iconColor: topLevelIconColors[index],
          }),
        }
      : {};

  return [
    {
      id: 'category-1',
      label: 'Category title',
      tooltipContent: 'This is a really long tooltip for a navigation item.',
      ...(hasAddons && {
        badge: {
          color: BadgeColor.info,
          label: 'New!',
        },
      }),
      ...getCategoryIcon(0),
      groups: [
        {
          id: 'group-1',
          label: 'Group title',
          items: [
            getLink(1, hasSecondLevelIcons),
            getLink(2, hasSecondLevelIcons),
            getLink(3, hasSecondLevelIcons),
          ],
        },
        {
          id: 'group-2',
          label: 'Group title',
          items: [
            getLink(4, hasSecondLevelIcons),
            getLink(5, hasSecondLevelIcons),
            getLink(6, hasSecondLevelIcons),
          ],
        },
        {
          id: 'group-3',
          label: 'Group title',
          items: [
            getLink(7, hasSecondLevelIcons),
            getLink(8, hasSecondLevelIcons),
            getLink(9, hasSecondLevelIcons),
          ],
        },
      ],
    },
    {
      id: 'category-2',
      label: 'Category title',
      ...getCategoryIcon(1),
      items: [
        getLink(10, hasSecondLevelIcons),
        getLink(11, hasSecondLevelIcons),
        getLink(12, hasSecondLevelIcons),
      ],
    },
    {
      id: 'category-3',
      label: 'Category title',
      ...getCategoryIcon(2),
      items: [
        getLink(13, hasSecondLevelIcons),
        getLink(14, hasSecondLevelIcons),
        getLink(15, hasSecondLevelIcons),
      ],
    },
    {
      id: 'link-16',
      label: 'Link',
      to: '#link-16',
      ...getLinkIcon(3),
    },
    {
      id: 'link-17',
      label: 'Link',
      to: '#link-17',
      ...getLinkIcon(4),
    },
  ];
}

function NavigationExample(args: LeftPanelNavigationProps) {
  const [activeItemId, setActiveItemId] = React.useState(args.activeItemId);
  const canvasStyle: React.CSSProperties = {
    background: args.isInverse ? magma.colors.primary700 : undefined,
    minHeight: '100vh',
    width: '100%',
  };

  React.useEffect(() => {
    setActiveItemId(args.activeItemId);
  }, [args.activeItemId]);

  return (
    <div style={canvasStyle}>
      <LeftPanelNavigation
        {...args}
        activeItemId={activeItemId}
        onItemClick={(event, item) => {
          event.preventDefault();
          setActiveItemId(item.id);
          args.onItemClick?.(event, item);
        }}
      />
    </div>
  );
}

const Template: StoryFn<LeftPanelNavigationProps> = args => (
  <NavigationExample {...args} />
);

const LogoTemplate: StoryFn<LeftPanelNavigationProps> = args => (
  <NavigationExample
    {...args}
    logo={renderCengageLogo(Boolean(args.isInverse))}
  />
);

function renderCengageLogo(isInverse = false) {
  return (
    <span
      aria-label="Cengage"
      role="img"
      style={{
        aspectRatio: '500 / 112',
        backgroundColor: isInverse
          ? magma.colors.neutral100
          : magma.colors.primary500,
        display: 'block',
        mask: `url(${cengageLogoSrc}) center / contain no-repeat`,
        WebkitMask: `url(${cengageLogoSrc}) center / contain no-repeat`,
        width: '100%',
      }}
    />
  );
}

function renderMindTapLogo() {
  return (
    <img
      alt="Cengage MindTap"
      src={mindTapLogoSrc}
      style={{
        display: 'block',
        width: '100%',
      }}
    />
  );
}

function renderExploreLogo() {
  return (
    <img
      alt="Explore"
      src={exploreLogoSrc}
      style={{
        display: 'block',
        height: magma.spaceScale.spacing08,
        width: magma.spaceScale.spacing08,
      }}
    />
  );
}

function renderExploreCourseInfo({
  isCollapsed,
}: LeftPanelNavigationFooterRenderProps) {
  if (isCollapsed) {
    return null;
  }

  return (
    <div
      style={{
        padding: `${magma.spaceScale.spacing03} ${magma.spaceScale.spacing05} ${magma.spaceScale.spacing05}`,
      }}
    >
      <div
        style={{
          color: magma.colors.neutral100,
          fontSize: magma.typeScale.size03.fontSize,
          fontWeight: 700,
          lineHeight: magma.typeScale.size03.lineHeight,
        }}
      >
        Biology
      </div>
      <div
        style={{
          color: magma.colors.neutral300,
          fontSize: magma.typeScale.size02.fontSize,
          lineHeight: magma.typeScale.size02.lineHeight,
        }}
      >
        Section 205-3
      </div>
    </div>
  );
}

function renderAccountFooter({
  isCollapsed,
  isInverse,
}: LeftPanelNavigationFooterRenderProps) {
  const dropdownProps = {
    dropDirection: DropdownDropDirection.up,
    isInverse,
    style: { width: '100%' },
    width: 224,
  };

  return (
    <Dropdown {...dropdownProps}>
      {isCollapsed ? (
        <DropdownButton
          aria-label="Open account menu"
          color={ButtonColor.subtle}
          icon={<AccountCircleIcon />}
          shape={ButtonShape.fill}
          variant={ButtonVariant.link}
        />
      ) : (
        <DropdownButton
          color={ButtonColor.subtle}
          isFullWidth
          leadingIcon={<AccountCircleIcon />}
          shape={ButtonShape.fill}
          textTransform={ButtonTextTransform.none}
          variant={ButtonVariant.link}
        >
          Taylor Morgan
        </DropdownButton>
      )}
      <DropdownContent>
        <DropdownMenuItem icon={<ManageAccountsIcon />}>
          Account settings
        </DropdownMenuItem>
        <DropdownMenuItem icon={<HelpOutlineIcon />}>Help</DropdownMenuItem>
        <DropdownMenuItem icon={<LogoutIcon />}>Log out</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
  );
}

function renderExploreFooter({
  isCollapsed,
  isInverse,
}: LeftPanelNavigationFooterRenderProps) {
  if (isCollapsed) {
    return null;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <ToggleButtonGroup
        enforced
        exclusive
        isInverse={isInverse}
        noSpace
        size={ButtonSize.small}
        value="teacher"
      >
        <ToggleButton
          icon={<SchoolIcon />}
          textTransform={ButtonTextTransform.none}
          value="teacher"
        >
          Teacher
        </ToggleButton>
        <ToggleButton
          icon={<FaceIcon />}
          textTransform={ButtonTextTransform.none}
          value="student"
        >
          Student
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default {
  component: LeftPanelNavigation,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Left Panel Navigation',
  argTypes: {
    allowMultipleExpanded: {
      control: {
        type: 'boolean',
      },
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    hasRightBorder: {
      control: {
        type: 'boolean',
      },
    },
    height: {
      control: {
        type: 'text',
      },
    },
    defaultIsCollapsed: {
      control: {
        type: 'boolean',
      },
    },
    footer: {
      control: false,
    },
    iconColor: {
      control: { type: 'select' },
      options: [
        'neutral400',
        'neutral500',
        'neutral600',
        'neutral700',
        'primary500',
        'info500',
        'success500',
        'warning500',
        'danger500',
      ],
    },
    isCollapsed: {
      control: false,
    },
    isCollapsible: {
      control: {
        type: 'boolean',
      },
    },
    logo: {
      control: false,
    },
    logoWidth: {
      control: {
        type: 'text',
      },
    },
    topContent: {
      control: false,
    },
    width: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

const defaultStoryArgs: LeftPanelNavigationProps = {
  allowMultipleExpanded: true,
  defaultExpandedIds: [],
  iconColor: 'neutral700',
  items: getNavigationItems(),
  width: 280,
};

export const Default = {
  render: Template,

  args: {
    ...defaultStoryArgs,
  },
};

export const StickyFooter = {
  render: Template,

  args: {
    ...defaultStoryArgs,
    footer: renderAccountFooter,
    hasRightBorder: true,
    height: 420,
  },
};

export const TopLevelIcons = {
  render: Template,

  args: {
    ...defaultStoryArgs,
    items: getNavigationItems({ hasTopLevelIcons: true }),
  },
};

export const Collapsible = {
  render: Template,

  args: {
    ...defaultStoryArgs,
    isCollapsible: true,
    items: getNavigationItems({ hasTopLevelIcons: true }),
  },
};

export const CollapsibleWithLogo = {
  render: LogoTemplate,
  args: {
    ...Collapsible.args,
    logoWidth: 120,
    hasRightBorder: true,
  },
};

export const TopLevelIconsWithColors = {
  render: Template,

  args: {
    ...defaultStoryArgs,
    items: getNavigationItems({
      hasTopLevelIconColors: true,
      hasTopLevelIcons: true,
    }),
  },
};

export const Addons = {
  render: Template,

  args: {
    ...defaultStoryArgs,
    items: getNavigationItems({ hasAddons: true }),
  },
};

export const WithLogo = {
  render: LogoTemplate,

  args: {
    ...defaultStoryArgs,
    logoWidth: 120,
  },
};

export const WithRightBorder = {
  render: Template,

  args: {
    ...defaultStoryArgs,
    hasRightBorder: true,
  },
};

export const TopAndSecondLevelIcons = {
  render: Template,

  args: {
    ...defaultStoryArgs,
    items: getNavigationItems({
      hasSecondLevelIcons: true,
      hasTopLevelIcons: true,
    }),
  },
};

export const Inverse = {
  render: Template,

  args: {
    ...defaultStoryArgs,
    isInverse: true,
  },
};

export const MindTap = {
  render: Template,
  name: 'MindTap',

  args: {
    ...defaultStoryArgs,
    activeItemId: 'learning-path',
    hasRightBorder: true,
    iconColor: 'neutral700',
    isCollapsible: true,
    items: mindTapItems,
    logo: renderMindTapLogo(),
    logoWidth: 168,
    width: 252,
  },
};

export const Explore = {
  render: Template,

  args: {
    ...defaultStoryArgs,
    activeItemId: 'explore-home',
    defaultExpandedIds: ['explore-course-content', 'explore-class'],
    footer: renderExploreFooter,
    hasRightBorder: true,
    height: '100vh',
    iconColor: 'neutral100',
    isCollapsible: true,
    isInverse: true,
    items: exploreItems,
    logo: renderExploreLogo(),
    logoWidth: magma.spaceScale.spacing08,
    topContent: renderExploreCourseInfo,
    width: 250,
  },
};

export const Controlled = {
  render: args => {
    const [activeItemId, setActiveItemId] = React.useState(args.activeItemId);
    const [expandedIds, setExpandedIds] = React.useState<string[]>([]);

    React.useEffect(() => {
      setActiveItemId(args.activeItemId);
    }, [args.activeItemId]);

    return (
      <LeftPanelNavigation
        {...args}
        activeItemId={activeItemId}
        expandedIds={expandedIds}
        onItemClick={(event, item) => {
          event.preventDefault();
          setActiveItemId(item.id);
          args.onItemClick?.(event, item);
        }}
        onExpandedChange={setExpandedIds}
      />
    );
  },

  args: {
    ...defaultStoryArgs,
  },
};

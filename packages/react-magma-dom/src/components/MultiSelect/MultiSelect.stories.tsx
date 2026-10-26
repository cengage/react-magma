import React from 'react';

import { Meta } from '@storybook/react-webpack5';
import { HelpIcon } from 'react-magma-icons';

import { magma } from '../../theme/magma';
import { ButtonSize, ButtonType, ButtonVariant } from '../Button';
import { Container } from '../Container';
import { IconButton } from '../IconButton';
import { LabelPosition } from '../Label';
import { Tooltip } from '../Tooltip';

import { MultiSelect, MultiSelectProps, MultiSelectSelectionBehavior } from '.';

interface RoleOption {
  disabled?: boolean;
  label: string;
  value: string;
}

interface CollaboratorOption extends RoleOption {
  group: string;
}

const roles: RoleOption[] = [
  { label: 'Editor', value: 'editor' },
  { label: 'Owner', value: 'owner' },
  {
    disabled: true,
    label: 'Reader – a disabled item',
    value: 'reader',
  },
  { label: 'Uploader', value: 'uploader' },
  { label: 'Viewer', value: 'viewer' },
];

const classes: RoleOption[] = [
  { label: 'Alvarez, Maria — Course 1A', value: 'course-1a' },
  { label: 'Alvarez, Maria — Course 1B', value: 'course-1b' },
  { label: 'Alvarez, Maria — Course 1C', value: 'course-1c' },
];

const collaborators: CollaboratorOption[] = [
  {
    group: 'Design',
    label: 'Ava Patel — Product Designer',
    value: 'ava-patel',
  },
  {
    group: 'Design',
    label: 'Marcus Lee — UX Researcher',
    value: 'marcus-lee',
  },
  {
    group: 'Engineering',
    label: 'Priya Shah — Front-end Engineer',
    value: 'priya-shah',
  },
  {
    group: 'Engineering',
    label: 'Daniel Kim — QA Engineer',
    value: 'daniel-kim',
  },
  {
    group: 'Product',
    label: 'Elena Garcia — Product Manager',
    value: 'elena-garcia',
  },
  {
    group: 'Product',
    label: 'Noah Williams — Business Analyst',
    value: 'noah-williams',
  },
];

const statesAndTerritories: RoleOption[] = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'U.S. Virgin Islands',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
].map(label => ({
  label,
  value: label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, ''),
}));

export default {
  argTypes: {
    ariaDescribedBy: { control: 'text' },
    ariaLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    errorMessage: { control: 'text' },
    hasSelectAll: { control: 'boolean' },
    helperMessage: { control: 'text' },
    isFilterable: { control: 'boolean' },
    isInverse: { control: 'boolean' },
    isLabelVisuallyHidden: { control: 'boolean' },
    labelPosition: {
      control: { type: 'select' },
      options: Object.values(LabelPosition),
    },
    labelWidth: { control: 'number' },
    selectionBehavior: {
      control: { type: 'select' },
      options: Object.values(MultiSelectSelectionBehavior),
    },
  },
  component: MultiSelect,
  decorators: [
    Story => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'MultiSelect',
} as Meta;

export const Default = {
  args: {
    items: roles,
    labelText: 'Roles',
    placeholder: 'Choose roles',
  },
};

export const GroupedOptions = {
  render: (props: MultiSelectProps<CollaboratorOption>) => (
    <MultiSelect {...props} itemToGroup={item => item.group} />
  ),
  args: {
    items: collaborators,
    labelText: 'Project collaborators',
    placeholder: 'Choose collaborators',
  },
};

export const SelectAll = {
  args: {
    hasSelectAll: true,
    items: roles,
    labelText: 'Roles',
    placeholder: 'Choose roles',
  },
};

export const Filterable = {
  args: {
    isFilterable: true,
    items: statesAndTerritories,
    labelText: 'States and territories',
    placeholder: 'Choose states or territories',
  },
};

export const FilterableWithSelectAll = {
  args: {
    filterPlaceholder: 'Search states or territories',
    hasSelectAll: true,
    isFilterable: true,
    items: statesAndTerritories,
    labelText: 'States and territories',
    placeholder: 'Choose states or territories',
  },
};

export const WithInitialSelectedItems = {
  args: {
    defaultSelectedItems: [roles[0], roles[1]],
    hasSelectAll: true,
    items: roles,
    labelText: 'Roles',
    placeholder: 'Choose roles',
  },
};

export const DeferredSelection = {
  args: {
    defaultSelectedItems: [roles[0]],
    hasSelectAll: true,
    items: roles,
    labelText: 'Roles',
    placeholder: 'Choose roles',
    selectionBehavior: MultiSelectSelectionBehavior.deferred,
  },
};

export const FilterableWithSelectAllAndDeferredSelection = {
  args: {
    defaultSelectedItems: [statesAndTerritories[0], statesAndTerritories[1]],
    filterPlaceholder: 'Search states or territories',
    hasSelectAll: true,
    isFilterable: true,
    items: statesAndTerritories,
    labelText: 'States and territories',
    placeholder: 'Choose states or territories',
    selectionBehavior: MultiSelectSelectionBehavior.deferred,
  },
};

export const WithHelperMessage = {
  args: {
    helperMessage: 'Choose every role that applies.',
    items: roles,
    labelText: 'Roles',
    placeholder: 'Choose roles',
  },
};

export const WithErrorMessage = {
  args: {
    errorMessage: 'Choose at least one role.',
    items: roles,
    labelText: 'Roles',
    placeholder: 'Choose roles',
  },
};

export const LeftLabel = {
  args: {
    items: roles,
    labelPosition: LabelPosition.left,
    labelText: 'Roles',
    labelWidth: 25,
    placeholder: 'Choose roles',
  },
};

export const WithAdditionalContent = {
  render: (props: MultiSelectProps<RoleOption>) => (
    <MultiSelect
      {...props}
      additionalContent={
        <Tooltip content="Learn more about roles">
          <IconButton
            aria-label="Learn more about roles"
            icon={<HelpIcon size={magma.iconSizes.small} />}
            size={ButtonSize.small}
            type={ButtonType.button}
            variant={ButtonVariant.link}
          />
        </Tooltip>
      }
    />
  ),
  args: {
    items: roles,
    labelText: 'Roles',
    placeholder: 'Choose roles',
  },
};

export const Disabled = {
  args: {
    defaultSelectedItems: [roles[0], roles[1]],
    disabled: true,
    items: roles,
    labelText: 'Roles',
    placeholder: 'Choose roles',
  },
};

export const Controlled = {
  render: (props: MultiSelectProps<RoleOption>) => {
    const [selectedItems, setSelectedItems] = React.useState<RoleOption[]>([
      roles[0],
    ]);

    return (
      <>
        <MultiSelect
          {...props}
          onSelectedItemsChange={setSelectedItems}
          selectedItems={selectedItems}
        />
        <p>
          Selected values: {selectedItems.map(item => item.value).join(', ')}
        </p>
      </>
    );
  },
  args: {
    hasSelectAll: true,
    items: roles,
    labelText: 'Roles',
    placeholder: 'Choose roles',
  },
};

export const CustomSelectionSummary = {
  args: {
    defaultSelectedItems: classes,
    hasSelectAll: true,
    items: classes,
    labelText: 'Class',
    placeholder: 'Choose classes',
    renderSelectedItems: (
      selectedItems: RoleOption[],
      { allSelected }: { allSelected: boolean }
    ) =>
      allSelected
        ? `All Classes (${selectedItems.length})`
        : `${selectedItems.length} classes selected`,
  },
};

export const Inverse = {
  render: (props: MultiSelectProps<RoleOption>) => (
    <Container isInverse style={{ minHeight: '320px', padding: '24px' }}>
      <MultiSelect {...props} isInverse />
    </Container>
  ),
  args: {
    hasSelectAll: true,
    items: roles,
    labelText: 'Roles',
    placeholder: 'Choose roles',
  },
};

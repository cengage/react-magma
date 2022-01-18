import React from 'react';
import {
  IconAlignment,
  IconSizes,
  List,
  ListItem,
  spacingVisualStyle,
} from '.';
import { EmailIcon } from 'react-magma-icons';
import { TypographyVisualStyle } from '../Typography';

export default {
  component: List,
  title: 'List',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    spacingStyle: {
      control: {
        type: 'select',
        options: spacingVisualStyle,
      },
    },
    visualStyle: {
      control: {
        type: 'select',
        options: TypographyVisualStyle,
      },
    },
  },
};

export const Default = args => {
  return (
    <List {...args}>
      <ListItem>Sample text</ListItem>
      <ListItem>Sample text again</ListItem>
      <ListItem>
        Sample text again and a <ListItem description>Check this out</ListItem>
      </ListItem>
      <ListItem>Sample text again</ListItem>
      <ListItem>Sample text again</ListItem>
      <ListItem>Sample text again</ListItem>
      <ListItem>Sample text again</ListItem>
    </List>
  );
};

export const Ordered = args => {
  return (
    <List spacingStyle={spacingVisualStyle.spacing04} {...args} isOrdered>
      <ListItem>Sample text</ListItem>
      <ListItem>Sample text again</ListItem>
      <ListItem>Sample text again</ListItem>
      <ListItem>Sample text again</ListItem>
      <ListItem>Sample text again</ListItem>
      <ListItem>Sample text again</ListItem>
      <ListItem>Sample text again</ListItem>
    </List>
  );
};

export const IconList = args => {
  return (
    <List
      iconAlign={IconAlignment.top}
      iconSize={IconSizes.large}
      spacingStyle={spacingVisualStyle.spacing04}
      {...args}
    >
      <ListItem icon={<EmailIcon />}>Sample text</ListItem>
      <ListItem icon={<EmailIcon />}>Sample text again</ListItem>
      <ListItem icon={<EmailIcon />}>Sample text again</ListItem>
      <ListItem icon={<EmailIcon />}>Sample text again</ListItem>
      <ListItem icon={<EmailIcon />}>
        Sample text again
        <ListItem description>This is a description</ListItem>
      </ListItem>
    </List>
  );
};

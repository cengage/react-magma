import React from 'react';
import {
  // IconAlignment,
  // IconSizes,
  List,
} from './List';
import { ListItem } from './ListItem';
import { EmailIcon } from 'react-magma-icons';
import { TypographyVisualStyle } from '../Typography';
import { magma } from '../..';
import { Card, CardBody } from '../Card';

export default {
  component: List,
  title: 'List',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    isOrdered: {
      control: {
        type: 'boolean',
      },
    },
    spacingStyle: {
      control: {
        type: 'select',
        options: magma.spaceScale,
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
    <Card isInverse={args.isInverse}>
      <CardBody>
      <List {...args}>
        <ListItem>Sample text</ListItem>
        <ListItem>Sample text again</ListItem>
        <ListItem>
          Sample text again and a{' '}
          <ListItem description>Check this out</ListItem>
        </ListItem>
        <ListItem>Sample text again</ListItem>
        <ListItem>Sample text again</ListItem>
        <ListItem>Sample text again</ListItem>
        <ListItem>Sample text again</ListItem>
      </List>
      <br />
      <List {...args} iconSize="small">
        <ListItem icon={<EmailIcon />} iconBackground="danger">
          Sample text
        </ListItem>
        <ListItem icon={<EmailIcon />}>Sample text again</ListItem>
        <ListItem icon={<EmailIcon />}>Sample text again</ListItem>
        <ListItem icon={<EmailIcon />}>Sample text again</ListItem>
        <ListItem icon={<EmailIcon />}>
          Sample text again
          <ListItem description>This is a description</ListItem>
        </ListItem>
      </List>
      </CardBody>
    </Card>
  );
};

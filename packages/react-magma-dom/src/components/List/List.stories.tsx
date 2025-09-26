import React from 'react';

import { Meta } from '@storybook/react/types-6-0';
import {
  DeleteIcon,
  DraftsIcon,
  FolderOpenIcon,
  InboxIcon,
} from 'react-magma-icons';

import { IconAlignment, List, olListType, ulListType } from './List';
import { ListItem } from './ListItem';
import { magma } from '../..';
import { Card, CardBody } from '../Card';
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
    isOrdered: {
      control: {
        type: 'boolean',
      },
    },
    isReversed: {
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
    listType: {
      control: {
        type: 'select',
        options: ulListType || olListType,
      },
    },
    iconAlign: {
      control: {
        type: 'select',
        options: IconAlignment,
      },
    },
  },
} as Meta;

export const Simple = {
  render: args => {
    return (
      <Card isInverse={args.isInverse}>
        <CardBody>
          <List {...args}>
            <ListItem>English: Hello</ListItem>
            <ListItem>Spanish: Hola</ListItem>
            <ListItem>French: Bonjour</ListItem>
            <ListItem>German: Hallo</ListItem>
            <ListItem>Italian: Ciao</ListItem>
            <ListItem>Portuguese: Olá</ListItem>
          </List>
        </CardBody>
      </Card>
    );
  },

  args: {
    spacingStyle: magma.spaceScale.spacing07,
    isOrdered: false,
    isReversed: false,
    isInverse: false,
    visualStyle: TypographyVisualStyle.headingMedium,
    listType: ulListType.square,
  },

  parameters: {
    controls: { exclude: ['iconAlign'] },
  },
};

export const UnorderedList = {
  render: args => {
    return (
      <Card isInverse={args.isInverse}>
        <CardBody>
          <List {...args}>
            <ListItem>
              Mammals
              <List isOrdered={args.isOrdered}>
                <ListItem>
                  Dogs
                  <List isOrdered={args.isOrdered}>
                    <ListItem>German Shepherd</ListItem>
                    <ListItem>Labrador Retriever</ListItem>
                    <ListItem>American Bully</ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Cats
                  <List isOrdered={args.isOrdered}>
                    <ListItem>Siamese</ListItem>
                    <ListItem>Persian</ListItem>
                    <ListItem>Bengal</ListItem>
                  </List>
                </ListItem>
              </List>
            </ListItem>
            <ListItem>
              Reptiles
              <List isOrdered={args.isOrdered}>
                <ListItem>
                  Snakes
                  <List isOrdered={args.isOrdered}>
                    <ListItem>Python</ListItem>
                    <ListItem>Boa Constrictor</ListItem>
                    <ListItem>Corn Snake</ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Lizards
                  <List isOrdered={args.isOrdered}>
                    <ListItem>Geckos</ListItem>
                    <ListItem>Iguanas</ListItem>
                    <ListItem>Chameleons</ListItem>
                  </List>
                </ListItem>
              </List>
            </ListItem>
            <ListItem>
              Birds
              <List isOrdered={args.isOrdered}>
                <ListItem>
                  Parrots
                  <List isOrdered={args.isOrdered}>
                    <ListItem>African Grey</ListItem>
                    <ListItem>Cockatiel</ListItem>
                    <ListItem>Budgerigar</ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Birds of Prey
                  <List isOrdered={args.isOrdered}>
                    <ListItem>Eagles</ListItem>
                    <ListItem>Hawks</ListItem>
                    <ListItem>Falcons</ListItem>
                  </List>
                </ListItem>
              </List>
            </ListItem>
          </List>
        </CardBody>
      </Card>
    );
  },

  args: {
    spacingStyle: magma.spaceScale.spacing04,
    isOrdered: false,
  },

  parameters: {
    controls: { exclude: ['visualStyle', 'iconAlign'] },
  },
};

export const OrderedList = {
  render: args => {
    return (
      <Card isInverse={args.isInverse}>
        <CardBody>
          <List {...args} listType={olListType.uppercaseRoman}>
            <ListItem>
              Fruits
              <List
                isOrdered={args.isOrdered}
                listType={olListType.lowercaseRoman}
              >
                <ListItem>Apples</ListItem>
                <ListItem>Bananas</ListItem>
                <ListItem>Oranges</ListItem>
              </List>
            </ListItem>
            <ListItem>
              Vegetables
              <List
                isOrdered={args.isOrdered}
                listType={olListType.lowercaseRoman}
              >
                <ListItem>
                  Leafy greens
                  <List
                    isOrdered={args.isOrdered}
                    listType={olListType.lowercase}
                  >
                    <ListItem>Spinach</ListItem>
                    <ListItem>Kale</ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Root vegetables
                  <List
                    isOrdered={args.isOrdered}
                    listType={olListType.lowercase}
                  >
                    <ListItem>Carrots</ListItem>
                    <ListItem>Potatoes</ListItem>
                  </List>
                </ListItem>
              </List>
            </ListItem>
            <ListItem>
              Dairy
              <List
                isOrdered={args.isOrdered}
                listType={olListType.lowercaseRoman}
              >
                <ListItem>Milk</ListItem>
                <ListItem>Cheese</ListItem>
              </List>
            </ListItem>
          </List>
        </CardBody>
      </Card>
    );
  },

  args: {
    spacingStyle: magma.spaceScale.spacing04,
    isOrdered: true,
    hasStart: 10,
  },

  parameters: {
    controls: { exclude: ['visualStyle', 'iconAlign', 'listType'] },
  },
};

export const WithLinks = {
  render: args => {
    return (
      <Card isInverse={args.isInverse}>
        <CardBody>
          <List {...args}>
            <ListItem>
              Mammals
              <List>
                <ListItem>
                  Dogs
                  <List>
                    <ListItem>
                      <a href="https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
                        German Shepherd
                      </a>
                      <ListItem description>
                        Courageous, energetic, loyal
                      </ListItem>
                    </ListItem>
                    <ListItem>
                      <a href="https://images.pexels.com/photos/15971943/pexels-photo-15971943/free-photo-of-black-labrador-retriever.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
                        Labrador Retriever
                      </a>
                      <ListItem description>
                        Friendly, outgoing, high-spirited
                      </ListItem>
                    </ListItem>
                    <ListItem>
                      <a href="https://images.pexels.com/photos/6007510/pexels-photo-6007510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
                        American Bully
                      </a>
                      <ListItem description>
                        Strong, athletic, affectionate
                      </ListItem>
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>Cats</ListItem>
              </List>
            </ListItem>
          </List>
        </CardBody>
      </Card>
    );
  },

  parameters: { controls: { exclude: ['visualStyle', 'iconAlign'] } },
};

export const WithIcons = {
  render: args => {
    return (
      <List {...args}>
        <ListItem icon={<InboxIcon />} iconBackground="neutral">
          Inbox
        </ListItem>
        <ListItem icon={<DraftsIcon />}>Drafts</ListItem>
        <ListItem icon={<DeleteIcon />}>Trash</ListItem>
        <ListItem icon={<FolderOpenIcon />}>Spam</ListItem>
      </List>
    );
  },

  args: {
    spacingStyle: magma.spaceScale.spacing06,
  },

  parameters: {
    controls: { exclude: ['isInverse', 'listType', 'isOrdered', 'isReversed'] },
  },
};

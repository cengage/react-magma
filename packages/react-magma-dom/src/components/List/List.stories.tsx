import React from 'react';
import { IconAlignment, List, olListType, ulListType } from './List';
import { ListItem } from './ListItem';
import {
  DeleteIcon,
  DraftsIcon,
  FolderOpenIcon,
  InboxIcon,
} from 'react-magma-icons';
import { TypographyVisualStyle } from '../Typography';
import { magma } from '../..';
import { Card, CardBody } from '../Card';
import { Meta } from '@storybook/react/types-6-0';

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

export const Default = args => {
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
                  <ListItem>German Shepherd</ListItem>
                  <ListItem>Labrador Retriever</ListItem>
                  <ListItem>American Bully</ListItem>
                </List>
              </ListItem>
              <ListItem>
                Cats
                <List>
                  <ListItem>Siamese</ListItem>
                  <ListItem>Persian</ListItem>
                  <ListItem>Bengal</ListItem>
                </List>
              </ListItem>
            </List>
          </ListItem>
          <ListItem>
            Reptiles
            <List>
              <ListItem>
                Snakes
                <List>
                  <ListItem>Python</ListItem>
                  <ListItem>Boa Constrictor</ListItem>
                  <ListItem>Corn Snake</ListItem>
                </List>
              </ListItem>
              <ListItem>
                Lizards
                <List>
                  <ListItem>Geckos</ListItem>
                  <ListItem>Iguanas</ListItem>
                  <ListItem>Chameleons</ListItem>
                </List>
              </ListItem>
            </List>
          </ListItem>
          <ListItem>
            Birds
            <List>
              <ListItem>
                Parrots
                <List>
                  <ListItem>African Grey</ListItem>
                  <ListItem>Cockatiel</ListItem>
                  <ListItem>Budgerigar</ListItem>
                </List>
              </ListItem>
              <ListItem>
                Birds of Prey
                <List>
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
};

Default.args = {
  spacingStyle: magma.spaceScale.spacing04,
};
Default.parameters = { controls: { exclude: ['visualStyle', 'iconAlign'] } };

export const WithLinks = args => {
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
};
WithLinks.parameters = { controls: { exclude: ['visualStyle', 'iconAlign'] } };

export const WithIcons = args => {
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
};

WithIcons.args = {
  spacingStyle: magma.spaceScale.spacing06,
};
WithIcons.parameters = {
  controls: { exclude: ['isInverse', 'listType', 'isOrdered', 'isReversed'] },
};

import React from 'react';
import { TreeView, TreeItem } from '.';

import { ArticleIcon, FolderIcon } from 'react-magma-icons';
import { ExpandInitialOptions, TreeViewSelectable } from './useTreeView';
import { Meta } from '@storybook/react/types-6-0';
import { Card } from '../Card';

export default {
  component: TreeView,
  title: 'TreeView',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    selectable: {
      control: {
        type: 'select',
        options: TreeViewSelectable,
      },
      defaultValue: TreeViewSelectable.off,
    },
    expandInitial: {
      control: {
        type: 'select',
        options: ExpandInitialOptions,
      },
      defaultValue: ExpandInitialOptions.all,
    },
  },
} as Meta;

export const Default = args => {
  return (
    <Card isInverse={args.isInverse}>
      <TreeView {...args}>
        <TreeItem icon={<FolderIcon />} label={<>Part 1: Introduction</>}>
          <TreeItem
            icon={<ArticleIcon />}
            label={<>Chapter 1: Lorem ipsum dolor sit amet</>}
          >
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 1 child: Lorem ipsum dolor sit amet</>}
            />
          </TreeItem>
          <TreeItem
            icon={<ArticleIcon />}
            label={<>Chapter 2: Lorem ipsum dolor sit amet</>}
          />
          <TreeItem
            icon={<FolderIcon />}
            label={<>Chapter 3: Lorem ipsum dolor sit amet</>}
          >
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Section 3.1: Lorem ipsum dolor sit amet</>}
            />
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Section 3.2: Lorem ipsum dolor sit amet</>}
            />
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Section 3.3: Lorem ipsum dolor sit amet</>}
            />
          </TreeItem>
        </TreeItem>
        <TreeItem
          icon={<FolderIcon />}
          label={<>Part 2: Lorem ipsum dolor sit amet</>}
        >
          <TreeItem
            icon={<ArticleIcon />}
            label={<>Chapter 4: Lorem ipsum dolor sit amet</>}
          />
          <TreeItem
            icon={<FolderIcon />}
            label={<>Chapter 5: Lorem ipsum dolor sit amet</>}
          >
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Section 5.1: Lorem ipsum dolor sit amet</>}
            />
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Section 5.2: Lorem ipsum dolor sit amet</>}
            />
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Section 5.3: Lorem ipsum dolor sit amet</>}
            />
            </TreeItem>
          <TreeItem
            icon={<ArticleIcon />}
            label={<>Chapter 6: Lorem ipsum dolor sit amet</>}
          />
        </TreeItem>
        <TreeItem
          icon={<FolderIcon />}
          label={<>Part 3: Lorem ipsum dolor sit amet</>}
        >
          <TreeItem
            icon={<ArticleIcon />}
            label={<>Chapter 7: Lorem ipsum dolor sit amet</>}
          />
          <TreeItem
            icon={<ArticleIcon />}
            label={<>Chapter 8: Lorem ipsum dolor sit amet</>}
          />
          <TreeItem
            icon={<ArticleIcon />}
            label={<>Chapter 9: Lorem ipsum dolor sit amet</>}
          />
          <TreeItem
            icon={<ArticleIcon />}
            label={<>Chapter 10: Lorem ipsum dolor sit amet</>}
          />
        </TreeItem>
      </TreeView>
    </Card>
  );
};


export const DefaultCollapsed = args => {
  return (
    <Card isInverse={args.isInverse}>
      <TreeView {...args}>
        <TreeItem label={<>Home</>}>
          <TreeItem label={<>Bath</>}>
            
            <TreeItem label={<>Bathroom Storage</>}>
              
              <TreeItem label={<>Item 1</>} />
              <TreeItem label={<>Item 2</>} />
            </TreeItem>
            <TreeItem label={<>Shower Curtains & Accessories</>} />
            <TreeItem label={<>Bath Towels</>}>
              
              <TreeItem label={<>Item 1</>} />
              <TreeItem label={<>Item 2</>} />
            </TreeItem>
          </TreeItem>
          <TreeItem label={<>Bedding</>}>
            
                          <TreeItem label={<>Item 1</>} />
              <TreeItem label={<>Item 2</>} />
          </TreeItem>
          <TreeItem label={<>Arts & Crafts</>}></TreeItem>
          <TreeItem label={<>Storage & Organization</>}>
            
                         <TreeItem label={<>Item 1</>} />
              <TreeItem label={<>Item 2</>} />
          </TreeItem>
        </TreeItem>
        <TreeItem label={<>Furniture</>}>
          
                        <TreeItem label={<>Item 1</>} />
              <TreeItem label={<>Item 2</>} />
        </TreeItem>
        <TreeItem label={<>Kitchen & Dining</>}/>
        <TreeItem label={<>Patio & Garden</>}>
          
              <TreeItem label={<>Item 1</>} />
              <TreeItem label={<>Item 2</>} />
        </TreeItem>
      </TreeView>
    </Card>
  );
};

 




export const Textbook = args => {
  return (
    <Card isInverse={args.isInverse}>
      <TreeView {...args}>
        <TreeItem label={<>I. INTRODUCTION: WHAT IS ART HISTORY?</>}>
          <TreeItem label={<>Art History in the 21st Century</>}>
            <TreeItem label={<>The Questions Art Historians Ask</>} />
            <TreeItem label={<>The Words Art Historians Use</>}>
              <TreeItem label={<>Something deeper</>} />
            </TreeItem>
            <TreeItem label={<>Art History and Other Disciplines</>} />
          </TreeItem>
          <TreeItem label={<>Different Ways of Seeing</>} />
        </TreeItem>
        <TreeItem label={<>1. ART IN THE STONE AGE</>}>
          <TreeItem label={<>Paleolithic Art</>}>
            <TreeItem label={<>Section Content</>} />
            <TreeItem label={<>Africa</>} />
            <TreeItem label={<>Europe</>} />
          </TreeItem>
          <TreeItem label={<>Neolithic Art</>}>
            <TreeItem label={<>Anatolia and Mesopotamia</>} />
            <TreeItem label={<>Europe</>} />
          </TreeItem>
        </TreeItem>
        <TreeItem label={<>2. ANCIENT MESOPOTAMIA AND PERSIA</>}>
          <TreeItem label={<>Mesopotamia</>}>
            <TreeItem label={<>Sumer</>} />
            <TreeItem label={<>Akkad</>} />
            <TreeItem label={<>Third Dynasty of Ur</>} />
            <TreeItem label={<>Babylon</>} />
            <TreeItem label={<>Elam</>} />
            <TreeItem label={<>Assyria</>} />
            <TreeItem label={<>Neo-Babylonia</>} />
          </TreeItem>
          <TreeItem label={<>Persia</>}>
            <TreeItem label={<>Achaemenid Empire</>} />
            <TreeItem label={<>Sasanian Empire</>} />
          </TreeItem>
        </TreeItem>
      </TreeView>
    </Card>
  );
};

export const Simple = args => {
  return (
    <TreeView {...args}>
      <TreeItem label={<>0.0</>}>
        <TreeItem label={<>1.1</>}>
          {/* <TreeItem label={<>The Questions Art Historians Ask</>} />
          <TreeItem label={<>The Words Art Historians Use</>}>
            <TreeItem label={<>Something deeper</>} />
          </TreeItem> */}
          <TreeItem label={<>1.1.1</>}>
            <TreeItem label={<>1.1.1.1</>} />
          </TreeItem>
        </TreeItem>
        <TreeItem label={<>1.2</>} />
      </TreeItem>
      <TreeItem label={<>0.1</>} />
    </TreeView>
  );
};

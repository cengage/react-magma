import React from 'react';
import { TreeView, TreeItem, TreeViewSelectable } from '.';
import { magma } from '../../theme/magma';

import { ArticleIcon, FolderIcon, FavoriteIcon } from 'react-magma-icons';
import { Meta } from '@storybook/react/types-6-0';
import { Card } from '../Card';
import { Paragraph } from '../Paragraph';
import { Tag, TagSize } from '../..';

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
      },
      options: TreeViewSelectable,
      defaultValue: TreeViewSelectable.off,
    },
    initialExpandedItems: {
      control: 'object',
      defaultValue: [],
    },
    onClick: { action: 'clicked' },
    onExpandedChange: { action: 'expanded changed' },
    onSelectedItemChange: { action: 'selected item changed' },
  },
} as Meta;

export const Default = args => {
  const [selectedItems, setSelectedItems] = React.useState(null);

  function onSelection(items) {
    const allTags = items.map((i: any, key) => {
      return <Tag key={key} size={TagSize.small}>{i}</Tag>
    });
    setSelectedItems(allTags);
  }

  return (
    <>
      <Card isInverse={args.isInverse}>
        <TreeView {...args} onSelectedItemChange={onSelection}>
          <TreeItem label={<>Part 1: Introduction</>} itemId="000" testId="000">
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 1: Lorem ipsum dolor sit amet</>}
              itemId="1"
              testId="1"
            >
              <TreeItem
                icon={<ArticleIcon />}
                isDisabled
                label={
                  <>
                    Chapter 1 child: Lorem ipsum dolor sit amet dolor sit amet
                    dolor sit amet
                  </>
                }
                itemId="2"
              />
              <TreeItem
                icon={<ArticleIcon />}
                label={
                  <>
                    Chapter 2ish child: Lorem ipsum dolor sit amet dolor sit
                    amet dolor sit amet
                  </>
                }
                itemId="2.5"
              />
            </TreeItem>
            <TreeItem
              label={<>Chapter 2: Lorem ipsum dolor sit amet</>}
              itemId="3"
            />
            <TreeItem
              icon={<FolderIcon />}
              label={<>Chapter 3: Lorem ipsum dolor sit amet</>}
              isDisabled
              itemId="4"
            >
              <TreeItem
                icon={<ArticleIcon />}
                label={
                  <>
                    Section 3.1: Lorem ipsum dolor sit amet dolor sit ametdolor
                    sit amet
                  </>
                }
                itemId="5"
              />
              <TreeItem
                icon={<ArticleIcon />}
                label={<>Section 3.2: Lorem ipsum dolor sit amet</>}
                itemId="6"
              />
              <TreeItem
                icon={<ArticleIcon />}
                label={<>Section 3.3: Lorem ipsum dolor sit amet</>}
                itemId="7"
              />
            </TreeItem>
          </TreeItem>
          <TreeItem
            icon={<FolderIcon />}
            label={<>Part 2: Lorem ipsum dolor sit amet</>}
            itemId="8"
          >
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 4: Lorem ipsum dolor sit amet</>}
              itemId="9"
            />
            <TreeItem
              icon={<FolderIcon />}
              label={<>Chapter 5: Lorem ipsum dolor sit amet</>}
              itemId="10"
            >
              <TreeItem
                icon={<ArticleIcon />}
                label={<>Section 5.1: Lorem ipsum dolor sit amet</>}
                itemId="11"
              />
              <TreeItem
                icon={<ArticleIcon />}
                label={<>Section 5.2: Lorem ipsum dolor sit amet</>}
                itemId="12"
              />
              <TreeItem
                icon={<ArticleIcon />}
                label={<>Section 5.3: Lorem ipsum dolor sit amet</>}
                itemId="13"
              />
            </TreeItem>
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 6: Lorem ipsum dolor sit amet</>}
              itemId="14"
            />
          </TreeItem>
          <TreeItem
            icon={<FolderIcon />}
            label={<>Part 3: Lorem ipsum dolor sit amet</>}
            itemId="15"
          >
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 7: Lorem ipsum dolor sit amet</>}
              itemId="16"
            />
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 8: Lorem ipsum dolor sit amet</>}
              itemId="17"
            />
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 9: Lorem ipsum dolor sit amet</>}
              itemId="18"
            />
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 10: Lorem ipsum dolor sit amet</>}
              itemId="19"
            />
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 11: Lorem ipsum dolor sit amet</>}
              itemId="20"
            />
          </TreeItem>
        </TreeView>
      </Card>
      <br/>
      {
      args.selectable !== TreeViewSelectable.off &&
      (<>Selected: {selectedItems}</>)
    }
    </>
  );
};

Default.args = {
  selectable: TreeViewSelectable.multi,
  ariaLabel: 'Textbook tree',
  initialExpandedItems: ['000', '1', '15'],
  // initialSelectedItems: ['8'],
  testId: 'default-example',
};

export const NoIcons = args => {
  const [selectedItems, setSelectedItems] = React.useState(null);

  function onSelection(items) {
    const allTags = items.map((i: any, key) => {
      return <Tag key={key} size={TagSize.small}>{i}</Tag>
    });
    setSelectedItems(allTags);
  }

  return (
    <>
    <Card isInverse={args.isInverse}>
      <TreeView {...args} onSelectedItemChange={onSelection}>
        <TreeItem label={<>Home</>} itemId="home">
          <TreeItem label={<>Bath</>} itemId="bath">
            <TreeItem label={<>Bathroom Storage</>} itemId="bath">
              <TreeItem label={<>Item 1</>} itemId="bath-1" />
              <TreeItem label={<>Item 2</>} itemId="bath-2" />
            </TreeItem>
            <TreeItem
              label={<>Shower Curtains & Accessories</>}
              itemId="shower"
            />
            <TreeItem label={<>Bath Towels</>} itemId="towels">
              <TreeItem label={<>Item 1</>} itemId="towels-1" />
              <TreeItem label={<>Item 2</>} itemId="towels-2" isDisabled/>
            </TreeItem>
          </TreeItem>
          <TreeItem label={<>Bedding</>} itemId="bedding">
            <TreeItem label={<>Item 1</>} itemId="bedding-1" />
            <TreeItem label={<>Item 2</>} itemId="bedding-2" />
          </TreeItem>
          <TreeItem label={<>Arts & Crafts</>} itemId="arts" />
          <TreeItem label={<>Storage & Organization</>} itemId="storage">
            <TreeItem label={<>Item 1</>} itemId="storage-1" />
            <TreeItem label={<>Item 2</>} itemId="storage-2" />
          </TreeItem>
        </TreeItem>
        <TreeItem label={<>Furniture</>} itemId="furniture">
          <TreeItem label={<>Item 1</>} itemId="furniture-1" />
          <TreeItem label={<>Item 2</>} itemId="furniture-2" />
        </TreeItem>
        <TreeItem label={<>Kitchen & Dining</>} itemId="kitchen" />
        <TreeItem label={<>Patio & Garden</>} itemId="patio">
          <TreeItem label={<>Item 1</>} itemId="patio-1" />
          <TreeItem label={<>Item 2</>} itemId="patio2" />
        </TreeItem>
      </TreeView>
    </Card>
    <br/>
    {
      args.selectable !== TreeViewSelectable.off &&
      (<>Selected: {selectedItems}</>)
    }
    </>
  );
};

export const Textbook = args => {
  return (
    <Card isInverse={args.isInverse}>
      <Paragraph id="ah-textbook">Art History Textbook</Paragraph>
      <TreeView {...args} ariaLabelledBy={'ah-textbook'}>
        <TreeItem
          label={<>I. INTRODUCTION: WHAT IS ART HISTORY?</>}
          itemId="I-intro"
        >
          <TreeItem
            label={<>Art History in the 21st Century</>}
            itemId="I-intro"
          >
            <TreeItem
              label={<>The Questions Art Historians Ask</>}
              itemId="I-questions"
            />
            <TreeItem
              label={<>The Words Art Historians Use</>}
              itemId="I-words"
            >
              <TreeItem label={<>Vocabulary</>} itemId="I-vocab" />
            </TreeItem>
            <TreeItem
              label={<>Art History and Other Disciplines</>}
              itemId="I-other"
            />
          </TreeItem>
          <TreeItem
            label={<>Different Ways of Seeing</>}
            itemId="I-different-ways"
          />
        </TreeItem>
        <TreeItem label={<>1. ART IN THE STONE AGE</>} itemId="1-stone-age">
          <TreeItem label={<>Paleolithic Art</>} itemId="1-paleolithic">
            <TreeItem label={<>Africa</>} itemId="1-africa" />
            <TreeItem label={<>Europe</>} itemId="1-europe" />
          </TreeItem>
          <TreeItem label={<>Neolithic Art</>} itemId="1-neolithic">
            <TreeItem
              label={<>Anatolia and Mesopotamia</>}
              itemId="1-anatolia"
            />
            <TreeItem label={<>Europe</>} itemId="1-neolithic-europe" />
          </TreeItem>
        </TreeItem>
        <TreeItem
          label={<>2. ANCIENT MESOPOTAMIA AND PERSIA</>}
          itemId="2-ancient"
        >
          <TreeItem label={<>Mesopotamia</>} itemId="2-mesopotamia">
            <TreeItem label={<>Sumer</>} itemId="2-sumer" />
            <TreeItem label={<>Akkad</>} itemId="2-akkad" />
            <TreeItem label={<>Third Dynasty of Ur</>} itemId="2-ur" />
            <TreeItem label={<>Babylon</>} itemId="2-babylon" />
            <TreeItem label={<>Elam</>} itemId="2-elam" />
            <TreeItem label={<>Assyria</>} itemId="2-assyria" />
            <TreeItem label={<>Neo-Babylonia</>} itemId="2-neo" />
          </TreeItem>
          <TreeItem label={<>Persia</>} itemId="2-persia">
            <TreeItem label={<>Achaemenid Empire</>} itemId="2-achaemenid" />
            <TreeItem label={<>Sasanian Empire</>} itemId="2-sasanian" />
          </TreeItem>
        </TreeItem>
      </TreeView>
    </Card>
  );
};

export const Simple = args => {
  const [selectedItems, setSelectedItems] = React.useState(null);

  function onSelection(items) {
    const allTags = items.map((i: any, key) => {
      return <Tag key={key} size={TagSize.small}>{i}</Tag>
    });
    setSelectedItems(allTags);
  }
  return (
    <>
    <TreeView {...args} onSelectedItemChange={onSelection}>
      <TreeItem label="0.0" itemId="0.0" />
      <TreeItem label="0.1" itemId="0.1">
        <TreeItem label="0.1.1" itemId="0.1.1" />
        <TreeItem label="0.1.2" itemId="0.1.2">
          <TreeItem label="0.1.2.1" itemId="0.1.2.1" />
          <TreeItem label="0.1.2.2" itemId="0.1.2.2">
            <TreeItem label="0.1.2.2.1" itemId="0.1.2.2.1" />
            <TreeItem label="0.1.2.2.2" itemId="0.1.2.2.2">
              <TreeItem label="0.1.2.2.2.1" itemId="0.1.2.2.2.1" />
              <TreeItem label="0.1.2.2.2.2" itemId="0.1.2.2.2.2">
                <TreeItem label="0.1.2.2.2.2.1" itemId="0.1.2.2.2.2.1" />
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeView>
    <br/>
    {
      args.selectable !== TreeViewSelectable.off &&
      (<>Selected: {selectedItems}</>)
    }
    </>
  );
};

export const UseDefaultIcon = args => {
  const [selectedItems, setSelectedItems] = React.useState(null);

  function onSelection(items) {
    const allTags = items.map((i: any, key) => {
      return <Tag key={key} size={TagSize.small}>{i}</Tag>
    });
    setSelectedItems(allTags);
  }

  return (
    <>
    <TreeView {...args} onSelectedItemChange={onSelection}>
      <TreeItem
        label={<>I have an icon</>}
        icon={<FavoriteIcon />}
        labelStyle={{ color: magma.colors.info700, fontWeight: '600' }}
        style={{ background: magma.colors.info100 }}
        onClick={() => console.log('item clicked')}
        itemId="1"
      />
      <TreeItem
        label={<>Branch with no icon</>}
        onClick={() => console.log('item clicked')}
        itemId="2"
      >
        <TreeItem
          label={<>I am a leaf without an icon</>}
          style={{ background: magma.colors.info200 }}
          onClick={() => console.log('item clicked')}
          itemId="3"
        />
        <TreeItem
          label={<>I have an icon too</>}
          icon={<FavoriteIcon />}
          onClick={() => console.log('item clicked')}
          itemId="4"
        />
      </TreeItem>
    </TreeView>
    <br/>
    {
      args.selectable !== TreeViewSelectable.off &&
      (<>Selected: {selectedItems}</>)
    }
  </>
  );
};

export const Other = args => {
  const [selectedItems, setSelectedItems] = React.useState(null);

  function onSelection(items) {
    const allTags = items.map((i: any, key) => {
      return <Tag key={key} size={TagSize.small}>{i}</Tag>
    });
    setSelectedItems(allTags);
  }

  return (
    <>
    <TreeView {...args} onSelectedItemChange={onSelection}>
    <TreeItem label="Node 0" itemId="item0" testId="item0" />
    <TreeItem label="Node 1" itemId="item1" testId="item1">
        <TreeItem label="Child 1" itemId="item-child1">
          <TreeItem label="Grandchild 1" itemId="item-gchild1">
            <TreeItem label="Great-grandchild 1" itemId="item-ggchild1" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
      <TreeItem label="Node 2" itemId="item2">
        <TreeItem label="Child 2" itemId="item-child2">
          <TreeItem label="Grandchild 2" itemId="item-gchild2">
            <TreeItem label="Great-grandchild 2" itemId="item-ggchild2" />
            <TreeItem label="Great-grandchild 3" itemId="item-ggchild3" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
      <TreeItem label="Node 3" itemId="item3" />
    </TreeView>
    <br/>
    {
      args.selectable !== TreeViewSelectable.off &&
      (<>Selected: {selectedItems}</>)
    }
    </>
  );
};

Other.args = {
  initialExpandedItems: ['item1', 'item2', 'item-child2'],
  initialSelectedItems: ['item6'],
};

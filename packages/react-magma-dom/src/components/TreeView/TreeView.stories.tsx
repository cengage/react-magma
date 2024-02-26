import React from 'react';
import { TreeView, TreeItem, TreeViewSelectable } from '.';
import { magma } from '../../theme/magma';

import { ArticleIcon, FolderIcon, FavoriteIcon } from 'react-magma-icons';
import { Meta } from '@storybook/react/types-6-0';
import { Card } from '../Card';
import { Paragraph } from '../Paragraph';
import { Tag, TagSize, Button, Flex, FlexBehavior } from '../..';
import { ButtonSize } from '../Button';

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
      options: [TreeViewSelectable.single, TreeViewSelectable.multi, TreeViewSelectable.off],
      defaultValue: TreeViewSelectable.single,
    },
    initialExpandedItems: {
      control: 'object',
      defaultValue: [],
    },
    testId: {
      control: 'text',
    },
    ariaLabel: {
      control: 'text',
    },
    ariaLabelledBy: {
      control: 'text',
    },
    onExpandedChange: { action: 'expanded changed' },
    onSelectedItemChange: { action: 'selected item changed' },
  },
} as Meta;

export const Default = args => {
  const [selectedItems, setSelectedItems] = React.useState(null);

  function onSelection(items) {
    const allTags = items.map((i: any, key) => {
      return (
        <Tag key={key} size={TagSize.small}>
          {i}
        </Tag>
      );
    });
    setSelectedItems(allTags);
  }

  return (
    <>
      <Card isInverse={args.isInverse}>
        <TreeView {...args} onSelectedItemChange={onSelection}>
          <TreeItem label={<>Part 1: Introduction</>} itemId="0" testId="0">
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 1: I love tiramisu jelly beans soufflé</>}
              itemId="1"
              testId="1"
            >
              <TreeItem
                icon={<ArticleIcon />}
                isDisabled
                label={
                  <>
                    Chapter 1 child: Cake donut lemon drops gingerbread
                  </>
                }
                itemId="2"
              />
            </TreeItem>
            <TreeItem
              label={<>Chapter 2: Chocolate bar ice cream cake liquorice icing tart</>}
              itemId="3"
            />
            <TreeItem
              icon={<FolderIcon />}
              label={<>Chapter 3: Pudding jujubes icing fruitcake bonbon icing</>}
              isDisabled
              itemId="4"
            >
              <TreeItem
                icon={<ArticleIcon />}
                label={
                  <>
                    Section 3.1: Topping pudding marshmallow caramels I love pie
                  </>
                }
                itemId="5"
              />
              <TreeItem
                icon={<ArticleIcon />}
                label={<>Section 3.2: Tart sweet roll caramels candy canes sweet roll</>}
                itemId="6"
              />
              <TreeItem
                icon={<ArticleIcon />}
                label={<>Section 3.3: Tart sweet roll caramels candy canes sweet roll</>}
                itemId="7"
              />
            </TreeItem>
          </TreeItem>
          <TreeItem
            icon={<FolderIcon />}
            label={<>Part 2: Candy powder carrot cake cotton candy marshmallow caramels croissant I love</>}
            itemId="8"
          >
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 4: I love carrot cake sweet roll I love liquorice sweet</>}
              itemId="9"
            />
            <TreeItem
              icon={<FolderIcon />}
              label={<>Chapter 5: Wafer I love I love sesame snaps I love muffin dragée halvah</>}
              itemId="10"
            >
              <TreeItem
                icon={<ArticleIcon />}
                label={<>Section 5.1: Apple pie apple pie tart macaroon topping chocolate cake</>}
                itemId="11"
              />
              <TreeItem
                icon={<ArticleIcon />}
                label={<>Section 5.2: Jelly lollipop tart gummies pie croissant sesame snaps sesame snaps</>}
                itemId="12"
              />
              <TreeItem
                icon={<ArticleIcon />}
                label={<>Section 5.3: Bonbon chocolate bar lollipop lollipop I love chocolate cake cupcake soufflé pie</>}
                itemId="13"
              />
            </TreeItem>
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 6: Cupcake dragée I love cookie I love</>}
              itemId="14"
            />
          </TreeItem>
          <TreeItem
            icon={<FolderIcon />}
            label={<>Part 3: Sugar plum halvah shortbread apple pie I love brownie gummi bears</>}
            itemId="15"
          >
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 7: Cheesecake lollipop tootsie roll candy canes cupcake I love dessert liquorice</>}
              itemId="16"
            />
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 8: Jelly pastry jelly-o topping cookie carrot cake shortbread</>}
              itemId="17"
            />
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 9: Jelly beans sweet candy canes croissant bonbon.</>}
              itemId="18"
            />
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 10: Wafer carrot cake powder candy canes sweet roll bear claw croissant cheesecake tart</>}
              itemId="19"
            />
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 11: Apple pie chocolate cake tiramisu bonbon I love croissant. I love chupa chups croissant tiramisu toffee cake tart</>}
              itemId="20"
            />
          </TreeItem>
        </TreeView>
      </Card>
      <br />
      {args.selectable !== TreeViewSelectable.off && (
        <>Selected: {selectedItems}</>
      )}
    </>
  );
};

Default.args = {
  selectable: TreeViewSelectable.multi,
  ariaLabel: 'Textbook tree',
  initialExpandedItems: ['8', '0', '10'],
  initialSelectedItems: ['8', '0'],
  testId: 'default-example',
};

export const NoIcons = args => {
  const [selectedItems, setSelectedItems] = React.useState(null);

  function onSelection(items) {
    const allTags = items.map((i: any, key) => {
      return (
        <Tag key={key} size={TagSize.small}>
          {i}
        </Tag>
      );
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
                <TreeItem label={<>Item 2</>} itemId="towels-2" isDisabled />
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
            <TreeItem label={<>Item 2</>} itemId="patio-2" />
          </TreeItem>
        </TreeView>
      </Card>
      <br />
      {args.selectable !== TreeViewSelectable.off && (
        <>Selected: {selectedItems}</>
      )}
    </>
  );
};

NoIcons.args = {
  initialExpandedItems: ['home', 'storage'],
  initialSelectedItems: ['storage-2'],
};

export const Textbook = args => {
  const [selectedItems, setSelectedItems] = React.useState(null);

  function onSelection(items) {
    const allTags = items.map((i: any, key) => {
      return (
        <Tag key={key} size={TagSize.small}>
          {i}
        </Tag>
      );
    });
    setSelectedItems(allTags);
  }

  return (
    <>
    <Card isInverse={args.isInverse} style={{ padding: '12px' }}>
      <Paragraph id="ah-textbook" isInverse={args.isInverse} noTopMargin>
        Art History Textbook
      </Paragraph>
      <TreeView {...args} onSelectedItemChange={onSelection}>
        <TreeItem
          label={<>I. INTRODUCTION: WHAT IS ART HISTORY?</>}
          itemId="I-intro"
        >
          <TreeItem
            label={<>Art History in the 21st Century</>}
            itemId="I-21century"
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
    <br />
    {args.selectable !== TreeViewSelectable.off && (
      <>Selected: {selectedItems}</>
    )}
    </>
  );
};

Textbook.args = {
  ariaLabelledBy: 'ah-textbook'
}

export const Simple = args => {
  const [selectedItems, setSelectedItems] = React.useState(null);

  function onSelection(items) {
    const allTags = items.map((i: any, key) => {
      return (
        <Tag key={key} size={TagSize.small}>
          {i}
        </Tag>
      );
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
      <br />
      {args.selectable !== TreeViewSelectable.off && (
        <>Selected: {selectedItems}</>
      )}
    </>
  );
};

Simple.parameters = { controls: { exclude: ['isInverse'] } };

export const DefaultIcon = args => {
  const [selectedItems, setSelectedItems] = React.useState(null);

  function onSelection(items) {
    const allTags = items.map((i: any, key) => {
      return (
        <Tag key={key} size={TagSize.small}>
          {i}
        </Tag>
      );
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
      <br />
      {args.selectable !== TreeViewSelectable.off && (
        <>Selected: {selectedItems}</>
      )}
    </>
  );
};

DefaultIcon.parameters = { controls: { exclude: ['isInverse'] } };

export const FirstItemLeaf = args => {
  const [selectedItems, setSelectedItems] = React.useState(null);

  function onSelection(items) {
    const allTags = items.map((i: any, key) => {
      return (
        <Tag key={key} size={TagSize.small}>
          {i}
        </Tag>
      );
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
      <br />
      {args.selectable !== TreeViewSelectable.off && (
        <>Selected: {selectedItems}</>
      )}
    </>
  );
};

FirstItemLeaf.args = {
  initialExpandedItems: ['item1', 'item2', 'item-child2'],
  initialSelectedItems: ['item6'],
};

FirstItemLeaf.parameters = { controls: { exclude: ['isInverse'] } };

export const Flat = args => {
  return (
    <TreeView {...args} style={{ width: '100%' }}>
      <TreeItem
        label="Node 0"
        itemId="item0"
        style={{ background: magma.colors.neutral200 }}
      />
      <TreeItem
        label={
          <Flex behavior={FlexBehavior.container} style={{ width: '100%' }}>
            <span style={{ flex: '1 1 auto' }}>Node 1</span>
            <span style={{ flex: '0 0 auto' }}>
              <Button
                size={ButtonSize.small}
                onClick={() => {
                  console.log('action button clicked');
                }}
              >
                Action
              </Button>
            </span>
          </Flex>
        }
        itemId="item1"
      />
      <TreeItem
        label={
          <Flex behavior={FlexBehavior.container} style={{ width: '100%' }}>
            <span style={{ flex: '1 1 auto' }}>Node 2</span>
            <span style={{ flex: '0 0 auto' }}>
              <Button
                size={ButtonSize.small}
                onClick={() => {
                  console.log('action button clicked');
                }}
              >
                Action
              </Button>
            </span>
          </Flex>
        }
        itemId="item2"
        style={{ background: magma.colors.neutral200 }}
      />
      <TreeItem label="Node 3" itemId="item3" />
    </TreeView>
  );
};

Flat.args = {
  selectable: TreeViewSelectable.off,
};

Flat.parameters = { controls: { exclude: ['isInverse'] } };


export const Here = (args) => {

  const testId = 'testId';
  const labelText = 'labelText';
  const itemId = 'itemId';

  return (
    <TreeView testId={testId} {...args}>
      <TreeItem
        label='item1'
        testId='item1'
        itemId='item1'
        onClick={() => console.log('43434')}
        icon={<FavoriteIcon />}
      >
        {/* <TreeItem
          label={`${labelText}-child`}
          testId={`${testId}-child`}
          itemId={`${itemId}-child`}
          icon={<FavoriteIcon />}
          onClick={() => console.log('child')}
        /> */}
      </TreeItem>
      {/* <TreeItem
        label='item2'
        testId='item2'
        itemId='item2'
        onClick={() => console.log('43434')}
        isDisabled
      >
        <TreeItem
          label={`${labelText}-child2`}
          testId={`${testId}-child2`}
          itemId={`${itemId}-child2`}
          icon={<FavoriteIcon />}
          onClick={() => console.log('child2')}
        /> */}
        <TreeItem
          label={`${labelText}-child3`}
          testId={`${testId}-child3`}
          itemId={`${itemId}-child3`}
          icon={<FavoriteIcon />}
          onClick={() => console.log('child3')}
          
        />
      {/* </TreeItem> */}
    </TreeView>
  );
}

Here.args = {
  initialExpandedItems: ['item1', 'item2']
}
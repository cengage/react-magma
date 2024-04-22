import React from 'react';
import { TreeView, TreeItem, TreeViewSelectable } from '.';
import { magma } from '../../theme/magma';

import {
  ArticleIcon,
  FolderIcon,
  FavoriteIcon,
  StarIcon,
  EmergencyIcon,
} from 'react-magma-icons';
import { Meta } from '@storybook/react/types-6-0';
import { Card } from '../Card';
import { Paragraph } from '../Paragraph';
import {
  Tag,
  TagSize,
  Button,
  Flex,
  FlexBehavior,
  IndeterminateCheckboxStatus,
} from '../..';
import { ButtonSize } from '../Button';
import { FlexAlignContent, FlexAlignItems } from '../Flex';
import { TagColor } from '../Tag';

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
      options: [
        TreeViewSelectable.single,
        TreeViewSelectable.multi,
        TreeViewSelectable.off,
      ],
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
  const [indeterminateItems, setIndeterminateItems] = React.useState(null);
  const [total, setTotal] = React.useState(null);

  function onSelection(items) {
    const selected = items
      .filter(i => i.checkedStatus === IndeterminateCheckboxStatus.checked)
      .map((i, key) => (
        <Tag key={key} size={TagSize.small} color={TagColor.primary}>
          {i.itemId}
        </Tag>
      ));

    const indet = items
      .filter(
        i => i.checkedStatus === IndeterminateCheckboxStatus.indeterminate
      )
      .map((i, key) => (
        <Tag key={key} size={TagSize.small} color={TagColor.default}>
          {i.itemId}
        </Tag>
      ));

    setSelectedItems(selected);
    setIndeterminateItems(indet);
    setTotal(items.length);
    console.log('onSelection event:', items);
  }

  return (
    <>
      <Card isInverse={args.isInverse}>
        <TreeView {...args} onSelectedItemChange={onSelection}>
          <TreeItem label={<>Part 1: Introduction</>} itemId="pt1" testId="pt1">
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 1: I love tiramisu jelly beans soufflé</>}
              itemId="pt1ch1"
              testId="pt1ch1"
              // isDisabled
            >
              <TreeItem
                icon={<ArticleIcon />}
                label={<>Section 1.1: Cake donut lemon drops gingerbread</>}
                itemId="pt1ch1.1"
              />
            </TreeItem>
            <TreeItem
              label={
                <>
                  Chapter 2: Chocolate bar ice cream cake liquorice icing tart
                </>
              }
              // isDisabled
              itemId="pt1ch2"
            />
            <TreeItem
              icon={<FolderIcon />}
              label={
                <>Chapter 3: Pudding jujubes icing fruitcake bonbon icing</>
              }
              itemId="pt1ch3"
            >
              <TreeItem
                icon={<ArticleIcon />}
                label={
                  <>
                    Section 3.1: Topping pudding marshmallow caramels I love pie
                  </>
                }
                itemId="pt1ch3.1"
              />
              <TreeItem
                icon={<ArticleIcon />}
                label={
                  <>
                    Section 3.2: Tart sweet roll caramels candy canes sweet roll
                  </>
                }
                itemId="pt1ch3.2"
              />
              <TreeItem
                icon={<ArticleIcon />}
                label={
                  <>
                    Section 3.3: Tart sweet roll caramels candy canes sweet roll
                  </>
                }
                itemId="pt1ch3.3"
              />
            </TreeItem>
          </TreeItem>
          <TreeItem
            icon={<FolderIcon />}
            label={
              <>
                Part 2: Candy powder carrot cake cotton candy marshmallow
                caramels croissant I love
              </>
            }
            itemId="pt2"
          >
            <TreeItem
              icon={<ArticleIcon />}
              label={
                <>
                  Chapter 4: I love carrot cake sweet roll I love liquorice
                  sweet
                </>
              }
              itemId="pt2ch4"
            />
            <TreeItem
              icon={<FolderIcon />}
              label={
                <>
                  Chapter 5: Wafer I love I love sesame snaps I love muffin
                  dragée halvah
                </>
              }
              itemId="pt2ch5"
            >
              <TreeItem
                icon={<ArticleIcon />}
                label={
                  <>
                    Section 5.1: Apple pie apple pie tart macaroon topping
                    chocolate cake
                  </>
                }
                itemId="pt2ch5.1"
              >
                <TreeItem
                  icon={<ArticleIcon />}
                  label={
                    <>
                      Section 5.1.1: Apple pie apple pie tart macaroon topping
                      chocolate cake
                    </>
                  }
                  itemId="pt2ch5.1.1"
                />
                <TreeItem
                  icon={<ArticleIcon />}
                  label={
                    <>
                      Section 5.1.2: Apple pie apple pie tart macaroon topping
                      chocolate cake
                    </>
                  }
                  itemId="pt2ch5.1.2"
                />
              </TreeItem>
              <TreeItem
                icon={<ArticleIcon />}
                label={
                  <>
                    Section 5.2: Jelly lollipop tart gummies pie croissant
                    sesame snaps sesame snaps
                  </>
                }
                itemId="pt2ch5.2"
              />
              <TreeItem
                icon={<ArticleIcon />}
                label={
                  <>
                    Section 5.3: Bonbon chocolate bar lollipop lollipop I love
                    chocolate cake cupcake soufflé pie
                  </>
                }
                itemId="pt2ch5.3"
              />
            </TreeItem>
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 6: Cupcake dragée I love cookie I love</>}
              itemId="pt2ch6"
            />
          </TreeItem>
          {/* <TreeItem
            icon={<FolderIcon />}
            label={
              <>
                Part 3: Sugar plum halvah shortbread apple pie I love brownie
                gummi bears
              </>
            }
            itemId="pt3"
          >
            <TreeItem
              icon={<ArticleIcon />}
              label={
                <>
                  Chapter 7: Cheesecake lollipop tootsie roll candy canes
                  cupcake I love dessert liquorice
                </>
              }
              itemId="pt3ch7"
            />
            <TreeItem
              icon={<ArticleIcon />}
              label={
                <>
                  Chapter 8: Jelly pastry jelly-o topping cookie carrot cake
                  shortbread
                </>
              }
              itemId="pt3ch8"
            />
            <TreeItem
              icon={<ArticleIcon />}
              label={
                <>Chapter 9: Jelly beans sweet candy canes croissant bonbon.</>
              }
              itemId="pt3ch9"
            />
            <TreeItem
              icon={<ArticleIcon />}
              label={
                <>
                  Chapter 10: Wafer carrot cake powder candy canes sweet roll
                  bear claw croissant cheesecake tart
                </>
              }
              itemId="pt3ch10"
            />
            <TreeItem
              icon={<ArticleIcon />}
              label={
                <>
                  Chapter 11: Apple pie chocolate cake tiramisu bonbon I love
                  croissant. I love chupa chups croissant tiramisu toffee cake
                  tart
                </>
              }
              itemId="pt3ch11"
            />
          </TreeItem> */}
        </TreeView>
      </Card>
      <br />
      {args.selectable !== TreeViewSelectable.off && (
        <>
          <p>{total} total</p>
          <p>Selected: {selectedItems}</p>
          {args.selectable === TreeViewSelectable.multi && (
            <p>Indeterminate: {indeterminateItems}</p>
          )}
        </>
      )}
    </>
  );
};

Default.args = {
  selectable: TreeViewSelectable.multi,
  ariaLabel: 'Textbook tree',
  initialExpandedItems: ['pt1', 'pt1ch1'],
  initialSelectedItems: [
    { itemId: 'pt1ch1', checkedStatus: IndeterminateCheckboxStatus.checked },
    { itemId: 'pt1', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
    { itemId: 'pt2ch4', checkedStatus: IndeterminateCheckboxStatus.checked },
    // { itemId: 'pt2ch5', checkedStatus: IndeterminateCheckboxStatus.checked },
    {
      itemId: 'pt2ch5.1.1',
      checkedStatus: IndeterminateCheckboxStatus.checked,
    },
    { itemId: 'pt2ch5.2', checkedStatus: IndeterminateCheckboxStatus.checked },
    { itemId: 'pt2ch5.3', checkedStatus: IndeterminateCheckboxStatus.checked },
  ],
  testId: 'default-example',
};

export const NoIcons = args => {
  const [selectedItems, setSelectedItems] = React.useState(null);
  const [indeterminateItems, setIndeterminateItems] = React.useState(null);

  function onSelection(items) {
    const selected = items
      .filter(i => i.checkedStatus === IndeterminateCheckboxStatus.checked)
      .map((i, key) => (
        <Tag key={key} size={TagSize.small} color={TagColor.primary}>
          {i.itemId}
        </Tag>
      ));

    const indet = items
      .filter(
        i => i.checkedStatus === IndeterminateCheckboxStatus.indeterminate
      )
      .map((i, key) => (
        <Tag key={key} size={TagSize.small} color={TagColor.default}>
          {i.itemId}
        </Tag>
      ));

    setSelectedItems(selected);
    setIndeterminateItems(indet);
    // console.log('onSelection event:', items);
  }

  return (
    <>
      <Card isInverse={args.isInverse}>
        <TreeView {...args} onSelectedItemChange={onSelection}>
          <TreeItem label={<>Home</>} itemId="home">
            <TreeItem label={<>Bath</>} itemId="bath">
              <TreeItem label={<>Bathroom Storage</>} itemId="bathstorage">
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
        <>
          <p>Selected: {selectedItems}</p>
          {args.selectable === TreeViewSelectable.multi && (
            <p>Indeterminate: {indeterminateItems}</p>
          )}
        </>
      )}
    </>
  );
};

NoIcons.args = {
  initialExpandedItems: ['home', 'storage'],
  initialSelectedItems: [
    { itemId: 'storage-2', checkedStatus: IndeterminateCheckboxStatus.checked },
  ],
};

export const Textbook = args => {
  const [selectedItems, setSelectedItems] = React.useState(null);
  const [indeterminateItems, setIndeterminateItems] = React.useState(null);
  const [total, setTotal] = React.useState(null);

  function onSelection(items) {
    const selected = items
      .filter(i => i.checkedStatus === IndeterminateCheckboxStatus.checked)
      .map((i, key) => (
        <Tag key={key} size={TagSize.small} color={TagColor.primary}>
          {i.itemId}
        </Tag>
      ));

    const indet = items
      .filter(
        i => i.checkedStatus === IndeterminateCheckboxStatus.indeterminate
      )
      .map((i, key) => (
        <Tag key={key} size={TagSize.small} color={TagColor.default}>
          {i.itemId}
        </Tag>
      ));

    setSelectedItems(selected);
    setIndeterminateItems(indet);
    setTotal(items.length);
    // console.log('onSelection event:', items);
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
        <>
          <p>{total} total</p>
          <p>Selected: {selectedItems}</p>
          {args.selectable === TreeViewSelectable.multi && (
            <p>Indeterminate: {indeterminateItems}</p>
          )}
        </>
      )}
    </>
  );
};

Textbook.args = {
  ariaLabelledBy: 'ah-textbook',
};

export const Simple = args => {
  const [selectedItems, setSelectedItems] = React.useState(null);
  const [indeterminateItems, setIndeterminateItems] = React.useState(null);
  const [total, setTotal] = React.useState(null);

  function onSelection(items) {
    const selected = items
      .filter(i => i.checkedStatus === IndeterminateCheckboxStatus.checked)
      .map((i, key) => (
        <Tag key={key} size={TagSize.small} color={TagColor.primary}>
          {i.itemId}
        </Tag>
      ));

    const indet = items
      .filter(
        i => i.checkedStatus === IndeterminateCheckboxStatus.indeterminate
      )
      .map((i, key) => (
        <Tag key={key} size={TagSize.small} color={TagColor.default}>
          {i.itemId}
        </Tag>
      ));

    setSelectedItems(selected);
    setIndeterminateItems(indet);
    setTotal(items.length);
    // console.log('onSelection event:', items);
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
        <>
          <p>{total} total</p>
          <p>Selected: {selectedItems}</p>
          {args.selectable === TreeViewSelectable.multi && (
            <p>Indeterminate: {indeterminateItems}</p>
          )}
        </>
      )}
    </>
  );
};

Simple.parameters = { controls: { exclude: ['isInverse'] } };

export const DefaultIcon = args => {
  const [selectedItems, setSelectedItems] = React.useState(null);
  const [indeterminateItems, setIndeterminateItems] = React.useState(null);

  function onSelection(items) {
    const selected = items
      .filter(i => i.checkedStatus === IndeterminateCheckboxStatus.checked)
      .map((i, key) => (
        <Tag key={key} size={TagSize.small} color={TagColor.primary}>
          {i.itemId}
        </Tag>
      ));

    const indet = items
      .filter(
        i => i.checkedStatus === IndeterminateCheckboxStatus.indeterminate
      )
      .map((i, key) => (
        <Tag key={key} size={TagSize.small} color={TagColor.default}>
          {i.itemId}
        </Tag>
      ));

    setSelectedItems(selected);
    setIndeterminateItems(indet);
    console.log('onSelection event:', items);
  }

  return (
    <>
      <TreeView {...args} onSelectedItemChange={onSelection}>
        <TreeItem
          icon={<FavoriteIcon />}
          itemId="1"
          label={<>I have an icon</>}
          labelStyle={{ color: magma.colors.info700, fontWeight: '600' }}
        />
        <TreeItem
          icon={<StarIcon />}
          itemId="2"
          label={<>I have an icon</>}
          labelStyle={{ color: magma.colors.danger700, fontWeight: '700' }}
          style={{ background: magma.colors.info100 }}
        />
        <TreeItem itemId="3" label={<>Branch with no icon</>}>
          <TreeItem
            itemId="4"
            label={<>I am a leaf without an icon</>}
            style={{ background: magma.colors.info100 }}
          />
          <TreeItem
            icon={<EmergencyIcon style={{ color: magma.colors.danger500 }} />}
            itemId="5"
            label={<>I have an icon too</>}
          >
            <TreeItem itemId="6" label={<>Child</>} />
          </TreeItem>
        </TreeItem>
      </TreeView>
      <br />
      {args.selectable !== TreeViewSelectable.off && (
        <>
          <p>Selected: {selectedItems}</p>
          {args.selectable === TreeViewSelectable.multi && (
            <p>Indeterminate: {indeterminateItems}</p>
          )}
        </>
      )}
    </>
  );
};

DefaultIcon.parameters = { controls: { exclude: ['isInverse'] } };

export const FirstItemLeaf = args => {
  const [selectedItems, setSelectedItems] = React.useState(null);
  const [indeterminateItems, setIndeterminateItems] = React.useState(null);

  function onSelection(items) {
    const selected = items
      .filter(i => i.checkedStatus === IndeterminateCheckboxStatus.checked)
      .map((i, key) => (
        <Tag key={key} size={TagSize.small} color={TagColor.primary}>
          {i.itemId}
        </Tag>
      ));

    const indet = items
      .filter(
        i => i.checkedStatus === IndeterminateCheckboxStatus.indeterminate
      )
      .map((i, key) => (
        <Tag key={key} size={TagSize.small} color={TagColor.default}>
          {i.itemId}
        </Tag>
      ));

    setSelectedItems(selected);
    setIndeterminateItems(indet);
    // console.log('onSelection event:', items);
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
        <>
          <p>Selected: {selectedItems}</p>
          {args.selectable === TreeViewSelectable.multi && (
            <p>Indeterminate: {indeterminateItems}</p>
          )}
        </>
      )}
    </>
  );
};

FirstItemLeaf.args = {
  initialExpandedItems: ['item1', 'item2', 'item-child2'],
  initialSelectedItems: [
    { itemId: 'item6', checkedStatus: IndeterminateCheckboxStatus.checked },
  ],
};

FirstItemLeaf.parameters = { controls: { exclude: ['isInverse'] } };

export const Flat = args => {
  return (
    <TreeView {...args} style={{ width: '100%' }}>
      <TreeItem
        label={<Paragraph noMargins>Node 0</Paragraph>}
        itemId="item0"
        style={{ background: magma.colors.neutral200 }}
      />
      <TreeItem
        label={
          <Flex
            behavior={FlexBehavior.container}
            alignContent={FlexAlignContent.center}
            alignItems={FlexAlignItems.baseline}
          >
            <span style={{ flex: '1 1 auto' }}>
              <Paragraph noMargins>Node 1</Paragraph>
            </span>
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
          <Flex
            behavior={FlexBehavior.container}
            alignContent={FlexAlignContent.center}
            alignItems={FlexAlignItems.baseline}
          >
            <span style={{ flex: '1 1 auto' }}>
              <Paragraph noMargins>Node 2</Paragraph>
            </span>
            <span style={{ flex: '0 0 auto' }}>
              <Tag size={TagSize.small}>One</Tag>
              <Tag size={TagSize.small}>Two</Tag>
              <Tag size={TagSize.small}>Three</Tag>
            </span>
          </Flex>
        }
        itemId="item2"
        style={{ background: magma.colors.neutral200 }}
      />
      <TreeItem
        label={<Paragraph noMargins>Node 3</Paragraph>}
        itemId="item3"
      />
    </TreeView>
  );
};

Flat.args = {
  selectable: TreeViewSelectable.off,
};

Flat.parameters = { controls: { exclude: ['isInverse'] } };

export const UnitTest = args => {
  const [selectedItems, setSelectedItems] = React.useState(null);
  const [indeterminateItems, setIndeterminateItems] = React.useState(null);

  function onSelection(items) {
    const selected = items
      .filter(i => i.checkedStatus === IndeterminateCheckboxStatus.checked)
      .map((i, key) => (
        <Tag key={key} size={TagSize.small} color={TagColor.primary}>
          {i.itemId}
        </Tag>
      ));

    const indet = items
      .filter(
        i => i.checkedStatus === IndeterminateCheckboxStatus.indeterminate
      )
      .map((i, key) => (
        <Tag key={key} size={TagSize.small} color={TagColor.default}>
          {i.itemId}
        </Tag>
      ));

    setSelectedItems(selected);
    setIndeterminateItems(indet);
    console.log('onSelection event:', items);
  }

  return (
    <>
      {/* <TreeView
        onSelectedItemChange={onSelection}
        selectable={TreeViewSelectable.multi}
        // initialExpandedItems={['item2', 'item-child2.1',]}
        // initialSelectedItems={[
        //   {
        //     itemId: 'item-ggchild3',
        //     checkedStatus: IndeterminateCheckboxStatus.checked,
        //   },
        //   {
        //     itemId: 'item-child3',
        //     checkedStatus: IndeterminateCheckboxStatus.checked,
        //   },
        // ]}
      >
        <TreeItem label="Node 0" itemId="item0" testId="item0" />
        <TreeItem label="Node 1" itemId="item1" testId="item1">
          <TreeItem label="Child 1" itemId="item-child1" testId="item-child1" />
        </TreeItem>
        <TreeItem label="Node 2" itemId="item2" testId="item2">
          <TreeItem
            label="Child 2"
            itemId="item-child2.1"
            testId="item-child2.1"
          >
            <TreeItem
              label="Grandchild 2"
              itemId="item-gchild2"
              testId="item-gchild2"
            >
              <TreeItem
                label="Great-grandchild 1"
                itemId="item-ggchild1"
                testId="item-ggchild1"
              /><TreeItem
                label="Great-grandchild 2"
                itemId="item-ggchild2"
                testId="item-ggchild2"
              />
              <TreeItem
                label="Great-grandchild 3"
                itemId="item-ggchild3"
                testId="item-ggchild3"
              />
            </TreeItem>
          </TreeItem>
        </TreeItem>
        <TreeItem label="Node 3" itemId="item3" testId="item3">
          <TreeItem label="Child 3" itemId="item-child3" testId="item-child3" />
          <TreeItem
            label="Child 3.1"
            itemId="item-child3.1"
            testId="item-child3.1"
          />
        </TreeItem>
      </TreeView> */}

      {/* one level */}
      <TreeView
        testId={'tree-view'}
        onSelectedItemChange={onSelection}
        initialSelectedItems={[
          {
            itemId: 'item-child1',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'item2',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
        ]}
        // initialExpandedItems={['item1', 'item2']}
        selectable={TreeViewSelectable.multi}
      >
        {/* <TreeItem label="Node 0" itemId="item0" testId="item0" /> */}
        <TreeItem label="Node 1" itemId="item1" testId="item1">
          <TreeItem label="Child 1" itemId="item-child1" testId="item-child1" />
          <TreeItem label="Child 2" itemId="item-child2" testId="item-child2" />
        </TreeItem>
        <TreeItem label="Node 2" itemId="item2" testId="item2">
          <TreeItem
            label="Child 2.1"
            itemId="item-child2.1"
            testId="item-child2.1"
          />
          <TreeItem
            label="Child 2.2"
            itemId="item-child2.2"
            testId="item-child2.2"
          />{' '}
          <TreeItem
            label="Child 2.3"
            itemId="item-child2.3"
            testId="item-child2.3"
          />
        </TreeItem>
        <TreeItem label="Node 3" itemId="item3" testId="item3">
          <TreeItem label="Child 3" itemId="item-child3" testId="item-child3" />
        </TreeItem>
      </TreeView>

      {/* single item */}
      {/* <TreeItem label={'labelText'} itemId="parent" testId={'testId'} isDisabled>
          <TreeItem
            label={`${'labelText'}-child`}
            testId={`${'testId'}-child`}
            itemId="child"
          />
        </TreeItem> */}

      <br />

      <p>Selected: {selectedItems}</p>
      <p>Indeterminate: {indeterminateItems}</p>
    </>
  );
};

export const Animals = () => {
  const [selectedItems, setSelectedItems] = React.useState(null);
  const [indeterminateItems, setIndeterminateItems] = React.useState(null);
  const [total, setTotal] = React.useState(null);

  function onSelection(items) {
    const selected = items
      .filter(i => i.checkedStatus === IndeterminateCheckboxStatus.checked)
      .map((i, key) => (
        <Tag key={key} size={TagSize.small} color={TagColor.primary}>
          {i.itemId}
        </Tag>
      ));

    const indet = items
      .filter(
        i => i.checkedStatus === IndeterminateCheckboxStatus.indeterminate
      )
      .map((i, key) => (
        <Tag key={key} size={TagSize.small} color={TagColor.default}>
          {i.itemId}
        </Tag>
      ));

    setSelectedItems(selected);
    setIndeterminateItems(indet);
    setTotal(items.length);
    console.log('onSelection event:', items);
  }

  return (
    <>
      <TreeView
        ariaLabel="initial-selected-treeview"
        selectable={TreeViewSelectable.multi}
        initialSelectedItems={[
          {
            itemId: 'Labrador Retriever',
            checkedStatus: IndeterminateCheckboxStatus.checked,
          },
          {
            itemId: 'Dogs',
            checkedStatus: IndeterminateCheckboxStatus.indeterminate,
          },
          {
            itemId: 'Mammals',
            checkedStatus: IndeterminateCheckboxStatus.indeterminate,
          },
        ]}
        onSelectedItemChange={onSelection}
      >
        <TreeItem label="Mammals" itemId="Mammals">
          <TreeItem label="Dogs" itemId="Dogs">
            <TreeItem label="German Shepherd" itemId="German Shepherd" />
            <TreeItem label="Labrador Retriever" itemId="Labrador Retriever" />
            <TreeItem label="American Bully" itemId="American Bully" />
          </TreeItem>
          <TreeItem label="Cats" itemId="Cats">
            <TreeItem label="Siamese" itemId="Siamese" />
            <TreeItem label="Persian" itemId="Persian" />
            <TreeItem label="Bengal" itemId="Bengal" />
          </TreeItem>
        </TreeItem>
        <TreeItem label="Birds" itemId="Birds">
          <TreeItem label="Parrots" itemId="Parrots">
            <TreeItem label="African Grey" itemId="African Grey" />
            <TreeItem label="Cockatiel" itemId="Cockatiel" />
            <TreeItem label="Budgerigar" itemId="Budgerigar" />
          </TreeItem>
          <TreeItem label="Birds of Prey" itemId="Birds of Prey">
            <TreeItem label="Eagles" itemId="Eagles" />
            <TreeItem label="Hawks" itemId="Hawks" />
            <TreeItem label="Falcons" itemId="Falcons" />
          </TreeItem>
        </TreeItem>
        <TreeItem label="Amphibians" itemId="Amphibians" />
      </TreeView>
      <>
        <p>{total} total</p>
        <p>Selected: {selectedItems}</p>
        <p>Indeterminate: {indeterminateItems}</p>
      </>
    </>
  );
};

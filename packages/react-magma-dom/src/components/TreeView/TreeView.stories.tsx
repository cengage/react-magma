import React from 'react';
import { TreeView, TreeItem, TreeViewSelectable, TreeViewApi } from '.';
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
  TreeItemSelectedInterface,
  TreeViewProps,
  ButtonVariant,
  ButtonGroup,
  Spacer,
  SpacerAxis,
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
    checkParents: {
      control: 'boolean',
      defaultValue: true,
    },
    checkChildren: {
      control: 'boolean',
      defaultValue: true,
    },
  },
} as Meta;

function createTags(items: TreeItemSelectedInterface[]) {
  const selected = items
    ?.filter(i => i.checkedStatus === IndeterminateCheckboxStatus.checked)
    .map((i, key) => (
      <Tag key={key} size={TagSize.small} color={TagColor.primary}>
        {i.itemId}
      </Tag>
    ));

  const indeterminate = items
    ?.filter(i => i.checkedStatus === IndeterminateCheckboxStatus.indeterminate)
    .map((i, key) => (
      <Tag key={key} size={TagSize.small} color={TagColor.default}>
        {i.itemId}
      </Tag>
    ));

  return {
    selected,
    indeterminate,
  };
}

function createControlledTags(
  items: TreeItemSelectedInterface[] = [],
  api?: TreeViewApi
) {
  const selected = items
    ?.filter(i => i.checkedStatus === IndeterminateCheckboxStatus.checked)
    .map((i, key) => (
      <Tag
        key={key}
        size={TagSize.small}
        color={TagColor.primary}
        onDelete={() =>
          api?.selectItem({
            itemId: i.itemId,
            checkedStatus: IndeterminateCheckboxStatus.unchecked,
          })
        }
      >
        {i.itemId}
      </Tag>
    ));

  const indeterminate = items
    ?.filter(i => i.checkedStatus === IndeterminateCheckboxStatus.indeterminate)
    .map((i, key) => (
      <Tag
        key={key}
        size={TagSize.small}
        color={TagColor.default}
        onDelete={() =>
          api?.selectItem({
            itemId: i.itemId,
            checkedStatus: IndeterminateCheckboxStatus.unchecked,
          })
        }
      >
        {i.itemId}
      </Tag>
    ));

  return {
    selected,
    indeterminate,
  };
}

export const Simple = (args: Partial<TreeViewProps>) => {
  const [selectedItems, setSelectedItems] = React.useState<
    React.ReactNode[] | null
  >(null);
  const [indeterminateItems, setIndeterminateItems] = React.useState<
    React.ReactNode[] | null
  >(null);
  const [total, setTotal] = React.useState(selectedItems?.length || 0);

  function onSelection(items: TreeItemSelectedInterface[]) {
    const selected = createTags(items).selected;
    const indet = createTags(items).indeterminate;
    setSelectedItems(selected);
    setIndeterminateItems(indet);
    setTotal(items.length);
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

export const Complex = (args: Partial<TreeViewProps>) => {
  const [selectedItems, setSelectedItems] =
    React.useState<TreeItemSelectedInterface[]>();

  const [expandedItems, setExpandedItems] = React.useState<string[]>();
  const apiRef = React.useRef<TreeViewApi>();

  const { selected, indeterminate } = createControlledTags(
    selectedItems,
    apiRef?.current
  );
  const total = selectedItems?.length ?? 0;

  const handleExpandedChange = (
    event: React.SyntheticEvent,
    expandedItems: string[]
  ) => {
    setExpandedItems(expandedItems);
  };

  return (
    <>
      <Card isInverse={args.isInverse}>
        <TreeView
          {...args}
          apiRef={apiRef}
          onSelectedItemChange={setSelectedItems}
          onExpandedChange={handleExpandedChange}
        >
          <TreeItem label={<>Part 1: Introduction</>} itemId="pt1" testId="pt1">
            <TreeItem
              icon={<FolderIcon aria-hidden={true} />}
              label={<>Chapter 1: I love tiramisu jelly beans soufflé</>}
              itemId="pt1ch1"
              testId="pt1ch1"
            >
              <TreeItem
                icon={<ArticleIcon aria-hidden={true} />}
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
              itemId="pt1ch2"
            />
            <TreeItem
              icon={<FolderIcon aria-hidden={true} />}
              label={
                <>Chapter 3: Pudding jujubes icing fruitcake bonbon icing</>
              }
              itemId="pt1ch3"
            >
              <TreeItem
                icon={<ArticleIcon aria-hidden={true} />}
                label={
                  <>
                    Section 3.1: Topping pudding marshmallow caramels I love pie
                  </>
                }
                itemId="pt1ch3.1"
              />
              <TreeItem
                icon={<ArticleIcon aria-hidden={true} />}
                label={
                  <>
                    Section 3.2: Tart sweet roll caramels candy canes sweet roll
                  </>
                }
                itemId="pt1ch3.2"
              />
              <TreeItem
                icon={<ArticleIcon aria-hidden={true} />}
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
            icon={<FolderIcon aria-hidden={true} />}
            label={
              <>
                Part 2: Candy powder carrot cake cotton candy marshmallow
                caramels croissant I love
              </>
            }
            itemId="pt2"
          >
            <TreeItem
              icon={<ArticleIcon aria-hidden={true} />}
              label={
                <>
                  Chapter 4: I love carrot cake sweet roll I love liquorice
                  sweet
                </>
              }
              itemId="pt2ch4"
            />
            <TreeItem
              icon={<FolderIcon aria-hidden={true} />}
              label={
                <>
                  Chapter 5: Wafer I love I love sesame snaps I love muffin
                  dragée halvah
                </>
              }
              itemId="pt2ch5"
            >
              <TreeItem
                icon={<ArticleIcon aria-hidden={true} />}
                label={
                  <>
                    Section 5.1: Apple pie apple pie tart macaroon topping
                    chocolate cake
                  </>
                }
                itemId="pt2ch5.1"
                isDisabled
              >
                <TreeItem
                  icon={<ArticleIcon aria-hidden={true} />}
                  label={
                    <>
                      Section 5.1.1: Apple pie apple pie tart macaroon topping
                      chocolate cake
                    </>
                  }
                  itemId="pt2ch5.1.1"
                  isDisabled
                />
                <TreeItem
                  icon={<ArticleIcon aria-hidden={true} />}
                  label={
                    <>
                      Section 5.1.2: Apple pie apple pie tart macaroon topping
                      chocolate cake
                    </>
                  }
                  itemId="pt2ch5.1.2"
                />
                <TreeItem
                  icon={<ArticleIcon aria-hidden={true} />}
                  label={
                    <>
                      Section 5.1.3: Apple pie apple pie tart macaroon topping
                      chocolate cake
                    </>
                  }
                  itemId="pt2ch5.1.3"
                >
                  <TreeItem
                    icon={<ArticleIcon aria-hidden={true} />}
                    label={
                      <>
                        Section 5.1.3.1: Apple pie apple pie tart macaroon
                        topping chocolate cake
                      </>
                    }
                    itemId="pt2ch5.1.3.1"
                  />
                  <TreeItem
                    icon={<ArticleIcon aria-hidden={true} />}
                    label={
                      <>
                        Section 5.1.3.2: Apple pie apple pie tart macaroon
                        topping chocolate cake
                      </>
                    }
                    itemId="pt2ch5.1.3.2"
                  />
                  <TreeItem
                    icon={<ArticleIcon aria-hidden={true} />}
                    label={
                      <>
                        Section 5.1.3.3: Apple pie apple pie tart macaroon
                        topping chocolate cake
                      </>
                    }
                    itemId="pt2ch5.1.3.3"
                  />
                </TreeItem>
              </TreeItem>
              <TreeItem
                icon={<ArticleIcon aria-hidden={true} />}
                label={
                  <>
                    Section 5.2: Jelly lollipop tart gummies pie croissant
                    sesame snaps sesame snaps
                  </>
                }
                itemId="pt2ch5.2"
              />
              <TreeItem
                icon={<ArticleIcon aria-hidden={true} />}
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
              icon={<ArticleIcon aria-hidden={true} />}
              label={<>Chapter 6: Cupcake dragée I love cookie I love</>}
              itemId="pt2ch6"
            />
          </TreeItem>
          <TreeItem
            icon={<FolderIcon aria-hidden={true} />}
            label={
              <>
                Part 3: Sugar plum halvah shortbread apple pie I love brownie
                gummi bears
              </>
            }
            itemId="pt3"
          >
            <TreeItem
              icon={<ArticleIcon aria-hidden={true} />}
              label={
                <>
                  Chapter 7: Cheesecake lollipop tootsie roll candy canes
                  cupcake I love dessert liquorice
                </>
              }
              itemId="pt3ch7"
            />
            <TreeItem
              icon={<ArticleIcon aria-hidden={true} />}
              label={
                <>
                  Chapter 8: Jelly pastry jelly-o topping cookie carrot cake
                  shortbread
                </>
              }
              itemId="pt3ch8"
            />
            <TreeItem
              icon={<ArticleIcon aria-hidden={true} />}
              label={
                <>Chapter 9: Jelly beans sweet candy canes croissant bonbon.</>
              }
              itemId="pt3ch9"
            />
            <TreeItem
              icon={<ArticleIcon aria-hidden={true} />}
              label={
                <>
                  Chapter 10: Wafer carrot cake powder candy canes sweet roll
                  bear claw croissant cheesecake tart
                </>
              }
              itemId="pt3ch10"
            />
            <TreeItem
              icon={<ArticleIcon aria-hidden={true} />}
              label={
                <>
                  Chapter 11: Apple pie chocolate cake tiramisu bonbon I love
                  croissant. I love chupa chups croissant tiramisu toffee cake
                  tart
                </>
              }
              itemId="pt3ch11"
            />
          </TreeItem>
        </TreeView>
      </Card>
      <br />
      {args.selectable !== TreeViewSelectable.off && (
        <>
          <p>{total} total</p>
          <p>Selected: {selected}</p>
          {args.selectable === TreeViewSelectable.multi && (
            <p>Indeterminate: {indeterminate}</p>
          )}
        </>
      )}
      <ButtonGroup size={ButtonSize.small} variant={ButtonVariant.solid}>
        <Button onClick={() => apiRef.current?.selectAll()}>Select all</Button>
        <Button onClick={() => apiRef.current?.clearAll()}>Clear all</Button>
      </ButtonGroup>
      <Spacer axis={SpacerAxis.vertical} size={24} />
      <p>Expanded: {expandedItems?.join(', ')}</p>
    </>
  );
};

Complex.args = {
  selectable: TreeViewSelectable.multi,
  ariaLabel: 'Textbook tree',
  initialExpandedItems: ['pt1', 'pt2ch5.1'],
  preselectedItems: [
    { itemId: 'pt1ch1', checkedStatus: IndeterminateCheckboxStatus.checked },
    { itemId: 'pt1', checkedStatus: IndeterminateCheckboxStatus.indeterminate },
    { itemId: 'pt2ch4', checkedStatus: IndeterminateCheckboxStatus.checked },
    {
      itemId: 'pt2ch5.1.1',
      checkedStatus: IndeterminateCheckboxStatus.checked,
    },
    {
      itemId: 'pt2ch5.1.2',
      checkedStatus: IndeterminateCheckboxStatus.unchecked,
      isDisabled: true,
    },
    { itemId: 'pt2ch5.2', checkedStatus: IndeterminateCheckboxStatus.checked },
    { itemId: 'pt2ch5.3', checkedStatus: IndeterminateCheckboxStatus.checked },
    {
      itemId: 'pt2ch5.1.3',
      checkedStatus: IndeterminateCheckboxStatus.checked,
    },
  ],
  checkParents: true,
  checkChildren: true,
  isDisabled: false,
  testId: 'complex-example',
};

export const NoIcons = (args: Partial<TreeViewProps>) => {
  const [selectedItems, setSelectedItems] = React.useState<
    React.ReactNode[] | null
  >(null);
  const [indeterminateItems, setIndeterminateItems] = React.useState<
    React.ReactNode[] | null
  >(null);

  function onSelection(items: TreeItemSelectedInterface[]) {
    const selected = createTags(items).selected;
    const indet = createTags(items).indeterminate;
    setSelectedItems(selected);
    setIndeterminateItems(indet);
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
                <TreeItem label={<>Item 2</>} itemId="towels-2" />
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
  preselectedItems: [
    { itemId: 'storage-2', checkedStatus: IndeterminateCheckboxStatus.checked },
  ],
};

export const Textbook = (args: Partial<TreeViewProps>) => {
  const [selectedItems, setSelectedItems] = React.useState<
    React.ReactNode[] | null
  >(null);
  const [indeterminateItems, setIndeterminateItems] = React.useState<
    React.ReactNode[] | null
  >(null);
  const [total, setTotal] = React.useState(selectedItems?.length || 0);

  function onSelection(items: TreeItemSelectedInterface[]) {
    const selected = createTags(items).selected;
    const indet = createTags(items).indeterminate;
    setSelectedItems(selected);
    setIndeterminateItems(indet);
    setTotal(items.length);
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

export const DefaultIcon = (args: Partial<TreeViewProps>) => {
  const [selectedItems, setSelectedItems] = React.useState<
    React.ReactNode[] | null
  >(null);
  const [indeterminateItems, setIndeterminateItems] = React.useState<
    React.ReactNode[] | null
  >(null);

  function onSelection(items: TreeItemSelectedInterface[]) {
    const selected = createTags(items).selected;
    const indet = createTags(items).indeterminate;
    setSelectedItems(selected);
    setIndeterminateItems(indet);
  }

  return (
    <>
      <TreeView {...args} onSelectedItemChange={onSelection}>
        <TreeItem
          icon={<FavoriteIcon aria-hidden={true} />}
          itemId="1"
          label={<>I have an icon</>}
          labelStyle={{ color: magma.colors.info700, fontWeight: '600' }}
        />
        <TreeItem
          icon={<StarIcon aria-hidden={true} />}
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
            icon={
              <EmergencyIcon
                style={{ color: magma.colors.danger500 }}
                aria-hidden={true}
              />
            }
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

export const FirstItemLeaf = (args: Partial<TreeViewProps>) => {
  const [selectedItems, setSelectedItems] = React.useState<
    React.ReactNode[] | null
  >(null);
  const [indeterminateItems, setIndeterminateItems] = React.useState<
    React.ReactNode[] | null
  >(null);

  function onSelection(items: TreeItemSelectedInterface[]) {
    const selected = createTags(items).selected;
    const indet = createTags(items).indeterminate;

    setSelectedItems(selected);
    setIndeterminateItems(indet);
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
  preselectedItems: [
    {
      itemId: 'item-gchild2',
      checkedStatus: IndeterminateCheckboxStatus.checked,
    },
  ],
};

FirstItemLeaf.parameters = { controls: { exclude: ['isInverse'] } };

export const FirstItemBranch = (args: Partial<TreeViewProps>) => {
  const [selectedItems, setSelectedItems] = React.useState<
    React.ReactNode[] | null
  >(null);
  const [indeterminateItems, setIndeterminateItems] = React.useState<
    React.ReactNode[] | null
  >(null);
  const [total, setTotal] = React.useState(selectedItems?.length || 0);

  function onSelection(items: TreeItemSelectedInterface[]) {
    const selected = createTags(items).selected;
    const indet = createTags(items).indeterminate;

    setSelectedItems(selected);
    setIndeterminateItems(indet);
    setTotal(items.length);
  }

  return (
    <>
      <TreeView {...args} onSelectedItemChange={onSelection}>
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

FirstItemBranch.args = {
  ariaLabel: 'initial-selected-treeview',
  selectable: TreeViewSelectable.multi,
  preselectedItems: [
    { itemId: 'Cockatiel', checkedStatus: IndeterminateCheckboxStatus.checked },
  ],
  initialExpandedItems: ['Birds', 'Parrots'],
};

export const FlatTree = (args: Partial<TreeViewProps>) => {
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

FlatTree.args = {
  selectable: TreeViewSelectable.off,
};

FlatTree.parameters = { controls: { exclude: ['isInverse'] } };

export const ParentsAndChildrenNotAutoChecked = (
  args: Partial<TreeViewProps>
) => {
  const [selectedItems, setSelectedItems] = React.useState<
    React.ReactNode[] | null
  >(null);
  const [indeterminateItems, setIndeterminateItems] = React.useState<
    React.ReactNode[] | null
  >(null);

  function onSelection(items: TreeItemSelectedInterface[]) {
    const selected = createTags(items).selected;
    const indet = createTags(items).indeterminate;

    setSelectedItems(selected);
    setIndeterminateItems(indet);
  }

  return (
    <>
      <TreeView {...args} onSelectedItemChange={onSelection}>
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

ParentsAndChildrenNotAutoChecked.args = {
  checkParents: false,
  checkChildren: false,
  ariaLabel: 'Independent Tree',
  selectable: TreeViewSelectable.multi,
  testId: 'independentTree',
};

ParentsAndChildrenNotAutoChecked.parameters = {
  controls: {
    exclude: ['isInverse', 'initialExpandedItems', 'ariaLabelledBy'],
  },
};

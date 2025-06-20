import React from 'react';

import { Meta } from '@storybook/react/types-6-0';
import {
  ArticleIcon,
  BookIcon,
  EditIcon,
  EmergencyIcon,
  FavoriteIcon,
  FolderIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  MoreHorizIcon,
  QueuePlayNextIcon,
  QuizIcon,
  StarIcon,
} from 'react-magma-icons';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  ButtonGroup,
  ButtonVariant,
  Flex,
  FlexBehavior,
  IconButton,
  IndeterminateCheckboxStatus,
  Spacer,
  SpacerAxis,
  Tag,
  TagSize,
  TreeItemSelectedInterface,
  TreeViewProps,
} from '../..';
import { magma } from '../../theme/magma';
import { ButtonColor, ButtonShape, ButtonSize } from '../Button';
import { Card } from '../Card';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownMenuItem,
} from '../Dropdown';
import {
  FlexAlignContent,
  FlexAlignItems,
  FlexJustify,
  FlexWrap,
} from '../Flex';
import { Hyperlink } from '../Hyperlink';
import { Paragraph } from '../Paragraph';
import { TagColor } from '../Tag';
import { TypographyColor, TypographyVisualStyle } from '../Typography';

import { TreeItem, TreeView, TreeViewApi, TreeViewSelectable } from '.';

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
    isTopLevelSelectable: {
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
              icon={<FolderIcon aria-hidden />}
              label={<>Chapter 1: I love tiramisu jelly beans soufflé</>}
              itemId="pt1ch1"
              testId="pt1ch1"
            >
              <TreeItem
                icon={<ArticleIcon aria-hidden />}
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
              icon={<FolderIcon aria-hidden />}
              label={
                <>Chapter 3: Pudding jujubes icing fruitcake bonbon icing</>
              }
              itemId="pt1ch3"
            >
              <TreeItem
                icon={<ArticleIcon aria-hidden />}
                label={
                  <>
                    Section 3.1: Topping pudding marshmallow caramels I love pie
                  </>
                }
                itemId="pt1ch3.1"
              />
              <TreeItem
                icon={<ArticleIcon aria-hidden />}
                label={
                  <>
                    Section 3.2: Tart sweet roll caramels candy canes sweet roll
                  </>
                }
                itemId="pt1ch3.2"
              />
              <TreeItem
                icon={<ArticleIcon aria-hidden />}
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
            icon={<FolderIcon aria-hidden />}
            label={
              <>
                Part 2: Candy powder carrot cake cotton candy marshmallow
                caramels croissant I love
              </>
            }
            itemId="pt2"
          >
            <TreeItem
              icon={<ArticleIcon aria-hidden />}
              label={
                <>
                  Chapter 4: I love carrot cake sweet roll I love liquorice
                  sweet
                </>
              }
              itemId="pt2ch4"
            />
            <TreeItem
              icon={<FolderIcon aria-hidden />}
              label={
                <>
                  Chapter 5: Wafer I love I love sesame snaps I love muffin
                  dragée halvah
                </>
              }
              itemId="pt2ch5"
            >
              <TreeItem
                icon={<ArticleIcon aria-hidden />}
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
                  icon={<ArticleIcon aria-hidden />}
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
                  icon={<ArticleIcon aria-hidden />}
                  label={
                    <>
                      Section 5.1.2: Apple pie apple pie tart macaroon topping
                      chocolate cake
                    </>
                  }
                  itemId="pt2ch5.1.2"
                />
                <TreeItem
                  icon={<ArticleIcon aria-hidden />}
                  label={
                    <>
                      Section 5.1.3: Apple pie apple pie tart macaroon topping
                      chocolate cake
                    </>
                  }
                  itemId="pt2ch5.1.3"
                >
                  <TreeItem
                    icon={<ArticleIcon aria-hidden />}
                    label={
                      <>
                        Section 5.1.3.1: Apple pie apple pie tart macaroon
                        topping chocolate cake
                      </>
                    }
                    itemId="pt2ch5.1.3.1"
                  />
                  <TreeItem
                    icon={<ArticleIcon aria-hidden />}
                    label={
                      <>
                        Section 5.1.3.2: Apple pie apple pie tart macaroon
                        topping chocolate cake
                      </>
                    }
                    itemId="pt2ch5.1.3.2"
                  />
                  <TreeItem
                    icon={<ArticleIcon aria-hidden />}
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
                icon={<ArticleIcon aria-hidden />}
                label={
                  <>
                    Section 5.2: Jelly lollipop tart gummies pie croissant
                    sesame snaps sesame snaps
                  </>
                }
                itemId="pt2ch5.2"
              />
              <TreeItem
                icon={<ArticleIcon aria-hidden />}
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
              icon={<ArticleIcon aria-hidden />}
              label={<>Chapter 6: Cupcake dragée I love cookie I love</>}
              itemId="pt2ch6"
            />
          </TreeItem>
          <TreeItem
            icon={<FolderIcon aria-hidden />}
            label={
              <>
                Part 3: Sugar plum halvah shortbread apple pie I love brownie
                gummi bears
              </>
            }
            itemId="pt3"
          >
            <TreeItem
              icon={<ArticleIcon aria-hidden />}
              label={
                <>
                  Chapter 7: Cheesecake lollipop tootsie roll candy canes
                  cupcake I love dessert liquorice
                </>
              }
              itemId="pt3ch7"
            />
            <TreeItem
              icon={<ArticleIcon aria-hidden />}
              label={
                <>
                  Chapter 8: Jelly pastry jelly-o topping cookie carrot cake
                  shortbread
                </>
              }
              itemId="pt3ch8"
            />
            <TreeItem
              icon={<ArticleIcon aria-hidden />}
              label={
                <>Chapter 9: Jelly beans sweet candy canes croissant bonbon.</>
              }
              itemId="pt3ch9"
            />
            <TreeItem
              icon={<ArticleIcon aria-hidden />}
              label={
                <>
                  Chapter 10: Wafer carrot cake powder candy canes sweet roll
                  bear claw croissant cheesecake tart
                </>
              }
              itemId="pt3ch10"
            />
            <TreeItem
              icon={<ArticleIcon aria-hidden />}
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
          icon={<FavoriteIcon aria-hidden />}
          itemId="1"
          label={<>I have an icon</>}
          labelStyle={{ color: magma.colors.info700, fontWeight: '600' }}
        />
        <TreeItem
          icon={<StarIcon aria-hidden />}
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
                aria-hidden
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

export const InvalidTreeItems = (args: Partial<TreeViewProps>) => {
  return (
    <>
      <p>
        <em>
          This is an example of a tree with badly structured tree items. Expect
          only the following items to be expandable: Node 1, Child 1, Node 2,
          Child 2, Grandchild 2, Node 6.
        </em>
      </p>
      <TreeView {...args}>
        <TreeItem label="Node 0 - fragment" itemId="item0" testId="item0">
          <></>
        </TreeItem>
        <TreeItem label="Node 1" itemId="item1" testId="item1">
          <TreeItem label="Child 1" itemId="item-child1">
            <TreeItem
              label="Grandchild 1 - has tag content"
              itemId="item-gchild1"
            >
              <Tag>This is a tag as a child of Grandchild 1</Tag>
            </TreeItem>
          </TreeItem>
        </TreeItem>
        <TreeItem label="Node 2" itemId="item2">
          <TreeItem label="Child 2" itemId="item-child2">
            <TreeItem
              label="Grandchild 2 - has valid and invalid children"
              itemId="item-gchild2"
            >
              <TreeItem label="Great-grandchild 2" itemId="item-ggchild2" />
              <TreeItem label="Great-grandchild 3" itemId="item-ggchild3">
                <>Invalid child</>
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeItem>
        <TreeItem label="Node 3 - has empty content" itemId="item3" />
        <TreeItem label="Node 4 - has child with only text" itemId="item4">
          Child of node 4 is just text
        </TreeItem>
        <TreeItem label="Node 5 - has null content" itemId="item5">
          {null}
        </TreeItem>
        <TreeItem
          label="Node 6 - has undefined and valid children"
          itemId="item6"
        >
          {undefined}
          <TreeItem label="Node 7" itemId="item7" />
          <TreeItem label="Node 8 - has undefined content" itemId="item8">
            {undefined}
          </TreeItem>
        </TreeItem>
      </TreeView>
    </>
  );
};

InvalidTreeItems.parameters = {
  controls: {
    exclude: ['isInverse', 'initialExpandedItems', 'ariaLabelledBy'],
  },
};

// MAST Tree example with hidden items

const renderTreeItemsRecursively = (terms: any[], depth: number) => {
  const labelStyles = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: 230 - depth * 24 + 'px',
    display: 'inline-block',
  };
  return terms.map(term => {
    return (
      <TreeItem
        itemId={term.id}
        testId={term.id}
        key={term.id}
        label={term.title}
        labelStyle={labelStyles}
        title={term.title}
        isDisabled={
          term.title === 'item-title-1' ||
          term.title === 'item-title-3' ||
          term.title === 'item-title-5.1'
        }
      >
        {term.children?.length ? (
          renderTreeItemsRecursively(term.children, depth + 1)
        ) : (
          <></>
        )}
      </TreeItem>
    );
  });
};

const AccordionSectionWithTreeView = (props: any) => {
  const {
    trees,
    title,
    keyForRerenderOfTagsTree,
    id,
    isDisabled,
    onSelectedItemChange,
    apiRef,
    ...rest
  } = props;
  const [isShowAll, setIsShowAll] = React.useState(false);
  const isSingeTaxonomyOfSuchType = trees.length === 1;
  const customIndex = Number(id) || 0;

  const getTermsForRender = (terms: any) => {
    if (isShowAll || terms.length <= 5) return terms;
    return terms.slice(0, 5);
  };
  const getTreesForRender = () => {
    if (isShowAll || trees.length <= 5) return trees;
    return trees.slice(0, 5);
  };

  const toggleShowAll = () => {
    setIsShowAll(prev => !prev);
    if (!isShowAll) {
      apiRef.current?.showMore();
    }
  };

  const toggleExpandAll = () => {
    if (!isShowAll) {
      apiRef.current?.showMore();
      setIsShowAll(true);
    }

    setTimeout(() => {
      apiRef.current?.expandAll();
    }, 50);
  };

  const toggleCollapseAll = () => {
    apiRef.current?.collapseAll();
  };

  const renderTrees = () => {
    return (
      <>
        {getTreesForRender().map(
          (tree: {
            id: any;
            preselectedItems: TreeItemSelectedInterface[] | undefined;
            items: any[];
          }) => {
            return (
              <TreeView
                key={JSON.stringify(`${keyForRerenderOfTagsTree}-${tree.id}`)}
                preselectedItems={tree.preselectedItems}
                selectable={TreeViewSelectable.multi}
                onSelectedItemChange={onSelectedItemChange}
                apiRef={apiRef}
                {...rest}
              >
                {renderTreeItemsRecursively(
                  isSingeTaxonomyOfSuchType
                    ? getTermsForRender(tree.items)
                    : tree.items,
                  0
                )}
              </TreeView>
            );
          }
        )}
      </>
    );
  };

  return (
    <AccordionItem {...rest} index={customIndex} isDisabled={isDisabled}>
      <AccordionButton>{title}</AccordionButton>
      <AccordionPanel>
        <ButtonGroup
          size={ButtonSize.small}
          variant={ButtonVariant.solid}
          color={ButtonColor.subtle}
        >
          <Button onClick={toggleExpandAll}>Expand All</Button>
          <Button onClick={toggleCollapseAll}>Collapse All</Button>
        </ButtonGroup>
        <Spacer axis={SpacerAxis.vertical} size={16} />
        {renderTrees()}
        <Spacer axis={SpacerAxis.vertical} size={16} />
        <IconButton
          disabled={isDisabled}
          onClick={toggleShowAll}
          size={ButtonSize.small}
          variant={ButtonVariant.link}
          testId="showAllBtn"
          icon={isShowAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        >
          {isShowAll ? 'Show Less' : 'Show All'}
        </IconButton>
      </AccordionPanel>
    </AccordionItem>
  );
};

const flatTree = {
  title: 'Chapter/Subchapter',
  trees: [
    {
      id: 'tree-id',
      groupName: 'book-table-of-contents',
      items: [
        {
          id: 'item-id-1',
          title: 'item-title-1',
          children: [],
        },
        {
          id: 'item-id-2',
          title: 'item-title-2',
          children: [],
        },
        {
          id: 'item-id-3',
          title: 'item-title-3',
          children: [
            {
              id: 'item-id-3.1',
              title: 'item-title-3.1',
              children: [],
            },
          ],
        },
        {
          id: 'item-id-4',
          title: 'item-title-4',
          children: [
            {
              id: 'item-id-4.1',
              title: 'item-title-4.1',
              children: [],
            },
          ],
        },
        {
          id: 'item-id-5',
          title: 'item-title-5',
          children: [
            {
              id: 'item-id-5.1',
              title: 'item-title-5.1',
              children: [],
            },
            {
              id: 'item-id-5.2',
              title: 'item-title-5.2',
              children: [],
            },
          ],
        },
        {
          id: 'item-id-6',
          title: 'item-title-6',
          children: [],
        },
      ],
      preselectedItems: [
        {
          itemId: 'item-id-2',
          checkedStatus: IndeterminateCheckboxStatus.checked,
        },
      ],
    },
  ],
  keyForRerenderOfTagsTree: true,
};

// This example is used in unit tests - modifying it may cause broken tests
export const AccordionTreeWithShowAllAndExpandAll = (props: any) => {
  const apiRef = React.useRef<TreeViewApi>();

  function onSelection(items: TreeItemSelectedInterface[]) {
    props.onSelectedItemChange(items);
  }

  return (
    <Accordion index={[0]} isMulti testId="accordion">
      <AccordionSectionWithTreeView
        apiRef={apiRef}
        {...flatTree}
        {...props}
        onSelectedItemChange={onSelection}
      />
    </Accordion>
  );
};

AccordionTreeWithShowAllAndExpandAll.parameters = {
  controls: {
    exclude: [
      'isInverse',
      'initialExpandedItems',
      'ariaLabelledBy',
      'ariaLabel',
      'testId',
      'selectable',
      'checkChildren',
      'checkParents',
    ],
  },
};

// END of MAST Tree example with hidden items

export const ComplexTreeWithShowAllAndExpandAll = (
  args: Partial<TreeViewProps>
) => {
  const treeContent = {
    id: 'tree-id',
    groupName: 'disciplines',
    items: [
      {
        id: 'discipline-arts-design',
        title: 'Arts and Design',
        children: [
          {
            id: 'ad-1',
            title: 'Animation',
            children: null,
          },
          {
            id: 'ad-2',
            title: 'Photography',
            children: [
              {
                id: 'ad-2-child1',
                title: 'Wedding',
                children: [],
              },
              {
                id: 'ad-2-child2',
                title: 'Nature',
                children: [
                  {
                    id: 'ad-2-child2-child1',
                    title: 'Pet',
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: 'ad-3',
            title: 'Web Design',
            children: [],
          },
        ],
      },
      {
        id: 'discipline-business',
        title: 'Business',
        children: [
          {
            id: 'bsn-1',
            title: 'Accounting',
            children: [],
          },
          {
            id: 'bsn-2',
            title: 'Finance',
            children: [],
          },
        ],
      },
      {
        id: 'discipline-cs',
        title: 'Computer Science',
        children: [
          {
            id: 'cs-1',
            title: 'Software Engineering',
            children: [],
          },
          {
            id: 'cs-2',
            title: 'Information Technology',
            children: [],
          },
        ],
      },
      {
        id: 'discipline-geography',
        title: 'Geography',
        children: undefined,
      },
      {
        id: 'discipline-his',
        title: 'History',
        children: [
          {
            id: 'his-1',
            title: 'American History',
            children: [],
          },
          {
            id: 'his-2',
            title: 'World History',
            children: [],
          },
          {
            id: 'his-3',
            title: 'Western Civilization',
            children: [],
          },
        ],
      },
      {
        id: 'discipline-math',
        title: 'Mathematics',
        children: [
          {
            id: 'math-1',
            title: 'Precalculus',
            children: [],
          },
          {
            id: 'math-2',
            title: 'Calculus',
            children: [],
          },
          {
            id: 'math-3',
            title: 'Finite Math',
            children: [],
          },
        ],
      },
      {
        id: 'discipline-nutr',
        title: 'Nutrition',
        children: [
          {
            id: 'nutr-1',
            title: 'Community Nutrition',
            children: [],
          },
          {
            id: 'nutr-2',
            title: 'Sports Nutrition',
            children: [
              {
                id: 'nutr-2-child1',
                title: 'Protein',
                children: [],
              },
              {
                id: 'nutr-2-child2',
                title: 'Supplements',
                children: [
                  {
                    id: 'nutr-2-child2-child1',
                    title: 'Creatine',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    preselectedItems: [
      {
        itemId: 'bsn-1',
        checkedStatus: IndeterminateCheckboxStatus.checked,
      },
    ],
  };

  const apiRef = React.useRef<TreeViewApi>();
  const [isShowAll, setIsShowAll] = React.useState(false);
  const [selectedItems, setSelectedItems] =
    React.useState<TreeItemSelectedInterface[]>();
  const total = selectedItems?.length ?? 0;
  const { selected, indeterminate } = createControlledTags(
    selectedItems,
    apiRef?.current
  );

  function onSelection(items: TreeItemSelectedInterface[]) {
    setSelectedItems(items);
  }

  const getTermsForRender = (terms: any) => {
    if (isShowAll || terms.length <= 5) {
      return terms;
    } else {
      return terms.slice(0, 5);
    }
  };

  const toggleShowAll = () => {
    setIsShowAll(prev => !prev);
    if (isShowAll) {
      apiRef.current?.showLess();
    } else {
      apiRef.current?.showMore();
    }
  };

  const onSelectAll = () => {
    if (isShowAll) {
      apiRef.current?.showLess();
    } else {
      apiRef.current?.showMore();
      setIsShowAll(prev => !prev);
    }
    setTimeout(() => {
      apiRef.current?.selectAll();
    }, 50);
  };

  const renderTreeItemsRecursively = (discipline: any[], depth: number) => {
    return discipline.map((term, index) => {
      return (
        <TreeItem
          key={term.id}
          itemId={term.id}
          testId={term.id}
          label={term.title}
        >
          {term.children?.length ? (
            renderTreeItemsRecursively(term.children, depth + 1)
          ) : (
            <></>
          )}
        </TreeItem>
      );
    });
  };

  const toggleExpandAll = () => {
    if (!isShowAll) {
      apiRef.current?.showMore();
      setIsShowAll(true);
    }

    setTimeout(() => {
      apiRef.current?.expandAll();
    }, 50);
  };

  const toggleCollapseAll = () => {
    apiRef.current?.collapseAll();
  };

  return (
    <>
      <ButtonGroup
        size={ButtonSize.small}
        variant={ButtonVariant.solid}
        color={ButtonColor.subtle}
      >
        <Button onClick={onSelectAll}>Select all</Button>
        <Button onClick={() => apiRef.current?.clearAll()}>Clear all</Button>
        <Button onClick={toggleExpandAll}>Expand All</Button>
        <Button onClick={toggleCollapseAll}>Collapse All</Button>
      </ButtonGroup>

      <Spacer size={24} axis={SpacerAxis.vertical} />

      <TreeView
        key={treeContent.id}
        {...args}
        preselectedItems={treeContent.preselectedItems}
        onSelectedItemChange={onSelection}
        apiRef={apiRef}
      >
        {renderTreeItemsRecursively(getTermsForRender(treeContent.items), 0)}
      </TreeView>

      <Spacer size={16} axis={SpacerAxis.vertical} />

      <IconButton
        onClick={toggleShowAll}
        size={ButtonSize.small}
        variant={ButtonVariant.link}
        testId="showAllBtn"
        icon={isShowAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        {isShowAll ? 'Show Less' : 'Show All'}
      </IconButton>

      <Spacer size={24} axis={SpacerAxis.vertical} />

      <p>{total} total</p>
      <p>Selected: {selected}</p>
      <p>Indeterminate: {indeterminate}</p>
    </>
  );
};

ComplexTreeWithShowAllAndExpandAll.args = {
  checkParents: true,
  checkChildren: true,
  selectable: TreeViewSelectable.multi,
  ariaLabel: 'Disciplines',
};

ComplexTreeWithShowAllAndExpandAll.parameters = {
  controls: {
    exclude: ['isInverse', 'initialExpandedItems', 'ariaLabelledBy', 'testId'],
  },
};

export const ComplexTreeWithLargeDataSet = (args: Partial<TreeViewProps>) => {
  const treeContent = {
    id: 'tree-id',
    groupName: 'disciplines',
    items: [
      {
        id: 'discipline-arts-design',
        title: 'Arts and Design',
        children: [
          {
            id: 'ad-1',
            title: 'Animation',
            children: [
              {
                id: 'ad-1-1',
                title: '2D Animation',
                children: [
                  {
                    id: 'ad-1-1-1',
                    title: 'Hand-drawn Animation',
                    children: [],
                  },
                  {
                    id: 'ad-1-1-2',
                    title: 'Digital 2D Animation',
                    children: [],
                  },
                ],
              },
              {
                id: 'ad-1-2',
                title: '3D Animation',
                children: [
                  {
                    id: 'ad-1-2-1',
                    title: 'Character Animation',
                    children: [],
                  },
                  { id: 'ad-1-2-2', title: 'Motion Capture', children: [] },
                ],
              },
            ],
          },
          {
            id: 'ad-2',
            title: 'Photography',
            children: [
              {
                id: 'ad-2-1',
                title: 'Wedding Photography',
                children: [
                  { id: 'ad-2-1-1', title: 'Bridal Portraits', children: [] },
                  { id: 'ad-2-1-2', title: 'Candid Photography', children: [] },
                ],
              },
              {
                id: 'ad-2-2',
                title: 'Nature Photography',
                children: [
                  {
                    id: 'ad-2-2-1',
                    title: 'Wildlife Photography',
                    children: [
                      {
                        id: 'ad-2-2-1-1',
                        title: 'Bird Photography',
                        children: [],
                      },
                      {
                        id: 'ad-2-2-1-2',
                        title: 'Safari Photography',
                        children: [],
                      },
                    ],
                  },
                  {
                    id: 'ad-2-2-2',
                    title: 'Landscape Photography',
                    children: [
                      {
                        id: 'ad-2-2-2-1',
                        title: 'Mountain Landscapes',
                        children: [],
                      },
                      { id: 'ad-2-2-2-2', title: 'Seascapes', children: [] },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'discipline-business',
        title: 'Business',
        children: [
          {
            id: 'bsn-1',
            title: 'Accounting',
            children: [
              {
                id: 'bsn-1-1',
                title: 'Financial Accounting',
                children: [
                  { id: 'bsn-1-1-1', title: 'Auditing', children: [] },
                  { id: 'bsn-1-1-2', title: 'Tax Accounting', children: [] },
                ],
              },
              {
                id: 'bsn-1-2',
                title: 'Managerial Accounting',
                children: [
                  { id: 'bsn-1-2-1', title: 'Cost Analysis', children: [] },
                  { id: 'bsn-1-2-2', title: 'Budgeting', children: [] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'discipline-cs',
        title: 'Computer Science',
        children: [
          {
            id: 'cs-1',
            title: 'Software Engineering',
            children: [
              {
                id: 'cs-1-1',
                title: 'Backend Development',
                children: [
                  { id: 'cs-1-1-1', title: 'Node.js', children: [] },
                  { id: 'cs-1-1-2', title: 'Django', children: [] },
                ],
              },
              {
                id: 'cs-1-2',
                title: 'Frontend Development',
                children: [
                  { id: 'cs-1-2-1', title: 'React.js', children: [] },
                  { id: 'cs-1-2-2', title: 'Vue.js', children: [] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'discipline-math',
        title: 'Mathematics',
        children: [
          {
            id: 'math-1',
            title: 'Precalculus',
            children: [
              {
                id: 'math-1-1',
                title: 'Trigonometry',
                children: [
                  {
                    id: 'math-1-1-1',
                    title: 'Sine and Cosine Functions',
                    children: [],
                  },
                  {
                    id: 'math-1-1-2',
                    title: 'Law of Sines and Cosines',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'discipline-nutr',
        title: 'Nutrition',
        children: [
          {
            id: 'nutr-1',
            title: 'Sports Nutrition',
            children: [
              {
                id: 'nutr-1-1',
                title: 'Protein',
                children: [
                  { id: 'nutr-1-1-1', title: 'Whey Protein', children: [] },
                  {
                    id: 'nutr-1-1-2',
                    title: 'Plant-Based Protein',
                    children: [],
                  },
                ],
              },
              {
                id: 'nutr-1-2',
                title: 'Supplements',
                children: [
                  {
                    id: 'nutr-1-2-1',
                    title: 'Creatine',
                    children: [
                      {
                        id: 'nutr-1-2-1-1',
                        title: 'Creatine Monohydrate',
                        children: [],
                      },
                      {
                        id: 'nutr-1-2-1-2',
                        title: 'Creatine HCL',
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    preselectedItems: [
      {
        itemId: 'bsn-1',
        checkedStatus: IndeterminateCheckboxStatus.checked,
      },
      {
        itemId: 'cs-1-1-1',
        checkedStatus: IndeterminateCheckboxStatus.checked,
      },
      {
        itemId: 'math-1-1-1',
        checkedStatus: IndeterminateCheckboxStatus.checked,
      },
    ],
  };

  const apiRef = React.useRef<TreeViewApi>();
  const [isShowAll, setIsShowAll] = React.useState(false);
  const [selectedItems, setSelectedItems] =
    React.useState<TreeItemSelectedInterface[]>();
  const total = selectedItems?.length ?? 0;
  const { selected, indeterminate } = createControlledTags(
    selectedItems,
    apiRef?.current
  );

  function onSelection(items: TreeItemSelectedInterface[]) {
    setSelectedItems(items);
  }

  const getTermsForRender = (terms: any) => {
    if (isShowAll || terms.length <= 3) {
      return terms;
    } else {
      return terms.slice(0, 3);
    }
  };

  const toggleShowAll = () => {
    setIsShowAll(prev => !prev);
    if (isShowAll) {
      apiRef.current?.showLess();
    } else {
      apiRef.current?.showMore();
    }
  };

  const onSelectAll = () => {
    if (isShowAll) {
      apiRef.current?.showLess();
    } else {
      apiRef.current?.showMore();
      setIsShowAll(prev => !prev);
    }
    setTimeout(() => {
      apiRef.current?.selectAll();
    }, 50);
  };

  const renderTreeItemsRecursively = (discipline: any[], depth: number) => {
    return discipline.map((term, index) => {
      return (
        <TreeItem
          key={term.id}
          itemId={term.id}
          testId={term.id}
          label={term.title}
        >
          {term.children?.length ? (
            renderTreeItemsRecursively(term.children, depth + 1)
          ) : (
            <></>
          )}
        </TreeItem>
      );
    });
  };

  const toggleExpandAll = () => {
    if (!isShowAll) {
      apiRef.current?.showMore();
      setIsShowAll(true);
    }

    setTimeout(() => {
      apiRef.current?.expandAll();
    }, 50);
  };

  const toggleCollapseAll = () => {
    apiRef.current?.collapseAll();
  };

  return (
    <>
      <ButtonGroup
        size={ButtonSize.small}
        variant={ButtonVariant.solid}
        color={ButtonColor.subtle}
      >
        <Button onClick={onSelectAll}>Select all</Button>
        <Button onClick={() => apiRef.current?.clearAll()}>Clear all</Button>
        <Button onClick={toggleExpandAll}>Expand All</Button>
        <Button onClick={toggleCollapseAll}>Collapse All</Button>
      </ButtonGroup>

      <Spacer size={24} axis={SpacerAxis.vertical} />

      <TreeView
        key={treeContent.id}
        {...args}
        preselectedItems={treeContent.preselectedItems}
        onSelectedItemChange={onSelection}
        apiRef={apiRef}
      >
        {renderTreeItemsRecursively(getTermsForRender(treeContent.items), 0)}
      </TreeView>

      <Spacer size={16} axis={SpacerAxis.vertical} />

      <IconButton
        onClick={toggleShowAll}
        size={ButtonSize.small}
        variant={ButtonVariant.link}
        testId="showAllBtn"
        icon={isShowAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        {isShowAll ? 'Show Less' : 'Show All'}
      </IconButton>

      <Spacer size={24} axis={SpacerAxis.vertical} />

      <p>{total} total</p>
      <p>Selected: {selected}</p>
      <p>Indeterminate: {indeterminate}</p>
    </>
  );
};

ComplexTreeWithLargeDataSet.args = {
  checkParents: true,
  checkChildren: true,
  selectable: TreeViewSelectable.multi,
  ariaLabel: 'Disciplines',
};

ComplexTreeWithLargeDataSet.parameters = {
  controls: {
    exclude: ['isInverse', 'initialExpandedItems', 'ariaLabelledBy', 'testId'],
  },
};

export const ComplexWithTopLevelNotSelectable = (
  args: Partial<TreeViewProps>
) => {
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
              icon={<FolderIcon aria-hidden />}
              label={<>Chapter 1: I love tiramisu jelly beans soufflé</>}
              itemId="pt1ch1"
              testId="pt1ch1"
            >
              <TreeItem
                icon={<ArticleIcon aria-hidden />}
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
              icon={<FolderIcon aria-hidden />}
              label={
                <>Chapter 3: Pudding jujubes icing fruitcake bonbon icing</>
              }
              itemId="pt1ch3"
            >
              <TreeItem
                icon={<ArticleIcon aria-hidden />}
                label={
                  <>
                    Section 3.1: Topping pudding marshmallow caramels I love pie
                  </>
                }
                itemId="pt1ch3.1"
              />
              <TreeItem
                icon={<ArticleIcon aria-hidden />}
                label={
                  <>
                    Section 3.2: Tart sweet roll caramels candy canes sweet roll
                  </>
                }
                itemId="pt1ch3.2"
              />
              <TreeItem
                icon={<ArticleIcon aria-hidden />}
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
            icon={<FolderIcon aria-hidden />}
            label={
              <>
                Part 2: Candy powder carrot cake cotton candy marshmallow
                caramels croissant I love
              </>
            }
            itemId="pt2"
          >
            <TreeItem
              icon={<ArticleIcon aria-hidden />}
              label={
                <>
                  Chapter 4: I love carrot cake sweet roll I love liquorice
                  sweet
                </>
              }
              itemId="pt2ch4"
            />
            <TreeItem
              icon={<FolderIcon aria-hidden />}
              label={
                <>
                  Chapter 5: Wafer I love I love sesame snaps I love muffin
                  dragée halvah
                </>
              }
              itemId="pt2ch5"
            >
              <TreeItem
                icon={<ArticleIcon aria-hidden />}
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
                  icon={<ArticleIcon aria-hidden />}
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
                  icon={<ArticleIcon aria-hidden />}
                  label={
                    <>
                      Section 5.1.2: Apple pie apple pie tart macaroon topping
                      chocolate cake
                    </>
                  }
                  itemId="pt2ch5.1.2"
                />
                <TreeItem
                  icon={<ArticleIcon aria-hidden />}
                  label={
                    <>
                      Section 5.1.3: Apple pie apple pie tart macaroon topping
                      chocolate cake
                    </>
                  }
                  itemId="pt2ch5.1.3"
                >
                  <TreeItem
                    icon={<ArticleIcon aria-hidden />}
                    label={
                      <>
                        Section 5.1.3.1: Apple pie apple pie tart macaroon
                        topping chocolate cake
                      </>
                    }
                    itemId="pt2ch5.1.3.1"
                  />
                  <TreeItem
                    icon={<ArticleIcon aria-hidden />}
                    label={
                      <>
                        Section 5.1.3.2: Apple pie apple pie tart macaroon
                        topping chocolate cake
                      </>
                    }
                    itemId="pt2ch5.1.3.2"
                  />
                  <TreeItem
                    icon={<ArticleIcon aria-hidden />}
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
                icon={<ArticleIcon aria-hidden />}
                label={
                  <>
                    Section 5.2: Jelly lollipop tart gummies pie croissant
                    sesame snaps sesame snaps
                  </>
                }
                itemId="pt2ch5.2"
              />
              <TreeItem
                icon={<ArticleIcon aria-hidden />}
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
              icon={<ArticleIcon aria-hidden />}
              label={<>Chapter 6: Cupcake dragée I love cookie I love</>}
              itemId="pt2ch6"
            />
          </TreeItem>
          <TreeItem
            icon={<FolderIcon aria-hidden />}
            label={
              <>
                Part 3: Sugar plum halvah shortbread apple pie I love brownie
                gummi bears
              </>
            }
            itemId="pt3"
          >
            <TreeItem
              icon={<ArticleIcon aria-hidden />}
              label={
                <>
                  Chapter 7: Cheesecake lollipop tootsie roll candy canes
                  cupcake I love dessert liquorice
                </>
              }
              itemId="pt3ch7"
            />
            <TreeItem
              icon={<ArticleIcon aria-hidden />}
              label={
                <>
                  Chapter 8: Jelly pastry jelly-o topping cookie carrot cake
                  shortbread
                </>
              }
              itemId="pt3ch8"
            />
            <TreeItem
              icon={<ArticleIcon aria-hidden />}
              label={
                <>Chapter 9: Jelly beans sweet candy canes croissant bonbon.</>
              }
              itemId="pt3ch9"
            />
            <TreeItem
              icon={<ArticleIcon aria-hidden />}
              label={
                <>
                  Chapter 10: Wafer carrot cake powder candy canes sweet roll
                  bear claw croissant cheesecake tart
                </>
              }
              itemId="pt3ch10"
            />
            <TreeItem
              icon={<ArticleIcon aria-hidden />}
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
          <TreeItem
            icon={<FolderIcon aria-hidden />}
            label={<>Part 4: leaf with icon</>}
            itemId="pt4"
          />
          <TreeItem label={<>Part 5: leaf with no icon</>} itemId="pt5" />
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

ComplexWithTopLevelNotSelectable.args = {
  selectable: TreeViewSelectable.multi,
  isTopLevelSelectable: false,
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

export const DynamicTreeItems = (args: Partial<TreeViewProps>) => {
  type TreeItemData = {
    id: number;
    name: string;
    children: TreeItemData[];
  };

  const treeContent: TreeItemData[] = [
    {
      id: 1,
      name: 'Parent item empty',
      children: [],
    },
    {
      id: 2,
      name: 'Parent item with children',
      children: [
        {
          id: 21,
          name: 'Child item (of parent 2)',
          children: [],
        },
      ],
    },
    {
      id: 3,
      name: 'Parent item with children 2',
      children: [
        {
          id: 31,
          name: 'Child item (of parent 3)',
          children: [],
        },
      ],
    },
  ];

  const [tree, updateTree] = React.useState(treeContent);
  const treeViewApiRef = React.useRef<TreeViewApi>();

  const addNewParentItemChecked = () => {
    const newItemId = String(tree.length + 1);

    treeViewApiRef.current?.addItem({
      itemId: newItemId,
      parentId: null,
      icon: undefined,
      hasOwnTreeItems: false,
      isDisabled: undefined,
      checkedStatus: IndeterminateCheckboxStatus.checked,
    });

    updateTree([
      ...tree,
      { id: Number(newItemId), name: 'New parent', children: [] },
    ]);
  };

  const addNewParentItemUnchecked = () => {
    const newItemId = String(tree.length + 1);

    treeViewApiRef.current?.addItem({
      itemId: newItemId,
      parentId: null,
      icon: undefined,
      hasOwnTreeItems: false,
      isDisabled: undefined,
      checkedStatus: IndeterminateCheckboxStatus.unchecked,
    });

    updateTree([
      ...tree,
      { id: Number(newItemId), name: 'New parent', children: [] },
    ]);
  };

  const addNewChildrenItemChecked = () => {
    const parentItem = tree[tree.length - 1];

    const newItemId =
      parentItem &&
      String(parentItem.id) + String(parentItem.children.length + 1);

    treeViewApiRef.current?.addItem({
      itemId: newItemId,
      parentId: String(parentItem?.id),
      icon: undefined,
      hasOwnTreeItems: false,
      isDisabled: undefined,
      checkedStatus: IndeterminateCheckboxStatus.checked,
    });

    const newTree = tree.map((item, index) => {
      if (index === tree.length - 1) {
        return {
          ...item,
          children: [
            ...item.children,
            {
              id: Number(newItemId),
              name: 'New child',
              children: [],
            },
          ],
        };
      }
      return item;
    });

    updateTree(newTree);
  };

  const addNewChildrenItemUnchecked = () => {
    const parentItem = tree[tree.length - 1];

    const newItemId =
      parentItem &&
      String(parentItem.id) + String(parentItem.children.length + 1);

    treeViewApiRef.current?.addItem({
      itemId: newItemId,
      parentId: String(parentItem?.id),
      icon: undefined,
      hasOwnTreeItems: false,
      isDisabled: undefined,
      checkedStatus: IndeterminateCheckboxStatus.unchecked,
    });

    const newTree = tree.map((item, index) => {
      if (index === tree.length - 1) {
        return {
          ...item,
          children: [
            ...item.children,
            {
              id: Number(newItemId),
              name: 'New child',
              children: [],
            },
          ],
        };
      }
      return item;
    });

    updateTree(newTree);
  };

  const addNewDisabledParentItemChecked = () => {
    const newItemId = String(tree.length + 1);

    treeViewApiRef.current?.addItem({
      itemId: newItemId,
      parentId: null,
      icon: undefined,
      hasOwnTreeItems: false,
      isDisabled: true,
      checkedStatus: IndeterminateCheckboxStatus.checked,
    });

    updateTree([
      ...tree,
      { id: Number(newItemId), name: 'New disabled parent', children: [] },
    ]);
  };

  const addNewDisabledParentItemUnchecked = () => {
    const newItemId = String(tree.length + 1);

    treeViewApiRef.current?.addItem({
      itemId: newItemId,
      parentId: null,
      icon: undefined,
      hasOwnTreeItems: false,
      isDisabled: true,
      checkedStatus: IndeterminateCheckboxStatus.unchecked,
    });

    updateTree([
      ...tree,
      { id: Number(newItemId), name: 'New disabled parent', children: [] },
    ]);
  };

  const addNewDisabledChildrenItemChecked = () => {
    const parentItem = tree[tree.length - 1];

    const newItemId =
      parentItem &&
      String(parentItem.id) + String(parentItem.children.length + 1);

    treeViewApiRef.current?.addItem({
      itemId: newItemId,
      parentId: String(parentItem?.id),
      icon: undefined,
      hasOwnTreeItems: false,
      isDisabled: true,
      checkedStatus: IndeterminateCheckboxStatus.checked,
    });

    const newTree = tree.map((item, index) => {
      if (index === tree.length - 1) {
        return {
          ...item,
          children: [
            ...item.children,
            {
              id: Number(newItemId),
              name: 'New disabled child',
              children: [],
            },
          ],
        };
      }
      return item;
    });

    updateTree(newTree);
  };

  const addNewDisabledChildrenItemUnchecked = () => {
    const parentItem = tree[tree.length - 1];

    const newItemId =
      parentItem &&
      String(parentItem.id) + String(parentItem.children.length + 1);

    treeViewApiRef.current?.addItem({
      itemId: newItemId,
      parentId: String(parentItem?.id),
      icon: undefined,
      hasOwnTreeItems: false,
      isDisabled: true,
      checkedStatus: IndeterminateCheckboxStatus.unchecked,
    });

    const newTree = tree.map((item, index) => {
      if (index === tree.length - 1) {
        return {
          ...item,
          children: [
            ...item.children,
            {
              id: Number(newItemId),
              name: 'New disabled child',
              children: [],
            },
          ],
        };
      }
      return item;
    });

    updateTree(newTree);
  };

  const addNewChildToSecondParent = (checked: boolean) => {
    if (tree.length < 2) {
      alert(
        'Requires at least two top-level items to add a child to the second one.'
      );
      return;
    }
    const parentIndex = 1;
    const parentItemInState = tree[parentIndex];

    const newChildNumericId = Number(
      String(parentItemInState.id) +
        String(parentItemInState.children.length + 1)
    );
    const newChildApiId = String(newChildNumericId);

    treeViewApiRef.current?.addItem({
      itemId: newChildApiId,
      parentId: String(parentItemInState.id),
      checkedStatus: checked
        ? IndeterminateCheckboxStatus.checked
        : IndeterminateCheckboxStatus.unchecked,
      hasOwnTreeItems: false,
    });

    const newTree = tree.map((item, index) => {
      if (index === parentIndex) {
        return {
          ...item,
          children: [
            ...item.children,
            {
              id: newChildNumericId,
              name: `New Child for '${item.name}' (${checked ? 'checked' : 'unchecked'})`,
              children: [],
            },
          ],
        };
      }
      return item;
    });
    updateTree(newTree);
  };

  const addChildToFirstGrandchild = (checked: boolean) => {
    if (tree.length < 2 || !tree[1].children || tree[1].children.length === 0) {
      alert('Requires the second top-level item to have at least one child.');
      return;
    }
    const grandparentIndex = 1;
    const parentIndexInGrandparentChildren = 0;
    const targetParentItem =
      tree[grandparentIndex].children[parentIndexInGrandparentChildren];

    const newChildNumericId = Number(
      String(targetParentItem.id) +
        String((targetParentItem.children || []).length + 1)
    );
    const newChildApiId = String(newChildNumericId);

    treeViewApiRef.current?.addItem({
      itemId: newChildApiId,
      parentId: String(targetParentItem.id),
      checkedStatus: checked
        ? IndeterminateCheckboxStatus.checked
        : IndeterminateCheckboxStatus.unchecked,
      hasOwnTreeItems: false,
    });

    const newTree = tree.map((grandparent, gpIndex) => {
      if (gpIndex === grandparentIndex) {
        return {
          ...grandparent,
          children: grandparent.children.map((parent, pIndex) => {
            if (pIndex === parentIndexInGrandparentChildren) {
              return {
                ...parent,
                children: [
                  ...(parent.children || []),
                  {
                    id: newChildNumericId,
                    name: `New Child for '${parent.name}' (${
                      checked ? 'checked' : 'unchecked'
                    })`,
                    children: [],
                  },
                ],
              };
            }
            return parent;
          }),
        };
      }
      return grandparent;
    });
    updateTree(newTree);
  };

  const renterItems = (items: TreeItemData[]) => {
    return items.map(item => {
      return (
        <TreeItem key={item.id} label={item.name} itemId={item.id.toString()}>
          {item.children?.length ? renterItems(item.children) : <></>}
        </TreeItem>
      );
    });
  };

  return (
    <>
      <button onClick={addNewParentItemChecked}>add checked parent</button>
      <button onClick={addNewParentItemUnchecked}>add unchecked parent</button>

      <br />
      <br />

      <button onClick={addNewChildrenItemChecked}>
        add checked children to the last parent
      </button>
      <button onClick={addNewChildrenItemUnchecked}>
        add unchecked children to the last parent
      </button>

      <br />
      <br />

      <button onClick={addNewDisabledParentItemChecked}>
        add disabled checked parent
      </button>
      <button onClick={addNewDisabledParentItemUnchecked}>
        add disabled unchecked parent
      </button>

      <br />
      <br />

      <button onClick={addNewDisabledChildrenItemChecked}>
        add checked disabled children to the last parent
      </button>
      <button onClick={addNewDisabledChildrenItemUnchecked}>
        add unchecked disabled children to the last parent
      </button>

      <br />
      <br />
      <h4>Demonstrate adding at different levels:</h4>
      <button onClick={() => addNewChildToSecondParent(true)}>
        Add checked child to 2nd parent
      </button>
      <button onClick={() => addNewChildToSecondParent(false)}>
        Add unchecked child to 2nd parent
      </button>
      <br />
      <button onClick={() => addChildToFirstGrandchild(true)}>
        Add checked child to 1st child of 2nd parent (add grandchild)
      </button>
      <button onClick={() => addChildToFirstGrandchild(false)}>
        Add unchecked child to 1st child of 2nd parent (add grandchild)
      </button>
      <br />
      <TreeView ariaLabel="icon-example" apiRef={treeViewApiRef} {...args}>
        {renterItems(tree)}
      </TreeView>
    </>
  );
};

DynamicTreeItems.parameters = {
  controls: {
    exclude: ['isInverse', 'initialExpandedItems', 'preselectedItems'],
  },
};

export const ComplexWithAdditionalContent = (args: Partial<TreeViewProps>) => {
  const treeLabel = () => {
    return (
      <Flex
        behavior={FlexBehavior.container}
        justify={FlexJustify.spaceBetween}
        wrap={FlexWrap.nowrap}
      >
        <Flex behavior={FlexBehavior.item}>
          <Hyperlink to="google.com" target="_blank" hasUnderline={false}>
            Most common activity length is 39 chars but what if longer
          </Hyperlink>
        </Flex>
        <Flex behavior={FlexBehavior.item}>
          <Dropdown>
            <DropdownButton
              aria-label="Extra icon example"
              color={ButtonColor.secondary}
              size={ButtonSize.small}
              icon={<MoreHorizIcon />}
              shape={ButtonShape.fill}
            />
            <DropdownContent>
              <DropdownMenuItem
                icon={<EditIcon aria-hidden />}
                onClick={() => console.log('Rename clicked!')}
              >
                Rename
              </DropdownMenuItem>
            </DropdownContent>
          </Dropdown>
        </Flex>
      </Flex>
    );
  };

  const folderLabel = (label: any) => {
    return (
      <Flex
        behavior={FlexBehavior.container}
        justify={FlexJustify.spaceBetween}
        wrap={FlexWrap.nowrap}
      >
        <Flex behavior={FlexBehavior.item}>{label}</Flex>
        <Flex behavior={FlexBehavior.item}>
          <Paragraph
            visualStyle={TypographyVisualStyle.bodySmall}
            noMargins
            color={TypographyColor.subdued}
            style={{ marginRight: magma.spaceScale.spacing03 }}
          />
          <Dropdown>
            <DropdownButton
              aria-label="Extra icon example"
              color={ButtonColor.secondary}
              size={ButtonSize.small}
              icon={<MoreHorizIcon />}
              shape={ButtonShape.fill}
            />
            <DropdownContent>
              <DropdownMenuItem
                icon={<EditIcon aria-hidden />}
                onClick={() => console.log('Rename clicked!')}
              >
                Rename
              </DropdownMenuItem>
            </DropdownContent>
          </Dropdown>
        </Flex>
      </Flex>
    );
  };

  const additionalContent = () => {
    return (
      <>
        <Paragraph noTopMargin visualStyle={TypographyVisualStyle.bodyXSmall}>
          Due: xx/xx/xxx · Submitted: 12 · Missing: 3
        </Paragraph>
        <ButtonGroup>
          <Dropdown>
            <DropdownButton size={ButtonSize.small} color={ButtonColor.subtle}>
              10 Resources
            </DropdownButton>
            <DropdownContent>
              <DropdownMenuItem>Menu item 1</DropdownMenuItem>
              <DropdownMenuItem>Menu item number two</DropdownMenuItem>
            </DropdownContent>
          </Dropdown>
          <Dropdown>
            <DropdownButton size={ButtonSize.small} color={ButtonColor.subtle}>
              24 Standards
            </DropdownButton>
            <DropdownContent>
              <DropdownMenuItem>Menu item 1</DropdownMenuItem>
              <DropdownMenuItem>Menu item number two</DropdownMenuItem>
            </DropdownContent>
          </Dropdown>
        </ButtonGroup>
      </>
    );
  };

  return (
    <Card isInverse={args.isInverse}>
      <TreeView {...args} ariaLabelledBy={'ah-textbook'}>
        <TreeItem
          label={folderLabel(
            <Paragraph
              visualStyle={TypographyVisualStyle.headingXSmall}
              noMargins
            >
              English Edition
            </Paragraph>
          )}
          itemId="english"
        >
          <TreeItem
            label={folderLabel(
              <Paragraph
                visualStyle={TypographyVisualStyle.headingXSmall}
                noMargins
              >
                Unit 1 Relationships in Ecosystems (Chapters 2-4)
              </Paragraph>
            )}
            itemId="unit1"
          >
            <TreeItem label="Chapter 1" itemId="unit1ch1" />
          </TreeItem>
          <TreeItem
            label={folderLabel(
              <Paragraph
                visualStyle={TypographyVisualStyle.headingXSmall}
                noMargins
              >
                Unit 2 Cell Systems (Chapters 5-7)
              </Paragraph>
            )}
            itemId="unit2"
          >
            <TreeItem
              label={folderLabel(
                <span style={{ fontWeight: '600' }}>
                  Chapter 5 Molecules in Living Systems (pp. 128-163)
                </span>
              )}
              itemId="ch5"
            >
              <TreeItem
                label={folderLabel(
                  <span style={{ fontWeight: '600' }}>
                    Chapter 5 Introductory Materials
                  </span>
                )}
                itemId="ch5intro"
              >
                <TreeItem
                  additionalContent={additionalContent()}
                  label={treeLabel()}
                  itemId="sample1"
                  icon={<BookIcon />}
                />
              </TreeItem>
              <TreeItem
                label={folderLabel(
                  <span style={{ fontWeight: '600' }}>
                    5.1 Elements and Compounds (pp. 130-136)
                  </span>
                )}
                itemId="ch5el"
              >
                <TreeItem
                  additionalContent={additionalContent()}
                  label={treeLabel()}
                  itemId="sample2"
                  icon={<BookIcon />}
                />
              </TreeItem>
              <TreeItem
                additionalContent={additionalContent()}
                label={treeLabel()}
                itemId="sample3"
                icon={<BookIcon />}
              />
              <TreeItem
                label={folderLabel(
                  <span style={{ fontWeight: '600' }}>
                    5.2 Water (pp. 137-141)
                  </span>
                )}
                itemId="ch5water"
              >
                <TreeItem
                  additionalContent={additionalContent()}
                  label={treeLabel()}
                  itemId="sample6"
                  icon={<BookIcon />}
                />

                <TreeItem
                  additionalContent={additionalContent()}
                  label={treeLabel()}
                  itemId="sample7"
                  icon={<QuizIcon />}
                />

                <TreeItem
                  label={<>Expanded Tree Item with Button</>}
                  itemId="sample8"
                  icon={<QueuePlayNextIcon />}
                >
                  <TreeItem
                    additionalContent={
                      <Button
                        style={{ marginTop: '12px' }}
                        onClick={() => console.log('Click button!')}
                      >
                        Click
                      </Button>
                    }
                    label={<>Button Label</>}
                    itemId="sample9"
                  />
                </TreeItem>
              </TreeItem>
            </TreeItem>
          </TreeItem>
          <TreeItem
            label={folderLabel(
              <Paragraph
                visualStyle={TypographyVisualStyle.headingXSmall}
                noMargins
              >
                Unit 3 Interactions in Living Systems (Chapters 8-10)
              </Paragraph>
            )}
            itemId="unit3"
          >
            <TreeItem
              additionalContent={additionalContent()}
              label={treeLabel()}
              itemId="sample10"
              icon={<BookIcon />}
            />
          </TreeItem>
        </TreeItem>
      </TreeView>
      <Button
        style={{ margin: '20px', width: '300px' }}
        onClick={() => console.log('Click button!')}
      >
        Outside Treeview Button
      </Button>
    </Card>
  );
};

ComplexWithAdditionalContent.args = {
  ariaLabel: 'Textbook tree',
  initialExpandedItems: ['ch5water', 'sample9'],
  checkParents: true,
  checkChildren: true,
  isDisabled: false,
  testId: 'complex-additional-content-example',
};

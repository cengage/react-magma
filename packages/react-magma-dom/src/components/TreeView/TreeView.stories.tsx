import React from 'react';
import { TreeView, TreeItem } from '.';
import { magma } from '../../theme/magma';

import { ArticleIcon, FolderIcon, FavoriteIcon } from 'react-magma-icons';
import { TreeViewSelectable } from './useTreeView';
import { Meta } from '@storybook/react/types-6-0';
import { Card } from '../Card';
import { Paragraph } from '../Paragraph';
import { IndeterminateCheckboxStatus } from '../..';

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

  function onSelection(event, items) {
    let list = '';
    items.map((i: any) => {
      list += i + ', ';
    });
    setSelectedItems(list);
  }

  return (
    <>
      <Card isInverse={args.isInverse}>
        <TreeView {...args} onSelectedItemChange={onSelection}>
          <TreeItem label={<>Part 1: Introduction</>} itemId="0">
            <TreeItem
              icon={<ArticleIcon />}
              label={<>Chapter 1: Lorem ipsum dolor sit amet</>}
              itemId="1"
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
                    Chapter 2ish child: Lorem ipsum dolor sit amet dolor sit amet
                    dolor sit amet
                  </>
                }
                itemId="2.5"
              />
            </TreeItem>
            <TreeItem label={<>Chapter 2: Lorem ipsum dolor sit amet</>} itemId="3" />
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
            // parentCheckedStatus={IndeterminateCheckboxStatus.checked}
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
      {selectedItems}
    </>
  );
};

Default.args = {
  selectable: TreeViewSelectable.multi,
  ariaLabel: 'Textbook tree',
  initialExpandedItems: ["0", "1", "2", "15"],
  initialSelectedItems: ["20", "1"],
  testId: 'default-example',
};

export const NoIcons = args => {
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
        <TreeItem label={<>Kitchen & Dining</>} />
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
      <Paragraph id="ah-textbook">Art History Textbook</Paragraph>
      <TreeView {...args} ariaLabelledBy={'ah-textbook'}>
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
  const hasIcon = true;
  return (
    <TreeView {...args}>
      <TreeItem label={<>0.0</>} icon={hasIcon ? <ArticleIcon /> : null} />
      <TreeItem label={<>0.1</>} icon={hasIcon ? <FolderIcon /> : null}>
        <TreeItem label={<>0.1.1</>} icon={hasIcon ? <ArticleIcon /> : null} />
        <TreeItem label={<>0.1.2</>} icon={hasIcon ? <FolderIcon /> : null}>
          <TreeItem
            label={<>0.1.2.1</>}
            icon={hasIcon ? <ArticleIcon /> : null}
          />
          <TreeItem label={<>0.1.2.2</>} icon={hasIcon ? <FolderIcon /> : null}>
            <TreeItem
              label={<>0.1.2.2.1</>}
              icon={hasIcon ? <ArticleIcon /> : null}
            />
            <TreeItem
              label={<>0.1.2.2.2</>}
              icon={hasIcon ? <FolderIcon /> : null}
            >
              <TreeItem
                label={<>0.1.2.2.2.1</>}
                icon={hasIcon ? <ArticleIcon /> : null}
              />
              <TreeItem
                label={<>0.1.2.2.2.2</>}
                icon={hasIcon ? <FolderIcon /> : null}
              >
                <TreeItem
                  label={<>0.1.2.2.2.2.1</>}
                  icon={hasIcon ? <ArticleIcon /> : null}
                />
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
};

export const UseDefaultIcon = args => {
  return (
    <TreeView {...args}>
      <TreeItem
        label={<>I have an icon</>}
        icon={<FavoriteIcon />}
        labelStyle={{ color: magma.colors.info700, fontWeight: '600' }}
        style={{ background: magma.colors.info100 }}
        onClick={() => console.log('item clicked')}
      />
      <TreeItem
        label={<>Branch with no icon</>}
        onClick={() => console.log('item clicked')}
      >
        <TreeItem
          label={<>I am a leaf without an icon</>}
          style={{ background: magma.colors.info200 }}
          onClick={() => console.log('item clicked')}
        />
        <TreeItem
          label={<>I have an icon too</>}
          icon={<FavoriteIcon />}
          onClick={() => console.log('item clicked')}
        />
      </TreeItem>
    </TreeView>
  );
};

export const Other = args => {
  return (
    <TreeView {...args}>
      <TreeItem label="Node 0" itemId="item0" />
      <TreeItem label="Node 1" itemId="item1">
        <TreeItem label="Child 1" itemId="item2">
          <TreeItem label="Grandchild 1" itemId="item3">
            <TreeItem label="Great-grandchild 1" itemId="item4" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
      <TreeItem label="Node 2" itemId="item5">
        <TreeItem label="Child 2" itemId="item6">
          <TreeItem label="Grandchild 2" itemId="item7">
            <TreeItem label="Great-grandchild 2" itemId="item8" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
      <TreeItem label="Node 3" itemId="item9" />
    </TreeView>
  );
};

Other.args = {
  initialExpandedItems: ['item1', 'item5', 'item6'],
  initialSelectedItems: ["item6"]
};

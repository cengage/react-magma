import React from 'react';

import { act, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { transparentize } from 'polished';

import { magma } from '../../theme/magma';
import { Button } from '../Button';

import { TreeItem, TreeView, TreeViewSelectable } from '.';
import * as deviceDetect from '../../hooks/useDeviceDetect';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';
import { ANNOUNCE_DELAY_MS } from './TreeViewAnnouncer';

jest.mock('../../hooks/useDeviceDetect');

const defaultDevice = {
  isSafari: false,
  isChrome: false,
  isFirefox: false,
  isEdge: false,
  isMobile: false,
  isWindows: false,
  isMacOS: false,
  isLinux: false,
  isAndroid: false,
  isIOS: false,
};

function mockDevice(overrides = {}) {
  const value = { ...defaultDevice, ...overrides };

  deviceDetect.default.mockReturnValue(value);
  deviceDetect.useDeviceDetect.mockReturnValue(value);
}

// Anchored: announcements differ only by a trailing clause.
function expectAnnouncement(region, text) {
  return waitFor(() =>
    expect(region).toHaveTextContent(
      new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`)
    )
  );
}

// Messages arrive on a delay, so an empty region proves nothing until it passes.
async function expectNoAnnouncement(region) {
  await act(
    () =>
      new Promise(resolve => {
        setTimeout(resolve, ANNOUNCE_DELAY_MS * 2);
      })
  );

  expect(region).toHaveTextContent('');
}

const labelText = 'Tree Item Node 0';
const itemId = 'node0';
const testId = `${itemId}-tree-item`;

describe('TreeItem', () => {
  beforeEach(() => {
    mockDevice();
  });

  it('should render the component', () => {
    const { getByText } = render(
      <TreeItem label={labelText} testId={testId} itemId={itemId} />
    );

    expect(getByText(labelText)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const { getByTestId } = render(
      <TreeItem label={labelText} testId={testId} itemId={itemId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  describe('label', () => {
    it('the label is visible', () => {
      const { getByText } = render(
        <TreeItem label={labelText} testId={testId} itemId={itemId} />
      );
      expect(getByText(labelText)).toBeInTheDocument();
    });
  });

  describe('custom styles', () => {
    it('labelStyle: styles get applied to the label', () => {
      const labelColor = '#E0004D';

      const { getByTestId } = render(
        <TreeItem
          label={labelText}
          testId={testId}
          itemId={itemId}
          labelStyle={{ color: labelColor }}
        />
      );

      expect(getByTestId(`${testId}-label`)).toHaveStyle(
        `color: ${labelColor}`
      );
    });

    it('style: styles get applied to the item wrapper', () => {
      const backgroundColor = '#B12FAD';

      const { getByTestId } = render(
        <TreeItem
          label={labelText}
          testId={testId}
          itemId={itemId}
          style={{ backgroundColor: backgroundColor }}
        />
      );

      expect(getByTestId(`${testId}-itemwrapper`)).toHaveStyle(
        `backgroundColor: ${backgroundColor}`
      );
    });
  });

  describe('additional content', () => {
    it('should apply default styles', () => {
      const { getByTestId } = render(
        <TreeItem label={labelText} testId={testId} itemId={itemId} />
      );

      expect(getByTestId(`${testId}-itemwrapper`)).toHaveStyle(
        `flexDirection: row`
      );
    });

    it('should apply custom styles when additional content is provided', () => {
      const { getByTestId, getByText } = render(
        <TreeItem
          additionalContent={<>Content</>}
          label={labelText}
          testId={testId}
          itemId={itemId}
        />
      );

      expect(getByText('Content')).toBeInTheDocument();
      expect(getByTestId(`${testId}-itemwrapper`)).toHaveStyle(
        `flexDirection: column`
      );
      expect(getByTestId(`${testId}-additionalcontentwrapper`)).toHaveStyle(
        `marginBottom: 16px`
      );
    });
  });

  describe('isDisabled', () => {
    it('the label is disabled', () => {
      const { getByTestId } = render(
        <TreeView>
          <TreeItem
            label={labelText}
            testId={testId}
            itemId={itemId}
            isDisabled
          />
        </TreeView>
      );

      expect(getByTestId(`${testId}-label`)).toHaveStyleRule(
        'color',
        magma.colors.neutral500
      );
    });

    it('the ability to expand the item is disabled', () => {
      const { getByTestId } = render(
        <TreeView>
          <TreeItem
            label={labelText}
            itemId="parent"
            testId={testId}
            isDisabled
          >
            <TreeItem
              label={`${labelText}-child`}
              testId={`${testId}-child`}
              itemId="child"
            />
          </TreeItem>
        </TreeView>
      );

      expect(getByTestId(`${testId}-expand`)).toHaveStyleRule(
        'color',
        magma.colors.neutral500
      );
    });
  });

  describe('icons', () => {
    it('uses the regular icon color', () => {
      const { getByTestId } = render(
        <TreeView>
          <TreeItem label={labelText} itemId="parent" testId={testId}>
            <TreeItem label="Child" itemId="child" />
          </TreeItem>
        </TreeView>
      );

      expect(getByTestId(`${testId}-expand`)).toHaveStyleRule(
        'color',
        magma.colors.brand.navy
      );
    });
  });

  it('uses the selected checkbox color for branch and leaf items', () => {
    const { container } = render(
      <TreeView
        selectable={TreeViewSelectable.multi}
        initialExpandedItems={['parent']}
        preselectedItems={[
          { itemId: 'parent', checkedStatus: 'checked' },
          { itemId: 'child', checkedStatus: 'checked' },
        ]}
      >
        <TreeItem label="Parent" itemId="parent">
          <TreeItem label="Child" itemId="child" />
        </TreeItem>
      </TreeView>
    );

    const parentCheckbox = container.querySelector(
      '[data-testid="parent-checkbox"] + label span'
    );
    const childCheckbox = container.querySelector(
      '[data-testid="child-checkbox"] + label span'
    );

    expect(parentCheckbox).toHaveStyleRule('color', magma.colors.cyan700);
    expect(childCheckbox).toHaveStyleRule('color', magma.colors.cyan700);
  });

  describe('onClick', () => {
    it('gets called when the item is clicked', async () => {
      const onClick = jest.fn();
      const { getByText } = render(
        <TreeItem
          label={labelText}
          testId={testId}
          itemId={itemId}
          onClick={onClick}
        />
      );

      await userEvent.click(getByText(labelText));

      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('keyboard navigation and focus', () => {
    it('should activate the interactive element on Enter and Space', () => {
      const handleClick = jest.fn();
      const { getByText } = render(
        <TreeItem
          label={<Button onClick={handleClick}>Button</Button>}
          testId={testId}
          itemId={itemId}
        />
      );
      const button = getByText('Button');

      expect(button).toBeInTheDocument();

      button.focus();

      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(button, { key: ' ', code: 'Space' });
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('should return focus to the tree item on Escape', () => {
      const { getByTestId, getByText } = render(
        <TreeItem
          label={<Button>Button</Button>}
          testId={testId}
          itemId={itemId}
        />
      );
      const treeItem = getByTestId(testId);
      const button = getByText('Button');
      button.focus();
      fireEvent.keyDown(button, { key: 'Escape' });

      expect(treeItem).toHaveFocus();
    });
  });

  describe('hover styles', () => {
    it('should have default hover color', () => {
      const { getByTestId } = render(
        <TreeItem label={labelText} testId={testId} itemId={itemId} />
      );

      expect(getByTestId(testId)).toBeInTheDocument();
      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral200),
        {
          target: ':hover',
        }
      );
    });

    it('should use the inverse hover color', () => {
      const { getByTestId } = render(
        <TreeView isInverse>
          <TreeItem label={labelText} testId={testId} itemId={itemId} />
        </TreeView>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        transparentize(0.5, magma.colors.neutral900),
        {
          target: ':hover',
        }
      );
    });

    it('should have custom hover color', () => {
      const { getByTestId } = render(
        <TreeItem
          label={labelText}
          testId={testId}
          itemId={itemId}
          hoverColor={magma.colors.indigo500}
        />
      );

      expect(getByTestId(testId)).toBeInTheDocument();
      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        magma.colors.indigo500,
        {
          target: ':hover',
        }
      );
    });
  });

  describe('expansion announcement (issue #2444)', () => {
    const treeTestId = 'announcing-tree';
    const branchTestId = 'branch-tree-item';
    const leafTestId = 'leaf-tree-item';

    function renderTree() {
      return render(
        <TreeView testId={treeTestId}>
          <TreeItem label="Branch" itemId="branch" testId={branchTestId}>
            <TreeItem label="Child one" itemId="child-1" />
            <TreeItem label="Child two" itemId="child-2" />
          </TreeItem>
          <TreeItem label="Leaf" itemId="leaf" testId={leafTestId} />
        </TreeView>
      );
    }

    it('owns exactly one live region, and it sits outside the tree', () => {
      mockDevice({ isSafari: true, isMacOS: true });

      const { container, getByTestId } = renderTree();

      const liveRegions = container.querySelectorAll('[aria-live]');

      expect(liveRegions).toHaveLength(1);
      expect(getByTestId(treeTestId).contains(liveRegions[0])).toBe(false);
    });

    it('queues behind the screen reader off macOS, instead of jumping ahead', () => {
      mockDevice({ isChrome: true, isWindows: true });

      const { container } = renderTree();

      expect(container.querySelector('[aria-live]')).toHaveAttribute(
        'aria-live',
        'polite'
      );
    });

    it('is assertive on macOS, where a polite message is dropped', () => {
      mockDevice({ isSafari: true, isMacOS: true });

      const { container } = renderTree();

      expect(container.querySelector('[aria-live]')).toHaveAttribute(
        'aria-live',
        'assertive'
      );
    });

    it('is empty on mount so newly mounted items are not announced', () => {
      mockDevice({ isSafari: true, isMacOS: true });

      const { getByTestId } = renderTree();

      expect(getByTestId(`${treeTestId}-announce`)).toHaveTextContent('');
    });

    it('stays silent when initialExpandedItems opens a deep branch', async () => {
      mockDevice({ isSafari: true, isMacOS: true });

      const { getByTestId } = render(
        <TreeView testId={treeTestId} initialExpandedItems={['deep']}>
          <TreeItem label="Top" itemId="top" testId="top">
            <TreeItem label="Nested" itemId="nested" testId="nested">
              <TreeItem label="Deep" itemId="deep" testId="deep">
                <TreeItem label="Leaf" itemId="deep-leaf" />
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeView>
      );

      await expectNoAnnouncement(getByTestId(`${treeTestId}-announce`));

      expect(getByTestId('top')).toHaveAttribute('aria-expanded', 'true');
      expect(getByTestId('nested')).toHaveAttribute('aria-expanded', 'true');
      expect(getByTestId('deep')).toHaveAttribute('aria-expanded', 'true');
    });

    it('presents the live region as a whole, not just the changed part', () => {
      mockDevice({ isSafari: true, isMacOS: true });

      const { getByTestId } = renderTree();

      expect(getByTestId(`${treeTestId}-announce`)).toHaveAttribute(
        'aria-atomic',
        'true'
      );
    });

    it('interrupts an earlier announcement instead of queueing behind it', () => {
      mockDevice({ isSafari: true, isMacOS: true });

      const { getByTestId } = renderTree();

      expect(getByTestId(`${treeTestId}-announce`)).toHaveAttribute(
        'aria-live',
        'assertive'
      );
    });

    it('replaces a message the user has already moved past', async () => {
      mockDevice({ isSafari: true, isMacOS: true });
      jest.useFakeTimers();

      try {
        const user = userEvent.setup({
          advanceTimers: jest.advanceTimersByTime,
        });
        const { getByTestId } = renderTree();
        const announce = getByTestId(`${treeTestId}-announce`);
        const expandButton = getByTestId(`${branchTestId}-expand`);

        await user.click(expandButton);
        await user.click(expandButton);

        act(() => {
          jest.advanceTimersByTime(ANNOUNCE_DELAY_MS * 2);
        });

        expect(announce).toHaveTextContent('Branch, collapsed');
        expect(announce).not.toHaveTextContent('expanded');
      } finally {
        jest.useRealTimers();
      }
    });

    it('names the item the action applied to', async () => {
      mockDevice({ isSafari: true, isMacOS: true });

      const { getByTestId } = renderTree();
      const announce = getByTestId(`${treeTestId}-announce`);

      await userEvent.click(getByTestId(`${branchTestId}-expand`));
      await expectAnnouncement(announce, 'Branch, expanded');

      await userEvent.click(getByTestId(`${branchTestId}-expand`));
      await expectAnnouncement(announce, 'Branch, collapsed');
    });

    it('uses a translation still supplied through the deprecated expansionState', async () => {
      mockDevice({ isSafari: true, isMacOS: true });

      const { getByTestId } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            expansionState: { expanded: 'розгорнуто', collapsed: 'згорнуто' },
          }}
        >
          <TreeView testId={treeTestId}>
            <TreeItem label="Branch" itemId="branch" testId={branchTestId}>
              <TreeItem label="Child one" itemId="child-1" />
            </TreeItem>
          </TreeView>
        </I18nContext.Provider>
      );
      const announce = getByTestId(`${treeTestId}-announce`);

      await userEvent.click(getByTestId(`${branchTestId}-expand`));
      await expectAnnouncement(announce, 'Branch, розгорнуто');

      await userEvent.click(getByTestId(`${branchTestId}-expand`));
      await expectAnnouncement(announce, 'Branch, згорнуто');
    });

    it('prefers the replacement string when both are supplied', async () => {
      mockDevice({ isSafari: true, isMacOS: true });

      const { getByTestId } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            expansionState: { expanded: 'розгорнуто', collapsed: 'згорнуто' },
            treeView: {
              ...defaultI18n.treeView,
              itemExpandedAnnounce: '{labelText} — відкрито',
            },
          }}
        >
          <TreeView testId={treeTestId}>
            <TreeItem label="Branch" itemId="branch" testId={branchTestId}>
              <TreeItem label="Child one" itemId="child-1" />
            </TreeItem>
          </TreeView>
        </I18nContext.Provider>
      );
      const announce = getByTestId(`${treeTestId}-announce`);

      await userEvent.click(getByTestId(`${branchTestId}-expand`));
      await expectAnnouncement(announce, 'Branch — відкрито');
    });

    it('falls back per key when only part of the section is supplied', async () => {
      mockDevice({ isSafari: true, isMacOS: true });

      const { getByTestId } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            treeView: { itemExpandedAnnounce: '{labelText} — відкрито' },
          }}
        >
          <TreeView testId={treeTestId}>
            <TreeItem label="Branch" itemId="branch" testId={branchTestId}>
              <TreeItem label="Child one" itemId="child-1" />
            </TreeItem>
          </TreeView>
        </I18nContext.Provider>
      );
      const announce = getByTestId(`${treeTestId}-announce`);

      await userEvent.click(getByTestId(`${branchTestId}-expand`));
      await expectAnnouncement(announce, 'Branch — відкрито');

      await userEvent.click(getByTestId(`${branchTestId}-expand`));
      await expectAnnouncement(announce, 'Branch, collapsed');
    });

    it('works with an i18n interface that omits the treeView section', async () => {
      mockDevice({ isSafari: true, isMacOS: true });

      const { treeView, ...withoutTreeView } = defaultI18n;

      const { getByTestId } = render(
        <I18nContext.Provider value={withoutTreeView}>
          <TreeView testId={treeTestId}>
            <TreeItem label="Branch" itemId="branch" testId={branchTestId}>
              <TreeItem label="Child one" itemId="child-1" />
            </TreeItem>
          </TreeView>
        </I18nContext.Provider>
      );

      await userEvent.click(getByTestId(`${branchTestId}-expand`));

      await expectAnnouncement(
        getByTestId(`${treeTestId}-announce`),
        'Branch, expanded'
      );
    });

    it('announces a nested branch on Chrome, where VoiceOver reads none', async () => {
      mockDevice({ isChrome: true, isMacOS: true });

      const { getByTestId } = render(
        <TreeView testId={treeTestId} initialExpandedItems={['top']}>
          <TreeItem label="Top" itemId="top" testId="top">
            <TreeItem label="Nested" itemId="nested" testId="nested">
              <TreeItem label="Deep" itemId="deep" />
            </TreeItem>
          </TreeItem>
        </TreeView>
      );
      const announce = getByTestId(`${treeTestId}-announce`);

      await userEvent.click(getByTestId('nested-expand'));
      await expectAnnouncement(announce, 'Nested, expanded');

      await userEvent.click(getByTestId('nested-expand'));
      await expectAnnouncement(announce, 'Nested, collapsed');
    });

    it('leaves top-level branches to VoiceOver on Chrome', async () => {
      mockDevice({ isChrome: true, isMacOS: true });

      const { getByTestId } = renderTree();

      await userEvent.click(getByTestId(`${branchTestId}-expand`));

      await expectNoAnnouncement(getByTestId(`${treeTestId}-announce`));
    });

    it('announces top-level branches on Safari, which reads no depth', async () => {
      mockDevice({ isSafari: true, isMacOS: true });

      const { getByTestId } = renderTree();

      await userEvent.click(getByTestId(`${branchTestId}-expand`));

      await expectAnnouncement(
        getByTestId(`${treeTestId}-announce`),
        'Branch, expanded'
      );
    });

    it('stays silent off macOS, where the screen reader reads the state', async () => {
      mockDevice({ isChrome: true, isWindows: true });

      const { getByTestId } = render(
        <TreeView testId={treeTestId} initialExpandedItems={['top']}>
          <TreeItem label="Top" itemId="top" testId="top">
            <TreeItem label="Nested" itemId="nested" testId="nested">
              <TreeItem label="Deep" itemId="deep" />
            </TreeItem>
          </TreeItem>
        </TreeView>
      );

      await userEvent.click(getByTestId('nested-expand'));

      await expectNoAnnouncement(getByTestId(`${treeTestId}-announce`));
    });

    it('does not announce expansion on engines that announce it natively', async () => {
      mockDevice({ isFirefox: true, isMacOS: true });

      const { getByTestId } = renderTree();

      await userEvent.click(getByTestId(`${branchTestId}-expand`));

      await expectNoAnnouncement(getByTestId(`${treeTestId}-announce`));
    });

    it('leaf items never contain expansion text', () => {
      mockDevice({ isSafari: true, isMacOS: true });

      const { getByTestId } = renderTree();

      expect(getByTestId(leafTestId)).not.toHaveTextContent('collapsed');
      expect(getByTestId(leafTestId)).not.toHaveTextContent('expanded');
    });

    describe('bulk expansion', () => {
      function renderBulkTree() {
        const apiRef = React.createRef();

        const view = render(
          <TreeView testId={treeTestId} apiRef={apiRef}>
            <TreeItem label="Alpha" itemId="alpha">
              <TreeItem label="Beta" itemId="beta">
                <TreeItem label="Gamma" itemId="gamma" />
              </TreeItem>
            </TreeItem>
            <TreeItem label="Delta" itemId="delta">
              <TreeItem label="Epsilon" itemId="epsilon" />
            </TreeItem>
          </TreeView>
        );

        return { ...view, apiRef };
      }

      it('names the action, not the last branch it happened to touch', async () => {
        mockDevice({ isSafari: true, isMacOS: true });

        const { apiRef, getByTestId } = renderBulkTree();
        const announce = getByTestId(`${treeTestId}-announce`);

        await act(async () => {
          apiRef.current.expandAll();
        });

        await expectAnnouncement(announce, 'All items expanded');
        expect(announce).not.toHaveTextContent('Delta');

        await act(async () => {
          apiRef.current.collapseAll();
        });

        await expectAnnouncement(announce, 'All items collapsed');
        expect(announce).not.toHaveTextContent('Delta');
      });

      it('still announces a single branch the user expands afterwards', async () => {
        mockDevice({ isSafari: true, isMacOS: true });

        const { apiRef, getByTestId } = renderBulkTree();
        const announce = getByTestId(`${treeTestId}-announce`);

        await act(async () => {
          apiRef.current.expandAll();
        });
        await act(async () => {
          apiRef.current.collapseAll();
        });

        await userEvent.click(getByTestId('alpha-expand'));

        await expectAnnouncement(announce, 'Alpha, expanded');
      });

      it('is announced on every platform, having no native equivalent', async () => {
        mockDevice({ isFirefox: true, isWindows: true });

        const { apiRef, getByTestId } = renderBulkTree();

        await act(async () => {
          apiRef.current.expandAll();
        });

        await expectAnnouncement(
          getByTestId(`${treeTestId}-announce`),
          'All items expanded'
        );
      });
    });
  });

  describe('selection announcement (issue #2444)', () => {
    const treeTestId = 'selecting-tree';

    beforeEach(() => {
      mockDevice({ isSafari: true, isMacOS: true });
    });

    function renderTree(selectable) {
      return render(
        <TreeView testId={treeTestId} selectable={selectable}>
          <TreeItem label="Branch" itemId="branch" testId="branch">
            <TreeItem label="Child one" itemId="child-1" testId="child-1" />
          </TreeItem>
          <TreeItem label="Leaf" itemId="leaf" testId="leaf" />
        </TreeView>
      );
    }

    it('announces keyboard selection', async () => {
      const { getByTestId } = renderTree(TreeViewSelectable.multi);

      getByTestId('leaf').focus();
      await userEvent.keyboard(' ');

      await expectAnnouncement(
        getByTestId(`${treeTestId}-announce`),
        'Leaf, selected'
      );

      await userEvent.keyboard(' ');

      await expectAnnouncement(
        getByTestId(`${treeTestId}-announce`),
        'Leaf, not selected'
      );
    });

    it('stays silent where the screen reader reads the state itself', async () => {
      mockDevice({ isChrome: true, isWindows: true });

      const { getByTestId } = renderTree(TreeViewSelectable.multi);

      await userEvent.click(getByTestId('leaf-checkbox'));

      await expectNoAnnouncement(getByTestId(`${treeTestId}-announce`));
    });

    it('announces only the cascade off macOS, which no screen reader reports', async () => {
      mockDevice({ isChrome: true, isWindows: true });

      const { getByTestId } = renderTree(TreeViewSelectable.multi);
      const announce = getByTestId(`${treeTestId}-announce`);

      await userEvent.click(getByTestId('branch-checkbox'));
      await expectAnnouncement(announce, 'All subitems are selected');

      await userEvent.click(getByTestId('branch-checkbox'));
      await expectAnnouncement(announce, 'No subitems are selected');
    });

    it('announces the cascade once per action, not once per subitem', async () => {
      mockDevice({ isChrome: true, isWindows: true });

      const { container, getByTestId } = render(
        <TreeView testId={treeTestId} selectable={TreeViewSelectable.multi}>
          <TreeItem label="Branch" itemId="branch" testId="branch">
            <TreeItem label="Child one" itemId="child-1" />
            <TreeItem label="Child two" itemId="child-2" />
            <TreeItem label="Child three" itemId="child-3" />
          </TreeItem>
        </TreeView>
      );

      await userEvent.click(getByTestId('branch-checkbox'));

      expect(container.querySelectorAll('[aria-live]')).toHaveLength(1);
      await expectAnnouncement(
        getByTestId(`${treeTestId}-announce`),
        'All subitems are selected'
      );
    });

    it('reports a partial cascade off macOS, which Firefox reads as unchecked', async () => {
      mockDevice({ isFirefox: true, isWindows: true });

      const { getByTestId } = render(
        <TreeView testId={treeTestId} selectable={TreeViewSelectable.multi}>
          <TreeItem label="Branch" itemId="branch" testId="branch">
            <TreeItem label="Child one" itemId="child-1" />
            <TreeItem label="Child two" itemId="child-2" isDisabled />
          </TreeItem>
        </TreeView>
      );

      await userEvent.click(getByTestId('branch-checkbox'));

      await expectAnnouncement(
        getByTestId(`${treeTestId}-announce`),
        'Some subitems are selected'
      );
    });

    it('stays silent off macOS when nothing can cascade', async () => {
      mockDevice({ isChrome: true, isWindows: true });

      const { getByTestId } = render(
        <TreeView
          testId={treeTestId}
          selectable={TreeViewSelectable.multi}
          checkChildren={false}
        >
          <TreeItem label="Branch" itemId="branch" testId="branch">
            <TreeItem label="Child one" itemId="child-1" />
          </TreeItem>
        </TreeView>
      );

      await userEvent.click(getByTestId('branch-checkbox'));

      await expectNoAnnouncement(getByTestId(`${treeTestId}-announce`));
    });

    it('announces pointer selection exactly once', async () => {
      const { container, getByTestId } = renderTree(TreeViewSelectable.multi);

      await userEvent.click(getByTestId('leaf-checkbox'));

      expect(container.querySelectorAll('[aria-live]')).toHaveLength(1);
      await expectAnnouncement(
        getByTestId(`${treeTestId}-announce`),
        'Leaf, selected'
      );
    });

    it('announces the item the user acted on, not the items a cascade touched', async () => {
      const { getByTestId } = renderTree(TreeViewSelectable.multi);

      await userEvent.click(getByTestId('branch-checkbox'));

      await expectAnnouncement(
        getByTestId(`${treeTestId}-announce`),
        'Branch, selected, all subitems selected'
      );
    });

    it('tells the user a branch took its subitems with it', async () => {
      const { getByTestId } = renderTree(TreeViewSelectable.multi);

      await userEvent.click(getByTestId('branch-checkbox'));

      await expectAnnouncement(
        getByTestId(`${treeTestId}-announce`),
        'Branch, selected, all subitems selected'
      );

      await userEvent.click(getByTestId('branch-checkbox'));

      await expectAnnouncement(
        getByTestId(`${treeTestId}-announce`),
        'Branch, not selected, no subitems selected'
      );
    });

    it('says nothing about subitems for a leaf, which has none', async () => {
      const { getByTestId } = renderTree(TreeViewSelectable.multi);

      await userEvent.click(getByTestId('leaf-checkbox'));

      await expectAnnouncement(
        getByTestId(`${treeTestId}-announce`),
        'Leaf, selected'
      );
    });

    it('says nothing about subitems when checkChildren keeps them untouched', async () => {
      const { getByTestId } = render(
        <TreeView
          testId={treeTestId}
          selectable={TreeViewSelectable.multi}
          checkChildren={false}
        >
          <TreeItem label="Branch" itemId="branch" testId="branch">
            <TreeItem label="Child one" itemId="child-1" testId="child-1" />
          </TreeItem>
        </TreeView>
      );

      await userEvent.click(getByTestId('branch-checkbox'));

      await expectAnnouncement(
        getByTestId(`${treeTestId}-announce`),
        'Branch, selected'
      );
    });

    it('announces the status a keyboard selection ended up in, not the one requested', async () => {
      const { getByTestId } = render(
        <TreeView testId={treeTestId} selectable={TreeViewSelectable.multi}>
          <TreeItem label="Branch" itemId="branch" testId="branch">
            <TreeItem label="Child one" itemId="child-1" testId="child-1" />
            <TreeItem
              label="Child two"
              itemId="child-2"
              testId="child-2"
              isDisabled
            />
          </TreeItem>
        </TreeView>
      );

      getByTestId('branch').focus();
      await userEvent.keyboard(' ');

      await expectAnnouncement(
        getByTestId(`${treeTestId}-announce`),
        'Branch, partially selected'
      );
    });

    it('says nothing about subitems in single select, which never cascades', async () => {
      const { getByTestId } = render(
        <TreeView
          testId={treeTestId}
          selectable={TreeViewSelectable.single}
          checkChildren
        >
          <TreeItem label="Branch" itemId="branch" testId="branch">
            <TreeItem label="Child one" itemId="child-1" testId="child-1" />
          </TreeItem>
        </TreeView>
      );

      await userEvent.click(getByTestId('branch-itemwrapper'));

      await expectAnnouncement(
        getByTestId(`${treeTestId}-announce`),
        'Branch, selected'
      );
    });

    it('says nothing about subitems when every subitem is disabled', async () => {
      const { getByTestId } = render(
        <TreeView testId={treeTestId} selectable={TreeViewSelectable.multi}>
          <TreeItem label="Branch" itemId="branch" testId="branch">
            <TreeItem
              label="Child one"
              itemId="child-1"
              testId="child-1"
              isDisabled
            />
          </TreeItem>
        </TreeView>
      );

      await userEvent.click(getByTestId('branch-checkbox'));

      await expectAnnouncement(
        getByTestId(`${treeTestId}-announce`),
        'Branch, selected'
      );
    });

    it('announces the status the item ended up in, not the one requested', async () => {
      const { getByTestId } = render(
        <TreeView testId={treeTestId} selectable={TreeViewSelectable.multi}>
          <TreeItem label="Branch" itemId="branch" testId="branch">
            <TreeItem label="Child one" itemId="child-1" testId="child-1" />
            <TreeItem
              label="Child two"
              itemId="child-2"
              testId="child-2"
              isDisabled
            />
          </TreeItem>
        </TreeView>
      );

      await userEvent.click(getByTestId('branch-checkbox'));

      expect(getByTestId('branch')).toHaveAttribute('aria-checked', 'mixed');
      await expectAnnouncement(
        getByTestId(`${treeTestId}-announce`),
        'Branch, partially selected'
      );
    });
  });

  describe('ARIA ownership structure (issue #2444)', () => {
    function renderTree() {
      return render(
        <TreeView initialExpandedItems={['branch']}>
          <TreeItem label="Branch" itemId="branch" testId="branch">
            <TreeItem label="Child" itemId="child" testId="child" />
          </TreeItem>
        </TreeView>
      );
    }

    it('does not expose a generic element between the tree and its items', () => {
      const { getByRole } = renderTree();
      const tree = getByRole('tree');

      Array.from(tree.children).forEach(child => {
        expect(child).toHaveAttribute('role', 'none');
      });
    });

    it('does not expose a generic element between a group and its items', () => {
      const { getByRole } = renderTree();
      const group = getByRole('group');

      Array.from(group.children).forEach(child => {
        expect(child).toHaveAttribute('role', 'none');
      });
    });

    it('keeps every tree item reachable through the tree role', () => {
      const { getAllByRole } = renderTree();

      expect(getAllByRole('treeitem')).toHaveLength(2);
    });

    it('leaves nothing generic between a tree item and the group it owns', () => {
      const { getByTestId, getByRole } = renderTree();

      let node = getByRole('group').parentElement;

      while (node && node !== getByTestId('branch')) {
        expect(node).toHaveAttribute('role', 'none');
        node = node.parentElement;
      }

      expect(node).toBe(getByTestId('branch'));
    });

    it('places sibling tree items in a single group', () => {
      const { getAllByRole } = render(
        <TreeView initialExpandedItems={['branch']}>
          <TreeItem label="Branch" itemId="branch" testId="branch">
            <TreeItem label="Child one" itemId="child-1" />
            <TreeItem label="Child two" itemId="child-2" />
            <TreeItem label="Child three" itemId="child-3" />
          </TreeItem>
        </TreeView>
      );

      const groups = getAllByRole('group');

      expect(groups).toHaveLength(1);
      expect(
        groups[0].querySelectorAll(':scope > * > [role="treeitem"]')
      ).toHaveLength(3);
    });
  });

  describe('accessible name (issue #2444)', () => {
    // jsdom does not stop the name computation at a nested group, so these
    // tests pin the structure rather than the name itself.
    function renderDeepTree(props = {}) {
      return render(
        <TreeView
          initialExpandedItems={['branch', 'child', 'grandchild']}
          {...props}
        >
          <TreeItem label="Branch" itemId="branch" testId="branch">
            <TreeItem label="Child" itemId="child" testId="child">
              <TreeItem label="Grandchild" itemId="grandchild">
                <TreeItem label="Great-grandchild" itemId="great" />
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeView>
      );
    }

    it('keeps the nested subtree out of the item label row', () => {
      const { getByTestId } = renderDeepTree();

      const branch = getByTestId('branch');
      const labelRow = branch.querySelector(`#${branch.id}-itemwrapper`);

      expect(labelRow).toHaveTextContent('Branch');
      expect(labelRow).not.toHaveTextContent('Child');
      expect(labelRow.querySelector('[role="group"]')).toBeNull();
    });

    it('owns the nested subtree through a single group', () => {
      const { getByTestId } = renderDeepTree();

      const branch = getByTestId('branch');
      const groups = branch.querySelectorAll(':scope > * > [role="group"]');

      expect(groups).toHaveLength(1);
      expect(groups[0]).toHaveTextContent('Child');
    });

    it('keeps the label row free of the subtree in multi select', () => {
      const { getByTestId } = renderDeepTree({ selectable: 'multi' });

      const branch = getByTestId('branch');
      const labelRow = branch.querySelector(`#${branch.id}-itemwrapper`);

      expect(labelRow).toHaveTextContent('Branch');
      expect(labelRow).not.toHaveTextContent('Child');
    });

    it('leaves tree items named by their own contents', () => {
      const { getAllByRole } = renderDeepTree();

      getAllByRole('treeitem').forEach(item => {
        expect(item).not.toHaveAttribute('aria-labelledby');
      });
    });
  });
});

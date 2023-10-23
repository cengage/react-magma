import React from 'react';
import { AsteriskIcon } from 'react-magma-icons';
import { Dropdown } from '.';
import {
  DropdownContent,
  DropdownDivider,
  DropdownHeader,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownSplitButton,
  DropdownButton,
  DropdownMenuNavItem,
  DropdownExpandableMenuGroup,
  DropdownExpandableMenuItem,
  DropdownExpandableMenuListItem,
  DropdownExpandableMenuButton,
  DropdownExpandableMenuPanel,
} from './';
import { Modal } from '../Modal';
import { magma } from '../../theme/magma';
import { RestaurantMenuIcon } from 'react-magma-icons';
import { transparentize } from 'polished';

import { act, render, fireEvent, getByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Dropdown', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Dropdown testId={testId}>
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem onClick={() => {}}>Menu item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>
            Menu item number two
          </DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByTestId('dropdownContent')).toBeInTheDocument();
    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');
  });

  it('should render a custom wrapped dropdown item', () => {
    // eslint-disable-next-line react/prop-types
    const OptionalDropdownItem = ({ toggle, dropdownMenuItemProps }) => {
      return toggle ? (
        <DropdownMenuItem {...dropdownMenuItemProps}>
          Hello There
        </DropdownMenuItem>
      ) : null;
    };

    const { getByText } = render(
      <Dropdown>
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem onClick={() => {}}>Menu item 1</DropdownMenuItem>
          <OptionalDropdownItem onClick={() => {}} toggle />
          <div>
            <DropdownMenuItem onClick={() => {}}>FAQ</DropdownMenuItem>
          </div>
        </DropdownContent>
      </Dropdown>
    );

    const renderedOptionalTab = getByText('Hello There');

    expect(renderedOptionalTab).toBeInTheDocument();
    expect(getByText('FAQ')).toBeInTheDocument();
  });

  it('should render a dropup', () => {
    const { getByTestId } = render(
      <Dropdown dropDirection="up">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByTestId('caretUp')).toBeInTheDocument();
    expect(getByTestId('dropdownContent')).toHaveStyleRule('top', 'auto');
    expect(getByTestId('dropdownContent')).toHaveStyleRule('bottom', '100%');
  });

  it('should render a dropleft', () => {
    const { getByTestId } = render(
      <Dropdown dropDirection="left">
        <DropdownButton testId="dropdownButton">Toggle me</DropdownButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByTestId('caretLeft')).toBeInTheDocument();
    expect(getByTestId('dropdownContent')).toHaveStyleRule(
      'top',
      magma.spaceScale.spacing02
    );
    expect(getByTestId('dropdownContent')).toHaveStyleRule('right', '100%');
    expect(getByTestId('dropdownButton')).toHaveStyleRule(
      'padding-left',
      magma.spaceScale.spacing03
    );
  });

  it('should render a dropright', () => {
    const { getByTestId } = render(
      <Dropdown dropDirection="right">
        <DropdownButton testId="dropdownButton">Toggle me</DropdownButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByTestId('caretRight')).toBeInTheDocument();
    expect(getByTestId('dropdownContent')).toHaveStyleRule(
      'top',
      magma.spaceScale.spacing02
    );
    expect(getByTestId('dropdownContent')).toHaveStyleRule('left', '100%');
    expect(getByTestId('dropdownButton')).toHaveStyleRule(
      'padding-right',
      magma.spaceScale.spacing03
    );
  });

  it('should render a dropdown with a small button', () => {
    const { getByTestId } = render(
      <Dropdown>
        <DropdownButton testId="dropdownButton" size="small">
          Toggle me
        </DropdownButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByTestId('dropdownButton')).toHaveStyleRule(
      'padding-right',
      magma.spaceScale.spacing02
    );
  });

  it('should render a dropdown with a large button', () => {
    const { getByTestId } = render(
      <Dropdown>
        <DropdownButton testId="dropdownButton" size="large">
          Toggle me
        </DropdownButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByTestId('dropdownButton')).toHaveStyleRule(
      'padding-right',
      magma.spaceScale.spacing05
    );
  });

  it('should render a right aligned menu', () => {
    const { getByTestId } = render(
      <Dropdown alignment="end">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByTestId('dropdownContent')).toHaveStyleRule('left', 'auto');
    expect(getByTestId('dropdownContent')).toHaveStyleRule(
      'right',
      magma.spaceScale.spacing02
    );
  });

  it('should render a top-aligned menu', () => {
    const { getByTestId } = render(
      <Dropdown alignment="end" dropDirection="right">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByTestId('dropdownContent')).toHaveStyleRule('top', 'auto');
    expect(getByTestId('dropdownContent')).toHaveStyleRule(
      'bottom',
      magma.spaceScale.spacing02
    );
  });

  it('should render a split dropdown', () => {
    const { getByTestId, container } = render(
      <Dropdown>
        <DropdownSplitButton>Toggle me</DropdownSplitButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByTestId('caretDown')).toBeInTheDocument();
    expect(container.querySelectorAll('button').length).toBe(2);
  });

  it('should render a split dropdown with custom label', () => {
    const { getByLabelText } = render(
      <Dropdown>
        <DropdownSplitButton aria-label="Custom label">
          Toggle me
        </DropdownSplitButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByLabelText('Custom label')).toBeInTheDocument();
  });

  it('should render a split dropdown with margin left on solid variants', () => {
    const { getByLabelText } = render(
      <Dropdown>
        <DropdownSplitButton>Toggle me</DropdownSplitButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByLabelText('Toggle menu')).toHaveAttribute(
      'style',
      'margin-left: 2px;'
    );
  });

  it('should render a split dropdown with no margin on solid variants', () => {
    const { getByLabelText } = render(
      <Dropdown>
        <DropdownSplitButton variant="solid">Toggle me</DropdownSplitButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByLabelText('Toggle menu')).toHaveAttribute(
      'style',
      'margin-left: 2px;'
    );
  });

  it('should render a split dropup', () => {
    const { getByTestId } = render(
      <Dropdown dropDirection="up">
        <DropdownSplitButton>Toggle me</DropdownSplitButton>
      </Dropdown>
    );

    expect(getByTestId('caretUp')).toBeInTheDocument();
  });

  it('should render a button with custom icon', () => {
    const { queryByTestId, getByText } = render(
      <Dropdown>
        <DropdownButton icon={<AsteriskIcon />}>Toggle me</DropdownButton>
        <DropdownContent />
      </Dropdown>
    );
    expect(getByText('Toggle me')).toHaveStyleRule(
      'padding-left',
      magma.spaceScale.spacing03
    );

    expect(queryByTestId('caretUp')).not.toBeInTheDocument();
    expect(queryByTestId('caretDown')).not.toBeInTheDocument();
  });

  it('should render a button with custom icon with specified icon position', () => {
    const { getByText } = render(
      <Dropdown>
        <DropdownButton icon={<AsteriskIcon />} iconPosition="right">
          Toggle me
        </DropdownButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByText('Toggle me')).toHaveStyleRule(
      'padding-right',
      magma.spaceScale.spacing03
    );
  });

  it('should toggle the menu when the button is clicked', () => {
    const toggleText = 'Toggle me';

    const { getByText, getByTestId } = render(
      <Dropdown>
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');

    fireEvent.click(getByText(toggleText));

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'block');

    fireEvent.click(getByText(toggleText));

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');
  });

  it('should toggle the menu when the button is clicked in a split dropdown', () => {
    const toggleText = 'Toggle me';
    const labelText = 'Toggle menu';

    const { getByLabelText, getByTestId } = render(
      <Dropdown>
        <DropdownSplitButton>{toggleText}</DropdownSplitButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');

    fireEvent.click(getByLabelText(labelText));

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'block');

    fireEvent.click(getByLabelText(labelText));

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');
  });

  it('should fire onOpen when the menu is opened', () => {
    const onOpen = jest.fn();

    const { getByText, getByTestId } = render(
      <Dropdown testId="dropdown" onOpen={onOpen}>
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');

    fireEvent.click(getByText('Toggle me'));

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'block');
    expect(onOpen).toHaveBeenCalled();
  });

  it('should close the menu when menu is blurred', () => {
    const onClose = jest.fn();

    const { getByText, getByTestId } = render(
      <Dropdown testId="dropdown" onClose={onClose}>
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');

    fireEvent.click(getByText('Toggle me'));

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'block');

    const menuItem = getByText('Menu item');

    fireEvent.click(menuItem);

    expect(onClose).toHaveBeenCalled();

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');
  });

  it('should close the menu when button is blurred', () => {
    jest.useFakeTimers();

    const onClose = jest.fn();
    const { getByText, getByTestId } = render(
      <Dropdown testId="dropdown" onClose={onClose}>
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');

    userEvent.click(getByText('Toggle me'));

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'block');

    userEvent.click(document.body);

    act(jest.runAllTimers);

    expect(onClose).toHaveBeenCalled();
    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');

    jest.useRealTimers();
  });

  it('should close the menu when escape key is pressed', () => {
    const { getByText, getByTestId } = render(
      <Dropdown testId="dropdown">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');

    fireEvent.click(getByText('Toggle me'));

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'block');

    fireEvent.keyDown(getByTestId('dropdown'), {
      key: 'ArrowDown',
    });

    fireEvent.keyDown(getByTestId('dropdown'), {
      key: 'Escape',
      code: 27,
    });

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');
  });

  it('go to the first or next item when the down arrow key is pressed', () => {
    const { getByText, getByTestId } = render(
      <Dropdown testId="dropdown">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem onClick={() => {}}>Menu item 1</DropdownMenuItem>
          <DropdownDivider />
          <DropdownMenuItem onClick={() => {}}>Menu item 2</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    fireEvent.click(getByText('Toggle me'));

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'block');

    fireEvent.keyDown(getByTestId('dropdown'), {
      key: 'ArrowDown',
      code: 40,
    });

    expect(getByText('Menu item 1')).toHaveFocus();

    fireEvent.keyDown(getByTestId('dropdown'), {
      key: 'ArrowDown',
      code: 40,
    });

    expect(getByText('Menu item 2')).toHaveFocus();
  });

  it('go to the last or previous item when the up arrow key is pressed', () => {
    const { getByText, getByTestId } = render(
      <Dropdown testId="dropdown">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem onClick={() => {}}>Menu item 1</DropdownMenuItem>
          <DropdownDivider />
          <DropdownMenuItem onClick={() => {}}>Menu item 2</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    fireEvent.click(getByText('Toggle me'));

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'block');

    fireEvent.keyDown(getByTestId('dropdown'), {
      key: 'ArrowUp',
      code: 38,
    });

    expect(getByText('Menu item 2')).toHaveFocus();

    fireEvent.keyDown(getByTestId('dropdown'), {
      key: 'ArrowUp',
      code: 38,
    });

    expect(getByText('Menu item 1')).toHaveFocus();
  });

  it('should render a dropdown menu item with an icon', () => {
    const { container } = render(
      <Dropdown>
        <DropdownMenuItem icon={<AsteriskIcon />}>Menu item</DropdownMenuItem>
      </Dropdown>
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should render a dropdown menu item with correct styles when fixed width', () => {
    const { getByText } = render(
      <Dropdown width="100px">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    expect(getByText('Menu item')).toHaveStyleRule('white-space', 'normal');
  });

  it('should render a dropdown menu item with correct styles with custom max-height', () => {
    const { getByTestId } = render(
      <Dropdown maxHeight="100px">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    expect(getByTestId('dropdownContent')).toHaveStyleRule(
      'max-height',
      '100px'
    );
  });

  it('should render a disabled dropdown item', () => {
    const onClick = jest.fn();
    const text = 'menu item';

    const { getByText } = render(
      <Dropdown alignment="right">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem disabled onClick={onClick}>
            {text}
          </DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    fireEvent.click(getByText(text));
    expect(onClick).not.toHaveBeenCalled();
    expect(getByText(text)).toHaveStyleRule('cursor', 'not-allowed');
    expect(getByText(text)).toHaveStyleRule(
      'color',
      transparentize(0.4, magma.colors.neutral500)
    );
  });

  it('should render a dropdown header', () => {
    const text = 'header item';
    const onClick = jest.fn();

    const { getByText } = render(
      <Dropdown>
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownHeader>{text}</DropdownHeader>
          <DropdownMenuItem onClick={onClick}>blah</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    expect(getByText(text)).toBeInTheDocument();
  });

  it('should render dropdown menu items in groups', () => {
    const headerText = 'header';
    const headerText2 = 'header2';

    const { getByLabelText, getByText } = render(
      <Dropdown>
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownMenuGroup header={headerText}>
            <DropdownMenuItem>Menu Item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu Item 2</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup header={headerText2}>
            <DropdownMenuItem>Menu Item 3</DropdownMenuItem>
            <DropdownMenuItem>Menu Item 4</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownContent>
      </Dropdown>
    );

    const group1 = getByLabelText(headerText);
    const group2 = getByLabelText(headerText2);

    expect(group1).toHaveAttribute('role', 'group');
    expect(getByText('Menu Item 1').closest('div[role="group"]')).toEqual(
      group1
    );
    expect(getByText('Menu Item 3').closest('div[role="group"]')).toEqual(
      group2
    );
  });

  it('should render a dropdown menu divider', () => {
    const { container } = render(<DropdownDivider />);

    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('should fire the onclick event for an item when enter is pressed', () => {
    const onClick = jest.fn();
    const itemText = 'item';

    const { getByText } = render(
      <Dropdown>
        <DropdownButton>Toggle</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem onClick={onClick}>{itemText}</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    fireEvent.keyDown(getByText(itemText), {
      key: 'Enter',
      code: 13,
    });

    expect(onClick).toHaveBeenCalled();
  });

  it('should fire the onclick event for an item when space bar is pressed', () => {
    const onClick = jest.fn();
    const itemText = 'item';

    const { getByText } = render(
      <Dropdown>
        <DropdownButton>Toggle</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem onClick={onClick}>{itemText}</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    fireEvent.keyDown(getByText(itemText), {
      key: ' ',
      code: 32,
    });

    expect(onClick).toHaveBeenCalled();
  });

  it('should render a dropdown with an active item', async () => {
    const { container, getByText } = render(
      <Dropdown activeIndex={1}>
        <DropdownButton>Toggle</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem onClick={() => {}}>aaa</DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>bbb</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    const activeStylePadding = `${magma.spaceScale.spacing03} ${magma.spaceScale.spacing05}`;
    const inActiveStylePadding = `${magma.spaceScale.spacing03} ${magma.spaceScale.spacing05} ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing11}`;

    fireEvent.click(getByText('Toggle'));

    expect(getByText('aaa')).toHaveStyleRule('padding', inActiveStylePadding);
    expect(getByText('bbb')).toHaveStyleRule('padding', activeStylePadding);
    expect(container.querySelector('svg')).toBeInTheDocument();

    fireEvent.click(getByText('aaa'));
    expect(getByText('aaa')).toHaveStyleRule('padding', activeStylePadding);
    expect(getByText('bbb')).toHaveStyleRule('padding', inActiveStylePadding);
  });

  it('should render a dropdown with links', () => {
    const { getByText } = render(
      <Dropdown>
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownMenuNavItem to="http://www.google.com">
            Google
          </DropdownMenuNavItem>
        </DropdownContent>
      </Dropdown>
    );

    expect(getByText('Google')).toHaveAttribute(
      'href',
      'http://www.google.com'
    );
  });

  it('should render a dropdown with a link with an icon', () => {
    const { getByText } = render(
      <Dropdown>
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownMenuNavItem
            icon={<AsteriskIcon />}
            to="http://www.google.com"
          >
            Google
          </DropdownMenuNavItem>
        </DropdownContent>
      </Dropdown>
    );

    expect(getByText('Google').querySelector('svg')).toBeInTheDocument();
  });

  describe('dropdown without items', () => {
    it('should focus the entire container when button is clicked', () => {
      jest.useFakeTimers();

      const { getByText, getByTestId } = render(
        <Dropdown testId="dropdown">
          <DropdownButton>Toggle me</DropdownButton>
          <DropdownContent>
            <p>test content</p>
            <button>something</button>
          </DropdownContent>
        </Dropdown>
      );

      fireEvent.click(getByText('Toggle me'));

      act(jest.runAllTimers);

      expect(getByTestId('dropdownContent')).toHaveStyleRule(
        'display',
        'block'
      );

      expect(getByTestId('dropdownContent')).toHaveFocus();

      jest.useRealTimers();
    });

    it('should close the menu when escape key is pressed', () => {
      const { getByText, getByTestId } = render(
        <Dropdown testId="dropdown">
          <DropdownButton>Toggle me</DropdownButton>
          <DropdownContent>
            <p>test</p>
          </DropdownContent>
        </Dropdown>
      );

      expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');

      fireEvent.click(getByText('Toggle me'));

      expect(getByTestId('dropdownContent')).toHaveStyleRule(
        'display',
        'block'
      );

      fireEvent.keyDown(getByTestId('dropdown'), {
        key: 'ArrowDown',
      });

      fireEvent.keyDown(getByTestId('dropdown'), {
        key: 'Escape',
        code: 27,
      });

      expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');
    });

    //For Dropdowns in Modals
    it('should close the menu when escape key is pressed, and retain the active modal', () => {
      const { getByText, getByTestId } = render(
        <Modal testId="modal" isOpen>
          <Dropdown testId="dropdown">
            <DropdownButton>Toggle me</DropdownButton>
            <DropdownContent>
              <p>test</p>
            </DropdownContent>
          </Dropdown>
        </Modal>
      );

      expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');

      fireEvent.click(getByText('Toggle me'));

      expect(getByTestId('dropdownContent')).toHaveStyleRule(
        'display',
        'block'
      );

      fireEvent.keyDown(getByTestId('dropdown'), {
        key: 'ArrowDown',
      });

      fireEvent.keyDown(getByTestId('dropdown'), {
        key: 'Escape',
        code: 27,
      });

      setTimeout(() => {
        expect(getByTestId('dropdownContent')).toHaveStyleRule(
          'display',
          'none'
        );
      }, 500);
      expect(getByTestId('modal')).toBeInTheDocument();
    });

    it('should close the menu on blur', () => {
      jest.useFakeTimers();

      const onClose = jest.fn();
      const { getByText, getByTestId } = render(
        <Dropdown testId="dropdown" onClose={onClose}>
          <DropdownButton>Toggle me</DropdownButton>
          <DropdownContent>
            <p>test</p>
          </DropdownContent>
        </Dropdown>
      );

      expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');
      userEvent.click(getByText('Toggle me'));
      expect(getByTestId('dropdownContent')).toHaveStyleRule(
        'display',
        'block'
      );

      userEvent.click(document.body);
      act(jest.runAllTimers);

      expect(onClose).toHaveBeenCalled();
      expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');
      jest.useRealTimers();
    });
  });

  it('should not render the false child', () => {
    const visible = false;
    const { queryByText } = render(
      <Dropdown>
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownMenuGroup header="header">
          {visible && <DropdownMenuItem>Menu Item 1</DropdownMenuItem>}
          <DropdownMenuItem>Menu Item 2</DropdownMenuItem>
        </DropdownMenuGroup>
      </Dropdown>
    );

    expect(queryByText('Menu Item 1')).not.toBeInTheDocument();
    expect(queryByText('Menu Item 2')).toBeInTheDocument();
  });

  describe('dropdown with expandable menu', () => {
    const expandableGroupId = 'expandable group';
    const expandableItemId = 'expandable item';
    const expandableButtonId = 'expandable button';
    const expandablePanelId = 'expandable panel';
    const expandablePanelTwoId = 'expandable panel two';

    it('should render an expandable menu group', () => {
      const { getByTestId } = render(
        <Dropdown>
          <DropdownButton>Expandable Items Dropdown</DropdownButton>
          <DropdownContent>
            <DropdownExpandableMenuGroup testId={expandableGroupId}>
              <DropdownExpandableMenuItem testId={expandableItemId}>
                <DropdownExpandableMenuButton testId={expandableButtonId}>
                  Pasta
                </DropdownExpandableMenuButton>
              </DropdownExpandableMenuItem>
            </DropdownExpandableMenuGroup>
          </DropdownContent>
        </Dropdown>
      );
      expect(getByTestId(expandableGroupId)).toBeInTheDocument();
      expect(getByTestId(expandableItemId)).toBeInTheDocument();
      expect(getByTestId(expandableButtonId)).toBeInTheDocument();
    });

    it('should render an expandable menu group with icons', () => {
      const { getByText } = render(
        <Dropdown>
          <DropdownButton>Expandable Items Dropdown</DropdownButton>
          <DropdownContent>
            <DropdownExpandableMenuGroup>
              <DropdownExpandableMenuItem>
                <DropdownExpandableMenuButton icon={<RestaurantMenuIcon />}>
                  Pasta
                </DropdownExpandableMenuButton>
              </DropdownExpandableMenuItem>
            </DropdownExpandableMenuGroup>
          </DropdownContent>
        </Dropdown>
      );
      expect(getByText('Pasta').querySelector('svg')).toBeInTheDocument();
    });

    it('should render an expanded panel of menu items when the DropdownExpandableMenuButton is clicked', () => {
      const { getByTestId, getByText } = render(
        <Dropdown>
          <DropdownButton>Expandable Items Dropdown</DropdownButton>
          <DropdownContent>
            <DropdownExpandableMenuGroup>
              <DropdownExpandableMenuItem>
                <DropdownExpandableMenuButton>
                  Pasta
                </DropdownExpandableMenuButton>
                <DropdownExpandableMenuPanel testId={expandablePanelId}>
                  <DropdownExpandableMenuListItem>
                    Fresh
                  </DropdownExpandableMenuListItem>
                  <DropdownExpandableMenuListItem>
                    Processed
                  </DropdownExpandableMenuListItem>
                </DropdownExpandableMenuPanel>
              </DropdownExpandableMenuItem>
            </DropdownExpandableMenuGroup>
          </DropdownContent>
        </Dropdown>
      );

      fireEvent.click(getByText('Pasta'));

      expect(getByTestId(expandablePanelId)).toBeInTheDocument();
    });

    it('should close an expanded panel of menu items when the DropdownExpandableMenuButton is clicked', () => {
      const { getByTestId, getByText } = render(
        <Dropdown>
          <DropdownButton>Expandable Items Dropdown</DropdownButton>
          <DropdownContent>
            <DropdownExpandableMenuGroup>
              <DropdownExpandableMenuItem>
                <DropdownExpandableMenuButton>
                  Pasta
                </DropdownExpandableMenuButton>
                <DropdownExpandableMenuPanel testId={expandablePanelId}>
                  <DropdownExpandableMenuListItem>
                    Fresh
                  </DropdownExpandableMenuListItem>
                  <DropdownExpandableMenuListItem>
                    Processed
                  </DropdownExpandableMenuListItem>
                </DropdownExpandableMenuPanel>
              </DropdownExpandableMenuItem>
            </DropdownExpandableMenuGroup>
          </DropdownContent>
        </Dropdown>
      );

      fireEvent.click(getByText('Pasta'));

      expect(getByTestId(expandablePanelId)).toBeInTheDocument();

      fireEvent.click(getByText('Pasta'));

      expect(getByText('Fresh')).not.toBeVisible();
    });

    it('should have a default expanded item set by the user with defaultIndex', () => {
      const { getByTestId, getByText, queryByTestId } = render(
        <Dropdown>
          <DropdownButton>Expandable Items Dropdown</DropdownButton>
          <DropdownContent>
            <DropdownExpandableMenuGroup defaultIndex={[0]}>
              <DropdownExpandableMenuItem>
                <DropdownExpandableMenuButton>
                  Pasta
                </DropdownExpandableMenuButton>
                <DropdownExpandableMenuPanel testId={expandablePanelId}>
                  <DropdownExpandableMenuListItem>
                    Fresh
                  </DropdownExpandableMenuListItem>
                  <DropdownExpandableMenuListItem>
                    Processed
                  </DropdownExpandableMenuListItem>
                </DropdownExpandableMenuPanel>
              </DropdownExpandableMenuItem>

              <DropdownExpandableMenuItem>
                <DropdownExpandableMenuButton>
                  Bacon
                </DropdownExpandableMenuButton>
                <DropdownExpandableMenuPanel testId={expandablePanelTwoId}>
                  <DropdownExpandableMenuListItem>
                    Fresh
                  </DropdownExpandableMenuListItem>
                  <DropdownExpandableMenuListItem>
                    Processed
                  </DropdownExpandableMenuListItem>
                </DropdownExpandableMenuPanel>
              </DropdownExpandableMenuItem>
            </DropdownExpandableMenuGroup>
          </DropdownContent>
        </Dropdown>
      );

      fireEvent.click(getByText('Expandable Items Dropdown'));

      expect(getByTestId(expandablePanelId)).toBeInTheDocument();

      expect(queryByTestId(expandablePanelTwoId)).not.toBeInTheDocument();
    });

    it('should have multiple open menu items when isMulti is true', () => {
      const { getByTestId, getByText } = render(
        <Dropdown>
          <DropdownButton>Expandable Items Dropdown</DropdownButton>
          <DropdownContent>
            <DropdownExpandableMenuGroup isMulti={true}>
              <DropdownExpandableMenuItem>
                <DropdownExpandableMenuButton>
                  Pasta
                </DropdownExpandableMenuButton>
                <DropdownExpandableMenuPanel testId={expandablePanelId}>
                  <DropdownExpandableMenuListItem>
                    Fresh
                  </DropdownExpandableMenuListItem>
                  <DropdownExpandableMenuListItem>
                    Processed Stuff
                  </DropdownExpandableMenuListItem>
                </DropdownExpandableMenuPanel>
              </DropdownExpandableMenuItem>

              <DropdownExpandableMenuItem>
                <DropdownExpandableMenuButton>
                  Bacon
                </DropdownExpandableMenuButton>
                <DropdownExpandableMenuPanel testId={expandablePanelTwoId}>
                  <DropdownExpandableMenuListItem>
                    Fresh
                  </DropdownExpandableMenuListItem>
                  <DropdownExpandableMenuListItem>
                    Processed
                  </DropdownExpandableMenuListItem>
                </DropdownExpandableMenuPanel>
              </DropdownExpandableMenuItem>
            </DropdownExpandableMenuGroup>
          </DropdownContent>
        </Dropdown>
      );

      fireEvent.click(getByText('Expandable Items Dropdown'));

      fireEvent.click(getByText('Pasta'));

      expect(getByTestId(expandablePanelId)).toBeInTheDocument();

      fireEvent.click(getByText('Bacon'));

      expect(getByTestId(expandablePanelId)).toBeInTheDocument();
      expect(getByTestId(expandablePanelTwoId)).toBeInTheDocument();
    });

    it('should only allow one open menu item when isMulti is false', () => {
      const { getByTestId, getByText, queryByTestId } = render(
        <Dropdown>
          <DropdownButton>Expandable Items Dropdown</DropdownButton>
          <DropdownContent>
            <DropdownExpandableMenuGroup isMulti={false}>
              <DropdownExpandableMenuItem>
                <DropdownExpandableMenuButton>
                  Pasta
                </DropdownExpandableMenuButton>
                <DropdownExpandableMenuPanel testId={expandablePanelId}>
                  <DropdownExpandableMenuListItem>
                    Fresh
                  </DropdownExpandableMenuListItem>
                  <DropdownExpandableMenuListItem>
                    Processed Stuff
                  </DropdownExpandableMenuListItem>
                </DropdownExpandableMenuPanel>
              </DropdownExpandableMenuItem>

              <DropdownExpandableMenuItem>
                <DropdownExpandableMenuButton>
                  Bacon
                </DropdownExpandableMenuButton>
                <DropdownExpandableMenuPanel testId={expandablePanelTwoId}>
                  <DropdownExpandableMenuListItem>
                    Fresh
                  </DropdownExpandableMenuListItem>
                  <DropdownExpandableMenuListItem>
                    Processed
                  </DropdownExpandableMenuListItem>
                </DropdownExpandableMenuPanel>
              </DropdownExpandableMenuItem>
            </DropdownExpandableMenuGroup>
          </DropdownContent>
        </Dropdown>
      );

      fireEvent.click(getByText('Expandable Items Dropdown'));

      fireEvent.click(getByText('Pasta'));

      expect(getByTestId(expandablePanelId)).toBeInTheDocument();

      expect(queryByTestId(expandablePanelTwoId)).not.toBeInTheDocument();

      fireEvent.click(getByText('Bacon'));

      expect(getByTestId(expandablePanelTwoId)).toBeInTheDocument();

      expect(queryByTestId(expandablePanelId)).not.toBeVisible();
    });

    describe('dropdown with expandable menu styling', () => {
      it(`DropdownExpandableMenuPanel items should have additional padding if DropdownExpandableMenuButton has an icon`, () => {
        const { getByText } = render(
          <Dropdown>
            <DropdownButton>Expandable Items Dropdown</DropdownButton>
            <DropdownContent>
              <DropdownExpandableMenuGroup>
                <DropdownExpandableMenuItem>
                  <DropdownExpandableMenuButton icon={<RestaurantMenuIcon />}>
                    Pasta
                  </DropdownExpandableMenuButton>
                  <DropdownExpandableMenuPanel testId={expandablePanelId}>
                    <DropdownExpandableMenuListItem>
                      Fresh
                    </DropdownExpandableMenuListItem>
                    <DropdownExpandableMenuListItem>
                      Processed
                    </DropdownExpandableMenuListItem>
                  </DropdownExpandableMenuPanel>
                </DropdownExpandableMenuItem>
              </DropdownExpandableMenuGroup>
            </DropdownContent>
          </Dropdown>
        );
        fireEvent.click(getByText('Pasta'));

        expect(getByText('Fresh')).toHaveStyleRule(
          'padding',
          `${magma.spaceScale.spacing03} ${magma.spaceScale.spacing05} ${magma.spaceScale.spacing03} 72px`
        );
      });

      it(`DropdownExpandableMenuPanel items should have standard padding if DropdownExpandableMenuButton doesn't have an icon`, () => {
        const { getByText } = render(
          <Dropdown>
            <DropdownButton>Expandable Items Dropdown</DropdownButton>
            <DropdownContent>
              <DropdownExpandableMenuGroup>
                <DropdownExpandableMenuItem>
                  <DropdownExpandableMenuButton>
                    Pasta
                  </DropdownExpandableMenuButton>
                  <DropdownExpandableMenuPanel testId={expandablePanelId}>
                    <DropdownExpandableMenuListItem>
                      Fresh
                    </DropdownExpandableMenuListItem>
                    <DropdownExpandableMenuListItem>
                      Processed
                    </DropdownExpandableMenuListItem>
                  </DropdownExpandableMenuPanel>
                </DropdownExpandableMenuItem>
              </DropdownExpandableMenuGroup>
            </DropdownContent>
          </Dropdown>
        );
        fireEvent.click(getByText('Pasta'));

        expect(getByText('Fresh')).toHaveStyleRule(
          'padding',
          `${magma.spaceScale.spacing03} ${magma.spaceScale.spacing05} ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing08}`
        );
      });

      it(`DropdownExpandableMenuListItem should support disabled`, () => {
        const { getByText } = render(
          <Dropdown>
            <DropdownButton>Expandable Items Dropdown</DropdownButton>
            <DropdownContent>
              <DropdownExpandableMenuGroup>
                <DropdownExpandableMenuItem>
                  <DropdownExpandableMenuButton>
                    Pasta
                  </DropdownExpandableMenuButton>
                  <DropdownExpandableMenuPanel>
                    <DropdownExpandableMenuListItem disabled>
                      Fresh
                    </DropdownExpandableMenuListItem>
                    <DropdownExpandableMenuListItem>
                      Processed
                    </DropdownExpandableMenuListItem>
                  </DropdownExpandableMenuPanel>
                </DropdownExpandableMenuItem>
              </DropdownExpandableMenuGroup>
            </DropdownContent>
          </Dropdown>
        );
        fireEvent.click(getByText('Pasta'));

        expect(getByText('Fresh')).toHaveStyleRule('cursor', 'not-allowed');
        expect(getByText('Fresh')).toHaveStyleRule(
          'color',
          transparentize(0.4, magma.colors.neutral500)
        );
      });

      it(`DropdownExpandableMenuPanel items should have additional padding if DropdownExpandableMenuButton has an icon and a text only menu item`, () => {
        const { getByTestId, getByText } = render(
          <Dropdown>
            <DropdownButton>Expandable Items Dropdown</DropdownButton>
            <DropdownContent>
              <DropdownExpandableMenuGroup>
                <DropdownExpandableMenuItem>
                  <DropdownExpandableMenuButton testId={expandableButtonId}>
                    Pasta
                  </DropdownExpandableMenuButton>
                  <DropdownExpandableMenuPanel>
                    <DropdownExpandableMenuListItem>
                      Fresh
                    </DropdownExpandableMenuListItem>
                    <DropdownExpandableMenuListItem>
                      Processed
                    </DropdownExpandableMenuListItem>
                  </DropdownExpandableMenuPanel>
                </DropdownExpandableMenuItem>
                <DropdownExpandableMenuItem>
                  <DropdownExpandableMenuButton
                    icon={<RestaurantMenuIcon />}
                    testId={`${expandableButtonId}-2`}
                  >
                    Prosciutto
                  </DropdownExpandableMenuButton>
                  <DropdownExpandableMenuPanel>
                    <DropdownExpandableMenuListItem>
                      Domestic
                    </DropdownExpandableMenuListItem>
                    <DropdownExpandableMenuListItem>
                      Speck
                    </DropdownExpandableMenuListItem>
                  </DropdownExpandableMenuPanel>
                </DropdownExpandableMenuItem>
              </DropdownExpandableMenuGroup>
            </DropdownContent>
          </Dropdown>
        );
        fireEvent.click(getByText('Pasta'));
        fireEvent.click(getByText('Prosciutto'));

        expect(getByTestId(expandableButtonId)).toHaveStyleRule(
          'padding',
          `${magma.spaceScale.spacing03} ${magma.spaceScale.spacing05} ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing11}`
        );

        expect(getByTestId(`${expandableButtonId}-2`)).toHaveStyleRule(
          'padding',
          `${magma.spaceScale.spacing03} ${magma.spaceScale.spacing05}`
        );

        expect(getByText('Fresh')).toHaveStyleRule(
          'padding',
          `${magma.spaceScale.spacing03} ${magma.spaceScale.spacing05} ${magma.spaceScale.spacing03} 72px`
        );
        expect(getByText('Domestic')).toHaveStyleRule(
          'padding',
          `${magma.spaceScale.spacing03} ${magma.spaceScale.spacing05} ${magma.spaceScale.spacing03} 72px`
        );
      });

      it('should fire the customOnKeyDown function if used', () => {
        const onChangeMock = jest.fn();
        const { getByTestId } = render(
          <Dropdown>
            <DropdownButton>Expandable Items Dropdown</DropdownButton>
            <DropdownContent>
              <DropdownExpandableMenuGroup>
                <DropdownExpandableMenuItem>
                  <DropdownExpandableMenuButton
                    testId={expandableButtonId}
                    customOnKeyDown={onChangeMock}
                  >
                    Pasta
                  </DropdownExpandableMenuButton>
                  <DropdownExpandableMenuPanel testId={expandablePanelId}>
                    <DropdownExpandableMenuListItem>
                      Fresh
                    </DropdownExpandableMenuListItem>
                    <DropdownExpandableMenuListItem>
                      Processed
                    </DropdownExpandableMenuListItem>
                  </DropdownExpandableMenuPanel>
                </DropdownExpandableMenuItem>
              </DropdownExpandableMenuGroup>
            </DropdownContent>
          </Dropdown>
        );

        const dropdownExpandableButton = getByTestId(expandableButtonId);

        fireEvent.keyDown(dropdownExpandableButton, { key: 'Enter' });

        expect(onChangeMock).toHaveBeenCalledTimes(1);
      });

      it(`should support isInverse mode`, () => {
        const { getByTestId } = render(
          <Dropdown isInverse>
            <DropdownButton>Expandable Items Dropdown</DropdownButton>
            <DropdownContent>
              <DropdownExpandableMenuGroup
                testId={expandableGroupId}
              ></DropdownExpandableMenuGroup>
            </DropdownContent>
          </Dropdown>
        );

        expect(getByTestId(expandableGroupId)).toHaveStyleRule(
          'background',
          'transparent'
        );
        expect(getByTestId(expandableGroupId)).toHaveStyleRule(
          'color',
          magma.colors.neutral100
        );
      });
    });
  });
});

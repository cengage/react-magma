import React from 'react';
import { AsteriskIcon } from 'react-magma-icons';
import { Dropdown } from '.';
import { DropdownContent } from './DropdownContent';
import { DropdownDivider } from './DropdownDivider';
import { DropdownHeader } from './DropdownHeader';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuGroup } from './DropdownMenuGroup';
import { DropdownSplitButton } from './DropdownSplitButton';
import { DropdownButton } from './DropdownButton';
import { magma } from '../../theme/magma';

import { act, render, fireEvent } from '@testing-library/react';

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
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByTestId('caretLeft')).toBeInTheDocument();
    expect(getByTestId('dropdownContent')).toHaveStyleRule('top', '5px');
    expect(getByTestId('dropdownContent')).toHaveStyleRule('right', '100%');
  });

  it('should render a dropright', () => {
    const { getByTestId } = render(
      <Dropdown dropDirection="right">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByTestId('caretRight')).toBeInTheDocument();
    expect(getByTestId('dropdownContent')).toHaveStyleRule('top', '5px');
    expect(getByTestId('dropdownContent')).toHaveStyleRule('left', '100%');
  });

  it('should render a right aligned menu', () => {
    const { getByTestId } = render(
      <Dropdown alignment="end">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByTestId('dropdownContent')).toHaveStyleRule('left', 'auto');
    expect(getByTestId('dropdownContent')).toHaveStyleRule('right', '5px');
  });

  it('should render a top-aligned menu', () => {
    const { getByTestId } = render(
      <Dropdown alignment="end" dropDirection="right">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(getByTestId('dropdownContent')).toHaveStyleRule('top', 'auto');
    expect(getByTestId('dropdownContent')).toHaveStyleRule('bottom', '5px');
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

  it('should render a split dropup', () => {
    const { getByTestId } = render(
      <Dropdown dropDirection="up">
        <DropdownSplitButton>Toggle me</DropdownSplitButton>
      </Dropdown>
    );

    expect(getByTestId('caretUp')).toBeInTheDocument();
  });

  it('should render a button with custom icon', () => {
    const { container, queryByTestId } = render(
      <Dropdown>
        <DropdownButton icon={<AsteriskIcon />}>Toggle me</DropdownButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(container.querySelector('span')).toHaveStyleRule(
      'padding-left',
      '10px'
    );

    expect(queryByTestId('caretUp')).not.toBeInTheDocument();
    expect(queryByTestId('caretDown')).not.toBeInTheDocument();
  });

  it('should render a button with custom icon with specified icon position', () => {
    const { container } = render(
      <Dropdown>
        <DropdownButton icon={<AsteriskIcon />} iconPosition="right">
          Toggle me
        </DropdownButton>
        <DropdownContent />
      </Dropdown>
    );

    expect(container.querySelector('span')).toHaveStyleRule(
      'padding-right',
      '10px'
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

  it('should close the menu when blurred', () => {
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

    const menuItem = getByText('Menu item');

    fireEvent.click(menuItem);

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');
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
      key: 'ArrowDown'
    });

    fireEvent.keyDown(getByTestId('dropdown'), {
      key: 'Escape',
      code: 27
    });

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');
  });

  it('should close the menu the dropdown button is focused and the tab key is pressed', () => {
    const { getByText, getByTestId } = render(
      <Dropdown testId="dropdown">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    const toggleButton = getByText('Toggle me').parentElement;
    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');

    fireEvent.click(toggleButton);
    toggleButton.focus();

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'block');

    expect(toggleButton).toHaveFocus();

    fireEvent.keyDown(toggleButton, {
      key: 'Tab'
    });

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');
  });

  it('should close the menu the dropdown button is focused and shift + the tab key is pressed', () => {
    const { getByText, getByTestId } = render(
      <Dropdown testId="dropdown">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem>Menu item</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    const toggleButton = getByText('Toggle me').parentElement;
    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');

    fireEvent.click(toggleButton);
    toggleButton.focus();

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'block');

    expect(toggleButton).toHaveFocus();

    fireEvent.keyDown(toggleButton, {
      key: 'Tab',
      shiftKey: true
    });

    expect(getByTestId('dropdownContent')).toHaveStyleRule('display', 'none');
  });

  it('should call the onBeforeShiftFocus prop when closing the dropdown', () => {
    jest.useFakeTimers();
    const onBeforeShiftFocus = jest.fn();
    const { getByTestId } = render(
      <Dropdown onBeforeShiftFocus={onBeforeShiftFocus} testId="dropdown">
        <DropdownButton testId="toggleButton">Toggle me</DropdownButton>
      </Dropdown>
    );

    const toggleButton = getByTestId('toggleButton');

    fireEvent.click(toggleButton);

    fireEvent.keyDown(getByTestId('dropdown'), {
      key: 'Escape',
      code: 27
    });

    expect(onBeforeShiftFocus).toHaveBeenCalled();

    act(jest.runAllTimers);

    expect(document.activeElement).toEqual(toggleButton);

    jest.useRealTimers();
  });

  it('should not focus the toggle button if preventMagmaFocus is on the event from the onBeforeShiftFocus prop', () => {
    const { getByTestId, getByText } = render(
      <Dropdown
        onBeforeShiftFocus={event => event.preventMagmaFocus()}
        testId="dropdown"
      >
        <DropdownButton testId="toggleButton">Toggle me</DropdownButton>
        <DropdownContent>
          <DropdownMenuItem onClick={() => {}}>Menu item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>Menu item 2</DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    const toggleButton = getByTestId('toggleButton');

    fireEvent.click(toggleButton);

    getByText(/menu item 1/i).focus();

    fireEvent.keyDown(getByTestId('dropdown'), {
      key: 'Escape',
      code: 27
    });

    expect(document.activeElement).not.toEqual(toggleButton);
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
      code: 40
    });

    expect(getByText('Menu item 1')).toHaveFocus();

    fireEvent.keyDown(getByTestId('dropdown'), {
      key: 'ArrowDown',
      code: 40
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
      code: 38
    });

    expect(getByText('Menu item 2')).toHaveFocus();

    fireEvent.keyDown(getByTestId('dropdown'), {
      key: 'ArrowUp',
      code: 38
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
          <DropdownMenuItem isDisabled onClick={onClick}>
            {text}
          </DropdownMenuItem>
        </DropdownContent>
      </Dropdown>
    );

    fireEvent.click(getByText(text));
    expect(onClick).not.toHaveBeenCalled();
    expect(getByText(text)).toHaveStyleRule('cursor', 'not-allowed');
    expect(getByText(text)).toHaveStyleRule('color', magma.colors.disabledText);
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
      code: 13
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
      code: 32
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

    fireEvent.click(getByText('Toggle'));

    expect(getByText('aaa')).toHaveStyleRule('padding', '10px 20px 10px 55px');
    expect(getByText('bbb')).toHaveStyleRule('padding', '10px 20px');
    expect(container.querySelector('svg')).toBeInTheDocument();

    fireEvent.click(getByText('aaa'));
    expect(getByText('aaa')).toHaveStyleRule('padding', '10px 20px');
    expect(getByText('bbb')).toHaveStyleRule('padding', '10px 20px 10px 55px');
  });
});

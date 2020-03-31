import React from 'react';
import { AsteriskIcon } from '../Icon/types/AsteriskIcon';
import { Dropdown } from '.';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuDivider } from './DropdownMenuDivider';
import { DropdownMenuHeader } from './DropdownMenuHeader';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownSplitButton } from './DropdownSplitButton';
import { DropdownButton } from './DropdownButton';
import { magma } from '../../theme/magma';

import { render, fireEvent } from '@testing-library/react';

describe('Dropdown', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Dropdown testId={testId}>
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownMenu>
          <DropdownMenuItem onClick={() => {}}>Menu item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>
            Menu item number two
          </DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByTestId('dropdownMenu')).toBeInTheDocument();
    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'none');
  });

  it('should render a dropup', () => {
    const { getByTestId } = render(
      <Dropdown dropDirection="up">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownMenu />
      </Dropdown>
    );

    expect(getByTestId('caretUp')).toBeInTheDocument();
    expect(getByTestId('dropdownMenu')).toHaveStyleRule('top', 'auto');
    expect(getByTestId('dropdownMenu')).toHaveStyleRule('bottom', '100%');
  });

  it('should render a right aligned menu', () => {
    const { getByTestId } = render(
      <Dropdown alignment="right">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownMenu />
      </Dropdown>
    );

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('left', 'auto');
    expect(getByTestId('dropdownMenu')).toHaveStyleRule('right', '5px');
  });

  it('should render a split dropdown', () => {
    const { getByTestId, container } = render(
      <Dropdown>
        <DropdownSplitButton>Toggle me</DropdownSplitButton>
        <DropdownMenu />
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
        <DropdownMenu />
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
    const { queryByTestId } = render(
      <Dropdown>
        <DropdownButton icon={<AsteriskIcon />}>Toggle me</DropdownButton>
        <DropdownMenu />
      </Dropdown>
    );

    expect(queryByTestId('caretUp')).not.toBeInTheDocument();
    expect(queryByTestId('caretDown')).not.toBeInTheDocument();
  });

  it('should toggle the menu when the button is clicked', () => {
    const toggleText = 'Toggle me';

    const { getByText, getByTestId } = render(
      <Dropdown>
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownMenu />
      </Dropdown>
    );

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'none');

    fireEvent.click(getByText(toggleText));

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'block');

    fireEvent.click(getByText(toggleText));

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'none');
  });

  it('should toggle the menu when the button is clicked in a split dropdown', () => {
    const toggleText = 'Toggle me';
    const labelText = 'Toggle menu';

    const { getByLabelText, getByTestId } = render(
      <Dropdown>
        <DropdownSplitButton>{toggleText}</DropdownSplitButton>
        <DropdownMenu />
      </Dropdown>
    );

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'none');

    fireEvent.click(getByLabelText(labelText));

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'block');

    fireEvent.click(getByLabelText(labelText));

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'none');
  });

  it('should close the menu when blurred', () => {
    const { getByText, getByTestId } = render(
      <Dropdown testId="dropdown">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownMenu />
      </Dropdown>
    );

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'none');

    fireEvent.click(getByText('Toggle me'));

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'block');

    fireEvent.focus(getByTestId('dropdown'));
    fireEvent.blur(getByTestId('dropdown'));
    setTimeout(() => {
      expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'none');
    }, 1);
  });

  it('should close the menu when escape key is pressed', () => {
    const { getByText, getByTestId } = render(
      <Dropdown testId="dropdown">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownMenu />
      </Dropdown>
    );

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'none');

    fireEvent.click(getByText('Toggle me'));

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'block');

    fireEvent.keyDown(getByTestId('dropdown'), {
      key: 'Escape',
      code: 27
    });

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'none');
  });

  it('go to the first or next item when the down arrow key is pressed', () => {
    const { getByText, getByTestId } = render(
      <Dropdown testId="dropdown">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownMenu>
          <DropdownMenuItem onClick={() => {}}>Menu item 1</DropdownMenuItem>
          <DropdownMenuDivider />
          <DropdownMenuItem onClick={() => {}}>Menu item 2</DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
    );

    fireEvent.click(getByText('Toggle me'));

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'block');

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
        <DropdownMenu>
          <DropdownMenuItem onClick={() => {}}>Menu item 1</DropdownMenuItem>
          <DropdownMenuDivider />
          <DropdownMenuItem onClick={() => {}}>Menu item 2</DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
    );

    fireEvent.click(getByText('Toggle me'));

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'block');

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
      <DropdownMenuItem icon={<AsteriskIcon />}>Menu item</DropdownMenuItem>
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should render a dropdown menu item with correct styles when fixed width', () => {
    const { getByText } = render(
      <Dropdown width="100px">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownMenu>
          <DropdownMenuItem>Menu item</DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
    );

    expect(getByText('Menu item')).toHaveStyleRule('white-space', 'normal');
  });

  it('should render a dropdown menu item with correct styles with custom max-height', () => {
    const { getByTestId } = render(
      <Dropdown maxHeight="100px">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownMenu>
          <DropdownMenuItem>Menu item</DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
    );

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('max-height', '100px');
  });

  it('should render a disabled dropdown item', () => {
    const onClick = jest.fn();
    const text = 'menu item';

    const { getByText } = render(
      <Dropdown alignment="right">
        <DropdownButton>Toggle me</DropdownButton>
        <DropdownMenu>
          <DropdownMenuItem isDisabled onClick={onClick}>
            {text}
          </DropdownMenuItem>
        </DropdownMenu>
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
        <DropdownMenu>
          <DropdownMenuHeader>{text}</DropdownMenuHeader>
          <DropdownMenuItem onClick={onClick}>blah</DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
    );

    expect(getByText(text)).toBeInTheDocument();
  });

  it('should render a dropdown menu divider', () => {
    const { container } = render(<DropdownMenuDivider />);

    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('should fire the onclick event for an item when enter is pressed', () => {
    const onClick = jest.fn();
    const itemText = 'item';

    const { getByText } = render(
      <Dropdown>
        <DropdownButton>Toggle</DropdownButton>
        <DropdownMenu>
          <DropdownMenuItem onClick={onClick}>{itemText}</DropdownMenuItem>
        </DropdownMenu>
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
        <DropdownMenu>
          <DropdownMenuItem onClick={onClick}>{itemText}</DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
    );

    fireEvent.keyDown(getByText(itemText), {
      key: ' ',
      code: 32
    });

    expect(onClick).toHaveBeenCalled();
  });

  it('should render a dropdown with an active item', () => {
    const { container, getByText } = render(
      <Dropdown activeIndex={1}>
        <DropdownButton>Toggle</DropdownButton>
        <DropdownMenu>
          <DropdownMenuItem onClick={() => {}}>aaa</DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>bbb</DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
    );

    expect(getByText('aaa')).toHaveStyleRule('padding', '10px 20px 10px 55px');
    expect(getByText('bbb')).toHaveStyleRule('padding', '10px 20px');
    expect(container.querySelector('svg')).toBeInTheDocument();

    fireEvent.click(getByText('aaa'));
    expect(getByText('aaa')).toHaveStyleRule('padding', '10px 20px');
    expect(getByText('bbb')).toHaveStyleRule('padding', '10px 20px 10px 55px');
  });
});

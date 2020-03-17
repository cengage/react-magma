import React from 'react';
import { axe } from 'jest-axe';
import { AsteriskIcon } from '../Icon/types/AsteriskIcon';
import { Dropdown } from '.';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuDivider } from './DropdownMenuDivider';
import { DropdownMenuHeader } from './DropdownMenuHeader';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownSplitToggle } from './DropdownSplitToggle';
import { DropdownToggle } from './DropdownToggle';
import { magma } from '../../theme/magma';

import { render, fireEvent } from '@testing-library/react';

describe('Dropdown', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Dropdown testId={testId}>
        <DropdownToggle>Toggle me</DropdownToggle>
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
  });

  it('should render a dropup', () => {
    const { getByTestId } = render(
      <Dropdown dropDirection="up">
        <DropdownToggle>Toggle me</DropdownToggle>
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
        <DropdownToggle>Toggle me</DropdownToggle>
        <DropdownMenu />
      </Dropdown>
    );

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('left', 'auto');
    expect(getByTestId('dropdownMenu')).toHaveStyleRule('right', '5px');
  });

  it('should render a split dropdown', () => {
    const { getByTestId, container } = render(
      <Dropdown>
        <DropdownSplitToggle>Toggle me</DropdownSplitToggle>
        <DropdownMenu />
      </Dropdown>
    );

    expect(getByTestId('caretDown')).toBeInTheDocument();
    expect(container.querySelectorAll('button').length).toBe(2);
  });

  it('should render a split dropup', () => {
    const { getByTestId } = render(
      <Dropdown dropDirection="up">
        <DropdownSplitToggle>Toggle me</DropdownSplitToggle>
      </Dropdown>
    );

    expect(getByTestId('caretUp')).toBeInTheDocument();
  });

  it('should render a toggle with custom icon', () => {
    const { queryByTestId } = render(
      <Dropdown>
        <DropdownToggle icon={<AsteriskIcon />}>Toggle me</DropdownToggle>
        <DropdownMenu />
      </Dropdown>
    );

    expect(queryByTestId('caretUp')).not.toBeInTheDocument();
    expect(queryByTestId('caretDown')).not.toBeInTheDocument();
  });

  it('should toggle the menu when the button is clicked', () => {
    const { getByText, getByTestId } = render(
      <Dropdown>
        <DropdownToggle>Toggle me</DropdownToggle>
        <DropdownMenu />
      </Dropdown>
    );

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'none');

    fireEvent.click(getByText('Toggle me'));

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'block');
  });

  it('should close the menu when blurred', () => {
    const { getByText, getByTestId } = render(
      <Dropdown testId="dropdown">
        <DropdownToggle>Toggle me</DropdownToggle>
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
        <DropdownToggle>Toggle me</DropdownToggle>
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

  it('go to the first or nextitem when the down arrow key is pressed', () => {
    const { getByText, getByTestId } = render(
      <Dropdown testId="dropdown">
        <DropdownToggle>Toggle me</DropdownToggle>
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
        <DropdownToggle>Toggle me</DropdownToggle>
        <DropdownMenu>
          <DropdownMenuItem onClick={() => {}}>Menu item 1</DropdownMenuItem>
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
        <DropdownToggle>Toggle me</DropdownToggle>
        <DropdownMenu>
          <DropdownMenuItem>Menu item</DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
    );

    expect(getByText('Menu item')).toHaveStyleRule('white-space', 'normal');
  });

  it('should render a disabled dropdown item', () => {
    const onClick = jest.fn();
    const text = 'menu item';

    const { getByText } = render(
      <DropdownMenuItem isDisabled onClick={onClick}>
        {text}
      </DropdownMenuItem>
    );

    fireEvent.click(getByText(text));
    expect(onClick).not.toHaveBeenCalled();
    expect(getByText(text)).toHaveStyleRule('cursor', 'not-allowed');
    expect(getByText(text)).toHaveStyleRule('color', magma.colors.disabledText);
  });

  it('should fire the onclick event for an item when clicked', () => {
    const onClick = jest.fn();
    const text = 'menu item';

    const { getByText } = render(
      <DropdownMenuItem onClick={onClick}>{text}</DropdownMenuItem>
    );

    fireEvent.click(getByText(text));
    expect(onClick).toHaveBeenCalled();
  });

  it('should render a dropdown header', () => {
    const text = 'header item';

    const { getByText } = render(
      <DropdownMenuHeader>{text}</DropdownMenuHeader>
    );

    expect(getByText(text)).toBeInTheDocument();
  });

  it('should render a dropdown menu divider', () => {
    const { container } = render(<DropdownMenuDivider />);

    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <Dropdown>
        <DropdownToggle>Toggle me</DropdownToggle>
        <DropdownMenu>
          <DropdownMenuItem onClick={() => {}}>Menu item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>
            Menu item number two
          </DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});

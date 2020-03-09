import React from 'react';
import { axe } from 'jest-axe';
import { AsteriskIcon } from '../Icon/types/AsteriskIcon';
import { Dropdown } from '.';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuItem } from './DropdownMenuItem';
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

  it('should toggle the menu when the button is clicked', () => {
    const { getByText, getByTestId } = render(
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

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'none');

    fireEvent.click(getByText('Toggle me'));

    expect(getByTestId('dropdownMenu')).toHaveStyleRule('display', 'block');
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

import React from 'react';
import { axe } from 'jest-axe';
import { Dropdown } from '.';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownToggle } from './DropdownToggle';

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

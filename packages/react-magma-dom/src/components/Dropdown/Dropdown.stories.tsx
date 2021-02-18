import React from 'react';
import { Dropdown } from './index';
import { DropdownButton } from './DropdownButton';
import { DropdownContent } from './DropdownContent';
import { DropdownMenuItem } from './DropdownMenuItem';

export default {
  component: Dropdown,
  title: 'Dropdown',
};

export const Default = () => {
  return (
    <Dropdown>
      <DropdownButton>Basic Dropdown</DropdownButton>
      <DropdownContent>
        <DropdownMenuItem>Menu item 1</DropdownMenuItem>
        <DropdownMenuItem>Menu item number two</DropdownMenuItem>
      </DropdownContent>
    </Dropdown>
  );
};

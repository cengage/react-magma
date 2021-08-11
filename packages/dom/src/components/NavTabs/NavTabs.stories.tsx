import React from 'react';
import { NavTabs } from '.';
import { NavTab } from './NavTab';
import { Meta } from '@storybook/react';

const meta: Meta = {
  component: NavTabs,
  title: 'NavTabs',
};

export default meta; 

export const Default = () => {
  return (
    <NavTabs aria-label="Nav Tabs">
      <NavTab isActive to="#">
        Current Page
      </NavTab>
      <NavTab to="http://google.com">Link to Google</NavTab>
    </NavTabs>
  );
};

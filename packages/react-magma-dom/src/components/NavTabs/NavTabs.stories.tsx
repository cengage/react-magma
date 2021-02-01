import React from 'react';
import { NavTabs } from '.';
import { NavTab } from './NavTab';

export default {
  component: NavTabs,
  title: 'NavTabs',
};

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

import React from 'react';
import { NavTabs } from '..';
import { NavTab } from '../NavTab';

export default {
  component: NavTabs,
  title: 'NavTabs',
};

export const Default = () => {
  return (
    <NavTabs aria-label="test">
      <NavTab to="http://www.google.com">Example</NavTab>
    </NavTabs>
  );
};

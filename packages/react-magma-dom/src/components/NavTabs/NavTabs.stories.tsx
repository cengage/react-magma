import React from 'react';
import { NavTabs } from '.';
import { NavTab } from './NavTab';
import { Card } from '../Card';
import { magma } from '../../theme/magma';
import { Meta } from '@storybook/react/types-6-0';
import { AndroidIcon, EmailIcon, NotificationsIcon } from 'react-magma-icons';

export default {
  component: NavTabs,
  title: 'NavTabs',
} as Meta;

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

export const IconOnly = () => {
  return (
    <NavTabs aria-label="Icon Only Nav Tabs">
      <NavTab aria-label="Email" icon={<EmailIcon />} to="#" isActive />
      <NavTab aria-label="Android" icon={<AndroidIcon />} to="#" />
      <NavTab aria-label="Notifications" icon={<NotificationsIcon />} to="#" />
    </NavTabs>
  );
};

export const BackgroundColor = () => {
  return (
    <NavTabs aria-label="Nav Tabs" backgroundColor={magma.colors.neutral200}>
      <NavTab isActive to="#">
        Current Page
      </NavTab>
      <NavTab to="http://yahoo.com">Link to Yahoo</NavTab>
    </NavTabs>
  );
};

export const Inverse = () => {
  return (
    <Card isInverse>
      <NavTabs aria-label="Nav Tabs" isInverse>
        <NavTab isActive to="#">
          Current Page
        </NavTab>
        <NavTab to="http://apple.com">Link to Apple</NavTab>
      </NavTabs>
    </Card>
  );
};

export const CustomTab = () => {
  const Link = ({ to, children, ...rest }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  );
  return (
    <NavTabs aria-label="Sample Custom Component Navigation Tabs">
      <NavTab component={<Link to="./">Main page</Link>} />
      <NavTab isActive component={<Link to="./">FAQ</Link>} />
      <NavTab component={<Link to="./">About us</Link>} />
    </NavTabs>
  );
};

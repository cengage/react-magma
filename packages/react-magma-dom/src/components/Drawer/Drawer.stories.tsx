import React from 'react';
import { Drawer } from '.';
import { Button } from '../Button';
import { VisuallyHidden } from '../VisuallyHidden';
import { DrawerPosition } from './Drawer';
import { NavTab, NavTabs } from '../NavTabs';
import { TabsOrientation } from '../Tabs';

const info = {
  component: Drawer,
  title: 'Drawer',
  argTypes: {
    position: {
      control: {
        type: 'select',
        options: DrawerPosition,
      },
    },
  },
};

export default info;

export const Default = args => {
  const [showDrawer, setShowDrawer] = React.useState(false);

  return (
    <>
      <Drawer
        header="Drawer Title"
        onClose={() => setShowDrawer(false)}
        isOpen={showDrawer}
        closeAriaLabel="Close drawer"
        {...args}
      >
        <p>This is a Drawer, doing Drawer things.</p>
        <p>
          <Button>This is a button</Button>
        </p>
      </Drawer>
      <Button onClick={() => setShowDrawer(true)}>
        Show Drawer
        <VisuallyHidden>(opens drawer dialog)</VisuallyHidden>
      </Button>
    </>
  );
};

export const SiteNavigation = args => {
  const [showDrawer, setShowDrawer] = React.useState(false);

  return (
    <>
      <Drawer
        onClose={() => setShowDrawer(false)}
        isOpen={showDrawer}
        position={DrawerPosition.right}
        ariaLabel="Site Navigation Drawer"
        closeAriaLabel="Close Navigation Drawer"
      >
        <NavTabs orientation={TabsOrientation.vertical}>
          <NavTab to="#">One</NavTab>
          <NavTab to="#">Two</NavTab>
          <NavTab to="#">Three</NavTab>
          <NavTab to="#">Four</NavTab>
        </NavTabs>
      </Drawer>
      <Button onClick={() => setShowDrawer(true)}>
        Show Drawer
        <VisuallyHidden>(opens drawer dialog)</VisuallyHidden>
      </Button>
    </>
  );
};

import React from 'react';

import { Button } from '../Button';
import { VisuallyHidden } from '../VisuallyHidden';
import { DrawerPosition, DrawerProps } from './Drawer';
import { NavTab, NavTabs } from '../NavTabs';
import { TabsOrientation } from '../Tabs/shared';

import { Drawer } from '.';

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
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    showBackgroundOverlay: {
      control: {
        type: 'boolean',
      },
    },
    isAnimated: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default info;

export const Default = {
  render: (
    args: React.JSX.IntrinsicAttributes &
      DrawerProps &
      React.RefAttributes<HTMLDivElement>
  ) => {
    const [showDrawer, setShowDrawer] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    return (
      <>
        <Drawer
          header="Drawer Title"
          onClose={() => {
            setShowDrawer(false);
            buttonRef.current?.focus();
          }}
          isOpen={showDrawer}
          closeAriaLabel="Close drawer"
          {...args}
        >
          <p>This is a Drawer, doing Drawer things.</p>
          <p>
            <Button>This is a button</Button>
          </p>
        </Drawer>
        <Button onClick={() => setShowDrawer(true)} ref={buttonRef}>
          Show Drawer
          <VisuallyHidden>(opens drawer dialog)</VisuallyHidden>
        </Button>
      </>
    );
  },
};

export const SiteNavigation = {
  render: (
    args: React.JSX.IntrinsicAttributes &
      DrawerProps &
      React.RefAttributes<HTMLDivElement>
  ) => {
    const [showDrawer, setShowDrawer] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    return (
      <>
        <Drawer
          onClose={() => {
            setShowDrawer(false);
            buttonRef.current?.focus();
          }}
          isOpen={showDrawer}
          position={DrawerPosition.right}
          ariaLabel="Site Navigation Drawer"
          closeAriaLabel="Close Navigation Drawer"
          {...args}
        >
          <NavTabs
            orientation={TabsOrientation.vertical}
            isInverse={args.isInverse}
          >
            <NavTab to="#">One</NavTab>
            <NavTab to="#">Two</NavTab>
            <NavTab to="#">Three</NavTab>
            <NavTab to="#">Four</NavTab>
          </NavTabs>
        </Drawer>
        <Button onClick={() => setShowDrawer(true)} ref={buttonRef}>
          Show Drawer
          <VisuallyHidden>(opens drawer dialog)</VisuallyHidden>
        </Button>
      </>
    );
  },
};

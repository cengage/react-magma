import React from 'react';

import { Button } from '../Button';
import { Container } from '../Container/Container';
import { VisuallyHidden } from '../VisuallyHidden';
import { DrawerPosition, DrawerProps } from './Drawer';
import { NavTab, NavTabs } from '../NavTabs';
import { Paragraph } from '../Paragraph/index';
import { TabsOrientation } from '../Tabs/shared';

import { Drawer } from '.';

const info = {
  component: Drawer,
  title: 'Drawer',
  argTypes: {
    position: {
      control: {
        type: 'select',
      },
      options: Object.values(DrawerPosition),
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
          {...args}
          header="Drawer Title"
          onClose={() => {
            setShowDrawer(false);
            buttonRef.current?.focus();
          }}
          isOpen={showDrawer}
          closeAriaLabel="Close drawer"
        >
          <p>This is a Drawer, doing Drawer things.</p>
          <p>
            <Button>This is a button</Button>
          </p>
        </Drawer>
        <Button
          aria-haspopup="dialog"
          onClick={() => setShowDrawer(true)}
          ref={buttonRef}
        >
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
          {...args}
          onClose={() => {
            setShowDrawer(false);
            buttonRef.current?.focus();
          }}
          isOpen={showDrawer}
          position={DrawerPosition.right}
          ariaLabel="Site Navigation Drawer"
          closeAriaLabel="Close Navigation Drawer"
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
        <Button
          aria-haspopup="dialog"
          onClick={() => setShowDrawer(true)}
          ref={buttonRef}
        >
          Show Drawer
          <VisuallyHidden>(opens drawer dialog)</VisuallyHidden>
        </Button>
      </>
    );
  },
};

export const WithLongContent = {
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
          {...args}
          onClose={() => {
            setShowDrawer(false);
            buttonRef.current?.focus();
          }}
          isOpen={showDrawer}
          position={DrawerPosition.right}
          ariaLabel="Site Navigation Drawer"
          closeAriaLabel="Close Navigation Drawer"
          showBackgroundOverlay={false}
        >
          <Container isInverse={args.isInverse}>
            <Paragraph>ONE</Paragraph>
            <Paragraph>TWO</Paragraph>
            <Paragraph>THREE</Paragraph>
            <Paragraph>FOUR</Paragraph>
            <Paragraph>FIVE</Paragraph>
            <Paragraph>SIX</Paragraph>
            <Paragraph>SEVEN</Paragraph>
            <Paragraph>EIGHT</Paragraph>
            <Paragraph>NINE</Paragraph>
            <Paragraph>TEN</Paragraph>
            <Paragraph>ELEVEN</Paragraph>
            <Paragraph>TWELVE</Paragraph>
            <Paragraph>THIRTEEN</Paragraph>
            <Paragraph>FOURTEEN</Paragraph>
            <Paragraph>FIFTEEN</Paragraph>
            <Paragraph>SIXTEEN</Paragraph>
            <Paragraph>SEVENTEEN</Paragraph>
            <Paragraph>EIGHTEEN</Paragraph>
            <Paragraph>NINETEEN</Paragraph>
            <Paragraph>TWENTY</Paragraph>
            <Paragraph>TWENTY-ONE</Paragraph>
            <Paragraph>TWENTY-TWO</Paragraph>
            <Paragraph>TWENTY-THREE</Paragraph>
            <Paragraph>TWENTY-FOUR</Paragraph>
            <Paragraph>TWENTY-FIVE</Paragraph>
            <Paragraph>TWENTY-SIX</Paragraph>
            <Paragraph>TWENTY-SEVEN</Paragraph>
            <Paragraph>TWENTY-EIGHT</Paragraph>
            <Paragraph>TWENTY-NINE</Paragraph>
            <Paragraph>THIRTY</Paragraph>
            <Paragraph>THIRTY-ONE</Paragraph>
            <Paragraph>THIRTY-TWO</Paragraph>
          </Container>
        </Drawer>
        <Button
          aria-haspopup="dialog"
          onClick={() => setShowDrawer(true)}
          ref={buttonRef}
        >
          Drawer
          <VisuallyHidden>(opens drawer dialog)</VisuallyHidden>
        </Button>
        <Paragraph>LOTS OF TEXT ONE</Paragraph>
        <Paragraph>LOTS OF TEXT TWO</Paragraph>
        <Paragraph>LOTS OF TEXT THREE</Paragraph>
        <Paragraph>LOTS OF TEXT FOUR</Paragraph>
        <Paragraph>LOTS OF TEXT FIVE</Paragraph>
        <Paragraph>LOTS OF TEXT SIX</Paragraph>
        <Paragraph>LOTS OF TEXT SEVEN</Paragraph>
        <Paragraph>LOTS OF TEXT EIGHT</Paragraph>
        <Paragraph>LOTS OF TEXT NINE</Paragraph>
        <Paragraph>LOTS OF TEXT TEN</Paragraph>
        <Paragraph>LOTS OF TEXT ELEVEN</Paragraph>
        <Paragraph>LOTS OF TEXT TWELVE</Paragraph>
        <Paragraph>LOTS OF TEXT THIRTEEN</Paragraph>
        <Paragraph>LOTS OF TEXT FOURTEEN</Paragraph>
        <Paragraph>LOTS OF TEXT FIFTEEN</Paragraph>
        <Paragraph>LOTS OF TEXT SIXTEEN</Paragraph>
        <Paragraph>LOTS OF TEXT SEVENTEEN</Paragraph>
        <Paragraph>LOTS OF TEXT EIGHTEEN</Paragraph>
        <Paragraph>LOTS OF TEXT NINETEEN</Paragraph>
        <Paragraph>LOTS OF TEXT TWENTY</Paragraph>
        <Paragraph>LOTS OF TEXT TWENTY-ONE</Paragraph>
        <Paragraph>LOTS OF TEXT TWENTY-TWO</Paragraph>
        <Paragraph>LOTS OF TEXT TWENTY-THREE</Paragraph>
        <Paragraph>LOTS OF TEXT TWENTY-FOUR</Paragraph>
        <Paragraph>LOTS OF TEXT TWENTY-FIVE</Paragraph>
        <Paragraph>LOTS OF TEXT TWENTY-SIX</Paragraph>
        <Paragraph>LOTS OF TEXT TWENTY-SEVEN</Paragraph>
        <Paragraph>LOTS OF TEXT TWENTY-EIGHT</Paragraph>
        <Paragraph>LOTS OF TEXT TWENTY-NINE</Paragraph>
        <Paragraph>LOTS OF TEXT THIRTY</Paragraph>
        <Paragraph>LOTS OF TEXT THIRTY-ONE</Paragraph>
        <Paragraph>LOTS OF TEXT THIRTY-TWO</Paragraph>
        <Paragraph>LOTS OF TEXT THIRTY-THREE</Paragraph>
        <Paragraph>LOTS OF TEXT THIRTY-FOUR</Paragraph>
      </>
    );
  },
};

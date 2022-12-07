import { useState } from 'react';
import { Drawer } from '.';
import { Button } from '../Button';
import { VisuallyHidden } from '../VisuallyHidden';
import { DrawerPosition } from './Drawer';

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
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <Drawer
        header="Drawer Title"
        onClose={() => setShowDrawer(false)}
        isOpen={showDrawer}
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

import React from 'react';
import { Transition } from '.';
import { Button } from '../Button';

export default {
  component: Transition,
  title: 'Transition',
  argTypes: {
    direction: {
      control: {
        type: 'select',
        options: ['top', 'bottom', 'left', 'right'],
      },
    },
  },
};

export const Default = args => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <Transition in={isOpen} collapse {...args} style={{ overflow: 'hidden' }}>
        <div
          style={{
            height: '250px',
            width: '250px',
            backgroundColor: '#bada55',
          }}
        />
      </Transition>
      <Button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'hide' : 'show'}
      </Button>
    </div>
  );
};

export const Testing = ()  => {
  return <Transition scale nudgeLeft nudgeRight /> 
}
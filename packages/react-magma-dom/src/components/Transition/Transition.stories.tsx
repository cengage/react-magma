import React from 'react';
import { Transition } from '.';
import { Button } from '../Button';

export default {
  component: Transition,
  title: 'Transition',
  argTypes: {
    slideTop: {
      control: {
        type: 'boolean',
      },
    },
    slideBottom: {
      control: {
        type: 'boolean',
      },
    },
    slideRight: {
      control: {
        type: 'boolean',
      },
    },
    slideLeft: {
      control: {
        type: 'boolean',
      },
    },
    nudgeTop: {
      control: {
        type: 'boolean',
      },
    },
    nudgeBottom: {
      control: {
        type: 'boolean',
      },
    },
    nudgeRight: {
      control: {
        type: 'boolean',
      },
    },
    nudgeLeft: {
      control: {
        type: 'boolean',
      },
    },
    fade: {
      control: {
        type: 'boolean',
      },
    },
    scale: {
      control: {
        type: 'boolean',
      },
    },
    collapse: {
      control: {
        type: 'boolean',
      },
    },  
  },
};

export const Default = args => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <Transition isOpen={isOpen} {...args} style={{ overflow: 'hidden' }}>
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

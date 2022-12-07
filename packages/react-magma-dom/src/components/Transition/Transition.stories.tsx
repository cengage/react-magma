import { useState } from 'react';
import { Transition } from '.';
import { Button } from '../Button';

const info = {
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
    rotate45: {
      control: {
        type: 'boolean',
      },
    },
    rotate90: {
      control: {
        type: 'boolean',
      },
    },
    rotate180: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default info;

export const Default = args => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Transition
        isOpen={isOpen}
        {...args}
        style={{ overflow: 'hidden', height: '250px', width: '250px' }}
      >
        <div
          style={{
            height: '250px',
            width: '200px',
            margin: '0 auto',
            borderTop: '5px solid #546817',
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

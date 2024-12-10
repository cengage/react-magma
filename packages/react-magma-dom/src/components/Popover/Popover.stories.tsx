import React from 'react';
import { Popover, PopoverPositioning } from './Popover';
import { PopoverContent } from './PopoverContent';
import { PopoverTrigger } from './PopoverTrigger';
import { Meta } from '@storybook/react/types-6-0';
import { Button } from '../Button';
import { Card } from '../Card';
import { PopoverHeader } from './PopoverHeader';
import { PopoverFooter } from './PopoverFooter';
import { PasswordInput } from '../PasswordInput';

export default {
  component: Popover,
  title: 'Popover',
  argTypes: {
    isInverse: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    positioning: {
      control: {
        type: 'select',
        options: PopoverPositioning,
      },
    },
    hoverable: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    focusable: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    isDisabled: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    maxHeight: {
      control: {
        type: 'number',
      },
    },
    width: {
      control: {
        type: 'number',
      },
    },
    matchedWidth: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    withoutPointer: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    openByDefault: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;
const Template = args => (
  <Card
    style={{
      display: 'flex',
      alignItems: 'center',
      height: '500px',
      justifyContent: 'center',
    }}
  >
    <Popover {...args}>
      <PopoverTrigger>
        <Button>Popover Trigger Button</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader style={{ gap: '8px' }}>
          <span>This is header</span>
          <Button>Header Button</Button>
        </PopoverHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', whiteSpace: 'wrap' }}>
          <span>This is a content inside the popover!</span>
          <Button>Content Button</Button>
        </div>
        <PopoverFooter style={{ gap: '8px' }}>
          <span>This is footer</span>
          <Button>Footer Button</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  </Card>
);

export const Default = Template.bind({});
Default.args = {};

const InputTemplate = args => {
  const [state, setState] = React.useState<string>('');
  const inputRef = React.useRef<HTMLInputElement>();

  return (
    <Card
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '300px',
        justifyContent: 'center',
      }}
      isInverse={args.isInverse}
    >
      <Popover {...args} onOpen={() => inputRef.current?.focus()}>
        <PopoverTrigger>
          <PasswordInput
            {...args}
            value={state}
            onChange={e => setState(e.target.value)}
            ref={inputRef}
          />
        </PopoverTrigger>
        <PopoverContent>
          <span>Enter!</span>
        </PopoverContent>
      </Popover>
    </Card>
  );
};

export const PopoverInInput = InputTemplate.bind({});
PopoverInInput.args = {};

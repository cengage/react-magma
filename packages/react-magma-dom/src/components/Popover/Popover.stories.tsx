import React, { useState } from 'react';

import { Meta } from '@storybook/react/types-6-0';
import {
  ArrowDropDownIcon,
  CloseIcon,
  DoneIcon,
  FilterAltIcon,
  HeadphonesIcon,
  ModeCommentIcon,
  SettingsIcon,
} from 'react-magma-icons';

import { Popover, PopoverApi, PopoverPosition } from './Popover';
import { PopoverContent } from './PopoverContent';
import { PopoverTrigger } from './PopoverTrigger';
import { magma } from '../../theme/magma';
import { Button, ButtonColor, ButtonSize, ButtonType } from '../Button';
import { ButtonGroup, ButtonGroupAlignment } from '../ButtonGroup';
import { Card } from '../Card';
import { PopoverHeader, PopoverFooter } from './PopoverSection';
import { Checkbox, CheckboxTextPosition } from '../Checkbox';
import { Form } from '../Form';
import { FormGroup } from '../FormGroup';
import { Hyperlink } from '../Hyperlink';
import { Input } from '../Input';
import { PasswordInput } from '../PasswordInput';
import { Spacer } from '../Spacer';
import { Toggle } from '../Toggle';
import { TypographyVisualStyle } from '../Typography';

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
    position: {
      control: {
        type: 'select',
        options: PopoverPosition,
      },
    },
    hoverable: {
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
    hasPointer: {
      defaultValue: true,
      control: {
        type: 'boolean',
      },
    },
    openByDefault: {
      control: {
        type: 'boolean',
      },
    },
    focusTrap: {
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
    isInverse={args.isInverse}
  >
    <Popover {...args}>
      <PopoverTrigger aria-label="Popover trigger" />
      <PopoverContent>
        <span>
          This represents your entire organization’s support cases. To view
          support cases that you have opened, visit the support center.
        </span>
        <ButtonGroup
          alignment={ButtonGroupAlignment.apart}
          style={{ marginTop: '16px', alignItems: 'center' }}
        >
          <Hyperlink to="/" hasUnderline={false} isInverse={args.isInverse}>
            Learn more
          </Hyperlink>
          <Button isInverse={args.isInverse}>Manage Cases</Button>
        </ButtonGroup>
      </PopoverContent>
    </Popover>
  </Card>
);

export const Default = Template.bind({});
Default.args = {
  width: 320,
};
Default.parameters = { controls: { exclude: ['hoverable'] } };

const CustomIconTemplate = args => (
  <Card
    style={{
      display: 'flex',
      alignItems: 'center',
      height: '300px',
      justifyContent: 'center',
    }}
    isInverse={args.isInverse}
  >
    <Popover {...args}>
      <PopoverTrigger
        icon={<FilterAltIcon />}
        size={ButtonSize.large}
        aria-label="Popover trigger"
      />
      <PopoverContent>
        <FormGroup>
          <Checkbox labelText="Filter 1" isInverse={args.isInverse} />
          <Checkbox labelText="Filter 2" isInverse={args.isInverse} />
          <Checkbox labelText="Filter 3" isInverse={args.isInverse} />
          <Checkbox labelText="Filter 4" isInverse={args.isInverse} />
        </FormGroup>
      </PopoverContent>
    </Popover>
  </Card>
);

export const CustomIcon = CustomIconTemplate.bind({});
CustomIcon.args = {
  width: 160,
};
CustomIcon.parameters = { controls: { exclude: ['hoverable'] } };

const TextOnlyWithHoverTemplate = args => {
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
      <Popover {...args}>
        <PopoverTrigger aria-label="Popover trigger" />
        <PopoverContent>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <span style={{ fontWeight: 600 }}>Lorem ipsum dolor</span>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </span>
          </div>
        </PopoverContent>
      </Popover>
    </Card>
  );
};

export const TextOnlyWithHover = TextOnlyWithHoverTemplate.bind({});
TextOnlyWithHover.args = {
  width: 320,
  hoverable: true,
};

const WithHeaderTemplate = args => {
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
      <Popover {...args}>
        <PopoverTrigger aria-label="Popover trigger" />
        <PopoverContent>
          <PopoverHeader style={{ justifyContent: 'start', fontWeight: 600 }}>
            <span>Popover Header</span>
          </PopoverHeader>
          <span>
            And here’s some amazing content. It’s very engaging. Right?
          </span>
        </PopoverContent>
      </Popover>
    </Card>
  );
};

export const WithHeader = WithHeaderTemplate.bind({});
WithHeader.args = {
  width: 320,
};

const WithFooterTemplate = args => {
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
      <Popover {...args}>
        <PopoverTrigger aria-label="Popover trigger" />
        <PopoverContent>
          <span>
            And here’s some amazing content. It’s very engaging. Right?
          </span>
          <PopoverFooter style={{ justifyContent: 'start', fontWeight: 600 }}>
            <span>Popover Footer</span>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Card>
  );
};

export const WithFooter = WithFooterTemplate.bind({});
WithFooter.args = {
  width: 320,
};

const WithHeaderAndFooterTemplate = args => {
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
      <Popover {...args}>
        <PopoverTrigger aria-label="Popover trigger" />
        <PopoverContent>
          <PopoverHeader style={{ justifyContent: 'start', fontWeight: 600 }}>
            <span>Popover Header</span>
          </PopoverHeader>
          <span>
            And here’s some amazing content. It’s very engaging. Right?
          </span>
          <PopoverFooter style={{ justifyContent: 'start', fontWeight: 600 }}>
            <span>Popover Footer</span>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Card>
  );
};

export const WithHeaderAndFooter = WithHeaderAndFooterTemplate.bind({});
WithHeaderAndFooter.args = {
  width: 320,
};

const WithALongContentAndMaxHeightTemplate = args => {
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
      <Popover {...args}>
        <PopoverTrigger aria-label="Popover trigger" />
        <PopoverContent>
          <PopoverHeader style={{ justifyContent: 'start', fontWeight: 600 }}>
            <span>Popover Header</span>
          </PopoverHeader>
          <span>
            And here’s some very very very very very very very very very very
            very very very very very very very very very very very very very
            very very very very very very very very very very very very very
            very very very very very very very very very very very very very
            very very very very very very very very very very very very very
            very very very very very very very very very very very very very
            very very very very very very very very very very very very very
            very very very very very very very very very very very very very
            very very very very very very very very very very very very very
            very very very very very very very very very very long content.
          </span>
          <PopoverFooter style={{ justifyContent: 'start', fontWeight: 600 }}>
            <span>Popover Footer</span>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Card>
  );
};

export const WithALongContentAndMaxHeight =
  WithALongContentAndMaxHeightTemplate.bind({});
WithALongContentAndMaxHeight.args = {
  width: 320,
  maxHeight: 200,
};

const SettingsExampleTemplate = args => {
  const ref = React.useRef<PopoverApi>(null);

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
      <Popover {...args} apiRef={ref}>
        <PopoverTrigger icon={<SettingsIcon />} aria-label="Popover trigger" />
        <PopoverContent>
          <FormGroup>
            <Toggle
              labelText="Setting 1"
              defaultChecked
              containerStyle={{
                width: '100%',
                justifyContent: 'space-between',
              }}
              isInverse={args.isInverse}
            />
            <Checkbox
              labelText="Setting 2"
              textPosition={CheckboxTextPosition.left}
              labelStyle={{ width: '100%', justifyContent: 'space-between' }}
              isInverse={args.isInverse}
            />
            <Checkbox
              labelText="Setting 3"
              textPosition={CheckboxTextPosition.left}
              labelStyle={{ width: '100%', justifyContent: 'space-between' }}
              isInverse={args.isInverse}
            />
          </FormGroup>
          <PopoverFooter style={{ justifyContent: 'end', fontWeight: 600 }}>
            <Button
              size={ButtonSize.small}
              onClick={event => ref.current?.closePopoverManually(event)}
              isInverse={args.isInverse}
            >
              Apply
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Card>
  );
};

export const SettingsExample = SettingsExampleTemplate.bind({});
SettingsExample.args = {
  width: 280,
};
SettingsExample.parameters = { controls: { exclude: ['hoverable'] } };

const CustomTriggerButtonTemplate = args => {
  const ref = React.useRef<PopoverApi>(null);

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
      <Popover {...args} apiRef={ref}>
        <PopoverTrigger>
          <Button style={{ width: '280px' }} isInverse={args.isInverse}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <SettingsIcon />
              <span>Settings</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <FormGroup>
            <Toggle
              labelText="Setting 1"
              defaultChecked
              containerStyle={{
                width: '100%',
                justifyContent: 'space-between',
              }}
              isInverse={args.isInverse}
            />
            <Checkbox
              labelText="Setting 2"
              textPosition={CheckboxTextPosition.left}
              labelStyle={{ width: '100%', justifyContent: 'space-between' }}
              isInverse={args.isInverse}
            />
            <Checkbox
              labelText="Setting 3"
              textPosition={CheckboxTextPosition.left}
              labelStyle={{ width: '100%', justifyContent: 'space-between' }}
              isInverse={args.isInverse}
            />
          </FormGroup>
          <PopoverFooter style={{ justifyContent: 'end', fontWeight: 600 }}>
            <Button
              size={ButtonSize.small}
              onClick={event => ref.current?.closePopoverManually(event)}
              isInverse={args.isInverse}
            >
              Apply
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Card>
  );
};

export const CustomTriggerButton = CustomTriggerButtonTemplate.bind({});
CustomTriggerButton.args = {
  width: 'target',
};
CustomTriggerButton.parameters = { controls: { exclude: ['hoverable'] } };

const FormExampleTemplate = args => {
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
      <Popover {...args}>
        <PopoverTrigger>Register</PopoverTrigger>
        <PopoverContent>
          <Form
            isInverse={args.isInverse}
            onSubmit={() => alert('form submitted')}
            header="Form in the popover"
            headingLevel={6}
            headingVisualStyle={TypographyVisualStyle.headingXSmall}
            actions={
              <Button type={ButtonType.submit} isFullWidth>
                Register
              </Button>
            }
          >
            <>
              <Input labelText="Name" />
              <Spacer size="12" />
              <Input labelText="Email" />
              <Spacer size="24" />
            </>
          </Form>
        </PopoverContent>
      </Popover>
    </Card>
  );
};

export const FormExample = FormExampleTemplate.bind({});
FormExample.args = {};
FormExample.parameters = { controls: { exclude: ['hoverable'] } };

const InputExampleTemplate = args => {
  const [state, setState] = React.useState<string>('');
  const [errorState, setErrorState] = React.useState({
    length: true,
    number: true,
    lowercase: true,
    uppercase: true,
    specialSymbol: true,
  });
  const inputRef = React.useRef<HTMLInputElement>();

  const resetErrors = () => {
    setErrorState({
      length: true,
      number: true,
      lowercase: true,
      uppercase: true,
      specialSymbol: true,
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setState(value);
    resetErrors();

    const newErrors = {
      length: true,
      number: true,
      lowercase: true,
      uppercase: true,
      specialSymbol: true,
    };

    if (value.length >= 6) {
      newErrors.length = false;
    }

    if (/[0-9]/.test(value)) {
      newErrors.number = false;
    }

    if (/[a-z]/.test(value)) {
      newErrors.lowercase = false;
    }

    if (/[A-Z]/.test(value)) {
      newErrors.uppercase = false;
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      newErrors.specialSymbol = false;
    }

    setErrorState(newErrors);
  };

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
            onMouseDown={e => e.stopPropagation()}
            {...args}
            value={state}
            onChange={onChange}
            ref={inputRef}
            width="320px"
          />
        </PopoverTrigger>
        <PopoverContent style={{ maxWidth: '100%' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {errorState.length ? (
                <CloseIcon
                  color={
                    args.isInverse
                      ? magma.colors.danger200
                      : magma.colors.danger500
                  }
                  size={16}
                />
              ) : (
                <DoneIcon
                  color={
                    args.isInverse
                      ? magma.colors.success200
                      : magma.colors.success500
                  }
                  size={16}
                />
              )}

              <span
                style={{
                  color: errorState.length
                    ? args.isInverse
                      ? magma.colors.danger200
                      : magma.colors.danger500
                    : args.isInverse
                      ? magma.colors.success200
                      : magma.colors.success500,
                }}
              >
                Includes at least 6 characters
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {errorState.number ? (
                <CloseIcon
                  color={
                    args.isInverse
                      ? magma.colors.danger200
                      : magma.colors.danger500
                  }
                  size={16}
                />
              ) : (
                <DoneIcon
                  color={
                    args.isInverse
                      ? magma.colors.success200
                      : magma.colors.success500
                  }
                  size={16}
                />
              )}

              <span
                style={{
                  color: errorState.number
                    ? args.isInverse
                      ? magma.colors.danger200
                      : magma.colors.danger500
                    : args.isInverse
                      ? magma.colors.success200
                      : magma.colors.success500,
                }}
              >
                Includes number
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {errorState.lowercase ? (
                <CloseIcon
                  color={
                    args.isInverse
                      ? magma.colors.danger200
                      : magma.colors.danger500
                  }
                  size={16}
                />
              ) : (
                <DoneIcon
                  color={
                    args.isInverse
                      ? magma.colors.success200
                      : magma.colors.success500
                  }
                  size={16}
                />
              )}

              <span
                style={{
                  color: errorState.lowercase
                    ? args.isInverse
                      ? magma.colors.danger200
                      : magma.colors.danger500
                    : args.isInverse
                      ? magma.colors.success200
                      : magma.colors.success500,
                }}
              >
                Includes lowercase letter
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {errorState.uppercase ? (
                <CloseIcon
                  color={
                    args.isInverse
                      ? magma.colors.danger200
                      : magma.colors.danger500
                  }
                  size={16}
                />
              ) : (
                <DoneIcon
                  color={
                    args.isInverse
                      ? magma.colors.success200
                      : magma.colors.success500
                  }
                  size={16}
                />
              )}

              <span
                style={{
                  color: errorState.uppercase
                    ? args.isInverse
                      ? magma.colors.danger200
                      : magma.colors.danger500
                    : args.isInverse
                      ? magma.colors.success200
                      : magma.colors.success500,
                }}
              >
                Includes uppercase letter
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {errorState.specialSymbol ? (
                <CloseIcon
                  color={
                    args.isInverse
                      ? magma.colors.danger200
                      : magma.colors.danger500
                  }
                  size={16}
                />
              ) : (
                <DoneIcon
                  color={
                    args.isInverse
                      ? magma.colors.success200
                      : magma.colors.success500
                  }
                  size={16}
                />
              )}

              <span
                style={{
                  color: errorState.specialSymbol
                    ? args.isInverse
                      ? magma.colors.danger200
                      : magma.colors.danger500
                    : args.isInverse
                      ? magma.colors.success200
                      : magma.colors.success500,
                }}
              >
                Includes special symbol
              </span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </Card>
  );
};

export const InputExample = InputExampleTemplate.bind({});
InputExample.args = {
  hasPointer: false,
  width: 'target',
};

const DisabledPopoverExample = args => {
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
      <Popover {...args}>
        <PopoverTrigger aria-label="Popover trigger" />
        <PopoverContent>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <span style={{ fontWeight: 600 }}>Lorem ipsum dolor</span>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </span>
          </div>
        </PopoverContent>
      </Popover>
    </Card>
  );
};

export const DisabledPopover = DisabledPopoverExample.bind({});
DisabledPopover.args = {
  width: 320,
  isDisabled: true,
  hoverable: true,
};

const DisabledTriggerExample = args => {
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
      <Popover {...args}>
        <PopoverTrigger>
          <Button disabled>Disabled button</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <span style={{ fontWeight: 600 }}>Lorem ipsum dolor</span>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </span>
          </div>
        </PopoverContent>
      </Popover>
    </Card>
  );
};

export const DisabledTrigger = DisabledTriggerExample.bind({});
DisabledTrigger.args = {
  width: 320,
  hoverable: true,
};

const ProfileExampleTemplate = args => {
  return (
    <Card
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '300px',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: '8px',
      }}
      isInverse={args.isInverse}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/3/33/Mark_Kassen%2C_Tony_C%C3%A1rdenas_and_Chris_Evans_%28cropped%29.jpg"
        alt="Chris Evans"
        width={32}
        height={32}
        style={{
          borderRadius: '4px',
          objectFit: 'cover',
          objectPosition: 'top',
        }}
      />
      <Popover {...args}>
        <PopoverTrigger>
          <Hyperlink
            to="#"
            style={{
              fontWeight: 600,
            }}
            isInverse={args.isInverse}
          >
            Chris Evans
          </Hyperlink>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverFooter>
            <ButtonGroup
              alignment={ButtonGroupAlignment.fill}
              style={{ width: '100%' }}
              isInverse={args.isInverse}
            >
              <Button color={ButtonColor.subtle} size={ButtonSize.small}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <ModeCommentIcon size={20} />
                  <span>Message</span>
                </div>
              </Button>
              <Button color={ButtonColor.subtle} size={ButtonSize.small}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <HeadphonesIcon size={20} />
                  <span>Huddle</span>
                  <ArrowDropDownIcon />
                </div>
              </Button>
            </ButtonGroup>
          </PopoverFooter>
          <div style={{ display: 'flex', gap: '8px' }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/33/Mark_Kassen%2C_Tony_C%C3%A1rdenas_and_Chris_Evans_%28cropped%29.jpg"
              alt="Chris Evans"
              width={74}
              height={74}
              style={{
                borderRadius: '4px',
                objectFit: 'cover',
                objectPosition: 'top',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  color: args.isInverse ? '#FFFFFF' : '#454545',
                  fontWeight: 600,
                }}
              >
                Chris Evans
              </span>
              <span
                style={{
                  fontSize: '14px',
                  letterSpacing: '0.16px',
                  lineHeight: '20px',
                  color: args.isInverse ? '#FFFFFF' : '#454545',
                }}
              >
                Sr User Experience Designer
              </span>
              <span
                style={{
                  fontSize: '14px',
                  letterSpacing: '0.16px',
                  lineHeight: '20px',
                  color: args.isInverse ? '#FFFFFFB2' : '#707070',
                }}
              >
                he/him/his
              </span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <span style={{ color: args.isInverse ? '#FFFFFFB2' : '#707070' }}>
        8:06 AM
      </span>
    </Card>
  );
};

export const ProfileExample = ProfileExampleTemplate.bind({});
ProfileExample.args = {};
ProfileExample.parameters = { controls: { exclude: ['hoverable'] } };

const DontShowAgainTemplate = args => {
  const sessionStorageValue = JSON.parse(
    sessionStorage.getItem('temporaryOpenByDefault')!
  );

  const initialOpen = React.useMemo(() => {
    return sessionStorageValue ?? args.openByDefault;
  }, []);

  const [checked, setChecked] = useState(() => initialOpen);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = !event.target.checked;

    sessionStorage.setItem('temporaryOpenByDefault', JSON.stringify(nextValue));

    setChecked(nextValue);
  };

  const ref = React.useRef<PopoverApi>(null);

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
      <Popover {...args} openByDefault={initialOpen} apiRef={ref}>
        <PopoverTrigger aria-label="Popover trigger" />
        <PopoverContent>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </span>
          <FormGroup
            containerStyle={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Checkbox
              labelText="Don’t show this again"
              onChange={onChange}
              checked={!checked}
              isInverse={args.isInverse}
            />
            <Button
              size={ButtonSize.small}
              onClick={event => ref.current?.closePopoverManually(event)}
              isInverse={args.isInverse}
            >
              Got it
            </Button>
          </FormGroup>
        </PopoverContent>
      </Popover>
    </Card>
  );
};

export const DontShowAgain = DontShowAgainTemplate.bind({});
DontShowAgain.args = {
  width: 320,
  openByDefault: true,
};
DontShowAgain.parameters = { controls: { exclude: ['hoverable'] } };

import React, { useState } from 'react';
import { Popover, PopoverApi, PopoverPosition } from './Popover';
import { PopoverContent } from './PopoverContent';
import { PopoverTrigger } from './PopoverTrigger';
import { Meta } from '@storybook/react/types-6-0';
import { Button, ButtonColor, ButtonSize, ButtonType } from '../Button';
import { Card } from '../Card';
import { PopoverHeader, PopoverFooter } from './PopoverSection';
import { PasswordInput } from '../PasswordInput';
import {
  ArrowDropDownIcon,
  CloseIcon,
  DoneIcon,
  FilterAltIcon,
  HeadphonesIcon,
  ModeCommentIcon,
  SettingsIcon,
} from 'react-magma-icons';
import { FormGroup } from '../FormGroup';
import { Checkbox, CheckboxTextPosition } from '../Checkbox';
import { Toggle } from '../Toggle';
import { Input } from '../Input';
import { Form } from '../Form';
import { Spacer } from '../Spacer';
import { TypographyVisualStyle } from '../Typography';
import { ButtonGroup, ButtonGroupAlignment } from '../ButtonGroup';
import { Hyperlink } from '../Hyperlink';

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
      <PopoverTrigger />
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
          <Button>Manage Cases</Button>
        </ButtonGroup>
      </PopoverContent>
    </Popover>
  </Card>
);

export const Default = Template.bind({});
Default.args = {
  width: 320,
};

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
      <PopoverTrigger icon={<FilterAltIcon />} size={ButtonSize.large} />
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
        <PopoverTrigger />
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
        <PopoverTrigger />
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
        <PopoverTrigger />
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
        <PopoverTrigger />
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
        <PopoverTrigger />
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
        <PopoverTrigger icon={<SettingsIcon />} />
        <PopoverContent>
          <FormGroup>
            <Toggle
              labelText="Setting 1"
              defaultChecked={true}
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
          <Button style={{ width: '280px' }}>
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
              defaultChecked={true}
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
        <PopoverContent>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {errorState.length ? (
                <CloseIcon color="red" size={16} />
              ) : (
                <DoneIcon color="green" size={16} />
              )}

              <span style={{ color: errorState.length ? 'red' : 'green' }}>
                Includes at least 6 characters
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {errorState.number ? (
                <CloseIcon color="red" size={16} />
              ) : (
                <DoneIcon color="green" size={16} />
              )}

              <span style={{ color: errorState.number ? 'red' : 'green' }}>
                Includes number
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {errorState.lowercase ? (
                <CloseIcon color="red" size={16} />
              ) : (
                <DoneIcon color="green" size={16} />
              )}

              <span style={{ color: errorState.lowercase ? 'red' : 'green' }}>
                Includes lowercase letter
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {errorState.uppercase ? (
                <CloseIcon color="red" size={16} />
              ) : (
                <DoneIcon color="green" size={16} />
              )}

              <span style={{ color: errorState.uppercase ? 'red' : 'green' }}>
                Includes uppercase letter
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {errorState.specialSymbol ? (
                <CloseIcon color="red" size={16} />
              ) : (
                <DoneIcon color="green" size={16} />
              )}

              <span
                style={{ color: errorState.specialSymbol ? 'red' : 'green' }}
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
        <PopoverTrigger />
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
  isDisabled: true,
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
        alt="Mark_Kassen"
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
          <span
            style={{
              fontWeight: 600,
              textDecorationLine: 'underline',
              textDecorationStyle: 'solid',
              textUnderlinePosition: 'from-font',
              textDecorationSkipInk: 'none',
              cursor: 'pointer',
              color: args.isInverse ? '#CDDEFF' : '#3942B0',
            }}
          >
            Chris Evans
          </span>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverFooter>
            <ButtonGroup
              alignment={ButtonGroupAlignment.fill}
              style={{ width: '100%' }}
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
              alt="Mark_Kassen"
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
        <PopoverTrigger />
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

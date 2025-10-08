import React, { useState } from 'react';

import { Meta } from '@storybook/react';
import {
  ArrowDropDownIcon,
  CloseIcon,
  DoneIcon,
  FilterAltIcon,
  HeadphonesIcon,
  KeyboardArrowRightIcon,
  ModeCommentIcon,
  SettingsIcon,
  AccessibilityNewIcon,
  AccessTimeIcon,
  AccountBalanceIcon,
  CheckBoxIcon,
  DirectionsRunIcon,
  HouseIcon,
  LandscapeIcon,
  RadarIcon,
  EcoIcon,
  AirIcon,
} from 'react-magma-icons';

import {
  Popover,
  PopoverApi,
  PopoverPosition,
  PopoverAlignment,
} from './Popover';
import { PopoverContent } from './PopoverContent';
import { PopoverTrigger } from './PopoverTrigger';
import { magma } from '../../theme/magma';
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '../Button';
import { ButtonGroup, ButtonGroupAlignment } from '../ButtonGroup';
import { Card } from '../Card';
import { PopoverHeader, PopoverFooter } from './PopoverSection';
import { Checkbox, CheckboxTextPosition } from '../Checkbox';
import { Flex, FlexBehavior, FlexDirection, FlexJustify } from '../Flex';
import { Form } from '../Form';
import { FormGroup } from '../FormGroup';
import { Hyperlink } from '../Hyperlink';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import { Paragraph } from '../Paragraph';
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
    alignment: {
      control: {
        type: 'select',
        options: PopoverAlignment,
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

export const Default = {
  render: Template,

  args: {
    width: 320,
  },

  parameters: { controls: { exclude: ['hoverable'] } },
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

export const CustomIcon = {
  render: CustomIconTemplate,

  args: {
    width: 160,
  },

  parameters: { controls: { exclude: ['hoverable'] } },
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

export const TextOnlyWithHover = {
  render: TextOnlyWithHoverTemplate,

  args: {
    width: 320,
    hoverable: true,
  },
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

export const WithHeader = {
  render: WithHeaderTemplate,

  args: {
    width: 320,
  },
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

export const WithFooter = {
  render: WithFooterTemplate,

  args: {
    width: 320,
  },
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

export const WithHeaderAndFooter = {
  render: WithHeaderAndFooterTemplate,

  args: {
    width: 320,
  },
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

export const WithALongContentAndMaxHeight = {
  render: WithALongContentAndMaxHeightTemplate,

  args: {
    width: 320,
    maxHeight: 200,
  },
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

export const SettingsExample = {
  render: SettingsExampleTemplate,

  args: {
    width: 280,
  },

  parameters: { controls: { exclude: ['hoverable'] } },
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

export const CustomTriggerButton = {
  render: CustomTriggerButtonTemplate,

  args: {
    width: 'target',
  },

  parameters: { controls: { exclude: ['hoverable'] } },
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

export const FormExample = {
  render: FormExampleTemplate,
  args: {},
  parameters: { controls: { exclude: ['hoverable'] } },
};

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

export const InputExample = {
  render: InputExampleTemplate,

  args: {
    hasPointer: false,
    width: 'target',
  },
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

export const DisabledPopover = {
  render: DisabledPopoverExample,

  args: {
    width: 320,
    isDisabled: true,
    hoverable: true,
  },
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

export const DisabledTrigger = {
  render: DisabledTriggerExample,

  args: {
    width: 320,
    hoverable: true,
  },
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

export const ProfileExample = {
  render: ProfileExampleTemplate,
  args: {},
  parameters: { controls: { exclude: ['hoverable'] } },
};

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

export const DontShowAgain = {
  render: DontShowAgainTemplate,

  args: {
    width: 320,
    openByDefault: true,
  },

  parameters: { controls: { exclude: ['hoverable'] } },
};

export const ProgrammaticallyOpening = {
  render: args => {
    const popoverApiRef = React.useRef<PopoverApi>();

    function handleClose(event: React.SyntheticEvent) {
      popoverApiRef.current?.closePopoverManually(event);
    }

    function handleOpenPopover(event: React.KeyboardEvent) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        popoverApiRef.current?.openPopoverManually(event);
      }
    }

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
        <Popover {...args} isInverse apiRef={popoverApiRef}>
          <PopoverTrigger>
            <span
              tabIndex={0}
              role="button"
              style={{
                textDecoration: 'underline',
                color: magma.colors.primary,
                cursor: 'pointer',
              }}
              onKeyDown={handleOpenPopover}
            >
              Press Enter or Space to open popover
            </span>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <div>Popover Header</div>
            </PopoverHeader>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Paragraph noMargins isInverse>
                Popover Content
              </Paragraph>
            </div>
            <PopoverFooter style={{ justifyContent: 'end' }}>
              <div>
                <IconButton
                  icon={<CloseIcon />}
                  aria-label="Close"
                  size={ButtonSize.small}
                  isInverse
                  variant={ButtonVariant.link}
                  onClick={handleClose}
                >
                  Close
                </IconButton>
              </div>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Card>
    );
  },
};

export const SeveralPopovers = () => {
  return (
    <Flex behavior={FlexBehavior.container} style={{ paddingLeft: '36px' }}>
      <Flex
        behavior={FlexBehavior.both}
        direction={FlexDirection.row}
        justify={FlexJustify.spaceAround}
        style={{ borderStyle: 'dashed', width: '95%' }}
      >
        {[
          {
            label: 'Responsibility & Control',
            icon: <EcoIcon />,
            background: magma.colors.primary400,
          },
          {
            label: 'Competition',
            icon: <DirectionsRunIcon />,
            background: '#711E6E',
          },
          {
            label: 'Task Planning',
            icon: <CheckBoxIcon />,
            background: magma.colors.info600,
          },
          {
            label: 'Expectations',
            icon: <AccessibilityNewIcon />,
            background: '#005249',
          },
          {
            label: 'Wellness',
            icon: <AirIcon />,
            background: '#9D8600',
          },
          {
            label: 'Time Management',
            icon: <AccessTimeIcon />,
            background: '#8F0033',
          },
          {
            label: 'College Involvement',
            icon: <AccountBalanceIcon />,
            background: '#B84900',
          },
          {
            label: 'Family Involvement',
            icon: <HouseIcon />,
            background: '#1EA746',
          },
          {
            label: 'Precision',
            icon: <RadarIcon />,
            background: '#00A393',
          },
          {
            label: 'Performance',
            icon: <LandscapeIcon />,
            background: '#B12FAD',
          },
        ].map(({ label, icon, background }) => (
          <Popover key={label} position={PopoverPosition.top}>
            <PopoverTrigger>
              <IconButton
                aria-label={label}
                icon={icon}
                size={ButtonSize.medium}
                style={{ background: background }}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <div>{label}</div>
              </PopoverHeader>
              <Button variant={ButtonVariant.link}>
                View Resources <KeyboardArrowRightIcon />
              </Button>
            </PopoverContent>
          </Popover>
        ))}
      </Flex>
    </Flex>
  );
};

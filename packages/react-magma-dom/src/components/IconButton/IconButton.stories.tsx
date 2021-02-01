import React from 'react';
import { IconButton } from '.';
import { AlertIcon, BellIcon, CheckIcon, Cog2Icon } from 'react-magma-icons';
import { ButtonColor, ButtonVariant } from '../Button';

export default {
  component: IconButton,
  title: 'IconButton',
};

export const Default = () => {
  return (
    <>
      <p>
        <IconButton aria-label="Notifications" icon={<BellIcon />} />
        <IconButton aria-label="Notifications" icon={<BellIcon />} />
        <IconButton
          aria-label="Notifications"
          variant={ButtonVariant.outline}
          icon={<BellIcon />}
        />
        <IconButton
          aria-label="Notifications"
          variant={ButtonVariant.link}
          icon={<BellIcon />}
        />
        <IconButton
          aria-label="Settings"
          color={ButtonColor.secondary}
          icon={<Cog2Icon />}
        />
        <IconButton
          aria-label="Settings"
          color={ButtonColor.secondary}
          variant={ButtonVariant.outline}
          icon={<Cog2Icon />}
        />
        <IconButton
          aria-label="Settings"
          color={ButtonColor.secondary}
          variant={ButtonVariant.link}
          icon={<Cog2Icon />}
        />
        <IconButton
          aria-label="Correct"
          color={ButtonColor.success}
          icon={<CheckIcon />}
        />
        <IconButton
          aria-label="Correct"
          color={ButtonColor.success}
          variant={ButtonVariant.outline}
          icon={<CheckIcon />}
        />
        <IconButton
          aria-label="Correct"
          color={ButtonColor.success}
          variant={ButtonVariant.link}
          icon={<CheckIcon />}
        />
        <IconButton
          aria-label="Error"
          color={ButtonColor.danger}
          icon={<AlertIcon />}
        />
        <IconButton
          aria-label="Error"
          color={ButtonColor.danger}
          variant={ButtonVariant.outline}
          icon={<AlertIcon />}
        />
        <IconButton
          aria-label="Error"
          color={ButtonColor.danger}
          variant={ButtonVariant.link}
          icon={<AlertIcon />}
        />
        <IconButton aria-label="Notifications" disabled icon={<BellIcon />} />
      </p>
      <p>
        <IconButton icon={<BellIcon />}>Notifications</IconButton>
        <IconButton
          icon={<Cog2Icon />}
          color={ButtonColor.secondary}
          variant={ButtonVariant.outline}
        >
          Settings
        </IconButton>
        <IconButton
          icon={<CheckIcon />}
          color={ButtonColor.success}
          variant={ButtonVariant.link}
        >
          Submit
        </IconButton>
      </p>
    </>
  );
};

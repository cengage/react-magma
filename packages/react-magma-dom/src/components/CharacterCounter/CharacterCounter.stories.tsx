import React from 'react';
import { Container } from '../Container';
import { CharacterCounter } from '.';
import { HelpIcon } from 'react-magma-icons';
import { ButtonType, ButtonSize, ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { Tooltip } from '../Tooltip';

export default {
  component: CharacterCounter,
  title: 'CharacterCounter',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export const Default = args => {
  return <Input labelText="Character Counter" maxLength={22} />;
};

export const Inverse = args => {
  return (
    <Container isInverse style={{ padding: '20px' }}>
      <Input isInverse labelText="Character Counter" maxLength={22} />
    </Container>
  );
};

export const IsClearable = args => {
  return <Input isClearable labelText="Character Counter" maxLength={22} />;
};

export const WithHelperText = args => {
  return (
    <Input
      labelText="Character Counter"
      helperMessage={'Life in a northern town'}
      maxLength={22}
    />
  );
};

export const WithError = args => {
  return (
    <Input
      labelText="Character Counter"
      errorMessage={'Life in a northern town'}
      maxLength={22}
    />
  );
};

export const WithChildren = args => {
  const helpLinkLabel = 'Learn more';
  const onHelpLinkClick = () => {
    alert('Help link clicked!');
  };
  return (
    <Input
      labelText="Character Counter"
      errorMessage={'Life in a northern town'}
      maxLength={22}
    >
      <Tooltip content={helpLinkLabel}>
        <IconButton
          aria-label={helpLinkLabel}
          icon={<HelpIcon />}
          onClick={onHelpLinkClick}
          type={ButtonType.button}
          size={ButtonSize.small}
          variant={ButtonVariant.link}
        />
      </Tooltip>
    </Input>
  );
};

export const TextArea = args => {
  return <Textarea labelText="Character Counter" maxLength={45} />;
};

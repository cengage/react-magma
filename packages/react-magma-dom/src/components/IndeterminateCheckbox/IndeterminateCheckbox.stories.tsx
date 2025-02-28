import React from 'react';
import { Container } from '../Container';
import { Checkbox } from '../Checkbox';
import { FormGroup } from '../FormGroup';
import {
  IndeterminateCheckbox,
  IndeterminateCheckboxStatus,
} from '../IndeterminateCheckbox';
import { magma } from '../../theme/magma';
import { Story, Meta } from '@storybook/react/types-6-0';
import { IndeterminateCheckboxProps } from '../../../dist';

const Template: Story<IndeterminateCheckboxProps> = args => (
  <FormGroup labelText="Indeterminate Checkbox Examples">
    <IndeterminateCheckbox
      {...args}
      color={magma.colors.primary}
      defaultChecked={true}
      labelText="Indeterminate checkbox"
      id="0"
    />
    <IndeterminateCheckbox
      {...args}
      disabled
      defaultChecked={true}
      labelText="Disabled indeterminate checkbox"
      id="1"
    />
    <IndeterminateCheckbox
      {...args}
      defaultChecked={true}
      labelText="Error indeterminate checkbox"
      id="2"
      errorMessage="Error"
    />
  </FormGroup>
);

export default {
  component: IndeterminateCheckbox,
  title: 'Indeterminate Checkbox',
  argTypes: {
    status: {
      control: { type: 'select' },
      options: IndeterminateCheckboxStatus,
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
  },
  decorators: [
    (Story, context) => (
      <Container isInverse={context.args.isInverse} style={{ padding: '20px' }}>
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const Default = Template.bind({});
Default.args = {};

export const Behavior = () => {
  const [checkedItems, setCheckedItems] = React.useState<Array<boolean>>([
    true,
    false,
    false,
    false,
  ]);

  const [status, setStatus] = React.useState<IndeterminateCheckboxStatus>(
    IndeterminateCheckboxStatus.indeterminate
  );

  function getStatus(items: Array<boolean>) {
    return items.every(Boolean)
      ? IndeterminateCheckboxStatus.checked
      : items.some(Boolean)
      ? IndeterminateCheckboxStatus.indeterminate
      : IndeterminateCheckboxStatus.unchecked;
  }

  function handleUpdateIndeterminateChecked(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const updatedCheckedItems = Array(4).fill(event.target.checked);
    setCheckedItems(updatedCheckedItems);
    setStatus(getStatus(updatedCheckedItems));
  }

  function handleColorChecked(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = event.target.checked;
    setCheckedItems(updatedCheckedItems);
    setStatus(getStatus(updatedCheckedItems));
  }

  return (
    <>
      <FormGroup labelText="Colors group" isTextVisuallyHidden>
        <IndeterminateCheckbox
          onChange={handleUpdateIndeterminateChecked}
          status={status}
          labelText="Colors"
          id="indeterminateCheckbox"
        />
        <div style={{ marginLeft: magma.spaceScale.spacing08 }}>
          <Checkbox
            checked={checkedItems[0]}
            onChange={e => handleColorChecked(0, e)}
            labelText="Red"
            id="Red"
          />
          <Checkbox
            checked={checkedItems[1]}
            onChange={e => handleColorChecked(1, e)}
            labelText="Blue"
            id="Blue"
          />
          <Checkbox
            checked={checkedItems[2]}
            onChange={e => handleColorChecked(2, e)}
            labelText="Green"
            id="Green"
          />
          <Checkbox
            checked={checkedItems[3]}
            onChange={e => handleColorChecked(3, e)}
            labelText="Yellow"
            id="Yellow"
          />
        </div>
      </FormGroup>
    </>
  );
};

import { FormGroup } from '.';
import { Checkbox } from '../Checkbox';
import { Toggle } from '../Toggle';
import { Meta } from '@storybook/react/types-6-0';

export default {
  component: FormGroup,
  title: 'FormGroup',
} as Meta;

export const Default = () => {
  return (
    <>
      <FormGroup labelText="Choose One or More Colors">
        <Checkbox labelText="Red" />
        <Checkbox labelText="Blue" />
        <Checkbox labelText="Purple" />
      </FormGroup>
      <br />
      <FormGroup
        id="myCustomId"
        labelText="Turn on Notifications for the Following"
      >
        <Toggle labelText="Product updates" />
        <Toggle labelText="Promotions and sales" />
      </FormGroup>
    </>
  );
};

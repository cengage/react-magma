import React from 'react';
import { FormRenderer, FormRendererProps, componentTypes } from '../index';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Schema } from '@data-driven-forms/react-form-renderer';

const baseSchema: Schema = {
  title: 'Form Header',
  description: 'Some description for a form.',
  fields: [],
};

const Template: Story<FormRendererProps> = args => (
  <FormRenderer
    schema={args.schema}
    onSubmit={action('on-submit')}
    onCancel={action('on-cancel')}
  />
);

export default {
  title: 'FormRenderer',
  component: FormRenderer,
} as Meta;

export const Default = Template.bind({});
Default.args = {
  schema: {
    ...baseSchema,
    fields: [
      {
        component: componentTypes.TEXT_FIELD,
        name: 'name',
        labelText: 'Name',
      },
      {
        component: componentTypes.PASSWORD,
        name: 'password',
        labelText: 'Password',
      },
      {
        component: componentTypes.COMBOBOX,
        name: 'combobox',
        labelText: 'Combobox',
        defaultItems: [
          { label: 'Red', value: 'red' },
          { label: 'Blue', value: 'blue' },
          { label: 'Green', value: 'green' },
        ],
        placeholder: 'Hello',
      },
      {
        component: componentTypes.COMBOBOX,
        name: 'multi-combobox',
        labelText: 'Multi Combobox',
        isMulti: true,
        defaultItems: [
          { label: 'Red', value: 'red' },
          { label: 'Blue', value: 'blue' },
          { label: 'Green', value: 'green' },
        ],
        placeholder: 'Hello',
      },
      {
        component: componentTypes.SELECT,
        name: 'select',
        labelText: 'Select',
        items: [
          { label: 'Red', value: 'red' },
          { label: 'Blue', value: 'blue' },
          { label: 'Green', value: 'green' },
        ],
      },
      {
        component: componentTypes.SELECT,
        name: 'multi-select',
        labelText: 'Multi Select',
        isMulti: true,
        items: [
          { label: 'Red', value: 'red' },
          { label: 'Blue', value: 'blue' },
          { label: 'Green', value: 'green' },
        ],
      },
      {
        component: componentTypes.CHECKBOX,
        name: 'single-checkbox',
        labelText: 'Checkbox',
        color: '#bada55',
      },
      {
        component: componentTypes.CHECKBOX,
        name: 'checkbox-group',
        labelText: 'Checkbox Group',
        options: [
          {
            labelText: 'Option 1',
            value: '1',
          },
          {
            labelText: 'Option 2',
            value: '2',
          },
          {
            labelText: 'Option 3',
            value: '3',
          },
        ],
      },
      {
        component: componentTypes.RADIO,
        name: 'radio-group',
        labelText: 'Radio Group',
        options: [
          {
            labelText: 'Option 1',
            value: '1',
          },
          {
            labelText: 'Option 2',
            value: '2',
          },
          {
            labelText: 'Option 3',
            value: '3',
          },
        ],
      },
      {
        component: componentTypes.DATE_PICKER,
        name: 'datepicker',
        labelText: 'Date Picker',
      },
      {
        component: componentTypes.TIME_PICKER,
        name: 'timepicker',
        labelText: 'Time Picker',
      },
      {
        component: componentTypes.TOGGLE,
        name: 'toggle',
        labelText: 'Toggle',
      },
      {
        component: componentTypes.TEXTAREA,
        name: 'textarea',
        labelText: 'Textarea',
      },
    ],
  },
};

export const FormGroups = Template.bind({});
FormGroups.args = {
  schema: {
    ...baseSchema,
    fields: [
      {
        component: componentTypes.FORM_GROUP,
        labelText: 'Formgroup 1',
        helperMessage: 'This is a form group',
        name: 'formgroup1',
        fields: [
          {
            component: componentTypes.TEXT_FIELD,
            labelText: 'First Name',
            name: 'first-name',
          },
          {
            component: componentTypes.TEXT_FIELD,
            labelText: 'Middle Initial',
            name: 'middle-initial',
          },
          {
            component: componentTypes.TEXT_FIELD,
            labelText: 'Last Name',
            name: 'last-name',
          },
        ],
      },

      {
        component: componentTypes.FORM_GROUP,
        labelText: 'How would you like to be notified',
        name: 'formgroup2',
        fields: [
          {
            component: componentTypes.CHECKBOX,
            name: 'consent',
            labelText: 'opt-in to notifications',
          },
          {
            component: componentTypes.TOGGLE,
            name: 'email',
            labelText: 'opt-in to emails',
            textPosition: 'right',
            condition: {
              when: 'consent',
              is: true,
            },
          },
          {
            component: componentTypes.TOGGLE,
            name: 'SMS',
            labelText: 'opt-in to text messages',
            textPosition: 'right',
            condition: {
              when: 'consent',
              is: true,
            },
          },
        ],
      },
    ],
  },
};

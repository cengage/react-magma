import React from 'react';
import {
  Schema,
  SchemaRenderer,
  SchemaRendererProps,
  componentTypes,
} from './SchemaRenderer';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import { templateTypes } from '../TemplateMapper';

const baseSchema: Schema = {
  title: 'Form Header',
  description: 'Some description for a form.',
  type: templateTypes.FORM,
  fields: [],
};

const Template: Story<SchemaRendererProps> = args => (
  <SchemaRenderer
    schema={args.schema}
    onSubmit={action('on-submit')}
    onCancel={action('on-cancel')}
  />
);

export default {
  title: 'SchemaRenderer',
  component: SchemaRenderer,
} as Meta;

export const Form = Template.bind({});
Form.args = {
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

export const Basic = Template.bind({});
Basic.args = {
  schema: {
    type: templateTypes.BASIC,
    fields: [
      {
        component: componentTypes.PARAGRAPH,
        name: 'paragraph-1',
        children: 'paragraph one.',
      },
      {
        component: componentTypes.PARAGRAPH,
        name: 'paragraph-2',
        children: 'paragraph two.',
      },
    ],
  },
};

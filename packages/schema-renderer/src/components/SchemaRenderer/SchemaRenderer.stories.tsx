import React from 'react';

import { StoryFn, Meta } from '@storybook/react/types-6-0';
import { Hyperlink, InputType } from 'react-magma-dom';
import { action } from 'storybook/actions';

import { Schema, SchemaRenderer, SchemaRendererProps } from './SchemaRenderer';
import { componentTypes } from '../ComponentMapper';
import { templateTypes } from '../TemplateMapper';

const baseSchema: Schema = {
  title: 'Form Header',
  description: 'Some description for a form.',
  type: templateTypes.FORM,
  fields: [],
};

const Template: StoryFn<SchemaRendererProps> = args => (
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

export const Form = {
  render: Template,

  args: {
    schema: {
      ...baseSchema,
      fields: [
        {
          component: componentTypes.INPUT,
          name: 'name',
          labelText: 'Name',
          type: InputType.text,
        },
        {
          component: componentTypes.PASSWORD_INPUT,
          name: 'password',
          labelText: 'Password',
          type: InputType.password,
        },
        {
          component: componentTypes.COMBOBOX,
          name: 'combobox',
          labelText: 'Combobox',
          options: [
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
          options: [
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
          options: [
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
          options: [
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
  },
};

export const FormGroups = {
  render: Template,

  args: {
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
              component: componentTypes.INPUT,
              labelText: 'First Name',
              name: 'first-name',
            },
            {
              component: componentTypes.INPUT,
              labelText: 'Middle Initial',
              name: 'middle-initial',
            },
            {
              component: componentTypes.INPUT,
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
  },
};

export const Basic = {
  render: Template,

  args: {
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
        {
          component: componentTypes.ALERT,
          name: 'ALERT',
          children: 'THIS IS AN ALERT',
        },
        {
          component: componentTypes.BANNER,
          name: 'BANNER',
          children: 'THIS IS A BANNER',
        },
        {
          component: componentTypes.HEADING,
          level: 1,
          name: 'HEADING',
          children: 'THIS IS A HEADING',
        },
        {
          component: componentTypes.HYPERLINK,
          name: 'HYPERLINK',
          to: 'https://react-magma.cengage.com',
          children: 'THIS IS A HYPERLINK',
        },
        {
          component: componentTypes.TOAST,
          name: 'TOAST',
          children: 'THIS IS A TOAST',
        },
        {
          component: componentTypes.PARAGRAPH,
          name: 'PARAGRAPH',
          children: 'THIS IS A PARAGRAPH',
        },
      ],
    },
  },
};

export const Modal = {
  render: Template,

  args: {
    schema: {
      type: templateTypes.BASIC,
      fields: [
        {
          component: componentTypes.TOGGLE,
          name: 'modal-toggle',
        },
        {
          component: componentTypes.MODAL,
          name: 'modal',
          heading: 'welcome to the modal',
          condition: {
            when: 'modal-toggle',
            is: true,
            then: { set: { isOpen: true } },
          },
          isOpen: true,
          fields: [
            {
              component: componentTypes.ALERT,
              name: 'ALERT',
              children: 'THIS IS AN ALERT',
            },
            {
              component: componentTypes.BANNER,
              name: 'BANNER',
              children: 'THIS IS A BANNER',
            },
            {
              component: componentTypes.HEADING,
              level: 1,
              name: 'HEADING',
              children: 'THIS IS A HEADING',
            },
            {
              component: componentTypes.HYPERLINK,
              name: 'HYPERLINK',
              to: 'https://react-magma.cengage.com',
              children: 'THIS IS A HYPERLINK',
            },
            {
              component: componentTypes.TOAST,
              name: 'TOAST',
              children: 'THIS IS A TOAST',
            },
            {
              component: componentTypes.PARAGRAPH,
              name: 'PARAGRAPH',
              children: (
                <>
                  THIS IS A PARAGRAPH <Hyperlink to="#">link</Hyperlink>
                </>
              ),
            },
          ],
        },
      ],
    },
  },
};

export const Array = {
  render: Template,

  args: {
    schema: {
      title: 'TODO List',
      type: templateTypes.FORM,
      description: 'A simple todo list. The penultimate test of any UI.',
      fields: [
        {
          component: componentTypes.FIELD_ARRAY,
          name: 'tasks',
          fieldKey: 'field_array',
          label: 'Things to do',
          description: 'What do we need to complete for the day?',
          fields: [
            {
              component: componentTypes.INPUT,
              name: 'task',
              label: 'Task',
              placeholder: 'Task',
              isRequired: true,
            },
          ],
        },
      ],
    },
  },
};

export function Example() {
  const [values, setValues] = React.useState();

  const schema: Schema = {
    title: 'File Uploader',
    description: 'An example file upload component.',
    type: templateTypes.FORM,
    fields: [
      {
        component: componentTypes.FIELD_ARRAY,
        name: 'tasks',
        fieldKey: 'field_array',
        label: 'Things to do',
        description: 'What do we need to complete for the day?',
        fields: [
          {
            component: componentTypes.FILE_UPLOAD,
            name: 'file-uploaded',
            labelText: 'file-uploaded',
          },
        ],
      },
    ],
  };

  return (
    <div>
      {values && <pre>{JSON.stringify(values, null, 2)}</pre>}
      <SchemaRenderer
        schema={schema}
        onSubmit={(values: any) => {
          setValues(values);
        }}
      />
    </div>
  );
}

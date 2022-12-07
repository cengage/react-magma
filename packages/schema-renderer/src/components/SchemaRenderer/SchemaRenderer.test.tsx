import { render, fireEvent, cleanup, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SchemaRenderer, Schema } from './SchemaRenderer';
import { componentTypes } from '../ComponentMapper';
import { templateTypes } from '../TemplateMapper';
import { validatorTypes } from '../ValidatorMapper';

describe('SchemaRenderer', () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  const handleCancel = jest.fn();
  const handleSubmit = jest.fn();

  const baseSchema: Schema = {
    title: 'title',
    description: 'description',
    type: templateTypes.FORM,
    fields: [],
  };

  describe('Basic Form', () => {
    const schema = {
      ...baseSchema,
      fields: [
        {
          component: componentTypes.INPUT,
          name: 'name',
          labelText: 'Name',
          isRequired: true,
        },
      ],
    };

    it('should render header and description', () => {
      const { getByText } = render(
        <SchemaRenderer
          schema={schema}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      );

      expect(getByText('title')).toBeVisible();
      expect(getByText('description')).toBeVisible();
      expect(getByText('Cancel').parentElement).toBeDisabled();
    });

    it('should trigger cancel event when user clicks the Cancel button', () => {
      const { getByText, getByLabelText } = render(
        <SchemaRenderer
          schema={schema}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      );

      act(() => {
        fireEvent.change(getByLabelText('Name'), {
          target: { value: 'my name' },
        });
      });

      expect(getByText('Cancel').parentElement).not.toBeDisabled();

      act(() => {
        userEvent.click(getByText('Cancel'));
        expect(handleCancel).toHaveBeenCalled();
      });
    });

    it('should trigger submit with the data', () => {
      const { getByLabelText, getByText } = render(
        <SchemaRenderer
          schema={schema}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      );

      act(() => {
        fireEvent.change(getByLabelText('Name'), {
          target: { value: 'my name' },
        });
        fireEvent.click(getByText('Submit'));
      });

      expect(handleSubmit).toHaveBeenCalledWith(
        { name: 'my name' },
        expect.any(Object),
        expect.any(Function)
      );
    });

    it('should render custom label for cancel and submit button', () => {
      const customLabelsSchema = {
        ...schema,
        submitLabel: 'Custom Submit Label',
        cancelLabel: 'Custom Cancel Label',
      };
      const { getByText } = render(
        <SchemaRenderer
          schema={customLabelsSchema}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      );
      expect(getByText('Custom Submit Label')).toBeVisible();
      expect(getByText('Custom Cancel Label')).toBeVisible();
    });
  });

  describe('Checkbox', () => {
    const schema = {
      ...baseSchema,
      fields: [
        {
          component: componentTypes.CHECKBOX,
          name: 'checkbox',
          label: 'Checkbox',
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
          required: true,
          validate: [
            {
              type: validatorTypes.REQUIRED,
            },
          ],
        },
      ],
    };
    it('should render checkboxes', () => {
      const { getByLabelText, getByText } = render(
        <SchemaRenderer
          schema={schema}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      );

      fireEvent.click(getByLabelText('Option 1'));
      fireEvent.click(getByLabelText('Option 3'));
      fireEvent.click(getByText('Submit'));

      expect(handleSubmit).toHaveBeenCalledWith(
        { checkbox: ['1', '3'] },
        expect.any(Object),
        expect.any(Function)
      );
    });

    it('should trigger validation', () => {
      const { getByText } = render(
        <SchemaRenderer
          schema={schema}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      );
      fireEvent.click(getByText('Submit'));
      expect(getByText('Required')).toBeVisible();
    });
  });

  describe('Custom', () => {
    it('renders custom component', () => {
      const CustomComponentSimple = ({ labelText }: any) => <>{labelText}</>;
      const schema = {
        ...baseSchema,
        fields: [
          {
            component: componentTypes.CUSTOM,
            name: 'custom',
            labelText: 'This is the content of custom component',
            customComponent: CustomComponentSimple,
          },
        ],
      };

      const { getByText } = render(
        <SchemaRenderer
          schema={schema}
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
        />
      );
      expect(
        getByText('This is the content of custom component')
      ).toBeVisible();
    });

    it('supports interaction', () => {
      const CustomComponentComplex = ({ input }: any) => (
        <input
          type="text"
          onChange={input.onChange}
          value={input.value}
          data-testid="input"
        />
      );

      const handleSubmit = jest.fn();
      const schema = {
        ...baseSchema,
        fields: [
          {
            component: componentTypes.CUSTOM,
            name: 'text',
            customComponent: CustomComponentComplex,
          },
        ],
      };

      const { getByTestId, getByText } = render(
        <SchemaRenderer
          schema={schema}
          onSubmit={handleSubmit}
          onCancel={jest.fn()}
          initialValues={{
            text: 'initial input',
          }}
        />
      );

      expect(getByTestId('input')).toHaveValue('initial input');

      act(() => {
        fireEvent.change(getByTestId('input'), {
          target: { value: 'updated input' },
        });
        fireEvent.click(getByText('Submit'));
      });

      expect(handleSubmit).toHaveBeenCalledWith(
        {
          text: 'updated input',
        },
        expect.any(Object),
        expect.any(Function)
      );
    });
  });

  describe('Toggle', () => {
    const schema = {
      ...baseSchema,
      fields: [
        {
          component: componentTypes.TOGGLE,
          name: 'toggle',
          labelText: 'Toggle',
          initialValue: false,
        },
      ],
    };
    it('should render Toggle', async () => {
      const { getByLabelText, getByText } = render(
        <SchemaRenderer
          schema={schema}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      );
      expect(getByLabelText('Toggle')).toBeInTheDocument();
      fireEvent.click(getByText('Submit'));
      expect(handleSubmit).toHaveBeenCalledWith(
        { toggle: false },
        expect.any(Object),
        expect.any(Function)
      );
    });
  });

  describe('Radio', () => {
    const schema = {
      ...baseSchema,
      fields: [
        {
          component: componentTypes.RADIO,
          name: 'radio',
          labelText: 'Radio',
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
          required: true,
          validate: [
            {
              type: validatorTypes.REQUIRED,
            },
          ],
        },
      ],
    };
    it('should render radio buttons', () => {
      const { getByLabelText, getByText, getAllByRole } = render(
        <SchemaRenderer
          schema={schema}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      );

      expect(getByText('Radio')).toBeVisible();
      expect(getAllByRole('radio')).toHaveLength(3);

      fireEvent.click(getByLabelText('Option 3'));
      fireEvent.click(getByText('Submit'));

      expect(handleSubmit).toHaveBeenCalledWith(
        { radio: '3' },
        expect.any(Object),
        expect.any(Function)
      );
    });

    it('should trigger validation', () => {
      const { getByText } = render(
        <SchemaRenderer
          schema={schema}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      );
      fireEvent.click(getByText('Submit'));
      expect(getByText('Required')).toBeVisible();
    });
  });

  describe('FieldArray', () => {
    const schema = {
      ...baseSchema,
      fields: [
        {
          component: componentTypes.FIELD_ARRAY,
          description: 'This is a form array',
          name: 'fieldArray',
          minItems: 1,
          maxItems: 3,
          noItemsMessage: 'There are currently no items',
          defaultItem: {
            key: 'key',
            value: 'value',
          },
          validate: [
            {
              type: validatorTypes.MIN_ITEMS,
              threshold: 1,
            },
            {
              type: validatorTypes.REQUIRED,
            },
          ],
          fields: [
            {
              component: componentTypes.INPUT,
              name: 'key',
              labelText: 'Key',
              validate: [
                {
                  type: validatorTypes.REQUIRED,
                },
              ],
            },
            {
              component: componentTypes.INPUT,
              name: 'value',
              labelText: 'Value',
              validate: [
                {
                  type: validatorTypes.REQUIRED,
                },
              ],
            },
          ],
        },
      ],
    };

    it('should render FieldArray', () => {
      const { getByText, getAllByRole, getByLabelText } = render(
        <SchemaRenderer
          schema={schema}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      );

      expect(getByText('This is a form array')).toBeVisible();
      expect(getByText('There are currently no items')).toBeVisible();

      act(() => {
        fireEvent.click(getAllByRole('button')[0]);
      });

      expect(getByText('Key')).toBeVisible();
      expect(getByText('Value')).toBeVisible();
      // expect(queryByText('There are currently no items')).not.toBeInTheDocument;

      act(() => {
        fireEvent.change(getByLabelText('Key'), { target: { value: 'key' } });
        fireEvent.change(getByLabelText('Value'), {
          target: { value: 'value' },
        });
        fireEvent.click(getByText('Submit'));
      });

      expect(handleSubmit).toHaveBeenCalledWith(
        {
          fieldArray: [
            {
              key: 'key',
              value: 'value',
            },
          ],
        },
        expect.any(Object),
        expect.any(Function)
      );
    });
  });
});

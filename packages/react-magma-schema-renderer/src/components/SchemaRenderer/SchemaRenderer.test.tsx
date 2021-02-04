import React from 'react';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import { SchemaRenderer, componentTypes } from './SchemaRenderer';
import { templateTypes } from '../TemplateMapper';

describe('SchemaRenderer', () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  const handleCancel = jest.fn();
  const handleSubmit = jest.fn();

  const baseSchema = {
    title: 'title',
    description: 'description',
    type: templateTypes.FORM,
  };

  describe('Form basic', () => {
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
      expect(getByText('Cancel')).toBeDisabled();
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

      expect(getByText('Cancel')).not.toBeDisabled();

      act(() => {
        fireEvent.click(getByText('Cancel'));
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
});

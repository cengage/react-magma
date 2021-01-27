import React from 'react';
import {
  Button,
  ButtonColor,
  ButtonVariant,
  ButtonType,
  Form,
} from 'react-magma-dom';

import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import useFormApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-form-api';

export interface FormTemplateProps {
  formFields: any;
  schema: any;
  cancelLabel?: string;
  submitLabel?: string;
}

export const FormTemplate: React.FunctionComponent<FormTemplateProps> = ({
  formFields,
  schema: { cancelLabel, submitLabel },
  schema,
}) => {
  const { handleSubmit, onCancel, getState } = useFormApi();
  const { submitting, pristine } = getState();

  const actions = (
    <>
      <Button
        disabled={pristine}
        variant={ButtonVariant.link}
        onClick={onCancel}
      >
        {cancelLabel || 'Cancel'}
      </Button>
      <Button
        disabled={submitting}
        type={ButtonType.submit}
        color={ButtonColor.primary}
      >
        {submitLabel || 'Submit'}
      </Button>
    </>
  );

  const actionsVisible = React.useMemo(() => {
    if (
      schema.fields &&
      schema.fields.length > 0 &&
      schema.fields[0].component === componentTypes.WIZARD
    ) {
      return false;
    }
    return true;
  }, []);

  return (
    <Form
      onSubmit={handleSubmit}
      title={schema.title}
      description={schema.description}
      actions={actionsVisible ? actions : undefined}
    >
      {formFields}
    </Form>
  );
};

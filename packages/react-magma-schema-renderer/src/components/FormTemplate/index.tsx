import React from 'react';
import {
  Button,
  ButtonColor,
  ButtonVariant,
  ButtonType,
  Form,
} from 'react-magma-dom';

import { componentTypes } from '../ComponentMapper';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';

export interface FormTemplateProps {
  formFields: any;
  schema: any;
}

export const FormTemplate = ({
  formFields,
  schema: { cancelLabel, submitLabel },
  schema,
}: FormTemplateProps) => {
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
      header={schema.title}
      description={schema.description}
      actions={actionsVisible ? actions : undefined}
    >
      {formFields}
    </Form>
  );
};

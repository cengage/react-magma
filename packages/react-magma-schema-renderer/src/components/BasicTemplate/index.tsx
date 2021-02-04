import React from 'react';

import { Heading } from 'react-magma-dom';
import { FormTemplateRenderProps } from '@data-driven-forms/react-form-renderer/dist/cjs/form-template-render-props';

export const BasicTemplate = ({
  formFields,
  schema,
}: FormTemplateRenderProps) => {
  return (
    <div>
      {schema.title && <Heading level={1}>{schema.title}</Heading>}
      {formFields}
    </div>
  );
};

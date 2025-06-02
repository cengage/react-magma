import React from 'react';

import { FormTemplateRenderProps } from '@data-driven-forms/react-form-renderer';

export const BasicTemplate = ({ formFields }: FormTemplateRenderProps) => {
  return (
    <div>
      {formFields.map((Field, index) => (
        <Field key={index} />
      ))}
    </div>
  );
};

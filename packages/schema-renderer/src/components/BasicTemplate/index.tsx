import React from 'react';

import { FormTemplateRenderProps } from '@data-driven-forms/react-form-renderer';

export const BasicTemplate = ({ formFields }: FormTemplateRenderProps) => {
  return (
    <div>
      {formFields.map((field, index) =>
        React.isValidElement(field)
          ? React.cloneElement(field, { key: index })
          : null
      )}
    </div>
  );
};

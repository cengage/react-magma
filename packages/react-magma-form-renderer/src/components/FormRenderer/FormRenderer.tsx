import React, { FunctionComponent, ComponentType } from 'react';
import FormRender from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import validatorTypes from '@data-driven-forms/react-form-renderer/dist/cjs/validator-types';
import { FormTemplate } from '../FormTemplate';
import { componentMapper, componentTypes } from '../ComponentMapper';

export interface FormRendererProps {
  schema: any;
  initialValues?: any;
  onSubmit: (values: any) => void;
  onCancel?: () => void;
  customComponentWrapper?: {
    [componentType: string]: ComponentType;
  };
}

export const FormRenderer: FunctionComponent<FormRendererProps> = ({
  schema,
  onSubmit,
  onCancel,
  initialValues,
  customComponentWrapper,
}) => {
  return (
    <FormRender
      componentMapper={{ ...componentMapper, ...customComponentWrapper }}
      FormTemplate={FormTemplate}
      schema={schema}
      onSubmit={onSubmit}
      onCancel={onCancel}
      initialValues={initialValues}
    />
  );
};

export { componentTypes, validatorTypes };

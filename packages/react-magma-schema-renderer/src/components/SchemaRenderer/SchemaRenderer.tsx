import React, { FunctionComponent } from 'react';
import FormRender from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import { default as DataDrivenFormSchema } from '@data-driven-forms/react-form-renderer/dist/cjs/schema';
import validatorTypes from '@data-driven-forms/react-form-renderer/dist/cjs/validator-types';
import { componentMapper, componentTypes } from '../ComponentMapper';
import { templateMapper } from '../TemplateMapper';

export interface Schema extends DataDrivenFormSchema {
  type: string;
}

export interface SchemaRendererProps {
  schema: Schema;
  initialValues?: any;
  onSubmit: (values: any) => void;
  onCancel?: () => void;
  customComponentWrapper?: {
    [componentType: string]: React.ComponentType;
  };
}

export const SchemaRenderer: FunctionComponent<SchemaRendererProps> = ({
  schema,
  onSubmit,
  onCancel,
  initialValues,
  customComponentWrapper,
}) => {
  return (
    <FormRender
      componentMapper={{ ...componentMapper, ...customComponentWrapper }}
      FormTemplate={templateMapper[schema.type]}
      schema={schema}
      onSubmit={onSubmit}
      onCancel={onCancel}
      initialValues={initialValues}
    />
  );
};

export { componentTypes, validatorTypes };

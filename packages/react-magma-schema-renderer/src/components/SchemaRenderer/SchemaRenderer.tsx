import React, { FunctionComponent } from 'react';
import FormRender from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import { default as DataDrivenFormSchema } from '@data-driven-forms/react-form-renderer/dist/cjs/schema';
import { componentMapper } from '../ComponentMapper';
import { templateMapper } from '../TemplateMapper';
import { validatorMapper, ValidatorMapper } from '../ValidatorMapper';

export interface Schema extends DataDrivenFormSchema {
  type: string;
}

export interface SchemaRendererProps {
  schema: Schema;
  initialValues?: any;
  onSubmit: (values: any) => void;
  onCancel?: () => void;
  customComponentMapper?: {
    [componentType: string]: React.ComponentType;
  };
  customValidatorMapper?: ValidatorMapper;
}

export const SchemaRenderer: FunctionComponent<SchemaRendererProps> = ({
  schema,
  onSubmit,
  onCancel,
  initialValues,
  customComponentMapper,
  customValidatorMapper,
}) => {
  return (
    <FormRender
      componentMapper={{ ...componentMapper, ...customComponentMapper }}
      validatorMapper={customValidatorMapper}
      FormTemplate={templateMapper[schema.type]}
      schema={schema}
      onSubmit={onSubmit}
      onCancel={onCancel}
      initialValues={initialValues}
    />
  );
};

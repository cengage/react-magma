import React, { FunctionComponent } from 'react';
import FormRender, {FormRendererProps} from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import { default as DataDrivenFormSchema } from '@data-driven-forms/react-form-renderer/dist/cjs/schema';
import { componentMapper, componentTypes } from '../ComponentMapper';
import { templateMapper } from '../TemplateMapper';
import { ValidatorMapper } from '../ValidatorMapper';

export interface Schema extends DataDrivenFormSchema {
  type: string;
}

export interface SchemaRendererProps extends FormRendererProps {
  schema: Schema;
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
  customComponentMapper=componentMapper,
  customValidatorMapper,
}) => {
  return (
    <FormRender
      componentMapper={customComponentMapper }
      validatorMapper={customValidatorMapper}
      FormTemplate={templateMapper[schema.type]}
      schema={schema}
      onSubmit={onSubmit}
      onCancel={onCancel}
      initialValues={initialValues}
    />
  );
};

export { componentTypes }
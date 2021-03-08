import React, { FunctionComponent } from 'react';
import FormRender, {FormRendererProps} from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import { default as DataDrivenFormSchema } from '@data-driven-forms/react-form-renderer/dist/cjs/schema';
import { componentMapper, ComponentMapper } from '../ComponentMapper';
import { templateMapper } from '../TemplateMapper';
import { ValidatorMapper } from '../ValidatorMapper';

export interface Schema extends DataDrivenFormSchema {
  type: string;
}

export interface SchemaRendererProps extends FormRendererProps {
  schema: Schema;
  customComponentMapper?: ComponentMapper;
  customValidatorMapper?: ValidatorMapper;
}

export const SchemaRenderer: FunctionComponent<SchemaRendererProps> = ({
  schema,
  customComponentMapper=componentMapper,
  customValidatorMapper,
  ...rest
}) => {
  return (
    <FormRender
      {...rest}
      componentMapper={customComponentMapper }
      validatorMapper={customValidatorMapper}
      FormTemplate={templateMapper[schema.type]}
      schema={schema}      
    />
  );
};

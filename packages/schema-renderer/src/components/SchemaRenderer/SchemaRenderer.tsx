import { FormRenderer, FormRendererProps, Schema as DataDrivenFormSchema } from '@data-driven-forms/react-form-renderer';
import { componentMapper, ComponentMapper } from '../ComponentMapper';
import { templateMapper } from '../TemplateMapper';
import { ValidatorMapper } from '../ValidatorMapper';

export interface Schema extends DataDrivenFormSchema {
  type: string;
}

export interface SchemaRendererProps
  extends Omit<FormRendererProps, 'FormTemplate' | 'componentMapper'> {
  schema: Schema;
  customComponentMapper?: ComponentMapper;
  customValidatorMapper?: ValidatorMapper;
}

export const SchemaRenderer = ({
  schema,
  customComponentMapper = componentMapper,
  customValidatorMapper,
  ...rest
}: SchemaRendererProps) => {
  return (
    <FormRenderer
      onCancel={() => {}}
      onSubmit={() => {}}
      {...rest}
      componentMapper={customComponentMapper}
      validatorMapper={customValidatorMapper}
      FormTemplate={templateMapper[schema.type]}
      schema={schema}
    />
  );
};

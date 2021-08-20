import { FormTemplateRenderProps } from '@data-driven-forms/react-form-renderer';

export const BasicTemplate = ({
  formFields,
}: FormTemplateRenderProps) => {
  return (
    <div>
      {formFields}
    </div>
  );
};

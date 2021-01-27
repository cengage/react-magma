import React from 'react';

import { FormTemplateRenderProps } from '@data-driven-forms/react-form-renderer/dist/cjs/form-template-render-props';

export type BasicTemplateProps =
  | React.ComponentType<FormTemplateRenderProps>
  | React.FunctionComponent<FormTemplateRenderProps>;

export const BasicTemplate: BasicTemplateProps = ({ formFields }) => {
  return <div>{formFields}</div>;
};

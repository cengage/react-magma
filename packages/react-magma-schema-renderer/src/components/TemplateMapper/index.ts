import * as React from 'react';
import { BasicTemplate } from '../BasicTemplate';
import { FormTemplate } from '../FormTemplate';

import { FormTemplateRenderProps } from '@data-driven-forms/react-form-renderer/dist/cjs/form-template-render-props';

export type TemplateProps =
  | React.ComponentType<FormTemplateRenderProps>
  | React.FunctionComponent<FormTemplateRenderProps>;

export interface TemplateMapper {
  [key: string]: TemplateProps;
}

export const templateTypes = {
  BASIC: 'BASIC',
  FORM: 'FORM',
};

export const templateMapper: TemplateMapper = {
  [templateTypes.BASIC]: BasicTemplate,
  [templateTypes.FORM]: FormTemplate,
};

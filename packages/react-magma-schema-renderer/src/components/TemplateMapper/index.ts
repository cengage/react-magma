import * as React from 'react';
import { BasicTemplate } from '../BasicTemplate';
import { FormTemplate } from '../FormTemplate';

import { FormTemplateRenderProps } from '@data-driven-forms/react-form-renderer/dist/cjs/form-template-render-props';
export interface TemplateMapper {
  [key: string]: (props: FormTemplateRenderProps) => React.ReactElement;
}

export enum templateTypes {
  BASIC = 'BASIC',
  FORM = 'FORM',
}

export const templateMapper: TemplateMapper = {
  [templateTypes.BASIC]: BasicTemplate,
  [templateTypes.FORM]: FormTemplate,
};

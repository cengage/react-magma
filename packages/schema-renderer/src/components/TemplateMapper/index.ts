import * as React from 'react';

import { FormTemplateRenderProps } from '@data-driven-forms/react-form-renderer';

import { BasicTemplate } from '../BasicTemplate';
import { FormTemplate } from '../FormTemplate';

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

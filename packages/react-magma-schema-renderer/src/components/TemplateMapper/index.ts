import * as React from 'react';
import { BasicTemplate } from '../BasicTemplate';
import { FormTemplate } from '../FormTemplate';

interface AnyObject {
  [key: string]: any;
}

interface ExtendedMapperComponent extends AnyObject {
  component: React.ComponentType | React.FunctionComponent | React.ElementType;
}

export interface TemplateMapper {
  [key: string]:
    | React.ComponentType
    | React.FunctionComponent
    | React.ElementType
    | ExtendedMapperComponent;
}

export const templateTypes = {
  BASIC: 'BASIC',
  FORM: 'FORM',
};

export const templateMapper: TemplateMapper = {
  [templateTypes.BASIC]: BasicTemplate,
  [templateTypes.FORM]: FormTemplate,
};

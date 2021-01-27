import React from 'react';

export interface BasicTemplateProps {
  formFields: any;
  schema: any;
}

export const BasicTemplate: React.FunctionComponent<BasicTemplateProps> = ({
  formFields,
}) => {
  return <div>{formFields}</div>;
};

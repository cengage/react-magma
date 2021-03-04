import React from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
import FormSpy from "@data-driven-forms/react-form-renderer/dist/cjs/form-spy";

export const Review = (props: any) => {
  const { template:Template, ...rest } = useFieldApi(props);
  return (<FormSpy {...rest}>
    {props => {
      return <Template {...props} />
    }}
  </FormSpy>)
};

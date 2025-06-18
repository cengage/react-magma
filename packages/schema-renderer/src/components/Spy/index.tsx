import React from 'react';

import { FormSpy } from '@data-driven-forms/react-form-renderer';
import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';

export const Spy = (props: any) => {
  const { template: Template, ...rest } = useFieldApi(props);

  return (
    <FormSpy {...rest}>
      {props => {
        return <Template {...props} />;
      }}
    </FormSpy>
  );
};

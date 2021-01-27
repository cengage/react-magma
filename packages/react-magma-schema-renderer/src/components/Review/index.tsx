import React from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
import useFormApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-form-api';

export const Review = (props: any) => {
  const { Template } = useFieldApi(props);
  const { getState } = useFormApi();

  return <Template data={getState().values} />;
};

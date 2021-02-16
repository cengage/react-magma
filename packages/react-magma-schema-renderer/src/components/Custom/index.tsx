import * as React from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
import useFormApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-form-api';

const CustomMapping = (props: any) => {
  const { CustomComponent, ...rest } = useFieldApi(props);
  const { getState } = useFormApi();

  return <CustomComponent {...rest} data={getState().values} />;
};

export const Custom = React.memo(CustomMapping);

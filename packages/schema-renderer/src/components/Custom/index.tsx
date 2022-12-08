import { memo } from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';

const CustomMapping = (props: any) => {
  const { customComponent: CustomComponent, ...rest } = useFieldApi(props);
  const { getState } = useFormApi();

  return <CustomComponent {...rest} data={getState().values} />;
};

export const Custom = memo(CustomMapping);

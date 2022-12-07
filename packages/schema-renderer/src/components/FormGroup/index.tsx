import { useMemo, memo } from 'react';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import {
  FormGroup as MagmaFormGroup,
  FormGroupProps as MagmaFormGroupProps,
} from 'react-magma-dom';

export interface FormGroupProps extends MagmaFormGroupProps {
  fields: any;
  showError?: boolean;
}

const FormGroupMapping = (props: FormGroupProps) => {
  const { renderForm } = useFormApi();

  const subfields = useMemo(() => {
    return props.fields.map((field: any) => ({
      ...field,
      showError: props.showError,
    }));
  }, [props.fields, props.showError]);

  return <MagmaFormGroup {...props}>{renderForm(subfields)}</MagmaFormGroup>;
};

export const FormGroup = memo(FormGroupMapping);

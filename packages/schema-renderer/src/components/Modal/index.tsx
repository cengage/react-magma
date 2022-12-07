import { useMemo, memo } from 'react';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';

import {
  Modal as MagmaModal,
  ModalProps as MagmaModalProps,
} from 'react-magma-dom';

export interface ModalProps extends MagmaModalProps {
  fields: any;
  showError?: boolean;
}

const ModalMapping = (props: ModalProps) => {
  const { renderForm } = useFormApi();

  const subfields = useMemo(() => {
    return props.fields.map((field: any) => ({
      ...field,
      showError: props.showError,
    }));
  }, [props.fields, props.showError]);

  return <MagmaModal {...props}>{renderForm(subfields)}</MagmaModal>;
};

export const Modal = memo(ModalMapping);

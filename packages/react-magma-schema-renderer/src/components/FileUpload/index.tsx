import React from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
// import { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer';
import { v4 as uuidv4 } from 'uuid';
import { FileUpload as FileUploadComponent } from './FileUpload';


const FileUploadMapping = (props: any) => {
  const {
    input,
    validateOnMount,
    showError,
    meta: { error, submitFailed },
    ...rest
  } = useFieldApi(props);
  const id = input.name || uuidv4();
  const errorMessage =
    ((validateOnMount || submitFailed || showError) && error) || '';

  return (
    <FileUploadComponent
      {...input}
      id={id}
      errorMessage={errorMessage}
      {...rest}
    />
  );
};

export const FileUpload = React.memo(FileUploadMapping);

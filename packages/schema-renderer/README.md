# React Magma Schema Renderer

** THIS PACKAGE HAS BEEN DEPRECATED **

````
import * as React from 'react';
import { SchemaRenderer, templateTypes, componentTypes, Schema } from '@react-magma/react-schema-renderer';

export function Builder() {
  const [values, setValues] = React.useState();

  const schema: Schema = {
    title: 'File Uploader',
    description: 'An example file upload component.',
    type: templateTypes.FORM,
    fields: [
      {
        component: componentTypes.INPUT,
        name: 'Full Name',
        labelText: 'Full name',
      },
      {
        component: componentTypes.FILE_UPLOAD,
        name: 'file-uploaded',
        labelText: 'file-uploaded',
      },
    ],
  };

  return (
    <div>
      {values &&  <pre>{JSON.stringify(values, null, 2)}</pre>}
      <SchemaRenderer schema={schema}
        onSubmit={(values: any) => {
          setValues(values)
      }} />
    </div>
  );
}```
````

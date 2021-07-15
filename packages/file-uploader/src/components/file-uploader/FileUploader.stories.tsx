import React from 'react';
import { FileUploader } from './FileUploader';
// import { fakeFileProcessor } from '../../processors/fakeFileProcessor';
import { csvFileProcessor } from '../../processors/csvFileProcessor';
// import { base64FileProcessor } from '../../processors/base64FileProcessor';

export default {
  component: FileUploader,
  title: 'FileUploader',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export const Default = () => {
  return <FileUploader 
      thumbnails={false}
      accept={['.png', '.jpg', '.svg']}
      maxFiles={5}
      maxSize={1024*1024}
      sendFiles={true}
      onSendFile={csvFileProcessor}
      labelText="Upload files"
      helperMessage="Only PNG, JPG, and SVG files with a max size of 1MB"
    />
};

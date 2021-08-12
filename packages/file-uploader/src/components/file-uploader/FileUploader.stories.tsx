import React from 'react';
import { FileUploader, FileUploaderProps, OnSendFileProps } from './FileUploader';
import { Input } from 'react-magma-dom';

const onSendFile = (props: OnSendFileProps) => {
  const {onProgress, onError, onFinish, file} = props;
  let percent: number = 1;

  const interval = setInterval(() => {
    percent++;
    onProgress && onProgress({percent, file})

    if(percent >= 100) {
      clearInterval(interval);
      onFinish && onFinish({file})
    }

    if(Math.random() * 100 > 99.5) {
      clearInterval(interval)
      onError && onError({errors:[{code: 'upload-err', message: "The destination server has returned an error."}], file})
    }
  }, 100 * Math.random())
};

export default {
  component: FileUploader,
  title: 'FileUploader',
  argTypes: {
    noDrag: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    sendFiles: {
      control: {
        type: 'boolean',
      },
      defaultValue: true,
    },
    thumbnails: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
};

export const Default = (args: FileUploaderProps) => {
  return <div style={{background: args.isInverse ? '#003865' : '#fff', padding: '50px'}} >
    <Input isInverse={args.isInverse} labelText="Hello"/>
    <FileUploader 
      {...args}
      accept={['.png', '.jpg', '.svg']}
      maxFiles={5}
      maxSize={1024*1024}
      onSendFile={onSendFile}
      labelText="Upload files"
      helperMessage="Only PNG, JPG, and SVG files with a max size of 1MB"
    />
  </div>
};

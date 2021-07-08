import React from 'react';
import { FileUploader } from './FileUploader';
import { FilePreview } from './FilePreview';
import { Modal } from 'react-magma-dom';

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
  // const [files, setFiles] = React.useState([])
  return <FileUploader 
      // name="files"
      thumbnails={true}
      accept={['.png', '.jpg', '.svg']}
      maxFiles={5}
      maxSize={1024*1024}
      onSendFiles={() => {}}
      labelText="Upload files"
      helperMessage="Only PNG, JPG, and SVG files with a max size of 10MB"
      // onPreviewClick={(file) => console.log(file.preview)}
      // onChange={console.log}
    />
};

export const ModalPreview = () => {
  const [file, setFile] = React.useState<FilePreview>()
  
  return <div>
    <Modal isOpen={!!file} onClose={() => setFile(null)}>
      {file && <img src={file.preview}/>}
    </Modal>
    <FileUploader 
      name="files"
      thumbnails={true}
      accept={['image/*']}
      onSendFiles={() => {}}
      onPreviewClick={setFile}
      onChange={console.log}
    />
  </div>
};


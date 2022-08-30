import { FileWithPath } from 'react-dropzone';

export interface FileError {
  header?: string;
  message: string;
  code:
    | 'file-too-large'
    | 'file-too-small'
    | 'too-many-files'
    | 'file-invalid-type'
    | string;
}
export interface FilePreview extends FileWithPath {
  preview?: string;
  errors?: FileError[];
  processor?: {
    percent?: string;
    status?: string;
    error?: string;
  };
}

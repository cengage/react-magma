import { FilePreview, FileError } from './FilePreview';
export interface FileProcessorProps {
  onProgress?: ({}:{percent: number, file: FilePreview}) => void;
  onError?: ({}:{errors: FileError[], file: FilePreview}) => void;
  onFinish?: ({}:{file: FilePreview}) => void;
  file: FilePreview,
}
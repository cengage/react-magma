import { FileProcessorProps } from '../components/file-uploader/FileProcessor';

export const base64FileProcessor = (props: FileProcessorProps) => {
  const {onError, onProgress, onFinish, file} = props;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      onFinish && onFinish({file})
    };
    reader.onprogress = (event: ProgressEvent<FileReader>) => {
        const percent: number = Math.floor(event.loaded / event.total * 100)
        onProgress && onProgress({percent, file})
    }
    reader.onerror = () => {
      onError && onError({errors: [{code: 'failed', message: 'failure'}], file});
    };
};
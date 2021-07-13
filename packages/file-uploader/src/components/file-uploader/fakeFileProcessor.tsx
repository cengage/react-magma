import { FileProcessorProps } from './FileProcessor';

export const fakeFileProcessor = (props: FileProcessorProps) => {
  const {onProgress, onError, onFinish, file} = props;
  let percent: number = 1;

  const interval = setInterval(() => {
    percent++;
    onProgress && onProgress({percent, file})

    if(percent >= 100) {
      clearInterval(interval);
      onFinish && onFinish({file})
    }

    if(Math.random() * 100 > 99) {
      clearInterval(interval)
      onError && onError({errors:[{code: 'upload-err', message: "The destination server has returned an error."}], file})
    }
  }, 100 * Math.random())
};
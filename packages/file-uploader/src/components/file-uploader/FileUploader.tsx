import * as React from 'react';
import { useDropzone, DropzoneOptions, DropzoneRootProps, FileRejection } from 'react-dropzone';
import {
  Button,
  ButtonColor,
  Flex,
  FlexProps,
  FlexBehavior, 
  FormFieldContainer,
  FormFieldContainerBaseProps,
  styled,
  ThemeContext,
  ThemeInterface,
  useGenerateId,
} from 'react-magma-dom';

import { CloudUploadIcon } from 'react-magma-icons';

// import { InverseContext, useIsInverse } from '../../inverse';
// import { I18nContext } from '../../i18n';

import { FileProcessorProps} from './FileProcessor';
import { Preview } from './Preview';
// import { formatFileSize } from './utils'
import { FilePreview, FileError } from './FilePreview';

type DragState = 'error' | 'dragAccept' | 'dragReject' | 'dragActive' | 'default';
export interface FileUploaderProps extends Omit<FormFieldContainerBaseProps, 'fieldId' | 'errorMessage'> {
  dropzoneOptions?: Partial<Omit<DropzoneOptions, 'onDrop'>>;
  sendFiles?: boolean;
  onSendFile?: (props: FileProcessorProps) => void;
  helperMessage?: string;
  thumbnails?: boolean;
  showAcceptHelper?: boolean;
  maxFiles?: number;
  multiple?: boolean;
  maxSize?: number;
  minSize?: number;
  accept?: string | string[];
  id?: string;
  testId?: string;
}

const Container = styled(Flex)<DropzoneRootProps & FlexProps & {dragState?: DragState}>`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 4px;
  border-color: ${({dragState='default', theme}) => 
    dragState === 'dragReject' || dragState === 'error' ? theme.colors.danger : 
    dragState === 'dragActive' ? theme.colors.primary : 
    dragState === 'dragAccept' ? theme.colors.success : 
    theme.colors.neutral06};
  border-style: ${({dragState='default'}) => dragState === 'error' ? 'solid' : 'dashed'};
  background-color: ${({theme}) => theme.colors.neutral07};
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

const Wrapper = styled.div`
  margin: 0px;
  color: ${({theme}) => theme.colors.neutral03};
  padding: ${({theme}) => theme.spaceScale.spacing01};
`
export const FileUploader = React.forwardRef<HTMLInputElement, FileUploaderProps>((props, ref) => {
  const {
    dropzoneOptions={
      multiple: true,
    },
    sendFiles = false,
    thumbnails = true,
    showAcceptHelper = true,
    helperMessage,
    containerStyle,
    id: defaultId,
    isLabelVisuallyHidden,
    isInverse,
    inputSize,
    labelStyle,
    labelText,
    onSendFile,
    maxFiles,
    multiple=true,
    maxSize,
    minSize,
    accept,
    testId,
    ...rest
  } = props;

  const [files, setFiles] = React.useState<FilePreview[]>([])
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const theme:ThemeInterface = React.useContext(ThemeContext);
  const id = useGenerateId(defaultId);
  
  const onDrop = React.useCallback((acceptedFiles: FilePreview[], rejectedFiles: FileRejection[]) => {
    setFiles((files: FilePreview[]) => [
        ...files,
        ...acceptedFiles.map((file: File) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
        ...rejectedFiles.map(({file, errors}:{file: File, errors: FileError[]}) =>
          Object.assign(file, {
            errors,
          }),
        ),
      ]
    )
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    noClick: true,
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => {
      dropzoneOptions.onDragOver && dropzoneOptions.onDragOver(event)
    },
    onDragEnter: (event: React.DragEvent<HTMLDivElement>) => {
      dropzoneOptions.onDragEnter && dropzoneOptions.onDragEnter(event)
    },
    onDragLeave: (event: React.DragEvent<HTMLDivElement>) => {
      dropzoneOptions.onDragLeave && dropzoneOptions.onDragLeave(event)
    },
    multiple,
    // maxFiles,
    maxSize,
    minSize,
    // accept,
    onDrop,
  });
  
  const dragState: DragState = errorMessage ? 'error' : isDragAccept ? 'dragAccept' : isDragReject ? 'dragReject' : isDragActive? 'dragActive': 'default';

  const handleRemoveFile = (removedFile: FilePreview) => {
    setFiles(files => files.filter(file => file !== removedFile))
  }

  const setProgress = (props: {percent: number, file: File}) => {
    setFiles(files => files.map(file => file === props.file ? Object.assign(file, {processor:{...file.processor, percent: props.percent}}) : file))
  }

  const setFinished = (props: {file: File}) => {
    setFiles(files => files.map(file => file === props.file ? Object.assign(file, {processor:{...file.processor, status: 'finished' }}) : file))
  }

  const setError = (props: {errors: FileError[], file: File}) => {
    setFiles(files => files.map(file => file === props.file ? Object.assign(file, {errors: props.errors, processor:{...file.processor, status: 'error'}}) : file))
  }

  React.useEffect(
    () => () => {
      files.forEach((file) => file.preview && URL.revokeObjectURL(file.preview))
    },
    [files],
  )

  React.useEffect(() => {
    const maxFileError = maxFiles && files.length > maxFiles;
    const anyErrors = files.filter(file => file.errors).length !== 0

    setErrorMessage(
      anyErrors ? `Files must not have any errors.` : 
      maxFileError ? `Number of files must be less than or equal to ${maxFiles}` : null)

    if (sendFiles && files.length > 0 && !maxFileError && !anyErrors) {
      setFiles(files => {
        return files.map(file => !file.errors && !file?.processor?.status ? Object.assign(file, {processor: {status:'pending'}}): file)
      })

      files.filter(file => !file.errors && !file.processor).forEach(file => onSendFile && onSendFile({
        onProgress: setProgress,
        onFinish: setFinished,
        onError: setError,
        file,
      }))
    }
  }, [sendFiles, files.length, onSendFile])

  return (<>
      <FormFieldContainer
        containerStyle={containerStyle}
        fieldId={id}
        helperMessage={helperMessage}
        errorMessage={errorMessage}
        isLabelVisuallyHidden={isLabelVisuallyHidden}
        isInverse={isInverse}
        inputSize={inputSize}
        labelStyle={labelStyle}
        labelText={labelText}
      />
      <Container 
        dragState={dragState}
        {...getRootProps()}
        {...rest}
        behavior={FlexBehavior.container}
        theme={theme}
      >
        <input ref={ref} data-testid={testId} {...getInputProps()}/>
        <Flex behavior={FlexBehavior.item}>
          <CloudUploadIcon color={theme.colors.neutral02} size={theme.iconSizes.xLarge} />
          <Wrapper theme={theme}>
            Drag and Drop your files
          </Wrapper>
          <Wrapper theme={theme}>
            or
          </Wrapper>
          <Button color={ButtonColor.secondary} onClick={open}>browse files</Button>
        </Flex>
      </Container>
      {files.map((file: FilePreview) => <Preview thumbnails={thumbnails} file={file} onRemoveFile={handleRemoveFile}/>)}
    </>)
  }
)

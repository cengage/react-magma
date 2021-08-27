/**
 * HELPFUL NOTE!
 * SINCE THIS PACKAGE USES `FILE` WE MUST USE `Object.assign` IN LIEU OF SPREADING
 * `{...file}` WILL NOT COPY ALL OF THE FILE PROPERTIES
 */

import * as React from 'react';
import { useDropzone, DropzoneOptions, DropzoneRootProps, FileRejection } from 'react-dropzone';
import {
  Button,
  ButtonColor,
  ButtonVariant,
  Flex,
  FlexBehavior,
  FlexProps,
  FormFieldContainer,
  FormFieldContainerBaseProps,
  InverseContext,
  ThemeContext,
  ThemeInterface,
  styled,
  useGenerateId,
  useIsInverse,
} from 'react-magma-dom';

import { CloudUploadIcon } from 'react-magma-icons';
import { Preview } from './Preview';
import { FilePreview, FileError } from './FilePreview';

export interface OnSendFileProps {
  file: FilePreview;
  onError?: ({}:{errors: FileError[], file: FilePreview}) => void;
  onFinish?: ({}:{file: FilePreview}) => void;
  onProgress?: ({}:{percent: number, file: FilePreview}) => void;
}

type DragState = 'error' | 'dragAccept' | 'dragReject' | 'dragActive' | 'default';
export interface FileUploaderProps extends Omit<FormFieldContainerBaseProps, 'fieldId' | 'errorMessage'> {
  accept?: string | string[];
  dropzoneOptions?: Partial<Omit<DropzoneOptions, 'onDrop'>>;
  helperMessage?: string;
  id?: string;
  maxFiles?: number;
  maxSize?: number;
  minSize?: number;
  multiple?: boolean;
  noDrag?: boolean;
  onDeleteFile?: (file: FilePreview) => void;
  onRemoveFile?: (file: FilePreview) => void;
  onSendFile?: (props: OnSendFileProps) => void;
  sendFiles?: boolean;
  showAcceptHelper?: boolean;
  testId?: string;
  thumbnails?: boolean;
}

const Container = styled(Flex)<DropzoneRootProps & FlexProps & {dragState?: DragState; noDrag?: boolean; isInverse?: boolean;}>`
  flex-direction: column;
  align-items: ${({noDrag}) => noDrag ? 'left' : 'center'};
  justify-content: ${({noDrag}) => noDrag ? 'left' : 'center'};
  text-align: ${({noDrag}) => noDrag ? 'left' : 'center'};
  padding: ${({noDrag}) => noDrag ? '0px' : '40px'};
  border-width: ${({noDrag}) => noDrag ? '0px' : '2px'};
  border-radius: ${({noDrag}) => noDrag ? '0px' : '4px'};
  border-color: ${({dragState='default', theme, isInverse}) =>
    dragState === 'dragReject' || dragState === 'error' ? isInverse ? theme.colors.dangerInverse : theme.colors.danger :
    dragState === 'dragActive' ? theme.colors.primary :
    dragState === 'dragAccept' ? theme.colors.success :
    theme.colors.neutral06};
  border-style: ${({dragState='default'}) => dragState === 'error' ? 'solid' : 'dashed'};
  background-color: ${({theme, noDrag, isInverse}) => noDrag ? 'transparent' : isInverse ? theme.colors.foundation : theme.colors.neutral07};
  outline: none;
  transition: ${({noDrag}) => `border ${noDrag ? 0 :'.24s'} ease-in-out`};
`;

const Wrapper = styled.div<{isInverse?: boolean}>`
  color: ${({theme, isInverse}) => isInverse ? theme.colors.neutral07 : theme.colors.neutral02};
  margin: 0px;
  padding: ${({theme}) => theme.spaceScale.spacing01};
`
export const FileUploader = React.forwardRef<HTMLInputElement, FileUploaderProps>((props, ref) => {
  const {
    accept,
    containerStyle,
    dropzoneOptions={
      multiple: true,
    },
    helperMessage,
    id: defaultId,
    inputSize,
    isInverse: isInverseProp,
    isLabelVisuallyHidden,
    labelStyle,
    labelText,
    maxFiles,
    maxSize,
    minSize,
    multiple=true,
    noDrag=false,
    onSendFile,
    onDeleteFile,
    onRemoveFile,
    sendFiles = false,
    showAcceptHelper = true,
    testId,
    thumbnails = true,
    ...rest
  } = props;

  const [files, setFiles] = React.useState<FilePreview[]>([])
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const isInverse = useIsInverse(isInverseProp);
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
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragActive,
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
    accept,
    onDrop,
    noDrag,
  });

  const dragState: DragState = errorMessage ? 'error' : isDragAccept ? 'dragAccept' : isDragReject ? 'dragReject' : isDragActive? 'dragActive': 'default';

  const handleRemoveFile = (removedFile: FilePreview ) => {
    setFiles(files => files.filter(file => file !== removedFile))
    if(onRemoveFile && typeof onRemoveFile === 'function'){
      onRemoveFile(removedFile)
    }
  }

  const handleDeleteFile = (removedFile: FilePreview ) => {
    if(onDeleteFile && typeof onDeleteFile === 'function'){
      onDeleteFile(removedFile)
    }
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
        file,
        onError: setError,
        onFinish: setFinished,
        onProgress: setProgress,
      }))
    }
  }, [sendFiles, files.length, onSendFile])

  return (
    <InverseContext.Provider value={{ isInverse }}>
      <FormFieldContainer
        containerStyle={containerStyle}
        errorMessage={errorMessage}
        fieldId={id}
        helperMessage={helperMessage}
        inputSize={inputSize}
        isInverse={isInverse}
        isLabelVisuallyHidden={isLabelVisuallyHidden}
        labelStyle={labelStyle}
        labelText={labelText}
      />
      <Container
        behavior={FlexBehavior.container}
        dragState={dragState}
        isInverse={isInverse}
        noDrag={noDrag}
        theme={theme}
        {...getRootProps()}
        {...rest}
      >
        <input ref={ref} data-testid={testId} {...getInputProps()}/>
        {noDrag ?
          <Flex xs behavior={FlexBehavior.item}>
            <Button color={ButtonColor.primary} isInverse={isInverse} style={{margin: 0}} onClick={open}>browse files</Button>
          </Flex> :
          <Flex behavior={FlexBehavior.item}>
            <CloudUploadIcon aria-hidden="true" color={isInverse ? theme.colors.neutral07 : theme.colors.neutral02} size={theme.iconSizes.xLarge} />
            <Wrapper isInverse={isInverse} theme={theme}>
              Drag and Drop your files
            </Wrapper>
            <Wrapper isInverse={isInverse} theme={theme}>
              or
            </Wrapper>
            <Button color={ButtonColor.secondary} variant={ButtonVariant.outline} isInverse={isInverse} onClick={open}>browse files</Button>
          </Flex>
        }
      </Container>
      {files.map((file: FilePreview) => <Preview
        file={file}
        isInverse={isInverse}
        key={file.name}
        onDeleteFile={handleDeleteFile}
        onRemoveFile={handleRemoveFile}
        thumbnails={thumbnails}
      />)}
    </InverseContext.Provider>)
  }
)

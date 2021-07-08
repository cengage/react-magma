import * as React from 'react';
import { useDropzone, DropzoneOptions, DropzoneRootProps, FileRejection, DropEvent } from 'react-dropzone';
import {
  Button,
  ButtonColor,
  Flex,
  FlexProps,
  FlexBehavior, 
  FormFieldContainer,
  FormFieldContainerBaseProps,
  Paragraph,
  styled,
  ThemeContext,
  ThemeInterface,
  useGenerateId,
} from 'react-magma-dom';

import { CloudUploadIcon } from 'react-magma-icons';

// import { InverseContext, useIsInverse } from '../../inverse';
// import { I18nContext } from '../../i18n';

import { Preview } from './Preview';
import { formatFileSize } from './utils'
import { FilePreview, FileError } from './FilePreview';

export interface FileUploaderProps extends Omit<FormFieldContainerBaseProps, 'fieldId' | 'errorMessage'> {
  dropzoneOptions?: Partial<Omit<DropzoneOptions, 'onDrop'>>;
  sendFiles?: boolean;
  onSendFiles?: (files: FilePreview[]) => void;
  onPreviewClick?: (file: FilePreview) => void;
  helperMessage?: string;
  thumbnails?: boolean;
  showAcceptHelper?: boolean;
  maxFiles?: number;
  multiple?: boolean;
  maxSize?: number;
  minSize?: number;
  accept?: string[];
}

const dragColors = {
  dragAccept: 'green',
  dragReject: 'red',
  dragActive: 'purple',
  default: '#eeeeee',
}

const Container = styled(Flex)<DropzoneRootProps & FlexProps & {dragState?: keyof typeof dragColors}>`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${({dragState='default'}) => dragColors[dragState]};
  border-style: dashed;
  background-color: ${props => props.theme.colors.neutral07};
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

const StyledParagraph = styled(Paragraph)`
  // padding: 0px;
  margin: 0px;
  color: ${props => props.theme.colors.neutral03};
  padding: ${props => props.theme.spaceScale.spacing01};
`

export const FileUploader = (props: FileUploaderProps) => {
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
    onPreviewClick,
    onSendFiles,
    maxFiles,
    multiple,
    maxSize,
    minSize,
    accept,
    ...rest
  } = props;

  const [files, setFiles] = React.useState<FilePreview[]>([])
  const theme:ThemeInterface = React.useContext(ThemeContext);
  const id = useGenerateId(defaultId);
  
  const onDrop = React.useCallback((acceptedFiles: FilePreview[], rejectedFiles: FileRejection[], event: DropEvent) => {
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
    // rejectedFiles,
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
    multiple: true,
    maxFiles,
    maxSize,
    minSize,
    accept,
    onDrop,
  });

  const dragState = isDragAccept ? 'dragAccept' : isDragReject ? 'dragReject' : isDragActive? 'dragActive': 'default';

  const handleRemoveFile = (removedFile: FilePreview) => {
    console.log(removedFile)
  //   setFiles(files: => files.filter(file => file.preview !== removedFile.preview))
  }

  React.useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files],
  )

  React.useEffect(() => {
    if (sendFiles && files.length > 0) {
      onSendFiles && onSendFiles(files)
    }
  }, [sendFiles, files, onSendFiles])

  return (
    <>
      <FormFieldContainer
        containerStyle={containerStyle}
        fieldId={id}
        helperMessage={helperMessage}
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
        <input {...getInputProps()}/>
        <Flex behavior={FlexBehavior.item} xs={12}>
          <div>
            <CloudUploadIcon color={theme.colors.neutral02} size={54} />
          </div>
          <StyledParagraph theme={theme}>
            Drag and Drop your files
          </StyledParagraph>
          <StyledParagraph theme={theme}>
            or
          </StyledParagraph>
          <Button color={ButtonColor.secondary} onClick={open}>browse files</Button>
        </Flex>
      </Container>
      <Preview thumbnails={thumbnails} files={files} onRemoveFile={handleRemoveFile}/>
      {files.map(file => <pre>{JSON.stringify(file.name, null, 2)}</pre>)}
      </>
    )
  }
    // <Container
    //   dragState={dragState}
    //   behavior={FlexBehavior.container}
    //   {...props}
    //   {...getRootProps()}
    // >
    // </Container>

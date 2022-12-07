/* eslint-disable no-empty-pattern */
/**
 * HELPFUL NOTE!
 * SINCE THIS PACKAGE USES `FILE` WE MUST USE `Object.assign` IN LIEU OF SPREADING
 * `{...file}` WILL NOT COPY ALL OF THE FILE PROPERTIES
 */

import { forwardRef, useState, useContext, useCallback, useEffect } from 'react';
import {
  useDropzone,
  DropzoneOptions,
  DropzoneRootProps,
  FileRejection,
} from 'react-dropzone';
import {
  Button,
  ButtonColor,
  ButtonVariant,
  Flex,
  FlexBehavior,
  FlexProps,
  FormFieldContainer,
  FormFieldContainerBaseProps,
  I18nContext,
  I18nInterface,
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
import { transparentize } from 'polished';

export interface OnSendFileProps {
  file: FilePreview;
  onError?: ({}: { errors: FileError[]; file: FilePreview }) => void;
  onFinish?: ({}: { file: FilePreview }) => void;
  onProgress?: ({}: { percent: number; file: FilePreview }) => void;
}

type DragState =
  | 'error'
  | 'dragAccept'
  | 'dragReject'
  | 'dragActive'
  | 'default';

// NOTE: These props are manually copied to dropzone.mdx
export interface DropzoneProps
  extends Omit<FormFieldContainerBaseProps, 'fieldId' | 'errorMessage'> {
  /**
   * Set accepted file types. See https://github.com/okonet/attr-accept for more information. Keep in mind that mime type determination is not reliable across platforms. CSV files, for example, are reported as text/plain under macOS but as application/vnd.ms-excel under Windows. In some cases there might not be a mime type set at all. See: https://github.com/react-dropzone/react-dropzone/issues/276
   */
  accept?: string | string[];
  /**
   * Enable/Disable the input
   */
  disabled?: boolean;
  /**
   * Additional props to pass to the dropzone, see https://react-dropzone.js.org/#src
   */
  dropzoneOptions?: Partial<Omit<DropzoneOptions, 'onDrop'>>;
  /**
   * Content of the helper message.
   */
  helperMessage?: string;
  /**
   * @internal
   */
  id?: string;
  /**
   * Maximum accepted number of files The default value is 0 which means there is no limitation to how many files are accepted.
   * @default 0
   */
  maxFiles?: number;
  /**
   * Minimum accepted number of files.
   */
  minFiles?: number;
  /**
   * Maximum file size (in bytes)
   * @default Infinity
   */
  maxSize?: number;
  /**
   * Minimum file size (in bytes)
   * @default 0
   */
  minSize?: number;
  /**
   * Allow drag 'n' drop (or selection from the file dialog) of multiple files.
   * @default true
   */
  multiple?: boolean;
  /**
   * If true, disables drag 'n' drop
   * @default false
   */
  noDrag?: boolean;
  /**
   * Callback for when a file is deleted
   */
  onDeleteFile?: (file: FilePreview) => void;
  /**
   * Callback for when a file is deleted
   */
  onRemoveFile?: (file: FilePreview) => void;
  /**
   * Callback for when a file is added to the preview list via dropping or selecting. Will be ran on new files when `sendFiles` is true.
   */
  onSendFile?: (props: OnSendFileProps) => void;
  /**
   * Run `onSendFile` on any new files. Delay processing by setting to `false` until processing is desired.
   * @default false
   */
  sendFiles?: boolean;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Show thumbnails for images in lieu of the file icon.
   * @default true
   */
  thumbnails?: boolean;
}

const Container = styled(Flex)<
  DropzoneRootProps &
    FlexProps & {
      dragState?: DragState;
      noDrag?: boolean;
      isInverse?: boolean;
    }
>`
  flex-direction: column;
  align-items: ${({ noDrag }) => (noDrag ? 'left' : 'center')};
  justify-content: ${({ noDrag }) => (noDrag ? 'left' : 'center')};
  text-align: ${({ noDrag }) => (noDrag ? 'left' : 'center')};
  padding: ${({ noDrag }) => (noDrag ? '0px' : '24px')};
  border-radius: ${({ noDrag }) => (noDrag ? '0px' : '4px')};
  border: ${({ dragState = 'default', noDrag, theme, isInverse }) =>
    noDrag
      ? `0px`
      : dragState === 'dragReject' || dragState === 'error'
      ? isInverse
        ? `1px dashed ${theme.colors.danger200}`
        : `1px dashed ${theme.colors.danger}`
      : dragState === 'dragActive'
      ? `1px dashed ${theme.colors.primary}`
      : dragState === 'dragAccept'
      ? `1px dashed ${theme.colors.success}`
      : `1px dashed ${theme.colors.neutral400}`};

  border-style: ${({ dragState = 'default' }) =>
    dragState === 'error' ? 'solid' : 'dashed'};
  background-color: ${({ theme, noDrag, isInverse }) =>
    noDrag
      ? 'transparent'
      : isInverse
      ? transparentize(0.75, theme.colors.neutral900)
      : theme.colors.neutral200};
  outline: none;
  transition: ${({ noDrag }) => `border ${noDrag ? 0 : '.24s'} ease-in-out`};
`;

const HelperMessage = styled.span<{ isInverse?: boolean }>`
  color: ${({ theme, isInverse }) =>
    isInverse ? theme.colors.neutral100 : theme.colors.neutral700};
  display: block;
  font-size: 14px;
  margin: -8px 0 16px 0;
`;

const Wrapper = styled.div<{ isInverse?: boolean }>`
  color: ${({ theme, isInverse }) =>
    isInverse ? theme.colors.neutral100 : theme.colors.neutral700};
  margin: 0 0 24px 0;
  font-size: ${({ theme }) => theme.typeScale.size02.fontSize};
  line-height: ${({ theme }) => theme.typeScale.size02.lineHeight};
  font-weight: 500;
  padding: ${({ theme }) => theme.spaceScale.spacing01};
`;
export const Dropzone = forwardRef<HTMLInputElement, DropzoneProps>(
  (props, ref) => {
    const {
      accept,
      containerStyle,
      disabled,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      dropzoneOptions = {
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
      minFiles,
      maxSize,
      minSize,
      multiple = true,
      noDrag = false,
      onSendFile,
      onDeleteFile,
      onRemoveFile,
      sendFiles = false,
      testId,
      thumbnails = true,
      ...rest
    } = props;

    const [files, setFiles] = useState<FilePreview[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const isInverse = useIsInverse(isInverseProp);
    const theme: ThemeInterface = useContext(ThemeContext);
    const i18n: I18nInterface = useContext(I18nContext);
    const id = useGenerateId(defaultId);

    const onDrop = useCallback(
      (acceptedFiles: FilePreview[], rejectedFiles: FileRejection[]) => {
        setFiles((files: FilePreview[]) => [
          ...files,
          ...acceptedFiles.map((file: FilePreview) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
          ...rejectedFiles.map(
            ({ file, errors }: { file: FilePreview; errors: FileError[] }) =>
              Object.assign(file, {
                errors,
              })
          ),
        ]);
      },
      []
    );

    const {
      getInputProps,
      getRootProps,
      isDragAccept,
      isDragActive,
      isDragReject,
      open,
    } = useDropzone({
      noClick: true,
      disabled,
      multiple,
      maxSize,
      minSize,
      accept,
      onDrop,
      noDrag,
    });

    const dragState: DragState = errorMessage
      ? 'error'
      : isDragAccept
      ? 'dragAccept'
      : isDragReject
      ? 'dragReject'
      : isDragActive
      ? 'dragActive'
      : 'default';

    const handleRemoveFile = (removedFile: FilePreview) => {
      setFiles(files => files.filter(file => file !== removedFile));
      onRemoveFile &&
        typeof onRemoveFile === 'function' &&
        onRemoveFile(removedFile);
    };

    const handleDeleteFile = (removedFile: FilePreview) => {
      setFiles(files => files.filter(file => file !== removedFile));
      onDeleteFile &&
        typeof onDeleteFile === 'function' &&
        onDeleteFile(removedFile);
    };

    const setProgress = (props: { percent: number; file: FilePreview }) => {
      setFiles(files =>
        files.map(file =>
          file === props.file
            ? Object.assign(file, {
                processor: {
                  ...file.processor,
                  percent: `${props.percent}%`,
                  status: 'pending',
                },
              })
            : file
        )
      );
    };

    const setFinished = (props: { file: FilePreview }) => {
      setFiles(files =>
        files.map(file =>
          file === props.file
            ? Object.assign(file, {
                processor: {
                  ...file.processor,
                  percent: '',
                  status: 'finished',
                },
              })
            : file
        )
      );
    };

    const setError = (props: { errors: FileError[]; file: FilePreview }) => {
      setFiles(files =>
        files.map(file =>
          file === props.file
            ? Object.assign(file, {
                errors: props.errors,
                processor: { ...file.processor, status: 'error' },
              })
            : file
        )
      );
    };

    const formatError = (
      code: string | null,
      constraints: { maxFiles?: number; minFiles?: number }
    ) => {
      if (code === null) return null;
      const error = i18n.dropzone.errors[code];
      switch (code) {
        case 'too-many-files':
          return `${error.message} ${constraints.maxFiles} ${i18n.dropzone.files}.`;
        case 'too-few-files':
          return `${error.message} ${constraints.minFiles} ${i18n.dropzone.files}.`;
        default:
          return error.message;
      }
    };

    useEffect(
      () => () => {
        files.forEach(
          file => file.preview && URL.revokeObjectURL(file.preview)
        );
      },
      [files]
    );

    useEffect(() => {
      const minFileError = minFiles && files.length < minFiles;
      const maxFileError = maxFiles && files.length > maxFiles;

      setErrorMessage(
        formatError(
          maxFileError
            ? 'too-many-files'
            : minFileError
            ? 'too-few-files'
            : null,
          { minFiles, maxFiles }
        )
      );

      if (sendFiles && files.length > 0 && !maxFileError && !minFileError) {
        setFiles((files: FilePreview[]) => {
          return files.map((file: FilePreview) => {
            !file.errors &&
              !file.processor &&
              onSendFile &&
              onSendFile({
                file,
                onError: setError,
                onFinish: setFinished,
                onProgress: setProgress,
              });
            return file;
          });
        });
      }
    }, [sendFiles, files.length, onSendFile]);

    return (
      <InverseContext.Provider value={{ isInverse }}>
        <FormFieldContainer
          actionable={false}
          containerStyle={containerStyle}
          errorMessage={errorMessage}
          fieldId={id}
          inputSize={inputSize}
          isInverse={isInverse}
          isLabelVisuallyHidden={isLabelVisuallyHidden}
          labelStyle={labelStyle}
          labelText={labelText}
          messageStyle={{ minHeight: 0 }}
          data-testid={testId}
        >
          <HelperMessage theme={theme} isInverse={isInverse}>
            {helperMessage}
          </HelperMessage>
          <Container
            behavior={FlexBehavior.container}
            dragState={dragState}
            isInverse={isInverse}
            noDrag={noDrag}
            theme={theme}
            {...getRootProps()}
            {...rest}
            testId={testId}
            tabIndex={-1}
          >
            <input ref={ref} {...getInputProps({ id })} />
            {noDrag ? (
              <Flex xs behavior={FlexBehavior.item}>
                <Button
                  color={ButtonColor.primary}
                  disabled={disabled}
                  isInverse={isInverse}
                  onClick={open}
                  style={{ margin: 0 }}
                >
                  {i18n.dropzone.browseFiles}
                </Button>
              </Flex>
            ) : (
              <Flex behavior={FlexBehavior.item}>
                <CloudUploadIcon
                  aria-hidden="true"
                  color={
                    isInverse
                      ? theme.colors.neutral100
                      : theme.colors.neutral500
                  }
                  size={48}
                />
                <Wrapper isInverse={isInverse} theme={theme}>
                  {i18n.dropzone.dragMessage}
                </Wrapper>
                <Button
                  color={ButtonColor.primary}
                  disabled={disabled}
                  isInverse={isInverse}
                  onClick={open}
                  style={{ margin: 0 }}
                  variant={ButtonVariant.solid}
                >
                  {i18n.dropzone.browseFiles}
                </Button>
              </Flex>
            )}
          </Container>
        </FormFieldContainer>
        {files.map((file: FilePreview) => (
          <Preview
            accept={accept}
            file={file}
            isInverse={isInverse}
            key={file.name}
            maxSize={maxSize}
            minSize={minSize}
            onDeleteFile={handleDeleteFile}
            onRemoveFile={handleRemoveFile}
            thumbnails={thumbnails}
          />
        ))}
      </InverseContext.Provider>
    );
  }
);

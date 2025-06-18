import React, { forwardRef, useContext, useEffect, useState } from 'react';

import {
  ButtonColor,
  ButtonVariant,
  Card,
  Flex,
  FlexAlignItems,
  FlexBehavior,
  FlexProps,
  I18nContext,
  I18nInterface,
  IconButton,
  InverseContext,
  ThemeContext,
  ThemeInterface,
  Transition,
  Spinner,
  useIsInverse,
  styled,
} from 'react-magma-dom';
import {
  CheckCircleIcon,
  CloseIcon,
  DeleteIcon,
  ErrorIcon,
} from 'react-magma-icons';

import { FileIcon } from './FileIcon';
import { FilePreview } from './FilePreview';
import { formatFileSize } from './utils';

export interface PreviewProps extends Omit<FlexProps, 'behavior'> {
  accept?: string | string[];
  file: FilePreview;
  isInverse?: boolean;
  maxSize?: number;
  minSize?: number;
  onDeleteFile?: (file: FilePreview) => void;
  onRemoveFile?: (file: FilePreview) => void;
  /**
   * @internal
   */
  testId?: string;
  thumbnails: boolean;
}

const Thumb = styled.div<{ file: FilePreview }>`
  background-image: ${({ file }) =>
    `url('${'preview' in file && file.preview}')`};
  background-repeat: no-repeat;
  background-size: cover;
  display: inline-block;
  vertical-align: middle;
  height: 40px;
  width: 40px;
`;

const StatusIcons = styled.div`
  display: grid;
  grid-template-areas: 'inner-div';
  height: auto;
  place-items: center;
  width: 46px;
  & > div {
    display: inline-block;
    right: 0;
    grid-area: inner-div;
  }
`;

const IconStyles = {
  marginRight: '12px',
  display: 'flex',
};

const Errors = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.neutral300};
  padding: 16px;
  font-size: ${({ theme }) => theme.typeScale.size02.fontSize};
  line-height: ${({ theme }) => theme.typeScale.size02.lineHeight};
`;

const StyledFlex = styled(Flex)`
  height: 56px;
  padding: 0 8px 0 16px;
  font-size: ${({ theme }) => theme.typeScale.size02.fontSize};
  line-height: ${({ theme }) => theme.typeScale.size02.lineHeight};
`;

const FileName = styled(Flex)`
  overflow: hidden;
  white-space: nowrap;
  align-items: center;
  text-overflow: ellipsis;
  display: block;
  margin-right: 24px;
  font-size: ${({ theme }) => theme.typeScale.size02.fontSize};
  line-height: ${({ theme }) => theme.typeScale.size02.lineHeight};
`;

const StyledCard = styled(Card)<{ file: FilePreview; isInverse: boolean }>`
  background-color: none;
  border-color: ${({ file, theme, isInverse }) =>
    file.errors
      ? isInverse
        ? theme.colors.danger300
        : theme.colors.danger
      : theme.colors.neutral300};
  border-width: 1px;
  margin: 10px 0;
`;

const ErrorHeader = styled.span`
  display: block;

  > div {
    display: flex;
    align-self: center;
    margin-right: 12px;
  }
`;

const ErrorMessage = styled.span`
  display: block;
`;

const formatError = (
  error: { header?: string; message: string; code: string },
  constraints: {
    maxSize?: number;
    minSize?: number;
    accept?: string | string[];
  },
  byteLabel: string
) => {
  const accept =
    Array.isArray(constraints.accept) && constraints.accept.length === 1
      ? constraints.accept[0]
      : constraints.accept;
  const messageSuffix = Array.isArray(accept)
    ? `one of ${accept.join(', ')}`
    : accept;

  switch (error.code) {
    case 'file-too-large':
      return {
        ...error,
        message: `${error.message} ${formatFileSize(
          constraints.maxSize,
          2,
          byteLabel
        )}.`,
      };
    case 'file-too-small':
      return {
        ...error,
        message: `${error.message} ${formatFileSize(
          constraints.minSize,
          2,
          byteLabel
        )}.`,
      };
    case 'file-invalid-type':
      return { ...error, message: `${error.message}: ${messageSuffix}` };
    default:
      return error;
  }
};

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(
  (props, ref) => {
    const {
      accept,
      file,
      isInverse: isInverseProp,
      maxSize,
      minSize,
      onDeleteFile,
      onRemoveFile,
      testId,
      thumbnails,
      ...rest
    } = props;

    const theme: ThemeInterface = useContext(ThemeContext);
    const i18n: I18nInterface = React.useContext(I18nContext);
    const isInverse = useIsInverse(isInverseProp);
    const [actions, setActions] = useState(<CloseIcon />);

    const handleRemoveFile = () => {
      onRemoveFile && typeof onRemoveFile === 'function' && onRemoveFile(file);
    };

    const handleDeleteFile = () => {
      onDeleteFile && typeof onDeleteFile === 'function' && onDeleteFile(file);
    };

    const FinishedActions = ({ status = 'ready' }: { status?: string }) => {
      const [done, setDone] = useState<boolean>(false);

      useEffect(() => {
        let mounted = true;

        setTimeout(() => {
          if (mounted) {
            setDone(true);
          }
        }, 1000);

        return () => {
          mounted = false;
        };
      }, [status]);

      if (status === 'error' || status === 'ready') {
        return (
          <StatusIcons>
            <IconButton
              onClick={handleRemoveFile}
              variant={ButtonVariant.link}
              color={ButtonColor.secondary}
              aria-label={i18n.dropzone.removeFile}
              icon={<CloseIcon />}
            />
          </StatusIcons>
        );
      }

      if (status === 'pending') {
        return (
          <StatusIcons>
            <Spinner
              color={isInverse ? theme.colors.neutral100 : theme.colors.primary}
            />
          </StatusIcons>
        );
      }

      return (
        <StatusIcons>
          <Transition isOpen={!done} unmountOnExit fade>
            <CheckCircleIcon
              color={isInverse ? theme.colors.success200 : theme.colors.success}
              style={{ marginTop: '4px' }}
            />
          </Transition>
          <Transition isOpen={done} unmountOnExit fade>
            <IconButton
              onClick={handleDeleteFile}
              variant={ButtonVariant.link}
              color={ButtonColor.secondary}
              aria-label={i18n.dropzone.deleteFile}
              icon={<DeleteIcon />}
            />
          </Transition>
        </StatusIcons>
      );
    };

    useEffect(() => {
      setActions(<FinishedActions status={file?.processor?.status} />);
    }, [file?.processor?.status]);

    return (
      <InverseContext.Provider value={{ isInverse }}>
        <StyledCard
          isInverse={isInverse}
          theme={theme}
          file={file}
          data-testid={props.testId}
          ref={ref}
          role={file.errors ? 'alert' : ''}
        >
          <StyledFlex
            theme={theme}
            behavior={FlexBehavior.container}
            alignItems={FlexAlignItems.center}
            {...rest}
          >
            <Flex
              behavior={FlexBehavior.item}
              alignItems={FlexAlignItems.center}
              style={IconStyles}
            >
              {file.errors ? (
                <ErrorIcon
                  color={
                    isInverse ? theme.colors.danger300 : theme.colors.danger
                  }
                  size={24}
                />
              ) : file.preview &&
                thumbnails &&
                file.type &&
                file.type.startsWith('image') ? (
                <Thumb role="img" file={file} />
              ) : (
                <FileIcon isInverse={isInverse} file={file} />
              )}
            </Flex>
            <FileName xs behavior={FlexBehavior.item} theme={theme}>
              {file.name}
            </FileName>
            {file.processor && file.processor.status === 'pending' && (
              <Flex
                role="progressbar"
                style={{ marginLeft: 'auto' }}
                behavior={FlexBehavior.item}
              >
                {file.processor.percent}
              </Flex>
            )}
            <Flex behavior={FlexBehavior.item}>{actions}</Flex>
          </StyledFlex>
          {file.errors && (
            <Errors theme={theme}>
              {file.errors.slice(0, 1).map(({ code, ...rest }) => {
                const { header = '', message } = formatError(
                  { code, ...rest, ...i18n.dropzone.errors[code] },
                  { accept, minSize, maxSize },
                  i18n.dropzone.bytes
                );

                return (
                  <React.Fragment key={code}>
                    <ErrorHeader
                      style={{
                        color: isInverse
                          ? theme.colors.danger200
                          : theme.colors.danger,
                      }}
                    >
                      {header}
                    </ErrorHeader>
                    <ErrorMessage>{message}</ErrorMessage>
                  </React.Fragment>
                );
              })}
            </Errors>
          )}
        </StyledCard>
      </InverseContext.Provider>
    );
  }
);

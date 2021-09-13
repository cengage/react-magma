import { forwardRef, useContext, useEffect, useState } from 'react';

import {
  CheckCircleIcon,
  CloseIcon,
  DeleteIcon,
  ErrorIcon,
} from 'react-magma-icons';
import {
  ButtonColor,
  ButtonVariant,
  Card,
  Flex,
  FlexAlignItems,
  FlexBehavior,
  FlexProps,
  IconButton,
  InverseContext,
  ThemeContext,
  ThemeInterface,
  Transition,
  Spinner,
  styled,
  useIsInverse,
} from 'react-magma-dom';

import { FileIcon } from './FileIcon';
import { FilePreview } from './FilePreview';

export interface PreviewProps extends Omit<FlexProps, 'behavior'> {
  file: FilePreview;
  isInverse?: boolean;
  onDeleteFile?: (file: FilePreview) => void;
  onRemoveFile?: (file: FilePreview) => void;
  testId?: string;
  thumbnails: boolean;
}

const Thumb = styled.div<{ file: FilePreview }>`
  background-image: ${({ file }) =>
    `url('${'preview' in file && file.preview}')`};
  background-repeat: no-repeat;
  background-size: contain;
  display: inline-block;
  vertical-align: middle;
  height: 24px;
  width: 24px;
`;

const StatusIcons = styled.div`
  display: grid;
  grid-template-areas: 'inner-div';
  height: auto;
  place-items: center;
  width: 42px;
  & > div {
    display: inline-block;
    right: 0;
    grid-area: inner-div;
  }
`;

const Errors = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.neutral04};
  padding: 10px;
`;

const StyledFlex = styled(Flex)`
  height: 48px;
  padding: 0 10px;
`;

const FileName = styled(Flex)`
  overflow: hidden;
  white-space: nowrap;
  align-items: center;
  text-overflow: ellipsis;
  display: block;
`;

const StyledCard = styled(Card)<{ file: FilePreview; isInverse: boolean }>`
  background-color: ${({ isInverse, theme }) =>
    isInverse ? theme.colors.foundation02 : theme.colors.neutral08};
  border-color: ${({ file, theme, isInverse }) =>
    file.errors
      ? isInverse
        ? theme.colors.dangerInverse
        : theme.colors.danger
      : theme.colors.neutral06};
  border-width: ${({ file }) => (file.errors ? '2px' : '1px')};
  margin: 10px 0;
`;

const ErrorCode = styled.span`
  display: block;
`;

const ErrorMessage = styled.span`
  display: block;
`;

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(
  (props, ref) => {
    const {
      file,
      isInverse: isInverseProp,
      onDeleteFile,
      onRemoveFile,
      testId,
      thumbnails,
      ...rest
    } = props;

    const theme: ThemeInterface = useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);
    const [actions, setActions] = useState(<CloseIcon />);

    const handleRemoveFile = (file: FilePreview) => {
      if (onRemoveFile && typeof onRemoveFile === 'function') {
        onRemoveFile(file);
      }
    };

    const handleDeleteFile = (file: FilePreview) => {
      if (onDeleteFile && typeof onDeleteFile === 'function') {
        onDeleteFile(file);
      }
    };

    const FinishedActions = ({ status = 'ready' }: { status?: string }) => {
      const [done, setDone] = useState(false);

      useEffect(() => {
        setTimeout(() => {
          setDone(true);
        }, 500);
      }, [status]);

      if (status === 'error' || status === 'ready') {
        return (
          <StatusIcons>
            <IconButton
              onClick={() => {
                handleRemoveFile(file);
              }}
              variant={ButtonVariant.link}
              color={ButtonColor.secondary}
              aria-label="Remove File"
              icon={<CloseIcon />}
            />
          </StatusIcons>
        );
      }

      if (status === 'pending') {
        return (
          <StatusIcons>
            <Spinner />
          </StatusIcons>
        );
      }

      return (
        <StatusIcons>
          <Transition isOpen={!done} unmountOnExit nudgeBottom fade>
            <CheckCircleIcon />
          </Transition>
          <Transition isOpen={done} unmountOnExit nudgeTop fade>
            <IconButton
              onClick={() => {
                handleDeleteFile(file);
              }}
              variant={ButtonVariant.link}
              color={ButtonColor.secondary}
              aria-label="Delete File"
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
            >
              {file.errors ? (
                <ErrorIcon
                  color={
                    isInverse ? theme.colors.dangerInverse : theme.colors.danger
                  }
                  size={24}
                />
              ) : file.preview &&
                thumbnails &&
                file.type &&
                file.type.startsWith('image') ? (
                <Thumb file={file} />
              ) : (
                <FileIcon isInverse={isInverse} file={file} />
              )}
            </Flex>
            <FileName xs behavior={FlexBehavior.item}>
              {file.name}
            </FileName>
            <Flex style={{ marginLeft: 'auto' }} behavior={FlexBehavior.item}>
              {file.processor && file.processor.percent}
            </Flex>
            <Flex behavior={FlexBehavior.item}>{actions}</Flex>
          </StyledFlex>
          {file.errors && (
            <Errors theme={theme}>
              {file.errors.map(error => (
                <>
                  <ErrorCode>{error.code}</ErrorCode>
                  <ErrorMessage>{error.message}</ErrorMessage>
                </>
              ))}
            </Errors>
          )}
        </StyledCard>
      </InverseContext.Provider>
    );
  }
);
